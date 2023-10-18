<script lang="ts" setup>
import { useElementVisibility } from '@vueuse/core'
import { ref, onMounted, watch } from 'vue'
const summaryContent = ref(null)
const isVisible = ref(true)
let temp = useElementVisibility(summaryContent)
const props = defineProps(['course'])

watch(temp, () => {
  isVisible.value = temp.value
})

onMounted(() => {
  console.log(props.course)
})

const viewSyllabus = () => {
  document
    .querySelector('.course-assesment-scheme')
    .scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  isVisible.value = temp.value
})
</script>

<template>
  <div class="summary-wrapper">
    <div
      class="summary-normal flex flex-col items-center border-2 border-black/50 border-solid rounded-xl"
      ref="summaryContent"
    >
      <div class="cover-image">
        <slot name="cover-image" />
      </div>

      <div
        class="summary-content flex flex-col items-start w-full px-8 py-4 text-2xl"
      >
        <slot name="summary-content" />
      </div>

      <button
        class="mx-auto bg-gray-800 hover:bg-gray-700 transition-all text-white px-8 py-4 rounded text-2xl font-bold my-4"
        @click="viewSyllabus"
      >
        View Syllabus
      </button>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          class="summary-normal z-20 fixed top-60 left-[60%] w-[20%] flex flex-col items-center border-2 border-black/50 border-solid rounded-xl"
          v-if="!isVisible"
        >
          <div class="cover-image">
            <slot name="cover-image" />
          </div>

          <div
            class="summary-content flex flex-col items-start w-full px-8 py-4 text-2xl"
          >
            <h3 class="summary-section">
              <span class="font-bold">Course Name: </span
              >{{ props.course.name }}
            </h3>
            <slot name="summary-content" />
          </div>

          <button
            class="mx-auto bg-gray-800 hover:bg-gray-700 transition-all text-white px-8 py-4 rounded text-2xl font-bold my-4"
            @click="viewSyllabus"
          >
            View Syllabus
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition all 0.5s ease


.fade-enter-from, .fade-leave-to
  opacity 0
  transform translateY(-1rem)
</style>
