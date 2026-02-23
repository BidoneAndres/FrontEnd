<script setup>
import { ref, onMounted } from 'vue'
import { getProductos } from '../services/general'
import EntitieComponent from '@/components/EntitieComponent.vue';

const productos = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getProductos();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    productos.value = res.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>

  <EntitieComponent title="Productos cargados" description="  Estos son todos los productos que se cargaron extraidos de todas las ordenes creadas mediante archivo provisto
        por SAP" :items="productos" :loading="loading" :displayField="'producto'" :itemLabel="productos" />



</template>
