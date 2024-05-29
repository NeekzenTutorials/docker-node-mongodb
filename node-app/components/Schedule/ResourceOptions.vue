<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <TransitionRoot
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    @after-leave="query = ''"
  >
    <ComboboxOptions
      class="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
    >
      <div
        v-if="filteredResources.length === 0 && query !== ''"
        class="relative cursor-default select-none px-4 py-2 text-gray-700"
      >
        Nothing found.
      </div>
      <ComboboxOption v-if="filteredResources.length === 0">
        <li class="relative cursor-default select-none py-2 pl-10 pr-4">
          <span>
            <Icon
              size="34"
              class="text-gray-400 absolute inset-y-0 left-0 flex items-center pl-3"
              name="ic:round-search"
            />
          </span>
          <span class="block truncate"> Aucune ressource trouvée </span>
        </li>
      </ComboboxOption>
      <ComboboxOption
        v-for="resource in filteredResources"
        :key="resource"
        v-slot="{ active, selected }"
        :value="resource"
      >
        <li
          class="relative cursor-default select-none py-2 pl-10 pr-4"
          :class="{
            'bg-teal-200': selected,
            'bg-teal-100': active,
            'text-white': active,
          }"
        >
          <span
            class="block truncate"
            :class="{ 'font-semibold': selected, 'text-teal-600': active }"
          >
            {{ resource }}
          </span>
          <span v-if="selected">
            <Icon
              size="34"
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600"
              name="ic:round-check"
            />
          </span>
        </li>
      </ComboboxOption>
    </ComboboxOptions>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'

const teacherStore = useTeacherStore()

const props = defineProps({
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

const query = inject('query') as globalThis.Ref<string>

const filteredResources = computed(() => {
  return query.value === ''
    ? missingResources
    : missingResources.filter((resource) => {
        return resource.toLowerCase().includes(query.value.toLowerCase())
      })
})
</script>
