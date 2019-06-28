import Vue from 'vue'
import Vuex from 'vuex'
import footer_store from "./modules/footer_store.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading:false,
		base_url:"https://cnodejs.org/api/v1",
		list:[],
		detail:'',
		fromRest:0,
		token:'',
		userInfo:'',
		defultAddress:"",
		addressList:"",
		keyword:'',
		isPhoneX: false,
		isAndroid: false,
		nickName:'',
	},
	mutations: {
		
		switch_loading(state,tf){
			if(tf){
				if(tf=="true"){
					state.loading = true;
				}else{
					state.loading = false;
				}
			}else{
				state.loading = !state.loading
			}
		},
		update_list(state,data){
			state.list = data
		},
		update_detail(state,data){
			state.detail = data
		},
		changeReset(state,payload) {
			if(payload.hasOwnProperty('number')){
				state.fromRest = payload.number
            }
		 
		},
		setToken(state,payload){
			if(payload.hasOwnProperty('number')){
				state.token = payload.token
			}
		},
		setUserInfo(state,payload){
			if(payload.hasOwnProperty('userInfo')){
				state.userInfo = payload.userInfo
			}
		},
		setDefultAddress(state,payload){
			if(payload.hasOwnProperty('defultAddress')){
				state.defultAddress = payload.defultAddress
			}
		},
		setAddressList(state,payload){
			if(payload.hasOwnProperty('addressList')){
				state.addressList = payload.addressList
			}
		},
		setKeyword(state,payload){
			if(payload.hasOwnProperty('keyword')){
				state.keyword = payload.keyword
			}
		},
		setPhoneX(state,payload){
			if(payload.hasOwnProperty('isPhoneX')){
				state.isPhoneX = payload.isPhoneX
			}
		},
		setAndroid(state,payload){
			if(payload.hasOwnProperty('isAndroid')){
				state.isAndroid = payload.isAndroid
			}
		},
		updateNickName(state,payload){
			console.log(payload)
			state.nickName = payload
		}
		
	},
	actions: {
		
	},
	modules:{
		footer_store
	}
})

export default store
