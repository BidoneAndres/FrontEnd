<template>
  <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-900">
  <body class="h-full">
  ```
-->
  <div
    class="flex min-h-full bg-gradient-to-b from-gray-900 via-gray-800 to-[#0a1a24]  flex-col justify-center px-6 py-30 lg:px-8 ">
    <h1 class="mt-20 text-center text-4xl font-bold tracking-tight text-white">Ingresa tu usuario</h1>

    <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
          <div class="mt-2">
            <input id="email" type="email" name="email" required autocomplete="email"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>

          </div>
          <div class="mt-2">
            <input id="password" type="password" name="password" required autocomplete="current-password"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Iniciar
            sesion</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        No tenes cuenta?
        <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Registrar usuario</a>
      </p>
    </div>
  </div>

</template>
