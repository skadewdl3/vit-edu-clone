<script setup lang="ts">
import {
  isMenuOpen,
  activeSection as activeSectionAtom,
  navTheme as navThemeAtom,
  smallNavTheme as smallNavThemeAtom
} from '@store/menu'
import { sections } from '@utils/utils'
import { useStore } from '@nanostores/vue'
import { ref, watch, onMounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { throttle } from 'lodash'

const navThemeValue = useStore(navThemeAtom)
const smallNavThemeValue = useStore(smallNavThemeAtom)
const navTheme = ref(navThemeValue.value)
const menuOpen = useStore(isMenuOpen)

const isSmall = ref(false)

const openSection = (sectionIndex: number) => {
  isMenuOpen.set(true)
  setTimeout(() => {
    activeSectionAtom.set(sectionIndex)
  }, 200)
}

const openMenu = () => {
  isMenuOpen.set(true)
}

watch(menuOpen, () => {
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

watch([navThemeValue, smallNavThemeValue], () => {
  if (!isSmall.value) {
    navTheme.value = navThemeValue.value
  } else {
    navTheme.value = smallNavThemeValue.value
  }
})


const { y } = useWindowScroll()
let prevColor = navTheme.value

const scrollListener = throttle(() => {
  if (y.value >= 100 && !isSmall.value) {
    prevColor = navTheme.value
    isSmall.value = true
    navTheme.value = smallNavThemeValue.value
  } else if (y.value < 100 && isSmall.value) {
    isSmall.value = false
    navTheme.value = navThemeValue.value
  }
}, 100)

watch(y, scrollListener)

onMounted(() => {
  if (y.value >= 100) {
    isSmall.value = true
    navTheme.value = smallNavThemeValue.value
  }
})
</script>

<template>
  <div>
    <div
      class="navbar fixed top-0 left-0 flex items-center justify-between z-10 w-full transition-all"
      :class="{
        'px-20 py-4': isSmall,
        'px-60 py-8': !isSmall,

        'bg-white/90': navTheme == 'light',
        'bg-black/95': navTheme == 'dark',
        'bg-transparent': navTheme == 'transparent',

        'text-black': (navTheme == 'light'),
        'text-white': (navTheme == 'dark' || navTheme == 'transparent'),
      }"
    >
      <a
        class="navbar-left flex flex-col items-start justify-center"
        :class="{
        }"
        href="/"
      >
        <div class="menu-logo-main flex items-end justify-start">
          <div
            class="menu-logo-img aspect-square"
            :class="{
              'w-20': isSmall,
              'w-28': !isSmall,
            }"
          >
            <slot name="logo" />
          </div>
          <div
          class="menu-logo
          font-heading"
          
          :class="{
            'text-4xl': isSmall,
            'text-6xl': !isSmall,
          }"
          >ishwakarma</div>
        </div>

        <div
        class="menu-sub-logo
        font-heading"
        :class="{
          'text-lg px-20': isSmall,
          'text-2xl px-28': !isSmall,
        }"
        >
          Institute of Technology
        </div>
      </a>
      <div class="navbar-right flex flex-col items-end justify-start w-[80%]">
        <div class="navbar-right-top">
          <button
            class="bg-accent menu-trigger flex items-center justify-center text-2xl text-bold uppercase px-8 py-4 text-white"
            @click="openMenu"
          >
            <span>Menu</span>
            <slot name="close-icon" />
          </button>
        </div>

        <div
          class="navbar-right-bottom flex items-center justify-end w-full my-4"
        >
          <div
            class="navbar-link flex items-center justify-end cursor-pointer"
            v-for="(section, index) in Array.from(sections).reverse()"
            @click="openSection(sections.length - 1 - index)"
          >
            <span
              class="navbar-link-text text-2xl font-bold uppercase"
              :class="{
                'text-gray-400': !isSmall,
                'text-primary': isSmall,
              }"
              >{{ section.name }}</span
            >
            <span
              v-if="index != sections.length - 1"
              class="text-lg text-gray-400 mx-4"
              >/</span
            >
          </div>
        </div>
      </div>
    </div>

    <slot name="menu" />
  </div>
</template>

<style lang="stylus">
.fixed
  position fixed
</style>
