<template>
  <section class="py-20 bg-gray-50 min-h-screen font-inter">
    <div class="max-w-6xl mx-auto px-6 space-y-10">

      <div class="cursor-pointer select-none group" @click="toggleDetalle">
        <h1 class="text-4xl font-bold flex items-center gap-3 text-gray-900">
          Monitor de Orden #{{ orden.numeroOrden || '...' }}
          <span class="text-gray-400 text-2xl group-hover:text-blue-500 transition-colors">
            {{ showDetalle ? '▲' : '▼' }}
          </span>
        </h1>
      </div>

      <div v-if="showDetalle"
        class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
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
              <p class="text-gray-800 font-medium">{{ orden.fechaRecepcionOrden }}</p>
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
              <p class="text-gray-800 font-medium">{{ orden.fechaInicioCarga || '--:--' }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Fin Carga</p>
              <p class="text-gray-800 font-medium">{{ orden.fechaFinCarga || '--:--' }}</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p class="text-xs uppercase text-gray-500 mb-1 font-bold">Pesaje Final</p>
              <p class="text-gray-800 font-medium">{{ orden.fechaPesajeFinal || 'Pendiente' }}</p>
              <p class="text-sm font-bold text-gray-900 mt-2">Peso Inicial: {{ orden.pesoFinal || '0' }} kg</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div :class="orden.estado === 'ESTADO_2_EN_PROCESO_DE_CARGA' ? 'md:col-span-1' : 'md:col-span-2'"
          class="p-8 rounded-2xl shadow-lg border bg-blue-600 border-blue-700 text-white flex flex-col justify-center transition-all duration-500">
          <h2 class="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Estado Actual</h2>
          <p class="text-4xl font-black italic tracking-tighter">{{ orden.estado || 'ESPERANDO...' }}</p>
        </div>

        <div v-if="orden.estado === 'ESTADO_2_EN_PROCESO_DE_CARGA'"
          class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center">
          <h2 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Tiempo de Carga</h2>
          <p class="text-4xl font-black text-gray-900 tabular-nums">{{ tiempoTranscurridoDisplay }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-white p-8 rounded-2xl shadow-md border-b-4 border-red-500 text-center group hover:bg-red-50 transition-colors">
          <p class="text-6xl font-black text-red-900 tracking-tighter group-hover:scale-110 transition-transform">
            {{ temperatura }}<span class="text-2xl ml-1">°C</span>
          </p>
          <p class="text-xs font-bold text-red-700 mt-4 uppercase tracking-[0.2em]">Temperatura</p>
        </div>

        <div
          class="bg-white p-8 rounded-2xl shadow-md border-b-4 border-blue-500 text-center group hover:bg-blue-50 transition-colors">
          <p class="text-6xl font-black text-blue-900 tracking-tighter group-hover:scale-110 transition-transform">
            {{ caudal }}
          </p>
          <p class="text-xs font-bold text-blue-700 mt-4 uppercase tracking-[0.2em]">Caudal Actual (kg/h)</p>
        </div>

        <div
          class="bg-white p-8 rounded-2xl shadow-md border-b-4 border-green-500 text-center group hover:bg-green-50 transition-colors">
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

          <div class="text-center pb-1">
            <p class="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">ETA (Llenado)</p>

            <p v-if="orden.preset && masaActual < orden.preset" class="text-3xl font-black text-gray-900 tabular-nums">
              {{ etaDisplay }}
            </p>

            <p v-else-if="orden.preset && masaActual > orden.preset"
              class="text-3xl font-black text-red-600 animate-pulse tabular-nums">
              ¡ATENCION!
            </p>

            <p v-else-if="orden.preset" class="text-3xl font-black text-green-600 tabular-nums">
              FINALIZADO
            </p>

            <p v-else class="text-3xl font-black text-gray-300 tabular-nums">
              --:--:--
            </p>
          </div>

          <div class="text-right">
            <span class="text-5xl font-black text-blue-600 tabular-nums">{{ porcentajeCarga }}%</span>
          </div>
        </div>

        <div class="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
          <div
            class="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            :style="{ width: porcentajeCarga + '%' }">
            <div class="w-full h-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent">
            </div>
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
            <span
              class="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-full animate-pulse uppercase">Live</span>
          </div>
          <div class="h-[250px]">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 uppercase tracking-tight">Caudal</h2>
            <span
              class="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full animate-pulse uppercase">Live</span>
          </div>
          <div class="h-[250px]">
            <canvas ref="chartCaudalCanvas"></canvas>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span class="w-1 h-5 bg-red-500 rounded-full"></span>
            Alarmas Activas
            <span v-if="alarmas?.length"
              class="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black rounded-full uppercase animate-pulse">
              {{ alarmas.length }}
            </span>
          </h3>
          <div v-if="!alarmas || alarmas.length === 0"
            class="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center font-semibold">
            No hay alarmas activas
          </div>
          <div v-else class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            <div v-for="alarma in alarmas" :key="alarma.id"
              class="flex items-center justify-between p-5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 transition-colors">
              <div>
                <p class="text-xs uppercase text-red-600 font-black tracking-widest mb-1">Alarma #{{ alarma.id }}</p>
                <p class="text-lg font-bold text-red-900">{{ alarma.estado.replaceAll('_', ' ') }}</p>
                <p class="text-xs text-gray-600 mt-1">{{ formatFecha(alarma.tiempo) }}</p>
              </div>
              <div class="text-right space-y-2">
                <span class="px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-full uppercase animate-pulse">Pendiente</span>
                <button @click="aceptarAlarma(alarma.id)" class="block w-full my-2 px-4 py-2 text-green-600 hover:text-green-700 text-xs font-bold rounded-lg transition">ACEPTAR</button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span class="w-1 h-5 bg-blue-500 rounded-full"></span>
            Últimas Cargas
          </h3>
          <div v-if="!historialCargas || historialCargas.length === 0"
            class="bg-gray-50 border border-gray-200 text-gray-500 p-6 rounded-xl text-center font-semibold">
            Sin datos de carga recientes
          </div>
          <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            <div v-for="(carga, index) in historialCargas" :key="index"
              class="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition-all">
              <div class="flex flex-col">
                <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">{{ carga.timestamp?.split(' ')[1] || '00:00:00' }}</span>
                <span class="text-sm font-bold text-gray-900">{{ carga.masaAcumulada }} kg</span>
              </div>
              <div class="text-right grid grid-cols-2 gap-x-4">
                <div>
                  <p class="text-[8px] uppercase text-gray-400 font-bold">Temp</p>
                  <p class="text-xs font-black text-red-600">{{ carga.temperatura }}°</p>
                </div>
                <div>
                  <p class="text-[8px] uppercase text-gray-400 font-bold">Caudal</p>
                  <p class="text-xs font-black text-blue-600">{{ carga.caudal }}</p>
                </div>
              </div>
            </div>
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

const orden = ref({})
const alarmas = ref([])
const historialCargas = ref([])
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
let timerInterval = null

const tiempoTranscurridoDisplay = ref('--:--:--')

const porcentajeCarga = computed(() => {
  const objetivo = orden.value?.preset || 30000;
  if (objetivo === 0) return 0;
  const calculo = (masaActual.value / objetivo) * 100;
  return Math.min(Math.round(calculo), 100);
});

const etaDisplay = computed(() => {
  const preset = orden.value?.preset || 0;
  const masa = masaActual.value || 0;
  const c = caudal.value || 0;

  if (c <= 0 || masa >= preset) return '--:--:--';

  const restanteKg = preset - masa;
  const horasRestantes = restanteKg / c;
  const segundosRestantes = Math.round(horasRestantes * 3600);

  const h = Math.floor(segundosRestantes / 3600);
  const m = Math.floor((segundosRestantes % 3600) / 60);
  const s = segundosRestantes % 60;

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

function updateTiempoTranscurrido() {
  const estado = orden.value?.estado
  const estaCargando = estado === 'ESTADO_2_EN_PROCESO_DE_CARGA' || estado === 2
  if (!estaCargando) {
    tiempoTranscurridoDisplay.value = '--:--:--'
    return
  }
  const fechaInicio = orden.value?.fechaInicioCarga
  if (!fechaInicio) {
    tiempoTranscurridoDisplay.value = '00:00:00'
    return
  }
  const fechaNormalizada = fechaInicio.replace(' ', 'T')
  const inicio = new Date(fechaNormalizada)
  if (isNaN(inicio.getTime())) {
    tiempoTranscurridoDisplay.value = '00:00:00'
    return
  }
  const ahora = new Date()
  const diffSegundos = Math.floor((ahora - inicio) / 1000)
  const horas = Math.floor(diffSegundos / 3600)
  const minutos = Math.floor((diffSegundos % 3600) / 60)
  const segundos = diffSegundos % 60
  tiempoTranscurridoDisplay.value = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
}

async function fetchOrden() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get(`https://cernikiw3.chickenkiller.com/api/v1/orden/${numeroOrden}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    orden.value = res.data
    if (res.data.ultimaMasaAcumulada) {
      masaActual.value = res.data.ultimaMasaAcumulada;
    }
    if (orden.value.id) {
      await fetchHistorial(orden.value.numeroOrden)
      await fetchAlarmas(orden.value.id)
    }
  } catch (err) {
    console.error('Error cargando orden:', err)
  }
}

async function aceptarAlarma(idAlarma) {
  try {
    const token = localStorage.getItem('token')
    await axios.post("https://cernikiw3.chickenkiller.com/api/v1/orden/set-estado-alarma?estado=ACEPTADA", { id: idAlarma }, { headers: { 'Authorization': `Bearer ${token}` } })
    alert("Alarma aceptada ")
    await fetchAlarmas(orden.value.id)
  } catch (err) {
    console.error('Error tocando el boton:', err)
  }
}

async function fetchAlarmas(idOrden) {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get(`https://cernikiw3.chickenkiller.com/api/v1/alarmas?idOrden=${idOrden}&size=20`, { headers: { 'Authorization': `Bearer ${token}` } })
    alarmas.value = res.data.alarmas
  } catch (err) {
    console.error('Error cargando alarma:', err)
  }
}

async function fetchHistorial(nroOrden) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`https://cernikiw3.chickenkiller.com/api/v1/carga/${nroOrden}`, { headers: { 'Authorization': `Bearer ${token}` } })
    const historial = res.data
    if (historial && historial.length > 0) {
      historialCargas.value = [...historial].reverse().slice(0, 20)
      const ultimo = historial[historial.length - 1]
      temperatura.value = ultimo.temperatura || 0
      caudal.value = ultimo.caudal || 0
      densidad.value = ultimo.densidadProducto || 0
      if (ultimo.masaAcumulada) { masaActual.value = ultimo.masaAcumulada; }
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

function toggleDetalle() { showDetalle.value = !showDetalle.value }

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    await nextTick()
    const commonOptions = {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { grid: { color: '#f3f4f6' }, beginAtZero: false }, x: { grid: { display: false } } }
    }
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: { labels: [], datasets: [{ label: 'Temp', data: [], borderColor: 'rgb(239, 68, 68)', backgroundColor: 'rgba(239, 68, 68, 0.05)', tension: 0.4, fill: true, pointRadius: 0 }] },
      options: commonOptions
    })
    chartCaudalInstance = new Chart(chartCaudalCanvas.value, {
      type: 'line',
      data: { labels: [], datasets: [{ label: 'Caudal', data: [], borderColor: 'rgb(37, 99, 235)', backgroundColor: 'rgba(37, 99, 235, 0.05)', tension: 0.4, fill: true, pointRadius: 0 }] },
      options: commonOptions
    })
    await fetchOrden()
    timerInterval = setInterval(updateTiempoTranscurrido, 1000);
    connectSocket(numeroOrden, token,
      (data) => {
        if (data.masaAcumulada !== undefined) { 
          masaActual.value = data.masaAcumulada;
          const ahoraString = new Date().toISOString().replace('T', ' ').split('.')[0];
          historialCargas.value.unshift({ ...data, timestamp: ahoraString });
          if (historialCargas.value.length > 20) historialCargas.value.pop();
        }
        if (data.orden) {
          orden.value = data.orden;
          if (data.orden.ultimaMasaAcumulada) { masaActual.value = data.orden.ultimaMasaAcumulada; }
        }
        if (data.temperatura !== undefined) temperatura.value = data.temperatura
        if (data.caudal !== undefined) caudal.value = data.caudal
        if (data.densidadProducto !== undefined) densidad.value = data.densidadProducto
        const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        if (chartInstance && data.temperatura !== undefined) {
          chartInstance.data.labels.push(ahora)
          chartInstance.data.datasets[0].data.push(data.temperatura)
          if (chartInstance.data.labels.length > 30) { chartInstance.data.labels.shift(); chartInstance.data.datasets[0].data.shift(); }
          chartInstance.update('none')
        }
        if (chartCaudalInstance && data.caudal !== undefined) {
          chartCaudalInstance.data.labels.push(ahora)
          chartCaudalInstance.data.datasets[0].data.push(data.caudal)
          if (chartCaudalInstance.data.labels.length > 30) { chartCaudalInstance.data.labels.shift(); chartCaudalInstance.data.datasets[0].data.shift(); }
          chartCaudalInstance.update('none')
        }
      },
      (dataAlarma) => {
        const nuevaAlarma = { id: dataAlarma.id, estado: dataAlarma.estado, tiempo: dataAlarma.fechaCreacion };
        alarmas.value.unshift(nuevaAlarma);
      })
  } catch (err) { console.error("Error en monitor:", err) }
})

onBeforeUnmount(() => {
  disconnectSocket()
  if (timerInterval) clearInterval(timerInterval)
  if (chartInstance) chartInstance.destroy()
  if (chartCaudalInstance) chartCaudalInstance.destroy()
})

const formatFecha = (fecha) => {
  if (!fecha) return 'Sin fecha'
  const d = new Date(fecha.replace(' ', 'T'))
  return d.toLocaleString()
}
</script>