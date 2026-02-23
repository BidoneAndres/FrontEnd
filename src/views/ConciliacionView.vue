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
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    conciliaciones.value = res.data;
  } catch (error) {
    console.error('Error al obtener conciliaciones:', error);
  } finally {
    loading.value = false;
  }
});
function formatted(rawDate) {
  return new Date(rawDate).toLocaleString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
}

function goToDetail(id) {
  router.push({ name: 'conciliacion-detail', params: { id } })
}
</script>
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-5xl mx-auto px-6">

      <!-- Título -->
      <h1 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
        Conciliación de órdenes
      </h1>

      <!-- Loading -->
      <p v-if="loading" class="text-gray-500 mt-6 text-lg">
        Cargando conciliaciones...
      </p>

      <!-- Lista -->
      <div v-else class="mt-12 space-y-8">

        <div v-for="c in conciliaciones" :key="c.id" @click="goToDetail(c.id)"
          class="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300">

          <!-- Fecha -->
          <p class="text-sm text-gray-500 mb-1">
            Fecha de conciliación:
            <span class="font-medium text-gray-700">
              {{ formatted(c.orden.fechaPesajeFinal) }}
            </span>
          </p>

          <!-- Título + Estado -->
          <div class="flex items-center justify-between mt-1">

            <h2 class="text-3xl font-semibold text-gray-900 tracking-tight">
              Orden #{{ c.orden.numeroOrden }}
            </h2>

            <span
              class="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-200">
              {{ c.orden.estado }}
            </span>
          </div>

          <!-- Datos -->
          <div class="grid grid-cols-3 gap-6 mt-8">

            <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p class="text-sm text-gray-500">Peso inicial</p>
              <p class="text-xl font-semibold text-gray-800 mt-1">
                {{ c.pesoInicial }} kg
              </p>
            </div>

            <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p class="text-sm text-gray-500">Peso final</p>
              <p class="text-xl font-semibold text-gray-800 mt-1">
                {{ c.pesoFinal }} kg
              </p>
            </div>

            <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p class="text-sm text-gray-500">Producto cargado</p>
              <p class="text-xl font-semibold text-gray-800 mt-1">
                {{ c.productoCargado }}
              </p>
            </div>
          </div>

          <!-- Botón -->
          <button @click="goToDetail(c.id)"
            class="mt-8 w-full md:w-auto px-8 py-3 bg-gray-900 text-white text-base rounded-full font-semibold hover:bg-gray-800 transition">
            Ver más detalles
          </button>

        </div>
      </div>

      <!-- Descripción -->
      <p class="text-lg text-gray-600 leading-relaxed mt-16 text-center">
        Estas son órdenes cerradas (estado 4), con su conciliación final ya emitida.
      </p>

    </div>
  </section>

</template>
