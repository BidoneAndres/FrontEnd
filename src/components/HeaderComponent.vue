<template>
  <header class="bg-gray-900/95 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
    <nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      
      <div class="hidden lg:flex lg:gap-x-10 items-center">
        <a href="/" class="group relative py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300">
          Inicio
          <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 scale-x-0 group-hover:opacity-20 group-hover:scale-x-100 transition-all duration-500 origin-left"></span>
        </a>
        
        <div class="relative">
          <button popovertarget="desktop-menu-product"
            class="group flex items-center gap-x-1.5 text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-all duration-300">
            ENTIDADES
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              class="size-4 opacity-50 group-hover:text-blue-500 transition-transform duration-300 group-hover:rotate-180">
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>

          <el-popover id="desktop-menu-product" anchor="bottom" popover
            class="w-screen max-w-md overflow-hidden rounded-[2rem] bg-black/90 border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl p-4 mt-4">
            <div class="p-4 space-y-2">
              
              <div class="group relative flex items-center gap-x-6 rounded-2xl p-4 hover:bg-white/[0.03] transition-all duration-300">
                <div class="flex size-11 flex-none items-center justify-center rounded-xl bg-gray-800 border border-white/5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 text-gray-400 group-hover:text-blue-400">
                    <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-auto">
                  <a href="/clientes" class="block font-bold text-white tracking-tighter text-xs uppercase">Clientes<span class="absolute inset-0"></span></a>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Registrados en las ordenes</p>
                </div>
              </div>

              <div class="group relative flex items-center gap-x-6 rounded-2xl p-4 hover:bg-white/[0.03] transition-all duration-300">
                <div class="flex size-11 flex-none items-center justify-center rounded-xl bg-gray-800 border border-white/5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 text-gray-400 group-hover:text-blue-400">
                    <path d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-auto">
                  <a href="/productos" class="block font-bold text-white tracking-tighter text-xs uppercase">Productos<span class="absolute inset-0"></span></a>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Catálogo de carga</p>
                </div>
              </div>

              <div class="group relative flex items-center gap-x-6 rounded-2xl p-4 hover:bg-white/[0.03] transition-all duration-300">
                <div class="flex size-11 flex-none items-center justify-center rounded-xl bg-gray-800 border border-white/5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 text-gray-400 group-hover:text-blue-400">
                    <path d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-auto">
                  <a href="/camiones" class="block font-bold text-white tracking-tighter text-xs uppercase">Camiones<span class="absolute inset-0"></span></a>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Unidades de transporte</p>
                </div>
              </div>

              <div class="group relative flex items-center gap-x-6 rounded-2xl p-4 hover:bg-white/[0.03] transition-all duration-300">
                <div class="flex size-11 flex-none items-center justify-center rounded-xl bg-gray-800 border border-white/5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 text-gray-400 group-hover:text-blue-400">
                    <path d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-auto">
                  <a href="/choferes" class="block font-bold text-white tracking-tighter text-xs uppercase">Choferes<span class="absolute inset-0"></span></a>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Personal habilitado</p>
                </div>
              </div>

            </div>
          </el-popover>
        </div>

        <a href="/conciliaciones" class="group relative py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300">
          Conciliaciones
          <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 scale-x-0 group-hover:opacity-20 group-hover:scale-x-100 transition-all duration-500 origin-left"></span>
        </a>

        <a href="/home" class="group relative py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300">
          Ordenes
          <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 scale-x-0 group-hover:opacity-20 group-hover:scale-x-100 transition-all duration-500 origin-left"></span>
        </a>

        <a href="#" class="group relative py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300">
          Sobre nosotros
          <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 scale-x-0 group-hover:opacity-20 group-hover:scale-x-100 transition-all duration-500 origin-left"></span>
        </a>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        
        <a v-if="!isLoggedIn" href="/login" 
           class="group relative py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition-all duration-300">
          SISTEMA LOGIN
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] scale-x-50 group-hover:scale-x-100 transition-transform duration-500"></span>
        </a>

        <button v-else @click="handleLogout" 
           class="group relative py-2 text-xs font-black uppercase tracking-[0.2em] text-red-500 hover:text-white transition-all duration-300">
          DESCONECTAR
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)] scale-x-50 group-hover:scale-x-100 transition-transform duration-500"></span>
        </button>

      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue' // Agregamos watch
import { useRouter, useRoute } from 'vue-router' // Agregamos useRoute

const router = useRouter()
const route = useRoute() // Obtenemos la ruta actual
const isLoggedIn = ref(false)

// Función reutilizable para chequear el estado
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}


onMounted(() => {
  checkLoginStatus()
})


watch(() => route.path, () => {
  checkLoginStatus()
})

const handleLogout = () => {
  localStorage.removeItem('token')
  checkLoginStatus() 
  router.push('/login')
}
</script>

<style scoped>
/* Reseteo del popover nativo para evitar conflictos */
[popover] {
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  overflow: visible;
}
</style>