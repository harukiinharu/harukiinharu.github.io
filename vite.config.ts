import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import UnoCSS from 'unocss/vite'
import SVG from 'vite-svg-loader'
import MarkdownItShiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import MarkdownItMagicLink from 'markdown-it-magic-link'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { ViteSSGOptions } from 'vite-ssg'
import generateSitemap from 'vite-ssg-sitemap'

// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import { slugify } from './scripts/slugify'

const promises: Promise<any>[] = []

const ssgOptions: ViteSSGOptions = {
  script: 'async',
  formatting: 'minify',
  onFinished() {
    generateSitemap({ hostname: 'https://haruki.blog', dynamicRoutes: ['double-lyric', 'kanji', 'plum', 'manga', 'fairy'] })
  },
}

export default defineConfig({
  resolve: {
    alias: [{ find: '~/', replacement: `${resolve(__dirname, 'src')}/` }],
  },
  ssgOptions,
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', 'dayjs', 'dayjs/plugin/localizedFormat'],
  },
  plugins: [
    UnoCSS(),

    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      logs: true,
      extendRoute(route) {
        const path = route.components.get('default')
        if (!path) return

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const { data } = matter(fs.readFileSync(path, 'utf-8'))
          route.addToMeta({
            frontmatter: data,
          })
        }
      },
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: true,
      },
    }),

    Markdown({
      wrapperComponent: id => (id.includes('/demo/') ? 'WrapperDemo' : id.includes('/lyric/') ? 'WrapperLyric' : 'WrapperPost'),
      wrapperClasses: (id, code) => (code.includes('@layout-full-width') ? '' : 'prose m-auto slide-enter-content'),
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        md.use(
          await MarkdownItShiki({
            themes: {
              dark: 'vitesse-dark',
              light: 'vitesse-light',
            },
            defaultColor: false,
            cssVariablePrefix: '--s-',
            transformers: [
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererRich(),
              }),
            ],
          })
        )

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })

        md.use(MarkdownItMagicLink, {
          linksMap: {
            NuxtLabs: 'https://nuxtlabs.com',
            Vitest: 'https://github.com/vitest-dev/vitest',
            Slidev: 'https://github.com/slidevjs/slidev',
            VueUse: 'https://github.com/vueuse/vueuse',
            UnoCSS: 'https://github.com/unocss/unocss',
            Elk: 'https://github.com/elk-zone/elk',
            'Type Challenges': 'https://github.com/type-challenges/type-challenges',
            Vue: 'https://github.com/vuejs/core',
            Nuxt: 'https://github.com/nuxt/nuxt',
            Vite: 'https://github.com/vitejs/vite',
            Shiki: 'https://github.com/shikijs/shiki',
            Twoslash: 'https://github.com/twoslashes/twoslash',
            'ESLint Stylistic': 'https://github.com/eslint-stylistic/eslint-stylistic',
            Unplugin: 'https://github.com/unplugin',
            'Nuxt DevTools': 'https://github.com/nuxt/devtools',
            'Vite PWA': 'https://github.com/vite-pwa',
            'i18n Ally': 'https://github.com/lokalise/i18n-ally',
            ESLint: 'https://github.com/eslint/eslint',
            Astro: 'https://github.com/withastro/astro',
            TwoSlash: 'https://github.com/twoslashes/twoslash',
            'Anthony Fu Collective': { link: 'https://opencollective.com/antfu', imageUrl: 'https://github.com/antfu-collective.png' },
            Netlify: { link: 'https://netlify.com', imageUrl: 'https://github.com/netlify.png' },
            Stackblitz: { link: 'https://stackblitz.com', imageUrl: 'https://github.com/stackblitz.png' },
            Vercel: { link: 'https://vercel.com', imageUrl: 'https://github.com/vercel.png' },
          },
          imageOverrides: [
            ['https://github.com/vuejs/core', 'https://vuejs.org/logo.svg'],
            ['https://github.com/nuxt/nuxt', 'https://nuxt.com/assets/design-kit/icon-green.svg'],
            ['https://github.com/vitejs/vite', 'https://vitejs.dev/logo.svg'],
            ['https://github.com/sponsors', 'https://github.com/github.png'],
            ['https://github.com/sponsors/antfu', 'https://github.com/github.png'],
            ['https://nuxtlabs.com', 'https://github.com/nuxtlabs.png'],
            [/opencollective\.com\/vite/, 'https://github.com/vitejs.png'],
            [/opencollective\.com\/elk/, 'https://github.com/elk-zone.png'],
          ],
        })

        md.use(MarkdownItGitHubAlerts)
      },
    }),

    AutoImport({
      imports: ['vue', VueRouterAutoImports, '@vueuse/core'],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Inspect(),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
      defaultImport: 'url',
    }),

    {
      name: 'await',
      async closeBundle() {
        await Promise.all(promises)
      },
    },
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') next(warning)
      },
    },
  },
})
