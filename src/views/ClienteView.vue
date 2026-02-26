<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const clientes = ref([]);
const loading = ref(true);

// Modal y Formulario de Registro
const showModal = ref(false);
const isSaving = ref(false);
const nuevoCliente = ref({
  username: '',
  password: '',
  email: '',
  role: 'admin' // Valor por defecto según tu ejemplo
});

async function fetchClientes() {
  try {
    const token = localStorage.getItem('token')
    // Asumiendo que existe un endpoint para listar, si no, se puede ajustar
    const res = await axios.get('https://cernikiw3.chickenkiller.com/api/v1/cliente', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    clientes.value = res.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  } finally {
    loading.value = false;
  }
}

async function registrarCliente() {
  try {
    isSaving.value = true;
    const token = localStorage.getItem('token');

    // Mantenemos el formato exacto que usaste en Postman
    const payload = {
      username: nuevoCliente.value.username,
      password: nuevoCliente.value.password,
      email: nuevoCliente.value.email,
      role: nuevoCliente.value.role // "admin" tal cual está en tu imagen
    };

    console.log("Enviando a registrar:", payload);

    const res = await axios.post('https://cernikiw3.chickenkiller.com/api/v1/register', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Lo forzamos por si acaso
      }
    });

    console.log("Registro exitoso:", res.data);
    showModal.value = false;
    await fetchClientes();

  } catch (error) {
    // ESTO ES CLAVE: Mira la consola (F12) para ver qué dice el servidor
    if (error.response) {
      console.error("Detalles del error 500:", error.response.data);
      alert(`Error del servidor: ${error.response.data.message || 'Error Interno'}`);
    } else {
      console.error("Error de red o configuración:", error.message);
    }
  } finally {
    isSaving.value = false;
  }
}

onMounted(() => {
  fetchClientes();
});

function goToEdit(id) {
  console.log("Gestionando cliente ID:", id);
}
</script>

<template>
  <section class="py-24 bg-gray-50 min-h-screen font-inter relative">
    <div class="max-w-5xl mx-auto px-6">

      <div class="flex items-end justify-between">
        <div>
          <h1 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
            Usuarios
          </h1>
          <p class="text-gray-500 mt-2 text-lg">
            Administración de usuarios y cuentas de acceso.
          </p>
        </div>

        <button
          @click="showModal = true"
          class="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-900/10"
        >
          Nuevo Usuario +
        </button>
      </div>

      <div v-if="loading" class="mt-12 space-y-4">
        <div v-for="i in 3" :key="i" class="h-32 bg-gray-200 animate-pulse rounded-[2.5rem]"></div>
      </div>

      <div v-else class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="c in clientes" :key="c.id" @click="goToEdit(c.id)"
          class="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 hover:shadow-2xl hover:border-gray-900 transition-all duration-500 cursor-pointer flex flex-col justify-between">

          <div>
            <div class="flex justify-between items-start">
              <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full">
                {{ c.role || 'USUARIO' }}
              </span>
            </div>

            <h2 class="text-3xl font-inter-tight font-bold text-gray-900 tracking-tighter mt-6 group-hover:text-blue-600 transition-colors">
              {{ c.username }}
            </h2>
            <p class="text-gray-400 font-medium mt-1">{{ c.email }}</p>
          </div>

          <div class="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-gray-400 group-hover:text-gray-900 transition-colors">
            <span class="text-xs font-bold uppercase tracking-widest">Configurar perfil</span>
            <span class="transform group-hover:translate-x-2 transition-transform text-2xl">→</span>
          </div>
        </div>
      </div>

      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
        <div class="bg-white w-full max-w-lg p-10 rounded-[3rem] shadow-2xl border border-gray-100 animate-scale-up max-h-[90vh] overflow-y-auto">
          <h3 class="text-3xl font-bold text-gray-900 tracking-tighter mb-2">Registro de Cliente</h3>
          <p class="text-gray-500 text-sm mb-8 font-medium">Crea una nueva cuenta de acceso al sistema.</p>

          <div class="space-y-4">
            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Nombre de Usuario</label>
              <input
                v-model="nuevoCliente.username"
                type="text"
                placeholder="admin_empresa"
                class="w-full p-5 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-gray-900 transition-all font-bold text-gray-800"
              />
            </div>

            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Email Corporativo</label>
              <input
                v-model="nuevoCliente.email"
                type="email"
                placeholder="email@iua.edu.ar"
                class="w-full p-5 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-gray-900 transition-all font-bold text-gray-800"
              />
            </div>

            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Contraseña</label>
              <input
                v-model="nuevoCliente.password"
                type="password"
                placeholder="••••••••"
                class="w-full p-5 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-gray-900 transition-all font-bold text-gray-800"
              />
            </div>

            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 mb-2 block">Rol de Usuario</label>
              <select
                v-model="nuevoCliente.role"
                class="w-full p-5 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:border-gray-900 transition-all font-bold text-gray-800 appearance-none"
              >
                <option value="admin">ADMINISTRADOR</option>
                <option value="user">OPERADOR</option>
              </select>
            </div>

            <div class="flex gap-4 pt-6">
              <button
                @click="showModal = false"
                class="flex-1 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                @click="registrarCliente"
                :disabled="isSaving"
                class="flex-2 px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 transition-all shadow-lg"
              >
                {{ isSaving ? 'Registrando...' : 'Confirmar Acceso' }}
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

/* Estilo para el select para que coincida con los inputs */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 1.2rem;
}
</style>
