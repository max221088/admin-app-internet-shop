<template>
    <div class="modal fade" id="exampleModalDelPrice" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Select Unit for Delete</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
             </div>
             <div class="modal-body">
                <select class="form-select" v-model="unit" >
                 <option v-for="(item, index) in prices" 
                 :key="index" :value="item.unit" >{{ item.unit }}</option>  
               </select>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
               <button type="button" class="btn btn-primary" 
                 @click="DelPrice()" data-bs-dismiss="modal">Delete</button>
             </div>
           </div>
       </div>
     </div> 
 </template>
 
 
 
 <script>
 export default {
   name: 'ModalDelPrice',
   props: ['prices'],
   data: function () {
     return {
       unit: '',
       
     }
   },
   methods: {
     DelPrice () {
        if (this.unit.length) {
            this.$emit('DelPrice', this.unit)
        }
        this.unit = '';
     }
   }
 }
 </script>