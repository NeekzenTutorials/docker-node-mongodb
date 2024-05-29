<script lang="ts" setup>
const form = ref({
  email: '',
  username: '',
  password: '',
})

const isLoading = ref(false)

async function handleFormSubmit() {
  try {
    isLoading.value = true
    await useFetch('/api/auth/register', {
      method: 'POST',
      body: form.value,
    })

    useRouter().push({
      name: 'login',
    })
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Inscription</h1>
    <form @submit.prevent="handleFormSubmit">
      <input
        v-model="form.email"
        class="w-full border p-2 rounded-lg mb-4 dark:text-slate-600 placeholder-color"
        type="email"
        placeholder="Email"
      >
      <input
        v-model="form.username"
        class="w-full border p-2 rounded-lg mb-4 dark:text-slate-600 placeholder-color"
        type="text"
        placeholder="Nom d'utilisateur"
      >
      <input
        v-model="form.password"
        class="w-full border p-2 rounded-lg mb-4 dark:text-slate-600 placeholder-color"
        type="password"
        placeholder="Mot de passe"
      >
      <button
        :disabled="isLoading"
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 transition-all duration-200 w-full text-blue-50 rounded-lg p-2 mb-2 font-bold"
        :class="{
          'opacity-50 cursor-not-allowed': isLoading,
        }"
      >
        S'inscrire
      </button>
    </form>
    <span class="mr-2">Déjà un compte ?</span>
    <nuxt-link to="/login" class="text-blue-500 hover:underline font-medium"
      >Se connecter</nuxt-link
    >
  </div>
</template>

<style scoped>
.placeholder-color::placeholder {
  color: rgb(71 85 105 / let(--tw-text-opacity));
}
</style>
