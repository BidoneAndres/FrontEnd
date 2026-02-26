
<template>
  <div class="flex min-h-full bg-gradient-to-b from-gray-900 via-gray-800 to-[#0a1a24] flex-col justify-center px-6 py-30 lg:px-8">
    <h1 class="mt-20 text-center text-4xl font-bold tracking-tight text-white">Ingresa tu usuario</h1>

    <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              type="text"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              type="password"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <p v-if="errorMsg" class="text-red-400 text-sm text-center">{{ errorMsg }}</p>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Iniciar sesion
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        No tenes cuenta?
        <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Registrar usuario</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


const email = ref('');
const password = ref('');
const errorMsg = ref(''); 
const router = useRouter();


const handleLogin = async () => {
  try {
    errorMsg.value = ''; 


    const response = await axios.post('https://cernikiw3.chickenkiller.com/api/v1/login/json', {
      username: email.value, 
      password: password.value
    }, {
      responseType: 'text' 
    });

    const token = response.data;

    if (token) {

      localStorage.setItem('token', token);

      console.log('¡Login exitoso!');
      console.log(token)

      router.push('/home');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    errorMsg.value = 'Usuario o contraseña incorrectos';
  }
};
</script>
