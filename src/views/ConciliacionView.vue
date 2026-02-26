<script setup>
import { ref, onMounted } from 'vue'
import { getConciliaciones } from '../services/conciliacion'
import { useRouter } from 'vue-router'

const router = useRouter()
const conciliaciones = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getConciliaciones();
   
    console.log('Datos de conciliaciones:', res.data);
    conciliaciones.value = res.data;
  } catch (error) {
    console.error('Error al obtener conciliaciones:', error);
  } finally {
    loading.value = false;
  }
});

function formatted(rawDate) {
  if (!rawDate) return "Fecha no registrada";
  return new Date(rawDate).toLocaleString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
}

function goToDetail(numeroOrden) {
  console.log("Valor que estoy enviando al detail:", numeroOrden)
  router.push({ name: 'conciliacion-detail', params: { id: numeroOrden } })
}
function getOrderNumber(c) {
  return c.orden?.numeroOrden || c.orden?.id || c.id || 'S/N';
}
</script>

<template>
  <section class="py-24 bg-gray-50 min-h-screen font-inter">
    <div class="max-w-5xl mx-auto px-6">

      <h1 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
        Conciliación de órdenes
      </h1>

      <p v-if="loading" class="text-gray-500 mt-6 text-lg animate-pulse">
        Cargando conciliaciones...
      </p>

      <div v-else class="mt-12 space-y-8">

        <div v-for="c in conciliaciones" :key="c.id" @click="goToDetail(c.orden?.id)"
          class="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 hover:shadow-2xl hover:border-gray-900 transition-all duration-500 cursor-pointer">

          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Finalizado el: 
            <span class="text-gray-900 ml-1">
              {{ formatted(c.orden?.fechaPesajeFinal) }}
            </span>
          </p>

          <div class="flex items-center justify-between mt-1">
            <h2 class="text-4xl font-inter-tight font-bold text-gray-900 tracking-tighter">
              Orden #{{ getOrderNumber(c) }}
            </h2>

            <span
              class="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-black text-green-600 border border-green-100 uppercase tracking-tighter">
              {{ c.orden?.estado?.split('_').pop() || 'FINALIZADA' }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:bg-white transition-colors">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Peso inicial</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ c.pesoInicial }} <span class="text-sm font-medium">kg</span>
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:bg-white transition-colors">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Peso final</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ c.pesoFinal }} <span class="text-sm font-medium">kg</span>
              </p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:bg-white transition-colors">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Neto cargado</p>
              <p class="text-2xl font-bold text-blue-600 mt-1">
                {{ c.netoCargado || (c.pesoFinal - c.pesoInicial) }} <span class="text-sm font-medium">kg</span>
              </p>
            </div>
          </div>

          <div class="mt-8 flex items-center text-gray-900 font-bold text-sm uppercase tracking-widest">
            Ver Detalle
            <span class="ml-2 transform group-hover:translate-x-2 transition-transform text-lg">→</span>
          </div>

        </div>
      </div>

      <p class="text-sm text-gray-400 font-medium mt-16 text-center uppercase tracking-widest">
        Sistema de conciliación automática • Estado 4
      </p>

    </div>
  </section>
</template>