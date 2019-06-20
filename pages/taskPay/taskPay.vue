<template>
	<view>
		<view class='task-warp'>
			<view>
				<view class='task-find box-shadow' v-if="finds.length>0">
					<view class='task-find-title fs30'>
						<text>找料任务</text>
					</view>
					<view class='task-find-list fs30' v-for='(item, index) in finds' :key='index'>
						<view class='task-find-item'>
							<view>物料品类：{{item.cname}}
								<text class='flr'>金额:￥{{item.fee}}</text>
							</view>
							<view>物料描述：{{item.desc}}</view>
							<view v-if='item.find_type==1'>找料方式：按图找料</view>
							<view v-if='item.find_type==2'>找料方式：按样找料</view>
							<view v-if='item.find_type==3'>找料方式：按描述找料</view>
							<image class='task-find-img' src='../../static/icon/task_find.png'></image>
						</view>
						<view class='task-find-method'>
							<view class='task-find-method-img' v-if='item.find_type==1'>
								<image @click="imgYu" v-for='(imgItem, imgIndex) in item.desc_img' :key='imgIndex' :src='imgItem'></image>
							</view>
							<view class='task-find-method-getfind' v-if='item.find_type==2'>
								<view>
									取样地址：
								</view>
								<view>
									<view class='fs24'>
										<view class='remark' v-if="item.address.remark && item.address.remark!=''">
											{{item.address.remark||''}}
										</view>
										{{item.address.city_str ||''}} {{item.address.address||''}} {{item.address.room||''}}
									</view>
									<view class='fs24' style='word-break:break-all;'>
										{{item.address.consignee || ''}} / {{item.address.mobile || ''}}
									</view>
									<view class='fs24 text-999' style='word-break:break-all;'>
										{{item.address.stall || ''}}
									</view>
								</view>
							</view>


							<view class='task-find-method-getfind' v-if='item.find_type==3'>
								<view>
									寄样地址：
								</view>
								<view>
									<view class='fs24 pdr-20' style='word-break:break-all;'>
										<text class='remark' v-if='item.address[0].tag'>{{companyaddress[0].tag||''}}</text>
										{{companyaddress[0].address||''}}
									</view>
									<view class='fs24 pdr-20' style='word-break:break-all;'>
										{{companyaddress[0].consignee||''}} / {{companyaddress[0].mobile||''}}
									</view>
									<view>...</view>
								</view>
							</view>

						</view>
					</view>
					<view class='task-find-sum lh90 fs30 bb-1'>
						<text>共{{finds.length}}个任务,小计：
							<text class='text-red'>￥{{findsTotalPrice}}</text>
						</text>
					</view>
				</view>

				<view class='task-get box-shadow' v-if='fetchs.length>0'>
					<view class='task-find-title fs30'>
						<text>取送任务</text>
					</view>
					<view class='task-find-list fs30' v-for='(item ,index) in fetchs' :key='index'>
						<view class='task-find-item'>
							<view>物料品类：{{item.cname}} <text class='flr'>金额:￥{{item.fee}}</text></view>
							<view>物料描述：{{item.desc}}</view>
							<image class='task-find-img' src='../../static/icon/task_get.png'></image>
						</view>
						<view class='task-find-method'>
							<view class='task-find-method-getfind fs30'>
								<view>取料地址：</view>
								<view class='fs24'>
									<view class='remark' v-if="item.address.remark!=''">
										{{item.address.remark||''}}
									</view>
									{{item.address.city_str ||''}} {{item.address.address||''}} {{item.address.room||''}}

								</view>
								<view class='fs24' style='word-break:break-all;'>
									{{item.address.consignee || ''}} / {{item.address.mobile || ''}}
								</view>
								<view class='fs24 text-999' style='word-break:break-all;'>
									{{item.address.stall || ''}}
								</view>
							</view>
						</view>
					</view>
					<view class='task-find-sum lh90 fs30 bb-1'>
						共{{fetchs.length}}个任务,小计：<text class='text-red'>￥{{fetchsTotalPrice}}</text>
					</view>
				</view>
			</view>
			<!--收货地址  -->
			<view class="fs30 bottom-border task-get box-shadow">
				<view class="cell-padding fs30 mgt-30 lh90 bottom-border">
					送料地址
				</view>
				<view class="cell-padding address flex flex-start" :data-index='2' @click='goConsigneeAddress'>
					<text class="iconfont icon-dizhi fs40 text-gray mgr-20"></text>
					<text class='iconfont icon-jiantou address-icon'></text>
					<view v-if='fetchsAddress' class="flex-1 address-info fs30 pdt-30">
						<view class='fs24'>
							<view class='remark' v-if="fetchsAddress.remark!=''">
								{{fetchsAddress.remark||''}}
							</view>
							{{fetchsAddress.city_str ||''}} {{fetchsAddress.address||''}} {{fetchsAddress.room||''}}

						</view>
						<view class='fs24' style='word-break:break-all;'>
							{{fetchsAddress.consignee || ''}} / {{fetchsAddress.mobile || ''}}
						</view>
						<view class='fs24 text-999' style='word-break:break-all;'>
							{{fetchsAddress.stall || ''}}
						</view>
					</view>
					<view :data-index='2' @click='goConsigneeAddress' v-if="fetchsAddress!=''" class="text-666 h100 lh100 flex-1">
						点击添加取料地址
					</view>
				</view>
			</view>

			<view @click='goCoupon' class='task-get box-shadow cell-padding fs30 mgt-30 lh90 bottom-border coupon'>
				<text>{{couponList.name}} {{couponList.coupon_data.value}}{{couponList?'':'使用优惠券'}}</text>
				<text class='iconfont icon-jiantou'></text>
			</view>

			<view class='task-get box-shadow cell-padding fs30 mgt-30 pay-type'>
				<view class='title'>选择支付方式</view>
				<view class='items'>
					<view class='item cf' v-for="(item, index) in payTypeList" :key="index" @click='payTypeCheck' :data-index='index'>
						<image class='fll' :src='item.icon'></image>
						<text class='fll mgl-20 text' v-if="item.title=='微信支付'">{{item.title}} </text>
						<text class='fll mgl-20 text' v-if="item.title=='余额'">{{item.title}} ￥{{balance_amount || '0'}}</text>
						<text class='fll mgl-20 text' v-if="item.title=='鹿币'">{{item.title}} ￥{{virtual_amount || '0'}}</text>
						<view class='flr check-btn'>
							<text v-if='payTypeCheckIndex == index' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
							<text v-if='payTypeCheckIndex != index' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
						</view>
					</view>
				</view>
			</view> -->
		<view style='height:140rpx;'></view>
			<view class='task-pay fs30 lh120 box-shadow pdl-30' v-if='fetchs.length>0 ||finds.length>0'>
				<view class='flr task-paybtn' style='margin-right:240rpx;'>
					应付款：
					<text class='text-red'>￥{{findsTotalPrice + fetchsTotalPrice - couponListPrice}}</text>
				</view>
				<button class='task-pay-btn text-underline' :disabled='isDisabled' @click='doPay'>支付</button>
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
				payDates: {}, // 支付数据
				
				isDisabled: false,
				isOldPayPasswordModel: false, // 旧支付密码弹窗
				Length: 6, //输入框个数  
				isFocus: true, //聚焦  
				Value: "", //输入的内容  
				ispassword: true, //是否密文显示 true为密文， false为明文。
				couponListPrice: 0, // 优惠券金额
				couponId: '',
				payTypeList: [{
						icon: '../../public/images/icon/wx.png',
						title: '微信支付'
					},
					{
						icon: '../../public/images/icon/money.png',
						title: '鹿币'
					},
					{
						icon: '../../public/images/icon/icon-balance.png',
						title: '余额'
					},
				],
				payTypeCheckIndex: 0,

				// 新数据
				fetchsTotalPrice : '',   // 取送总金额
				findsTotalPrice  : '',   // 找料总金额
				fetchs           : '',   // 取送任务数据
				finds            : '',   // 找料任务数据  
				taskPayList      : '',   //  任务数据
				defaultAddress   : '',   // 默认地址
				companyaddress   : '',   // 公司地址
				balance_amount   : '',   // 余额
				virtual_amount   : '',   // 鹿币
			};
		},
		onLoad(options) {
			let payMethed = options.payMethed;
			uni.setStorageSync('method', payMethed);
			uni.setStorageSync('status', 0);
			// 获取默认地址
			this.getDefaultAddress();
			// 获取公司地址
			this.getCompanyaddress();

		},
		onShow() {
			// 获取用户信息 余额
			// this.getUserInfo();
			// 获取余额
			this.getUserAsset();
			// 获取Storage找料取料数据
			let taskPayList = uni.getStorageSync('taskPayList');
			let { finds, fetchs, task_ids } = taskPayList;
			// 计算合计金额
			let findsTotalPrice = 0;
			let fetchsTotalPrice = 0;
			finds.forEach((v) => {
			  findsTotalPrice += parseFloat(v.fee);
			})
			fetchs.forEach((v) => {
			  fetchsTotalPrice += parseFloat(v.fee);
			})
			
			this.$data.taskPayList      = taskPayList;
			this.$data.finds            = finds;
			this.$data.fetchs           = fetchs;
			this.$data.task_ids         = task_ids;
			this.$data.findsTotalPrice  = findsTotalPrice;
			this.$data.fetchsTotalPrice = fetchsTotalPrice;
		},
		methods: {
			// 收货地址
			getDefaultAddress() {
				let _this = this;
				// 获取默认地址
				api.defaultAddress({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.defaultAddress = res.data;
						uni.setStorageSync('defaultAddress', res.data)
					}
				})
			},
			// 获取公司地址
		  getCompanyaddress() {
			api.getCompanyaddress({}).then((res) => {
			  if (res.code == 200 || res.code == 0) {
				console.log('公司地址');
				console.log(res.data.address);
				this.$data.companyaddress = res.data;
			  }
			})
		  },
		   // 获取余额
		  getUserAsset(){
			api.getUserAsset({}).then((res)=>{
				if(res.code == 200 || res.code == 0){
					this.$data.balance_amount = res.data.balance;
					this.$data.virtual_amount = res.data.virtual;
				}
			})
		  },
		},
	}
