<template>
  <div
    class="border rounded-xl text-center overflow-auto dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700 basis-1/3"
  >
    <div class="grid grid-cols-3 items-center bg-indigo-300 text-white px-2">
      <ModuleTitle class="col-start-2">Enseignants</ModuleTitle>
      <div class="ml-auto">
        <AddButton class="hover:bg-black/10" @click="openForm()" />
        <Dialog :modalName="modal">
          <TeacherDialog :modalName="modal" />
        </Dialog>
      </div>
    </div>
    <div class="max-h-72 overflow-auto mx-5">
      <TeacherCard
        v-for="teacher in teacherStore.teachers"
        :key="teacher._id ? teacher._id.toString() : ''"
        :teacher="teacher"
        class="py-2 border-b border-gray-200 dark:border-slate-600"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TeacherCard from './TeacherCard.vue'
import TeacherDialog from './TeacherDialog.vue'
import ModuleTitle from '../elements/ModuleTitle.vue'
import AddButton from '~/components/elements/AddButton.vue'
import Dialog from '~/components/elements/Dialog.vue'

const modalStore = useModalStore()
const teacherStore = useTeacherStore()

const modal = ref('addTeacher')

const openForm = (id: string = '') => {
  modalStore.setTeacherId(id)
  modalStore.showModal(modal.value)
}
</script>
