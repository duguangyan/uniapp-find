<template>
	<view class='family'>
		<!-- <image src='https://static.yidap.com/miniapp/o2o_find/index/xuzhi.png'></image> -->
		<view class='rich-text'>
			<rich-text :nodes="nodes"></rich-text>
		</view>

		<view class='check' @click='doCheck' v-if="!isFamily">
			<text v-if="!isCheck" class='iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb'></text>
			<text v-if="isCheck" class='iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-yellow'></text>
			已阅读,并同意
		</view>
		<view v-if="isCheck" class='register' @click='register'>{{isFamily?'立即推广':'一键注册'}}</view>
		<view v-if="!isCheck" class='register eb' @click='register'>{{isFamily?'立即推广':'一键注册'}}</view>
		<view class="height100">
			
		</view>
	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				isCheck: false,
				isFamily: false,
				nodes: '',
				goBack: 0
			};
		},
		onLoad(options) {
			if (options.familyStatus == 1) {
				this.$data.isFamily = true;
				this.$data.isCheck  = true;
				if (options.goBack == 1) {
					this.$data.goBack = 1
				}
			}
			console.log(this.$data.isFamily);
			
			
		},
		onShow() {
			this.getInviteCode();
		},
		methods: {
			/**
			 * 是否同意
			 */
			doCheck() {
				this.$data.isCheck = !this.$data.isCheck
			},
			/**
			 * 注册或分享
			 */
			register() {
				// console.log('注册');
				if (this.$data.isFamily) {
					if (this.$data.goBack == 1) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.navigateTo({
							url: '../familyCenter/familyCenter',
						})
					}

				} else {
					if (this.$data.isCheck) {
						uni.navigateTo({
							url: '../family/family',
						})
					} else {
						util.successTips('请阅读同意说明');
					}
				}

			},
			/**
			 * 获取用户小路人家信息
			 */
			getInviteCode() {
				api.getInviteCode({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.nodes = res.data.text
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.height100{
		height: 100upx;
	}
	.rich-text {
		padding: 20rpx 40rpx;
		font-size: 28upx;
	}

	.family {
		width: 100%;
		height: 100%;
	}

	.family image {
		width: 100%;
		height: 1900rpx;
	}

	.register {
		width: 630rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #F29800;
		border-radius: 10rpx;
		color: #fff;
		font-size: 32rpx;
		margin: 040rpx auto;
	}

	.eb {
		background: #999;
	}

	.check {
		text-align: center;
	}

	.check .iconfont {
		position: relative;
		top: 2rpx;
		left: -10rpx;
	}
</style>
