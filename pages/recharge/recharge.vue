<template>
	<view>
		<view class="recharge  cf fs30">
			<view class='recharge-content'>
				<view class='item-1'>
					<view>{{index==1?'充值金额':'购买数量'}}</view>
				</view>
				<view class='cf item-2'>
					<text class='fll'></text>
					<input class='fll' type='digit' v-model='price' :placeholder="index==1?'请输入充值金额':'请输入购买数量'"></input>
				</view>


				<view class='cf item-2' v-if="index == 2">
					<text class='fll'>= ￥ {{price}} </text>
				</view>

				<view class='bz' v-if="index == 1">
					注：余额可用于购买鹿币,支付代采物料费用。
				</view>
				<view class='bz' v-if="index == 2 && first_recharge">
					注:
					<text>1、第一次鹿币购买须大于等于15</text>
					<view class='mgl-30'>2、鹿币可用于支付找料及取料订单</view>
				</view>
				<view class='bz' v-if="index == 2 && !first_recharge">
					注:
					<text>1、鹿币可用于支付找料及取料订单</text>
				</view>
				<view class='item-3'>支付方式 </view>
				<view class='item-4'>
					<view class='cf' @click="checkPayIndex(0)">
						<view class='fll'>
							<image class='wx' src='../../static/icon/wx.png'></image>
						</view>
						<view class='fll'>
							微信支付
						</view>
						<view class='flr item-4-wx' v-if="index == 2">
						<text v-if='payIndex == 0' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
						<text v-if='payIndex != 0' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
						</view>
					</view>
					<view class='cf' v-if="index == 2" @click="checkPayIndex(1)">
						<view class='fll'>
							<image class='wx' src='../../static/icon/icon-balance.png'></image>
						</view>
						<view class='fll'>
							余额支付
						</view>
						<view class='flr'>
						<text v-if='payIndex == 1' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
						<text v-if='payIndex != 1' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
						</view>
					</view>
				</view>
			</view>
			<view class='recharge-explain cf fs30' v-if="index == 1">
				<view style='padding-top: 30rpx;'>充值说明：</view>
				<view>
					1、账户充值仅限微信在线方式支付，目前暂不支持其它支付方式；
				</view>
				<view>
					2、账户充值成功后不支持退款且不可提现；
				</view>
				<view>
					3、账户余额仅限用于支付小鹿快找业务相关服务费用；
				</view>
				<view>
					4、账户余额仅限用于支付小鹿快找业务相关服务费用；
				</view>
				<view>
					5、如需咨询，可拨打客服热线<text class='text-red' @click='contact'>400-8088-156</text>。
				</view>
				<!-- <text class='position'></text> -->
			</view>


			<view class='recharge-explain cf fs30' v-if="index == 2">
				<view style='padding-top: 30rpx;'>购买说明：</view>
				<view>
					1、账户充值仅限微信在线方式支付，目前暂不支持其它支付方式；
				</view>
				<view>
					2、账户充值成功后不支持退款且不可提现；
				</view>
				<view>
					3、账户余额仅限用于支付小鹿快找业务相关服务费用；
				</view>
				<view>
					4、账户余额仅限用于支付小鹿快找业务相关服务费用；
				</view>
				<view>
					5、如需咨询，可拨打客服热线<text class='text-red' @click='contact'>400-8088-156</text>。
				</view>
				<!-- <text class='position'></text> -->
			</view>
			<view class='pay' @click='doPay'>立即支付</view>
			<view class='height40'></view>
		</view>
	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				price: '',
				navIndex: 0,
				index: 1,
				navArrText: ['充值VIP', "包月VIP"],
				navArrCheck: [{
						img: '',
						name: '微信支付'
					},
					{
						img: '',
						name: '支付宝'
					}
				],
				payIndex:0,
				first_recharge:false
			};
		},
		onLoad(options) {
			this.$data.index = options.index;
			// 获取充值列表
			this.getRechargeList();
			// 判断是否第一次充值
			if(this.$data.index == 2){  // 1 余额充值  2鹿币充值
				this.apiFirstRecharge();
			}
			
			
			
		},
		onShow() {
			if(uni.getStorageSync('open_id') == ''){
				this.getOpenId();
			}
		},
		methods: {
			// 判断是否第一次充值
			apiFirstRecharge(){
				let  asset_type =  this.$data.payIndex == 1?'balance':'virtual'
				api.apiFirstRecharge({
					data:{asset_type}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						if(res.data == 1){
							this.$data.first_recharge = true;
							this.$data.price = 15;
						}
						
					}
				})
			},
			checkPayIndex(i){
				this.$data.payIndex = i;
			},
			// 获取充值列表
			getRechargeList() {
				api.getRechargeList({}).then((res) => {
					console.log(res);
					if (res.code == 200) {
						let rechargeList = res.data.balance;
						let times = res.data.times;
						this.setData({
							rechargeList,
							times
						})
					}
				})
			},
			//  联系我们电话
			contact() {
				uni.makePhoneCall({
					phoneNumber: '400-8088-156'
				})
			},
			navCheck(e) {
				this.$data.navIndex= e.currentTarget.dataset.inx;
			},
			doInput(e) {
				this.$data.price = e.detail.value;
			},
			getOpenId(){
				
				uni.login({
					success: function (res) {
					  console.log(res);
					  if (res.code) {
						let data = {
						  code: res.code,
						  from: 3
						}
						api.getOpenId({
						  data
						}).then((res) => {
						  if (res.code == 200 || res.code == 0) {
							uni.setStorageSync('open_id', res.data.openid)
						  } else {
							util.errorTips(res.msg)
						  }
						}).catch((res) => {
						 // util.errorTips(res.msg)
						})
					  }
					}
				 });
			},
			// 去支付
			doPay(e) {
				if(this.$data.first_recharge && this.$data.price<15){
					util.errorTips("首次充值鹿币必须大于或等于15");
					return false;
				}
				if (!util.verificationAmount(this.$data.price)) {
					util.errorTips("请输入正确的金额");
					return false;
				}
				let value = this.$data.price;
				let payInfo = {
					open_id: uni.getStorageSync('open_id'),
					pay_type: 'wx',
					type: 'miniapp',
					total_fee: this.$data.price,
					package_id: 0
				};
				if (this.$data.index == 1) {
					api.wxPay({
						method: 'POST',
						data: payInfo
					}).then((res) => {
						console.log(res);
						if (res.code == 200 || res.code == 0) {
							let data = res.data.data;
							let change_amount = res.data.pay.change_amount;
							let time = res.data.pay.created_at;
							data.success = function(res) {
								uni.navigateTo({
									url: '../rechargeSuccess/rechargeSuccess?value=' + change_amount +'&time='+ time
								})
							}
							data.fail = function(res) {
								util.errorTips('支付失败')
							}
							uni.requestPayment(data);
						}else{
							util.errorTips(res.msg);
						}
					}).catch((res)=>{
						util.errorTips(res.msg);
					})
				} else {
					if(this.$data.payIndex == 1){
						payInfo.pay_type = "balance";
						payInfo.type = "balance";
					}
					
					api.apiVirtual({
						method: 'POST',
						data: payInfo
					}).then((res) => {
						console.log(res);
						if (res.code == 200 || res.code == 0) {
							if(this.$data.payIndex == 1){  // 余额支付
								let data = res.data.data;
								let change_amount = res.data.pay.change_amount;
								let time = res.data.pay.created_at;
								uni.navigateTo({
									url: '../rechargeSuccess/rechargeSuccess?value=' + change_amount +'&time='+ time
								})
							}else{
								let data = res.data.data;
								let change_amount = res.data.pay.change_amount;
								data.success = function(res) {
									
									uni.navigateTo({
										url: '../rechargeSuccess/rechargeSuccess?value=' + change_amount
									})
								}
								data.fail = function(res) {
									
									util.errorTips('支付失败')
								}
								uni.requestPayment(data);
							}
							
						}else{
							
							util.errorTips(res.msg);
						}
					}).catch((res)=>{
						
						util.errorTips(res.msg || res.message);
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.item-4-wx{
		position: relative;
		left: -38upx;
	}
	.lb{
		position: relative;
		// left: 38upx;
	}
	.navActive {
		color: #000;
	}

	.height40 {
		height: 40rpx;
	}

	.bz {
		color: #EF230C;
		font-size: 20rpx;
		margin-left: 30rpx;
		margin-top: 10rpx;
	}

	.navActive text {
		border-bottom: 8rpx solid #C81A29;
		padding-bottom: 10rpx;
	}

	.recharge-title {
		background-color: #fff;
	}

	.recharge-list-li {
		display: flex;
		width: 230rpx;
		height: 180rpx;
		border: 1rpx solid #c81a29;
		float: left;
		border-radius: 10rpx;
		margin-left: 12rpx;
		margin-top: 20rpx;
		background-color: #fff;
	}

	.recharge-list-text {
		justify-content: center;
		display: block;

		line-height: 64rpx;
		padding-left: 20rpx;
	}

	.recharge-explain {
		padding: 30rpx;
		font-size: 30rpx;
	}

	.recharge-explain view {
		line-height: 60rpx;
	}

	.recharge {}

	.position {
		display: block;
		height: 204rpx;
	}


	.recharge-content .fll {
		font-size: 28rpx;
		color: #555;
	}

	.recharge-content .flr {
		font-size: 24rpx;
		color: #999;
	}

	.recharge-content .item-1 {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		padding: 0 20rpx;
	}


	.recharge-content .item-2 {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		padding: 0 20rpx;
	}

	.recharge-content .item-2 text {
		font-size: 44rpx;
		color: #000;
	}

	.recharge-content .item-2 input {
		height: 60rpx;
		line-height: 60rpx;
		width: 600rpx;
		position: relative;
		top: 10rpx;
		left: 10rpx;
		font-size: 48rpx;
	}

	.recharge-content .item-3 {
		height: 100rpx;
		line-height: 120rpx;
		padding: 0 20rpx;
	}

	.recharge-content .item-4 {
		padding: 0 20rpx;
		background-color: #fff;
	}

	.recharge-content .item-4 .cf {
		height: 108rpx;
		line-height: 106rpx;

	}

	.wx {
		width: 60rpx;
		height: 60rpx;
		position: relative;
		top: 18rpx;
		margin-right: 20rpx;
	}

	.pay {
		width: 630rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #F29800;
		text-align: center;
		border-radius: 10rpx;
		color: #fff;
		margin: 0 auto;
		margin-bottom: 40rpx;
	}
</style>
