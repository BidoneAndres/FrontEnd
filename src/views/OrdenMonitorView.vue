<template>
  <section class="py-20 bg-gray-50 min-h-screen font-inter">
    <div class="max-w-6xl mx-auto px-6 space-y-10">

      <div 
        class="cursor-pointer select-none group"
        @click="toggleDetalle"
      >
        <h1 class="text-4xl font-bold flex items-center gap-3 text-gray-900">
          Monitor de Orden #{{ orden.numeroOrden || '...' }}
          <span class="text-gray-400 text-2xl group-hover:text-blue-500 transition-colors">
            {{ showDetalle ? '▲' : '▼' }}
          </span>
        </h1>
      </div>

      <div 
        v-if="showDetalle"
        class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-1 h-5 bg-blue-500 rounded-full"></span>
            Información General
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Número de Orden</p>
              <p class="text-gray-800 font-medium">{{ orden.numeroOrden }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Camión</p>
              <p class="text-gray-800 font-medium">{{ orden.camion?.patente || 'No disponible' }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Cliente</p>
              <p class="text-gray-800 font-medium">{{ orden.cliente?.razonSocial || 'No disponible' }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Preset (Objetivo)</p>
              <p class="text-gray-800 font-bold text-blue-600">{{ orden.preset }} kg</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Fecha Recepción</p>
              <p class="text-gray-800 font-medium">{{ orden.fechaRecepcion }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Fecha Estimada</p>
              <p class="text-gray-800 font-medium">{{ orden.fechaEstimada }}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-1 h-5 bg-green-500 rounded-full"></span>
            Proceso de Carga
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Pesaje Inicial</p>
              <p class="text-gray-800 font-medium text-sm">{{ orden.fechaPesajeInicial || 'Pendiente' }}</p>
              <p class="text-sm font-bold text-gray-900 mt-2">Peso Inicial: {{ orden.pesoInicial || '0' }} kg</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Inicio Carga</p>
              <p class="text-gray-800 font-medium">{{ orden.inicioCarga || '--:--' }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Fin Carga</p>
              <p class="text-gray-800 font-medium">{{ orden.finCarga || '--:--' }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Pesaje Final</p>
              <p class="text-gray-800 font-medium">{{ orden.fechaPesajeFinal || 'Pendiente' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-8 rounded-2xl shadow-lg border bg-blue-600 border-blue-700 text-white flex flex-col justify-center">
        <h2 class="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Estado Actual</h2>
        <p class="text-4xl font-black italic tracking-tighter">{{ orden.estado || 'ESPERANDO...' }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-8 rounded-2xl shadow-md border-b-4 border-red-500 text-center group hover:bg-red-50 transition-colors">
          <p class="text-6xl font-black text-red-900 tracking-tighter group-hover:scale-110 transition-transform">
            {{ temperatura }}<span class="text-2xl ml-1">°C</span>
          </p>
          <p class="text-xs font-bold text-red-700 mt-4 uppercase tracking-[0.2em]">Temperatura</p>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-md border-b-4 border-blue-500 text-center group hover:bg-blue-50 transition-colors">
          <p class="text-6xl font-black text-blue-900 tracking-tighter group-hover:scale-110 transition-transform">
            {{ caudal }}
          </p>
          <p class="text-xs font-bold text-blue-700 mt-4 uppercase tracking-[0.2em]">Caudal Actual</p>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-md border-b-4 border-green-500 text-center group hover:bg-green-50 transition-colors">
          <p class="text-6xl font-black text-green-900 tracking-tighter group-hover:scale-110 transition-transform">
            {{ densidad }}
          </p>
          <p class="text-xs font-bold text-green-700 mt-4 uppercase tracking-[0.2em]">Densidad (ρ)</p>
        </div>
      </div>

      <div class="p-8 rounded-2xl shadow-lg border bg-white border-blue-100">
        <div class="flex justify-between items-end mb-4">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Monitoreo de Producto</p>
            <h3 class="text-4xl font-black text-gray-900 uppercase tracking-tighter">
              {{ orden.producto?.producto || 'SIN PRODUCTO' }}
            </h3>
          </div>
          <div class="text-right">
            <span class="text-5xl font-black text-blue-600 tabular-nums">{{ porcentajeCarga }}%</span>
          </div>
        </div>

        <div class="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
          <div 
            class="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            :style="{ width: porcentajeCarga + '%' }"
          >
            <div class="w-full h-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
        
        <div class="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <span>0 kg</span>
          <span class="text-gray-900 font-bold">Masa Actual: {{ masaActual }} kg</span>
          <span>Objetivo: {{ orden.preset || 30000 }} kg</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 uppercase tracking-tight">Temperatura</h2>
            <span class="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-full animate-pulse uppercase">Live</span>
          </div>
          <div class="h-[250px]">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 uppercase tracking-tight">Caudal</h2>
            <span class="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full animate-pulse uppercase">Live</span>
          </div>
          <div class="h-[250px]">
            <canvas ref="chartCaudalCanvas"></canvas>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { connectSocket, disconnectSocket } from '@/services/socket'
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'

// --- ESTADOS (REFS) ---
const orden = ref({})
const temperatura = ref(0)
const caudal = ref(0)
const densidad = ref(0)
const masaActual = ref(0) 

const chartCanvas = ref(null)
const chartCaudalCanvas = ref(null)
const showDetalle = ref(false)

const route = useRoute()
const numeroOrden = route.params.id 

let chartInstance = null
let chartCaudalInstance = null

// --- CÁLCULOS REACTIVOS ---
const porcentajeCarga = computed(() => {
  const objetivo = orden.value?.preset || 30000; 
  if (objetivo === 0) return 0;
  
  const calculo = (masaActual.value / objetivo) * 100;
  return Math.min(Math.round(calculo), 100);
});

// --- FUNCIONES DE CARGA ---
async function fetchOrden() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    
    const res = await axios.get(`http://localhost:8080/api/v1/orden/${numeroOrden}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    orden.value = res.data
    // Sincronizamos la masa inicial desde la API
    if (res.data.ultimaMasaAcumulada) {
      masaActual.value = res.data.ultimaMasaAcumulada;
    }
    
    if (orden.value.id) {
      await fetchHistorial(orden.value.numeroOrden)
    }
  } catch (err) {
    console.error('Error cargando orden:', err)
  }
}

async function fetchHistorial(nroOrden) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`http://localhost:8080/api/v1/carga/${nroOrden}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    const historial = res.data
    if (historial && historial.length > 0) {
      const ultimo = historial[historial.length - 1]
      temperatura.value = ultimo.temperatura || 0
      caudal.value = ultimo.caudal || 0
      densidad.value = ultimo.densidadProducto || 0
      
      // Aseguramos que masaActual tenga el último punto del historial
      if (ultimo.masaAcumulada) {
        masaActual.value = ultimo.masaAcumulada;
      }

      const labels = historial.map(d => d.timestamp ? d.timestamp.split(' ')[1] : 'S/T')
      if (chartInstance) {
        chartInstance.data.labels = labels
        chartInstance.data.datasets[0].data = historial.map(d => d.temperatura)
        chartInstance.update()
      }
      if (chartCaudalInstance) {
        chartCaudalInstance.data.labels = labels
        chartCaudalInstance.data.datasets[0].data = historial.map(d => d.caudal)
        chartCaudalInstance.update()
      }
    }
  } catch (err) {
    console.error('Error historial:', err)
  }
}

function toggleDetalle() {
  showDetalle.value = !showDetalle.value
}

// --- CICLO DE VIDA ---
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    await nextTick()

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { 
        y: { grid: { color: '#f3f4f6' }, beginAtZero: false },
        x: { grid: { display: false } }
      }
    }

    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Temp',
          data: [],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
          tension: 0.4,
          fill: true,
          pointRadius: 0
        }]
      },
      options: commonOptions
    })

    chartCaudalInstance = new Chart(chartCaudalCanvas.value, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Caudal',
          data: [],
          borderColor: 'rgb(37, 99, 235)',
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          tension: 0.4,
          fill: true,
          pointRadius: 0
        }]
      },
      options: commonOptions
    })

    await fetchOrden()

 
    connectSocket(numeroOrden, token, (data) => {
   
      if (data.masaAcumulada !== undefined) {
        masaActual.value = data.masaAcumulada;
      }

    
      if (data.orden) {
        orden.value = data.orden;
     
        if (data.orden.ultimaMasaAcumulada) {
            masaActual.value = data.orden.ultimaMasaAcumulada;
        }
      }


      if (data.temperatura !== undefined) temperatura.value = data.temperatura
      if (data.caudal !== undefined) caudal.value = data.caudal
      if (data.densidadProducto !== undefined) densidad.value = data.densidadProducto

      const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    
      if (chartInstance && data.temperatura !== undefined) {
        chartInstance.data.labels.push(ahora)
        chartInstance.data.datasets[0].data.push(data.temperatura)
        if (chartInstance.data.labels.length > 30) {
          chartInstance.data.labels.shift()
          chartInstance.data.datasets[0].data.shift()
        }
        chartInstance.update('none')
      }

      if (chartCaudalInstance && data.caudal !== undefined) {
        chartCaudalInstance.data.labels.push(ahora)
        chartCaudalInstance.data.datasets[0].data.push(data.caudal)
        if (chartCaudalInstance.data.labels.length > 30) {
          chartCaudalInstance.data.labels.shift()
          chartCaudalInstance.data.datasets[0].data.shift()
        }
        chartCaudalInstance.update('none')
      }
    })

  } catch (err) {
    console.error("Error en monitor:", err)
  }
})

onBeforeUnmount(() => {
  disconnectSocket()
  if (chartInstance) chartInstance.destroy()
  if (chartCaudalInstance) chartCaudalInstance.destroy()
})
</script>

