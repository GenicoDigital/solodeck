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

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-white shadow-md">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === selected}
              className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white transition-shadow hover:shadow-md ${
                i === selected ? "border-accent ring-2 ring-accent" : "border-border"
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
