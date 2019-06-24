<template>
	<view>
		<view class='task-success'>
			<view class='task-success-top'>
				<image src='../../static/icon/task_success.png'></image>
				<view class='task-success-msg'>
					<view class='fs48'>支付成功</view>
					<view class='fs24'>{{pay_log.updated_at}}</view>
				</view>
			</view>
			<view class='border-b20'></view>

			<view class='lh90 border-bottom fs30'>
				<text class='pdl-30'>实付款： <text class='text-red'>￥{{pay_log.change_amount}}</text></text>
			</view>

			<view class='footer-btn'>
				<view class='text-333' @click='goIndex'>返回首页</view>
				<view class='text-666' @click='goFindOrderDetail'>查看订单</view>
			</view>
		</view>

	</view>
</template>

<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				pay_log: '',
				time: ''
			};
		},
		onLoad(options) {
			this.$data.pay_log = JSON.parse(options.pay_log);
			this.$data.pay_log.change_amount = util.formatMoney(this.$data.pay_log.change_amount);
			this.$data.time = util.getNowFormatDate();
		},
		onShow() {

		},
		methods: {
			/**
			 * 返回首页
			 */
			goIndex() {
				uni.reLaunch({
					url: '../index/index',
					success:function(){
						_this.$store.commit("change_page",0);
					}
				});
			},
			// 去订单详情
			goFindOrderDetail() {
				uni.reLaunch({
					url: '../index/index',
					success:function(){
						_this.$store.commit("change_page",1);
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.task-success image {
		display: inline-block;
		width: 100upx;
		height: 120upx;
		position: relative;
		top: 15upx;
		right: 5upx;
	}

	.task-success-msg {
		display: inline-block;
	}

	.task-success-top {
		margin: 80upx auto;
		width: 350upx;
	}

	.border-b20 {
		height: 20upx;
		background-color: #f4f4f4;
	}

	.footer-btn view {
		display: inline-block;
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		width: 320upx;
		text-align: center;
		border: 1upx solid #666;
		border-radius: 10upx;
		margin-left: 35upx;
		margin-top: 60upx;
	}
</style>
