<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld :products="productsRender"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  computed: {
    productsRender () {
        return this.$store.getters['getProductsFromDB'];
    },
  },
  created: function () {
    this.$store.dispatch('fetchProducts');
    this.$store.dispatch('fetchCategories');
  }
}
</script>
