<template>
  <div
    class="border rounded-xl text-center overflow-hidden dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700 col-span-4"
  >
    <ModuleTitle>Planning</ModuleTitle>
    <input v-model="query" type="text" class="w-full p-2" placeholder="Rechercher une ressource">
    <div class="max-h-[38rem] overflow-y-auto">
      <div v-if="res.length > 0">
        <Resource
          v-for="resource in res"
          :key="resource._id!.toString()"
          :resource="resource"
          :mode="'search'"
        />
      </div>
      <Teacher
        v-for="teacher in teacherStore.teachers"
        :key="teacher._id!.toString()"
        :teacher="teacher"
      />
    </div>
    <p class="text-right pr-4">Total heures: {{ totalHours }}h</p>
  </div>
</template>

<script lang="ts" setup>
import ModuleTitle from '../elements/ModuleTitle.vue'

import Teacher from './Teacher.vue'
import Resource from './Resource.vue';

import type { ITeacher, IResource } from '~/types'

const query = ref('')
const res = ref<IResource[]>([])
const teacherStore = useTeacherStore()

onMounted(teacherStore.fetchTeachers)

watch(query, async () => {
  if (query.value.length < 1) {
    res.value = []
    return
  }
  res.value = await teacherStore.search(query.value)
})

function calculateTotalHours(teacher: ITeacher): number {
  let totalHours = 0

  for (const resource of teacher.resources) {
    for (const lesson of resource.lessons) {
      totalHours += lesson.hours
    }
  }

  return totalHours
}

const totalHours = computed(() => {
  return teacherStore.teachers.reduce(
    (total, teacher) => total + calculateTotalHours(teacher),
    0
  )
})
</script>
