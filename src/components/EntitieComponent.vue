<script setup>
defineProps({
  title: {
    type: String,
    default: 'Título del listado'
  },
  description: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  /** Campo del objeto que se mostrará */
  displayField: {
    type: String,
    required: true
  },
  subtitleField: {
    type: String,
    required: false
  },
  /** Texto del loader */
  itemLabel: {
    type: String,
    default: 'items'
  }
});
</script>
<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Título -->
      <h1 class="text-5xl font-inter-tight font-bold tracking-tight text-gray-900">
        {{ title }}
      </h1>

      <!-- Loading -->
      <p v-if="loading" class="text-gray-500 mt-4 text-lg">
        Cargando {{ itemLabel }}...
      </p>

      <!-- Lista -->
      <div v-else class="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in items" :key="item.id"
          class="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
          <h2 class="text-2xl font-semibold text-gray-900 tracking-tight">
            {{ item[displayField] }}
          </h2>

          <p v-if="subtitleField" class="mt-3 text-gray-600 text-lg leading-relaxed">
            {{ item[subtitleField] }}
          </p>
        </div>
      </div>

      <!-- Descripción -->
      <p class="text-lg text-gray-600 leading-relaxed mt-14 max-w-3xl">
        {{ description }}
      </p>

    </div>
  </section>

</template>
