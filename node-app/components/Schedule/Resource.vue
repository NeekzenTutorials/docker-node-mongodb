<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <li>
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="w-full py-2 bg-slate-400 rounded-md border-b dark:border-slate-600 grid grid-cols-[40px_auto_40px] justify-stretch items-center gap-x-4 px-12 cursor-default text-slate-100"
        :class="resource.lessons.length > 0 && 'cursor-pointer justify-between'"
      >
        <Icon
          v-if="resource.lessons.length > 0"
          name="mdi:chevron-right"
          class="transition-all duration-200"
          :class="open && 'rotate-90 transform justify-self-start'"
          size="24"
        />
        <div class="flex gap-1 justify-between items-center col-start-2">
          <input
            v-model="resourceName"
            type="text"
            class="input border-none"
            placeholder="Nom de la ressource"
            @click.stop
            @blur="updateResource"
            @keyup.enter="updateResource"
          >
          <p
            v-if="resource.lessons.length > 0"
            class="w-full text-slate-100 text-right"
          >
            {{ totalHours }}h
          </p>
        </div>
        <MenuRessource v-if="mode == 'normal'" :resource="resource" :teacherId="teacherId" />
      </DisclosureButton>
      <Transition>
        <DisclosurePanel v-if="mode == 'normal'" as="ul">
          <li
            v-for="lesson in resource.lessons"
            :key="lesson._id!.toString()"
            class="flex gap-4 justify-between px-6 py-2"
          >
            <div class="flex flex-grow justify-around gap-1">
              <input
                v-model="lesson.name"
                type="text"
                placeholder="Nom de la leçon"
                class="input flex-grow text-gray-500 dark:text-gray-100"
                @blur="updateLesson(lesson)"
                @keyup.enter="updateLesson(lesson)"
              >
              <input
                v-model="lesson.hours"
                type="number"
                min="1"
                placeholder="Durée"
                class="input flex-grow text-gray-500 dark:text-gray-100"
                @blur="updateLesson(lesson)"
                @keyup.enter="updateLesson(lesson)"
              >
            </div>
            <DeleteButton
              class="hover:bg-black/10"
              @click="deleteLesson(lesson)"
            />
          </li>
        </DisclosurePanel>
      </Transition>
    </Disclosure>
  </li>
</template>

<script lang="ts" setup>
import type { IResource, ILesson } from '~/types'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import DeleteButton from '~/components/elements/DeleteButton.vue'

import MenuRessource from './MenuRessource.vue'

const teacherStore = useTeacherStore()

const props = defineProps({
  resource: {
    type: Object as () => IResource,
    required: true,
  },
  teacherId: {
    type: String,
    required: false,
    default: null,
  },
  mode: {
    type: String,
    required: false,
    default: 'normal',
  },
})

const resourceName = ref(props.resource.name)

const totalHours = computed(() => {
  return props.resource.lessons.reduce(
    (total, lesson) => total + lesson.hours,
    0
  )
})

const updateResource = async() => {
  await teacherStore.updateResource(props.teacherId, props.resource)
}

const updateLesson = async(lesson: ILesson) => {
  await teacherStore.updateLesson(props.teacherId, props.resource, lesson)
}

const deleteLesson = async(lesson: ILesson) => {
  await teacherStore.deleteLesson(props.teacherId, props.resource, lesson)
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s cubic-bezier(0.1, 0.7, 1, 0.1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

::placeholder {
  color: var(--slate-400);
}
</style>
