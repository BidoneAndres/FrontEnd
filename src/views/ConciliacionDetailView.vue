<template>
  <div class="min-h-screen bg-gray-50 py-16 font-inter">
    <div class="max-w-5xl mx-auto px-6">

      <button @click="$router.back()"
        class="flex items-center text-gray-400 hover:text-gray-900 transition-colors mb-8 font-bold text-xs uppercase tracking-widest">
        <span class="mr-2">←</span> Volver al listado
      </button>

      <div v-if="loading" class="text-center py-20 animate-pulse text-gray-400 font-bold uppercase tracking-widest">
        Buscando auditoría de orden...
      </div>

      <div v-else-if="conciliacion" class="space-y-8 animate-in fade-in duration-700">

        <div class="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50"></div>

          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <span class="text-xs font-black text-blue-600 uppercase tracking-[0.2em] block mb-2">Informe Final de
                Carga</span>
              <h1 class="text-5xl font-inter-tight font-bold text-gray-900 tracking-tighter">
                Orden #{{ conciliacion.orden?.id || 'S/N' }}
              </h1>
              <p class="text-gray-400 text-sm font-medium mt-1">
                Conciliación procesada ID: {{ conciliacion.id }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estado de Auditoría</p>
              <span
                class="px-6 py-2 bg-green-900 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em]">
                {{ conciliacion.orden?.estado ? conciliacion.orden.estado.split('_').pop() : 'CONCILIADA' }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Peso Inicial (Balanza)</p>
              <p class="text-4xl font-bold text-gray-900 tabular-nums">{{ conciliacion.pesoInicial }} <span
                  class="text-lg font-medium text-gray-400">kg</span></p>
            </div>
            <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Peso Final (Balanza)</p>
              <p class="text-4xl font-bold text-gray-900 tabular-nums">{{ conciliacion.pesoFinal }} <span
                  class="text-lg font-medium text-gray-400">kg</span></p>
            </div>
            <div class="p-8 bg-gray-900 rounded-[2rem] shadow-2xl shadow-blue-900/20">
              <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Neto por Balanza</p>
              <p class="text-4xl font-bold text-white tabular-nums">{{ conciliacion.netoPorBalanza }}<span
                  class="text-lg font-medium text-blue-400">kg</span></p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div class="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm">
            <h3 class="text-xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              Promedios de Carga
            </h3>
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Caudal</span>
                <span class="text-lg font-bold text-gray-900">{{ conciliacion.promedioCaudal || '0' }} m³/h</span>
              </div>
              <div class="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Densidad</span>
                <span class="text-lg font-bold text-gray-900">{{ conciliacion.promedioDensidad || '0' }} kg/m³</span>
              </div>
              <div class="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Temperatura</span>
                <span class="text-lg font-bold text-gray-900">{{ conciliacion.promedioTemperatura || '0' }} °C</span>
              </div>
            </div>
          </div>

          <div class="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm flex flex-col justify-between">
            <div class="p-6 bg-red-50 rounded-3xl border border-red-100 relative overflow-hidden">
              <div class="absolute -right-4 -bottom-4 text-red-100 text-6xl font-black opacity-50">!</div>
              <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1 relative z-10">Diferencia
                Balanza vs Caudalímetro</p>
              <p class="text-3xl font-bold text-red-600 relative z-10">{{ conciliacion.diferenciaBalanzaCaudalimetro ||
                '0' }} kg</p>
              <p class="text-[10px] text-red-400 mt-2 font-medium italic relative z-10">* Desviación calculada por
                sistema</p>
            </div>
          </div>

        </div>

      </div>

      <div v-else class="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
        <p class="text-gray-400 font-bold uppercase tracking-widest">No se encontró la conciliación para esta orden.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 1. IMPORTANTE: Agregamos la importación de api para quitar el ReferenceError
import api from '../services/api'

const route = useRoute()
const conciliacion = ref(null)
const loading = ref(true)

async function fetchDetalleConciliacion() {
  try {
    loading.value = true
    const numeroOrden = route.params.id

    const res = await api.get(`/conciliacion/orden/${numeroOrden}`)

    // 2. Interceptamos y forzamos el parseo si llega como String
    let data = res.data;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.error('Error forzando el parseo a JSON:', e);
      }
    }

    // 3. Verificamos si el endpoint devuelve un array de 1 elemento o el objeto directo
    if (Array.isArray(data)) {
      conciliacion.value = data[0] || {};
    } else {
      conciliacion.value = data?.content || data?.data || data || {};
    }

  } catch (error) {
    console.error('Error al cargar detalle:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetalleConciliacion()
})
</script>

<style scoped>
.font-inter-tight {
  font-family: 'Inter Tight', sans-serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}
</style>
