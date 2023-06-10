<template>
    <div id="app">
        <jodit-editor v-model="content" />
    </div>
</template>

<script>
//import 'jodit/build/jodit.min.css'
import { JoditEditor } from 'jodit-vue'

export default {
    name: 'TextEditor',

    components: { JoditEditor },

    data () {
        return {
            content: '<h1>Hello Jodit Vue</h1>'
        }
    }
}
</script>