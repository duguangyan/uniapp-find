<template>
	<view class="pop">
		<view class="bg" @click="hideBg"></view>
		<view class="con">
			<view class="tit">{{title}}</view>
		
			<view class="cf">
				<view class="fll" @click="doLeft">{{left}}</view>
				<view class="fll" @click="doRight">{{right}}</view>
			</view>
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
			title: {
				type:String,
				default:"请开通资金账户"
			},
			left:{
				type: String,
				default: "开通个人账户"
			},
			right:{
				type: String,
				default: "开通企业账户"
			}
		},
		methods:{
			doLeft(){
				//第一个参数名为调用的方法名，第二个参数为需要传递的参数
				this.$emit('doLeft'); 
				//console.log("left");
			},
			doRight(){
				this.$emit('doRight'); 
				//console.log("right");
			},
			hideBg(){
				this.$emit('hideBg'); 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;;
		left: 0;
		font-size: 28upx;
		z-index: 99999999;
		.bg{
			position: absolute;
			top: 0;left: 0;width: 100%;height: 100%;
			background: #000;
			opacity: .7;
		}
		.con{
			width: 500upx;
			height: 300upx;
			background: #fff;
			border-radius: 10upx; 
			position: absolute;
			z-index: 9999;
			left:125rpx;
			top:400rpx;
			overflow: hidden;
			text-align: center;
			.tit{
				height: 200upx;
				line-height: 200upx;
			}
			.fll{
				width: 249upx;
				border-top:1upx solid #eee; 
				line-height: 100upx;
				
			}
			.fll:last-child{
				border-left: 1upx solid #eee;
				background: #000;
				color: #fff;
			}
			.fll:first-child{
				border-right: 1upx solid #eee;
			}
		}
	}
</style>
