<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="w-full grid grid-cols-[64px_auto_64px] justify-stretch gap-x-4 py-2 bg-slate-500 rounded-md border-b dark:border-slate-600 items-center px-6 text-slate-100"
      :class="teacher.resources.length == 0 && 'cursor-default'"
    >
      <Icon
        v-if="teacher.resources.length > 0"
        name="mdi:chevron-right"
        :class="open && 'rotate-90 transform'"
        class="transition-all duration-200 justify-self-start h-min"
        size="24"
      />
      <div class="flex items-center col-start-2">
        <input
          v-model="teacher.firstname"
          type="text"
          placeholder="Nom de l'enseignant"
          class="input border-none flex-1"
          @click.stop
          @blur="updateTeacher"
          @keyup.enter="updateTeacher"
        >
        <input
          v-model="teacher.lastname"
          type="text"
          placeholder="Prénom de l'enseignant"
          class="input border-none flex-1"
          @click.stop
          @blur="updateTeacher"
          @keyup.enter="updateTeacher"
        >
        <p v-if="teacher.resources.length > 0" class="w-full text-right">
          {{ totalHours }}h
        </p>
      </div>
      <AddButton
        class="justify-self-end hover:bg-black/10"
        @click.stop="modalStore.showModal(modalId)"
      />
      <Dialog :modalName="modalId">
        <AddResourceModal :modalName="modalId" :teacherId="teacherId" />
      </Dialog>
    </DisclosureButton>
    <DisclosurePanel class="dark:text-slate-100" as="ul">
      <Resource
        v-for="resource in teacher.resources"
        :key="resource._id ? resource._id.toString() : ''"
        :resource="resource"
        :teacherId="teacherId"
      />
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
import type { ITeacher } from '~/types'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import Resource from './Resource.vue'
import AddResourceModal from './AddResourceModal.vue'
import AddButton from '~/components/elements/AddButton.vue'
import Dialog from '~/components/elements/Dialog.vue'

const modalStore = useModalStore()
const teacherStore = useTeacherStore()

const props = defineProps({
  teacher: {
    type: Object as () => ITeacher,
    default: () => ({}),
  },
})

const teacherId = props.teacher._id ? props.teacher._id.toString() : ''
const modalId = 'Add Resource ' + teacherId
const teacher = reactive(props.teacher)

const totalHours = computed(() => {
  return props.teacher.resources.reduce((total, resource) => {
    return (
      total +
      resource.lessons.reduce((total, lesson) => total + lesson.hours, 0)
    )
  }, 0)
})

const updateTeacher = async() => {
  await teacherStore.updateTeacher(teacherId, teacher)
}
</script>
