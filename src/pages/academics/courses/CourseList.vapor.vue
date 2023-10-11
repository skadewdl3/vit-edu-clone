<script setup lang="ts">
const props = defineProps(['courses'])
// console.log(props.courses)
</script>

<template>
  <div v-for="course in courses" class="w-1/2 px-8 py-4">
  <div class="course-name text-6xl">{{ course.name }}</div>
  <div class="course-desc text-2xl">{{ course.description }}</div>
  <div class="course-teachers"></div>
  </div>
</template>

<style lang="stylus">

</style>