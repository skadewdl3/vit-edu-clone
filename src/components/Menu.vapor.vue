<script lang="ts" setup>
import type { MenuSection } from '@typing/menu'
import { ref, watch } from 'vue'
import { useStore } from '@nanostores/vue'
import { isMenuOpen } from '@store/menu'
import { evilDOMHack } from '@utils/utils'

const sections: MenuSection[] = [
  {
    name: 'Test',
    route: '/heheboi',
  },
  {
    name: 'Academics',
    sections: [
      {
        name: 'Syllabus',
        route: '/academics/syllabus',
      },
      {
        name: 'Courses',
        route: '/academics/courses',
      },
      {
        name: 'Timetable',
        sections: [
          {
            name: 'First Year',
            route: '/academics/timetable/fy',
          },
          {
            name: 'Second Year',
            route: '/academics/timetable/sy',
          },
          {
            name: 'Third Year',
            route: '/academics/timetable/ty',
          },
          {
            name: 'Final Year',
            route: '/academics/timetable/btech',
          },
        ],
      },
      {
        name: 'Calendar',
        sections: [
          {
            name: 'Academic Calendar',
            route: '/academics/calendar/academic',
          },
          {
            name: 'Examination Calendar',
            route: '/academics/calendar/examination',
          },
          {
            name: 'Holidays',
            route: '/academics/calendar/holidays',
          },
        ],
      },
    ],
  },
  {
    name: 'Placements',
    sections: [
      {
        name: 'Placement Statistics',
        route: '/placements/statistics',
      },
      {
        name: 'Recruiters',
        route: '/placements/recruiters',
      },
      {
        name: "MOU's",
        route: '/placements/mous',
      },
      {
        name: 'Enterpreneurs',
        route: '/placements/enterpreneurs',
      },
      {
        name: 'Higher Studies',
        route: '/placements/higher-studies',
      },
    ],
  },
  {
    name: 'Innovation',
    sections: [
      {
        name: 'Research Grants',
        route: '/innovation/grants',
      },
      {
        name: 'Patents',
        route: '/innovation/patents',
      },
      {
        name: 'Faculty Research',
        route: '/innovation/faculty',
      },
      {
        name: 'Student Innovation',
        route: '/innovation/student',
      },
    ],
  },
  {
    name: 'In Focus',
    sections: [
      {
        name: 'Student Clubs',
        route: '/in-focus/clubs',
      },
      {
        name: 'Stellar Achievements',
        route: '/in-focus/achievements',
      },
      {
        name: 'Alumni',
        route: '/in-focus/alumni',
      },
    ],
  },
  {
    name: 'News',
    sections: [
      {
        name: 'IT Vishwa',
        route: '/news/bulletin',
      },
      {
        name: 'Events',
        route: '/news/events',
      },
    ],
  },
]

const activeSection = ref(-1)
const activeSubsection = ref(-1)

const menuOpen = useStore(isMenuOpen)

const setSection = (sectionIndex: number) => {
  activeSubsection.value = -1
  evilDOMHack(() => {
    activeSection.value = sectionIndex
  })
}

console.log(typeof sections[0])

let listenerAdded = false

if (!listenerAdded) {
  
}

const unwatch = watch(menuOpen, () => {
  if (listenerAdded) {
    unwatch()
    return
  }
  evilDOMHack(() => {
    document.querySelector('.menu-close').addEventListener('click', () => {
      isMenuOpen.set(false)
    })
  })
})
</script>

<template>
  <Transition name="slideInFromTop">
    <div
      class="menu absolute top-0 left-0 w-screen h-screen bg-stone-950 px-16 py-4 text-white overflow-hidden"
      v-if="menuOpen"
    >
      <slot name="menu-bar" />

      <div class="menu-content grid grid-cols-3 w-full px-20">
        <div class="menu-sections text-8xl font-heading">
          <div
            class="menu-section my-12 cursor-pointer"
            :class="{
              'text-gray-400':
                activeSection != -1 && activeSection != sectionIndex,
            }"
            v-for="(section, sectionIndex) in sections"
            @click="setSection(sectionIndex)"
          >
            <a
              class="transition-colors"
              v-if="!section['sections']"
              :href="section['route']"
            >
              {{ section.name }}
            </a>
            <p class="transition-colors" v-else>
              {{ section.name }}
            </p>
          </div>
        </div>

        <Transition name="slideInFromLeft">
          <div
            class="menu-subsections text-4xl"
            v-if="activeSection >= 0"
            :key="activeSection"
          >
            <div
              class="menu-subsection my-8 cursor-pointer"
              :class="{
                'text-gray-400':
                  activeSubsection != -1 && activeSubsection != subsectionIndex,
              }"
              v-for="(subsection, subsectionIndex) in sections[activeSection][
                'sections'
              ]"
              @click="activeSubsection = subsectionIndex"
            >
              <a v-if="!subsection['sections']" :href="subsection['route']">
                {{ subsection.name }}
              </a>
              <p v-else>{{ subsection.name }}</p>
            </div>
          </div>
        </Transition>

        <Transition name="slideInFromLeft">
          <div
            class="menu-subsubsections text-3xl"
            v-if="activeSection >= 0 && activeSubsection >= 0"
            :key="activeSubsection"
          >
            <div
              class="menu-subsubsection my-8 cursor-pointer"
              v-for="subsubsection in sections[activeSection]['sections'][
                activeSubsection
              ]['sections']"
            >
              <a :href="subsubsection.route">{{ subsubsection.name }}</a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style lang="stylus" scoped>
.slideInFromLeft-enter-active
  transition all 0.5s ease

.slideInFromLeft-enter-from, .slideInFromLeft-leave-to
  transform translateX(-4%)
  opacity 0

.slideInFromTop-enter-active, .slideInFromTop-leave-active
  transition all 0.2s ease-in-out

.slideInFromTop-enter-from, .slideInFromTop-leave-to
  transform translateY(-100%)
</style>
