<template>
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6 space-y-10">

      <!-- Título -->
      <div 
        class="cursor-pointer select-none"
        @click="toggleDetalle"
      >
        <h1 class="text-4xl font-bold flex items-center gap-3">
          Monitor de Orden #{{ orden.numeroOrden }}
          <span class="text-gray-400 text-2xl">
            {{ showDetalle ? '▲' : '▼' }}
          </span>
        </h1>
      </div>

      <div 
  v-if="showDetalle"
  class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-6 space-y-8"
>

  <!-- INFORMACIÓN GENERAL -->
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Información General
    </h3>

    <div class="grid grid-cols-3 gap-6">

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Número de Orden</p>
        <p class="text-gray-800 font-medium">{{ orden.numeroOrden }}</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Camión</p>
        <p class="text-gray-800 font-medium">{{ orden.camion }}</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Cliente</p>
        <p class="text-gray-800 font-medium">{{ orden.cliente }}</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Preset</p>
        <p class="text-gray-800 font-medium">{{ orden.preset }}</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Fecha Recepción</p>
        <p class="text-gray-800 font-medium">{{ orden.fechaRecepcion }}</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Fecha Estimada</p>
        <p class="text-gray-800 font-medium">{{ orden.fechaEstimada }}</p>
      </div>

    </div>
  </div>

  <!-- PROCESO -->
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Proceso de Carga
    </h3>

    <div class="grid grid-cols-4 gap-6">

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Pesaje Inicial</p>
        <p class="text-gray-800 font-medium">
          {{ orden.fechaPesajeInicial ?? 'No disponible' }}
        </p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Inicio Carga</p>
        <p class="text-gray-800 font-medium">
          {{ orden.inicioCarga ?? 'No disponible' }}
        </p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Fin Carga</p>
        <p class="text-gray-800 font-medium">
          {{ orden.finCarga ?? 'No disponible' }}
        </p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Pesaje Final</p>
        <p class="text-gray-800 font-medium">
          {{ orden.fechaPesajeFinal ?? 'No disponible' }}
        </p>
      </div>

    </div>
  </div>

</div>



      <!-- Estado actual -->
      <div class="p-6 rounded-2xl shadow-xl border bg-blue-50 border-blue-200">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">
          Estado actual
        </h2>
        <p class="text-3xl font-bold text-blue-900">
          {{ orden.estado }}
        </p>
      </div>

      <!-- Indicadores -->
      <div class="grid grid-cols-3 gap-6">

        <div class="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200 text-center">
          <p class="text-5xl font-extrabold text-red-900">
            {{ temperatura }} °C
          </p>
          <p class="text-sm text-red-700 mt-2">Temperatura actual</p>
        </div>

        <div class="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200 text-center">
          <p class="text-5xl font-extrabold text-blue-900">
            {{ caudal }}
          </p>
          <p class="text-sm text-blue-700 mt-2">Caudal</p>
        </div>

        <div class="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200 text-center">
          <p class="text-5xl font-extrabold text-green-900">
            {{ densidad }}
          </p>
          <p class="text-sm text-green-700 mt-2">Densidad</p>
        </div>

      </div>

      <!-- Gráfico -->
      <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h2 class="text-xl font-semibold mb-4">Temperatura en el tiempo</h2>
        <canvas ref="chartCanvas"></canvas>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'


const orden = ref({
  numeroOrden: 35,
  camion: "GHI-7890",
  cliente: "Shell",
  preset: "18270 kg",
  fechaRecepcion: "18/12/2024 15:21",
  fechaEstimada: "18/12/2024 15:30",
  fechaPesajeInicial: null,
  inicioCarga: null,
  finCarga: null,
  fechaPesajeFinal: null,
  estado: "EN_CARGA"
})



const temperatura = ref(24.5)
const caudal = ref(120)
const densidad = ref(0.82)

const chartCanvas = ref(null)
const showDetalle = ref(false)

function toggleDetalle() {
  showDetalle.value = !showDetalle.value
}


onMounted(() => {
  new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: ['10:00', '10:05', '10:10', '10:15', '10:20'],
      datasets: [
        {
          label: 'Temperatura',
          data: [20, 22, 23, 25, 24],
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style>
canvas {
  height: 300px !important;
}
</style>
