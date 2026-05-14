'use client'

import { PhotoProvider, PhotoView } from 'react-photo-view'

interface Props {
  images: string[]
  propertyName: string
  /**
   * NGF group path for the gallery, e.g. "property.lakeshore-grand-retreat.images"
   * Enables click-to-edit on every photo plus portal sidebar add/remove/reorder.
   * Individual image fields are keyed as `{ngfGroup}.{i}.image`.
   */
  ngfGroup?: string
  ngfSection?: string
}

/** Spread NGF annotation attrs onto an img. Field path: {ngfGroup}.{i}.image */
function ngfAttrs(ngfGroup: string | undefined, ngfSection: string | undefined, i: number) {
  if (!ngfGroup) return {}
  return {
    'data-ngf-field':   `${ngfGroup}.${i}.image`,
    'data-ngf-label':   `Gallery Photo ${i + 1}`,
    'data-ngf-type':    'image',
    'data-ngf-section': ngfSection ?? 'Gallery',
    'data-ngf-aspect':  '3:2',
  }
}

export default function PhotoGallery({ images, propertyName, ngfGroup, ngfSection }: Props) {
  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]">
        <p className="font-body text-sm text-[var(--muted)]">Photos coming soon</p>
      </div>
    )
  }

  return (
    <PhotoProvider>
      {/* ── Mobile layout ────────────────────────────────────── */}
      <div className="sm:hidden">
        <PhotoView src={images[0]}>
          <div className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl">
            <img
              src={images[0]}
              alt={propertyName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              {...ngfAttrs(ngfGroup, ngfSection, 0)}
            />
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="font-body text-xs font-semibold text-white">{images.length} photos</span>
              </div>
            )}
          </div>
        </PhotoView>
        {images.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {images.slice(1).map((src, idx) => (
              <PhotoView key={idx + 1} src={src}>
                <div className="relative h-20 w-20 flex-none cursor-zoom-in overflow-hidden rounded-lg">
                  <img
                    src={src}
                    alt={`${propertyName} ${idx + 2}`}
                    className="h-full w-full object-cover"
                    {...ngfAttrs(ngfGroup, ngfSection, idx + 1)}
                  />
                </div>
              </PhotoView>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop layout ───────────────────────────────────── */}
      <div className="hidden sm:block overflow-hidden rounded-2xl">
        {images.length === 1 ? (
          <PhotoView src={images[0]}>
            <div className="group relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden">
              <img
                src={images[0]}
                alt={propertyName}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                {...ngfAttrs(ngfGroup, ngfSection, 0)}
              />
            </div>
          </PhotoView>
        ) : images.length <= 3 ? (
          <div className="grid gap-1" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <PhotoView src={images[0]}>
              <div className="group relative cursor-zoom-in overflow-hidden" style={{ gridRow: 'span 2' }}>
                <div className="relative h-full min-h-[320px] overflow-hidden">
                  <img
                    src={images[0]}
                    alt={`${propertyName} 1`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    {...ngfAttrs(ngfGroup, ngfSection, 0)}
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>
              </div>
            </PhotoView>
            {images.slice(1, 3).map((src, idx) => (
              <PhotoView key={idx + 1} src={src}>
                <div className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden">
                  <img
                    src={src}
                    alt={`${propertyName} ${idx + 2}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    {...ngfAttrs(ngfGroup, ngfSection, idx + 1)}
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>
              </PhotoView>
            ))}
          </div>
        ) : (
          <div className="grid gap-1" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto' }}>
            <PhotoView src={images[0]}>
              <div className="group relative cursor-zoom-in overflow-hidden" style={{ gridRow: 'span 2' }}>
                <div className="relative h-full min-h-[360px] overflow-hidden">
                  <img
                    src={images[0]}
                    alt={`${propertyName} 1`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    {...ngfAttrs(ngfGroup, ngfSection, 0)}
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>
              </div>
            </PhotoView>
            {images.slice(1, 5).map((src, idx) => {
              const gi = idx + 1
              const showOverlay = gi === 4 && images.length > 5
              return (
                <PhotoView key={gi} src={src}>
                  <div className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden">
                    <img
                      src={src}
                      alt={`${propertyName} ${gi + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      {...ngfAttrs(ngfGroup, ngfSection, gi)}
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                    {showOverlay && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition group-hover:bg-black/60">
                        <div className="text-center">
                          <span className="font-heading text-2xl font-bold text-white">+{images.length - 4}</span>
                          <p className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide text-white/80">more</p>
                        </div>
                      </div>
                    )}
                  </div>
                </PhotoView>
              )
            })}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <PhotoView src={images[0]}>
          <button className="mt-3 cursor-zoom-in font-body text-xs font-semibold text-[var(--muted)] underline underline-offset-2 transition-colors hover:text-[var(--text)]">
            View all {images.length} photos
          </button>
        </PhotoView>
      )}

      {/* Photos 5+ in lightbox navigation (visitors) */}
      {images.slice(5).map((src, idx) => (
        <Phot