<template>
	<view>
		<view class="item">
		<view class="item-title">{{title}}</view>
		<text class="item-text" v-if="isShowText">1.0.0</text>
		<image class="item-arrow" src="/static/center/arrow.png" v-else></image>
	</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		
		props:{
			title: {
				type:String,
				default:""
			},
			isShowText:{
				type: Boolean,
				default: false
			}
		},
	}
</script>

<style lang="scss" scoped>
.item{
		background-color: white;
		height: 116upx;
		position: relative;
	}
	.item-title{
		font-size:32upx;
		color: #333333;
		font-size:32upx;
		position: absolute;
		top: 40upx;
		left: 40upx;
	}
	.item-arrow{
		position: absolute;
		top: 46upx;
		right: 25upx;
		width: 28upx;
		height:28upx;
	}
	.item-text{
		position: absolute;
		top: 46upx;
		right: 25upx;
		height:28upx;
	}
</style>
