<template>
  <div class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Are you sure ?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <p>Enter Title for New Category</p>
          <input v-model="title" class="form-control form-control-sm" 
          type="text" placeholder="Category Title" >
        </div>
        <div class="modal-footer">
          <button @click="onClick" type="button" class="btn btn-secondary" 
          data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" 
          @click="delPrice()" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div> 
</template>
 
 
 
<script>
  export default {
    name: 'ModalConfirm',
    props: [],
    data: function () {
      return {
        title: ''
      }
    },
    methods: {
      onClick () {
        this.title = '';
      },
      delPrice () {
        this.$emit('addNewCat', this.title)
      }
    }
  }
</script>