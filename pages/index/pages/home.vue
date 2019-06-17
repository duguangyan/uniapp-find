<template>
	<view class="index">
		<!-- #ifdef H5 -->
		<wxTitle :headTitle="title" :isArrow="isArrow"></wxTitle>
		<!-- #endif -->
		<view class="index-top-warp">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in bannerImgs" :key="index">
								<view class="swiper-item">
									<image :src="item"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="nav">
				<view class='text-1'>小鹿家人</view>
				<view class='text-2'>注册小鹿家人，增添更大收益</view>
				<view class='go-in' v-if="familyStatus == 0" @click='goIn'>一键注册</view>
				<view class='go-in' v-if="familyStatus == 1" @click='goIn'>立即推广</view>
				<view class='go-in' v-if="familyStatus == 2 || familyStatus == 3" @click='goIn'>{{status_label}}</view>
			</view>
		</view>

		<view class="index-content-warp">
			<view class="title">
				<image :src="'https://static.yidap.com/miniapp/o2o_find/index/index_icon_4.png'"></image>
			</view>
			<view class="flex fs30 text-center">
				<view class="flex-1">提供服务<text class="text-yellow">{{serviceData.num_task||0}}</text>次</view>
				<view class="flex-1">提供服务<text class="text-yellow">{{serviceData.num_people||0}}</text>人</view>
			</view>

			<view class="flex nav">
				<view class="flex-1 item text-center" v-for="(item,index) in contentArr" :key="index">
					<image :src="item.img"></image>
					<view class="fs24 text-333 text">{{item.text}}</view>
				</view>
			</view>
		</view>

		<view class="service" @click="doContact">
			<image :src="'https://static.yidap.com/miniapp/o2o_find/index/index_icon_3.png'"></image>
			<text class="text-yellow">小鹿客服: </text>
			<text class="text-red mgl-10"> 400-8088-156</text>
		</view>
		<showModel v-if="isNodes" v-on:toDo="toDo">
			<rich-text :nodes="nodes"></rich-text>
		</showModel>

	</view>
</template>

<script>
	import api from '../../../utils/api.js';
	import showModel from '../../../components/pop-show-modal.vue';
	import wxTitle from "../../../components/wx-title.vue";
	export default {
		data() {
			return {
				familyStatus: 0,
				status_label: '',
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerImgs: ['https://static.yidap.com/miniapp/o2o_find/index/index_banner_1.png',
					'https://static.yidap.com/miniapp/o2o_find/index/index_banner_3.png',
					'https://static.yidap.com/miniapp/o2o_find/index/index_banner_2.png'
				],
				title: "小鹿快找",
				isArrow: false,
				navArr: [{
						img: "https://static.yidap.com/miniapp/o2o_find/index/index_nav_1.png",
						text: "立即找料"
					},
					{
						img: "https://static.yidap.com/miniapp/o2o_find/index/index_nav_2.png",
						text: "立刻取送"
					}
				],
				contentArr: [{
						img: "https://static.yidap.com/miniapp/o2o_find/index/index_icon_1.png",
						text: "数百名资深专业皮革辅料买手"
					},
					{
						img: "https://static.yidap.com/miniapp/o2o_find/index/index_icon_2.png",
						text: "3分钟响应、3小时反馈、8小时内找到"
					},
				],
				serviceData: "", // 服务人数 次数
				nodes: "", //公告
				isNodes: false, // 是否显示公告
			}
		},
		components: {
			showModel,
			wxTitle
		},
		onLoad() {

		},
		mounted() {
			// 设置服务人数
			this.getServiceData();
			// 获取小鹿家人状态
			this.getInviteCode();
			// 获取公告数据
			//this.mynotice();
		},
		methods: {
			// 联系客服
			doContact() {
				uni.makePhoneCall({
					phoneNumber: '400-8088-156'
				});
			},
			// index:1立即找料，2:立即取送
			goPageForIndex(index) {
				if (index == 0) {
					uni.navigateTo({
						url: "/pages/find/find"
					})
				} else {
					uni.navigateTo({
						url: "/pages/take/take"
					})
				}
			},
			// 设置服务人数 次数
			getServiceData() {
				api.serviceNum({}).then(res => {
					this.$data.serviceData = res.data;
				});
			},
			// 获取公告
			mynotice() {
				api.mynotice({}).then((res) => {
					console.log(res);
					this.$data.isNodes = true;
					this.$data.nodes = res.data.content.replace(/\<img/gi, '<img class="rich-img" ');
				})
			},
			// 关闭公告栏
			toDo() {
				this.$data.isNodes = false;
			},
			/**
			 * 获取小鹿家人状态
			 */
			getInviteCode() {
				api.getInviteCode({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.mynotice();
						if (res.data.status > 0) {
							this.setData({
								familyStatus: res.data.status,
								status_label: res.data.status_label
							})
						} else {
							this.setData({
								familyStatus: res.data.status
							})
						}

					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		.service {
			line-height: 140upx;
			text-align: center;
			font-size: 26upx;

			image {
				width: 50upx;
				height: 50upx;
				position: relative;
				top: 16upx;
			}

		}

		.index-content-warp {
			width: 710upx;
			height: 490upx;
			border-radius: 20upx;
			margin: 20upx;
			box-shadow: 0px 0px 20px -6px rgba(102, 102, 102, 0.5);

			.title {
				image {
					width: 710upx;
					height: 80upx;
					margin: 50upx 0;
				}
			}

			.nav {
				position: relative;
				top: 50upx;

				image {
					width: 100upx;
					height: 100upx;
				}

				.text {
					width: 220upx;
					display: block;
					margin: 0 auto;
				}
			}
		}

		.index-top-warp {
			height: 500upx;
			width: 710upx;
			margin: 20upx;
			border-radius: 20upx;
			overflow: hidden;
			box-shadow: 0px 4px 12px -6px rgba(102, 102, 102, 0.5);

			swiper {
				height: 360upx
			}

			swiper-item {
				height: 360upx //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
			}

			.swiper-item {
				image {
					width: 100%;
					height: 360upx;
				}
			}

			.nav {
				padding: 0 40upx;
				text-align: left;
				&:after {
					content: "";
					height: 100upx;
					width: 1upx;
					background: #fff;
					display: inline-block;
					position: absolute;
					top: 50upx;
					left: 355upx;
					z-index: 9999;
				}

				height: 200upx;

				image {
					width: 100upx;
					height: 100upx;
				}

				position: relative;

				.item {
					text-align: center;
				}


			}
		}
	}

	.index .index-top-warp .nav .go-in {
		position: absolute;
		right: 40rpx;
		width: 180rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		font-size: 32rpx;
		background: #fff;
		color: rgba(242, 152, 0, 1);
		top: 10rpx;
		border-radius: 40rpx;
		border: 2rpx solid rgba(242, 152, 0, 1);
	}

	.index .index-top-warp .nav .line {
		height: 100rpx;
		width: 2rpx;
		background: #fff;
		display: inline-block;
		position: absolute;
		top: 50rpx;
		left: 355rpx;
		z-index: 9;
	}

	.index .index-top-warp .nav .item {
		text-align: center;
		position: relative;
	}

	.index .index-top-warp .nav .text-1 {
		font-size: 32rpx;
		margin-top: 30rpx;
		margin-left: 90rpx;
		color: rgba(242, 152, 0, 1);
	}

	.index .index-top-warp .nav .text-2 {
		font-size: 24rpx;
		color: #999;
	}

	.index .index-top-warp .nav .item .text-fff {
		width: 212rpx;
		text-align: center;
		margin: 0 auto;
		display: block;

	}
</style>
