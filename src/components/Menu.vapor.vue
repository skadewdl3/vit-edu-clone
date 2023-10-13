<script lang="ts" setup>
import { watch } from 'vue'
import { useStore } from '@nanostores/vue'
import {
  isMenuOpen,
  activeSection as activeSectionAtom,
  activeSubsection as activeSubsectionAtom,
} from '@store/menu'
import { evilDOMHack, sections } from '@utils/utils'

const activeSection = useStore(activeSectionAtom)
const activeSubsection = useStore(activeSubsectionAtom)
const menuOpen = useStore(isMenuOpen)

const setSection = (sectionIndex: number) => {
  activeSubsectionAtom.set(-1)
  evilDOMHack(() => {
    activeSectionAtom.set(sectionIndex)
  })
}

const setSubsection = (subsectionIndex: number) => {
  activeSubsectionAtom.set(subsectionIndex)
}

let listenerAdded = false

if (!listenerAdded) {
}

watch(menuOpen, () => {
  evilDOMHack(() => {
    document.querySelector('.menu-close').addEventListener('click', () => {
      isMenuOpen.set(false)
      setSection(-1)
    })
  })
})
</script>

<template>
  <Transition name="slideInFromTop">
    <div
      class="menu-wrapper fixed z-20 top-0 left-0 w-screen h-screen text-white overflow-hidden bg-stone-950"
      v-if="menuOpen"
    >
      <div
        class="menu px-16 py-4 w-full h-full absolute top-0 left-0"
        :class="`${
          activeSection != -1 ? `${sections[activeSection].id}-background` : ''
        }`"
      >
        <slot name="menu-bar" />

        <div class="menu-content flex items-start justify-start w-full px-40">
          <div class="menu-sections text-8xl font-heading w-[26%]">
            <div
              class="menu-section my-12 cursor-pointer"
              :class="{
                'text-neutral-500':
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
              class="menu-subsections text-4xl mr-[16rem] w-[14%]"
              v-if="activeSection >= 0"
              :key="activeSection"
            >
              <div
                class="menu-subsection my-8 cursor-pointer"
                :class="{
                  'text-neutral-500':
                    activeSubsection != -1 &&
                    activeSubsection != subsectionIndex,
                }"
                v-for="(subsection, subsectionIndex) in sections[activeSection][
                  'sections'
                ]"
                @click="setSubsection(subsectionIndex)"
              >
                <div class="flex flex-col items-start justify-center font-bold">
                  <div class="flex items-center justify-start text-emerald-50">
                    <a
                      v-if="!subsection['sections']"
                      :href="subsection['route']"
                    >
                      {{ subsection.name }}
                    </a>
                    <span v-else>{{ subsection.name }}</span>
                    <slot name="arrow-right" v-if="subsection['sections']" />
                  </div>
                </div>
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

bg_gradient = linear-gradient(to bottom, rgba(#000, 0.8), rgba(#000, 0.8))
</style>
