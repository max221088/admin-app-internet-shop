<template>
  <div class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Change Product ?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body ">
        <div class="list-container">
          <ul>
            <li class="form-check list" v-for="prod, index in products" :key="index">
              <input @input="addProd(prod)" v-model="checkbox" class="form-check-input mr-3" type="checkbox" 
              :value="prod.id" :id="index">
              <label class="form-check-label" :for="index">
                <img class="avatar" :src="prod.avatar" >
                {{ prod.title }}
              </label>
            </li>
          </ul>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="onCancel" class="btn btn-secondary" 
          data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" 
          @click="addProductToCategory()" data-bs-dismiss="modal">Add</button>
        </div>
      </div>
    </div>
  </div> 
</template>
 
 
 
<script>
  export default {
    name: 'ModalAddNewCategory',
    props: ['cat'],
    data: function () {
      return {
        selectedProd: [],
        checkbox: []
      }
    },
    methods: {
      onCancel () {
        this.checkbox = [];
        this.selectedProd = [];
      },
      addProd (prod) {
        if (prod.category.indexOf(this.cat) === -1) {
          let index = this.selectedProd.indexOf(prod)
          if (index != -1 ) {
            this.selectedProd.splice(index, 1)
          } else {
            this.selectedProd.push(prod)
          }     
        }
      },
      addProductToCategory () {
        if (this.selectedProd.length) {
          for(let i = 0; i < this.selectedProd.length; i++) {
            this.selectedProd[i].category.push(this.cat)
          }
          console.log(this.selectedProd);
          this.$store.dispatch('updateCategoryInProducts', this.selectedProd);
          this.selectedProd = [];
          this.checkbox = [];
        }
      }
    },
    computed : {
      products () {
        return this.$store.getters['getProductsFromDB'];
      },
    },
    created () {
      this.$store.dispatch('fetchProducts')
    },
  }
</script>