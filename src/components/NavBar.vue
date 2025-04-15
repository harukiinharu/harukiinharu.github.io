<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">
    <RouterLink class="w-12 h-12 absolute m-5 select-none outline-none" to="/" focusable="false">
      <Logo />
    </RouterLink>
    <button
      title="Scroll to top"
      fixed
      right-3
      bottom-3
      w-10
      h-10
      hover:op100
      rounded-full
      hover-bg-hex-8883
      transition
      duration-300
      z-100
      print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/posts" title="Posts">
          <span class="lt-md:hidden">Posts</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <RouterLink to="/demos" title="Demos">
          <span class="lt-md:hidden">Demos</span>
          <div i-ri-screenshot-line md:hidden />
        </RouterLink>
        <RouterLink to="/lyrics" title="Lyrics">
          <span class="lt-md:hidden">Lyrics</span>
          <div i-flowbite-list-music-outline md:hidden />
        </RouterLink>
        <a href="https://space.bilibili.com/224698542" target="_blank" title="bilibili">
          <div i-simple-icons-bilibili />
        </a>
        <a href="https://music.163.com/#/user/home?id=1594809053" target="_blank" title="wyy">
          <div i-simple-icons-neteasecloudmusic />
        </a>
        <a href="https://x.com/harukiinharu" target="_blank" title="X" class="lt-md:hidden">
          <div i-simple-icons-x />
        </a>
        <a href="https://github.com/harukiinharu/harukiinharu.github.io" target="_blank" title="GitHub">
          <div i-uil-github-alt />
        </a>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
