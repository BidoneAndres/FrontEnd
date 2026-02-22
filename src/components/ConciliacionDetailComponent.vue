<template>
  <section class="py-20">
    <div class="max-w-5xl mx-auto px-6">

      <button class="mb-8 text-blue-600 hover:underline" @click="$router.back()">
        ← Volver
      </button>


      <div v-if="loading" class="text-gray-400 text-lg">Cargando orden...</div>

      <div v-else class="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 space-y-10">
        <h1 class="text-4xl font-bold mb-8 font-inter-tight">
          Conciliación de la orden #{{ conciliacion.orden.numeroOrden }}
        </h1>

        <!-- DATOS DE LA ORDEN -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Transición de estados</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">Recepción</p>
              <p class="text-gray-800">{{ formatDate(conciliacion.orden.fechaRecepcionOrden) }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-green-600/90 uppercase mb-1">Pesaje inicial</p>
              <p class="text-gray-800">{{ formatDate(conciliacion.orden.fechaPesajeInicial) }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-amber-600/90 uppercase mb-1">Inicio de carga</p>
              <p class="text-gray-800">{{ formatDate(conciliacion.orden.fechaInicioCarga) }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-red-600/90 uppercase mb-1">Fin de carga</p>
              <p class="text-gray-800">{{ formatDate(conciliacion.orden.fechaFinCarga) }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl col-span-2">
              <p class="text-xs font-semibold text-blue-600/90 uppercase mb-1">Conciliación</p>
              <p class="text-gray-800">{{ formatDate(conciliacion.orden.fechaPesajeFinal) }}</p>
            </div>
          </div>


        </div>

        <!-- NÚMEROS GRANDES -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Resumen de carga</h2>

          <div class="grid grid-cols-3 gap-6">

            <!-- KPI -->
            <div class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p class="text-5xl font-extrabold text-gray-900">
                {{ conciliacion.pesoInicial }}
              </p>
              <p class="text-sm text-gray-600 mt-2">Peso inicial (kg)</p>
            </div>

            <div class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p class="text-5xl font-extrabold text-gray-900">
                {{ conciliacion.pesoFinal }}
              </p>
              <p class="text-sm text-gray-600 mt-2">Peso final (kg)</p>
            </div>

            <div class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p class="text-5xl font-extrabold text-gray-900">
                {{ round2(conciliacion.diferenciaBalanzaCaudalimetro) }}
              </p>
              <p class="text-sm text-gray-600 mt-2">Diferencia balanza</p>
            </div>


            <div class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p class="text-5xl font-extrabold text-gray-900">
                {{ round2(conciliacion.netoPorBalanza) }}
              </p>
              <p class="text-sm text-gray-600 mt-2">Neto por balanza (kg)</p>
            </div>


            <div class="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <p class="text-5xl font-extrabold text-gray-900">
                {{ round2(conciliacion.productoCargado) }}
              </p>
              <p class="text-sm text-gray-600 mt-2">Producto cargado (kg)</p>
            </div>

          </div>
        </div>

        <!-- PROMEDIOS -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Promedios registrados</h2>

          <div class="grid grid-cols-3 gap-6">

            <div class="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200 text-center">
              <p class="text-5xl font-extrabold text-blue-900">
                {{ round2(conciliacion.promedioCaudal) }}
              </p>
              <p class="text-sm text-blue-700 mt-2">Caudal (prom.)</p>
            </div>

            <div class="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200 text-center">
              <p class="text-5xl font-extrabold text-green-900">
                {{ round2(conciliacion.promedioDensidad) }}
              </p>
              <p class="text-sm text-green-700 mt-2">Densidad (prom.)</p>
            </div>

            <div class="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200 text-center">
              <p class="text-5xl font-extrabold text-red-900">
                {{ round2(conciliacion.promedioTemperatura) }}
              </p>
              <p class="text-sm text-red-700 mt-2">Temperatura (prom.)</p>
            </div>

          </div>
        </div>

        <!-- DETALLE DE LA ORDEN -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Detalle de la orden</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">Producto cargado</p>
              <p class="text-gray-800">{{ conciliacion.orden.producto.producto }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">Cliente</p>
              <p class="text-gray-800">{{ conciliacion.orden.cliente.razonSocial }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">Patente del camion</p>
              <p class="text-gray-800">{{ conciliacion.orden.camion.patente }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">DNI del chofer</p>
              <p class="text-gray-800">{{ conciliacion.orden.chofer.documento }}</p>
            </div>

            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">Codigo externo de la orden</p>
              <p class="text-gray-800">{{ conciliacion.orden.codExt }}</p>
            </div>


            <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl ">
              <p class="text-xs font-semibold text-gray-600/90 uppercase mb-1">Clave de activacion</p>
              <p class="text-gray-800">{{ conciliacion.orden.claveActivacion }}</p>
            </div>
          </div>


        </div>

      </div>

    </div>
  </section>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getConciliacionesDetail } from '@/services/conciliacion'
const route = useRoute()
const conciliacion = ref(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id

  const res = await getConciliacionesDetail(id)
  console.log('====================================');
  console.log(res);
  console.log('====================================');
  conciliacion.value = await res.data
  loading.value = false
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false
  })
}
function round2(value) {
  return Number(value).toFixed(2)
}

</script>
