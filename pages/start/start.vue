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
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			goNextPage(index){
				// uni.navigateTo({
				// 	url:'../login/login?from=' + index
				// })
				uni.navigateTo({
					url:'../index/index?menuFrom=' + index
				})
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
