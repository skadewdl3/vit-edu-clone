<script lang="ts" setup>
import { isMenuOpen, activeSection as activeSectionAtom, navColor as navColorAtom } from '@store/menu';
import { sections } from '@utils/utils';
import { useStore } from '@nanostores/vue';

const navColor = useStore(navColorAtom)

const openSection = (sectionIndex: number) => {
  isMenuOpen.set(true)
  setTimeout(() => {
    activeSectionAtom.set(sectionIndex)
  }, 200)
}
</script>

<template>
  <div class="navbar-right-bottom flex items-center justify-end w-full my-4">
    <div class="navbar-link flex items-center justify-end cursor-pointer"
     v-for="(section, index) in Array.from(sections).reverse()"
     @click="openSection(sections.length - 1 - index)"
     >
      <span class="text-2xl font-bold uppercase"  :class="{'text-gray-400': navColor == 'light', 'text-primary': navColor == 'dark'}">{{ section.name }}</span>
      <span v-if="index != sections.length - 1" class="text-lg text-gray-400 mx-4">/</span>
    </div>
  </div>
</template>

<style></style>
