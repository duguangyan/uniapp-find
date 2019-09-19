<template>
	<view class="orde-detail">
		<view class='find-order-detail fs30'>
			<!-- 找料 -->
			<view>
				<view class='find-order-detail-top bb-20 lh120 fs30'>
					<!-- <image class='order-icon' src='../../public/images/order/order2.png'></image>  -->
					<text class='fs30 text-yellow'>{{itemObj.status_label}}</text>
				</view>

				<view class='find-order-detail-number fs30 pdl-30 bb-20 pdb-30' v-if='itemObj.can_delete ==1 || itemObj.can_comment == 1'>
					<view class='lh50'> 确认收货 : {{itemObj.finish_at }}</view>
					<view class='lh50'> 确认送达 : {{itemObj.shipping_at }}</view>
					<view class='lh50'> 找到物料 : {{itemObj.find_at }}</view>
				</view>

				<view class='find-order-detail-type bb-20 fs30'>
					<view class='lh50'>
						<text class="fs28">物料类型: </text>
						<text class="fs24 text-999 mgl-20">{{itemObj.cname}} </text>
						<text class='flr text-yellow fs24' v-if='itemObj.type == 1'>{{itemObj.find_type_label}}</text>
					</view>
					<view class='lh50 describe'>
						<text class=' fs28'>物料描述:</text> 
						<text class='ellipsis describe-content fs24 text-999 mgl-20'>{{itemObj.desc}}</text>
						<text class='flr text-yellow fs24'>费用:￥{{itemObj.fee}}</text>
					</view>
					<!-- <view class='lh50'>
						<text class="fs28">限时找料: </text>
						<text class="fs24 text-999 mgl-20">{{itemObj.limit_time_text}} </text>
					</view> -->
					
					<view class='lh50'>
						<text class="fs28">比价优选: </text>
						<text class="fs24 text-999 mgl-20"> 参考价格￥{{itemObj.reference_price}} </text>
					</view>
					
					<view class='task-find-method-img' v-if="itemObj.find_type == 1">
						<image v-for='(item, index) in itemObj.desc_img' :key='index' :src='item' :data-src="item" @click="previewImage"></image>
					</view>
				</view>

				<view class='type3' v-if="itemObj.find_type==3">
					<view class='fs30 title'>寄样地址: </view>
					<view v-for='(item, index) in companyaddress' :key='index' class='bb1 mg10 con find-order-detail-address bb1 fs30 pdl-30'>
						<!-- <view>
							<text class='remark' v-if='item.tag'>{{item.tag||''}}</text>
							<text>{{item.address}}</text>
						</view>
						<view class='text-999'>
							<view>
								{{item.consignee || ''}} / {{item.mobile || ''}}
							</view>
						</view>
						<view class='text-999'>
							{{item.desc}}
						</view> -->
						
						<view class='lh50 fs28' style='word-break:break-all;'>
							{{item.consignee}}  {{item.mobile||''}}
							<text class="mgl-20">{{item.stall}}</text>
							<text class='remark mgl-20' v-if='item.tag'>{{item.tag || ''}}</text>
						</view>
						<view class='lh50 fs24 text-999'>
							{{item.address||''}} {{item.name||''}} {{item.room||''}}
						</view>
						
					</view>
					<view class='text-red'>
						<text class='iconfont icon-gantan1'></text>寄样不支持到付,请客户自行承担寄样费用
					</view>
				</view>
				<view class='lh90 fs30 pdl-30' v-if='itemObj.get_address && itemObj.find_type!=3 && itemObj.find_type!=1'>
					{{itemObj.find_type==2?'取样地址':'取料地址'}}
				</view>
				<view class='find-order-detail-address bb1 fs30 pdl-30' v-if='itemObj.get_address && itemObj.find_type!=3&& itemObj.find_type!=1'>

					<view v-if='itemObj.get_address'>
						<view class='lh50 fs28' style='word-break:break-all;'>
							{{itemObj.get_address.consignee}}  {{itemObj.get_address.mobile||''}}
							<text class="mgl-20">{{itemObj.get_address.stall}}</text>
							<text class='remark mgl-20' v-if='itemObj.get_address.remark'>{{itemObj.get_address.remark || ''}}</text>
						</view>
						<view class='lh50 fs24 text-999'>
							{{itemObj.get_address.address||''}} {{itemObj.get_address.name||''}} {{itemObj.get_address.room||''}}
						</view>
						<!--
						<view class='lh50 text-999' style='word-break:break-all;'>
							{{itemObj.get_address.stall||''}}
						</view> -->
					</view>


					<view v-if='itemObj.get_address.length>1' class='mg10' v-for='(item, index) in itemObj.get_address' :key='index'>
						<view class='lh50 fs28' style='word-break:break-all;'>
							{{item.consignee}}{{item.mobile||''}}
							<text class='remark' v-if='item.tag'>{{item.tag || ''}}</text>
						</view>
						
						<view class='lh50 text-999'>
							{{item.address||''}}
						</view>
						
						<!-- <view class='lh50 text-999' style='word-break:break-all;'>
							{{item.desc||''}}
						</view> -->
					</view>
				</view>
				<view class='lh90 fs30 pdl-30' v-if='itemObj.shipping_address'>
					送料地址
				</view>
				<view class='find-order-detail-address bb-1 fs30 pdl-30' v-if='itemObj.shipping_address'>
					<view class='lh50  fs28' style='word-break:break-all;'>
						{{itemObj.shipping_address.consignee}} {{itemObj.shipping_address.mobile||''}}
						<text class="mgl-20">{{itemObj.shipping_address.stall}}</text>
						<text class='remark mgl-20' v-if='itemObj.shipping_address.remark'>{{itemObj.shipping_address.remark ||''}}</text>
					</view>
					<view class='lh50 text-999 fs24'>
						
						{{itemObj.shipping_address.city_str||''}} {{itemObj.shipping_address.address||''}}
						{{itemObj.shipping_address.room||''}}

					</view>
					
					<!-- <view class='lh50 text-999' style='word-break:break-all;'>
						{{itemObj.shipping_address.stall||''}}
					</view> -->
					
				</view>
				<view class="bb-20 pdl-30 lh100">
					<text class="fs28">配送方式 :</text> 
					<!-- 0：小鹿，1: 超出5公里，10公里内 2：物流到付', -->
					<text class="fs24 mgl-20 text-999" v-if="itemObj.shipping_type==2">物流到付</text>
					<text class="fs24 mgl-20 text-999" v-if="itemObj.shipping_type==1">送货上门</text>
					<text class="fs24 mgl-20 text-999" v-if="itemObj.shipping_type==0">送货上门</text>
				</view>
				<view class='find-order-detail-number fs30 pdl-30 pdb-30' style='margin-top:30rpx;'>
					<view class='lh50'>
						<text class="fs28">订单编号:</text>
						<text class="fs24 text-999 mgl-20"> {{itemObj.order_sn}}</text>
					</view>
					<view class='lh50'>
						<text class="fs28">下单时间:</text>
						<text class="fs24 text-999 mgl-20">{{itemObj.created_at}}</text>
					</view>
					<!-- <view class='lh50' v-if='itemObj.admin'>下 单 人 : {{itemObj.admin.real_name}}</view>
					<view class='lh50' v-if='itemObj.findman_name'> {{nav==1?'找 料 员':'取 料 员'}} : {{itemObj.findman_name}} <text v-if='itemObj.findman_mobile'>/
							{{itemObj.findman_mobile}}</text></view>
					<view class='lh50' v-if='itemObj.distribution_name'>
						配 送 员 : {{itemObj.distribution_name}} <text v-if='itemObj.distribution_mobile'>/
							{{itemObj.distribution_mobile}}</text></view>
					<view class='lh50' v-if="itemObj.express_sn && itemObj.express_sn!=''">物流单号: {{itemObj.express_sn}}</view>
					<view class='lh50' v-if="itemObj.express_company && itemObj.express_company!=''">物流公司:
						{{itemObj.express_company}}</view>
					<view class='lh50' v-if='itemObj.find_at'> 找到物料时间 : {{itemObj.find_at}}</view>
					<view class='lh50' v-if='itemObj.confirm_shipping_at'> 确认送达时间 : {{itemObj.confirm_shipping_at}}</view>
					<view class='lh50' v-if='itemObj.confirm_finish_at'> 客户确认收货时间 : {{itemObj.confirm_finish_at}}</view> -->
				</view>

				<!-- <view class='find-order-detail-price fs30 pdl-30 border-bottom pd-30'>
					<view v-if="userType!=2"><text>服务费用</text><text class='flr'>￥{{itemObj.fee}}</text></view>
					<view v-if="userType==2"><text>包月:使用次数</text><text class='flr'>{{itemObj.find_fee}}次</text></view>
				</view> -->
