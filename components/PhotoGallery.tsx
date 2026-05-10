'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  images: string[]
  propertyName: string
}

export default function PhotoGallery({ images, propertyName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [zoom, setZoom]   = useState(false)
  const [pan,  setPan]    = useState({ x: 0, y: 0 })

  // swipe / pinch refs
  const touchStartX    = useRef<number | null>(null)
  const touchStartY    = useRef<number | null>(null)
  const pinchStartDist = useRef<number | null>(null)

  // pan / drag refs
  const isDragging  = useRef(false)
  const hasMoved    = useRef(false)           // distinguish click from drag
  const dragOrigin  = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  // skim-bar auto-scroll
  const skimBarRef = useRef<HTMLDivElement>(null)

  // ── navigation ────────────────────────────────────────────────────────────
  const open = (i: number) => {
    setLightboxIndex(i); setZoom(false); setPan({ x: 0, y: 0 })
    document.body.style.overflow = 'hidden'
  }
  const close = useCallback(() => {
    setLightboxIndex(null); setZoom(false); setPan({ x: 0, y: 0 })
    document.body.style.overflow = ''
  }, [])
  const prev = useCallback(() =>
    setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(() =>
    setLightboxIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length])

  // reset zoom + pan when slide changes
  useEffect(() => { setZoom(false); setPan({ x: 0, y: 0 }) }, [lightboxIndex])

  // auto-scroll skim bar
  useEffect(() => {
    if (lightboxIndex === null || !skimBarRef.current) return
    const bar   = skimBarRef.current
    const thumb = bar.children[lightboxIndex] as HTMLElement
    if (!thumb) return
    bar.scrollTo({ left: thumb.offsetLeft - bar.clientWidth / 2 + thumb.offsetWidth / 2, behavior: 'smooth' })
  }, [lightboxIndex])

  // keyboard
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, prev, next, close])

  // ── mouse pan (desktop) ───────────────────────────────────────────────────
  function onImgMouseDown(e: React.MouseEvent) {
    if (!zoom) return
    e.preventDefault()
    isDragging.current = true
    hasMoved.current   = false
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y }
  }
  function onContainerMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return
    const dx = e.clientX - dragOrigin.current.mx
    const dy = e.clientY - dragOrigin.current.my
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true
    setPan({ x: dragOrigin.current.px + dx, y: dragOrigin.current.py + dy })
  }
  function onContainerMouseUp() {
    isDragging.current = false
  }

  // single-click on image: toggle zoom (but not if user just dragged)
  function onImgClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (hasMoved.current) { hasMoved.current = false; return }
    if (zoom) { setZoom(false); setPan({ x: 0, y: 0 }) }
    else      { setZoom(true) }
  }

  // ── touch handlers ────────────────────────────────────────────────────────
  function onLbTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      // pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDist.current = Math.sqrt(dx * dx + dy * dy)
    } else if (zoom) {
      // pan start (1 finger while zoomed)
      isDragging.current = true
      hasMoved.current   = false
      dragOrigin.current = { mx: e.touches[0].clientX, my: e.touches[0].clientY, px: pan.x, py: pan.y }
    } else {
      // swipe to navigate
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
  }
  function onLbTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStartDist.current !== null) {
      // pinch zoom
      const dx   = e.touches[0].clientX - e.touches[1].clientX
      const dy   = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist / pinchStartDist.current > 1.25) setZoom(true)
      if (dist / pinchStartDist.current < 0.75) { setZoom(false); setPan({ x: 0, y: 0 }) }
    } else if (zoom && isDragging.current && e.touches.length === 1) {
      // pan
      const dx = e.touches[0].clientX - dragOrigin.current.mx
      const dy = e.touches[0].clientY - dragOrigin.current.my
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true
      setPan({ x: dragOrigin.current.px + dx, y: dragOrigin.current.py + dy })
    }
  }
  function onLbTouchEnd(e: React.TouchEvent) {
    if (pinchStartDist.current !== null) {
      pinchStartDist.current = null; return
    }
    if (zoom) {
      isDragging.current = false; return
    }
    // swipe nav (only when not zoomed)
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx > 0 ? next() : prev()
    touchStartX.current = null
    touchStartY.current = null
  }

  // ── empty state ───────────────────────────────────────────────────────────
  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]">
        <p className="font-body text-sm text-[var(--muted)]">Photos coming soon</p>
      </div>
    )
  }

  // ── gallery grid ──────────────────────────────────────────────────────────
  return (
    <>
      {/* Mobile layout */}
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

      {/* Desktop layout */}
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

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          onClick={close}
          onMouseMove={onContainerMouseMove}
          onMouseUp={onContainerMouseUp}
          onTouchStart={onLbTouchStart}
          onTouchMove={onLbTouchMove}
          onTouchEnd={onLbTouchEnd}
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between px-4 py-3" onClick={e => e.stopPropagation()}>
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-body text-xs font-semibold text-white tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setZoom(z => !z); setPan({ x: 0, y: 0 }) }}
                aria-label={zoom ? 'Zoom out' : 'Zoom in'}
                title={zoom ? 'Click image or drag to pan' : 'Click image to zoom in'}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition ${zoom ? 'bg-white/30' : 'bg-white/10 hover:bg-white/25'}`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {zoom
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  }
                </svg>
              </button>
              <button onClick={close} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image area — overflow-hidden clips the zoomed image */}
          <div
            className="flex min-h-0 flex-1 items-center justify-center overflow-hidden"
            onClick={close}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${propertyName} - photo ${lightboxIndex + 1}`}
              draggable={false}
              onMouseDown={onImgMouseDown}
              onClick={onImgClick}
              className="max-h-full max-w-full object-contain shadow-2xl select-none"
              style={{
                transform: zoom ? `translate(${pan.x}px, ${pan.y}px) scale(2)` : 'none',
                transition: isDragging.current ? 'none' : 'transform 0.2s ease',
                cursor: zoom ? (isDragging.current ? 'grabbing' : 'grab') : 'zoom-in',
                borderRadius: zoom ? 0 : '0.5rem',
              }}
            />
          </div>

          {/* Bottom nav: prev | skim bar | next */}
          <div className="flex shrink-0 items-center gap-2 px-3 pb-4 pt-3" onClick={e => e.stopPropagation()}>
            <button
              onClick={prev}
              disabled={lightboxIndex === 0}
              aria-label="Previous photo"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-20 disabled:cursor-default"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div ref={skimBarRef} className="flex flex-1 gap-1.5 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`relative flex-none h-12 w-[4.5rem] overflow-hidden rounded-md transition-all duration-150 ${
                    i === lightboxIndex
                      ? 'opacity-100 ring-2 ring-white ring-offset-1 ring-offset-black/50 scale-105'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              disabled={lightboxIndex === images.length - 1}
              aria-label="Next photo"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 disabled:opacity-20 disabled:cursor-default"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
