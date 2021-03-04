import Vue from 'vue';
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js'
import './ui.js'
Vue.config.productionTip = false;
Vue.use(ElementUI);
var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


