'use client'
import { useEffect } from 'react'

/**
 * NgfEditBridge — enables the NGF portal's live preview and click-to-edit.
 * Must be included in app/layout.tsx. Do not remove.
 */
export default function NgfEditBridge() {
  useEffect(() => {
    let editMode = false

    const style = document.createElement('style')
    style.id = 'ngf-edit-styles'
    style.textContent = `
      [data-ngf-edit="true"] [data-ngf-field] {
        outline: 1.5px dashed rgba(59,130,246,0.45) !important;
        border-radius: 3px;
        cursor: pointer !important;
      }
      [data-ngf-edit="true"] [data-ngf-field]:hover {
        outline-color: #3b82f6 !important;
        background-color: rgba(59,130,246,0.06) !important;
      }
      [data-ngf-edit="true"] [data-ngf-field]:empty {
        min-height: 1.2em;
        min-width: 60px;
        display: inline-block;
      }
      [data-ngf-edit="true"] [data-ngf-field]:empty::before {
        content: attr(data-ngf-label);
        color: #94a3b8;
        font-style: italic;
        pointer-events: none;
      }
      [data-ngf-field].ngf-field-focus {
        animation: ngfFieldFocus 1.6s ease-out;
      }
      @keyframes ngfFieldFocus {
        0%   { outline-color: #3b82f6 !important; background-color: rgba(59,130,246,0.25) !important; }
        100% { outline-color: rgba(59,130,246,0.45) !important; background-color: transparent !important; }
      }
      [data-ngf-edit="true"] [aria-haspopup],
      [data-ngf-edit="true"] [aria-expanded] {
        cursor: pointer !important;
      }
      [data-ngf-edit="true"] #desktop-more-menu {
        pointer-events: auto !important;
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      #ngf-nav-popup {
        position: fixed;
        z-index: 2147483647;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
        padding: 6px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 170px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        pointer-events: auto !important;
      }
      #ngf-nav-popup-label {
        font-size: 11px;
        color: #94a3b8;
        padding: 4px 10px 2px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
      }
      #ngf-nav-popup .ngf-nav-btn {
        all: unset;
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 7px 10px;
        border-radius: 7px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.12s;
        white-space: nowrap;
        pointer-events: auto !important;
      }
      #ngf-nav-popup .ngf-go-btn {
        color: #1d4ed8;
        background: #eff6ff;
      }
      #ngf-nav-popup .ngf-go-btn:hover {
        background: #dbeafe;
      }
      #ngf-nav-popup .ngf-edit-btn {
        color: #0f172a;
        background: transparent;
      }
      #ngf-nav-popup .ngf-edit-btn:hover {
        background: #f3f4f6;
      }
      .ngf-replace-btn {
        position: fixed;
        z-index: 2147483646;
        background: rgba(0, 0, 0, 0.62);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.4;
        cursor: pointer;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        pointer-events: auto !important;
        transition: background 0.15s;
        white-space: nowrap;
        user-select: none;
      }
      .ngf-replace-btn:hover {
        background: rgba(0, 0, 0, 0.85);
      }
    `
    document.head.appendChild(style)

    let navPopup: HTMLDivElement | null = null

    function dismissNavPopup() {
      navPopup?.remove()
      navPopup = null
    }

    type EditTarget = {
      section: string
      field: string
      value: string
      fieldType: string
      rect: DOMRect
    }

    function postFieldClick(t: EditTarget) {
      window.parent.postMessage(
        {
          type:    'fieldClick',
          section: t.section,
          field:   t.field,
          currentValue: t.value,
          fieldType: t.fieldType,
          elementRect: {
            top:    t.rect.top,
            left:   t.rect.left,
            bottom: t.rect.bottom,
            right:  t.rect.right,
            width:  t.rect.width,
            height: t.rect.height,
          },
        },
        trustedOrigin ?? 'https://app.ngfsystems.com',
      )
    }

    function showNavPopup(
      href: string,
      label: string,
      clientX: number,
      clientY: number,
      editTarget?: EditTarget,
    ) {
      dismissNavPopup()

      const popup = document.createElement('div')
      popup.id = 'ngf-nav-popup'

      const lbl = document.createElement('div')
      lbl.id = 'ngf-nav-popup-label'
      lbl.textContent = label || 'Link'
      popup.appendChild(lbl)

      const goBtn = document.createElement('button')
      goBtn.className = 'ngf-nav-btn ngf-go-btn'
      goBtn.textContent = 'Go to page'
      goBtn.addEventListener('click', (ev) => {
        ev.stopPropagation()
        dismissNavPopup()
        window.location.href = href
      })
      popup.appendChild(goBtn)

      if (editTarget) {
        const editBtn = document.createElement('button')
        editBtn.className = 'ngf-nav-btn ngf-edit-btn'
        editBtn.textContent = 'Edit'
        editBtn.addEventListener('click', (ev) => {
          ev.stopPropagation()
          dismissNavPopup()
          postFieldClick(editTarget)
        })
        popup.appendChild(editBtn)
      }

      popup.style.visibility = 'hidden'
      document.body.appendChild(popup)
      navPopup = popup

      const pw = popup.offsetWidth || 180
      const ph = popup.offsetHeight || 110
      const vw = window.innerWidth
      const vh = window.innerHeight
      let left = clientX
      let top = clientY + 10
      if (left + pw + 8 > vw) left = vw - pw - 8
      if (top + ph + 8 > vh) top = clientY - ph - 10
      popup.style.left = `${Math.max(8, left)}px`
      popup.style.top = `${Math.max(8, top)}px`
      popup.style.visibility = ''
    }

    function isImageField(el: HTMLElement) {
      return el.tagName?.toLowerCase() === 'img' || el.getAttribute('data-ngf-type') === 'image'
    }
    function captureDefaults() {
      document.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(el => {
        if (el.dataset.ngfDefault === undefined) {
          el.dataset.ngfDefault = isImageField(el)
            ? (el as HTMLImageElement).getAttribute('src') ?? ''
            : el.textContent ?? ''
        }
      })
    }
    captureDefaults()

    let trustedOrigin: string | null = null

    window.parent.postMessage({ type: 'ngfReady' }, '*')

    function sanitizeImageUrl(url: string): string {
      if (url === '') return ''
      if (/^https?:\/\//i.test(url) || url.startsWith('/') || /^data:image\//i.test(url)) {
        return url
      }
      return ''
    }

    // Replace Photo Overlay Buttons
    const replaceButtons = new Map<HTMLImageElement, HTMLButtonElement>()

    function positionBtn(img: HTMLImageElement, btn: HTMLButtonElement) {
      const r = img.getBoundingClientRect()
      if (r.width < 40 || r.height < 40) {
        btn.style.display = 'none'
        return
      }
      btn.style.display = ''
      btn.style.top   = `${r.top   + 8}px`
      btn.style.right = `${window.innerWidth - r.right + 8}px`
    }

    function repositionAllBtns() {
      replaceButtons.forEach((btn, img) => positionBtn(img, btn))
    }

    function dismountReplaceButtons() {
      replaceButtons.forEach(btn => btn.remove())
      replaceButtons.clear()
    }

    function mountReplaceButtons() {
      dismountReplaceButtons()
      document.querySelectorAll<HTMLImageElement>('img[data-ngf-field]').forEach(img => {
        const r = img.getBoundingClientRect()
        if (r.width < 40 || r.height < 40) return

        const btn = document.createElement('button')
        btn.className = 'ngf-replace-btn'
        btn.setAttribute('aria-label', 'Replace photo')
        btn.textContent = 'Replace photo'
        positionBtn(img, btn)

        btn.addEventListener('click', (ev) => {
          ev.stopPropagation()
          ev.preventDefault()
          ev.stopImmediatePropagation()
          const field = img.getAttribute('data-ngf-field') ?? ''
          const dot   = field.indexOf('.')
          if (dot > -1) {
            postFieldClick({
              section:   field.substring(0, dot),
              field:     field.substring(dot + 1),
              value:     img.getAttribute('src') ?? '',
              fieldType: 'image',
              rect:      img.getBoundingClientRect(),
            })
          }
        })

        document.body.appendChild(btn)
        replaceButtons.set(img, btn)
      })
    }

    const messageHandler = (e: MessageEvent) => {
      const isNgfOrigin =
        e.origin === 'https://app.ngfsystems.com' ||
        /^https:\/\/[^.]+\.vercel\.app$/.test(e.origin) ||
        /^http:\/\/localhost(:\d+)?$/.test(e.origin)
      if (!isNgfOrigin) return

      if (!trustedOrigin) trustedOrigin = e.origin

      if (e.data?.type === 'setEditMode') {
        editMode = !!e.data.enabled
        document.documentElement.setAttribute('data-ngf-edit', editMode ? 'true' : 'false')
        captureDefaults()
        if (editMode) {
          mountReplaceButtons()
        } else {
          dismissNavPopup()
          dismountReplaceButtons()
        }
      }

      if (e.data?.type === 'contentUpdate' && e.data.content) {
        const walk = (obj: unknown, path: string) => {
          if (obj === null || obj === undefined) return
          if (typeof obj === 'string') {
            const el = document.querySelector<HTMLElement>(`[data-ngf-field="${path}"]`)
            if (el) {
              const next = obj === '' ? (el.dataset.ngfDefault ?? '') : obj
              if (isImageField(el)) {
                el.setAttribute('src', sanitizeImageUrl(next))
              } else {
                el.textContent = next
              }
            }
            return
          }
          if (Array.isArray(obj)) {
            obj.forEach((item, i) => walk(item, `${path}.${i}`))
            return
          }
          if (typeof obj === 'object') {
            for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
              walk(v, path ? `${path}.${k}` : k)
            }
          }
        }
        walk(e.data.content, '')
      }

      if (e.data?.type === 'scrollToField' && typeof e.data.path === 'string') {
        const el = document.querySelector<HTMLElement>(`[data-ngf-field="${e.data.path}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.remove('ngf-field-focus')
          void el.offsetWidth
          el.classList.add('ngf-field-focus')
          setTimeout(() => el.classList.remove('ngf-field-focus'), 1700)
        }
      }

      if (e.data?.type === 'addGroupItem' && typeof e.data.group === 'string' && typeof e.data.newIndex === 'number') {
        const group = document.querySelector<HTMLElement>(`[data-ngf-group="${e.data.group}"]`)
        if (!group) return
        const children = Array.from(group.children) as HTMLElement[]
        const template = children[children.length - 1]
        if (!template) return

        const clone = template.cloneNode(true) as HTMLElement
        const prefix = `${e.data.group}.`
        const imgPlaceholder =
          'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
            '<rect width="400" height="300" fill="#e2e8f0"/>' +
            '<text x="200" y="155" text-anchor="middle" font-family="sans-serif" ' +
            'font-size="16" fill="#94a3b8">Click to set image</text></svg>'
          )
        clone.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
          const path = child.getAttribute('data-ngf-field') || ''
          if (path.startsWith(prefix)) {
            const rest = path.slice(prefix.length)
            const dot  = rest.indexOf('.')
            if (dot > -1) {
              const subField = rest.slice(dot + 1)
              const newPath  = `${prefix}${e.data.newIndex}.${subField}`
              child.setAttribute('data-ngf-field', newPath)
              if (isImageField(child)) {
                child.dataset.ngfDefault = imgPlaceholder
                child.setAttribute('src', imgPlaceholder)
              } else {
                child.dataset.ngfDefault = ''
                child.textContent = ''
              }
            }
          }
        })
        group.appendChild(clone)
        clone.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      if (e.data?.type === 'moveGroupItem' && typeof e.data.group === 'string' && typeof e.data.from === 'number' && typeof e.data.to === 'number') {
        const group = document.querySelector<HTMLElement>(`[data-ngf-group="${e.data.group}"]`)
        if (!group) return
        const prefix = `${e.data.group}.`
        const children = Array.from(group.children) as HTMLElement[]
        const from = e.data.from
        const to   = e.data.to
        if (from < 0 || from >= children.length || to < 0 || to >= children.length) return

        const moved = children[from]
        if (to > from) {
          group.insertBefore(moved, children[to].nextSibling)
        } else {
          group.insertBefore(moved, children[to])
        }

        const reordered = Array.from(group.children) as HTMLElement[]
        reordered.forEach((card, newIdx) => {
          card.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
            const path = child.getAttribute('data-ngf-field') || ''
            if (path.startsWith(prefix)) {
              const rest = path.slice(prefix.length)
              const dot  = rest.indexOf('.')
              if (dot > -1) {
                const subField = rest.slice(dot + 1)
                child.setAttribute('data-ngf-field', `${prefix}${newIdx}.${subField}`)
              }
            }
          })
        })
      }

      if (e.data?.type === 'removeGroupItem' && typeof e.data.group === 'string' && typeof e.data.index === 'number') {
        const group = document.querySelector<HTMLElement>(`[data-ngf-group="${e.data.group}"]`)
        if (!group) return
        const prefix = `${e.data.group}.`
        const removeIdx = e.data.index
        const children = Array.from(group.children) as HTMLElement[]

        const target = children.find(child =>
          child.querySelector(`[data-ngf-field^="${prefix}${removeIdx}."]`)
        )
        if (target) target.remove()

        const remaining = Array.from(group.children) as HTMLElement[]
        remaining.forEach(card => {
          card.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
            const path = child.getAttribute('data-ngf-field') || ''
            if (path.startsWith(prefix)) {
              const rest = path.slice(prefix.length)
              const dot  = rest.indexOf('.')
              if (dot > -1) {
                const idxStr = rest.slice(0, dot)
                const idx    = parseInt(idxStr, 10)
                if (!isNaN(idx) && idx > removeIdx) {
                  const subField = rest.slice(dot + 1)
                  const newPath  = `${prefix}${idx - 1}.${subField}`
                  child.setAttribute('data-ngf-field', newPath)
                }
              }
            }
          })
        })
      }
    }

    const clickHandler = (e: MouseEvent) => {
      if (!editMode) return
      if (navPopup && navPopup.contains(e.target as Node)) return
      if ((e.target as HTMLElement)?.classList?.contains('ngf-replace-btn')) return
      if (navPopup) dismissNavPopup()

      let cursor: HTMLElement | null = e.target as HTMLElement | null
      let anchor: HTMLAnchorElement | null = null
      let fieldEl: HTMLElement | null = null
      let buttonEl: HTMLButtonElement | null = null
      let toggleEl: HTMLElement | null = null
      while (cursor && cursor !== document.documentElement) {
        const tag = cursor.tagName?.toLowerCase()
        if (!anchor   && tag === 'a')                                anchor   = cursor as HTMLAnchorElement
        if (!buttonEl && tag === 'button')                           buttonEl = cursor as HTMLButtonElement
        if (!fieldEl  && cursor.getAttribute?.('data-ngf-field'))    fieldEl  = cursor
        if (!toggleEl && cursor.hasAttribute?.('aria-haspopup'))     toggleEl = cursor
        if (!toggleEl && cursor.hasAttribute?.('aria-expanded'))     toggleEl = cursor
        cursor = cursor.parentElement
      }

      if (toggleEl && toggleEl !== fieldEl) {
        return
      }

      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      let editTarget: EditTarget | undefined
      if (fieldEl) {
        const attr = fieldEl.getAttribute('data-ngf-field') ?? ''
        const dot = attr.indexOf('.')
        if (dot > -1) {
          const isImg = isImageField(fieldEl)
          const ngfType = fieldEl.getAttribute('data-ngf-type') || (isImg ? 'image' : 'text')
          editTarget = {
            section:   attr.substring(0, dot),
            field:     attr.substring(dot + 1),
            value:     isImg
              ? (fieldEl.getAttribute('src') ?? '')
              : (fieldEl.textContent?.trim() ?? ''),
            fieldType: ngfType,
            rect:      fieldEl.getBoundingClientRect(),
          }
        }
      }

      if (anchor) {
        const href = anchor.getAttribute('href') ?? ''
        if (href.startsWith('#')) {
          const id = href.slice(1)
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          return
        }
        if (href && href !== '#') {
          const isExternal = /^https?:\/\//.test(anchor.href) && !anchor.href.startsWith(window.location.origin)
          if (isExternal) {
            if (editTarget) postFieldClick(editTarget)
            return
          }
          const label = anchor.textContent?.trim() || anchor.getAttribute('aria-label') || 'Link'
          showNavPopup(anchor.href, label, e.clientX, e.clientY, editTarget)
          return
        }
      }

      if (editTarget) {
        postFieldClick(editTarget)
        return
      }

      if (buttonEl) return
    }

    window.addEventListener('message', messageHandler)
    document.addEventListener('click', clickHandler, true)
    window.addEventListener('scroll', repositionAllBtns, { passive: true })
    window.addEventListener('resize', repositionAllBtns, { passive: true })

    return () => {
      window.removeEventListener('message', messageHandler)
      document.removeEventListener('click', clickHandler, true)
      window.removeEventListener('scroll', repositionAllBtns)
      window.removeEventListener('resize', repositionAllBtns)
      document.getElementById('ngf-edit-styles')?.remove()
      document.documentElement.removeAttribute('data-ngf-edit')
      dismissNavPopup()
      dismountReplaceButtons()
    }
  }, [])

  return null
}
