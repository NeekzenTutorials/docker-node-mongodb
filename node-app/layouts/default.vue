<script lang="ts" setup>
import Header from '~/components/layout/navbar.vue'

const route = useRoute()
</script>

<template>
  <div
    class="h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400"
  >
    <Header />
    <div class="flex items-center justify-center flex-grow">
      <div
        :class="{
          'p-5 rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-900/50 text-center border shadow-2xl mx-6': true,
          'flex-1': route.name == 'index',
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
