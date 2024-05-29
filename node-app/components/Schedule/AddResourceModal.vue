<template>
  <div class="flex flex-col items-center justify-center">
    <DialogTitle as="h2" class="text-2xl font-bold text-black">
      Ajouter une ressource
    </DialogTitle>
    <div class="mt-5 w-full flex items-start">
      <Combobox v-if="!isAdding" v-model="selectedResource">
        <div class="flex flex-col flex-grow">
          <ResourceSearchInput />
          <ResourceOptions :teacherId="props.teacherId" />
        </div>
      </Combobox>
      <input
        v-else
        v-model="query"
        class="border border-gray-300 rounded p-2 flex-grow h-10"
        placeholder="Nom de la ressource"
      >
      <EditButton
        v-if="!isAdding"
        class="ml-2 text-slate-600 hover:bg-black/10"
        @click="isAdding = !isAdding"
      />
      <SearchButton
        v-else
        class="ml-2 text-slate-600 hover:bg-black/10"
        @click="isAdding = !isAdding"
      />
    </div>

    <div class="mt-5 w-full">
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded"
        @click="confirm"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Combobox, DialogTitle } from '@headlessui/vue'

import EditButton from '~/components/elements/EditButton.vue'
import SearchButton from '~/components/elements/SearchButton.vue'

import ResourceSearchInput from './ResourceSearchInput.vue'
import ResourceOptions from './ResourceOptions.vue'

const modalStore = useModalStore()
const teacherStore = useTeacherStore()

const props = defineProps({
  modalName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
})

if (!props.teacherId) {
  throw new Error('Teacher ID is required')
}

const missingResources = await teacherStore.fetchMissingResourcesForTeacher(
  props.teacherId
)
const selectedResource = ref(
  missingResources.length > 0 ? missingResources[0] : ''
)

const query = ref('')
provide('query', query)

const isAdding = ref(false)

const confirm = async () => {
  if (!props.teacherId || !props.modalName) {
    return
  }

  if (query.value) {
    await teacherStore.addResourceToTeacher(props.teacherId, query.value)
  }

  if (selectedResource.value) {
    await teacherStore.addResourceToTeacher(
      props.teacherId,
      selectedResource.value
    )
  }

  modalStore.hideModal(props.modalName)
}
</script>
