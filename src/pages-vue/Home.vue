<script setup lang="ts">
import { ref } from 'vue';
import Menu from '@components/Menu.vue'
import { useStore } from '@nanostores/vue'
import { isMenuOpen } from '@store/menu';

const menuOpen = useStore(isMenuOpen)
</script>

<template>
  <button @click="isMenuOpen.set(true)">Open Menu</button>
  
  <Transition name="slideInFromTop">
    <div class="menu-wrapper top-0 left-0 absolute w-screen h-screen" v-if="menuOpen">
      <slot />
    </div>
  </Transition>
</template>

<style lang="stylus" scoped>

.slideInFromTop-enter-active, .slideInFromTop-leave-active
  transition all 0.5s ease-in-out

.slideInFromTop-enter-from, .slideInFromTop-leave-to 
  transform translateY(-100%)

</style>