<template>
  <div
    class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm"
  >
    <ComboboxInput
      placeholder="Rechercher une ressource"
      class="w-full h-10 py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-slate-100"
      @change="query = $event.target.value"
    />
    <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
      <Icon
        size="24"
        class="text-gray-400"
        name="flowbite:chevron-sort-outline"
      />
    </ComboboxButton>
  </div>
</template>

<script lang="ts" setup>
import { ComboboxInput, ComboboxButton } from '@headlessui/vue'
const query = inject('query')
</script>
