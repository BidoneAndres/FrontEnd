<template>
  <div class="min-h-screen bg-gray-50 py-16 font-inter">
    <div class="max-w-7xl mx-auto px-6">

      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <h2 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
            Control de Órdenes
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Seguimiento de flujo por estados operativos.
          </p>
        </div>

        <div class="flex flex-wrap gap-2 p-1 bg-gray-200 rounded-2xl">
          <button
            v-for="estado in estadosConfig"
            :key="estado.id"
            @click="filtroActual = estado.id"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-tighter',
              filtroActual === estado.id
                ? 'bg-white text-gray-900 shadow-sm scale-105 border border-gray-100'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
            ]"
          >
            {{ estado.shortLabel }}
          </button>
        </div>
      </div>

      <div v-if="!loading && ordenesFiltradas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="orden in ordenesFiltradas"
          :key="orden.id"
          @click="irAlMonitor(orden.id)"
          class="group bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-gray-900 transition-all duration-500 cursor-pointer relative"
        >
          <div :class="['absolute left-0 top-12 bottom-12 w-1.5 rounded-r-full', getColorEstado(orden.estado)]"></div>

          <div class="flex justify-between items-start mb-6">
            <div>
              <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Código Sistema</span>
              <span class="text-lg font-bold text-gray-900">N° {{ orden.numeroOrden || orden.id }}</span>
            </div>

            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-100 font-bold text-gray-400 group-hover:border-gray-900 group-hover:text-gray-900 transition-colors">
              {{ orden.estado.split('_')[1] }}
            </div>
          </div>

          <h3 class="text-2xl font-inter-tight font-bold text-gray-900 mb-2">
            {{ orden.cliente?.razonSocial || 'Sin Razón Social' }}
          </h3>

          <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">
            {{ formatEstadoTexto(orden.estado) }}
          </p>

          <div class="mt-6 pt-6 border-t border-gray-100 space-y-3 font-inter">
            <div class="flex justify-between">
              <span class="text-xs text-gray-400 uppercase font-bold">Patente</span>
              <span class="text-xs font-bold text-gray-800">{{ orden.camion?.patente || '---' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs text-gray-400 uppercase font-bold">Chofer</span>
              <span class="text-xs font-bold text-gray-800">{{ orden.chofer?.nombre || 'No asignado' }}</span>
            </div>
          </div>

          <div class="mt-8 flex items-center text-gray-900 font-bold text-xs uppercase tracking-widest">
            Ir al monitor
            <span class="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
        <p class="text-gray-400 font-inter-tight text-xl mb-6">No hay registros en esta etapa.</p>
        <button @click="filtroActual = 'TODOS'" class="px-8 py-3 bg-gray-900 text-white rounded-full font-bold uppercase text-xs tracking-widest shadow-xl">Ver historial completo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const ordenes = ref([])
const loading = ref(true)
const filtroActual = ref('TODOS')
const router = useRouter()

// Configuración exacta con tus estados
const estadosConfig = [
  { id: 'TODOS', shortLabel: 'Todas' },
  { id: 'ESTADO_1_PENDIENTE_PESAJE_INICIAL', shortLabel: 'Pesaje Inicial' },
  { id: 'ESTADO_2_PESAJE_INICIAL_REGISTRADO', shortLabel: 'Pesaje Reg.' },
  { id: 'ESTADO_2_EN_PROCESO_DE_CARGA', shortLabel: 'En Carga' },
  { id: 'ESTADO_3_CERRADA_PARA_CARGA', shortLabel: 'Cerrada p/ Carga' },
  { id: 'ESTADO_4_FINALIZADA', shortLabel: 'Finalizada' }
]

const ordenesFiltradas = computed(() => {
  if (filtroActual.value === 'TODOS') return ordenes.value
  return ordenes.value.filter(o => o.estado === filtroActual.value)
})

// Formatea el texto largo para que se vea lindo en la card
function formatEstadoTexto(estado: string) {
  // Quita el "ESTADO_X_" del principio para mostrar solo la descripción
  return estado.split('_').slice(2).join(' ')
}

function getColorEstado(estado: string) {
  if (estado.includes('ESTADO_1')) return 'bg-gray-400'
  if (estado.includes('ESTADO_2')) return 'bg-orange-500'
  if (estado.includes('ESTADO_3')) return 'bg-blue-600'
  if (estado.includes('ESTADO_4')) return 'bg-green-500'
  return 'bg-gray-200'
}

async function fetchOrdenes() {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('https://cernikiw3.chickenkiller.com/api/v1/orden', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    ordenes.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function irAlMonitor(id: number) {
  router.push(`/monitor/${id}`)
}

onMounted(fetchOrdenes)
</script>

<style scoped>
.font-inter-tight { font-family: 'Inter Tight', sans-serif; }
.font-inter { font-family: 'Inter', sans-serif; }
</style>
