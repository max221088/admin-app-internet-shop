<template>
    <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
            {{ mess }}
        </div>
        <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
</template>

<script>
 export default {
   name: 'AlertWarning',
   props: ['mess'],
   data: function () {
     return {
       
     }
   },
   methods: {
     
   }
 }
 </script>