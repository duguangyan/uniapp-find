<template>
<<<<<<< HEAD
	<view>
		<view class='order'>
			<view class='ordder-top-hidden'></view>
			<view class='box-shadow order-header'>
				<view class='order-nav fs30 lh90 border-bottom'>
					<text @click='checkNav' :data-index='1' :class="orderNavNum==1?'nav-active':'order-text'">找料订单</text>
					<text @click='checkNav' :data-index='2' :class="orderNavNum==2?'nav-active':'order-text'">取料订单</text>
				</view>
				<view class='order-nav order-child-nav fs30 lh90' v-if="orderNavNum==1">
					<text @click='checkChildNav' :data-index='0' :class="orderChildNavNum==0?'nav-child-active':''">全部</text>
					<text @click='checkChildNav' :data-index='1' :class="orderChildNavNum==1?'nav-child-active':''">找料中</text>
					<text @click='checkChildNav' :data-index='2' :class="orderChildNavNum==2?'nav-child-active':''">待收货</text>
					<text @click='checkChildNav' :data-index='3' :class="orderChildNavNum==3?'nav-child-active':''">待评价</text>
					<text @click='checkChildNav' :data-index='4' :class="orderChildNavNum==4?'nav-child-active':''">已完成</text>
				</view>
				<view class='order-nav order-child-nav fs30 lh90' v-if="orderNavNum==2">
					<text @click='checkChildNav' :data-index='0' :class="orderChildNavNum==0?'nav-child-active':''">全部</text>
					<text @click='checkChildNav' :data-index='1' :class="orderChildNavNum==1?'nav-child-active':''">取料中</text>
					<text @click='checkChildNav' :data-index='2' :class="orderChildNavNum==2?'nav-child-active':''">待收货</text>
					<text @click='checkChildNav' :data-index='3' :class="orderChildNavNum==3?'nav-child-active':''">待评价</text>
					<text @click='checkChildNav' :data-index='4' :class="orderChildNavNum==4?'nav-child-active':''">已完成</text>
				</view>
			</view>
			<view class='no-order-data' v-if="orderList==''">
				<image src='../../static/icon/no_order.png'></image>
				<view class='text-666 text-center fs30 mgt-50'>你还没有相关订单</view>
				<view class='do-order' @click='doOrder'>去下单</view>
			</view>
			<view class='order-content'>
				<view class='box-shadow task-find' v-for="(item, index) in orderList" :key="index">
					<view class='task-find-title fs30'>
						<text class='task-find-sn ellipsis'>订单编号: {{item.order_sn}}</text>
						<text class='task-find-snname text-red flr pdr-30'>{{item.status_label}}</text>
					</view>
					<view class='task-find-list fs30 cf'>
						<view @click='goFindDetail' :data-id='item.id' :data-index="index" class='task-find-item-warp'>
							<view class="task-find-item" :class="orderNavNum==2?'pdb-50':''">
								<view style='width:650upx;'>物料品类：{{item.cname}}
									<text class='flr'>金额:￥{{item.fee}}</text>
								</view>
								<view>物料描述：{{item.desc}}</view>
								<view v-if='orderNavNum==1'>找料方式：{{item.find_type_label}}</view>
								<image v-if="orderNavNum==1" class='task-find-img' src='../../static/icon/task_find.png'></image>
								<image v-if="orderNavNum==2" class='task-find-img' src='../../static/icon/task_get.png'></image>
							</view>
							<view class='task-find-method pdb-20'>
								<view class='task-find-method-img'>
									<image v-for='(imgItem, imgIndex) in item.desc_img' :key='imgIndex' :src='imgItem'></image>
								</view>

								<view class='task-find-method-getfind fs24'>
									<view v-if='item.get_address && item.find_type!=3 && orderChildNavNum <=1 && item.find_type!=1'>
										<view class='fs30'>{{orderNavNum==2?'取料地址':'取样地址'}}: </view>

										<view style='display:inline-block'>
											<view class='remark' v-if="item.get_address.remark!='' && item.get_address.remark!=null">
												{{item.get_address.remark||''}}
											</view>
											{{item.get_address.address||''}} {{item.get_address.room||''}}
										</view>
										<view style='word-break:break-all;'>
											{{item.get_address.consignee||''}} / {{item.get_address.mobile||''}}
										</view>
										<view class='text-999' style='word-break:break-all;'>
											{{item.get_address.stall||''}}
										</view>
									</view>


									<view v-if="(item.find_type==3 ||item.find_type==2 || item.find_type==1 || item.find_type==0) && orderChildNavNum >1">
										<view class='fs30'>送料地址: </view>
										<view style='display:inline-block'>
											<view class='remark' v-if="item.shipping_address.remark!=''&&item.shipping_address.remark!=null">
												{{item.shipping_address.remark||''}}
											</view>
											{{item.shipping_address.address||''}} {{item.shipping_address.room||''}}
										</view>
										<view style='word-break:break-all;'>
											{{item.shipping_address.consignee||''}} / {{item.shipping_address.mobile||''}}
										</view>
										<view class='text-999' style='word-break:break-all;'>
											{{item.shipping_address.stall||''}}
										</view>
									</view>


									<view v-if='item.find_type==3 && orderChildNavNum == 1'>
										<view class='fs30'>寄样地址: </view>
										<view v-for='(comItem, comIndex) in companyaddress' :key='comIndex' class='bb1 mg10'>

											<view>
												<text class='remark' v-if='comItem.tag'>{{comItem.tag||''}}</text>
												<text>{{comItem.address}}</text>
											</view>
											<view class='text-999'>
												<view>
													{{comItem.consignee || ''}} / {{comItem.mobile || ''}}
												</view>
											</view>
											<view class='text-999'>
												{{comItem.desc}}
											</view>
										</view>
										<view class='text-red'>
											<text class='iconfont icon-gantan1'></text>寄样不支持到付,请客户自行承担寄样费用
										</view>

									</view>
								</view>

								<view class='order-footer-btn bt-2 cf' v-if='item.can_refuse==1||item.can_confirm==1||item.can_delete==1 ||item.can_comment==1'>


									<button style='border: 1upx solid #666;color: #666;' :data-id='item.id' @click='toReturn' v-if='item.can_refuse==1'>退款</button>
									<button :data-id='item.id' @click='affirmOrder' v-if='item.can_confirm==1' class='order-footer-btn-red'
									 :data-index="index">确认收货</button>
									<button :data-id='item.id' @click='toComment' v-if='item.can_comment==1'>评价</button>
									<button style='border: 1upx solid #666;color: #666;' :data-id='item.id' @click='toDel' v-if='item.can_delete==1'>删除</button>


								</view>

							</view>
						</view>

					</view>
				</view>
			</view>
			<view v-if="!shopLoading && !isData" class='loding pdb-30'>
				已经全部加载完毕
			</view>
		</view>
		<!-- 填写取消订单原因model -->
		<!-- <modal title="请填写取消订单原因" hidden="{{ isDelModel }}" confirm-text="提交" cancel-text="取消" bindconfirm="delConfirm"
		 bindcancel="delCancel">
			<input class='bt-1 lh50 pdt-30' type='text' placeholder='请填写取消订单的原因' bindinput='delModelInput'></input>
		</modal>



		<modal title="评价本次服务" hidden="{{ isCommentModel }}" confirm-text="提交" cancel-text="取消" bindconfirm="commentConfirm"
		 bindcancel="commentCancel">
			<view class='star-warp pdt-30 pdb-30'>
				<view>
					找料满意度：
					<text catchtap='satisfact' data-idx='{{index}}' wx:key="{{this}}" wx:for="{{starArr}}" wx:for-item="item"
					 wx:for-index="index" class="star iconfont icon-star {{ starIndex_1 >= index ? 'text-yellow':''}}"></text>
				</view>
				<view>
					配送及时性：
					<text catchtap='timely' data-idx='{{index}}' wx:for="{{starArr}}" wx:key="{{this}}" wx:for-item="item"
					 wx:for-index="index" class="star iconfont icon-star {{ starIndex_2 >= index ? 'text-yellow':''}}"></text>
				</view>
			</view>

			<input class='bt-1 lh50 pdt-30' wx:if='{{isStarShow}}' type='text' placeholder='请输入评语' bindinput='commentModelInput'></input>
		</modal>
 -->


		<!-- <view class='index-popup notes-popup' wx:if="{{isUrgeOrder}}">
			<view class='index-popup-bg' catchtap='closeUrgeOrderPopup'></view>
			<view class='index-popup-content notes-btn-content'>
				<view class='index-popup-title'>催单成功 </view>
				<view class='index-popup-main bt-1'>
					<view>
						你也可联系找料员(
						<text class='text-red' data-mobile='{{urgeOrderMobile}}' catchtap='call'>{{urgeOrderMobile || '暂无'}}</text>)或致电(
						<text class='text-red' data-mobile='400-8088-156' catchtap='call'>400-8088-156</text>),咨询进度
					</view>
				</view>
				<view class='index-popup-btn notes-btn'>
					<view class='text-red btn-shadow' catchtap='closeUrgeOrderPopup'>确定</view>
				</view>
			</view>
		</view> -->




		<!-- <view class='mask-bg' wx:if='{{isOldPayPasswordModel}}' catchtap='closeModel'></view>
		<form class='mask-warp' bindsubmit="formSubmit" wx:if='{{isOldPayPasswordModel}}'>
			<view class='mask-title'>请输入支付密码</view>
			<view class='content cf'>
				<block wx:for="{{Length}}" wx:key="item">
					<input class='iptbox ' type='number' value="{{Value.length>=index+1?Value[index]:''}}" disabled password='{{ispassword}}'
					 catchtap='Tap'></input>
				</block>

			</view>

			<input name="password" type='number' password="{{true}}" value='{{focusValue}}' class='ipt' maxlength="{{Length}}"
			 focus="{{isFocus}}" bindinput="Focus"></input>
			<view class='text-theme fs30 flr pdr-30 mgb-40' catchtap='forgetPayPassWord'>忘记密码</view>
		</form> -->

