<script setup lang="ts">
import HeroComponent from '@/components/HeroComponent.vue';

</script>

<template>
  <HeroComponent />
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-12 items-center pt-10">
    <!-- Texto -->
    <div>
      <h2 class="text-4xl font-inter-tight font-bold tracking-tight text-gray-900 leading-tight">
        Monitorea el estado de tu carga
      </h2>

      <p class="mt-4 text-lg text-gray-600 leading-relaxed font-inter">
        Visualiza en tiempo real el caudal, la presión y la evolución de cada carga
        a lo largo del proceso. Un sistema pensado para darte control total.
      </p>

      <button class="mt-6 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition">
        Ver más
      </button>
    </div>

    <!-- Imagen -->
    <div class="flex justify-center">
      <img src="/caudal.jpg" class="rounded-2xl shadow-xl w-full h-auto object-cover contrast-75"
        alt="Medición de caudal" />
    </div>

  </div>

  <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-12 items-center pt-10 pb-20">

    <!-- Imagen -->
    <div class="flex justify-center">
      <img src="/historial.jpg" class="rounded-2xl shadow-xl w-full h-auto object-cover contrast-75"
        alt="Medición de caudal" />
    </div>

    <!-- Texto -->
    <div>
      <h2 class="text-4xl font-inter-tight font-bold tracking-tight text-gray-900 leading-tight">
        Consulta el historial de conciliaciones de tus ordenes
      </h2>

      <p class="mt-4 text-lg text-gray-600 leading-relaxed font-inter">
        Ingresa el numero de orden correspondiente y veras todos los datos asociados a la carga de tu orden.
      </p>

      <button class="mt-6 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition">
        Ver más
      </button>
    </div>

  </div>


  <div class="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 py-24">
    <h2 class="text-center text-5xl font-inter-tight font-bold text-white tracking-tight mt-5 mb-20">
      Estado de la orden
    </h2>
    <div class="max-w-7xl mb-10 mx-auto grid grid-cols-4 gap-10 px-6">

      <div class="flex flex-col items-center text-center group">
        <h1 class="text-6xl font-extrabold text-white group-hover:text-blue-400 transition">
          1
        </h1>
        <p class="mt-2 text-gray-300 group-hover:text-white transition">
          Pendiente de pesaje inicial
        </p>
      </div>

      <div class="flex flex-col items-center text-center group">
        <h1 class="text-6xl font-extrabold text-white group-hover:text-blue-400 transition">
          2
        </h1>
        <p class="mt-2 text-gray-300 group-hover:text-white transition">
          Lista para carga
        </p>
      </div>

      <div class="flex flex-col items-center text-center group">
        <h1 class="text-6xl font-extrabold text-white group-hover:text-blue-400 transition">
          3
        </h1>
        <p class="mt-2 text-gray-300 group-hover:text-white transition">
          Carga registrada
        </p>
      </div>

      <div class="flex flex-col items-center text-center group">
        <h1 class="text-6xl font-extrabold text-white group-hover:text-blue-400 transition">
          4
        </h1>
        <p class="mt-2 text-gray-300 group-hover:text-white transition">
          Orden cerrada
        </p>
      </div>

    </div>
  </div>


</template>