</script>

<style lang="scss" scoped>
	.task-find {}

	.task-find-title {
		line-height: 90rpx;
		height: 90rpx;
		border-bottom: 1rpx solid #f4f4f4;
		padding-left: 30rpx;
	}

	.task-find-list {
		padding-left: 40rpx;
		border-bottom: 1rpx solid #f4f4f4;
		padding: 30rpx 0;
	}

	.check-box {
		display: inline-block;
		width: 55rpx;
		padding-left: 30rpx;
	}

	.task-find-item {
		display: inline-block;
		width: 640rpx;
		position: relative;
		padding-left: 30rpx;
	}

	.task-find-item view {
		display: block;

		height: 50rpx;
		line-height: 50rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.task-find-img {
		width: 125rpx;
		height: 125rpx;
		position: absolute;
		top: 0rpx;
		right: 20rpx;
	}

	.task-find-method {
		position: relative;
	}

	.task-find-method-img {
		padding-left: 30rpx;
	}

	.task-find-method-img image {
		width: 100rpx;
		height: 100rpx;
		margin-right: 50rpx;
		border-radius: 10rpx;
	}

	.task-find-price {
		position: absolute;
		bottom: 0rpx;
		right: 20rpx;
	}

	.task-find-method-getfind view {
		padding-left: 30rpx;
		display: block;
	}

	.task-find-method-getfind {
		padding-right: 30rpx;
	}

	.task-pay {
		width: 680rpx;
		position: fixed;
		bottom: 0;
		z-index: 999;
		overflow: hidden;
		background-color: #f8f8f8;
	}

	.task-pay view {
		padding-left: 30rpx;
	}

	.task-pay-btn {
		width: 200rpx;
		height: 100%;
		line-height: 120rpx;
		display: inline-block;
		background-color: #F29800;
		text-align: center;
		color: #fff;
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 0;
	}

	.task-pay-price {}

	.task-find-sum {
		text-align: right;
		padding-right: 20rpx;
		border-top: 1rpx solid #f4f4f4;
	}

	.bottom-border {
		border-bottom: 1rpx solid #f4f4f4;
	}

	.task-pay {}

	.task-pay view {}

	.icon-dizhi {
		font-size: 50rpx;
		position: absolute;
		top: 30%;
		left: -60rpx;
		z-index: 999999;
	}

	.task-sum {
		position: absolute;
		right: 220rpx;
		top: 20rpx;
		width: 550rpx;
		text-align: right;

	}

	.task-paybtn {
		/* position: relative;
  top: -15rpx; */
	}

	.address-icon {
		position: absolute;
		right: 100rpx;
		top: 36%;


	}

	.address {
		position: relative;
		padding-right: 150rpx;
		padding-bottom: 30rpx;
		left: 80rpx;
	}

	.icon-chahao {
		position: absolute;
		right: 10rpx;
		top: 0rpx;
		font-size: 50rpx;
		color: #aaa;
	}

	.remark {
		display: inline;
		text-align: center;
		padding: 0 0 0 10rpx !important;
	}

	.task-warp {
		overflow: hidden;
	}

	.coupon {
		text-align: right;
		color: #ef8130;
	}

	.coupon text:first-child {
		margin-right: 20rpx;
	}

	.coupon text:last-child {
		position: relative;
		top: 0rpx;
	}

	.pay-type .title {
		padding: 20rpx 10rpx;
	}

	.pay-type .items .item {
		height: 60rpx;
		line-height: 60rpx;
		padding: 20rpx 0;
	}

	.pay-type .items .item .text {
		width: 500rpx;
	}

	.pay-type .items .item image {
		width: 60rpx;
		height: 60rpx;
	}
</style>
