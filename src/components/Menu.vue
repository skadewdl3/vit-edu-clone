<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/24/outline'
import type { MenuSection, MenuSectionDependent } from '@typing/menu'
import { ref } from 'vue'

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

console.log(typeof sections[0])
</script>

<template>
  <div
    class="menu absolute top-0 left-0 w-screen h-screen bg-stone-950 px-16 py-4 text-white"
  >
    <div
      class="menu-bar w-full my-4 mb-40 bg-red flex items-center justify-between"
    >
      <div class="menu-bar-left flex flex-col items-start justify-center">
        <div class="menu-logo-main flex items-end justify-start">
          <img
            class="menu-logo w-28 aspect-square"
            src="/logo.png"
            alt="Vishwakarma Institute of Technology Logo"
          />
          <div class="menu-logo font-heading text-6xl">ishwakarma</div>
        </div>

        <div class="menu-logo font-heading text-2xl px-28">
          Institute of Technology
        </div>
      </div>
      <button
        class="menu-close text-3xl flex items-center justify-end cursor-pointer text-gray-400 hover:text-white transition-colors"
      >
        Close <XCircleIcon class="pl-2 w-16" />
      </button>
    </div>

    <!-- <div class="menu-content">
      <div
        class="menu-section font-heading text-8xl px-20 my-20 cursor-pointer"
        v-for="(section, sectionIndex) in sections"
        @click="activeSection = sectionIndex"
      >
        <a v-if="!section['sections']" :href="section['route']">{{ section.name }}</a>
        <p v-else>{{ section.name }}</p>
        <div
          class="menu-subsections"
          v-if="section['sections'] && sectionIndex == activeSection"
        >
          <div
            class="menu-subsection cursor-pointer"
            v-for="(subsection, subsectionIndex) in section['sections']"
            @click="activeSubsection = subsectionIndex"
          >
            <a v-if="!subsection['sections']" :href="subsection['route']">{{ subsection.name }}</a>
            <p v-else>{{ subsection.name }}</p>
            <div
              class="menu-subsubsections"
              v-if="subsection['sections'] && subsectionIndex == activeSubsection"
            >
              <div
                class="menu-subsubsection"
                v-for="subsubsection in subsection['sections']"
              >
                <a :href="subsubsection['route']">{{ subsubsection.name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="menu-content grid grid-cols-3 w-full px-20">
      <div class="menu-sections text-8xl font-heading">
        <div
          class="menu-section my-12 cursor-pointer"
          v-for="(section, sectionIndex) in sections"
          @click="activeSection = sectionIndex"
        >
          <a v-if="!section['sections']" :href="section['route']">
            {{ section.name }}
          </a>
          <p v-else>{{ section.name }}</p>
        </div>
      </div>

      <Transition name="slideInFromLeft">
        <div class="menu-subsections text-4xl" v-if="activeSection >= 0" :key="activeSection">
          <div
            class="menu-subsection my-8 cursor-pointer"
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
            class="menu-subsubsection  my-8 cursor-pointer"
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
</template>

<style lang="stylus" scoped>
.slideInFromLeft-enter-active
  transition all 0.5s ease

.slideInFromLeft-enter-from, .slideInFromLeft-leave-to 
  transform translateX(-4%)
  opacity 0

</style>
