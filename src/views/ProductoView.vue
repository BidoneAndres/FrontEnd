<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const productos = ref([]);
const loading = ref(true);

// Función para obtener productos directamente del endpoint
async function fetchProductos() {
  try {
    const token = localStorage.getItem('token') // Asumiendo que usas JWT como en el monitor
    const res = await axios.get('http://localhost:8080/api/v1/producto', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('Datos de productos:', res.data);
    productos.value = res.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProductos();
});

function goToEdit(id) {
  // Por si luego quieres editarlos o ver stock
  // router.push({ name: 'producto-detail', params: { id } })
  console.log("Navegando al producto:", id);
}
</script>

<template>
  <section class="py-24 bg-gray-50 min-h-screen font-inter">
    <div class="max-w-5xl mx-auto px-6">

      <div class="flex items-end justify-between">
        <div>
          <h1 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
            Productos
          </h1>
          <p class="text-gray-500 mt-2 text-lg">
            Gestión de catálogo y materias primas.
          </p>
        </div>

      </div>

      <div v-if="loading" class="mt-12 space-y-4">
        <div v-for="i in 3" :key="i" class="h-32 bg-gray-200 animate-pulse rounded-[2.5rem]"></div>
      </div>

      <div v-else class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div v-for="p in productos" :key="p.id" @click="goToEdit(p.id)"
          class="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 hover:shadow-2xl hover:border-gray-900 transition-all duration-500 cursor-pointer flex flex-col justify-between">
          
          <div>
            <div class="flex justify-between items-start">
              <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full">
                ID #{{ p.id }}
              </span>
            </div>

            <h2 class="text-3xl font-inter-tight font-bold text-gray-900 tracking-tighter mt-6 group-hover:text-blue-600 transition-colors">
              {{ p.producto }}
            </h2>
          </div>

        </div>
      </div>

      <div v-if="!loading && productos.length === 0" class="mt-20 text-center">
        <p class="text-gray-400 italic">No se encontraron productos registrados.</p>
      </div>

      <p class="text-sm text-gray-400 font-medium mt-16 text-center uppercase tracking-widest">
      </p>

    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Animación de entrada suave */
.grid > div {
  animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>