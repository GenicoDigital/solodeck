"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const active = images[selected] ?? images[0];

  const prev = () => setSelected((s) => (s - 1 + images.length) % images.length);
  const next = () => setSelected((s) => (s + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[1000/1414] w-full overflow-hidden rounded-lg bg-white shadow-2xl">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === selected}
              className={`relative aspect-[1000/1414] w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white transition-shadow hover:shadow-md ${
                i === selected ? "border-accent ring-2 ring-accent" : "border-white/20"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
