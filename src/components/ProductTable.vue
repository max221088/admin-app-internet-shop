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
        <select v-model="SortParam" @change="selelectedSort" class="form-select form-select-sm">
          <option selected value="1">min to max</option>
          <option value="2">max to min</option>
        </select>
      </th>
      <th scope="col"></th>
      <th scope="col">
        <input v-model="QueryTitle" @input="filteredProducts"
        class="form-control form-control-sm" 
        type="text" placeholder="Title Search">
      </th>
      <th scope="col">
        <select class="form-select form-select-sm" 
        @change="filteredProducts" v-model="selectedCategory" >
        <option value="All" selected>All</option>
          <option v-for="(item, index) in getCategories" 
          :key="index" :value="item.id" >{{ item.title }}</option>  
        </select>
      
      </th>
      <th scope="col">
        <input v-model="QueryDescr" @input="filteredProducts"
        class="form-control form-control-sm" 
        type="text" placeholder="Description Search">
      </th>
      <th scope="col">
        <select v-model="SortParam" @change="selelectedSort" 
        class="form-select form-select-sm" aria-label=".form-select-sm пример">
          <option selected value="3">min to max</option>
          <option value="4">max to min</option>
        </select>
      </th>
      <th scope="col">
        <select class="form-select form-select-sm"  
        @change="filteredProducts" v-model="UnitSelect">
          <option v-for="(item, index) in CatProduct" 
          :key="index" :value="item" >{{ item }}</option>  
        </select>
      </th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item, index in productsRender" :key="index">
      <th scope="row">{{ item.order }}</th>
      <td><img class="avatar" :src="item.avatar" alt="..."></td>
      <td>{{ item.title }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.short }}</td>
      <td >{{ item.prices.uah.value }}</td>
      <td >{{ item.prices.uah.unit }}</td>
      <td><router-link :to="{name: 'EditProduct' , 
        params:{id:item.id}}" ><span class="btn btn-success">Edit</span></router-link></td>
      <td :data-id="item.id" :data-name="item.title" :data-index="index" @click="getDataForDel" 
      data-bs-toggle="modal" data-bs-target="#exampleModalConfirm"><span class="btn btn-danger" >Delete</span></td>
    </tr>
  </tbody>
</table>
<ModalConfirm id="exampleModalConfirm" :msg="'Delete product '+delProd+' ?' " 
:btnText="'Delete'" @DelProduct="DelProduct"></ModalConfirm>
  </div>
</template>

<script>
import ModalConfirm from './ModalConfirm.vue'

export default {
  name: 'HelloWorld',
  components: {
        ModalConfirm
    },
  props: [],
  data: () => {
    return {
      delProd: '',
      delId: '',
      selectedCategory: '',
      UnitSelect: 'UAH',
      AllUnit: [],
      SortParam: '1',
      SearchProduct: [],
      QueryTitle: '',
      QueryDescr: ''
    }
  },
  methods: {
    getDataForDel (event) {
      this.delProd = event.target.getAttribute('data-name');
      this.delId = event.target.getAttribute('data-id');
    },
    DelProduct () {
      this.$store.dispatch('deleteProductInDB', this.delId);
      this.delProd = '';
      this.delId = '';
      this.$store.dispatch('fetchProducts')
    },
    filteredProducts( ) {
      let prod = [];
      prod = (this.selectedCategory || this.QueryTitle.length || this.QueryDescr.length)
      ? this.SearchProduct.filter(product => {
          return ((this.selectedCategory.length) 
        ? product.category.some(category =>{
          return (this.selectedCategory.indexOf(category) != (-1) || this.selectedCategory === 'All')
          }) : true) 
        && ~product.title.toLowerCase().indexOf(this.QueryTitle.toLowerCase())
        && ~product.description.toLowerCase().indexOf(this.QueryDescr.toLowerCase())
      })
      : this.SearchProduct;
      this.products = prod
      this.$store.commit('ProductSearch', prod);
      console.log(prod)
      console.log(this.$store.getters['getProductsFromDB'])
      console.log(this.SearchProduct)
    },
      selelectedSort: function () {
        this.productsRender.sort(function (a, b) {
            if (this.SortParam == 1) {
                if (a.order > b.order) {
                    return 1;
                }
                if (a.order < b.order) {
                    return -1;
                }
            }
            if (this.SortParam == 2) {
                if (a.order < b.order) {
                    return 1;
                    }
                if (a.order > b.order) {
                    return -1;
                }
            }
            if (this.SortParam == 3) {
                if (a.prices.uah.value > b.prices.uah.value) {
                    return 1;
                }
                if (a.prices.uah.value < b.prices.uah.value) {
                    return -1;
                }
            }
            if (this.SortParam == 4) {
                if (a.prices.uah.value < b.prices.uah.value) {
                    return 1;
                }
                if (a.prices.uah.value > b.prices.uah.value) {
                    return -1;
                }
            }
            return 0;
        }.bind(this));
    },
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
      this.productsRender.forEach(function (el) {
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
    this.SearchProduct = this.$store.getters['getProductsForSearch'];
  }

 }
</script>


