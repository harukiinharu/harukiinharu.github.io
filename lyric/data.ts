import type { Component } from 'vue'

const img = import.meta.glob('./*.avif', { eager: true, query: '?url' }) as any

export const lyricItems = Array.from(Object.entries(import.meta.glob('./*.md', { eager: true })))
  .map(([path, page]: any) => ({
    date: path.slice(2, -3) as string,
    comp: page.default as Component,
    img: img[`./${path.slice(2, -3)}.avif`].default as string,
  }))
  .sort((a, b) => b.date.localeCompare(a.date))
