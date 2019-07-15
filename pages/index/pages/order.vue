<template>
	<view>
		<view class='order'>
			<view class='ordder-top-hidden'></view>
			
			<view class='order-header'>
				<view class="search">
					<view class="warp">
						<image src="../../static/icon/search-bg.png" mode=""></image>
						<input class="fs24" type="text" v-model="searchValue" placeholder="请输入关键字">
						<text class="btn" @click="doSearch"></text>
					</view>
				</view>
				<view class='order-nav fs30 lh90 border-bottom'>
					<text v-for="(item, index) in checkNavs" :key="index" @click='checkNav' :data-index='index' :class="orderNavNum==index?'nav-active':'order-text'">{{item}}</text>
				</view>
				<scroll-view scroll-x="true" scroll-left="scrolLeft"  class='order-nav order-nav-1 order-child-nav fs30 lh90'>
					<view class="order-nav-1-warp">
						<view v-for="(item, index) in checkChildNavs" :key="index" @click='checkChildNav' :data-index='index' :class="orderChildNavNum==index?'nav-child-active':''">
						{{item}}
						<text class="line"></text>
						</view>
					</view>
					
				</scroll-view>
			</view>
			<view class='no-order-data' v-if="hasData">
				<image src='../../static/icon/no_order.png'></image>
				<view class='text-666 text-center fs30 mgt-50'>你还没有相关订单</view>
				<view class='do-order' @click='doOrder(1)'>添加找料订单</view>
				<view class='do-order' @click='doOrder(2)'>添加取送订单</view>
			</view>
			<view class='order-content'>
				<view class='task-find' v-for="(item, index) in orderList" :key="index">
					<view class='task-find-title fs30'>
						<text class='task-find-sn ellipsis'>订单编号: {{item.order_sn}}</text>
						<text class='task-find-snname text-yellow flr pdr-30'>{{item.status_label}}</text>
					</view>
					<view class='task-find-list fs30 cf'>
						<view @click='goOrderDetail' :data-id='item.id' :data-index="index" class='task-find-item-warp'>
							<view class="task-find-item" :class="orderNavNum==2?'pdb-50':''">
								<view>
									<text class="fs28">物料品类:</text> <text class="fs24 text-999 mgl-20">{{item.cname}}</text>
									<text  v-if='orderNavNum==0' class="flr fs24 text-yellow float" style="text-align: right;">{{item.find_type_label}}</text>
								</view>
								<view>
									<text class="fs28">物料描述:</text> <text class="fs24 text-999 mgl-20 ellipsis ellipsis-1">{{item.desc}}</text>
									<text class='flr fs24 text-yellow float'>金额:￥{{item.fee}}</text>
								</view>
								
								<!-- <view>
									<text class="fs28">限时找料:</text> <text class="fs24 text-999 mgl-20">{{item.limit_time_text}}</text>
								</view> -->
								<view>
									<text class="fs28">比价优选:</text> <text class="fs24 text-999 mgl-20">参考价￥{{item.reference_price}}</text>
								</view>
								
							</view>
							<view class='task-find-method pdb-20'>
								<view class='task-find-method-img' v-if="item.desc_img.length>0">
									<image v-for='(imgItem, imgIndex) in item.desc_img' :key='imgIndex' :src='imgItem'></image>
								</view>

								<view class='task-find-method-getfind fs24'>
									<view v-if='item.get_address && item.find_type!=3 && orderChildNavNum <=1 && item.find_type!=1'>
										<view class='fs28'>{{orderNavNum==2?'取料地址':'取样地址'}}: </view>

										<view>
											<text class="fs24">收货人 {{item.get_address.mobile||''}}</text> <text v-if="item.get_address.remark" class="remark">{{item.get_address.remark}}</text>
										</view>
										<view>
											<text class="fs24 text-999">{{item.get_address.address||''}} {{item.get_address.room||''}}</text>
										</view>
										<!-- <view style='word-break:break-all;'>
											{{item.get_address.consignee||''}} / {{item.get_address.mobile||''}}
										</view>
										<view class='text-999' style='word-break:break-all;'>
											{{item.get_address.stall||''}} 
										</view>-->
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

								<view class='order-footer-btn bt-2 cf' v-if="item.can_refuse==1||item.can_confirm==1||item.can_delete==1 ||item.can_comment==1 || item.distribution_id!='' || item.findman_id!=''">


									<button @click.stop='toReturn(item.id)' v-if='item.can_refuse==1'>申请退款</button>
									<button @click.stop='affirmOrder(item.id,index)' v-if='item.can_confirm==1' class='order-footer-btn-red'>确认收货</button>
									<button @click.stop='toComment(item.id)' v-if='item.can_comment==1'>评价</button>
									<button @click.stop='toDel(item.id)' v-if='item.can_delete==1'>删除</button>
									
									<button @click.stop='goChat(item)' v-if="orderNavNum == 0 && orderChildNavNum>0 && orderChildNavNum!=3 && orderChildNavNum!=4 && item.findman_id!=''">联系找料员</button>
									
									<button @click.stop='goChat(item)' v-if="orderNavNum == 0 && orderChildNavNum==3 && item.distribution_id!=''">联系配送员</button>
									
									<button @click.stop='goChat(item)' v-if="orderNavNum == 1 && (orderChildNavNum ==1 || orderChildNavNum ==2) && item.findman_id!=''">联系找料员</button>
									
									<button @click.stop='goChat(item)' v-if="orderNavNum == 1 && orderChildNavNum>2 && orderChildNavNum!=4 && item.distribution_id!=''">联系配送员</button>
									<!-- <view class="cancat flr" v-if="item.distribution_id">
										<image src="../../static/icon/concat.png"></image>
										<text>{{orderNavNum== 0?'联系找料员':'联系取料员'}}</text>
										<view class="btn-1" @click.stop="goChat"></view>
										<view class="btn-2" @click.stop="contact"></view>
									</view> -->
								</view>
								
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class='loding pdb-30' v-if="orderList.length>0">
				{{ !shopLoading ?'已经全部加载完毕':'正在加载中...'}}
			</view>
		</view>
		<!-- 填写取消订单原因model -->
		<!-- <dialog :title="请填写取消订单原因" v-if="!isDelModel" :confirm-text="提交" :cancel-text="取消" :bindconfirm="delConfirm"
		 bindcancel="delCancel">
			<input class='bt-1 lh50 pdt-30' type='text' placeholder='请填写取消订单的原因' @click='delModelInput'></input>
		</dialog> -->

		<view v-if="isCommentModel" class="comment-model">
			<view class="comment-model-bg"></view>
			<view class="comment-content">
				<view class="title">评价本次服务</view>
				<view class='star-warp pdt-30 pdb-30'>
					<view>
						找料满意度：
						<text @click='satisfact' v-for="(item, index) in starArr" :key="index" :data-idx='index' class="star iconfont icon-star"
						 :class="starIndex_1 >= index ? 'text-yellow':''"></text>
					</view>
					<view>
						配送及时性：
						<text @click='timely' v-for="(item, index) in starArr" :key="index" :data-idx='index' class="star iconfont icon-star"
						 :class="starIndex_2 >= index ? 'text-yellow':''"></text>
					</view>
				</view>

				<input class='input bt-1 lh50 pdt-30' v-if='isStarShow' type='text' placeholder='请输入评语' @input='commentModelInput'></input>

				<view class="btn flex">
					<view class="cancel flex-1" @click="commentCancel">取消</view>
					<view class="confirm flex-1" @click="commentConfirm">确定</view>
				</view>
			</view>
		</view>


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
				hasData:false,
				isSearch:false,  // 是否搜索刷新
				noRequestData:false, 	
				searchValue:'',    // 搜索关键字
				isStarShow: false, // 初始化评价评语
				starArr: [0, 1, 2, 3, 4], // 评价星星
				starIndex_1: 4, // 星星评价选中
				starIndex_2: 4, // 星星评价选中
				isDelModel: true, // 取消订单模态框
				commentId: '', // 评价订单ID
				isCommentModel: false, // 评价模态框 
				commentMsg: '', // 评价内容
				checkNavs: ['找料订单', '取料订单'],
				checkChildNavs: ['全部', '待找料','待确认', '待收货', '待评价', '已完成','找不到物料','退款'], // ['全部','取料中','待收货','待评价','已完成'],
				companyaddress: '', // 公司地址
				orderNavNum: 0, // nav一级切换
				orderChildNavNum: 0, //  nav二级切换
				shopLoading: true, // 载入动画
				orderList: [], // 页面数据
				page: 1, // 第几页
				scrolLeft:0,  //滚动位置
			};
		},
		onLoad(options) {
			
		},
		onShow() {
			
		},
		mounted() {
			
			// 获取公司地址
			this.getCompanyaddress();
			// 从个人中心跳转过来对应数据
			this.$data.orderNavNum = uni.getStorageSync('method') || 0;
			
			this.$data.checkChildNavs = this.$data.orderNavNum == 0 ?['全部', '待找料','待确认', '待收货', '待评价', '已完成','找不到物料','退款'] : ['全部', '待取料','待确认', '待收货', '待评价', '已完成','找不到物料','退款'];
			
			this.$data.orderChildNavNum = uni.getStorageSync('status') || 0;
			
			// 初始化获取找料列表
			this.getList(parseInt(this.$data.orderNavNum) + 1, this.$data.orderChildNavNum, this.$data.page);
		},
		methods: {
			// 取聊天室
			goChat(item){
				if(this.$data.orderNavNum == 0){
					uni.navigateTo({
						url:'/pages/chat/chat?id=' + item.findman_id + '&fmUserName='+item.findman_name
					})
				}else{
					uni.navigateTo({
						url:'/pages/chat/chat?id=' + item.distribution_id + '&fmUserName='+item.distribution_name
					})
				}
				
			},
			//  联系我们电话
			contact() {
				wx.makePhoneCall({
					phoneNumber: '400-8088-156'
				})
			},
			// 搜索
			doSearch(){
				this.$data.isSearch = true;
				this.$data.orderChildNavNum = 0;
				console.log(this.$data.searchValue);
				this.$data.scrolLeft = 0;
				if(this.$data.searchValue == ''){
					util.errorTips('搜索关键字不能为空');
					return false;
				}
				this.$data.page = 1;
				api.orderSearch({
					data:{
						page:this.$data.page,
						type:this.$data.orderNavNum + 1,
						keyword:this.$data.searchValue
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.orderList = [];
						this.$data.orderList = this.$data.orderList.concat(res.data);
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
						this.$data.shopLoading = res.data.length < 10 ? false : true;
						this.$data.noRequestData = res.data.length < 10? false:true;
					}
					
				})
			},
			// 去找料详情
			goOrderDetail(e) {
				
				let index = e.currentTarget.dataset.index;
				let id = e.currentTarget.dataset.id;
				let item = JSON.stringify(this.$data.orderList[index]);
				uni.navigateTo({
					url: '../orderDetail/orderDetail?id=' + id + '&nav=' + this.$data.orderNavNum + '&status=' + this.$data.orderChildNavNum
				})
			},
			// 确认收货
			affirmOrder(id,index) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认收货吗?',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							api.affirmOrder({
								method: 'POST',
								data: {
									id
								}
							}).then((res) => {
								console.log(res);
								if (res.code == 200 || res.code == 0) {
									_this.$data.orderList[index].can_confirm = 0;
									
									util.successTips('收货成功！');
								} else {
									util.errorTips(res.msg);
								}
							}).catch((res) => {
								util.errorTips(res.msg || res.message);
							})
							console.log('确认收货');

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			// 删除订单
			toDel(id) {
				let data = {
					id
				}
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认删除吗？',
					success: function(res) {
						if (res.confirm) {
							api.orderDel({
								method: 'POST',
								data
							}).then((res) => {
								if (res.code = 200 || res.code == 0) {
									for (let i = 0; i < _this.$data.orderList.length; i++) {
										if (_this.$data.orderList[i].id == id) {
											_this.$data.orderList.splice(i, 1);
										}
									}
									util.successTips('删除成功');
								} else {

								}
							}).catch((res) => {
								util.errorTips('网络慢,请稍后再试');
							})

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})


			},
			// 去评价
			toComment(id) {
				this.$data.commentMsg = ''; // 评价内容
				this.$data.isCommentModel = true; // 评价模态框
				this.$data.commentId = id; // 评价订单ID
			},
			// 获取评价内容
			commentModelInput(e) {
				this.$data.commentMsg = e.detail.value
			},
			// 取消评价模态框
			commentCancel() {
				this.$data.isCommentModel = false;
			},
			// 取消评价模态框并获取数据
			commentConfirm(e) {
				let data = {
					id: this.$data.commentId,
					star: this.$data.starIndex_1 + 1,
					star_ship: this.$data.starIndex_2 + 1,
					content: this.$data.commentMsg
				}
				api.toCommentOrder({
					method: 'POST',
					data
				}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						util.successTips('评价成功');
						this.$data.orderList.forEach((v, i) => {
							if (v.id == this.$data.commentId) {
								this.$data.orderList.splice(i, 1);
							}
						})
						this.$data.isCommentModel = false;
						this.$data.isStarShow = false;
						this.$data.starIndex_1 = 4;
						this.$data.starIndex_2 = 4;
						this.$data.commentMsg = '';
					} else {
						util.errorTips('评价失败!');
					}
				}).catch((res) => {
					util.errorTips(res.msg || res.message);
				})

			},
			// 设置找料满意度
			satisfact(e) {
				this.$data.starIndex_1 = e.target.dataset.idx
				this.$data.isStarShow = this.$data.starIndex_1 < 3 || this.$data.starIndex_2 < 3 ? true : false;
			},
			// 配送及时性
			timely(e) {
				this.$data.starIndex_2 = e.target.dataset.idx
				this.$data.isStarShow = this.$data.starIndex_1 < 3 || this.$data.starIndex_2 < 3 ? true : false;
			},

			// 去下单
			doOrder(index) {
				if(index == 1){ // 去找料订单
					uni.navigateTo({
						url:'../../../../find/find'
					})
				}else{          // 去取送订单
					uni.navigateTo({
						url:'../../../../fetch/fetch'
					})
				}
			},
			// 退款
			toReturn(id) {
				let data = {
					id
				}
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认退款吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							api.refuse({
								method: 'POST',
								data
							}).then((res) => {
								if (res.code = 200 || res.code == 0) {
									for (let i = 0; i < _this.$data.orderList.length; i++) {
										if (_this.$data.orderList[i].id == id) {
											_this.$data.orderList[i].can_refuse = 0;
										}
									}
								}
								util.successTips(res.msg);
							}).catch((res) => {
								util.errorTips(res.msg);
							})
						} else if (res.cancel) {
							//console.log('用户点击取消')
							util.errorTips('用户点击取消');
						}
					}
				})

			},
			// 二级切换
			checkChildNav(e) {
				this.$data.isSearch = false;
				let i = e.currentTarget.dataset.index;
				this.$data.orderChildNavNum = i;
				uni.setStorageSync('method',this.$data.orderNavNum);
				uni.setStorageSync('status',i);
				this.$data.orderList = [];
				this.$data.page = 1;
				this.getList(this.$data.orderNavNum + 1, i, this.$data.page);
				uni.pageScrollTo({
					scrollTop: 0
				});
			},
			// 一级nav切换
			checkNav(e) {
				this.$data.isSearch = false;
				let i = e.currentTarget.dataset.index;
				this.$data.orderNavNum = i;

				uni.setStorageSync('method',i);
				uni.setStorageSync('status',0);
				this.$data.checkChildNavs = i == 0 ?['全部', '待找料','待确认', '待收货', '待评价', '已完成','找不到物料','退款'] : ['全部', '待取料','待确认', '待收货', '待评价', '已完成','找不到物料','退款'];
				this.$data.orderList = [];
				this.$data.page = 1;
				this.$data.orderChildNavNum = 0;
				this.getList(i + 1, this.$data.orderChildNavNum, this.$data.page);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
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
						this.$data.orderList = this.$data.orderList.concat(res.data);
						
						this.$data.hasData = this.$data.orderList.length<=0? true: false;
						
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
						this.$data.shopLoading = res.data.length < 10 ? false : true;
						this.$data.noRequestData = res.data.length < 10? false:true;
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
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if(!this.$data.noRequestData){
				return false;
			}
			
			if(this.$data.isSearch){
				this.$data.page++;
				api.orderSearch({
					data:{
						page:this.$data.page,
						type:this.$data.orderNavNum + 1,
						keyword:this.$data.searchValue
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.orderList = this.$data.orderList.concat(res.data);
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
						res.data.length <= 0 ? this.$data.shopLoading = false : this.$data.shopLoading = true;
						this.$data.noRequestData = res.data.length < 10? false:true;
					}
					
				})
			}else{
				this.$data.page++;
				this.getList(this.$data.orderNavNum + 1, this.$data.orderChildNavNum, this.$data.page);
			}
			
		},
	}
