'use client'
import { useEffect } from 'react'

export default function NgfEditBridge() {
  useEffect(() => {
    let editMode = false
    let trustedOrigin: string | null = null

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
        min-height: 1.2em; min-width: 60px; display: inline-block;
      }
      [data-ngf-edit="true"] [data-ngf-field]:empty::before {
        content: attr(data-ngf-label); color: #94a3b8;
        font-style: italic; pointer-events: none;
      }
      [data-ngf-field].ngf-field-focus { animation: ngfFieldFocus 1.6s ease-out; }
      @keyframes ngfFieldFocus {
        0%   { outline-color: #3b82f6 !important; background-color: rgba(59,130,246,0.25) !important; }
        100% { outline-color: rgba(59,130,246,0.45) !important; background-color: transparent !important; }
      }
      [data-ngf-edit="true"] [aria-haspopup],
      [data-ngf-edit="true"] [aria-expanded] { cursor: pointer !important; }
      [data-ngf-edit="true"] #desktop-more-menu {
        pointer-events: auto !important; opacity: 1 !important; transform: translateY(0) !important;
      }
      #ngf-nav-popup {
        position: fixed; z-index: 2147483647; background: #fff;
        border: 1px solid #e2e8f0; border-radius: 10px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08);
        padding: 6px; display: flex; flex-direction: column; gap: 2px;
        min-width: 170px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        pointer-events: auto !important;
      }
      #ngf-nav-popup-label {
        font-size: 11px; color: #94a3b8; padding: 4px 10px 2px; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.06em;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;
      }
      #ngf-nav-popup .ngf-nav-btn {
        all: unset; display: block; width: 100%; box-sizing: border-box;
        padding: 7px 10px; border-radius: 7px; font-size: 13px; font-weight: 500;
        cursor: pointer; transition: background 0.12s; white-space: nowrap;
        pointer-events: auto !important;
      }
      #ngf-nav-popup .ngf-go-btn   { color: #1d4ed8; background: #eff6ff; }
      #ngf-nav-popup .ngf-go-btn:hover { background: #dbeafe; }
      #ngf-nav-popup .ngf-edit-btn { color: #0f172a; background: transparent; }
      #ngf-nav-popup .ngf-edit-btn:hover { background: #f3f4f6; }
      .ngf-replace-btn {
        position: fixed; z-index: 2147483646;
        background: rgba(0,0,0,0.62); backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px); color: #fff; border: none;
        border-radius: 6px; padding: 5px 10px; font-size: 12px; font-weight: 600;
        line-height: 1.4; cursor: pointer;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        pointer-events: auto !important; transition: background 0.15s;
        white-space: nowrap; user-select: none;
      }
      .ngf-replace-btn:hover { background: rgba(0,0,0,0.85); }
      .ngf-replacing { opacity: 0.35 !important; transition: opacity 0.2s; }
      .ngf-img-spinner-wrap {
        position: absolute; inset: 0; display: flex; align-items: center;
        justify-content: center; background: rgba(255,255,255,0.5);
        backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
        z-index: 5; border-radius: inherit; pointer-events: none;
      }
      .ngf-img-spinner {
        width: 20px; height: 20px;
        border: 2.5px solid rgba(37,99,235,0.3); border-top-color: #2563eb;
        border-radius: 50%; animation: ngf-spin 0.75s linear infinite;
      }
      #ngf-upload-toast {
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        z-index: 2147483647; background: rgba(15,23,42,0.92); color: #fff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px; font-weight: 600; padding: 9px 18px 9px 14px;
        border-radius: 24px; display: flex; align-items: center; gap: 9px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.28); pointer-events: none;
        opacity: 0; transition: opacity 0.2s;
      }
      #ngf-upload-toast.ngf-toast-visible { opacity: 1; }
      .ngf-toast-spinner {
        width: 13px; height: 13px; border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #fff; border-radius: 50%;
        animation: ngf-spin 0.7s linear infinite; flex-shrink: 0;
      }
      @keyframes ngf-spin { to { transform: rotate(360deg); } }
      .ngf-gallery-edit-grid { display: none; }
      [data-ngf-edit="true"] .ngf-gallery-edit-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 150px));
        gap: 6px; margin-top: 10px; padding: 12px;
        background: rgba(59,130,246,0.04);
        border: 1.5px dashed rgba(59,130,246,0.35); border-radius: 8px;
      }
      [data-ngf-edit="true"] .ngf-gallery-edit-grid::before {
        content: 'Gallery photos — hover to reorder or remove';
        display: block; grid-column: 1 / -1;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 11px; font-weight: 600; color: #3b82f6;
        text-transform: uppercase; letter-spacing: 0.06em; padding-bottom: 4px;
      }
      [data-ngf-edit="true"] .ngf-gallery-edit-grid > *:not(.ngf-save-bar):not(.ngf-add-row) {
        position: relative; aspect-ratio: 3/2; overflow: hidden;
        border-radius: 5px; cursor: pointer;
      }
      [data-ngf-edit="true"] .ngf-gallery-edit-grid img {
        width: 100%; height: 100%; object-fit: cover; display: block;
      }
      .ngf-grp-controls {
        position: absolute; bottom: 0; left: 0; right: 0;
        display: flex; align-items: center; justify-content: center;
        gap: 3px; padding: 4px 3px 5px;
        background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%);
        opacity: 0; transition: opacity 0.15s; pointer-events: none;
      }
      [data-ngf-edit="true"] .ngf-gallery-edit-grid > *:hover .ngf-grp-controls {
        opacity: 1; pointer-events: auto;
      }
      .ngf-grp-btn {
        all: unset; display: flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border-radius: 4px;
        background: rgba(255,255,255,0.9); font-size: 13px; font-weight: 700;
        line-height: 1; cursor: pointer; color: #0f172a;
        transition: background 0.1s; pointer-events: auto !important; flex-shrink: 0;
      }
      .ngf-grp-btn:hover { background: #fff; }
      .ngf-grp-del { color: #dc2626; }
      .ngf-grp-del:hover { background: #fff; color: #b91c1c; }
      .ngf-add-row {
        grid-column: 1 / -1; display: flex; align-items: center;
        padding: 6px 2px 2px;
        border-top: 1px dashed rgba(59,130,246,0.25); margin-top: 2px; gap: 10px;
      }
      .ngf-add-btn {
        all: unset; cursor: pointer; display: inline-flex; align-items: center;
        gap: 5px; background: rgba(59,130,246,0.08);
        border: 1.5px dashed rgba(59,130,246,0.45); color: #2563eb;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 12px; font-weight: 600; padding: 5px 13px; border-radius: 6px;
        transition: background 0.12s; pointer-events: auto !important;
      }
      .ngf-add-btn:hover { background: rgba(59,130,246,0.15); }
      .ngf-save-bar {
        grid-column: 1 / -1; display: flex; align-items: center;
        justify-content: space-between; gap: 8px; padding: 8px 2px 2px;
        border-top: 1px solid rgba(59,130,246,0.25); margin-top: 2px;
      }
      .ngf-save-bar-label {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 11px; font-weight: 600; color: #64748b;
        text-transform: uppercase; letter-spacing: 0.05em;
      }
      .ngf-save-bar-actions { display: flex; gap: 6px; }
      .ngf-save-btn {
        all: unset; cursor: pointer; background: #2563eb; color: #fff;
        font-family: system-ui, sans-serif; font-size: 12px; font-weight: 600;
        padding: 5px 14px; border-radius: 6px; transition: background 0.12s;
        pointer-events: auto !important;
      }
      .ngf-save-btn:hover { background: #1d4ed8; }
      .ngf-discard-btn {
        all: unset; cursor: pointer; background: #f1f5f9; color: #475569;
        font-family: system-ui, sans-serif; font-size: 12px; font-weight: 500;
        padding: 5px 11px; border-radius: 6px; transition: background 0.12s;
        pointer-events: auto !important;
      }
      .ngf-discard-btn:hover { background: #e2e8f0; }
    `
    document.head.appendChild(style)

    const toast = document.createElement('div')
    toast.id = 'ngf-upload-toast'
    const toastSpinner = document.createElement('div')
    toastSpinner.className = 'ngf-toast-spinner'
    const toastText = document.createElement('span')
    toastText.textContent = 'Uploading photo…'
    toast.appendChild(toastSpinner)
    toast.appendChild(toastText)
    document.body.appendChild(toast)

    const loadingFields = new Set<string>()

    function showImageLoading(field: string) {
      loadingFields.add(field)
      toast.classList.add('ngf-toast-visible')
      document.querySelectorAll<HTMLElement>('[data-ngf-field="' + field + '"]').forEach(el => {
        el.classList.add('ngf-replacing')
        const wrap = el.parentElement
        if (wrap && !wrap.querySelector('.ngf-img-spinner-wrap')) {
          const overlay = document.createElement('div')
          overlay.className = 'ngf-img-spinner-wrap'
          const spin = document.createElement('div')
          spin.className = 'ngf-img-spinner'
          overlay.appendChild(spin)
          wrap.appendChild(overlay)
        }
      })
    }

    function clearImageLoading(field: string) {
      loadingFields.delete(field)
      if (loadingFields.size === 0) toast.classList.remove('ngf-toast-visible')
      document.querySelectorAll<HTMLElement>('[data-ngf-field="' + field + '"]').forEach(el => {
        el.classList.remove('ngf-replacing')
        el.parentElement?.querySelector('.ngf-img-spinner-wrap')?.remove()
      })
    }

    const pendingGroups = new Set<string>()
    const groupOriginalOrder = new Map<string, HTMLElement[]>()

    function getGroupItems(groupEl: HTMLElement): HTMLElement[] {
      return Array.from(groupEl.children).filter(c => {
        const el = c as HTMLElement
        return !el.classList.contains('ngf-grp-controls') &&
               !el.classList.contains('ngf-save-bar') &&
               !el.classList.contains('ngf-add-row')
      }) as HTMLElement[]
    }

    function snapshotGroups() {
      document.querySelectorAll<HTMLElement>('[data-ngf-group]').forEach(groupEl => {
        const group = groupEl.getAttribute('data-ngf-group')!
        groupOriginalOrder.set(group, [...getGroupItems(groupEl)])
      })
    }

    function markPending(group: string) {
      pendingGroups.add(group)
      refreshSaveBar(group)
    }

    function clearPending(group: string) {
      pendingGroups.delete(group)
      refreshSaveBar(group)
    }

    function refreshSaveBar(group: string) {
      const groupEl = document.querySelector<HTMLElement>('[data-ngf-group="' + group + '"]')
      if (!groupEl) return
      const existing = groupEl.querySelector<HTMLElement>('.ngf-save-bar')
      if (!pendingGroups.has(group)) { existing?.remove(); return }
      if (existing) return

      const bar = document.createElement('div')
      bar.className = 'ngf-save-bar'
      const lbl = document.createElement('span')
      lbl.className = 'ngf-save-bar-label'
      lbl.textContent = 'Unsaved changes'
      const actions = document.createElement('div')
      actions.className = 'ngf-save-bar-actions'

      const discardBtn = document.createElement('button')
      discardBtn.className = 'ngf-discard-btn'
      discardBtn.textContent = 'Discard'
      discardBtn.addEventListener('click', ev => {
        ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation()
        const original = groupOriginalOrder.get(group)
        if (original) {
          while (groupEl.firstChild) groupEl.removeChild(groupEl.firstChild)
          original.forEach(item => {
            item.querySelectorAll('.ngf-grp-controls').forEach(c => c.remove())
            groupEl.appendChild(item)
          })
          reindexGroup(groupEl, group)
        }
        clearPending(group)
        if (editMode) {
          requestAnimationFrame(() => {
            mountAddRow(groupEl, group)
            mountGroupControls(groupEl, group)
            mountReplaceButtons()
          })
        }
      })

      const saveBtn = document.createElement('button')
      saveBtn.className = 'ngf-save-btn'
      saveBtn.textContent = 'Save changes'
      saveBtn.addEventListener('click', ev => {
        ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation()
        notifyGroupUpdate(groupEl, group)
        groupOriginalOrder.set(group, [...getGroupItems(groupEl)])
        clearPending(group)
      })

      actions.appendChild(discardBtn)
      actions.appendChild(saveBtn)
      bar.appendChild(lbl)
      bar.appendChild(actions)
      groupEl.appendChild(bar)
    }

    const PLACEHOLDER_SVG =
      'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 267">' +
        '<rect width="400" height="267" fill="#e2e8f0"/>' +
        '<text x="200" y="140" text-anchor="middle" font-family="sans-serif" ' +
        'font-size="15" fill="#94a3b8">New photo</text></svg>'
      )

    function mountAddRow(groupEl: HTMLElement, group: string) {
      if (groupEl.querySelector('.ngf-add-row')) return
      const row = document.createElement('div')
      row.className = 'ngf-add-row'
      const addBtn = document.createElement('button')
      addBtn.className = 'ngf-add-btn'
      addBtn.title = 'Add a new photo'
      addBtn.textContent = '+ Add photo'
      addBtn.addEventListener('click', ev => {
        ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation()
        const items = getGroupItems(groupEl)
        if (items.length === 0) return
        const template = items[items.length - 1]
        const clone = template.cloneNode(true) as HTMLElement
        const newIdx = items.length
        const prefix = group + '.'
        clone.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
          const path = child.getAttribute('data-ngf-field') || ''
          if (path.startsWith(prefix)) {
            const rest = path.slice(prefix.length)
            const dot  = rest.indexOf('.')
            if (dot > -1) {
              child.setAttribute('data-ngf-field', prefix + newIdx + '.' + rest.slice(dot + 1))
              if (isImageField(child)) {
                child.setAttribute('src', PLACEHOLDER_SVG)
                child.dataset.ngfDefault = PLACEHOLDER_SVG
              } else {
                child.textContent = ''
                child.dataset.ngfDefault = ''
              }
            }
          }
        })
        clone.querySelectorAll('.ngf-grp-controls').forEach(c => c.remove())
        groupEl.insertBefore(clone, row)
        reindexGroup(groupEl, group)
        markPending(group)
        mountGroupControls(groupEl, group)
        requestAnimationFrame(() => {
          mountReplaceButtons()
          const newImg = clone.querySelector<HTMLImageElement>('img[data-ngf-field]')
          if (newImg) {
            const field = newImg.getAttribute('data-ngf-field') || ''
            const dot   = field.indexOf('.')
            if (dot > -1) {
              showImageLoading(field)
              postFieldClick({
                section:   field.substring(0, dot),
                field:     field.substring(dot + 1),
                value:     '',
                fieldType: 'image',
                rect:      newImg.getBoundingClientRect(),
              })
            }
          }
        })
      })
      row.appendChild(addBtn)
      groupEl.appendChild(row)
    }

    function getItemIndex(item: Element, group: string): number {
      const prefix = group + '.'
      const img = item.querySelector('[data-ngf-field^="' + prefix + '"]')
      if (!img) return -1
      const field = img.getAttribute('data-ngf-field') || ''
      const rest  = field.slice(prefix.length)
      const idx   = parseInt(rest.split('.')[0], 10)
      return isNaN(idx) ? -1 : idx
    }

    function reindexGroup(groupEl: HTMLElement, group: string) {
      const prefix = group + '.'
      getGroupItems(groupEl).forEach((child, newIdx) => {
        child.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(el => {
          const path = el.getAttribute('data-ngf-field') || ''
          if (path.startsWith(prefix)) {
            const rest = path.slice(prefix.length)
            const dot  = rest.indexOf('.')
            if (dot > -1) {
              el.setAttribute('data-ngf-field', prefix + newIdx + '.' + rest.slice(dot + 1))
            }
          }
        })
      })
    }

    // Sync the hero/cover image to the first gallery item for live preview
    function syncHeroImage(groupEl: HTMLElement, group: string) {
      // group is like "property.lakeshore-grand-retreat.images"
      const match = group.match(/^property\.(.+)\.images$/)
      if (!match) return
      const slug     = match[1]
      const firstImg = getGroupItems(groupEl)[0]?.querySelector<HTMLImageElement>('img[data-ngf-field]')
      if (!firstImg) return
      const firstUrl = firstImg.getAttribute('src') || ''
      if (!firstUrl || firstUrl.startsWith('data:')) return // skip placeholder
      const heroField = 'property.' + slug + '.heroImage'
      document.querySelectorAll<HTMLElement>('[data-ngf-field="' + heroField + '"]').forEach(el => {
        if (isImageField(el)) el.setAttribute('src', sanitizeImageUrl(firstUrl))
      })
    }

    function notifyGroupUpdate(groupEl: HTMLElement, group: string) {
      const items: Record<string, string>[] = []
      getGroupItems(groupEl).forEach(child => {
        const img = child.querySelector<HTMLImageElement>('img[data-ngf-field]')
        if (img) items.push({ image: img.getAttribute('src') || '' })
      })
      window.parent.postMessage(
        { type: 'ngfGroupUpdate', group, items },
        trustedOrigin ?? 'https://app.ngfsystems.com',
      )
      // Also tell the portal to update heroImage to match first gallery image
      if (items.length > 0) {
        const match = group.match(/^property\.(.+)\.images$/)
        if (match) {
          window.parent.postMessage(
            { type: 'ngfFieldUpdate', field: 'property.' + match[1] + '.heroImage', value: items[0].image },
            trustedOrigin ?? 'https://app.ngfsystems.com',
          )
        }
      }
    }

    function moveGroupItemInDom(groupEl: HTMLElement, group: string, from: number, to: number) {
      const items  = getGroupItems(groupEl)
      const fromEl = items.find(c => getItemIndex(c, group) === from)
      const toEl   = items.find(c => getItemIndex(c, group) === to)
      if (!fromEl || !toEl) return
      groupEl.insertBefore(fromEl, from < to ? toEl.nextSibling : toEl)
      reindexGroup(groupEl, group)
      syncHeroImage(groupEl, group)
      markPending(group)
      mountGroupControls(groupEl, group)
      requestAnimationFrame(() => mountReplaceButtons())
    }

    function deleteGroupItemInDom(groupEl: HTMLElement, group: string, idx: number) {
      const items  = getGroupItems(groupEl)
      const target = items.find(c => getItemIndex(c, group) === idx)
      if (!target) return
      target.remove()
      reindexGroup(groupEl, group)
      syncHeroImage(groupEl, group)
      markPending(group)
      mountGroupControls(groupEl, group)
      requestAnimationFrame(() => mountReplaceButtons())
    }

    function mountGroupControls(groupEl: HTMLElement, group: string) {
      groupEl.querySelectorAll('.ngf-grp-controls').forEach(el => el.remove())
      getGroupItems(groupEl).forEach(item => {
        const controls = document.createElement('div')
        controls.className = 'ngf-grp-controls'

        const upBtn = document.createElement('button')
        upBtn.className = 'ngf-grp-btn'
        upBtn.title = 'Move left'
        upBtn.textContent = '←'
        upBtn.addEventListener('click', ev => {
          ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation()
          const idx = getItemIndex(item, group)
          if (idx > 0) moveGroupItemInDom(groupEl, group, idx, idx - 1)
        })

        const delBtn = document.createElement('button')
        delBtn.className = 'ngf-grp-btn ngf-grp-del'
        delBtn.title = 'Remove photo'
        delBtn.textContent = '×'
        delBtn.addEventListener('click', ev => {
          ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation()
          const idx = getItemIndex(item, group)
          if (idx >= 0) deleteGroupItemInDom(groupEl, group, idx)
        })

        const dnBtn = document.createElement('button')
        dnBtn.className = 'ngf-grp-btn'
        dnBtn.title = 'Move right'
        dnBtn.textContent = '→'
        dnBtn.addEventListener('click', ev => {
          ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation()
          const idx      = getItemIndex(item, group)
          const curTotal = getGroupItems(groupEl).length
          if (idx >= 0 && idx < curTotal - 1) moveGroupItemInDom(groupEl, group, idx, idx + 1)
        })

        controls.appendChild(upBtn)
        controls.appendChild(delBtn)
        controls.appendChild(dnBtn)
        item.appendChild(controls)
      })
    }

    function mountAllGroupControls() {
      document.querySelectorAll<HTMLElement>('[data-ngf-group]').forEach(groupEl => {
        const group = groupEl.getAttribute('data-ngf-group')!
        mountGroupControls(groupEl, group)
        mountAddRow(groupEl, group)
      })
    }

    function dismountAllGroupControls() {
      document.querySelectorAll('.ngf-grp-controls').forEach(el => el.remove())
      document.querySelectorAll('.ngf-save-bar').forEach(el => el.remove())
      document.querySelectorAll('.ngf-add-row').forEach(el => el.remove())
    }

    const replaceButtons = new Map<HTMLImageElement, HTMLButtonElement>()

    function positionBtn(img: HTMLImageElement, btn: HTMLButtonElement) {
      const r = img.getBoundingClientRect()
      if (r.width < 40 || r.height < 40 || r.bottom <= 0 || r.top >= window.innerHeight) {
        btn.style.display = 'none'; return
      }
      btn.style.display = ''
      btn.style.top   = (r.top  + 8) + 'px'
      btn.style.right = (window.innerWidth - r.right + 8) + 'px'
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
        btn.addEventListener('click', ev => {
          ev.stopPropagation(); ev.preventDefault(); ev.stopImmediatePropagation()
          const field = img.getAttribute('data-ngf-field') ?? ''
          const dot   = field.indexOf('.')
          if (dot > -1) {
            showImageLoading(field)
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

    let navPopup: HTMLDivElement | null = null
    function dismissNavPopup() { navPopup?.remove(); navPopup = null }

    type EditTarget = {
      section: string; field: string; value: string; fieldType: string; rect: DOMRect
    }

    function postFieldClick(t: EditTarget) {
      window.parent.postMessage(
        {
          type: 'fieldClick', section: t.section, field: t.field,
          currentValue: t.value, fieldType: t.fieldType,
          elementRect: {
            top: t.rect.top, left: t.rect.left, bottom: t.rect.bottom,
            right: t.rect.right, width: t.rect.width, height: t.rect.height,
          },
        },
        trustedOrigin ?? 'https://app.ngfsystems.com',
      )
    }

    function showNavPopup(href: string, label: string, clientX: number, clientY: number, editTarget?: EditTarget) {
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
      goBtn.addEventListener('click', ev => { ev.stopPropagation(); dismissNavPopup(); window.location.href = href })
      popup.appendChild(goBtn)
      if (editTarget) {
        const editBtn = document.createElement('button')
        editBtn.className = 'ngf-nav-btn ngf-edit-btn'
        editBtn.textContent = 'Edit'
        editBtn.addEventListener('click', ev => { ev.stopPropagation(); dismissNavPopup(); postFieldClick(editTarget) })
        popup.appendChild(editBtn)
      }
      popup.style.visibility = 'hidden'
      document.body.appendChild(popup)
      navPopup = popup
      const pw = popup.offsetWidth || 180, ph = popup.offsetHeight || 110
      const vw = window.innerWidth, vh = window.innerHeight
      let left = clientX, top = clientY + 10
      if (left + pw + 8 > vw) left = vw - pw - 8
      if (top  + ph + 8 > vh) top  = clientY - ph - 10
      popup.style.left = Math.max(8, left) + 'px'
      popup.style.top  = Math.max(8, top)  + 'px'
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

    function sanitizeImageUrl(url: string): string {
      if (url === '') return ''
      if (/^https?:\/\//i.test(url) || url.startsWith('/') || /^data:image\//i.test(url)) return url
      return ''
    }

    window.parent.postMessage({ type: 'ngfReady' }, '*')

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
          requestAnimationFrame(() => {
            mountReplaceButtons()
            mountAllGroupControls()
            snapshotGroups()
          })
        } else {
          dismissNavPopup()
          dismountReplaceButtons()
          dismountAllGroupControls()
          pendingGroups.clear()
          const fieldsToClean = Array.from(loadingFields)
          fieldsToClean.forEach(f => clearImageLoading(f))
          loadingFields.clear()
          toast.classList.remove('ngf-toast-visible')
          document.querySelectorAll('.ngf-replacing').forEach(el => el.classList.remove('ngf-replacing'))
          document.querySelectorAll('.ngf-img-spinner-wrap').forEach(el => el.remove())
        }
      }

      if (e.data?.type === 'contentUpdate' && e.data.content) {
        const walk = (obj: unknown, path: string) => {
          if (obj === null || obj === undefined) return
          if (typeof obj === 'string') {
            if (loadingFields.has(path)) clearImageLoading(path)
            const els = document.querySelectorAll<HTMLElement>('[data-ngf-field="' + path + '"]')
            els.forEach(el => {
              const next = obj === '' ? (el.dataset.ngfDefault ?? '') : obj
              if (isImageField(el)) {
                el.setAttribute('src', sanitizeImageUrl(next))
                el.classList.remove('ngf-replacing')
                el.parentElement?.querySelector('.ngf-img-spinner-wrap')?.remove()
              } else {
                el.textContent = next
              }
            })
            return
          }
          if (Array.isArray(obj)) { obj.forEach((item, i) => walk(item, path + '.' + i)); return }
          if (typeof obj === 'object') {
            for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
              walk(v, path ? path + '.' + k : k)
            }
          }
        }
        walk(e.data.content, '')
      }

      if (e.data?.type === 'scrollToField' && typeof e.data.path === 'string') {
        const el = document.querySelector<HTMLElement>('[data-ngf-field="' + e.data.path + '"]')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.remove('ngf-field-focus')
          void el.offsetWidth
          el.classList.add('ngf-field-focus')
          setTimeout(() => el.classList.remove('ngf-field-focus'), 1700)
        }
      }

      if (e.data?.type === 'addGroupItem' && typeof e.data.group === 'string' && typeof e.data.newIndex === 'number') {
        const groupEl = document.querySelector<HTMLElement>('[data-ngf-group="' + e.data.group + '"]')
        if (!groupEl) return
        const items    = getGroupItems(groupEl)
        const template = items[items.length - 1]
        if (!template) return
        const clone  = template.cloneNode(true) as HTMLElement
        const prefix = e.data.group + '.'
        clone.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
          const path = child.getAttribute('data-ngf-field') || ''
          if (path.startsWith(prefix)) {
            const rest = path.slice(prefix.length)
            const dot  = rest.indexOf('.')
            if (dot > -1) {
              child.setAttribute('data-ngf-field', prefix + e.data.newIndex + '.' + rest.slice(dot + 1))
              if (isImageField(child)) {
                child.dataset.ngfDefault = PLACEHOLDER_SVG
                child.setAttribute('src', PLACEHOLDER_SVG)
              } else { child.dataset.ngfDefault = ''; child.textContent = '' }
            }
          }
        })
        clone.querySelectorAll('.ngf-grp-controls').forEach(el => el.remove())
        const addRow = groupEl.querySelector('.ngf-add-row')
        groupEl.insertBefore(clone, addRow ?? null)
        clone.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if (editMode) requestAnimationFrame(() => { mountGroupControls(groupEl, e.data.group); mountReplaceButtons() })
      }

      if (e.data?.type === 'moveGroupItem' && typeof e.data.group === 'string' &&
          typeof e.data.from === 'number' && typeof e.data.to === 'number') {
        const groupEl  = document.querySelector<HTMLElement>('[data-ngf-group="' + e.data.group + '"]')
        if (!groupEl) return
        const prefix   = e.data.group + '.'
        const children = Array.from(groupEl.children) as HTMLElement[]
        const { from, to } = e.data
        if (from < 0 || from >= children.length || to < 0 || to >= children.length) return
        const moved = children[from]
        groupEl.insertBefore(moved, to > from ? children[to].nextSibling : children[to])
        Array.from(groupEl.children).forEach((card, newIdx) => {
          card.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
            const path = child.getAttribute('data-ngf-field') || ''
            if (path.startsWith(prefix)) {
              const rest = path.slice(prefix.length)
              const dot  = rest.indexOf('.')
              if (dot > -1) child.setAttribute('data-ngf-field', prefix + newIdx + '.' + rest.slice(dot + 1))
            }
          })
        })
        if (editMode) mountGroupControls(groupEl, e.data.group)
      }

      if (e.data?.type === 'removeGroupItem' && typeof e.data.group === 'string' && typeof e.data.index === 'number') {
        const groupEl   = document.querySelector<HTMLElement>('[data-ngf-group="' + e.data.group + '"]')
        if (!groupEl) return
        const prefix    = e.data.group + '.'
        const removeIdx = e.data.index
        const target    = Array.from(groupEl.children).find(child =>
          child.querySelector('[data-ngf-field^="' + prefix + removeIdx + '."]')
        )
        if (target) target.remove()
        Array.from(groupEl.children).forEach(card => {
          card.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(child => {
            const path = child.getAttribute('data-ngf-field') || ''
            if (path.startsWith(prefix)) {
              const rest = path.slice(prefix.length)
              const dot  = rest.indexOf('.')
              if (dot > -1) {
                const idx = parseInt(rest.slice(0, dot), 10)
                if (!isNaN(idx) && idx > removeIdx) {
                  child.setAttribute('data-ngf-field', prefix + (idx - 1) + '.' + rest.slice(dot + 1))
                }
              }
            }
          })
        })
        if (editMode) mountGroupControls(groupEl, e.data.group)
      }
    }

    const clickHandler = (e: MouseEvent) => {
      if (!editMode) return
      const target = e.target as HTMLElement
      if (target?.classList?.contains('ngf-replace-btn')) return
      if (target?.classList?.contains('ngf-grp-btn')) return
      if (target?.closest?.('.ngf-grp-controls')) return
      if (target?.closest?.('.ngf-save-bar')) return
      if (target?.closest?.('.ngf-add-row')) return
      if (navPopup && navPopup.contains(target)) return
      if (navPopup) dismissNavPopup()

      let cursor: HTMLElement | null = target
      let anchor:   HTMLAnchorElement    | null = null
      let fieldEl:  HTMLElement          | null = null
      let buttonEl: HTMLButtonElement    | null = null
      let toggleEl: HTMLElement          | null = null

      while (cursor && cursor !== document.documentElement) {
        const tag = cursor.tagName?.toLowerCase()
        if (!anchor   && tag === 'a')                              anchor   = cursor as HTMLAnchorElement
        if (!buttonEl && tag === 'button')                         buttonEl = cursor as HTMLButtonElement
        if (!fieldEl  && cursor.getAttribute?.('data-ngf-field')) fieldEl  = cursor
        if (!toggleEl && cursor.hasAttribute?.('aria-haspopup'))   toggleEl = cursor
        if (!toggleEl && cursor.hasAttribute?.('aria-expanded'))   toggleEl = cursor
        cursor = cursor.parentElement
      }

      if (toggleEl && toggleEl !== fieldEl) return

      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation()

      let editTarget: EditTarget | undefined
      if (fieldEl) {
        const attr = fieldEl.getAttribute('data-ngf-field') ?? ''
        const dot  = attr.indexOf('.')
        if (dot > -1) {
          const isImg   = isImageField(fieldEl)
          const ngfType = fieldEl.getAttribute('data-ngf-type') || (isImg ? 'image' : 'text')
          editTarget = {
            section:   attr.substring(0, dot),
            field:     attr.substring(dot + 1),
            value:     isImg ? (fieldEl.getAttribute('src') ?? '') : (fieldEl.textContent?.trim() ?? ''),
            fieldType: ngfType,
            rect:      fieldEl.getBoundingClientRect(),
          }
        }
      }

      if (anchor) {
        const href = anchor.getAttribute('href') ?? ''
        if (href.startsWith('#')) {
          document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); return
        }
        if (href && href !== '#') {
          const isExternal = /^https?:\/\//.test(anchor.href) && !anchor.href.startsWith(window.location.origin)
          if (isExternal) {
            window.open(anchor.href, '_blank', 'noopener'); return
          }
          showNavPopup(href, anchor.textContent?.trim() ?? 'Link', e.clientX, e.clientY, editTarget)
          return
        }
      }

      if (fieldEl && editTarget) postFieldClick(editTarget)
    }

    window.addEventListener('message', messageHandler)
    document.addEventListener('click', clickHandler, true)
    window.addEventListener('scroll', repositionAllBtns, { passive: true })
    window.addEventListener('resize', repositionAllBtns, { passive: true })

    return () => {
      style.remove()
      toast.remove()
      document.removeEventListener('click', clickHandler, true)
      window.removeEventListener('message', messageHandler)
      window.removeEventListener('scroll', repositionAllBtns)
      window.removeEventListener('resize', repositionAllBtns)
      dismountReplaceButtons()
      dismountAllGroupControls()
    }
  }, [])

  return null
}
