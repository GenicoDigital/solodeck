import { CartItem } from "./types";
import { getProductBySlug, getBundleBySlug } from "./products";
import { getSupabaseAdmin } from "./supabase";

const BUCKET = "toolkits";

/** Signed download links are valid for 24 hours. */
export const DOWNLOAD_TTL_SECONDS = 60 * 60 * 24;

export interface DownloadFile {
  /** Toolkit display name. */
  name: string;
  /** Object path within the private "toolkits" bucket (e.g. "<slug>.pdf"). */
  fileName: string;
}

export interface SignedDownload extends DownloadFile {
  /** Time-limited signed URL, or null if signing failed (missing file etc.). */
  url: string | null;
}

/**
 * Compactly encode cart items for storage in Stripe session metadata. Metadata
 * values are capped at 500 chars, which comfortably fits a normal cart; very
 * large carts would need a different store (e.g. a database).
 */
export function encodeItems(items: CartItem[]): string {
  return items
    .map((i) => `${i.type === "bundle" ? "b" : "p"}:${i.slug}:${i.quantity}`)
    .join(",");
}

/** Inverse of {@link encodeItems}. Tolerant of malformed/empty input. */
export function decodeItems(encoded: string | null | undefined): CartItem[] {
  if (!encoded) return [];
  return encoded
    .split(",")
    .map((part) => {
      const [t, slug, qty] = part.split(":");
      return {
        slug,
        type: t === "b" ? "bundle" : "product",
        quantity: Math.max(1, parseInt(qty, 10) || 1),
      } as CartItem;
    })
    .filter((i) => Boolean(i.slug));
}

/**
 * Expand cart items into the individual PDF files to deliver. Bundles resolve
 * to the files of each included product. Duplicate files (e.g. a product also
 * present inside a purchased bundle) are de-duplicated.
 */
export function getDownloadFiles(items: CartItem[]): DownloadFile[] {
  const files: DownloadFile[] = [];
  const seen = new Set<string>();

  const add = (name: string, fileName: string | undefined) => {
    if (fileName && !seen.has(fileName)) {
      seen.add(fileName);
      files.push({ name, fileName });
    }
  };

  for (const item of items) {
    if (item.type === "product") {
      const product = getProductBySlug(item.slug);
      if (product) add(product.name, product.fileName);
    } else {
      const bundle = getBundleBySlug(item.slug);
      if (!bundle) continue;
      for (const slug of bundle.productSlugs) {
        const product = getProductBySlug(slug);
        if (product) add(product.name, product.fileName);
      }
    }
  }

  return files;
}

/**
 * Create time-limited signed URLs for each file from the private bucket.
 * Preserves input order; any file that fails to sign comes back with url: null.
 */
export async function createSignedDownloads(
  files: DownloadFile[]
): Promise<SignedDownload[]> {
  if (files.length === 0) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(
      files.map((f) => f.fileName),
      DOWNLOAD_TTL_SECONDS
    );

  if (error || !data) {
    return files.map((f) => ({ ...f, url: null }));
  }

  // createSignedUrls returns results in the same order as the input paths.
  return files.map((f, i) => ({ ...f, url: data[i]?.signedUrl ?? null }));
}
