import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import "toastr/build/toastr.min.css";

createApp(App).use(router)
  .use(ElementPlus)
  .use(CKEditor)
  .mount('#app')
