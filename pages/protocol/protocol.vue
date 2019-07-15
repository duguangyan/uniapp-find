<template>
	<view>
		<view class='index-popup notes-popup' v-if="isNotes">
			<view class='index-popup-bg' @tap='hiddenNotes'></view>
			<view class='index-popup-content notes-btn-content'>
				<view class='index-popup-title'>协议 <text class='iconfont icon-del1' @tap='hiddenNotes'></text></view>
				<rich-text :nodes="protocol"></rich-text>
				<!-- <view class='index-popup-main bt-1'>
				  <view>一.  服务区域：</view>
				  <view class='fs24'>目前开放找料区域: <text class='text-red'>狮岭、白云</text>，更多开放区域敬请期待。</view>
				  <view>二.  服务项目：</view>
				  <view class='fs24'>1.现阶段只找皮革（含真皮、二层皮、PU、PVC)、皮具箱包产品纺织面料、皮具箱包产品辅料、五金等。</view>
				  <view>三．找料寄样说明</view>
				  <view class='fs24'>目前开放的找料寄样地址为 <text class='text-red'>狮岭和白云。</text></view>
				  <view class='fs24'>1.找料寄样地址选择</view>
				  <view class='fs24 pdl20'>寄样为PU、PVC、辅料、五金等，请寄狮岭。</view>
				  <view class='fs24 pdl20'>寄样为真皮、二层皮、纺织面料等，请寄白云。</view>
				  <view class='fs24'>2.无法判断寄样地址，可联系小鹿客服：
				  <text catchtap='contact' class='text-red'>400-8088-156</text>。
				  </view>
				  <view class='fs24'>3.找料寄样不支持到付，请客户自行承担寄样运费。</view>
				  <view class='fs24'></view>
				  <view>四．其他：</view>
				  <view class='fs24'>1.本服务平台不提供侵权产品的找料。</view>
				  <view class='fs24'>2.本服务平台不提供服务项目以外的产品找料。</view>
				  <view class='fs24'>3.由于市场及行业内因素，我们不承诺100%能找到您所需的物料，但我们会以100%的热情去找料。</view>
				</view> -->
				<!-- <view catchtap='checkIsResNotes' class='mgt-10' style='padding-left:200rpx;'>
					<text wx:if='{{isResNotes}}' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
					<text wx:if='{{!isResNotes}}' class="iconfont icon-yuan icon-yuan-1 fs40 pdl-10 text-eb"></text>
					<text style='color:999;padding-left:20rpx;'>已阅读，下次不再显示</text> 
				</view> -->
				<view class='index-popup-btn notes-btn'>
					<view class='text-red btn-shadow' @tap='hiddenNotes'>确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				isNotes: true,
				protocol: ''
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			// 动态获取须知
			if(uni.getStorageSync('protocol')){
				this.$data.protocol = uni.getStorageSync('protocol');
				uni.hideLoading();
			}else{
				api.needKnow({}).then((res) => {
					console.log(res);
					if (res.code == 200 || res.code == 0) {
						this.$data.protocol = res.data.protocol;
						uni.hideLoading();
						uni.setStorageSync('protocol',this.$data.protocol)
					}
				})
			}
			
		},
		methods:{
			// 显示找料须知
			// showNotes() {
			// 	this.$data.isNotes = true;
			// },
			// 隐藏找料须知
			hiddenNotes() {
				// this.$data.isNotes = false;
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

	.index-popup {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
	}

	.index-popup-bg {
		// width: 100%;
		// height: 100%;
		// background-color: #000;
		// opacity: .7;
		// position: absolute;
		// left: 0;
		// top: 0;
	}

	.index-popup-content {
		width: 700rpx;
		min-height: 330rpx;
		background-color: #fff;
		position: absolute;
		top: 20%;
		left: 25rpx;
		border-radius: 10rpx;
	}

	.index-popup-title {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 36rpx;
		text-align: center;
		position: relative;
	}

	.index-popup-main {
		font-size: 30rpx;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.index-popup-main .index-popup-view-1 {
		letter-spacing: 9px;
		line-height: 90rpx;
		height: 90rpx;
		float: left;
	}

	.index-popup-main input {
		display: inline-block;
		height: 68rpx;
		line-height: 68rpx;
		width: 80rpx;
		border: 1rpx solid #f4f4f4;
		border-radius: 10rpx;
		padding-left: 20rpx;
		margin: 0 20rpx;
		margin-top: 10rpx;
	}

	.index-popup-check {
		padding: 0 80rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}

	.index-popup-check view {
		display: inline-block;
		margin-left: 30rpx;
		font-size: 30rpx;
	}

	.index-popup-check view:first-child {
		margin-left: 0;
	}

	.notes-btn view {
		margin-left: 218rpx;
		background-color: #F29800;
		color: #fff;
	}

	.notes-btn-content {
		height: 96%;
		top: 2%;
		overflow-y: auto;
	}

	.index-popup-main view {
		line-height: 50rpx;
	}

	.icon-gantan1 {
		color: #F29800;
		position: relative;
		top: 2rpx;
		margin-right: 5rpx;
	}

	.icon-del1 {
		position: absolute;
		font-size: 50rpx;
		right: 10rpx;
		top: -15rpx;
		color: #999;
	}

	.index-popup-btn view {
		display: inline-block;
		width: 256rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		margin-top: 20rpx;
		border: 1rpx solid #F29800;
		border-radius: 10rpx;
	}

	.notes-btn {

		margin-bottom: 10rpx;
	}
</style>
