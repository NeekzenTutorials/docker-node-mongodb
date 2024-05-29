<template>
  <button
    type="button"
    class="size-10 dark:text-white text-gray-500 rounded-lg flex justify-center items-center"
    @click="handleLogout"
  >
    <Icon name="uil:signout" size="24" />
  </button>
</template>

<script lang="ts" setup>
const { signOut } = useAuth()

async function handleLogout() {
  await signOut()
}
</script>
