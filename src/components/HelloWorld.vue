<template>
  <div class="container">
    <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Order</th>
      <th scope="col">Avatar</th>
      <th scope="col">Title</th>
      <th scope="col">Category</th>
      <th scope="col">Short Description</th>
      <th scope="col">Value</th>
      <th scope="col">Unit</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
    <tr>
      <th scope="col">
        <select class="form-select form-select-sm" aria-label=".form-select-sm пример">
          <option selected value="1">min to max</option>
          <option value="2">max to min</option>
        </select>
      </th>
      <th scope="col"></th>
      <th scope="col">
        <input class="form-control form-control-sm" 
        type="text" placeholder="Title Search">
      </th>
      <th scope="col">
        <select class="form-select form-select-sm" v-model="CatSelect" >
          <option v-for="(item, index) in getCategories" 
          :key="index" :value="item.id" >{{ item.title }}</option>  
        </select>
      </th>
      <th scope="col">
        <input class="form-control form-control-sm" 
        type="text" placeholder="Description Search">
      </th>
      <th scope="col">
        <select class="form-select form-select-sm" aria-label=".form-select-sm пример">
          <option selected value="1">min to max</option>
          <option value="2">max to min</option>
        </select>
      </th>
      <th scope="col">
        <select class="form-select form-select-sm" v-model="UnitSelect" >
          <option v-for="(item, index) in CatProduct" 
          :key="index" :value="item" >{{ item }}</option>  
        </select>
      </th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item, index in products" :key="index">
      <th scope="row">{{ item.order }}</th>
      <td><img class="avatar" :src="item.avatar" alt="..."></td>
      <td>{{ item.title }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.short }}</td>
      <td >{{ item.prices.uah.value }}</td>
      <td >{{ item.prices.uah.unit }}</td>
      <td><router-link :to="{name: 'EditProduct' , params:{id:item.id}}" >Edit</router-link></td>
      <td>Delete</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: [],
  data: () => {
    return {
      products: [],
      CatSelect: '',
      UnitSelect: '',
      AllUnit: [],
    }
  },
  computed: {
    productsRender () {
        return this.$store.getters['getProductsFromDB'];
    },
    getCategories () {
        return this.$store.getters['getCategoriesFromDB'];
    },
    CatProduct () {
      let unit = []
      this.products.forEach(function (el) {
        Object.values(el.prices).forEach(function (li) {
          if ((unit.indexOf(li.unit)) === -1) {
            unit.push(li.unit)
          }
        })
      })
      return unit
    },
  },
    created () {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
  },
  beforeUpdate () {
    this.products = this.$store.getters['getProductsFromDB']
  }

 }
</script>


