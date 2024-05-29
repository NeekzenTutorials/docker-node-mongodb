<template>
  <div class="flex flex-col items-center justify-center">
    <DialogTitle as="h2" class="text-2xl font-bold text-black"
      >{{ action }} un enseignant</DialogTitle
    >
    <form class="flex flex-col gap-4 mt-4">
      <input
        v-model="firstname"
        type="text"
        placeholder="Prénom"
        class="border border-gray-300 p-2 rounded"
      >
      <input
        v-model="lastname"
        type="text"
        placeholder="Nom"
        class="border border-gray-300 p-2 rounded"
      >
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        @click="confirm"
      >
        Confirmer
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { DialogTitle } from '@headlessui/vue'

import type { IResource } from '~/types'

const modalStore = useModalStore()
const teacherStore = useTeacherStore()

const firstname = ref('')
const lastname = ref('')
const resources = ref<IResource[]>([])
const action = ref('Ajouter')

const props = defineProps({
  modalName: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  if (modalStore.teacher_id !== '') {
    await teacherStore.fetchTeacher(modalStore.teacher_id)
    action.value = 'Modifier'
    firstname.value = teacherStore.teacher.firstname
    lastname.value = teacherStore.teacher.lastname
    resources.value = teacherStore.teacher.resources
  }
})

const confirm = async () => {
  const teacherData = {
    firstname: firstname.value,
    lastname: lastname.value,
    resources: resources.value,
  }

  if (modalStore.teacher_id == '') {
    await teacherStore.createTeacher(teacherData)
  } else {
    await teacherStore.updateTeacher(modalStore.teacher_id, teacherData)
  }

  if (
    modalStore.teacher_id !== '' &&
    props.modalName &&
    props.modalName !== 'addTeacher'
  ) {
    modalStore.hideModal(props.modalName)
  } else {
    modalStore.hideModal('addTeacher')
  }

  modalStore.resetTeacherId()
}
</script>
