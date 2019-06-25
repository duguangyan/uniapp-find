<template>
	<view>
		<view class='gift-certificate'>

			<view v-for='(item, index) in lists' :key="index">
				<view class='flex pd-20 find' @click='goFind' :data-list="item" :data-msg='item.msg'>
					<view class='flex-4'>
						<view class='cf'> <text class='fll p1'>{{item.name}}</text>
							<text class='flr p2'>{{item.source_type==1?'系统赠送':'积分兑换'}}</text></view>
						<view class='p3'>说明: {{item.desc}}</view>
						<view class='p3'>有效日期: {{item.created_at}} 至 {{item.end_at}}</view>
					</view>
					<view class='flex-1'>
						<view>￥{{item.value}}</view>
						<view :class="item.msg=='已使用'?'curMsg':''">{{item.msg}}</view>
						<view class='i'></view>
						<view class='i'></view>
						<view class='i'></view>
					</view>
				</view>
			</view>



			<view class='loding pdb-30'>
				已经全部加载完毕
			</view>

		</view>
	</view>
</template>

<script>
	import api from "../../utils/api.js";
	import util from "../../utils/util.js";
	export default {
		data() {
			return {
				page: 1,
				lists: [],
				hasDate: true,
				from:''
			};
		},
		onLoad(options) {
			if (options.from == 'giftCertificate') {
				this.$data.from = options.from;
				this.$data.totalPrice = options.totalPrice;
			}
			this.getCoupon();
		},
		onShow() {

		},
		methods: {
			goFind(e) {
				let msg = e.currentTarget.dataset.msg;
				if (msg == '已使用') {
					util.errorTips('已使用')
				}
				if (msg == '已失效') {
					util.errorTips('已失效')
				}
				if (msg == '去使用') {
					let list = e.currentTarget.dataset.list;
					if (Math.ceil(list.value) > this.$data.totalPrice) {
						util.errorTips('支付金额小于优惠券金额');
						return false;
					}
					if (Math.ceil(list.full_sub) > this.$data.totalPrice) {
						util.errorTips('满￥' + list.full_sub + '使用');
						return false;
					}
					// 更新上一页的地址数据  来自找料任务页面
					// let pages = getCurrentPages();
					// let currPage = pages[pages.length - 1]; //当前页面
					// let prevPage = pages[pages.length - 2]; //上一个页面
					// prevPage.setData({
					// 	couponList: list,
					// 	couponListPrice: list.value,
					// 	couponId: list.id
					// })
					this.$eventHub.$emit('giftData', list);
					// 返回上一页
					uni.navigateBack({
						delta: 1
					})
				}

			},
			goGet(e) {
				let id = e.target.dataset.id;
				uni.navigateTo({
					url: '../material/material?giftCertificateId=' + id,
				})
			},
			/**
			 * 获取代金券列表
			 */
			getCoupon() {
				api.coupon({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						//this.data.totalPages = res.data.total;
						//this.data.lists = this.data.lists.concat(res.data.data);
						this.$data.lists = res.data;
						this.$data.lists.forEach((o, i) => {
							this.$data.lists[i].msg = '去使用'
						})
					} else {
						util.errorTips(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* pages/giftCertificate/giftCertificate.wxss */
	.curMsg {
		background-color: #999 !important;
	}

	.gift-certificate .flex {
		background-color: #fff;
		margin-top: 20rpx;
	}

	.gift-certificate .p1 {
		font-size: 32rpx;
		color: #6A6A6A;
	}

	.gift-certificate .p2 {
		font-size: 24rpx;
		color: #F0922C;
	}

	.gift-certificate .p3 {
		font-size: 24rpx;
		color: #6A6A6A;
	}

	.gift-certificate .flex-4 {
		width: 532rpx;

		border-radius: 20rpx;
		padding: 10rpx 20rpx;
		margin: 20rpx 0;
	}

	.gift-certificate .flex-1 {
		width: 138rpx;
		height: 166rpx;
		border-radius: 20rpx;
		padding: 10rpx 20rpx;
		margin: 20rpx 0;
		text-align: center;
		line-height: 69rpx;
		font-size: 28rpx;
		color: #F0922C;
		position: relative;
	}

	.gift-certificate .flex-1 view:nth-child(2) {
		font-size: 24rpx;
		width: 96rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: rgba(240, 146, 44, 1);
		border-radius: 18rpx;
		color: #fff;
		margin: 0 auto;
		margin-top: 10rpx;
	}

	.gift-certificate .flex-1 .i {
		position: absolute;
		height: 30rpx;
		width: 2rpx;
		top: .8rem;
		left: -0.02rem;
		background-color: #F0922C;
		z-index: 999;
	}

	.gift-certificate .flex-1 .i:nth-child(4) {
		top: 43%;
	}

	.gift-certificate .flex-1 .i:nth-child(5) {
		top: 70%;
	}

	.gift-certificate .find .flex-4,
	.gift-certificate .find .flex-1 {
		background-color: #FFEED6;
		color: #F0922C;
	}

	.gift-certificate .get .flex-4,
	.gift-certificate .get .flex-1 {
		background-color: #FFDFDA;
		color: #BA0519;
	}

	.gift-certificate .get .flex-1 view:nth-child(2) {
		background: #BA0519;
	}

	.gift-certificate .get .p2 {
		font-size: 24rpx;
		color: #BA0519;
	}

	.loding {
		text-align: center;
		color: #666;
		margin: 20rpx;
	}
</style>
