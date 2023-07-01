<template>
  <div class="home">
    <ProductTable/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductTable from '@/components/ProductTable.vue'

export default {
  name: 'HomeView',
  components: {
    ProductTable
  },
  computed: {
    
  },
  created: function () {
    this.$store.dispatch('fetchProducts');
  }
}
</script>
