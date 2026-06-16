<template>
  <div class="container-fluid py-4">
    <ProductCardComponent />
  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    ProductCardComponent
  }
}
</script>