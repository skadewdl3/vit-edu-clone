<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { isMenuOpen } from '@store/menu';

const menuOpen = useStore(isMenuOpen)
</script>

<template>
  <!-- <button @click="isMenuOpen.set(true)">Open Menu</button> -->
</template>

<style lang="stylus" scoped>

.slideInFromTop-enter-active, .slideInFromTop-leave-active
  transition all 0.2s ease-in-out

.slideInFromTop-enter-from, .slideInFromTop-leave-to 
  transform translateY(-100%)

</style>