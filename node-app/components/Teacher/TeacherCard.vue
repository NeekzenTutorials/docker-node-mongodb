<template>
  <div
    class="flex justify-between items-center space-x-5 align-center break-all"
  >
    <div class="flex flex-col md:flex-row justify-start w-full gap-4">
      <h2 class="text-center md:text-left md:w-full">
        {{ teacher.firstname }}
      </h2>
      <h2 class="text-center md:text-left md:w-full">{{ teacher.lastname }}</h2>
    </div>
    <div class="flex flex-col md:flex-row justify-around gap-2">
      <EditButton
        class="bg-blue-500 hover:bg-blue-600 text-slate-100 rounded-md"
        @click="openForm()"
      />
      <Dialog :modalName="modalName">
        <TeacherDialog :modalName="modalName" />
      </Dialog>
      <ConfirmationDialog @confirm="deleteTeacher" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditButton from '~/components/elements/EditButton.vue'
import ConfirmationDialog from '~/components/Teacher/ConfirmationDialog.vue'
import Dialog from '~/components/elements/Dialog.vue'

import { useTeacherStore } from '~/stores/teacher'
import { useModalStore } from '~/stores/modal'

import TeacherDialog from './TeacherDialog.vue'

const props = defineProps({
  teacher: {
    type: Object,
    default: () => ({}),
  },
})

const teacherId = props.teacher._id.toString()
const modalName = ref('Edit Teacher ' + teacherId)

const teacherStore = useTeacherStore()
const modalStore = useModalStore()

const openForm = () => {
  modalStore.setTeacherId(teacherId)
  modalStore.showModal(modalName.value)
}

const deleteTeacher = () => {
  teacherStore.deleteTeacher(props.teacher._id.toString())
}
</script>
