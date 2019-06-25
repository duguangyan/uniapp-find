<template>
	<view>
		<view class="item">
			<image class="icon" src="/static/icon/add-find.png"></image>
			<image class="icon-small" src="/static/center/camera.png" v-if="showCamera"></image>
			<text>{{subTitle}}</text>
			<image class="arrow" src="/static/center/arrow.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			subTitle:String,
			showCamera:false
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		background-color: white;
		height: 180upx;
		position: relative;
		.icon{
			position: absolute;
			top: 28upx;
			left: 40upx;
			height: 120upx;
			width: 120upx;
		}
		.icon-small{
			position: absolute;
			top: 114upx;
			left: 124upx;
			height: 44upx;
			width: 44upx;
		}
		text{
			color: #999999;
			font-size:28upx;
			position: absolute;
			right: 88upx;
			top: 76upx;
		}
		.arrow{
			position: absolute;
			right: 20upx;
			top: 76upx;
			height: 28upx;
			width: 28upx;
		}
	}
	
</style>
