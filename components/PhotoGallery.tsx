'use client'

import { useState } from 'react'

interface Props {
  images: string[]
  propertyName: string
}

export default function PhotoGallery({ images, propertyName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]">
        <p className="font-body text-sm text-[var(--muted)]">Photos coming soon</p>
      </div>
    )
  }

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className={`group relative overflow-hidden rounded-xl bg-[var(--surface)] ${i === 0 ? 'col-span-2 row-span-2 sm:col-span-2' : ''}`}
          >
            <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
              <img
                src={src}
                alt={`${propertyName} — photo ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>
            {i === images.length - 1 && images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="font-body text-sm font-semibold text-white">+{images.length - 4} more</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? Math.max(0, i - 1) : 0) }}
          >
            ‹
          </button>
          <img
            src={images[lightboxIndex]}
            alt={`${propertyName} — photo ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? Math.min(images.length - 1, i + 1) : 0) }}
          >
            ›
          </button>
          <div className="absolute bottom-4 left-0 right-0 text-center font-body text-xs text-white/60">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
