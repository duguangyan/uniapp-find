<template>
	<view class="title cf">
		<view class="fll arrow" style="width: 100upx;height: 100%;"  @click="goBlack">
			<text class="arrow-left" v-if="isArrow"></text>
		</view>
		<view class="fll text">
			{{headTitle}}
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
			headTitle: {
				type:String,
				default:"众皮联商城"
			},
			isArrow:{
				type: Boolean,
				default: true
			}
		},
		methods:{
			goBlack(){
				this.$eventHub.$emit('goBlack',true);
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.title{
		width: 100%;
		height: 80upx;
		color: #333;
		line-height: 80upx;
		position: relative;
		background: #fff;
		top: 0;
		border-bottom: 1upx solid #eee; 
		z-index: 999998;
		overflow: hidden;
		.text{
			width: 100%;
			line-height: 80upx;
			text-align: center;
			position: absolute;
			left: 0;
			top: 0;
			font-size: 32upx;
		}
		.arrow{
			position: relative;
			z-index: 999999;
			.arrow-left{
				position: absolute;
				left: 40upx;
				top: 30upx;
			}
		}
	}
</style>
