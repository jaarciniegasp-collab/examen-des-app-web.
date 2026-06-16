<template>
  <ProductCardComponent :categoriaFiltro="categoria" />
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue'

export default {
  name: 'CategoryView',
  components: { ProductCardComponent },
  computed: {
    categoria() {
      // el parámetro de ruta se llama "categoria"
      return this.$route.params.categoria || ''
    }
  }
}
</script>