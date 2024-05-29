<template>
  <header
    class="flex justify-between w-full px-16 py-2 border-b border-slate-900/10 dark:border-slate-300/10"
  >
    <NuxtLink to="/">
      <div
        class="flex justify-center bg-white dark:bg-slate-100 rounded-full p-2 size-12"
      >
        <img src="~/assets/logo_iut.png" alt="Logo IUT" >
      </div>
    </NuxtLink>
    <div class="flex items-center gap-1">
      <button
        class="p-2 text-slate-500 dark:text-slate-100"
        @click="
          setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
        "
      >
        <Icon v-if="iconName === 'light'" name="uil:sun" size="24" />
        <Icon
          v-else-if="iconName === 'dark'"
          name="akar-icons:moon"
          size="24"
        />
        <Icon v-else name="uil:laptop" size="24" />
      </button>
      <LogoutButton v-if="data?.user" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import LogoutButton from '~/components/elements/LogoutButton.vue'

const { data } = useAuth()
const iconName = ref('system')

const setColorTheme = (newTheme: string) => {
  useColorMode().preference = newTheme
}

onMounted(() => {
  const colorMode = useColorMode()
  colorMode.value = localStorage.getItem('nuxt-color-mode') || 'light'
  iconName.value = colorMode.value
})

watch(
  () => useColorMode().value,
  (newVal) => {
    iconName.value = newVal
  }
)
</script>
