import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './assets/tailwind.css'
import './assets/customStyles.css'


createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
