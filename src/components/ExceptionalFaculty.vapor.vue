<script setup lang="ts">
import { ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
let activeIndex = ref(0)

let minIndex = 0
let maxIndex = 2

const setActiveIndex = (index: number) => {
  activeIndex.value = -1
  setTimeout(() => {
    activeIndex.value = index
  }, 0)
}


// enable or disable the carousel autoscroll

// let interval = null
// let exceptionalFacultyContent = ref(null)
// let isVisible = useElementVisibility(exceptionalFacultyContent)
// watch(isVisible, () => {
//   if (isVisible.value && !interval) {
//     interval = setInterval(() => {
//       if (activeIndex.value == maxIndex) {
//         setActiveIndex(minIndex)
//       } else {
//         setActiveIndex(activeIndex.value + 1)
//       }
//     }, 5000)
//   } else if (!isVisible.value && interval) {
//     clearInterval(interval)
//     interval = null
//   }
// })
</script>

<template>
  <div class="py-60" ref="exceptionalFacultyContent">
    <Transition name="fade">
      <div
        class="exceptional-faculty-section grid grid-cols-[1fr_2fr] w-[50%] mx-auto border-2 border-black/50 border-solid m-8 p-8 rounded-md"
        v-if="activeIndex == 0"
      >
        <div class="exceptional-faculty-image rounded-full overflow-hidden"><div class="flex [&>span]:ml-4">
      <Icon name="map-pin" class="w-8" />
      <span>Google Maps</span>
    </div>
          <slot name="faculty-image-a" />
        </div>

        <div class="my-auto ml-12">
          <div class="exceptional-faculty-name text-5xl mb-10">
            Prof. Dr. Premanand Ghadekar
          </div>
          <div class="exceptional-faculty-description text-2xl">
            Head of Department - Information Technology
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        class="exceptional-faculty-section grid grid-cols-[1fr_2fr] w-[50%] mx-auto border-2 border-black/50 border-solid m-8 p-8 rounded-md"
        v-if="activeIndex == 1"
      >
        <div class="exceptional-faculty-image rounded-full overflow-hidden">
          <slot name="faculty-image-b" />
        </div>

        <div class="my-auto ml-12">
          <div class="exceptional-faculty-name text-5xl mb-10">
            Prof. Deepali Deshpande
          </div>
          <div class="exceptional-faculty-description text-2xl">
            Assistant Head, Academics
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        class="exceptional-faculty-section grid grid-cols-[1fr_2fr] w-[50%] mx-auto border-2 border-black/50 border-solid m-8 p-8 rounded-md"
        v-if="activeIndex == 2"
      >
        <div class="exceptional-faculty-image rounded-full overflow-hidden">
          <slot name="faculty-image-c" />
        </div>

        <div class="my-auto ml-12">
          <div class="exceptional-faculty-name text-5xl mb-10">
            Prof. Priyadarshan Dhabe
          </div>
          <div class="exceptional-faculty-description text-2xl">
            Professor 

          </div>
        </div>
      </div>
    </Transition>

    <div
      class="tabs h-10 flex items-center justify-end w-1/2 mx-auto [&_button]:ml-4"
    >
      <button
        class="prev-faculty text-white p-4 bg-black cursor-pointer aspect-square rounded-full disabled:bg-gray-300"
        :disabled="activeIndex == minIndex"
        @click="setActiveIndex(activeIndex - 1)"
      >
        <slot name="icon-prev" />
      </button>
      <button
        class="next-faculty text-white p-4 bg-black cursor-pointer aspect-square rounded-full disabled:bg-gray-300"
        :disabled="activeIndex == maxIndex"
        @click="setActiveIndex(activeIndex + 1)"
      >
        <slot name="icon-next" />
      </button>
    </div>
  </div>
</template>

<style lang="stylus">
.fade-enter-from, .fade-leave-to
  opacity 0

.fade-enter-active
  transition all 0.3s ease-in-out
</style>