=======
	<view >
		订单中心
		 <view class="page-body">
            <view class="btn-area">
				
            </view>
        </view>
>>>>>>> a8ea4edd87df085d6c1768299c489f3bbc780f22
	</view>
</template>

<script>
	import util from "../../../utils/util.js";
	import api from "../../../utils/api.js";
	export default {
		data() {
			return {
// 				isStarShow: false, // 初始化评价评语
// 				isUrgeOrder: false, // 催单弹窗
// 				
// 				shopLoading: true,
// 				modalShow: true,
// 				isDelModel: true, // 取消订单模态框
// 				delMsg: '', // 取消订单原因数据
// 				isCommentModel: true, // 评价模态框 
// 				commentMsg: '', // 评价内容
// 				starArr: [0, 1, 2, 3, 4], // 评价星星
// 				starIndex_1: 4, // 星星评价选中
// 				starIndex_2: 4, // 星星评价选中
// 				findList: '', // 找料列表数据
// 				fecthList: '', // 取料列表数据
// 				totalPages: 0, // 总页数
// 				current_page: 1, // 当前页 
// 				isDisabled: false,
// 
// 				payDates: {},
// 				isOldPayPasswordModel: false, // 旧支付密码弹窗
// 				Length: 6, //输入框个数  
// 				isFocus: true, //聚焦  
// 				Value: "", //输入的内容  
// 				ispassword: true, //是否密文显示 true为密文， false为明文。
// 				


				checkNav:['找料订单','取料订单'],
				checkChildNav1:['全部','找料中','待收货','待评价','已完成'],
				checkChildNav2:['全部','取料中','待收货','待评价','已完成'],
				companyaddress: '',    // 公司地址
				orderNavNum: 1,        // nav一级切换
 				orderChildNavNum: 0,   //  nav二级切换
				shopLoading: true,     // 载入动画
				orderList    : '',     // 页面数据
				page         :  1,     // 第几页
			};
		},
		onLoad(options) {
			// if (options.orderId) {
			// 	uni.navigateTo({
			// 		url: '../findOrderDetail/findOrderDetail?id=' + options.orderId + '&nav=' + options.nav
			// 	})
			// }
		},
		onShow() {
			
		},
		mounted(){
			// 获取公司地址
			this.getCompanyaddress();
			// 从个人中心跳转过来对应数据
			let method = uni.getStorageSync('method');
			if (method) {
				let status = uni.getStorageSync('status');
				this.$data.orderNavNum = method;
				this.$data.orderChildNavNum = status;
			}
			
			try {
				wx.removeStorageSync('method');
				wx.removeStorageSync('status');
			} catch (e) {
				// Do something when catch error
			}
			// 初始化获取找料列表
			this.getList(this.$data.orderNavNum, this.$data.orderChildNavNum,this.$data.page);
		},
		methods: {
			// 获取订单列表
			getList(index, status, page) {
				api.orderList({
					data: {
						page,
						type: index,
						status
					}
				}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.orderList = res.data;
						for (let i = 0; i < this.$data.orderList.length; i++) {
							// 1按图找,2按样找3按描述
							if (this.$data.orderList[i].type == 1) {
								this.$data.orderList[i].type_name = '按图找料';
							} else if (this.$data.orderList[i].type == 2) {
								this.$data.orderList[i].type_name = '按样找料';
							} else if (this.data.orderList[i].type == 3) {
								this.$data.orderList[i].type_name = '按描述找料';
							}
						}
						// 判断是否加载更多
						this.$data.orderList.length <=0?this.$data.shopLoading = false:this.$data.shopLoading = true;
					} else {
						this.$data.isData = true;
					}
					wx.hideLoading();
				}).catch((res) => {
					wx.hideLoading();
				})
			},
			// 获取公司地址
			  getCompanyaddress() {
				api.getCompanyaddress({}).then((res) => {
				  if (res.code == 200 || res.code == 0) {
					this.$data.companyaddress = res.data;
				  }
				})
			  },
		}
	}
