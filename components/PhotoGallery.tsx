'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  images: string[]
  propertyName: string
}

export default function PhotoGallery({ images, propertyName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const open = (i: number) => {
    setLightboxIndex(i)
    document.body.style.overflow = 'hidden'
  }
  const close = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }, [])
  const prev = useCallback(() => {
    setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))
  }, [])
  const next = useCallback(() => {
    setLightboxIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, prev, next, close])

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx > 0 ? next() : prev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]">
        <p className="font-body text-sm text-[var(--muted)]">Photos coming soon</p>
      </div>
    )
  }

  const gridImages = images.slice(0, 5)
  const remaining = images.length - 5

  return (
    <>
      {/* Photo grid */}
      <div className="overflow-hidden rounded-2xl">
        {gridImages.length === 1 ? (
          /* Single image */
          <button onClick={() => open(0)} className="group relative block w-full aspect-[16/9] overflow-hidden" aria-label="View photo">
            <img src={gridImages[0]} alt={propertyName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ) : gridImages.length <= 3 ? (
          /* 2–3 images: big left + column right */
          <div className="grid gap-1" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <button onClick={() => open(0)} className="group relative overflow-hidden" style={{ gridRow: 'span 2' }} aria-label="View photo 1">
              <div className="relative h-full min-h-[320px] overflow-hidden">
                <img src={gridImages[0]} alt={`${propertyName} 1`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </div>
            </button>
            {gridImages.slice(1).map((src, idx) => (
              <button key={idx + 1} onClick={() => open(idx + 1)} className="group relative aspect-[4/3] overflow-hidden" aria-label={`View photo ${idx + 2}`}>
                <img src={src} alt={`${propertyName} ${idx + 2}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </button>
            ))}
          </div>
        ) : (
          /* 4–5 images: big left + 2x2 right */
          <div className="grid gap-1" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto' }}>
            <button onClick={() => open(0)} className="group relative overflow-hidden" style={{ gridRow: 'span 2' }} aria-label="View photo 1">
              <div className="relative h-full min-h-[360px] overflow-hidden">
                <img src={gridImages[0]} alt={`${propertyName} 1`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </div>
            </button>
            {gridImages.slice(1).map((src, idx) => {
              const globalIdx = idx + 1
              const isLast = globalIdx === gridImages.length - 1
              const showOverlay = isLast && remaining > 0
              return (
                <button key={globalIdx} onClick={() => open(globalIdx)} className="group relative aspect-[4/3] overflow-hidden" aria-label={`View photo ${globalIdx + 1}`}>
                  <img src={src} alt={`${propertyName} ${globalIdx + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                  {showOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition group-hover:bg-black/60">
                      <div className="text-center">
                        <span className="font-heading text-2xl font-bold text-white">+{remaining + 1}</span>
                        <p className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide text-white/80">more</p>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <button onClick={() => open(0)} className="mt-3 font-body text-xs font-semibold text-[var(--muted)] underline underline-offset-2 hover:text-[var(--text)] transition-colors">
          View all {images.length} photos
        </button>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4">
            <span className="rounded-full bg-black/40 px-3 py-1.5 font-body text-xs font-semibold text-white">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
              onClick={close}
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Prev — full-height tap zone */}
          <button
            className="absolute left-0 top-0 z-10 flex h-full w-16 items-center justify-start pl-3 sm:w-24 sm:pl-6"
            onClick={prev}
            disabled={lightboxIndex === 0}
            aria-label="Previous photo"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25 ${lightboxIndex === 0 ? 'opacity-20 pointer-events-none' : ''}`}>
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </span>
          </button>

          {/* Image */}
          <div className="flex h-full items-center justify-center px-16 sm:px-24" onClick={close}>
            <img
              src={images[lightboxIndex]}
              alt={`${propertyName} - photo ${lightboxIndex + 1}`}
              className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
              draggable={false}
              onClick={e => e.stopPropagation()}
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-0 top-0 z-10 flex h-full w-16 items-center justify-end pr-3 sm:w-24 sm:pr-6"
            onClick={next}
            disabled={lightboxIndex === images.length - 1}
            aria-label="Next photo"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25 ${lightboxIndex === images.length - 1 ? 'opacity-20 pointer-events-none' : ''}`}>
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </button>

          {/* Dot indicators */}
          {images.length <= 12 && (
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === lightboxIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'}`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
