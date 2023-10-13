<script setup lang="ts">
const props = defineProps(['teachers', 'course'])
</script>

<template>
  <div>
    <div>This course is taught by the following teachers: </div>
    <p v-for="teacher in teachers">
      {{teacher}}
    </p>
  </div>
</template>

<style lang="stylus">

</style>