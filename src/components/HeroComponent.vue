<template>
  <section class="relative h-screen bg-cover bg-center" style="background-image: url('bg-truck.jpg');">

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
      <h1 class="font-inter-tight text-6xl md:text-7xl text-white tracking-tight leading-tight">
        Carga de gas liquido
      </h1>

      <p class="font-inter text-lg md:text-xl text-white/90 mt-4 max-w-2xl leading-relaxed">
        Un sistema revolucionario de monitoreo de carga y alertas de tu negocio
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center gap-4">

        <!-- Primary -->
        <router-link
          to="/monitor"
          class="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
        >
          Monitorear la carga
        </router-link>

        <!-- Secondary -->
        <a href="/conciliaciones">
          <button
            class="px-8 py-3 text-white font-semibold rounded-full border border-white hover:bg-white/10 transition">
            Ver conciliaciones anteriores
          </button>
        </a>
      </div>

    </div>
  </section>

</template>
