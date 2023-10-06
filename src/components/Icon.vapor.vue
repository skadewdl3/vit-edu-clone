<script lang="ts" setup>
  import * as Icons from '@heroicons/vue/24/outline'
  import { pascalize } from '@utils/utils';
  const props = defineProps({
    name: {
      required: true
    },
    class: {
      required: false,
      default: ''
    }
  })

  const name = pascalize(props.name)
  name[0].toUpperCase()
  console.log(name)

const icon = Icons[`${name}Icon`]
</script>

<template>
  <div class="icon" :class="props.class"><component :is="icon" /></div>
</template>

<style lang="stylus"></style>