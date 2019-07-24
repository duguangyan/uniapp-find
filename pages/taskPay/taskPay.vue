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
							<view>
								<text class="fs28">物料品类:</text> <text class="fs24 text-999 mgl-20">{{item.cname}}</text>
								
								<text class="flr text-yellow fs24" v-if='item.find_type==1'>按图找料</text>
								<text class="flr text-yellow fs24" v-if='item.find_type==2'>按样找料</text>
								<text class="flr text-yellow fs24" v-if='item.find_type==3'>按描述找料</text>
							</view>
							<view>
								<text class="fs28">物料描述:</text> <text class="fs24 text-999 mgl-20">{{item.desc}}</text>
								<text class='flr text-yellow fs24'>金额:￥{{item.fee}}</text>
							</view>
								<view>
								<text class="fs28">比价优选:</text> <text class="fs24 text-999 mgl-20">参考价格￥{{item.reference_price}}</text>
							</view>
							<view>
								<!-- <text class="fs28">限时找料:</text> <text class="fs24 text-999 mgl-20">{{item.is_limit==1?'三小时':''}}</text> -->
								<text class="fs28"></text> <text class="fs24 text-999">{{item.distance_text}}</text>
								
								<text class='flr text-yellow fs24'>超范围服务费:￥{{item.extra_fee}}</text>
							</view>
						
							<!-- <image class='task-find-img' src='../../static/icon/task_find.png'></image> -->
						</view>
						<view class='task-find-method'>
							<view class='task-find-method-img' v-if='item.find_type==1'>
								<image @click="imgYu" v-for='(imgItem, imgIndex) in item.desc_img' :key='imgIndex' :src='imgItem'></image>
							</view>
							<view class='task-find-method-getfind' v-if='item.find_type==2'>
								<!-- <view>
									取样地址:
								</view> -->
								<view>
									<view class='fs24'>
										<!-- <view class='remark' v-if="item.address && item.address.remark!=''">
											{{item.address.remark||''}}
										</view> -->
										<text class="fs28">取样地址:</text>	<text class="fs24 text-999 mgl-20"> {{item.address.address||''}} {{item.address.room||''}}</text>
									</view>
									<!-- <view class='fs24' style='word-break:break-all;'>
										{{item.address.consignee || ''}} / {{item.address.mobile || ''}}
									</view>
									<view class='fs24 text-999' style='word-break:break-all;'>
										{{item.address.stall || ''}}
									</view> -->
								</view>
							</view>


							<view class='task-find-method-getfind' v-if='item.find_type==3'>
								<view class="mgl-20 fs32">
									寄样地址：
								</view>
								<view>
									<view class='fs24 pdr-20' style='word-break:break-all;'>
										<text class='remark'>{{companyaddress[0].tag}}</text>
										{{companyaddress[0].address}}
									</view>
									<view class='fs24 pdr-20' style='word-break:break-all;'>
										{{companyaddress[0].consignee}} / {{companyaddress[0].mobile}}
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
							<view><text class="fs28">物料品类:</text> <text class="fs24 text-999 mgl-20">{{item.cname}}</text> <text class='flr text-yellow fs24'>金额:￥{{item.fee}}</text></view>
							<view><text class="fs28">物料描述:</text> <text class="fs24 text-999 mgl-20">{{item.desc}}</text>  </view>
							<view><text class="fs28"><text class="fs24 text-999">{{item.distance_text}}</text></text> <text class='flr text-yellow fs24'>超范围服务费:￥{{item.extra_fee}}</text></view>
							 
							<!-- <image class='task-find-img' src='../../static/icon/task_get.png'></image> -->
						</view>
						<view class='task-find-method'>
							<view class='task-find-method-getfind fecth-address fs30'>
								<!-- <view>取料地址：</view> -->
								<view class='fs24'>
									<!-- <view class='remark' v-if="item.address.remark!=''">
										{{item.address.remark||''}}
									</view> -->
									<text class="fs28">取料地址:</text>
									<text class="fs24 text-999 mgl-20">{{item.address.city_str ||''}} {{item.address.address||''}} {{item.address.room||''}}</text>
								</view>
								<!-- <view class='fs24' style='word-break:break-all;'>
									{{item.address.consignee || ''}} / {{item.address.mobile || ''}}
								</view>
								<view class='fs24 text-999' style='word-break:break-all;'>
									{{item.address.stall || ''}}
								</view> -->
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
					<!-- <text class="iconfont icon-dizhi fs40 text-gray mgr-20"></text> -->
					<text class='iconfont icon-jiantou address-icon'></text>
					<view v-if="address!=''" class="flex-1 address-info fs30 pdt-30">
						<view class='fs2'>
							<!-- <view class='remark' v-if="address.remark!=''">
								
							</view> -->
							
							<text>{{address.consignee}} </text>  {{address.mobile || ''}} <text class="mgl-20">{{address.stall}}</text> <text class='remark' v-if="address.remark!=''">{{address.remark||''}}</text>
						</view>
						<view class="fs24 text-999">{{address.city_str ||''}} {{address.address||''}} {{address.room||''}}</view>
						<!-- <view class='fs24' style='word-break:break-all;'>
							{{address.consignee || ''}} / {{address.mobile || ''}}
						</view>
						<view class='fs24 text-999' style='word-break:break-all;'>
							{{address.stall || ''}}
						</view> -->
					</view>
					<view :data-index='2' @click='goConsigneeAddress' v-if="address==''" class="text-666 h100 lh100 flex-1 fetchsAddress">
						点击添加取料地址
					</view>
				</view>
			</view>

			<view @click='goCoupon' class='task-get box-shadow cell-padding fs30 mgt-30 lh90 bottom-border coupon'>
				<text v-if="couponList==''">使用优惠券</text>
				<text v-if="couponList!=''">{{couponList.name}} {{couponList.coupon_data.value}}</text>
				<text class='iconfont icon-jiantou flr'></text>
			</view>

			<view class='task-get box-shadow cell-padding fs30 mgt-30 pay-type'>
				<view class='title'>选择支付方式</view>
				<view class='items'>
					<view class='item cf' v-for="(item, index) in payTypeList" :key="index" @click='payTypeCheck' :data-index='index'>
						<image class='fll' :src='item.icon'></image>
						<text class='fll mgl-20 text' v-if="item.title=='微信支付'">{{item.title}} </text>
						<text class='fll mgl-20 text' v-if="item.title=='余额'">{{item.title}} (￥{{balance_amount || '0'}})</text>
						<text class='fll mgl-20 text' v-if="item.title=='鹿币'">{{item.title}} ({{virtual_amount || '0'}})</text>
						<view class='flr check-btn'>
							<text v-if='payTypeCheckIndex == index' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
							<text v-if='payTypeCheckIndex != index' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
						</view>
					</view>
				</view>
			</view>
			<view style='height:140upx;'></view>
			<view class='task-pay fs30 lh120 box-shadow pdl-30' v-if='fetchs.length>0 ||finds.length>0'>
				<view class='flr task-paybtn' style='margin-right:240upx;'>
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
				couponId: '',
				payTypeList: [
					
					{
						icon: '../../static/icon/money.png',
						title: '鹿币'
					},
					{
						icon: '../../static/icon/icon-balance.png',
						title: '余额'
					},
					{
						icon: '../../static/icon/wx.png',
						title: '微信支付'
					},
				],

				// 新数据
				couponList        : '', // 优惠券信息
				couponListPrice   : '', //优惠券价格
				fetchsTotalPrice  : '', // 取送总金额
				findsTotalPrice   : '', // 找料总金额
				fetchs            : '', // 取送任务数据
				finds             : '', // 找料任务数据  
				taskPayList       : '', //  任务数据
				address           : '', // 默认地址
				companyaddress    : [{
					address:'',
					tag:'',
					consignee:'',
					mobile:''
				}], // 公司地址
				balance_amount    : '', // 余额
				virtual_amount    : '', // 鹿币
				payTypeCheckIndex : 0,  // 默认微信支付
				task_ids          : '', // 任务id
				
			};
		},
		onLoad(options) {
			let payMethed = options.payMethed;
			if(payMethed == 1){
				uni.setStorageSync('method', 0);
			}else{
				uni.setStorageSync('method', 1);
			}
			uni.setStorageSync('status', 0);
			
			
			// 获取用户信息 余额
			// this.getUserInfo();
			// 获取余额
			this.getUserAsset();
			// 获取Storage找料取料数据
			let taskPayList = uni.getStorageSync('taskPayList');
			
			
			let finds    = taskPayList.finds;
			let fetchs   = taskPayList.fetchs;
			let task_ids = taskPayList.task_ids;
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
			
			
			// 获取默认地址
			this.getDefaultAddress();
			// 获取公司地址
			this.getCompanyaddress();

		},
		onShow() {
			this.$data.isDisabled = false;
			// 获取取送任务编辑信息
			this.$eventHub.$on('taskPayPage', (data) => {
				this.$data.address = data.address;
				this.getServicePrice();
			})
			
		},
		mounted() {
			let _this = this;
			this.$eventHub.$on('giftData', (list) => {
				_this.$data.couponList      = list;
				_this.$data.couponListPrice = list.value;
				_this.$data.couponId        = list.id;
			})
		},
		methods: {
			// 去优惠券列表
		  goCoupon(){
			let totalPrice = this.$data.findsTotalPrice + this.$data.fetchsTotalPrice;
			uni.navigateTo({
			  url: '../giftCertificate/giftCertificate?from=giftCertificate&totalPrice='+totalPrice,
			})
		  },
			// 收货地址
			getDefaultAddress() {
				let _this = this;
				// 获取默认地址
				api.defaultAddress({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.address = res.data;
						_this.getServicePrice();
					}
				})
			},
			// 获取超范围服务费
			getServicePrice(){
				api.apiTaskPayment({
					method:'POST',
					data:{
						task_id:this.$data.taskPayList.task_ids,
						address_id:this.$data.address.id
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						let finds = [];
						let fetchs = [];
						let taskPayList = this.$data.taskPayList;
						res.data.forEach((o,i)=>{
							if(o.type == 1){
								taskPayList.finds.forEach((oo,ii)=>{
									if(o.id == oo.id){
										o.address = oo.address;
										finds.push(o);
									}
								})
								
								
							}else{
								taskPayList.fetchs.forEach((oo,ii)=>{
									if(o.id == oo.id){
										o.address = oo.address;
										fetchs.push(o)
									}
								})
								
							}
						})
						// 计算合计金额
						let findsTotalPrice = 0;
						let fetchsTotalPrice = 0;
						finds.forEach((v) => {
							findsTotalPrice += parseFloat(v.total_fee);
						})
						fetchs.forEach((v) => {
							fetchsTotalPrice += parseFloat(v.total_fee);
						})
						
						this.$data.finds            = finds;
						this.$data.fetchs           = fetchs;
						this.$data.findsTotalPrice  = findsTotalPrice;
						this.$data.fetchsTotalPrice = fetchsTotalPrice;
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
			getUserAsset() {
				api.getUserAsset({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.balance_amount = res.data.balance;
						this.$data.virtual_amount = res.data.virtual;
					}
				})
			},
			// 去地址选择页面
			goConsigneeAddress(e) {
				wx.navigateTo({
					url: '../address/address?from=taskPayPage',
				})
			},
			// 优惠券选择
			payTypeCheck(e) {
				this.$data.payTypeCheckIndex = e.currentTarget.dataset.index
			},
			// 支付
			doPay() {
				// 防止多次点击重复提交
				this.$data.isDisabled = true;
				let _this = this;
				this.$data.payDates.task_ids = this.$data.task_ids;
				// 获取优惠券信息
				if (this.$data.couponList !='') {
					this.$data.couponListPrice = Math.ceil(this.$data.couponList.value);
				} else {
					this.$data.couponListPrice = 0;
				}
				if (this.$data.address == '') {
					util.errorTips('请添加地址')
					return false
				}

				// 支付方式  0：鹿币  1：余额  2：微信 
				if (this.$data.payTypeCheckIndex == 2) {
					console.log("微信支付");
					api.wxPayByOrder({
						method: 'POST',
						data: {
							"type": "miniapp",
							'open_id': uni.getStorageSync('open_id'),
							"task_id": this.$data.task_ids,
							"coupon_id": this.$data.couponId,
							"address_id": this.$data.address.id,
						}
					}).then((res) => {
						util.errorTips(res);
						if (res.code == 200 || res.code == 0) {
							let data = res.data.data;
							let pay = res.data.pay;
							data.success = function(res) {
								console.log('支付成功');
								console.log(res);
								uni.redirectTo({
									url: '../taskPaySuccess/taskPaySuccess?pay_log=' + JSON.stringify(pay)
								})
							}
							data.fail = function(res) {
								_this.$data.isDisabled = false
								util.errorTips(支付失败)
							}
							wx.requestPayment(data);

						} else {
							util.errorTips('支付失败')
							this.$data.isDisabled = false;
						}
					}).catch((e) => {
						util.errorTips(e.msg)
						this.$data.isDisabled = false;
					})

				} else {
					console.log("余额支付");
					let _this = this;
					uni.showModal({
						title: '提示',
						content: '确认支付吗?',
						success: function(res) {
							if (res.confirm) {
								let data = '';
								if (_this.$data.payTypeCheckIndex == 1) {   // 余额支付
									data = {
										"type": "miniapp",
										"asset_type": "balance",
										'open_id': uni.getStorageSync('open_id'),
										"task_id": _this.$data.task_ids,
										"coupon_id": _this.$data.couponId,
										"address_id": _this.$data.address.id,
									}
								} else if (_this.$data.payTypeCheckIndex == 0) {  // 鹿币支付
									data = {
										"type": "miniapp",
										"asset_type": "virtual",
										'open_id': uni.getStorageSync('open_id'),
										"task_id": _this.$data.task_ids,
										"coupon_id": _this.$data.couponId,
										"address_id": _this.$data.address.id, // this.data.findsAddress.id
									}
								}

								api.payAsset({
									method: 'POST',
									data
								}).then((res) => {
									if (res.code == 200 || res.code == 0) {
										let pay = JSON.stringify(res.data.pay);
										uni.redirectTo({
											url: '../taskPaySuccess/taskPaySuccess?pay_log=' + pay
										})
									} else {
									
										util.errorTips(res.msg);
										_this.$data.isDisabled = false
									}
								}).catch((res) => {
									util.errorTips(res.msg);
									_this.$data.isDisabled = false
								})
							} else if (res.cancel) {
								util.errorTips("你点击了取消")
								_this.$data.isDisabled = false
							}
						}
					})

				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.fecth-address{
		padding-left: 16upx;
	}
	.task-find {}

	.fetchsAddress {
		position: relative;
		top: 18upx;
	}

	.task-find-title {
		line-height: 90upx;
		height: 90upx;
		border-bottom: 1upx solid #f4f4f4;
		padding-left: 30upx;
	}

	.task-find-list {
		padding-left: 40upx;
		border-bottom: 1upx solid #f4f4f4;
		padding: 30upx 0;
	}

	.check-box {
		display: inline-block;
		width: 55upx;
		padding-left: 30upx;
	}

	.task-find-item {
		display: inline-block;
		width: 640upx;
		position: relative;
		padding-left: 30upx;
	}

	.task-find-item view {
		display: block;

		height: 50upx;
		line-height: 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.task-find-img {
		width: 125upx;
		height: 125upx;
		position: absolute;
		top: 0upx;
		right: 20upx;
	}

	.task-find-method {
		position: relative;
	}

	.task-find-method-img {
		padding-left: 30upx;
	}

	.task-find-method-img image {
		width: 100upx;
		height: 100upx;
		margin-right: 50upx;
		border-radius: 10upx;
	}

	.task-find-price {
		position: absolute;
		bottom: 0upx;
		right: 20upx;
	}

	.task-find-method-getfind view {
		padding-left: 16upx;
		display: block;
	}

	.task-find-method-getfind {
		padding-right: 30upx;
	}

	.task-pay {
		width: 680upx;
		position: fixed;
		bottom: 0;
		z-index: 999;
		overflow: hidden;
		background-color: #f8f8f8;
	}

	.task-pay view {
		padding-left: 30upx;
	}

	.task-pay-btn {
		width: 200upx;
		height: 100%;
		line-height: 120upx;
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
		padding-right: 20upx;
		border-top: 1upx solid #f4f4f4;
	}

	.bottom-border {
		border-bottom: 1upx solid #f4f4f4;
	}

	.task-pay {}

	.task-pay view {}

	.icon-dizhi {
		font-size: 50upx;
		position: absolute;
		top: 30%;
		left: -60upx;
		z-index: 999999;
	}

	.task-sum {
		position: absolute;
		right: 220upx;
		top: 20upx;
		width: 550upx;
		text-align: right;

	}

	.task-paybtn {
		/* position: relative;
  top: -15upx; */
	}

	.address-icon {
		position: absolute;
		right: 24upx;
		top: 36%;


	}

	.address {
		position: relative;
		padding-right: 100upx;
		padding-bottom: 30upx;
		
		.address-info{
			view{
				margin-bottom: 10upx;
			}
		}
	}

	.icon-chahao {
		position: absolute;
		right: 10upx;
		top: 0upx;
		font-size: 50upx;
		color: #aaa;
	}

	.remark {
		display: inline;
		text-align: center;
		border: 1upx solid #F29800;
		padding: 0 4upx;
		color: #F29800;
		margin-left: 20upx;
	}

	.task-warp {
		overflow: hidden;
	}

	.coupon {
		text-align: left;
		color: #333;
	}

	.coupon text:first-child {
		margin-right: 20upx;
	}

	.coupon text:last-child {
		position: relative;
		top: 0upx;
	}

	.pay-type .title {
		padding: 20upx 10upx;
	}

	.pay-type .items .item {
		height: 60upx;
		line-height: 60upx;
		padding: 20upx 0;
	}

	.pay-type .items .item .text {
		width: 500upx;
	}

	.pay-type .items .item image {
		width: 60upx;
		height: 60upx;
	}
</style>
