<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const chofer = ref([]);
const loading = ref(true);
async function fetchClientes() {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:8080/api/v1/chofer', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    chofer.value = res.data;
  } catch (error) {
    console.error('Error al obtener camiones:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchClientes();
});

</script>

<template>
  <section class="py-24 bg-gray-50 min-h-screen font-inter relative">
    <div class="max-w-5xl mx-auto px-6">

      <div class="flex items-end justify-between">
        <div>
          <h1 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
            Choferes
          </h1>
          <p class="text-gray-500 mt-2 text-lg">
            Visualización de choferes registrados
          </p>
        </div>
      </div>


      <div v-if="loading" class="mt-12 space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="h-32 bg-gray-200 animate-pulse rounded-[2.5rem]"
        ></div>
      </div>


      <div v-else class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="c in chofer"
          :key="c.id"
          class="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 hover:shadow-2xl hover:border-gray-900 transition-all duration-500 cursor-pointer flex flex-col justify-between"
        >
          <div>

            <span class="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] bg-green-50 px-3 py-1 rounded-full">
              CHOFER
            </span>

            <h2 class="text-3xl font-inter-tight font-bold text-gray-900 tracking-tighter mt-6 group-hover:text-green-600 transition-colors">
              {{ c.nombre }} {{ c.apellido }}
            </h2>

            <p class="text-gray-400 font-medium mt-2">
              Documento: {{ c.documento }}
            </p>

            <p class="text-gray-300 text-sm mt-1">
              ID: {{ c.id }}
            </p>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>