</script>

<style lang="scss" scoped="true">
	.cancat{
		margin-right: 10upx;
		width: 360upx;
		// height: 100upx;
		position: relative;
		top: -20upx;
		text{
			position: absolute;
			top: 34upx;
			left: 38upx;
			font-size: 28upx;
			color: #F29800;
		}
		image{
			width: 360upx;
			height: 100upx;
			position: absolute;
			left: 0;
			top: 0;
		}
		.btn-1,.btn-2{
			width: 80upx;
			height: 100upx;
			position: absolute;
			top:0;
		}
		.btn-1{
			right: 28upx;
		}
		.btn-2{
			right: 120upx;
		}
		
	}
	.comment-model {
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		height: 100%;
		z-index: 999999999;

		.comment-model-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 750upx;
			height: 100%;
			background: #000;
			opacity: .8;
		}

		.comment-content {
			left: 55upx;
			width: 630upx;
			position: absolute;
			top: 300upx;
			background: #fff;
			text-align: left;

			border-radius: 10upx;

			.title {
				color: #333;
				font-size: 40upx;
				text-align: center;
				padding: 30upx;
			}

			.star-warp {
				padding: 30upx 30upx 30upx 60upx;
				font-size: 36upx;
				color: #999;
				margin: 10upx 0 20upx 0;

				view {
					height: 60upx;
					line-height: 60upx;
				}
			}

			.btn {
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				border-top: 1upx solid #eee;
				font-size: 40upx;
				color: #333;

				.confirm {
					border-left: 1upx solid #eee;
					color: limegreen;
				}
			}

			.input {
				margin: 0 55upx;
				font-size: 40upx;
				line-height: 80upx;
				height: 80upx;
				margin-bottom: 30upx;
			}

		}
	}

	// .ordder-top-hidden {
	// 	height: 30upx;
	// 	background-color: #efeff4;
	// 	position: fixed;
	// 	top: 0;
	// 	width: 100%;
	// 	z-index: 99;
	// }

	.order-nav {
		display: flex;
		position: relative;
	}
	.order-nav-1{
		.order-nav-1-warp{
			width: 1200upx;
			text-align: left;
			font-size: 30upx;
			height: 90upx;
			line-height: 90upx;
			view{
				padding: 0upx 30upx;
				font-size: 30upx;
				display: inline-block;
				position: relative;
				
			}
		}
		
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
		border-bottom: 1upx solid #F29800;
		font-size: 30upx;
		.line{
			position: absolute;
			width: 70%;
			height: 2upx;
			background: #F29800;
			left: 15%;
			bottom: 2rpx;
		
		}
	}

	// .nav-child-active::after {
	// 	content: '';
	// 	display: block;
	// 	width: 100upx;
	// 	height: 4upx;
	// 	background-color: #F29800;
	// 	position: absolute;
	// 	bottom: 0;
	// 	left: 50%;
	// 	margin-left: -50upx;
	// }

	.order-header {
		position: fixed;
		top: 0;
		width: 750upx;
		z-index: 999;
		background-color: #fff;
		border-bottom: 1upx solid #f4f4f4; 
		.search{
			height: 100upx;
			border-bottom: 1upx solid #f4f4f4;
			.warp{
				position: relative;
				
				image{
					width: 750upx;
					height: 100upx;
					position: absolute;
					top: 0;
					left: 0;
				}
				input{
					width: 500upx;
					position: absolute;
					top: 20upx;
					left: 100upx;
					height: 60upx;
					text-align: left;
					line-height: 66upx;
					z-index: 999;
				}
				text{
					position: absolute;
					display: block;
					width: 200upx;
					height: 100upx;
					right: 0;
					top: 0;
					z-index: 99999;
				}
			}
		}
	}

	.order-content {
		margin-top: 280upx;
		
		position: relative;
		border-top: 1upx solid #f4f4f4;
	}

	.task-find-title {
		line-height: 100upx;
		height: 100upx;
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
		width: 750upx;
		padding-left: 30upx;
		border-bottom: 1upx solid #eee;
		padding-bottom: 10upx;
	}

	.pdb-50 {
		padding-bottom: 50upx;
	}
	.ellipsis-1{
		width: 300upx;
		display: inline-block;
		position: absolute;
		left: 120upx;
		top: 4upx;
	}
	.float{
		position: absolute;
		right: 70upx;
		top: 4upx;
	}
	.task-find-item view {
		display: block;
		height: 50upx;
		line-height: 50upx;
		width: 750upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: relative;
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
		padding-left: 40upx;
	}

	.task-find-method-img image {
		width: 140upx;
		height: 140upx;
		margin-right: 38upx;
		margin-top: 30upx;
	}

	.task-find-price {
		position: absolute;
		bottom: 25upx;
		right: 30upx;
	}

	.task-find-method-getfind {
		padding: 10upx 30upx;
		view{
			line-height: 50upx;
		}
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
		margin-right: 20upx;
		width: 210upx;
		float: right;
		line-height: 60upx;
		font-size: 30upx;
		height:60upx;
		color: #F29800;
		background:#fff;
		border-radius:30upx;
		border: 1upx solid #F29800;
	}

	.order-footer-btn-red {
		border: 1upx solid #F29800 !important;
		color: #F29800;
	}

	.loding {
		text-align: center;
		color: #666;
		line-height: 100upx;
		margin-bottom: 100upx;
	}

	.star {
		margin-left: 20upx;
	}

	.no-order-data image {
		width: 114upx;
		height: 144upx;
		text-align: center;
		margin-top: 470upx;
	}

	.do-order {
		width: 240upx;
		height: 80upx;
		line-height: 80upx;
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
		top: -98upx;
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
	.task-find{
		border-top: 20upx solid #f4f4f4; 
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
