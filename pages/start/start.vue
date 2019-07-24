<template>
	<view class="start">
		<view class="logo">
			<img src="../../static/icon/logo.png">
		</view>
		<view class="btn" v-for="(item, index) in btnText" :key="index" @click="goNextPage(index)">
			{{item}}
			<text class="iconfont icon-jiantou1"></text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				btnText:['我要找料','我是找料员','我是配送员','小鹿家人']
			};
		},
		onLoad(options) {
			if(options.menuFrom){
				
				let access_token = uni.getStorageSync('access_token');
				let token        = uni.getStorageSync('token');
				let v            = uni.getStorageSync('v');
				let user_name    = uni.getStorageSync('user_name');
				let userInfo     = uni.getStorageSync('userInfo');
				
				uni.clearStorageSync();
				
				uni.setStorageSync('access_token',access_token);
				uni.setStorageSync('token',       token);
				uni.setStorageSync('userType',options.menuFrom);
				uni.setStorageSync('v',v);
				uni.setStorageSync('user_name',user_name);
				uni.setStorageSync('userInfo',userInfo);
				if(options.menuFrom == 0){
					uni.reLaunch({
						url: '../index/index?menuFrom=' + 0 +'&from=0'
					})
				}else if(options.menuFrom == 1){
					uni.setStorageSync('isExamine1',1);
					uni.reLaunch({
						url: '../index/index?menuFrom=' + 1 +'&from=0'
					})
				}else if(options.menuFrom == 2){
					uni.setStorageSync('isExamine2',1);
					uni.reLaunch({
						url: '../index/index?menuFrom=' + 2 +'&from=0'
					})
				}else if(options.menuFrom == 3){
					uni.reLaunch({
						url: '../index/index?menuFrom=' + 3 +'&from=0'
					})
				}
			}
		},
		onShow() {
			let userType = uni.getStorageSync('userType');
			console.log(userType);
			if(userType === 0 || userType === 1 || userType === 2 || userType === 3) {
				uni.reLaunch({
					url: '../index/index?menuFrom=' + userType +'&from=0'
				})
			}
		},
		methods:{
			goNextPage(index){
				uni.setStorageSync('userType',index); // 用户类型
				this.$store.commit('change_page',0);   // 第一个页面
				uni.navigateTo({
					url:'../login/login?from=' + index
				})
				// uni.navigateTo({
				// 	url:'../index/index?menuFrom=' + index
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.start{
		.btn{
			height: 120upx;
			width: 420upx;
			text-align: center;
			line-height: 120upx;
			color: #fff;
			font-size: 44upx;
			margin: 0 auto;
			background: #FFA40A;
			border-radius:12upx;
			margin-top: 40upx;
			position: relative;
			.icon-jiantou1{
				font-size: 70upx;
				position: absolute;
				top: 0upx;
				right: 20upx;
			}
		}
		.logo{
			text-align: center;
			margin: 50upx 0;

			image{
				width: 240upx;
				height: 240upx;	
			}
		}
		
	}
</style>
