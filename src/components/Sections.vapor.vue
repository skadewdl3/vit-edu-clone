<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps(['sections'])
console.log(props)

const sectionsExpanded = ref(Array(props.sections.length).fill(false))

const toggleSection = (index) => {
  for (let i = 0; i < sectionsExpanded.value.length; i++) {
    if (i === index) {
      sectionsExpanded.value[i] = !sectionsExpanded.value[i]
    } else {
      sectionsExpanded.value[i] = false
    }
  }
}
</script>

<template>
  <div class="course-sections">
    <div v-for="(section, index) in props.sections" class="course-section my-4">
      <div
        class="course-section-title text-4xl cursor-pointer"
        @click="toggleSection(index)"
      >
        {{ section.title }}
      </div>
      <ul class="course-section-content list-disc" v-if="sectionsExpanded[index]">
        <li
        v-for="topic in section.topics"
        class="text-lg"
        >
        {{ topic }}
      </li>
        
      </ul>
    </div>
  </div>
</template>

<style></style>
