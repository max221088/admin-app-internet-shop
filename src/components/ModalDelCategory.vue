<template>
  <div class="modal fade" id="exampleModalDel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Chenge Category for Delete</h5>
        </div>
        <div class="modal-body">
          <select class="form-select" v-model="cat" >
            <option v-for="(item, index) in categories" 
            :key="index" :value="item.id" >{{ item.title }}</option>  
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" 
          @click="delCategory()" data-bs-dismiss="modal">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div> 
</template>
 
 
 
<script>
  export default {
    name: 'ModalDelCategory',
    props: ['categories'],
    data: function () {
      return {
        cat: ''
      }
    },
    methods: {
      delCategory () {
        this.$emit('delCat', this.cat)
      }
    }
  }
</script>