
<template>
  <div class="min-h-screen bg-gray-50 py-16 font-inter">
    <div class="max-w-5xl mx-auto px-6">
      
      <button @click="$router.back()" class="flex items-center text-gray-400 hover:text-gray-900 transition-colors mb-8 font-bold text-xs uppercase tracking-widest">
        <span class="mr-2">←</span> Volver al listado
      </button>

      <div v-if="loading" class="text-center py-20 animate-pulse text-gray-400">
        Cargando auditoría de conciliación...
      </div>

      <div v-else-if="conciliacion" class="space-y-8">
        
        <div class="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span class="text-xs font-black text-blue-600 uppercase tracking-[0.2em] block mb-2">Informe Final de Carga</span>
              <h1 class="text-5xl font-inter-tight font-bold text-gray-900 tracking-tighter">
                Orden #{{ conciliacion.orden?.numeroOrden || conciliacion.orden_id }}
              </h1>
            </div>
            <div class="text-right">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estado de Auditoría</p>
              <span class="px-6 py-2 bg-green-900 text-white text-xs font-black rounded-full uppercase tracking-widest">
                CONCILIADA
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Peso Inicial (Balanza)</p>
              <p class="text-4xl font-bold text-gray-900">{{ conciliacion.peso_inicial }} <span class="text-lg font-medium text-gray-400">kg</span></p>
            </div>
            <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Peso Final (Balanza)</p>
              <p class="text-4xl font-bold text-gray-900">{{ conciliacion.peso_final }} <span class="text-lg font-medium text-gray-400">kg</span></p>
            </div>
            <div class="p-8 bg-gray-900 rounded-[2rem] shadow-xl shadow-blue-900/10">
              <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Neto por Balanza</p>
              <p class="text-4xl font-bold text-white">{{ conciliacion.neto_por_balanza }} <span class="text-lg font-medium text-blue-400">kg</span></p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm">
            <h3 class="text-xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Promedios de Carga</h3>
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">Caudal</span>
                <span class="text-lg font-bold text-gray-900">{{ conciliacion.promedio_caudal }} m³/h</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">Densidad</span>
                <span class="text-lg font-bold text-gray-900">{{ conciliacion.promedio_densidad }} kg/m³</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">Temperatura</span>
                <span class="text-lg font-bold text-gray-900">{{ conciliacion.promedio_temperatura }} °C</span>
              </div>
            </div>
          </div>

          <div class="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm flex flex-col justify-center">
            <div class="mb-8">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Producto Registrado</p>
              <p class="text-3xl font-bold text-gray-900">{{ conciliacion.producto_cargado || 'N/A' }}</p>
            </div>
            <div class="p-6 bg-red-50 rounded-2xl border border-red-100">
              <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Diferencia Balanza vs Caudalímetro</p>
              <p class="text-2xl font-bold text-red-600">{{ conciliacion.diferencia_balanza_caudalimetro }} kg</p>
              <p class="text-[10px] text-red-400 mt-2 font-medium italic">* Margen de error calculado por el sistema</p>
            </div>
          </div>

        </div>

        <div class="text-center py-10">
          <p class="text-xs font-bold text-gray-300 uppercase tracking-[0.3em]">ID Interno de Auditoría: {{ conciliacion.id }}</p>
        </div>

      </div>

      <div v-else class="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
        <p class="text-gray-400 font-bold uppercase tracking-widest">No se encontró la conciliación solicitada.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const conciliacion = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const id = route.params.numeroOrden
    

    const res = await axios.get(`http://localhost:8080/api/v1/conciliacion/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    conciliacion.value = res.data
  } catch (error) {
    console.error('Error al cargar detalle:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.font-inter-tight { font-family: 'Inter Tight', sans-serif; }
</style>