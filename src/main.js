import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('bootstrap');
//require('jodit');
//var editor = Jodit.make('#editor');
//editor.value = '<p>start</p>';

createApp(App).use(store).use(router).mount('#app')
