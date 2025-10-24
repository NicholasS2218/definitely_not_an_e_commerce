import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import Vueform from '@vueform/vueform'
import vueformConfig from '../../vueform.config'

createApp(App)
  .use(router)
  .use(Vueform, vueformConfig)
  .mount('#app')