<!-- itemObj.can_comment==1|| -->
				<view class='find-order-detail-btn bt-1 cf'>
					<button @click='delOrder(itemObj.id)' v-if='itemObj.can_delete==1'>删除</button>
					<button @click='toComment(itemObj.id)' v-if='itemObj.can_comment==1'>评价</button>
					<button @click='toReturn(itemObj.id)' v-if='itemObj.can_refuse==1'>申请退款</button>
					<button @click='affirmOrder(itemObj.id)' v-if='itemObj.can_confirm==1' class='order-footer-btn-red'
					 :data-index="index">确认收货</button>
					<!-- <button :data-id='itemObj.findman_id' @click='goChat' v-if='itemObj.findman_id!=null && itemObj.can_comment!=1 && itemObj.can_delete!=1 &&itemObj.can_confirm!=1 && status!=2'
					 class='order-footer-btn-red order-chat'>
						{{nav==1?'联系找料员':'联系取料员'}}</button>
					<button :data-id='itemObj.distribution_id' @click='goChat' v-if='itemObj.distribution_id!=null && status==2' class='order-footer-btn-red order-chat'>
						联系配送员</button> -->
						<!-- <view v-if="itemObj.find_status !=''">
							<button v-if="status!=3 && itemObj.find_status!=5 && itemObj.type==1 && itemObj.findman_id!=''"  @click="goChat(itemObj)">联系找料员</button>
							<button v-if="itemObj.find_status!=5 && itemObj.type==2 && itemObj.findman_id!=''"  @click="goChat(itemObj)">联系找料员</button>
							
						</view>
						<view v-if="itemObj.distribution_status !=''">
							<button v-if="itemObj.distribution_status>1 && itemObj.distribution_status!=5 && itemObj.type==1 && itemObj.distribution_id !=''"  @click="goChat(itemObj)">联系配送员</button>
							<button v-if="itemObj.distribution_status>1 && itemObj.distribution_status!=5 && itemObj.type==2 && itemObj.distribution_id !=''"  @click="goChat(itemObj)">联系配送员</button>
						</view> -->
						
						<view class="cancat flr" v-if="itemObj.findman_id!='' || itemObj.distribution_id!=''">
							<image src="../../static/icon/concat.png"></image>
							<!-- <text>{{nav==1?'联系找料员':'联系取料员'}}</text> -->
				<!-- 			<text v-if="status!=3 && itemObj.find_status!=5 && itemObj.type==1 && itemObj.findman_id!=''"  @click="goChat(itemObj)">联系找料员</text>
							<text v-if="itemObj.find_status!=5 && itemObj.type==2 && itemObj.findman_id!=''"  @click="goChat(itemObj)">联系找料员</text>
							<text v-if="itemObj.distribution_status>1 && itemObj.distribution_status!=5 && itemObj.type==1 && itemObj.distribution_id !=''"  @click="goChat(itemObj)">联系配送员</text>
							<text v-if="itemObj.distribution_status>1 && itemObj.distribution_status!=5 && itemObj.type==2 && itemObj.distribution_id !=''"  @click="goChat(itemObj)">联系配送员</text> -->
							<text @click="goChat(itemObj)">{{itemObj.distribution_id!=''?'联系配送员':'联系找料员'}}</text>
							<view class="btn-1" @click="goChat(itemObj)"></view>
							<view class="btn-2" @click="contact(itemObj)"></view>
						</view>
						
						
						
				</view>
			</view>
			<!-- 取料 -->
		</view>
		
		<view class="status-2" v-if="itemObj.find_status>=4">
			<view class="li">
				<text class="fs28">物料描述:</text>  <text class="fs24 text-999 mgl-20">{{itemObj.result_desc}}</text>
			</view>
			<view class="li">
				<text class="fs28">物料单价:</text> <text class="fs24 text-999 mgl-20">￥{{itemObj.result_price}}</text>
			</view>
			<view class="li">
				<text class="fs28">物料数量:</text> <text class="fs24 text-999 mgl-20">{{itemObj.result_num}}</text>
			</view>
			<view class="li">
				<text class="fs28">大货配送费:</text>  <text class="fs24 text-999 mgl-20">￥{{itemObj.result_extra_fee}} ({{itemObj.result_big_num}} * {{big_price}})</text>
			</view>
			<view class="img cf" v-if="itemObj.result_img.length>0 && itemObj.result_img">
				<image class="fll" v-for="(item, index) in itemObj.result_img" :key="index" :src="item" mode=""></image>
			</view>
		</view>
		
		<view class='task-get cell-padding fs30 mgt-30 pay-type' v-if="itemObj.find_status==4">
			<view class='title'>选择支付方式</view>
			<view class='items'>
				<view class='item cf' v-for="(item, index) in payTypeList" :key="index" @click='payTypeCheck' :data-index='index'>
					<image class='fll' :src='item.icon'></image>
					<text class='fll mgl-20 text' v-if="item.title=='微信支付'">{{item.title}} </text>
					<text class='fll mgl-20 text' v-if="item.title=='余额'">{{item.title}} (￥{{balance}})</text>
					<text class='fll mgl-20 text' v-if="item.title=='支付宝支付'">{{item.title}}</text>
					<view class='flr check-btn'>
						<text v-if='payTypeCheckIndex == index' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
						<text v-if='payTypeCheckIndex != index' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
					</view>
				</view>
			</view>
		</view>
		
	<view style='height:140upx;' v-if="itemObj.find_status==4"></view>
	<view class='task-pay fs30 lh120' v-if="itemObj.find_status==4">
		<view class='flr task-paybtn' style='margin-right:240upx;'>
			应付款：
			<text class='text-red'>￥{{total_amount}}</text>
		</view>
		<button class='task-pay-btn text-underline' :disabled='isDisabled' @click='doPay'>支付</button>
	</view>
	<view style='height:120rpx;'></view>


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

	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				companyaddress:'',
				id:'',          // 订单ID
				commentId:'',   // 订单ID
				itemObj:'',     // 订单详情数据

				status: 1,
				nav: 1,
				isCommentModel: false, // 评价模态框 
				orderNav: 1,
				isDelModel: true, // 取消订单模态框
				delMsg: '', // 取消订单原因数据
				commentMsg: '', // 评价内容
				isStarShow: false, // 初始化评价评语
				starArr: [0, 1, 2, 3, 4], // 评价星星
				starIndex_1: 4, // 星星评价选中
				starIndex_2: 4, // 星星评价选中
				isDisabled: false,
				payDates: {},
				isOldPayPasswordModel: false, // 旧支付密码弹窗
				Length: 6, //输入框个数  
				isFocus: true, //聚焦  
				Value: "", //输入的内容  
				ispassword: true, //是否密文显示 true为密文， false为明文。
				payTypeList: [
					{
						icon: '../../static/icon/icon-balance.png',
						title: '余额'
					},
					{
						icon: '../../static/icon/wx.png',
						title: '微信支付'
					},
					{
						icon: '../../static/icon/zfb.png',
						title: '支付宝支付'
					}
				],
				payTypeCheckIndex:0,
				shipping_extra_price:0,  
				big_price:0,  // 大货配送费
				balance:'',
				total_amount:0
			};
		},
		onLoad(options) {
			console.log('options:',options);
			this.$data.commentId = options.id;
			this.$data.id = options.id;
			this.$data.status = options.status;
			this.$data.nav = options.nav;
			
			
		},
		onShow() {
			this.$data.orderNav = uni.getStorageSync('orderNav');
		    this.getData();
		    this.getCompanyaddress();
				this.getTaskFee();
				this.getUserAsset();
		},
		methods: {
			 previewImage: function (e) {
				var current = e.target.dataset.src;
				uni.previewImage({
				  current: current, // 当前显示图片的http链接
				  urls: this.$data.itemObj.desc_img || this.$data.itemObj.desc_img// 需要预览的图片http链接列表
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
						uni.navigateBack({
							delta:1
						})
						// this.$data.orderList.forEach((v, i) => {
						// 	if (v.id == this.$data.commentId) {
						// 		this.$data.orderList.splice(i, 1);
						// 	}
						// })
						// this.$data.isCommentModel = false;
						// this.$data.isStarShow = false;
						// this.$data.starIndex_1 = 4;
						// this.$data.starIndex_2 = 4;
						// this.$data.commentMsg = '';
					} else {
						util.errorTips(res.msg);
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
			// 获取余额
			getUserAsset(){
				api.getUserAsset({}).then((res)=>{
					if(res.code == 200 || res.code ==0){
						this.$data.balance = res.data.balance;
					}
				})
			},
			// 获取任务单价
			getTaskFee(){
				api.getTaskFee({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.shipping_extra_price = res.data.shipping_extra_price;
						this.$data.big_price = res.data.big_price;
					}
				})
			},
			
			// 取聊天室
			goChat(item){
				if(item.type == 1){
					uni.navigateTo({
						url:'/pages/chat/chat?fromUserId='+uni.getStorageSync('userInfo').id+'&toUserId=' + item.findman_id + '&name='+item.findman_name
					})
				}else{
					uni.navigateTo({
						url:'/pages/chat/chat?fromUserId='+uni.getStorageSync('userInfo').id+'&toUserId=' + item.distribution_id + '&name='+item.distribution_name
					})
				}
			},
			//  联系我们电话
			contact(item) {
				let data={
					id:item.id,
					type:item.type
				}
				api.apiPhoneUser({
					method:'POST',
					data
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						uni.makePhoneCall({
							phoneNumber: res.data
						})
					}else{
						util.errorTips(res.msg);
					}
				}).catch((res)=>{
					util.errorTips(res.msg)
				})
			},
			// 确认收货
			affirmOrder(id) {
			  let _this = this;
			  uni.showModal({
				title: '提示',
				content: '确认收货吗?',
				success: function (res) {
				  if (res.confirm) {
					api.affirmOrder({
					  method: 'POST',
					  data: {
						id
					  }
					}).then((res) => {
					  if (res.code == 200 || res.code == 0) {
						_this.$data.itemObj.can_confirm = 0;
						util.successTips('收货成功');
						// uni.showToast({
						//   title: '收货成功！',
						//   icon: 'none',
						//   duration: 2000,
						//   success(){
						// 	uni.navigateBack({
						// 	  delta: 1
						// 	})
						//   }
						// })
						
					  } else {
						  util.errorTips(res.msg)
					  }
					})
				  } else if (res.cancel) {
					util.errorTips("你点击了取消")
				  }
				}
			  })

			  console.log('确认收货');
			},
			// 取消订单
			delOrder(id) {
			  uni.showModal({
				title: '提示',
				content:"确认删除此订单？",
				confirmText: '确定',
				success: (res) => {
				  if (res.confirm) {
					api.orderDelete({
					  method: 'POST',
					  data:{
						id
					  }
					}).then((res) => {
					  if (res.code == 200 || res.code == 0) {
						uni.showToast({
						  title: '删除成功',  //标题  
						  icon: 'success',  //图标，支持"success"、"loading"  
						  success: function () {
							uni.navigateBack({
							  delta: 1
							})
						  }, //接口调用成功的回调函数  
						})

					  }
					})
				  } else if (res.cancel) {
					console.log('用户点击取消');
					util.errorTips("你点击了取消");
				  }
				}
			  })
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
				  success: function (res) {
					if (res.confirm) {
					  api.refuse({
						method: 'POST',
						data
					  }).then((res) => {
						if (res.code = 200) {
						  _this.$data.itemObj.can_refuse= 0;
						  _this.$data.itemObj.status_label = '申请退款';
							util.successTips(res.msg); 
						} else {
						  util.errorTips(res.msg);
						}
					  }).catch((res) => {
							util.errorTips(res.msg || res.message);
					  })
					} else if (res.cancel) {
					  console.log('用户点击取消')
					}
				  }
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
			// 获取数据
			getData(){
				  if (this.$data.id) {
					api.getOrderDetail({
					  data:{
						id: this.$data.id
					  }
					}).then((res) => {
						
					  if (res.code == 200 || res.code == 0) {
						let itemObj = res.data;
						if (itemObj.type == 1) {
						  itemObj.type_name = '按图找料'
						} else if (itemObj.type == 2) {
						  itemObj.type_name = '按样找料'
						} else if (itemObj.type == 3) {
						  itemObj.type_name = '按描述找料'
						}
						if (typeof itemObj.desc_img == 'string') {
						  let newFrontImg = [];
						  newFrontImg.push(itemObj.desc_img);
						  itemObj.desc_img = newFrontImg;
						}
						
						this.$data.itemObj      = itemObj;
						this.$data.total_amount = parseFloat(itemObj.result_fee) + parseFloat(itemObj.result_extra_fee);
					  }else{
						util.errorTips(res.msg);
					  }
					}).catch((res) => {
					  console.log(res.msg);
					})
				  }
				},
				
				// 优惠券选择
				payTypeCheck(e) {
					if(e.currentTarget.dataset.index == 2){
						util.errorTips('小程序暂不支持支付宝支付');
						return false;
					}
					this.$data.payTypeCheckIndex = e.currentTarget.dataset.index
				},
				// 支付
				doPay() {
					// 防止多次点击重复提交
					this.$data.isDisabled = true;
					let _this = this;
					// 支付方式  0：鹿币  1：余额  2：微信 
					if (this.$data.payTypeCheckIndex == 1) {
						console.log("微信支付");
						api.apiOrderPay({
							method: 'POST',
							data: {
								'id':this.$data.id,
								"type": "miniapp",
								"open_id": uni.getStorageSync('open_id'),
								'asset_type':"wx"
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
									let data = {
										'id':_this.$data.id,
										"type": "miniapp",
										"asset_type": "balance",
										'open_id': uni.getStorageSync('open_id'),
									}
				
									api.apiOrderPay({
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
				}
		}
	}
</script>

<style lang="scss" scoped>
	.remark {
		padding: 0 10upx;
		border: 1upx solid #F29800;
		color: #F29800;
		border-radius: 4upx;
	}
	.status-2{
		padding: 30upx;
		border-top: 1upx solid #f4f4f4; 
		background: #fff;
		.img{
			display: inline-block;
			margin: 20upx;
			image{
				width: 140upx;
				height: 140upx;
				display: inline-block;
				margin-right: 20upx;
			}
		}
		
	}
	.task-get{
		background: #fff;
		.item{
			border-top: 1upx solid #f4f4f4; 
		}
	}
	.cancat{
		margin-right: 10upx;
		margin-top: 10upx;
		width: 360upx;
		height: 100upx;
		position: relative;
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
			left: 0;
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
	.orde-detail{
		background: #eee;
	}
	.find-order-detail {
		background: #fff;
	}
	.type3 {
  border-bottom: 20rpx solid #eee; 
}
.type3 .text-red,.type3 .con{
  padding:30rpx;
}

.type3 .title{
  height: 90rpx;
  line-height: 90rpx;
  border-bottom: 1rpx solid #eee; 
  padding-left: 30rpx;
}
.order-icon{
  width: 42rpx;
  height: 40rpx;
  position: relative;
  top: 10rpx;
}
.find-order-detail-top{
  padding-left: 30rpx; 
}
.find-order-detail-type{
  padding: 20rpx 30rpx;
  position: relative;
}
.describe{
  position: relative;
  top: -5rpx;
}
.describe-title{
  position: absolute;
  top: 10rpx;
  letter-spacing:30rpx;
}
.describe-content{
  width: 300upx;
	display: inline-block;
	position: relative;
	top: 14upx;
}
.find-order-detail-describe{
  position: absolute;
  top: 20rpx;
}
.ellipsis-line3{
  width: 550rpx;
  display: inline-block;
  position: relative;
  top: 14rpx;
}
.address{
   position: relative;
}
.find-order-detail-address{
  padding-right:30rpx; 
  padding-bottom: 30rpx;
}
.find-order-detail-btn{
  width: 100%;
  height: 120rpx;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
}
.find-order-detail-btn button {
 margin-right: 20upx;
 width: 210upx;
 float: right;
 line-height: 60upx;
 font-size: 30upx;
 height:60upx;
 color: #F29800;
 // background:#F29800;
 border-radius:60upx;
 border: 1upx solid #F29800;
 margin-top: 30upx
}
.task-find-method-img{
}
.task-find-method-img image{
  width: 140rpx;
  height: 140rpx;
  margin-right: 30rpx;
  margin-top: 20rpx;
}

.order-chat{
  background: #F29800 !important;
  color: #fff !important;
}



.index-popup{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
.index-popup-bg{
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .7;
  position: absolute;
  left: 0;
  top: 0;
}
.index-popup-content{
  width: 700rpx;
  min-height: 330rpx;
  background-color: #fff;
  position: absolute;
  top: 20%;
  left: 25rpx;
  border-radius: 10rpx; 
}
.index-popup-title{
  height: 150rpx;
  line-height: 150rpx;
  font-size: 36rpx;
  text-align: center;
  position: relative;
}
.index-popup-main{
  font-size: 30rpx;
  padding: 20rpx 30rpx;
  border-bottom:1px solid #f4f4f4; 
}
.index-popup-main .index-popup-view-1{
  letter-spacing:9px;
  line-height:90rpx;
  height:90rpx;
  float:left;
}
.index-popup-main view:last-child{
  
}
.index-popup-main input{
  display: inline-block;
  height: 68rpx;
  line-height: 68rpx;
  width: 80rpx;
  border:1rpx solid #f4f4f4;
  border-radius:10rpx;
  padding-left: 20rpx; 
  margin: 0 20rpx; 
  margin-top: 10rpx;
}
.index-popup-check {
  padding: 0 80rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-bottom:1rpx solid #f4f4f4; 
}
.index-popup-check view{
  display: inline-block;
  margin-left: 30rpx;
  font-size: 30rpx;
}
.index-popup-check view:first-child{
  margin-left: 0;
}
.doSubmit{
  width: 350rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  margin: 0 auto;
  background-color: #c81a29;
  border-radius:20rpx;
  font-size: 30rpx;
  color: #fff; 
  margin-top: 60rpx;
}
.index-popup-btn view{
  display: inline-block;
  width: 256rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  margin-left: 60rpx;
  margin-top: 20rpx;
  border: 1rpx solid #f23030;
  border-radius:10rpx; 
}
.xuzhi {
  text-align: center;
  margin: 0 auto;
  margin-bottom: 30rpx;
  margin-top: 30rpx;
}
.xuzhi image{
  width: 35rpx;
  height: 35rpx;
  margin-right: 5rpx;
  position: relative;
  top: 8rpx;
}
.xuzhi text{

}
.notes-btn{
  margin-top: 30rpx;
  margin-bottom: 50rpx;
}
.notes-btn view{
  margin-left: 218rpx;
  background-color: #c81a29;
  color: #fff;
}
.notes-btn-content{
  height: auto;
  top: 25%;
}
.index-popup-main view{
  line-height: 50rpx;
}
.icon-del1{
  position: absolute;
  font-size: 60rpx;
  right: 10rpx;
  top: -30rpx;
  color: #999;
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
	
	.task-pay {
		width: 100%;
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
	
	.comment-model {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999999999;
	
		.comment-model-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
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
</style>
