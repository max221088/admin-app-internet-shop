<template>
  <div class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Are you sure ?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          {{ msg }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" 
          @click="onConfirm()" data-bs-dismiss="modal">{{btnText}}</button>
        </div>
      </div>
    </div>
  </div> 
</template>
 
 
 
<script>
  export default {
    name: 'ModalConfirm',
    props: ['msg', 'btnText'],
    methods: {
      onConfirm () {
        this.$emit('confirm')
      }
    }
  }
</script>