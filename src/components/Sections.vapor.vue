<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps(['sections'])
console.log(props)

const sectionsExpanded = ref(Array(props.sections.length).fill(false))

const toggleSection = (index) => {
  sectionsExpanded.value[index] = !sectionsExpanded.value[index]
}
</script>

<template>
  <div class="course-sections border-solid border-2 border-black/20 rounded-xl">
    <div v-for="(section, index) in props.sections" class="course-section" :class="{'border-b-2 border-solid border-b-black/20 ': index != sections.length - 1}">
      <div
        class="course-section-title text-3xl cursor-pointer flex items-center justify-between font-bold px-8 py-4"
        @click="toggleSection(index)"
      >

      <div class="flex items-center justify-start">
        <div class="transition-all mr-4" :class="{'rotate-180': sectionsExpanded[index]}">
          <slot name="icon-down" />
        </div>
          <span>{{ section.title }}</span>
      </div>

      <span class="font-normal text-xl">{{ section.hours ? section.hours + ' hours' : '' }}</span>
      </div>

      <ul class="course-section-content list-disc px-20 py-4" v-if="sectionsExpanded[index]">
        <li
        v-for="topic in section.topics"
        class="text-xl"
        >
        {{ topic }}
      </li>
        
      </ul>
    </div>
  </div>
</template>

<style></style>
