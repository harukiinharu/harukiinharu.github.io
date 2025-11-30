<template>
  <svg id="_layer_2" data-name="layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1363.56 1072.15">
    <g id="layer1">
      <path class="path1" d="m9.78,109.08h668.76" />
      <path class="path1" d="m9.78,266.08h668.76" />
      <path class="path1" d="m9.78,420.08h668.76" />
      <path class="path1" d="m22.78,661.86L367.38,12.08" />
      <path class="path1" d="m661.72,664.33l-127.94-241.25" />
      <path class="path1" d="m67.78,646.08h577.58" />
      <path class="path1" d="m67.78,1065.84v-432.76" />
      <path class="path1" d="m620.78,1065.84v-432.76" />
      <path class="path1" d="m67.78,1039.08h577.58" />
      <path class="path1" d="m67.78,845.08h493.28" />
      <path class="path1" d="m694.78,168.08h668.76" />
      <path class="path1" d="m1025.78,1071.13V31.08" />
      <path class="path1" d="m714.78,1068.87l106.21-828.79" />
      <path class="path1" d="m1337.99,1068.87l-106.21-828.79" />
    </g>
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}

@media print {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}

@keyframes grow {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 350px;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  40% {
    stroke-dasharray: 350px 0;
  }

  85% {
    stroke-dasharray: 350px 0;
  }

  95%,
  to {
    stroke-dasharray: 0 350px;
  }
}

.path1 {
  stroke-dashoffset: 1px;
  stroke-dasharray: 350px 0;
  stroke-width: 50px;
  animation: grow 10s ease forwards infinite;
  transform-origin: center;
  stroke: #303030;
  animation-delay: 0s;
}

.dark .path1 {
  stroke: #c3c3c3;
}
</style>
