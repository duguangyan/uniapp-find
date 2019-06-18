<template>
	<view class="index">
		<view class="center-top">
			<view class="title">个人中心</view>
			<image class="icon" src="../../../static/footer_icon/2.1.png" mode=""></image>
			<view class="name">Eric</view>
			<image class="setting" src="" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	
	.center-top{
		width: 100%;
		height: 400upx;
		background-color: #F29800;
		
		.title{
			// background-color: pink;
			padding-top: 68upx;
			color: white;
			font-size: 36upx;
			line-height:16px;
			font-family:PingFangSC-Medium;
		};
		.icon{
			background-color: pink;
			height: 120upx;
			width: 120upx;
			float: left;
			margin-left: 30upx;
			margin-top: 58upx;
			border-radius: 50%;
		};
		.setting{
			background-color: pink;
			float: right;
			text-align:center;
			margin-right:38upx;
			width: 48upx;
			height: 48upx;
		};
		.name{
			color: white;
			font-size: 32upx;
			float: left;
			margin-top: 52upx;
			margin-left: 48upx;
		}
	};
	
	
	
</style>
