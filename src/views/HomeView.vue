<template>
  <div class="home">
    <ProductTable/>
  </div>
</template>

<script>
  import ProductTable from '@/components/ProductTable.vue'

  export default {
    name: 'HomeView',
    components: {
      ProductTable
    },
    created: function () {
      this.$store.dispatch('fetchProducts');
    }
  }
</script>
