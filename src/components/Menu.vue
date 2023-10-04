<script lang="ts" setup>
import { XCircleIcon } from '@heroicons/vue/24/outline'
import type { MenuSection, MenuSectionDependent } from '@typing/menu'
import { ref } from 'vue'

const sections: MenuSection[] = [
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
const activeSubection = ref(-1)

console.log(typeof sections[0])
</script>

<template>
  <div
    class="menu absolute top-0 left-0 w-screen h-screen bg-black px-16 py-8 text-white"
  >
    <div class="menu-bar w-full bg-red flex items-center justify-between">
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

    <div class="menu-content">
      <div
        class="menu-section cursor-pointer"
        v-for="(section, sectionIndex) in sections"
        @click="activeSection = sectionIndex"
      >
        {{ section.name }}
        <div
          class="menu-subsections"
          v-if="section['sections'] && sectionIndex == activeSection"
        >
          <div
            class="menu-subsection cursor-pointer"
            v-for="(subsection, subsectionIndex) in section['sections']"
            @click="activeSubection = subsectionIndex"
          >
            {{ subsection.name }}
            <div
              class="menu-subsubsections"
              v-if="subsection['sections'] && sectionIndex == activeSubection"
            >
              <div
                class="menu-subsection"
                v-for="subsubsection in subsection['sections']"
              >
                {{ subsubsection.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
