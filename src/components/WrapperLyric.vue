<script setup lang="ts">
import { formatDate } from '~/logics'

const { frontmatter, img, date } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
  img: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <a
      border="~ base rounded-lg" block of-hidden
      class="group"
      hover="scale-101 shadow-xl z-10" transition-all duration-500 bg-base relative
      :href="frontmatter.link"
      target="_blank"
    >
      <div class="prose prose-sm p4 m0 pb3">
        <div op50 text-sm pt2>{{ formatDate(date, false) }}</div>
        <slot />
      </div>

      <img
        v-if="img"
        :src="img"
        border="b base"
      >
    </a>
  </div>
</template>
