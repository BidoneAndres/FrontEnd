<script setup>
import { ref, onMounted } from 'vue'
import { getChoferes } from '../services/general'

const choferes = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getChoferes();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    choferes.value = res.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="py-20">
    <div class="max-w-5xl mx-auto px-4">

      <!-- Título -->
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 leading-tight">
        Choferes registrados
      </h1>

      <!-- Loading -->
      <p v-if="loading" class="text-gray-400">Cargando ...</p>

      <!-- Lista -->
      <div v-else class="mt-10 grid grid-cols-3 gap-4">
        <div v-for="c in choferes" :key="c.id" class="bg-white p-8 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-800 tracking-tight leading-snug">
            {{ c.nombre + " " + c.apellido }}
          </h2>


          <p class="text-base text-gray-700 leading-relaxed ">
            DNI: {{ c.documento }}
          </p>
        </div>
      </div>

      <!-- Descripción -->
      <p class="text-base text-gray-700 leading-relaxed mt-12">
        Estos son todos los choferes que se cargaron extraidos de todas las ordenes creadas mediante archivo provisto
        por SAP
      </p>

    </div>
  </section>
</template>
