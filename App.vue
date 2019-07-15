<script>
	import util from 'utils/util.js'
	import api from 'utils/api.js'
	export default {
		onLaunch: function () {
			console.log('App Launch')
			 uni.login({
				success: function (res) {
				  console.log(res);
				  if (res.code) {
					let data = {
					  code: res.code,
					  from: 3
					}
					api.getOpenId({
					  data
					}).then((res) => {
					  if (res.code == 200 || res.code == 0) {
						uni.setStorageSync('open_id', res.data.openid)
					  } else {
						util.errorTips(res.msg)
					  }
					}).catch((res) => {
					  util.errorTips(res.msg)
					})
				  }
				}
			  });
		},
		onLoad() {
			
		},
		mounted() {
			
		},
		onShow: function () {
			this.initSocket();
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			initSocket() {
			let that = this
			if (JSON.stringify(that.globalData.localSocket) != '{}') {
				console.log('连接已存在!!!')
				that.globalData.localSocket.close()
			}
			let userId = wx.getStorageSync("userId");
			that.globalData.localSocket = wx.connectSocket({
				//此处 url 可以用来测试 // im.yidap.com webapi.yidapi.com.cn
				url: `wss://webapi.yidapi.com.cn/notice/socket?userId=${userId}&openType=sms`
			})
			//版本库需要在 1.7.0 以上
			that.globalData.localSocket.onOpen(function (res) {
				console.log('WebSocket连接已打开！readyState=' + that.globalData.localSocket.readyState)
				that.start()
				that.globalData.connectTime = 3000
			})
			that.globalData.localSocket.onError(function (res) {
				console.log('WebSocket连接出错readyState=' + that.globalData.localSocket.readyState)
				that.reconnect()
				that.globalData.connectTime = that.globalData.connectTime * 2
			})
			that.globalData.localSocket.onClose(function (res) {
				console.log('WebSocket连接已关闭！readyState=' + that.globalData.localSocket.readyState)
			})
			that.globalData.localSocket.onMessage(function (res) {
				// 用于在其他页面监听 websocket 返回的消息
				let result = JSON.parse(res.data);
				console.log('收到消息', result)
				if (!result.length && !result.currentPage) {
					if (result.fromUserId != 0) {
						let message = { id: result.id, fromUserId: 0, toUserId: result.fromUserId, messageId: result.messageId, content: 'page', smsType: 'TEXT', sysType: 1, smsStatus: 40, smsList: false, currentPage: '', pageSize: '' }

						that.sendSocketMessage(JSON.stringify(message))
						console.log('通知对方已经收到消息！！！')
					}
				}
				that.globalData.callback(result)
				that.reset()
			})
		},

		
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/base.scss";
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.scss";
	
</style>