</script>

<style lang="scss" scoped="true">
	.ordder-top-hidden {
		height: 30upx;
		background-color: #efeff4;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
	}
	.order-nav {
		display: flex;
		position: relative;
	}

	.order-nav text {
		width: 50%;
		text-align: center;
	}

	.order-nav text {
		border-right: 2upx solid #eee;
	}

	.order-text {
		border-bottom: 4upx solid #eee;
	}

	.order-nav text:last-child {
		border-right: none;
	}

	.nav-active {
		color: #F29800;
		position: relative;
	}

	.nav-active::after {
		content: '';
		display: block;
		width: 100%;
		height: 4upx;
		background-color: #F29800;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.order-child-nav text {
		border-right: none;
		position: relative;
	}

	.nav-child-active {
		color: #F29800;
	}

	.nav-child-active::after {
		content: '';
		display: block;
		width: 100upx;
		height: 4upx;
		background-color: #F29800;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -50upx;
	}

	.order-header {
		position: fixed;
		top: 0;
		width: 708upx;
		z-index: 999;
		background-color: #fff;
	}

	.order-content {
		margin-top: 226upx;
		position: relative;
	}

	.task-find-title {
		line-height: 90upx;
		height: 90upx;
		border-bottom: 1upx solid #f4f4f4;
	}

	.task-find-list {
		border-bottom: 1upx solid #f4f4f4;
		position: relative;
	}

	.check-box {
		display: inline-block;
		width: 55upx;
		padding-left: 30upx;
	}

	.task-find-item {
		text-align: left;
		display: inline-block;
		width: 690upx;
		padding-left: 30upx;
		border-bottom: 1upx solid #eee;
		padding-bottom: 10upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.pdb-50 {
		padding-bottom: 50upx;
	}

	.task-find-item view {
		display: block;
		width: 420upx;
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
		top: 10upx;
		right: 10upx;
	}

	.task-find-method {
		text-align: left;
	}

	.task-find-method-img {
		padding: 160upx 30upx 10upx 30upx;
	}

	.task-find-method-img image {
		width: 100upx;
		height: 100upx;
		margin-right: 50upx;
		margin-top: 30upx;
	}

	.task-find-price {
		position: absolute;
		bottom: 25upx;
		right: 30upx;
	}

	.task-find-method-getfind {
		padding: 10upx 30upx;

	}

	.remark {
		height: 30upx;
		line-height: 10upx;
		display: inline-block;
		padding-left: 10upx;
		padding-right: 0upx !important;
	}

	.order-footer-btn {

		text-align: right;
		padding-top: 25upx;
	}

	.order-footer-btn button {
		border: 1upx solid #666;
		padding: 10upx;
		border-radius: 10upx;
		margin-right: 20upx;
		background-color: #fff;
		width: 160upx;
		float: right;
		line-height: 40upx;
		font-size: 30upx;
	}

	.order-footer-btn-red {
		border: 1upx solid #F29800 !important;
		color: #F29800;
	}

	.loding {
		text-align: center;
		color: #666;
	}

	.star {
		margin-left: 20upx;
	}

	.no-order-data image {
		width: 114upx;
		height: 144upx;
		text-align: center;
		margin-top: 370upx;
		
	}

	.do-order {
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		margin: 0 auto;
		background-color: #F29800;
		border-radius: 10upx;
		color: #fff;
		font-size: 30upx;
		margin-top: 40upx;
	}

	.task-find-sn {
		width: 530upx;
		text-align: left;
		padding-left: 30upx;
	}

	.task-find-snname {
		position: relative;
		top: -86upx;
	}

	.task-find-item-warp {
		position: relative;
	}



	.index-popup {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
	}

	.index-popup-bg {
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: .7;
		position: absolute;
		left: 0;
		top: 0;
	}

	.index-popup-content {
		width: 700upx;
		min-height: 330upx;
		background-color: #fff;
		position: absolute;
		top: 20%;
		left: 25upx;
		border-radius: 10upx;
	}

	.index-popup-title {
		height: 150upx;
		line-height: 150upx;
		font-size: 36upx;
		text-align: center;
		position: relative;
	}

	.index-popup-main {
		font-size: 30upx;
		padding: 20upx 30upx;
		border-bottom: 1px solid #f4f4f4;
	}

	.index-popup-main .index-popup-view-1 {
		letter-spacing: 9px;
		line-height: 90upx;
		height: 90upx;
		float: left;
	}

	.index-popup-main view:last-child {}

	.index-popup-main input {
		display: inline-block;
		height: 68upx;
		line-height: 68upx;
		width: 80upx;
		border: 1upx solid #f4f4f4;
		border-radius: 10upx;
		padding-left: 20upx;
		margin: 0 20upx;
		margin-top: 10upx;
	}

	.index-popup-check {
		padding: 0 80upx;
		height: 90upx;
		line-height: 90upx;
		border-bottom: 1upx solid #f4f4f4;
	}

	.index-popup-check view {
		display: inline-block;
		margin-left: 30upx;
		font-size: 30upx;
	}

	.index-popup-check view:first-child {
		margin-left: 0;
	}

	.doSubmit {
		width: 350upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 0 auto;
		background-color: #F29800;
		border-radius: 20upx;
		font-size: 30upx;
		color: #fff;
		margin-top: 60upx;
	}

	.index-popup-btn view {
		display: inline-block;
		width: 256upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		margin-left: 60upx;
		margin-top: 20upx;
		border: 1upx solid #f23030;
		border-radius: 10upx;
	}

	.xuzhi {
		text-align: center;
		margin: 0 auto;
		margin-bottom: 30upx;
		margin-top: 30upx;
	}

	.xuzhi image {
		width: 35upx;
		height: 35upx;
		margin-right: 5upx;
		position: relative;
		top: 8upx;
	}

	.xuzhi text {}

	.notes-btn {
		margin-top: 30upx;
		margin-bottom: 50upx;
	}

	.notes-btn view {
		margin-left: 218upx;
		background-color: #F29800;
		color: #fff;
	}

	.notes-btn-content {
		height: auto;
		top: 25%;
	}

	.index-popup-main view {
		line-height: 50upx;
	}

	.icon-del1 {
		position: absolute;
		font-size: 60upx;
		right: 10upx;
		top: -30upx;
		color: #999;
	}

	.chat_list {
		position: fixed;
		right: 20upx;
		bottom: 50upx;
		z-index: 999999;
	}

	.chat_list image {
		width: 140upx;
		height: 140upx;
	}
</style>
