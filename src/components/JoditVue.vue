<template>
  <div id="app">
    {{ content }}
      <jodit-editor v-model="content" :buttons="buttons"/>
  </div>
</template>

<script>

import '../../node_modules/jodit-vue/node_modules/jodit/build/jodit.min.css'
import { JoditEditor } from 'jodit-vue'

export default {
  name: 'app',
  props: {
    id: String,
  },
  components: { JoditEditor },

  data () {
      return {
          content: '',
          buttons: [ 'bold', 'underline', 'italic', 'ul', 'ol', 'link', 'undo', 'redo']
      }
  },
  computed: {
    // content () {
    //         return this.$store.getters['getProductDescription'];
    //     },
  },
  created: function () {
        if (this.id != 'new') {
            //this.content = this.$store.getters['getProductDescription'];
            //this.content = editProduct.description
            console.log(1)
        }
    },
}
</script>