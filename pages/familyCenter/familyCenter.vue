<template>
	<view class='family-center'>
		<view class='top'>
			<view class='head'>
				<image :src='avatarPath'></image>
				<text class='txt-1'>{{familyInfo.consignee}}</text>
				<text class='txt-2' @click='goFamilyExplain'>规则说明 ></text>
			</view>
			<view class='data flex'>
				<view class='flex-1' v-for="(item, index) in topData" :key="index" @click='goNextPage(index)'>
					<view class='t-1'>{{item.t}}</view>
					<view class='t-2'>{{item.n}}</view>
				</view>
			</view>
		</view>
		<view class='profit'>
			<view class='t'>当前推广收益</view>
			<view class='m'>{{profit}}</view>
		</view>
		<view class='profit-btn' bindtap='withdrawal'>
			<view>提现</view>
		</view>


		<view class='item'>
			<view class="navigator-box section-order"> 
			 <!-- open-type="share" -->
				<button class="navigator-text fs30 pdl-30" open-type="share" style="background-color:#fff;border:none;height:115rpx;line-height:115rpx;text-align:left;font-weight: 600;">
					立即 <text style='color:#FFA40A'>推广小鹿家人</text>
					<text class="fs24 text-666 mgr-30 flr" style='font-weight: 500;'>注册小鹿家人，增添更大收益</text>
				</button>
				<view class="navigator-arrow"></view>
			</view>
		</view>

		<view class='item'>
			<view class="navigator-box section-order">
				<button class="navigator-text fs30 pdl-30" @click='call' style="background-color:#fff;border:none;height:115rpx;line-height:115rpx;text-align:left;">
					客服
					<text class="fs24 text-666 mgr-30 flr">如有疑问，请联系客服</text>
				</button>
				<view class="navigator-arrow"></view>
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
				avatar_path: 'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png',
				topData: [{
						t: '累计客户',
						n: '0'
					},
					{
						t: '累计订单',
						n: '0'
					},
					{
						t: '累计收益(元)',
						n: '0'
					},
				],
				profit: 0,
				familyInfo:'',
				avatarPath:''
			}
		},
		onLoad() {

		},
		onShow() {
			this.getInviteCode();
			this.$data.avatarPath = uni.getStorageSync('avatarPath');
		},
		methods: {
			/**
			 * 拨打电话
			 */
			call() {
				uni.makePhoneCall({
					phoneNumber: '400-8088-156'
				})
			},
			/**
			 * 去 0：推广客户 1：推广订单
			 */
			goNextPage(i) {
				let index = i;
				if (index == 0) {
					uni.navigateTo({
						url: '../listCustomer/listCustomer',
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '../listOrder/listOrder',
					})
				}
			},
			/**
			 * 去规则说明
			 */
			goFamilyExplain() {
				wx.navigateTo({
					url: '../familyExplain/familyExplain?goBack=1&familyStatus=' + this.$data.familyInfo.status
				})
			},
			/**
			 * 获取小鹿家人状态
			 */
			getInviteCode() {
				api.getInviteCode({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						let topData = this.$data.topData;
						topData[0].n = res.data.total || 0;
						topData[1].n = res.data.total_order || 0;
						topData[2].n = res.data.total_amount || 0;

						this.$data.familyInfo = res.data;
						this.$data.profit     = res.data.now_amount;
						this.$data.topData    = topData;
						
					}
				})
			},
			share(){
				let _this = this;
				uni.share({
					provider: 'weixin',
					type: 5,
					imageUrl: 'https://static.yidap.com/miniapp/o2o/imgs/ic_launcher.png',
					title: '众皮联小鹿快找',
					miniProgram: {
							id: 'gh_abcdefg',
							path: '/pages/index/index?invite_code=' + _this.$data.familyInfo.code,
							type: 0,
							webUrl: 'http://m.yidap.com'
					},
					success: ret => {
							console.log(JSON.stringify(ret));
					}
			});	
			
			}
			
			
		},
		onShareAppMessage: function() {
			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var onShareAppMessage = {
				title: "众皮联小鹿快找", // 默认是小程序的名称(可以写slogan等)
				path: '/pages/index/index?invite_code=' + that.$data.familyInfo.code,
				// 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: 'https://static.yidap.com/miniapp/o2o/imgs/ic_launcher.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
				success: (res) => {
					// 转发成功之后的回调
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: () => {
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						// 转发失败，其中 detail message 为详细失败信息
					}
				},
				complete: () => {
					// 转发结束之后的回调（转发成不成功都会执行）
				}

			}
			return onShareAppMessage;
		}
	}
</script>

<style lang="scss" scoped>
	.family-center {
		background: #fff;
		padding-top: 20rpx;
	}

	.family-center .top {
		width: 710rpx;
		height: 360rpx;
		background: linear-gradient(90deg, rgba(242, 152, 0, 1) 0%, rgba(255, 102, 0, 1) 100%);
		border-radius: 8rpx;
		margin: 0 20rpx 20rpx 20rpx;
	}

	.family-center .top .head image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin: 40rpx;
	}

	.family-center .top .head .txt-1 {
		font-size: 32rpx;
		color: rgba(255, 255, 255, 1);
		line-height: 44rpx;
		position: relative;
		top: -80rpx;
	}

	.family-center .top .head .txt-2 {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
		line-height: 34rpx;
		float: right;
		position: relative;
		top: 80rpx;
		right: 30rpx;
	}

	.family-center .top .data {
		text-align: center;
	}

	.family-center .top .data .t-1 {
		color: #fff;
		font-size: 24rpx;
	}

	.family-center .top .data .t-2 {
		color: #fff;
		font-size: 40rpx;
		margin-top: 20rpx;
	}

	.family-center .profit {
		text-align: center;
		height: 194rpx;
		border-top: 20rpx solid #eee;
	}

	.family-center .profit .t {
		font-size: 24rpx;
		margin-top: 30rpx;
	}

	.family-center .profit .m {
		font-size: 38rpx;
		color: #F29800;
		margin-top: 20rpx;
	}

	.family-center .profit-btn {
		height: 138rpx;
		border-top: 1rpx solid #eee;
	}

	.family-center .profit-btn view {
		width: 186rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #999;
		border-radius: 30rpx;
		font-size: 38rpx;
		color: #fff;
		text-align: center;
		margin: 0 auto;
		margin-top: 36rpx;
	}


	.navigator-arrow {
		padding-right: 60rpx;
	}

	.navigator-arrow:after {
		content: " ";
		display: inline-block;
		height: 13rpx;
		width: 13rpx;
		border-width: 2rpx 2rpx 0 0;
		border-color: #888888;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: absolute;
		top: 50%;
		margin-top: -6rpx;
		right: 28rpx;
	}

	.item {
		position: relative;
		border-top: 20rpx solid #eee;
	}

	button::after {
		border-radius: 0;
	}

	button {
		border-radius: 0;
	}
</style>
