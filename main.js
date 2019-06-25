import Vue from 'vue'
import App from './App'

// 生产环境的提示 开关
Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";

// 状态数据
Vue.prototype.$store = store;
Vue.prototype.$eventHub = new Vue();

App.mpType = 'app';
const app = new Vue({
    
	store,
	...App
})
app.$mount()
