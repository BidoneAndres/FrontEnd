<script setup>
import { ref, onMounted } from 'vue'
import { getCamiones } from '../services/general'
import EntitieComponent from '@/components/EntitieComponent.vue';

const camiones = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getCamiones();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    camiones.value = res.data;
  } catch (error) {
    console.error('Error al obtener camiones:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>

  <EntitieComponent title="Camiones cargados" description="  Estos son todos los camiones que se cargaron extraidos de todas las ordenes creadas mediante archivo provisto
        por SAP" :items="camiones" :loading="loading" :subtitleField="'descripcion'" :displayField="'patente'"
    :itemLabel="clientes" />



</template>
