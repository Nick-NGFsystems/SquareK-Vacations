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

  const open = (i: number) => { setLightboxIndex(i); document.body.style.overflow = 'hidden' }
  const close = useCallback(() => { setLightboxIndex(null); document.body.style.overflow = '' }, [])
  const prev = useCallback(() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(() => setLightboxIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
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
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx > 0 ? next() : prev()
    touchStartX.current = null; touchStartY.current = null
  }

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]">
        <p className="font-body text-sm text-[var(--muted)]">Photos coming soon</p>
      </div>
    )
  }

  return (
    <>
      {/* ── Mobile layout (hidden sm+) ── */}
      <div className="sm:hidden">
        <button onClick={() => open(0)} className="group relative block w-full overflow-hidden rounded-xl aspect-[4/3]" aria-label="View photos">
          <img src={images[0]} alt={propertyName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="font-body text-xs font-semibold text-white">{images.length} photos</span>
            </div>
          )}
        </button>
        {images.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {images.slice(1).map((src, idx) => (
              <button key={idx + 1} onClick={() => open(idx + 1)} className="relative flex-none w-20 aspect-square overflow-hidden rounded-lg" aria-label={`View photo ${idx + 2}`}>
                <img src={src} alt={`${propertyName} ${idx + 2}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop layout (hidden mobile) ── */}
      <div className="hidden sm:block overflow-hidden rounded-2xl">
        {images.length === 1 ? (
          <button onClick={() => open(0)} className="group relative block w-full aspect-[16/9] overflow-hidden" aria-label="View photo">
            <img src={images[0]} alt={propertyName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ) : images.length <= 3 ? (
          <div className="grid gap-1" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <button onClick={() => open(0)} className="group relative overflow-hidden" style={{ gridRow: 'span 2' }} aria-label="View photo 1">
              <div className="relative h-full min-h-[320px] overflow-hidden">
                <img src={images[0]} alt={`${propertyName} 1`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </div>
            </button>
            {images.slice(1, 3).map((src, idx) => (
              <button key={idx + 1} onClick={() => open(idx + 1)} className="group relative aspect-[4/3] overflow-hidden" aria-label={`View photo ${idx + 2}`}>
                <img src={src} alt={`${propertyName} ${idx + 2}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid gap-1" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto' }}>
            <button onClick={() => open(0)} className="group relative overflow-hidden" style={{ gridRow: 'span 2' }} aria-label="View photo 1">
              <div className="relative h-full min-h-[360px] overflow-hidden">
                <img src={images[0]} alt={`${propertyName} 1`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </div>
            </button>
            {images.slice(1, 5).map((src, idx) => {
              const gi = idx + 1
              const showOverlay = gi === 4 && images.length > 5
              return (
                <button key={gi} onClick={() => open(gi)} className="group relative aspect-[4/3] overflow-hidden" aria-label={`View photo ${gi + 1}`}>
                  <img src={src} alt={`${propertyName} ${gi + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                  {showOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition group-hover:bg-black/60">
                      <div className="text-center">
                        <span className="font-heading text-2xl font-bold text-white">+{images.length - 4}</span>
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

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between px-5 py-4">
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-body text-xs font-semibold text-white tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button onClick={close} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image row */}
          <div className="relative flex min-h-0 flex-1 items-center">

            {/* Mobile: full-height tap zone. Desktop: inline side button */}
            <div className="absolute left-0 top-0 z-10 flex h-full w-14 items-center justify-center sm:relative sm:h-auto sm:w-auto sm:shrink-0 sm:px-6">
              <button
                onClick={prev}
                disabled={lightboxIndex === 0}
                aria-label="Previous photo"
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-25 disabled:cursor-default`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* Image — click dark area to close */}
            <div className="flex flex-1 items-center justify-center overflow-hidden px-14 sm:px-0" onClick={close}>
              <img
                src={images[lightboxIndex]}
                alt={`${propertyName} - photo ${lightboxIndex + 1}`}
                className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
                draggable={false}
                onClick={e => e.stopPropagation()}
              />
            </div>

            {/* Next */}
            <div className="absolute right-0 top-0 z-10 flex h-full w-14 items-center justify-center sm:relative sm:h-auto sm:w-auto sm:shrink-0 sm:px-6">
              <button
                onClick={next}
                disabled={lightboxIndex === images.length - 1}
                aria-label="Next photo"
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-25 disabled:cursor-default`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          {images.length <= 12 && (
            <div className="flex shrink-0 justify-center gap-1.5 py-5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setLightboxIndex(i)} aria-label={`Photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === lightboxIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
