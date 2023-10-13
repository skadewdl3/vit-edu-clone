<script setup lang="ts">
const props = defineProps(['courses'])
</script>

<template>
  <div class="px-60 grid grid-cols-3">
    <div v-for="course in courses" class="w-full py-4 px-28 grid grid-cols[3fr_1fr]">
      
    </div>
  </div>
</template>

<style lang="stylus"></style>
