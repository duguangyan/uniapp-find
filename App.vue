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
					//发起网络请求
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
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/base.scss";
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.scss";
	
</style>
