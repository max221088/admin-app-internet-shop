<template>
    <div class="modal fade" id="exampleModalAddPrice" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Enter New Unit and Price</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
             </div>
             <div class="modal-body">
                <div class="mb-3">
                    <input v-model="unit" class="form-control form-control-sm" type="text" placeholder="Enter Unit" >
                </div>
                <input v-model="value" class="form-control form-control-sm" type="text" placeholder="Enter Value" >
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
               <button type="button" class="btn btn-primary" 
                 @click="AddPrice()" data-bs-dismiss="modal">Add</button>
             </div>
           </div>
       </div>
     </div> 
 </template>
 
 
 
 <script>
 export default {
   name: 'ModalAddPrice',
   props: ['categories'],
   data: function () {
     return {
       unit: '',
       value: ''
     }
   },
   methods: {
     AddPrice () {
        if (this.unit.length) {
            this.$emit('AddPrice', this.unit, this.value)
            
        } else {
            console.log(2)
        }
        this.unit = '';
        this.value = '';
       //this.$emit('AddPrice', this.cat)
     }
   }
 }
 </script>