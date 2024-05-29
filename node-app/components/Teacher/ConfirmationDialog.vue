<template>
  <Popover>
    <PopoverButton>
      <DeleteButton
        class="bg-red-500 hover:bg-red-600 text-slate-100 rounded-md"
      />
    </PopoverButton>
    <TransitionRoot
      enter="transition-opacity duration-150"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <PopoverPanel class="absolute translate-y-3 right-12 max-w-80">
        <div
          class="absolute bg-white size-2 rotate-45 -translate-y-1 right-10"
        />
        <div class="bg-white p-5 rounded-lg drop-shadow-lg">
          <div class="flex flex-col gap-4">
            <div class="space-y-1">
              <p class="text-center dark:text-slate-700 font-bold">
                Supprimer cet enseignant ?
              </p>
              <p class="text-justify dark:text-slate-500">
                Cela supprimera aussi ses leçons.
              </p>
            </div>
            <div class="flex justify-center">
              <button
                class="bg-red-400 hover:bg-red-500 transition-all duration-200 text-white font-bold py-2 px-10 rounded"
                @click="confirm"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </TransitionRoot>
  </Popover>
</template>

<script lang="ts" setup>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TransitionRoot,
} from '@headlessui/vue'

import DeleteButton from '~/components/elements/DeleteButton.vue'

const emits = defineEmits(['confirm'])

const confirm = () => {
  emits('confirm')
}
</script>
