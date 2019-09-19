<template>
	<view class="find-order">
		<view>
			<view class="fixed-block fs30">
				<view class="search">
					<view class="warp">
						<image src="../../static/icon/search-bg.png" mode=""></image>
						<input class="fs24" type="text" v-model="searchValue" placeholder="请输入关键字">
						<text class="btn" @click="doSearch"></text>
					</view>
				</view>
				<view class="select-section">
					<!-- <view class="flex select-order">
						<view @click='getOrderData' :data-nav="1" class="relative" :class="nav == 1 ? 'selected' : ''">找料订单</view>
						<view @click='getOrderData' :data-nav="2" class="relative" :class="nav == 2 ? 'selected' : ''">取料订单</view>
					</view> -->
					<scroll-view scroll-x="true" :scroll-left="scrolLeft" class="status-section find-section">
						<view v-for='(item, index) in navTexts' :key="index" @click='getOrderTypeData' :data-type="index">
						 <text  :class="status == index ? 'selected' : ''">{{item}}</text>
						 </view>
					</scroll-view>
				</view>
			</view>

			<view class="item-container">
				<!-- 订单数据为空 -->
				<view class="empty" v-if="orderList.length === 0">
					<image src="/static/icon/no_order.png"></image>
					<view class="tc">
						<text class="c999 fs34">您还没有相关订单</text>
					</view>
				</view>

				<view v-if="orderList.length > 0">

					<block v-for="(item, index) in orderList" :key="index">

						<view class="order-item">
							<view @click='seeDetail' :data-index="index" :data-id="item.id">
								<view class="flex order-status relative">
									<view style="width: 100%;">
										<view class="c999 fs30" style="width: 100%;">
											订单编号：<text class="fs24 text-666">{{item.order_sn}} </text>
											<text class="flr text-yellow">{{item.status_label}}</text>
										</view>
									</view>
									<!-- <view v-if="status == 1" class="new">
										<image src="../../images/new-1.png"></image>
									</view> -->
								</view>
								<view class="order-info fs30">
									<view class="order-info-left">

										<view class="flex align-item-start">
											<view class="flex-1">
												<view>
													物料品类：
													<text class="fs24 text-666">{{item.cname}}</text>
												</view>
												<view class="ellipsis">
													物料描述：<text class="fs24 text-666">{{item.desc}}</text>
												</view>
												<!-- <view class="ellipsis">
													限时找料：<text class="fs24 text-666">{{item.limit_time_text}}</text>
												</view> -->
												<view class="ellipsis">
													比价优选：<text class="fs24 text-666">参考价格:￥{{item.reference_price || '0.00'}}</text>
												</view>
											</view>
											<view class="item-right">
												<view>
													<text class="fs24 text-yellow" v-if="item.find_status == 1">按图找料</text>
													<text class="fs24 text-yellow" v-if="item.find_status == 2">上门取样</text>
													<text class="fs24 text-yellow" v-if="item.find_status == 3">寄送样品</text>
												</view>
												<view>
													<text class="fs24 text-yellow">金额: ￥{{item.fee}}</text>
												</view>
											</view>
											<!-- <view class="order-info-right">
												<image v-if="item.is_prompt == 1" src="../../images/reminder.png"></image>
												<image v-if="item.is_prompt != 1" :src="nav == 1 ? '../../images/find.png': '../../images/send.png'" />
											</view> -->

										</view>
										<!--图片找料  -->
										<view v-if="item.desc_img.length>0">
											<view class="order-pics-list">
												<image mode='scaleToFill' @click.stop='preview' v-for="(img, idx) in item.desc_img" :key="idx" :src="img"
												 :data-idx="idx" :data-index="index"></image>
											</view>
										</view>


										<!--按样取样  -->
										<!-- <view class="address-space" v-if="item.find_type == 2">
											<view>取料地址：</view>
											
											<view class="flex align-item-start lh42">
												<view class="fs26 c999 mgr30">{{item.get_address.consignee}} {{item.get_address.mobile}}</view>
												<view class="flex-1 fs26 c999">
													{{item.get_address.stall || ''}}
												</view>
											</view>
											<view class="fs26 lh42">
												<text v-if="item.get_address.remark" class="tag lh42">{{item.get_address.remark}}</text>
												{{item.get_address.city_str}} {{ item.get_address.address}}
											</view>
											
										</view> -->

										<!-- 送料地址 -->
										<view class="address-space" v-if="item.shipping_address">
											<view class="mgb-20">送料地址</view>

											<view class="flex align-item-start lh42 mgb-20">
												<!-- <text v-if="item.shipping_address.remark" class="tag lh42 mgl-20">{{item.shipping_address.remark}}</text> -->
												<view class="fs26 c999 mgr30"> {{item.shipping_address.consignee}} {{item.shipping_address.mobile}} <text class="mgl-20">{{item.shipping_address.stall}}</text></view>
												<!-- <view class="flex-1 fs26 c999">
													{{item.get_address.stall || ''}}
												</view> -->
											</view>
											<view class="fs26 lh42 text-666">
												{{item.shipping_address.city_str}} {{ item.shipping_address.address}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<!--按钮  -->
							<view class="flex flex-end order-handle">
								<!--找料中  -->
								<!-- <view v-if="status == 2" class="flex find-status">
									<view :data-type='2' :data-id="item.id" @click='showForm'>{{nav==1?'找':'取'}}不到物料</view>
									<view :data-type='1' :data-id="item.id" @click='showForm' class="ctheme warm-border">{{nav==1?'找':'取'}}到物料</view>
								</view> -->

								<view v-if="item.distribution_status == 2" class="flex find-status mgr-20" @click="receiptOrder(item.id)">
									<view>确认接单</view>
								</view>
								<view v-if="item.distribution_status == 3" class="flex find-status mgr-20" @click="serviceOrder(item)">
									<view>确认送达</view>
								</view>
								<!-- <view v-if="item.user_id!=''" class="flex find-status mgr-20" @click="goChat(item)">
									<view>联系客户</view>
								</view> -->
								
								<view class="cancat flr" v-if="item.user_id!=''">
									<image src="../../static/icon/concat.png"></image>
									<text>联系客户</text>
									<view class="btn-1" @click.stop="goChat(item)"></view>
									<view class="btn-2" @click.stop="contact(item)"></view>
								</view>
								
							</view>
						</view>
					</block>

					<view v-if="isFullLoad" class="tc fs24 c999 bg-base lh60 b600 isFullLoad">
						已经全部加载完毕
					</view>
					<view class="height200"></view>
				</view>
			</view>
		</view>
		<view v-if="formshow" class="pop-window" @touchmove="preventD">
			<!-- 填写地址 -->
			<view v-if="formtype =='1'" class="form-box-1">
				<text @click='close' class="iconfont icon-guanbi close"></text>
				<form @submit="formSubmit1" report-submit>
					<view class="fs34 b600 bdb lh120">请填写地址信息</view>
					<view class="flex tl bdb lh80">
						<view class="mgr20">
							<text class="ctheme"></text>　联系人: </view>
						<input name="consignee" class="flex-1" confirm-hold="true" confirm-type="next" placeholder='请填写联系人'></input>
					</view>
					<view class="flex tl bdb lh80">
						<view class="mgr20">
							<text class="ctheme"></text>联系电话: </view>
						<input name="mobile" type='number' maxlength="11" class="flex-1" confirm-hold="true" confirm-type="next"
						 placeholder='请填写详细电话'></input>
					</view>
					<view class="flex tl bdb lh80" bindtap='getMapAddress'>
						<view class="mgr20">
							<text class="ctheme"></text>地址: </view>
						<input name="address" v-model='address' maxlength="11" class="flex-1" confirm-hold="true" disabled='true'
						 confirm-type="next" placeholder='请填写地址'></input>
					</view>
					<view class="flex tl bdb lh80">
						<view class="mgr20">
							<text class="ctheme"></text>街道: </view>
						<input name="name" v-model='name' maxlength="11" class="flex-1" confirm-hold="true" confirm-type="next"
						 placeholder='请填写街道'></input>
					</view>
					<view class="flex tl bdb lh80">
						<view class="mgr20">
							<text class="room"></text>门牌号: </view>
						<input name="room" maxlength="11" class="flex-1" confirm-hold="true" confirm-type="next" placeholder='门牌号'></input>
					</view>
					<view class="flex tl bdb lh80">
						<view class="mgr20">
							<text class="room"></text>备注: </view>
						<input name="remark" maxlength="11" class="flex-1" confirm-hold="true" confirm-type="next" placeholder='备注'></input>
					</view>
					<view class="submit-box">
						<button formType="submit">提交</button>
					</view>
				</form>
			</view>
			<!-- 填写找不到物料原因 -->
			<view v-if="formtype == '2'" class="form-box-2" @touchmove="preventD">
				<text @click='close' class="iconfont icon-guanbi close"></text>
				<form @submit="formSubmit2" report-submit>
					<view class="fs34 b600">填写{{nav==1?'找':'取'}}不到物料原因</view>
					<view class="fs24 lh36">（多次{{nav==1?'找':'取'}}不到物料，将影响绩效考核，请谨慎操作！）</view>
					<textarea class="tl reason bdb bdt" :placeholder="'请填写'+nav==1?'找':'取'+'不到物料的原因'" name="remark" />
					<view class="submit-box">
                <button formType="submit">提交</button>
            </view>
        </form>
    </view>
    <!-- 回执信息 -->
    <view v-if="formtype == '3'" class="form-box-3">
        <text @click='close' class="iconfont icon-guanbi close pd20"></text>
        <form @submit="formSubmit3" report-submit>
            <view class="fs34 b600 bdb lh120">请填写回执信息</view>
            <view class="flex flex-start bdb form-add-img">
                <view>
                    <text class="ctheme">*</text>添加图片：</view>
                <upload id="upload" />
            </view>
            <view class="flex tl bdb lh60">
                <view class="mgr20 lh80">
                    <text class="ctheme">*</text>回执信息：</view>
                <input class="flex-1" name="back_info" confirm-type="done" placeholder='请填写回执信息'></input>
            </view>
            <view class="submit-box">
                <button formType="submit">提交</button>
            </view>
        </form>
    </view>
</view>

<view class="logistics-wap" v-if="isLogistics">
			<view class="bg" @click.stop='hideLogistics'></view>
			<view class="content">
				<view class="v1">
					<text>物流公司:</text>  <input type="text" :class="{ 'isiP': isiP }" v-model="express_name" placeholder="请输入物流公司名称">
				</view>
				<view class="v2">
					<text>联系电话:</text>  <input type="number" :class="{ 'isiP': isiP }" v-model="express_phone" placeholder="请输入物流公司电话">
				</view>
				<view class="v3" @click="logisticsSubmit">
					<text>物流单号:</text>  <input type="number" :class="{ 'isiP': isiP }" v-model="express_sn" placeholder="请输入物流单号">
				</view>
				<view class="btn" @click.stop="logisticsSubmit">提交</view>
				<view class="closeBtn" @click.stop="hideLogistics">
					<image src="/static/icon/closed_btn.png" mode=""></image>
				</view>
			</view>
		</view>


<view  v-if="showCon" class="modal-mask" @click="changeModalCancel">
    <view class="modal-dialog">
      <view class="modal-title">温馨提示</view>
      <view class="modal-content">
        获取定位失败，请前往设置打开定位权限
      </view>
      <view class="modal-footer">
        <view class="btn-cancel" @click.stop="changeModalCancel">取消</view>
        <button open-type="openSetting" class="btn-confirm button-on-view" style="padding:0upx;" @click.stop="changeModalCancel">设置</button>
      </view>
    </view>
  </view>
	</view>
</template>

<script>
	import api  from '../../../utils/api.js';
	import util from '../../../utils/util.js';
	export default {
		data() {
			return {
				searchValue:'',
				params: {
					task_type: 1,
					type: -1,
				},
			    page: 1,
			    status: 0,
			    multiIndex: [7, 0, 8],
			    orderList:[],
			    isFullLoad:false,
			    address:'',
			    name:'',
				navTexts:['全部','待接单','派送中','待收货','待评价','已完成'],
				isLogistics:false,
				express_name:'',
				express_phone:'',
				express_sn:'',
				result_img:'',
				isiP:false,
				scrolLeft:1
			};
		},
	
		onLoad(options) {
			
			uni.setNavigationBarTitle({
				title: "配送订单"
			})
			
			 switch(uni.getSystemInfoSync().platform){
				case 'android':
				   console.log('运行Android上')
				   break;
				case 'ios':
				   console.log('运行iOS上')
				   this.$data.isiP = true
				   break;
				default:
				   console.log('运行在开发者工具上')
				   break;
			}
			
		},
		onShow() {
			console.log('onShow')
			// 获取分类数据
			this.$data.status = wx.getStorageSync('status') || 0;
			this.$data.orderList = [] 
			
			  // 获取数据
			this.getMyOrders();
		},
		mounted(){
			console.log('mounted')
			// 获取分类数据
			this.$data.status = wx.getStorageSync('status') || 0;
			this.$data.orderList = [] 
			
			  // 获取数据
			this.getMyOrders();
		},
		methods: {
			
			// 搜索
			doSearch(){
				if(this.$data.searchValue == ''){
					util.errorTips('搜索关键字不能为空');
					return false;
				}
				api.apiStaffShipSearch({
					data:{
						keyword:this.$data.searchValue
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						if(res.data.length>0){
							this.$data.status = 0;
							this.$data.scrolLeft = 0;
							this.$data.orderList = [];
							this.$data.orderList = res.data;
						}else{
							util.errorTips('搜索不到相关数据')
						}
					}else{
						util.errorTips(res.msg)
					}
				}).catch((e)=>{util.errorTips(e.msg || e.message)})
			},
			
			logisticsSubmit(){
				if(this.$data.express_name == ""){
					util.errorTips('请填写物流公司');
					return false;
				}
				if(this.$data.express_phone == ""){
					util.errorTips('请填写物流电话');
					return false;
				}
				if(!util.vailPhone(this.$data.express_phone)){
					util.errorTips('请填写正确的电话');
					return false;
				}
				
				if(this.$data.express_sn == ""){
					util.errorTips('请填写物流单号');
					return false;
				}
				api.staffShipExpress({
					method:'POST',
					data:{
						id:this.$data.id,
						express_name:this.$data.express_name,
						express_phone:this.$data.express_phone,
						express_sn:this.$data.express_sn,
						express_img:this.$data.result_img
					}
				}).then((res)=>{
					if(res.code == 0 || res.code == 200){
						this.$data.isLogistics = false;
						this.$data.orderList = [] 
						  // 获取数据
						this.getMyOrders();
					}else{
						util.errorTips(res.msg);
					}
				}).catch((res)=>{
					util.errorTips(res.msg || res.meessage);
				})
			},
			hideLogistics(){
				this.$data.isLogistics = false;
			},
			// 送达
			serviceOrder(item){
				let _this = this;
				let id = item.id;
				let shipping_type = item.shipping_type;
				this.$data.result_img = item.result_img[0];
				this.$data.id = item.id;
				uni.showModal({
					title: '提示',
					content: '确认送达?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if(shipping_type != 2 ){ // 送货上门
								api.staffShipConfirm({
									method:'POST',
									data:{
										id
									}
								}).then((res)=>{
									if(res.code == 0 || res.code == 200){
										_this.$data.orderList = [] 
										  // 获取数据
										_this.getMyOrders();
									}
								})
							}else{  // 物流
								_this.$data.isLogistics = true;
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			// 联系客户
			contact(item){
				let data={
					id:item.id,
					type:2
				}
				api.apiPhoneStaff({
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
			
			// 取聊天室
			goChat(item){
				
				uni.navigateTo({
					url:'/pages/chat/chat?fromUserId='+uni.getStorageSync('userInfo').id+'&toUserId=' + item.user_id + '&name=客户'
				})
			},
			// 搜索
			// doSearch(){
			// 	
			// 	this.$data.scrolLeft = 0;
			// 	if(this.$data.searchValue == ''){
			// 		util.errorTips('搜索关键字不能为空');
			// 		return false;
			// 	}
			// 	this.$data.page = 1;
			// 	api.staffShipSearch({
			// 		data:{
			// 			page:this.$data.page,
			// 			keyword:this.$data.searchValue
			// 		}
			// 	}).then((res)=>{
			// 		if(res.code == 200 || res.code == 0){
			// 			this.$data.orderList = [];
			// 			this.$data.status = 0;
			// 			this.$data.orderList = this.$data.orderList.concat(res.data);
			// 		}
			// 	})
			// },
			
			// 确认接单
			receiptOrder(id){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定接单?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							api.staffShipGet({
								method:'POST',
								data:{
									id
								}
							}).then((res)=>{
								if(res.code == 200 || res.code == 0){
									//_this.$data.status = 2; // 状态2 已接单
									_this.$data.orderList = [] ;
									
									  // 获取数据
									_this.getMyOrders();
									util.successTips("接单成功");
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			// 获取数据
			  getMyOrders(){
				  let s  = 0;
				  if(this.$data.status >= 1){
					  s =  this.$data.status+1;
				  }
				   api.myOrderShipList({
					 data: {
						 page: this.$data.page,
						 status:s
					 }
				   }).then((res) => {
					   if(res.code == 200 || res.code == 0){
						   if(res.data.length <10) this.$data.isFullLoad = true;
						   this.$data.orderList = this.$data.orderList.concat(res.data);
					   }else{
						   // if(res.msg == "您不是配送员"){
							  //  uni.navigateTo({
							  //  	url:'/pages/login/login?from='+ uni.getStorageSync('userType')
							  //  })
						   // }
					   }
				   }).catch((res)=>{
					   util.errorTips(res.msg || res.message)
				   })
				
			  },
			  
			  // 大类选择
				getOrderData(e) {
					this.$data.nav = e.currentTarget.dataset.nav;
					uni.setStorageSync('nav',this.$data.nav);
					uni.setStorageSync('status', 0);
					this.$data.isFullLoad = false;
					this.$data.page = 1;
					this.$data.status = 1;
					this.$data.orderList = [];
					
					this.getMyOrders()
				},
				// 获取下栏目数据
				getOrderTypeData(e) {
					this.$data.status = e.currentTarget.dataset.type;
					uni.setStorageSync('status', this.$data.status);
					this.$data.page = 1;
					this.$data.isFullLoad = false;
					this.$data.orderList = [];
					this.getMyOrders()
				},
				
				// 查看详情
				seeDetail(e) {
				  let index = e.currentTarget.dataset.index;
				  let id = e.currentTarget.dataset.id;
				  uni.navigateTo({
					url: "../index/fetchPage/fetchOrderDetail/fetchOrderDetail?id="+id
				  })
					
				},

				// 预览图片

				preview(e) {
					let index = e.currentTarget.dataset.index;
					let idx = e.currentTarget.dataset.idx;
				    let imgs = this.$data.orderList[index].desc_img;
					uni.previewImage({
						current: imgs[idx], // 当前显示图片的http链接
						urls: imgs // 需要预览的图片http链接列表
					})
				},
		},
		onPullDownRefresh: function () {
			this.$data.page++;
			this.getMyOrders();
			uni.stopPullDownRefresh()
		},
		onReachBottom: function () {
		  if (!this.$data.isFullLoad){
			this.$data.page++;
			this.getMyOrders();
		  }
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f4f4f4;
	}
	.height200{
		height: 200upx;
		background: #f4f4f4;
	}
	.cancat{
		margin-right: 10upx;
		width: 360upx;
		height: 100upx;
		position: relative;
		top: 0upx;
		text{
			position: absolute;
			top: 34upx;
			left: 60upx;
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
	.empty{
		image{
			width: 180upx;
			height: 240upx;
		}
	}
	.align-item-start{
		position: relative;
		.item-right{
			position: absolute;
			right: 30upx;
			top: 0upx;
			view{
				text-align: right;
				margin-bottom: 20upx;
			}
		}
	}
	.find-order{
		background: #f4f4f4;
		height: 100%;
	}
	.isFullLoad{
		text-align: center;
		line-height: 80upx;
		background: #f4f4f4;
	}
.empty{
	text-align: center;
	margin-top: 100upx;
}
.fixed-block {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 999;
    background: #f0eff5;
}
.form-box-1 .mgr20{
  width: 150upx;
  text-align: right;
}
.select-section {
 
    background: #fff;
    color: #333;
    line-height: 82upx;
    border-bottom: 1upx #ddd solid;
}

.select-order view {
    flex: 1;
    text-align: center;
    border-bottom: 4upx #ddd solid;
}

.select-order view:nth-of-type(1) {
    border-right: 2upx #ddd solid;
}

.status-section {
    padding-bottom: 2upx;
    white-space: nowrap;
}

.status-section view {
    display: inline-block;
    height: 82upx;
    box-sizing: border-box;
    padding: 0 20upx;
    width:25%;
    text-align:center;
}

/*增加数量,减少边距  */

/* .status-section.find-section {
    padding: 0 10px;
} */

.status-section.find-section view {
    padding: 0 10upx;
}

.status-section view .selected, .select-order view .selected{
    color: #F29800;
    border-bottom: 4upx #F29800 solid;
	padding-bottom: 16upx;
}

.item-container {
    padding: 200upx 0 30upx;
	text-align: left;
}

/*订单块 S */

.order-item {
    background: #fff;
	border-top: 1upx solid #eee;
	border-bottom: 20upx solid #f4f4f4;
}

.order-status {
    padding: 28upx 45upx 28upx 40upx;
}

/*new 标志  */

.new {
    position: absolute;
    right: 0upx;
    top: -2upx;
    z-index: 10;
}

.new image {
    width: 50upx;
    height: 50upx;
}

.order-info {
    padding: 24upx 20upx 10upx 40upx;
    border-top: 1upx #eee solid;
    border-bottom: 1upx #eee solid;
}

.order-info-left {
    /* width: 430upx; */
}

.order-pics-list {
    padding-top: 20upx;
	width: 100%;
	position: relative;
	left: -40upx;
}

.order-pics-list image {
    width: 140upx;
    height: 140upx;
    margin-left: 40upx;
	margin-top: 20upx;
    background: #ccc;
    border-radius: 4upx;
}

/*地址边框,边距  */

.address-space {
    padding: 10upx 0;
    border-top: 1upx #eee solid;
	margin-top: 30upx;
}

/*标签tag  */

.tag {
    color: #F29800;
    padding: 2upx 4upx;
    border: 1px #F29800 solid;
    border-radius: 6upx;
}

.order-info-right {
    padding: 0 28upx;
}

.order-info-right image {
    width: 126upx;
    height: 126upx;
}

.order-handle {
    height: 120upx;
}

.find-status view {
    line-height: 60upx;
    min-width: 180upx;
    border-radius: 30upx;
    border: 1upx rgba(242,152,0,1) solid;
    margin-left: 30upx;
    font-size: 28upx;
	color: rgba(242,152,0,1);
    text-align: center;
}

.find-status view.warm-border {
    border: 1upx #c91a29 solid;
}

/*订单块 E  */

.modal-mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-dialog {
      width: 540upx;
      overflow: hidden;
      z-index: 9999;
      background: #f9f9f9;
      border-radius: 5upx;
    }
    .modal-title {
      padding-top: 30upx;
      font-size: 32upx;
      color: #030303;
      text-align: center;
    }
    .modal-content {
      padding: 20upx 32upx;
      font-size: 28upx;  
    }
    .modal-footer {
      display: flex;
      flex-direction: row;
      height: 86upx;
      border-top: 1px solid #dedede;
      font-size: 34upx;
      line-height: 86upx;
    }
    .btn-cancel {
      width: 50%;
      color: #abb4bd;
      text-align: center;
      border-right: 1px solid #dedede;
    }
    .btn-confirm {
      width: 50%;
      color: #6fb64b;
      text-align: center;
      font-weight: 500;
    }
.search{
			height: 100upx;
			border-bottom: 1upx solid #f4f4f4;
			.warp{
				position: relative;
				
				image{
					width: 100%;
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
		
		.logistics-wap{
			position: fixed;
			left: 0;
			top : 0;
			width: 100%;
			height: 100%;
			.content{
				width: 450upx;
				height: 450upx;
				position: absolute;
				left: 130upx;
				top : 200upx;
				background: #fff;
				z-index: 99999;
				border-radius: 10upx;
				padding: 50upx;
				margin-top: 20upx;
				.closeBtn{
					position: absolute;
					top: 0upx;
					right:20upx;
					width: 40upx;
					height: 40upx;
					z-index: 999999;
					image{
						width: 40upx;
						height: 40upx;
					}
				}
				.btn{
					width:436upx;
					height:64upx;
					line-height: 64upx;
					text-align: center;
					background:rgba(242,152,0,1);
					border-radius:8upx;
					font-size: 32upx;
					margin: 0 auto;
					color: #fff;
					position: relative;
					top: 60upx;
				}
				view{
					line-height: 100upx;
					text{
						display: inline-block;
						font-size: 32upx;
					}
					input{
						display: inline-block;
						border: 1upx solid #f4f4f4;
						padding-left: 20upx;
						margin-left: 30upx;
						position: relative;
						top: 20upx;
						width: 250upx;
						background: #f4f4f4;
						color: #333;
						border-radius: 10upx;
						position: relative;
						top: 20upx;
						text-align: left;
					}
					.isiP{
						top: -4upx;
					}
					
				}
				
			}
			.bg{
				width  : 100%;
				height : 100%;
				background : #000;
				opacity    : .6;
			}
		}
</style>
