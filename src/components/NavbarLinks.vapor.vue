<script lang="ts" setup>
import { isMenuOpen, activeSection as activeSectionAtom } from '@store/menu';
import { sections } from '@utils/utils';

const openSection = (sectionIndex: number) => {
  console.log(sectionIndex)
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
      <span class="text-4xl">{{ section.name }}</span>
      <span v-if="index != sections.length - 1" class="text-lg text-gray-400 mx-4">/</span>
    </div>
  </div>
</template>

<style></style>
