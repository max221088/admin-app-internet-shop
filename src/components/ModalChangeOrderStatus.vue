<template>
  <div class="modal fade" id="exampleModalStatusOrder" tabindex="-1" 
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Chenge Status</h5>
        </div>
        <div class="modal-body">
          <select class="form-select chenge-status" v-model="status" >
            <option value="new">New</option>
            <option value="in work">In worK</option>
            <option value="sent">Sent</option>
            <option value="completed">Completed</option>  
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" 
          @click="changeStatus()" data-bs-dismiss="modal">Add</button>
        </div>
      </div>
    </div>
  </div> 
</template>
 
 
 
<script>
  export default {
    name: 'ModalCangeOrderStaus',
    props: [],
    data: function () {
      return {
        status: ''
      }
    },
    methods: {
      changeStatus () {
        this.$emit('changeStat', this.status)
        this.staus = ''
      }
    }
  }
</script>