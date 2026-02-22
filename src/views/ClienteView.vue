<script setup>
import { ref, onMounted } from 'vue'
import { getClientes } from '../services/general'
import EntitieComponent from '@/components/EntitieComponent.vue';

const clientes = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getClientes();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    clientes.value = res.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>

  <EntitieComponent title="Clientes cargados" description="  Estos son todos los clientes que se cargaron extraidos de todas las ordenes creadas mediante archivo provisto
        por SAP" :items="clientes" :loading="loading" :displayField="'razonSocial'" :subtitleField="'email'"
    :itemLabel="clientes" />



</template>
