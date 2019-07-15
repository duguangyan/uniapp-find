import Vue from 'vue'
import App from './App'
// 生产环境的提示 开关
Vue.config.productionTip = false

Vue.prototype.socket = '';

Vue.prototype.globalData = {
					userInfo: null,
					addressIndex: 0,
					lockReconnect: false, // 是否真正建立连接
					timeoutObj: null, // 心跳心跳倒计时
					timeoutNum: null, // 断开 重连倒计时
					timeout: 30 * 1000, // 30秒一次心跳
					connectTime: 3000,
					localSocket: {},
					callback: function () { }
				};
				//统一发送消息，可以在其他页面调用此方法发送消息
		Vue.prototype.sendSocketMessage=function (msg) {
			let that = this
			return new Promise((resolve, reject) => {
				if (this.globalData.localSocket.readyState === 1) {
					console.log('发送消息', msg)
					this.globalData.localSocket.send({
						data: msg,
						success: function (res) {
							resolve(res)
						},
						fail: function (e) {
							reject(e)
						}
					})
				} else {
					that.reconnect()
				}
			})
		};
				
		Vue.prototype.reconnect = function () { // 3秒后重连
			let that = this;
			if (that.globalData.lockReconnect) {
				return false
			}
			that.globalData.lockReconnect = true
			that.globalData.timeoutNum && clearTimeout(that.globalData.timeoutNum)
			that.globalData.timeoutNum = setTimeout(() => {
				that.initSocket()
				that.globalData.lockReconnect = false
			}, that.globalData.connectTime)
		},
		
		Vue.prototype.reset = function () {
			clearTimeout(this.globalData.timeoutObj)
			this.start()
		};
		
		Vue.prototype.start = function () {
			let that = this;
			that.globalData.timeoutObj && clearTimeout(that.globalData.timeoutObj)
			that.globalData.timeoutObj = setTimeout(() => {
				if (that.globalData.localSocket.readyState == 1) {
					let message = { id: 0, fromUserId: 0, toUserId: 0, userInfoId: 0, content: 'ping', smsType: 'TEXT', sysType: 1, smsStatus: 10, smsList: false, currentPage: '', pageSize: '' }
					that.sendSocketMessage(JSON.stringify(message))
				} else {
					that.reconnect()
				}
			}, that.globalData.timeout)
		};


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
