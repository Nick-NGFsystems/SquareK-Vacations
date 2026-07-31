'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Name shown in the console if this subtree fails. */
  label?: string
}

interface State {
  failed: boolean
}

/**
 * Error boundary for NON-CRITICAL client components.
 *
 * Anything mounted in the root layout (analytics, the NGF edit bridge) runs on
 * every page for every visitor. Without a boundary, a single throw in one of
 * those widgets replaces the ENTIRE site with Next.js's
 * "Application error: a client-side exception has occurred" screen — which
 * search engines can then crawl and index as the page description.
 *
 * This renders nothing when a child throws, so the real page content still
 * loads. Only wrap components the site can live without.
 */
export default class SafeBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(`[SafeBoundary] ${this.props.label ?? 'component'} failed:`, error)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
