<script setup lang="ts">
const props = defineProps(['teachers'])
// console.log(props.courses)
</script>

<template>
  <div>This course is taught by the following teachers: </div>
  <p v-for="teacher in teachers">
    {{teacher}}
  </p>
</template>

<style lang="stylus">

</style>