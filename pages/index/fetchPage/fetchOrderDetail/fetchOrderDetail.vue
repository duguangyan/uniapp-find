<template>
	<view class="find-order-detail">
		<view class="container tl">
			<!--顶部订单状态展示  -->
			<view class="b500 tl padding lh60 text-yellow">
				{{detailData.status_label}}
			</view>
			<view class="padding fs30">
				<view>
					<text class="c999"> 物料类型：</text>
					<text class="text-666 fs24">{{detailData.cname}}</text>
				</view>
				
				<view class="flex">
					<view class="c999">物料描述：</view>
					<view class="flex-1 text-666 fs24">{{detailData.desc}}</view>
				</view>
				<!-- <view class="flex">
					<view class="c999">限时找料：</view>
					<view class="flex-1 text-666 fs24" v-if="detailData.is_limit == 1">三小时</view>
				</view> -->
				<view class="flex">
					<view class="c999">比价优选：</view>
					<view class="flex-1 text-666 fs24">参考价格 ￥ {{detailData.reference_price || '0.00'}}</view>
				</view>
				<view>
					<view class="flex flex-start pdb30 image">
						<!--遍历图片  -->
						<image @click='preview' v-for="(img, idx) in detailData.desc_img" :src="img"
						 :data-idx="idx" :key="idx"
						 mode='aspectFill'></image>
					</view>
				</view>

				<view class="item-right fs24 text-yellow">
					<view class="c999"> {{detailData.find_type_label}}</view>
					<view class="c999"> 费用:￥{{detailData.fee}}</view>
				</view>
			</view>

			<!--取样地址  -->
			<view class="top20"></view>
			<view class="get-address" v-if="detailData.get_address">
				<view class="t1 fs28">取料地址</view>
				<view class="t2 fs24">
					<text>{{detailData.get_address.consignee}} {{detailData.get_address.mobile}}</text>
					<text class="mgl-20" v-if="detailData.get_address.stall">{{detailData.get_address.stall}}</text>
					<!-- <text class="stall">xxx</text> -->
				</view>
				<view class="t3 fs24 text-999">
					{{ detailData.get_address.address}}
				</view>
			</view>
			<!--送料地址  -->
			<view class="get-address" v-if="detailData.shipping_address">
				<view class="t1 fs28">送料地址</view>
				<view class="t2 fs24">
					<text>{{detailData.shipping_address.consignee}} {{detailData.shipping_address.mobile}}</text>
					<text class="mgl-20" v-if="detailData.shipping_address.stall">{{detailData.shipping_address.stall}}</text>
					<!-- <text class="stall">xxx</text> -->
				</view>
				<view class="t3 fs24 text-999">
					{{ detailData.shipping_address.address}}
				</view>
			</view>

			<view class="pdl-30 bt-1 lh100">
				<text class="fs28">配送方式:</text>
				<!-- 0：小鹿，1: 超出5公里，10公里内 2：物流到付' -->
				<text class="fs24 text-999 mgl-20" v-if="detailData.shipping_type ==0">小鹿</text>
				<text class="fs24 text-999 mgl-20" v-if="detailData.shipping_type ==1">超出5公里，10公里内</text>
				<text class="fs24 text-999 mgl-20" v-if="detailData.shipping_type ==0">物流到付</text>
			</view>
			
			<view class="pdl-30 bt-1 top20 order_sn">
				<view>
					<text class="fs28">订单编号:</text> <text class="fs24 text-999 mgl-20">{{detailData.order_sn}}</text>
				</view>
				<view>
					<text class="fs28">下单时间:</text> <text class="fs24 text-999 mgl-20">{{detailData.created_at}}</text>
				</view>
			</view>
			
			<view class="order-info" v-if="detailData.distribution_status == 3">
				<view class="desc cf">
					<view class="t1 fll"><text class="text-red">*</text> <text>描述:</text> </view>
					<view class="t2 fll">
						<textarea v-if="!isLogistics && !formShow" v-model="detailData.result_desc" :disabled="disabled"  placeholder="(注:请详细描述物料的名称、用途、材质、交货时间)" />
					</view>
				</view>
				<view class="upload">
					<view class="t1 fs28"><text class="text-red">*</text> <text>上传图片:</text></view>
					<view class="t2">
						<view class="desc_img">
							<image v-for="(item, index) in detailData.result_img" :key="index" :src="item" mode=""></image>
						</view>
					</view>
				</view>
				<view class="supplier cf">
					<view class="fll t1 fs28">
						<text class="text-red">*</text><text>配送员:</text>
					</view>
					<view class="t2 fll">
						<view>{{detailData.distribution_name}}</view>
					</view>
				</view>
				
				<view class="price cf">
					<view class="t1 fll">
						<text class="text-red">*</text><text>物料单价:</text>
					</view>
					<view class="t2 fll">
						<view>{{detailData.result_price}}</view>
					</view>
				</view>
				
				<view class="mun1 cf fs28">
					<view class="t1 fll">
						<text class="text-red">*</text><text>物料数量:</text>
					</view>
					<view class="t2 fll">
						<!-- <uni-number-box :min="0" :value="result_num" :max="99999" @change="bindChange1"></uni-number-box> -->
						<text>{{detailData.result_num}}</text>
						<text class="piece"> 件</text>
					</view>
					
				</view>
				
				<view class="mun2 cf fs28">
					<view class="t1 fll">
						<text class="text-red" style="opacity: 0;">*</text><text>大货数量:</text>
					</view>
					<view class="t2 fll">
						<text>{{detailData.result_big_num}}</text> <text class="piece"> 件</text>
						<text class="text-red mgl-20"> * ￥{{big_price}}</text>
						
					</view>
				</view>
				<view class="cost">
					<text class="t1 fs28">合计费用:</text>
					<text class="t2 mgl-20 text-red">￥ {{totalFee}}</text>
				</view>
			</view>
			
			<view class="status-2" v-if="detailData.distribution_status>=4">
				<view class="li">
					<text class="fs28">物料描述:</text> <text class="fs24 text-999 mgl-20">￥{{detailData.result_desc}}</text>
				</view>
				<view class="li">
					<text class="fs28">物料单价:</text> <text class="fs24 text-999 mgl-20">￥{{detailData.result_price}}</text>
				</view>
				<view class="li">
					<text class="fs28">物料数量:</text> <text class="fs24 text-999 mgl-20">{{detailData.result_num}}</text>
				</view>
				<view class="li">
					<text class="fs28">大货配送费:</text>  <text class="fs24 text-999 mgl-20">￥{{detailData.result_extra_fee}} ({{detailData.result_big_num}} * {{big_price}})</text>
				</view>
				<view class="img cf" v-if="detailData.result_img.length>0 && detailData.result_img">
					<image class="fll" v-for="(item, index) in detailData.result_img" :key="index" :src="item" mode=""></image>
				</view>
			</view>
			
			<view class="evaluate pd-30 bt-1" v-if="detailData.distribution_status == 6">
				<view class="v1">
					<text class="fs28">找料服务:</text>
					<text class="mgl-20">
						<text v-for="i in detailData.find_star" :key="i" class="star iconfont icon-star text-yellow"></text>
					</text>
				</view>
				<view class="v1">
					<text class="fs28">配送服务:</text>
					<text class="mgl-20">
						<text v-for="i in detailData.dist_star" :key="i" class="star iconfont icon-star text-yellow"></text>
					</text>
				</view>
				<view class="v1">
					<text class="fs28">服务反馈:</text>
					<text class="fs24 text-999 mgl-20">{{detailData.comment}}</text>
				</view>
			</view>
			
			
			<view class="flex-end order-handle cf">
				<!--找料中  -->
				<!-- <view v-if="detailData.distribution_status == 3" class="flex find-status flr mgr-20">
					<view :data-type='1' :data-id="detailData.id" @click='submit' class="ctheme warm-border ">提交信息</view>
				</view>
				<view v-if="detailData.distribution_status == 3" class="flex find-status flr">
					<view :data-type='2' :data-id="detailData.id" @click='showForm'>{{detailData.type==1?'找':'取'}}不到物料</view>
				</view> -->
				
		
				<!-- <view v-if="detailData.user_id != ''" class="find-status flr" @click="goChat(detailData)">
					联系客户
				</view> -->
				
				<view class="cancat flr" v-if="detailData.user_id != ''">
					<image src="/static/icon/concat.png"></image>
					<text>联系客户</text>
					<view class="btn-1" @click="goChat(detailData)"></view>
					<view class="btn-2" @click="contact(detailData)"></view>
				</view>
				<view v-if="detailData.distribution_status == 2" class="find-status flr" @click="receiptOrder(detailData.id)">
					确认接单
				</view>
				<view v-if="detailData.distribution_status == 3" class="find-status flr" @click="serviceOrder(detailData.id)">
					确认送达
				</view>
			</view>

			<!-- <button :data-id='detailData.user_id' @click='goChat' class='order-footer-btn-red order-chat'>
				联系客户</button>
			<view class='height40'></view> -->
		</view>
		
		<!-- 填写找不到物料原因 -->
		<view v-if="formShow"  class="pop-window">
			<view class="form-box-2">
				<text @click.stop='close' class="iconfont icon-guanbi close"></text>
				<view >
					<view class="fs34 b600">填写原因</view>
					<textarea class="tl reason bdb bdt textarea" v-model="remark" :placeholder="detailData.type==1?'请填写找不到物料的原因':'请填写取不到物料的原因'" />
					<view class="submit-box flex bt-1">
						<view class="flex-1 fs28" @click.stop='close'>
							取消
						</view>
						<view class="flex-1 fs28 sub" @click.stop="unFormSubmit">
							提交
						</view>
						
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="logistics-wap" v-if="isLogistics">
			<view class="bg" @click.stop='hideLogistics'></view>
			<view class="content">
				<view class="v1">
					<text>物流公司:</text>  <input type="text" v-model="express_name" placeholder="请输入物流公司名称">
				</view>
				<view class="v2">
					<text>联系电话:</text>  <input type="number" v-model="express_phone" placeholder="请输入物流公司电话">
				</view>
				<view class="v3" @click="logisticsSubmit">
					<text>物流单号:</text>  <input type="number" v-model="express_sn" placeholder="请输入物流单号">
				</view>
				<view class="btn" @click.stop="logisticsSubmit">提交</view>
				<view class="closeBtn" @click.stop="hideLogistics">
					<image src="/static/icon/closed_btn.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../../../utils/api.js";
	import util from "../../../../utils/util.js";
	import upload from "../../../../components/upload.vue";
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	import dialog from "@/components/dialog.vue";
	export default {
		components: {
			upload,uniNumberBox,dialog
		},
		data() {
			return {
				isLogistics:false,
				disabled:true,
				totalCost: 0,     // 合计费用
				result_num:0,     // 物料数量
				result_big_num:0, // 大货数量
				orderItem: '',
				index: 1,
				upLoadMaxNum:9,
				files:[],
				id: '',
				detailData:'',
				result_desc:'',  // 物料描述
				big_price:0,     // 大货单价
				result_price:0,         // 物料单价
				supplier:'',     // 供应商
				list: [       //要展示的数据
					
				],
				supplier_id:'',
				isCheckSupplier: false, 
				formShow:false,
				remark: '',    // 找不到物料原因
				
				express_name :'',
				express_phone:'',
				express_sn   :'',
				totalFee:''
			};
		},
		onLoad(options) {
			this.$data.id = options.id;
			
			this.getTaskFee();
		},
		onShow() {

		},
		methods: {
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
			
			logisticsSubmit(){
				if(this.$data.express_name == ""){
					util.errorTips('请填写物流公司');
					return false;
				}
				if(this.$data.express_phone == ""){
					util.errorTips('请填写物流电话');
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
						express_img:this.$data.detailData.result_img[0]
					}
				}).then((res)=>{
					if(res.code == 0 || res.code == 200){
						this.$data.isLogistics = false;
						this.$data.detailData.distribution_status = 4;
						this.$data.detailData.status_label = '确认送达';
						uni.navigateBack({
							delta:1
						})
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
			serviceOrder(id){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认送达?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if(_this.$data.detailData.shipping_type != 2 ){ // 送货上门
								api.staffShipConfirm({
									method:'POST',
									data:{
										id
									}
								}).then((res)=>{
									if(res.code == 0 || res.code == 200){
										_this.$data.detailData.distribution_status = 4;
										_this.$data.detailData.status_label = '确认送达';
										uni.navigateTo({
											url:'../../pages/index'
										})
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
									_this.$data.status = 2; // 状态2 已接单
									util.successTips("接单成功");
									_this.detailData.distribution_status = 3;
									uni.navigateBack({
										delta:1
									})
								}else{
									util.errorTips(res.msg);
								}
							}).catch((res)=>{
								util.errorTips(res.msg);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			showForm(){
				this.$data.formShow = true;
			},
			
			unFormSubmit(){
				if(this.$data.remark == ""){
					util.errorTips('请填写未找到料的原因');
					return false;
				}
				let data = {
					id:this.$data.id,
					remark:this.$data.remark
				}
				api.staffFindUnfound({
					method:'POST',
					data
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.formShow = false;
						uni.navigateTo({
							url:'../../pages/index'
						})
					}
				})
			},
			// 关闭弹窗
			close() {
				this.$data.formShow = false;
			},
			// 提交信息
			submit(){
				if(this.$data.result_desc == ""){
					util.errorTips('描述不能为空');
					return false;
				}
				if(this.$data.files.length<=0){
					util.errorTips('至少上传一张图片');
					return false;
				}
				if(this.$data.supplier_id == ''){
					util.errorTips('请选择供应商');
					return false;
				}
				if(this.$data.result_price == ""){
					util.errorTips('物料单价不能为空');
					return false;
				}
				if(this.$data.result_num<=0){
					util.errorTips('物料数量不能为空');
					return false;
				}
				let result_img = [];
				this.$data.files.forEach((o,i)=>{
					result_img.push(o.url)
				})
				
				let data = {
					id:this.$data.id,
					supplier_id:this.$data.supplier_id,
					result_desc:this.$data.result_desc,
					result_img,
					result_price:this.$data.result_price,
					result_num:this.$data.result_num,
					result_big_num:this.$data.result_big_num
				}
				
				api.staffFindFound({
					method:'POST',
					data
				}).then((res)=>{
					if(res.code == 200 || res.code ==0){
						uni.navigateBack({
							delta:1
						})
					}else{
						util.errorTips(res.msg);
					}
				})
				
			},
			checkSupplier(index){
				this.$data.supplier = this.$data.list[index].name;
				this.$data.supplier_id = this.$data.list[index].id;
				this.$data.isCheckSupplier = false;
			},
			sum(){
				this.$data.totalCost = this.$data.result_num * this.$data.result_price + this.$data.result_big_num * this.$data.big_price;
			},
			staffSupplierSearch(e){
				this.$data.supplier_id = '';
				if(e.detail.value != ""){
					api.staffSupplierSearch({
						data:{
							keyword:e.detail.value
						}
					}).then((res)=>{
						let arr = [];
						if(res.code == 200 || res.code == 0){
							this.$data.list = res.data;
							if(res.data.length<=0){
								this.$data.isCheckSupplier = false;
							}else{
								this.$data.isCheckSupplier = true;
							}
							
						}
					})
				}
				
			},
			getPriceByOne(e){
				this.$data.result_price = e.detail.value;
				this.sum();
			},
			bindChange1(e){
				this.$data.result_num = e;
				this.sum();
			},
			bindChange2(e){
				this.$data.result_big_num = e;
				this.sum();
			},
			getTaskFee(){
				api.getTaskFee({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.big_price = res.data.big_price;
						this.getOrderDetail(this.$data.id);
						
					}
				})
			},
			imageUpload(e) {
				this.$data.files = e.files;
			},
			getOrderDetail(id) {
				api.shipShowById({
					data:{id}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.detailData = res.data;	
						this.$data.totalFee = parseInt(res.data.result_num) * parseFloat(res.data.result_price)  + parseInt(res.data.result_big_num) * parseFloat(this.$data.big_price);

						this.sum();
					}
				})
			},
			// 预览图片
			preview(e) {
				let idx = e.currentTarget.dataset.idx;
				let imgs = this.data.detailData.desc_img;
				uni.previewImage({
					current: imgs[idx],
					urls: imgs
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
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
	.desc_img{
		image{
			width: 200upx;
			height: 200upx;
		}
	}
	.textarea{
		margin: 40rpx;
		text-align: left;
		background: #f4f4f4;
		padding: 20rpx;
		margin: 40rpx;
		width: 490rpx;

	}
	.sub{
		background: #333;
		color: #fff;
	}
	.order-info{
		margin-top: 20upx;
		.cost{
			height: 110upx;
			line-height: 110upx;
			padding-left: 30upx;
			border-top: 20upx solid #f5f5f5; 
			border-bottom: 20upx solid #f5f5f5; 
		}
		.mun1,.mun2{
			border-top: 1upx solid #f5f5f5; 
			padding: 30upx;
			.piece{
				margin-left: 30upx;
			}
			.t2{
				margin-left: 50upx;
			}
		}
		.supplier,.price{
			border-top: 1upx solid #f5f5f5; 
			padding: 30upx;
			.t1{
				font-size: 28upx;
			}
			.t2{
				width: 468upx;
				height: 52upx;
				line-height: 52upx;
				padding-left: 20upx;
				margin-left: 40upx;
			}
		}
		.supplier{
			.t1{
				letter-spacing:8upx;
			}
			.t2{
				margin-left: 30upx;
				position: relative;
				.select{
					position: absolute;
					top: 60upx;
					left: 0;
					background: #eee;
					width: 480upx;
					height: 500upx;
					overflow-y:scroll; 
					
					z-index: 9999999;
					view{
						height: 60upx;
						line-height: 60upx;
						border-bottom: 1upx solid #f4f4f4;
						padding-left: 30upx;
					}
				}
			}
		}
		.upload{
			padding: 30upx;
			border-top: 1upx solid #f5f5f5; 
			.t1{
				height: 80upx;
				line-height: 80upx;
			}
			.t2{}
		}
		.desc{
			
			padding: 30upx;
			margin-bottom: 30upx;
			.t1{
				width: 140upx;
				letter-spacing:12upx;
				font-size: 28upx;
			}
			.t2{
				width: 500upx;
				height: 210upx;
				padding: 10upx;
				margin-left: 20upx;
				background: #f5f5f5;
				textarea {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.flex-end{
		padding-right: 10upx;
	}
	.order_sn{
		height: 120upx;
		line-height: 50upx;
		padding-top: 20upx;
		border-bottom: 1upx solid #f4f4f4; 
	}
	.top20{
		border-top: 20upx solid #f4f4f4; 
	}
	.get-address{
		border-top: 1upx solid #f4f4f4; 
		padding: 10upx;
		padding-left: 30upx;
		.stall{
			display: inline-block;
			line-height: 24upx;
			padding: 2upx 10upx;
			height:28upx;
			border-radius:4upx;
			margin-left: 20upx;
			border:1upx solid rgba(242,152,0,1);
		}
	}
	.find-status{
		width:180upx;
		height:60upx;
		line-height: 60upx;
		text-align: center;
		border-radius:30upx;
		border:2upx solid rgba(242,152,0,1);
		color: #F29800;
		font-size: 30upx;
		margin-top: 30upx;
		margin-right: 10upx;
		margin-bottom: 30upx;
		view{
			text-align: center;
			width: 180upx;
		}
	}
	.cancat{
		margin-right: 0upx;
		margin-top: 10upx;
		width: 340upx;
		height: 100upx;
		position: relative;
		text{
			position: absolute;
			top: 28upx;
			left: 58upx;
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
	.find-order-detail{
		height: 100%;
		background: #f4f4f4;
	}
	.image{
		width: 750upx;
		position: relative;
		left: -40upx;
		image{
			width: 140upx;
			height: 140upx;
			margin-top: 20upx;
			margin-left: 40upx;
		}
	}
	.container {
		background: #FFF;
		line-height: 50upx;
	}

	.padding {
		padding: 16upx 30upx;
		font-size: 30upx;
		border-top: 1upx solid #eee;
		position: relative;
		.item-right{
			position: absolute;
			right: 40upx;
			top: 20upx;
		}
	}

	.pd-cell {
		padding: 0 20upx;
	}

	.warm-btn {
		border: 1upx #C81C28 solid;
		color: #C81C28;
		padding: 2upx 10upx;
		border-radius: 6upx;
	}

	.normal-btn {
		border: 1upx #666 solid;
		color: #666;
		padding: 2upx 10upx;
		border-radius: 6upx;
	}

	.order-chat {
		background: #EF7510;
		color: #fff;
		width: 300upx;
		margin: 40upx auto;
	}

	.height40 {
		height: 40upx;
	}

	/*标签tag  */
	.tag {
		color: #EF7510;
		padding: 2upx 4upx;
		border: 1px #EF7510 solid;
		border-radius: 6upx;
	}
	
	
	
	/*弹窗样式 S  */

.pop-window {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
}

.form-box-1 {
    position: relative;
    width: 600rpx;
    margin: 130rpx auto;
    padding: 0rpx 40rpx 50rpx;
    background: #fff;
    border-radius: 10rpx;
    text-align: center;
    line-height: 80rpx;
}

.submit-box button {
    width: 270rpx;
    margin-top: 50rpx;
    background: #c81c28;
    color: #fff;
    line-height: 80rpx;
}

.close {
    position: absolute;
    right: 0rpx;
    top: -20rpx;
    padding: 20rpx;
    font-size: 50rpx;
}

/* 找不到物料 */

.form-box-2 {
    position: relative;
    width: 600rpx;
    margin:200rpx auto;
    padding-top: 34rpx;

    background: #fff;
    border-radius: 10rpx;
    text-align: center;
    line-height: 80rpx;
}

.pop-window {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
}
</style>
