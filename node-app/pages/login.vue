<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
})

const form = ref({
  username: '',
  password: '',
})

const { signIn } = useAuth()

async function handleLogin() {
  try {
    await signIn('credentials', form.value)

    useRouter().push({
      name: 'index',
    })
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Connexion</h1>
    <form @submit.prevent="handleLogin">
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
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 transition-all duration-200 w-full text-blue-50 rounded-lg p-2 mb-2 font-bold"
      >
        Se connecter
      </button>
    </form>
    <span class="mr-2">Pas de compte ?</span>
    <nuxt-link to="/register" class="text-blue-500 hover:underline font-medium"
      >S'inscrire</nuxt-link
    >
  </div>
</template>

<style scoped>
.placeholder-color::placeholder {
  color: rgb(71 85 105 / let(--tw-text-opacity));
}
</style>
