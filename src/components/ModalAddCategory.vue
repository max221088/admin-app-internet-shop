<template>
  <div class="modal fade" id="exampleModalAdd" tabindex="-1" 
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Chenge Category for add</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <select class="form-select" v-model="cat" >
            <option v-for="(item, index) in categories" 
            :key="index" :value="item.id" >{{ item.title }}</option>  
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" 
          @click="addCategory()" data-bs-dismiss="modal">Add</button>
        </div>
      </div>
    </div>
  </div> 
</template>



<script>
  export default {
    name: 'ModalAddCategory',
    props: ['categories'],
    data: function () {
      return {
        cat: '01'
      }
    },
    methods: {
      addCategory () {
        this.$emit('addCat', this.cat)
      }
    }
  }
</script>