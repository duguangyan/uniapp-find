<template>
	<view @click="tapClick">
		<view class="item">
		<view class="item-title">{{title}}</view>
		<view class="item-subTitle">{{subTitle}}</view>
		
		<text class="item-text" v-if="isShowText">{{showText}}</text>
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
		methods:{
			tapClick(){
				this.$emit('didClick')
			}
		},
		props:{
			title: {
				type:String,
				default:""
			},
			subTitle:{
				type:String,
				default:""
			},
			isShowText:{
				type:String,
				required:false
			},
			showText:{
				type:String,
				default:""
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
		color: #333333;
		font-size:32upx;
		position: absolute;
		top: 40upx;
		left: 40upx;
	}
	.item-subTitle{
		color: #999999;
		font-size:28upx;
		position: absolute;
		right: 88upx;
		top: 40upx;
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
