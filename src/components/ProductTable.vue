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
      <th scope="col">Price</th>
      <th scope="col">Unit</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
    <tr>
      <th scope="col">
        <select v-model="sortParam" @change="selelectedSort" class="form-select form-select-sm">
          <option selected value="1">min to max</option>
          <option value="2">max to min</option>
        </select>
      </th>
      <th scope="col"></th>
      <th scope="col">
        <input v-model="queryTitle" @input="filteredProducts"
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
        <input v-model="queryDescr" @input="filteredProducts"
        class="form-control form-control-sm" 
        type="text" placeholder="Description Search">
      </th>
      <th scope="col">
        <select v-model="sortParam" @change="selelectedSort" 
        class="form-select form-select-sm" aria-label=".form-select-sm пример">
          <option selected value="3">min to max</option>
          <option value="4">max to min</option>
        </select>
      </th>
      <th scope="col">
      </th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item, index in productsRender" :key="index">
      <th scope="row">{{ item.order }}</th>
      <td><img class="avatar" :src="item.avatar" ></td>
      <td>{{ item.title }}</td>
      <!-- <td>{{ getCatName(item.category) }}</td> -->
      <td><span v-for="id, index in item.category" :key="index" class="up-cap">{{ catName(id) + ' ' }}</span></td>
      <td>{{ item.short }}</td>
      <td>{{ item.price.value }}</td>
      <td class="up-case">{{ item.price.unit }}</td>
      <td><router-link :to="{name: 'EditProduct' , 
        params:{id:item.id}}" ><span class="btn btn-success">Edit</span></router-link></td>
      <td data-bs-toggle="modal" data-bs-target="#exampleModalConfirm"><span 
        :data-id="item.id" :data-name="item.title"  @click="getDataForDel($event, index)" 
        class="btn btn-danger" >Delete</span></td>
    </tr>
  </tbody>
</table>
<ModalConfirm id="exampleModalConfirm" :msg="'Delete product '+delProd+' ?' " 
:btnText="'Delete'" @DelProduct="delProduct"></ModalConfirm>
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
      index: '',
      selectedCategory: 'All',
      sortParam: '1',
      searchProduct: [],
      queryTitle: '',
      queryDescr: ''
    }
  },
  methods: {
    catName (id) {
      for (let i = 0; i < this.getCategories.length; i++) {
        if (this.getCategories[i].id === id) {
          return this.getCategories[i].title
        }
      }
    },
    getDataForDel (event, index) {
      this.delProd = event.target.getAttribute('data-name');
      this.delId = event.target.getAttribute('data-id');
      this.index = index
    },
    delProduct () {
      let img = [];
      if (this.productsRender[this.index].avatar) {
        img.push(this.productsRender[this.index].avatar);
      }
      for (let i = 0; i < this.productsRender[this.index].gallery.length; i++) {
        img.push(this.productsRender[this.index].gallery[i])
      }
      if (img.length) {
        this.$store.dispatch('delImg', img);
      }
      this.$store.dispatch('deleteProductInDB', this.delId);
      this.delProd = '';
      this.delId = '';
      this.index = '';
      this.$store.dispatch('fetchProducts')
    },
    filteredProducts( ) {
      let prod = [];
      prod = (this.selectedCategory || this.queryTitle.length || this.queryDescr.length)
      ? this.searchProduct.filter(product => {
          return ((this.selectedCategory.length) 
        ? product.category.some(category =>{
          return ((category.indexOf(this.selectedCategory) != (-1)) || this.selectedCategory === 'All')
          }) : true)
        &&  ((product.title) ? ~product.title.toLowerCase().indexOf(this.queryTitle.toLowerCase()) :true)
        &&  ((product.description) ? ~product.description.toLowerCase().indexOf(this.queryDescr.toLowerCase()) :true)
      })
      : this.searchProduct;
      this.$store.commit('ProductSearch', prod);
    },
      selelectedSort: function () {
        this.productsRender.sort(function (a, b) {
            if (this.sortParam == 1) {
                if (Number(a.order) > Number(b.order)) {
                    return 1;
                }
                if (Number(a.order) < Number(b.order)) {
                    return -1;
                }
            }
            if (this.sortParam == 2) {
                if (Number(a.order) < Number(b.order)) {
                    return 1;
                    }
                if (Number(a.order) > Number(b.order)) {
                    return -1;
                }
            }
            if (this.sortParam == 3) {
                if (Number(a.price.value) > Number(b.price.value)) {
                    return 1;
                }
                if (Number(a.price.value) < Number(b.price.value)) {
                    return -1;
                }
            }
            if (this.sortParam == 4) {
                if (Number(a.price.value) < Number(b.price.value)) {
                    return 1;
                }
                if (Number(a.price.value) > Number(b.price.value)) {
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
  },
    created () {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
    
  },
  beforeUpdate () {
    this.searchProduct = this.$store.getters['getProductsForSearch'];
  }

 }
</script>


