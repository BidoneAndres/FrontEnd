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
        <p class="text-gray-800 font-medium">{{ orden.camion?.patente || 'No disponible' }}</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <p class="text-xs uppercase text-gray-500 mb-1">Cliente</p>
        <p class="text-gray-800 font-medium">{{ orden.cliente?.razonSocial || 'No disponible' }}</p>
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
        <p class="text-sm text-gray-500 mt-2">
          Peso: {{ orden.pesoInicial ?? orden.pesajeInicial ?? 'No disponible' }}
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
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import { connectSocket, disconnectSocket } from '@/services/socket'

// --- ESTADOS (REFS) ---
const orden = ref({})
const temperatura = ref(0)
const caudal = ref(0)
const densidad = ref(0)
const chartCanvas = ref(null)
const showDetalle = ref(false)
const nroOrdenReal = ref(null)

const route = useRoute()
const numeroOrden = route.params.id 
let chartInstance = null

// --- FUNCIONES DE CARGA (API) ---

/**
 * 1. Carga los datos básicos de la orden (Cabecera)
 * Al terminar, dispara la carga del historial usando el ID real de la DB.
 */
async function fetchOrden() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    
    const res = await axios.get(`http://localhost:8080/api/v1/orden/${numeroOrden}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    orden.value = res.data
    console.log('Cabecera cargada. ID en DB:', orden.value.id)
    
    // Una vez que tenemos el ID real (ej: 1013), cargamos su historial
    if (orden.value.id) {
      await fetchHistorial(orden.value.numeroOrden)
    }
  } catch (err) {
    console.error('Error cargando orden:', err)
  }
}

/**
 * 2. Carga los puntos anteriores de la base de datos
 * @param {Number} idReal - El ID primario de la orden en la base de datos
 */
async function fetchHistorial(idReal) {
  try {
    const token = localStorage.getItem('token')
    console.log(` Solicitando historial para el recurso ID: ${idReal}`)
    
    const res = await axios.get(`http://localhost:8080/api/v1/carga/${idReal}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    const historial = res.data
    console.log("🔍 Datos crudos del historial:", historial)

    if (historial && historial.length > 0) {
      // Sincronizamos los indicadores con el último valor registrado
      const ultimo = historial[historial.length - 1]
      temperatura.value = ultimo.temperatura || 0
      caudal.value = ultimo.caudal || 0
      densidad.value = ultimo.densidadProducto || 0

      // Llenamos el gráfico con la historia recuperada
      if (chartInstance) {
        chartInstance.data.labels = historial.map(d => d.timestamp ? d.timestamp.split(' ')[1] : 'S/T')
        chartInstance.data.datasets[0].data = historial.map(d => d.temperatura)
        chartInstance.update()
      }
      console.log('Gráfico restaurado con', historial.length, 'puntos')
    } else {
      console.warn(" El historial vino vacío para el ID:", idReal)
    }
  } catch (err) {
    console.error(' Error cargando historial:', err)
  }
}

function toggleDetalle() {
  showDetalle.value = !showDetalle.value
}

// --- CICLO DE VIDA ---

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error("¡ERROR: No hay token en localStorage!")
      return
    }

    // Paso A: Inicializar gráfico vacío primero
    await nextTick()
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Temperatura °C',
          data: [],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: false } }
      }
    })

    // Paso B: Cargar la orden (esto disparará fetchHistorial automáticamente)
    await fetchOrden()

    // Paso C: Conectar WebSocket para datos en tiempo real
    connectSocket(numeroOrden, token, (data) => {
      console.log("Dato recibido por WS:", data)

      // Actualizar cabecera si viene el objeto orden completo
      if (data.orden) orden.value = data.orden

      // Actualizar indicadores con los nombres de tu backend
      if (data.temperatura !== undefined) temperatura.value = data.temperatura
      if (data.caudal !== undefined) caudal.value = data.caudal
      if (data.densidadProducto !== undefined) densidad.value = data.densidadProducto

      // Agregar punto nuevo al gráfico
      if (chartInstance && data.temperatura !== undefined) {
        const ahora = new Date().toLocaleTimeString()
        chartInstance.data.labels.push(ahora)
        chartInstance.data.datasets[0].data.push(data.temperatura)
        
        // Mantener solo los últimos 50 puntos para no sobrecargar el navegador
        if (chartInstance.data.labels.length > 50) {
          chartInstance.data.labels.shift()
          chartInstance.data.datasets[0].data.shift()
        }
        chartInstance.update('none') // 'none' para actualización fluida
      }
    })

  } catch (err) {
    console.error("Error crítico en el inicio del monitor:", err)
  }
})

onBeforeUnmount(() => {
  disconnectSocket()
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style>
canvas {
  height: 300px !important;
}
</style>
