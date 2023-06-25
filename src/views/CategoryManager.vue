<template>
<div class="container wrop-manager">
    <h3>Categories Manager</h3>
    <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModaAddNewCat" 
        type="submit">Add new Category</button>
    <div class="categories-table">
        <div class="row title-row">
            <div class="col-3 tab-title">
                <p>Name Category</p>
            </div>
            <div class="col-3 tab-title">
                <p>Products in category</p>
            </div>
            <div class="col-3 tab-title">
                <p>Add product to cetegory</p>
            </div>
            <div class="col-3 tab-title">
                <p>Delete Category</p>
            </div>
        </div>
        <div class="row mt-1" v-for="category, index in categories" :key="index">
            <div class="col-3">
                <p class="cat-name">{{ category.title }}</p>
            </div>
            <div class="col-3">
                <p>Products in category</p>
            </div>
            <div class="col-3">
                    <button  class="btn btn-primary mr-md-2" type="button" @click="selectedCat(index)"
                    data-bs-toggle="modal" data-bs-target="#exampleModaAddProd">Add product to category</button>
            </div>
            <div class="col-3">
                <button  class="btn btn-primary mr-md-2 btn-danger" type="button" 
                @click="getDelCat(index)"    data-bs-toggle="modal" data-bs-target="#exampleModaDelCat">Delete</button>
            </div>
        </div>
    </div>
    <ModalAddProductToCategory id="exampleModaAddProd" :cat="catId" ></ModalAddProductToCategory>
    <ModalConfirm id="exampleModaDelCat" :msg="'You want to remove THIS category?' " 
        :btnText="'Ok'" @DelProduct="delCategoryFromDB"></ModalConfirm>
    <ModalAddNewCategory id="exampleModaAddNewCat" @DelProduct="addCategory"></ModalAddNewCategory>
    <AlertWarning ref="warning"></AlertWarning>
</div>
</template>

<script>

// @ is an alias to /src
import ModalConfirm from '../components/ModalConfirm.vue'
import ModalAddProductToCategory from '../components/ModalAddProdToCategory.vue'
import ModalAddNewCategory from '../components/ModalAddNewCategory.vue'
import AlertWarning from '../components/AlertWarning.vue'

export default {
  name: 'CategoryManager',
  components: {
    ModalConfirm,
    ModalAddProductToCategory,
    ModalAddNewCategory,
    AlertWarning
  },
  data: function () {
     return {
      catId: '',
      delCat: '',
      delCatProducts: []
     }
   },
  methods: {
    getDelCat(index) {
        this.delCat = this.categories[index].id;
    },
    selectedCat(index) {
        this.catId = this.categories[index].id
    },
    delCategoryFromDB () {
        for (let i = 0; i < this.products.length; i++) {
            if ((this.products[i].category.indexOf(this.delCat)) != -1) {
                let index = this.products[i].category.indexOf(this.delCat);
                this.products[i].category.splice(index, 1)
                this.delCatProducts.push(this.products[i])
            }
        }
        this.$store.dispatch('deleteCategoryInDB', this.delCat)
        this.$store.dispatch('updateCategoryInProducts', this.delCatProducts);
        this.$store.dispatch('fetchCategories');
        this.delCatProducts = [];
        this.delCat = []
    },
    addCategory (data) {
        if (data) {
            let newCat = {
            id: 'cat-' + Date.now().toString(),
            title: data.toLowerCase()
        } 
        this.$store.dispatch('addCategoryToDB', newCat)    
        console.log(newCat)
        } else {
            this.$refs.warning.show()
        }
        this.$store.dispatch('fetchCategories')
    }
  },
  computed: {
    products () {
         return this.$store.getters['getProductsFromDB'];
     },
    categories () {
        return this.$store.getters['getCategoriesFromDB'];
    }
  },
  created: function () {
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchProducts');
  }
}


</script>