<script>
	import util from 'utils/util.js'
	import api from 'utils/api.js'
	export default {
		onLaunch: function () {
			
			
			console.log('App Launch')
			// #ifdef  APP-PLUS
			// plus.screen.lockOrientation('portrait-primary'); //锁定竖屏正方向
			// #endif
			
			 // 版本更新
			if (uni.getUpdateManager) {

			  const updateManager = uni.getUpdateManager();
			  console.log('updata version', updateManager);

			  updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate)
			  })

			  updateManager.onUpdateReady(function () {
				uni.showModal({
				  title: '更新提示',
				  content: '新版本已经准备好，是否重启应用？',
				  success: function (res) {
					if (res.confirm) {
					  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					  updateManager.applyUpdate()
					}
				  }
				})

			  })
			}
			 
		},
		onLoad() {
			
		},
		mounted() {
			
		},
		onShow: function () {
			//this.initSocket();
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/base.scss";
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.scss";
	
</style>
