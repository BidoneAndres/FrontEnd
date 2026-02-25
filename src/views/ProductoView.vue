<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const productos = ref([]);
const loading = ref(true);


const showModal = ref(false);
const nuevoNombre = ref('');
const isSaving = ref(false);


async function fetchProductos() {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:8080/api/v1/producto', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    productos.value = res.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  } finally {
    loading.value = false;
  }
}

async function crearProducto() {
  if (!nuevoNombre.value.trim()) return;
  
  try {
    isSaving.value = true;
    const token = localStorage.getItem('token');


    await axios.post('http://localhost:8080/api/v1/producto', 
      { producto: nuevoNombre.value }, 
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

  
    nuevoNombre.value = '';
    showModal.value = false;
    await fetchProductos(); 
  } catch (error) {
    console.error('Error al crear producto:', error);
    alert('Error: No se pudo registrar el producto.');
  } finally {
    isSaving.value = false;
  }
}

onMounted(() => {
  fetchProductos();
});

function goToEdit(id) {
  // Aquí podrías navegar al detalle o edición si fuera necesario
  console.log("Navegando al producto ID:", id);
}
</script>

<template>
  <section class="py-24 bg-gray-50 min-h-screen font-inter relative">
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
        
        <button 
          @click="showModal = true"
          class="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-900/10"
        >
          Nuevo Producto +
        </button>
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

          <div class="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-gray-400 group-hover:text-gray-900 transition-colors">
            <span class="text-xs font-bold uppercase tracking-widest">Ver especificaciones</span>
            <span class="transform group-hover:translate-x-2 transition-transform text-2xl">→</span>
          </div>
        </div>
      </div>

      <div v-if="!loading && productos.length === 0" class="mt-20 text-center">
        <p class="text-gray-400 italic">No se encontraron productos registrados.</p>
      </div>

      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
        <div class="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl border border-gray-100 animate-scale-up">
          <h3 class="text-3xl font-bold text-gray-900 tracking-tighter mb-2">Nuevo Producto</h3>
          <p class="text-gray-500 text-sm mb-8 font-medium">Define el nombre del producto para el catálogo.</p>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="nuevoNombre"
                type="text" 
                placeholder="Ej: BUTANO BUTANIZADO"
                class="w-full p-6 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all font-bold text-gray-800 placeholder:text-gray-300"
                @keyup.enter="crearProducto"
                autofocus
              />
            </div>

            <div class="flex gap-4 pt-4">
              <button 
                @click="showModal = false"
                class="flex-1 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button 
                @click="crearProducto"
                :disabled="isSaving || !nuevoNombre.trim()"
                class="flex-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {{ isSaving ? 'Guardando...' : 'Confirmar Registro' }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.font-inter-tight { font-family: 'Inter Tight', sans-serif; }

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>