<template>
	<view>
		<view class='material'>
			<view class='box-shadow' v-for="(item, index) in fetchs" :key="index">
				<!-- <view v-if="item.cname==''" class='lh90 fs30 pdl-20 bb-1'>
					<text @click='goClassify(index)' class="text-theme">*</text> <text>物料品类:</text>
					<text @click='goClassify(index)' class='text-999 fs24' style='padding-left:50rpx;'>请选择物料品类 </text>
					<view @click='goClassify(index)' class='iconfont icon-jiantou material-icon pdr-30 mgl-30'></view>
					<view class='close_btn' v-if="fetchs.length>1" @click='closed(index)'>
						<image src='../../static/icon/close_btn.png'></image>
					</view>
				</view>

				<view v-if="item.cname!=''" class='lh90 fs30 pdl-20 bb-1' >
					<text @click='goClassify(index)' class="text-theme">*</text> <text>物料品类:</text>
					<text @click='goClassify(index)' style='padding-left:50rpx;'> {{item.cname}} </text>
					<view @click='goClassify(index)' class='iconfont icon-jiantou material-icon pdr-30 mgl-30'></view>
					<view class='close_btn' v-if="fetchs.length>1" @click='closed(index)'>
						<image src='../../static/icon/close_btn.png'></image>
					</view>
				</view> -->

				<view class="th fs30">
					<view class="mgl-20" @click="goClassify(index)"><text class="text-theme">*</text>物料类型: <text class=" mgl-20 cname fs30" v-if="item.cid!=''">{{item.cname}}</text><text
						 class="text-999 mgl-20 cname" v-if="item.cid==''">请选择物料类型</text> <text class='mgl-20 iconfont icon-jiantou'></text></view>
					<view class='close_btn' v-if="fetchs.length>1" @click='closed(index)'>
						<image src='../../static/icon/close_btn.png'></image>
					</view>
				</view>

				<view class='lh90 fs30 pdl-20 bb-1 area'>
					<view @click="goAreaText(index)" class="cf">
						<text class="area">
							<text class="text-theme">*</text>
							服务区域: 
						</text>
						
						<view class="text-999 mgl-20 fs24 area-text flr">{{item.areaText}}</view> 
						<text class="triangle-down"></text>
					</view>
				</view>
				
				<!-- <view class="lh90 fs30 pdl-20 bb-1">
					<view @click="checkLimit(index)">限时找料: 
						 <text v-if="item.is_limit == 1" class="iconfont icon-dui fs40 text-yellow mgl-20 mgr-20"></text>
						 <text v-if="item.is_limit == 0" class="iconfont icon-dui fs40 text-eb mgl-20 mgr-20"></text>
						 <text>限时三小时</text>
					</view>
				</view> -->

				<!-- <view class='material-number lh90 fs30 pdl-20 cf border-bottom'>
					<text class="text-theme">*</text> <text>物料数量:</text>
					<text class='sub' @click='sub'>-</text>
					<input class='material-input' @input="changeNumber" type='number' v-model='findNum'></input>
					<text class='plu' @click='plu'>+</text>
					<text class='pdl-30'>件</text>
				</view> -->

				
				<view class="pd-30 align-start fs30 cf field-warp">
					<view class="word-spacing field-txt">
						<text class="text-theme">*</text>描 述 ：</view>

					<textarea v-if="!isPopup && !isNotes" class="height-200 field-desc" v-model="item.desc" placeholder='(注：请详细描述物料的名称、用途、材质、交货时间)'>
            </textarea>
				</view>

				<view class="flex-start form-add-img fs30 pdl-20 cf'">
					<view class="tl"> <text style='opacity:0'>*</text>上传图片:</view>
				</view>
				<view class="upload">
				
					<upload :itemIndex="index" @imageUpload='imageUpload' :upLoadMaxNum='upLoadMaxNum' :files='item.files'></upload>
				
				</view>


				<!--收货地址  -->
				<view class="fs30">
					<view class="cell-padding fs30 lh90 mgt-20">
						<text class="text-theme">*</text>取样地址
					</view>
					<view class="address flex flex-start pdt-30 pdb-30 pdl-20 pdr-20">
					<!-- 	<text class="iconfont icon-dizhi text-gray mgr-20"></text> -->
						<view class='iconfont icon-jiantou address-icon flr pdr-30'></view>
						<view @click='goConsigneeAddress(index)' v-if="item.address" class="flex-1 address-info fs24">
							
							<view class="person" style='word-break:break-all;'>
								<text>{{item.address.consignee}}  {{item.address.mobile || ''}}</text> <text class='remark' v-if="item.address && item.address.remark!=''">{{item.address.remark||''}}</text>
							</view>
							<view style='word-break:break-all;'>
								<text class='text-999'>{{item.address.stall ||''}}</text>
								<!-- <text class='remark' v-if='item.address.remark'>{{item.address.remark ||''}}</text> -->
							</view>
							<view>
								<view class="text-999">
									
									{{item.address.city_str || ''}} {{item.address.address || ''}} {{item.address.room ||''}}
				
								</view>
							</view>
							
				
						</view>
				
						<view @click='goConsigneeAddress(index)' v-if="item.address == ''" class="text-666 h100 lh100 flex-1">
							点击添加取样地址
						</view>
					</view>
				</view>

			</view>

		<!--提交按钮  -->
		<view class='add-find' @click='addFind' v-if="taskEditItem==''">
			<image src='../../static/icon/add-find.png'></image>
			<text style='font-size:20rpx;color:#999'>点击添加找料</text>
		</view>
			
			<!-- <view class='fs30 box-shadow'>
				<view class='lh90 fs30 pdl-30 bb-1'>
					配送费用
				</view>
				<view class='lh90 fs30 pdl-30'>
					<text>共{{findNum}}件</text>
					<text class='flr pdr-30 text-red'>￥{{totalFecthPrice}}</text>
				</view>
			</view> -->
			
			<button @click="fethchSubmit" class='join-find lh90 fs30 mgb-30'>{{taskEditItem!=''?'完成':'加入小鹿任务'}}</button>
			
			<view class='xuzhi' @click='showNotes'>
				<image src='../../static/icon/xuzhi.png'></image> <text class='fs24 text-999'>《小鹿取送须知》</text>
			</view>
			<view style='height:50rpx;'></view>
		</view>

		<view class='index-popup' v-if="isPopup">
			<view class='index-popup-bg' @click='closePopup'></view>
			<view class='index-popup-content'>
				<view class='index-popup-title'>加入小鹿任务成功！</view>
				<view class='index-popup-btn'>
					<view class='go-pay' @click='goPay'>去结算({{payNum}}s)</view>
					<view @click='goBack' style='color:#F29800'>继续取送</view>
				</view>
			</view>
		</view>

		<view class='index-popup notes-popup' v-if="isNotes && findNeedKnow!=''">
			<view class='index-popup-bg' @click='hiddenNotes'></view>
			<view class='index-popup-content notes-btn-content'>
				<view class='index-popup-title'>小鹿取送须知 <text class='iconfont icon-del1' @click='hiddenNotes'></text></view>
				<view class="rich-text">
					<rich-text :nodes="deliveryNeedKnow"></rich-text>
				</view>
				<view @click='checkIsResNotes' class='mgt-30 checkIsResNotes'>
					
					<text v-if='isResNotes' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
					<text v-if='!isResNotes' class="iconfont icon-yuan icon-yuan-1 fs40 pdl-10 text-eb"></text>
					<text style='color:999;padding-left:20rpx;'>已阅读，下次不再显示</text>
				</view>
				<view class='index-popup-btn notes-btn'>
					<view class='text-red btn-shadow' @click='hiddenNotes'>确定</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	import upload from "../../components/upload.vue";
	export default {
		data() {
			return {
				cid:'',           // 分类ID
				cname:''  ,       // 分类名称
				files:[],         // 图片数据
				isResNotes: false,
				isNotes: false,    // 取料须知
				isSelect: false,
				checkTypes: '',
				checkType: '',    // 物料类型
				checkTypes_cid: '',
				findNum: 1,       // 物料数量
				describeValue: '',
				desc:'',          // 描述
				fecthPrice: 0,    // 配送费用
				isPopup: false,   // 弹窗控制   
				payNum: 10,       // 倒计时
				address: '',      // 取料地址
				deliveryNeedKnow: '',
				isFetchNotes:false,
				totalFecthPrice:'' ,// 总价
				interval:'',
				taskEditItem:'',
				fetchs:[
					{
						address:'',
						cname:'',
						cid:'',
						desc:'',
						desc_img:[],
						address_id:'',
						is_limit: 0,
						area_id:'',
						areaText:'',
						files:[],
						is_compare:0, 
					}
				]
			};
		},
		components: {
			upload
		},
		onLoad(options) {
			// 判断是否显示说明弹窗
			if(this.$data.taskEditItem == ''){
				if (uni.getStorageSync('isFetchNotes') == "") {
					this.$data.isNotes = true
				}
			}
			if(options.taskEditItem){    // 编辑取送任务
				this.$data.isNotes = false;
				uni.setNavigationBarTitle({
					title: "修改任务"
				})
				this.$data.taskEditItem = uni.getStorageSync('fetchItem');
				let item = this.$data.taskEditItem;
				this.$data.fetchs[0].cid = item.cid;
				this.$data.fetchs[0].cname = item.cname;
				this.$data.fetchs[0].desc = item.desc;
				this.$data.fetchs[0].address_id = item.address_id;
				this.$data.fetchs[0].address = item.address;
				this.$data.fetchs[0].area_id = item.area_id;
				this.$data.fetchs[0].areaText = item.areaText;
				this.$data.fetchs[0].is_compare = item.is_compare;
				this.$data.fetchs[0].is_limit = item.is_limit;

				if(item.desc_img.length>0){
					let desc_img = [];
					item.desc_img.forEach((o,i)=>{
						let imgObj = {
							url:o,
							pct:'finish'
						}
						desc_img.push(imgObj);
					})
					this.$data.fetchs[0].files = desc_img;
				}
			}else{
				uni.setNavigationBarTitle({
					title: "立即取送"
				})
			}
			
			// 动态获取须知
			api.needKnow({}).then((res) => {
				if (res.code == 200 || res.code == 0) {
					this.$data.deliveryNeedKnow = res.data.delivery_need_know
				}
			})

			// 获取单价
			this.getTaskFee();
			
			// 获取默认地址
			this.getDefaultAddress();
			
			// 初始化区域
			this.initArea();
		},
		onShow() {
			
			
			// 获取分类数据
			this.$eventHub.$on('classifyData', (data) => {
				this.$data.isNotes = false;
				this.$data.cid = data.cid;
				this.$data.cname = data.cname;
				this.$data.fetchs[data.index].cid = data.cid;
				this.$data.fetchs[data.index].cname = data.cname;
				this.$eventHub.$off('classifyData');
			})
			// 获取地址
			this.$eventHub.$on('fetchPage', (data) => {
				console.log('fetchPage:', data);
				this.$data.fetchs[data.findIndex].address = data.address;
				this.$data.address = data.address;
				this.$eventHub.$off('fetchPage');
			})
			
		},
		methods: {
			// 是否切换限时找料
			checkLimit(index){
				this.$data.fetchs[index].is_limit = this.$data.fetchs[index].is_limit==0?1:0;
			},
			// 初始化服务区域
			initArea(){
				api.findArea({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						// this.$data.areaText = res.data[0].name;
						// this.$data.area_id  = res.data[0].id;
						// this.$data.fetchs[0].areaText = res.data[0].name;
						// this.$data.fetchs[0].area_id  = res.data[0].id;
						if(this.$data.taskEditItem==''){
							this.$data.areaText = res.data[0].name;
							this.$data.area_id  = res.data[0].id;
							this.$data.fetchs[0].areaText = res.data[0].name;
							this.$data.fetchs[0].area_id  = res.data[0].id;
						}else{
							this.$data.areaText = this.$data.fetchs[0].name;
							this.$data.area_id  = this.$data.fetchs[0].id;
							// this.$data.fetchs[0].areaText = res.data[0].name;
							// this.$data.fetchs[0].area_id  = res.data[0].id;
							res.data.forEach((o,i)=>{
								if(o.id == this.$data.fetchs[0].area_id){
									this.$data.fetchs[0].areaText = res.data[i].name
								}
							})
						}
					}
				})
			},
			// 选择服务区域
			goAreaText(index){
				let _this = this;
				api.findArea({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						let arr    = res.data;
						let newArr = [];
						arr.forEach((o,i)=>{
							newArr.push(o.name);
						})
						uni.showActionSheet({
							itemList: newArr,
							success: function (res) {
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								_this.$data.fetchs[index].area_id  = arr[res.tapIndex].id;
								_this.$data.fetchs[index].areaText = arr[res.tapIndex].name;
								util.successTips('区域选择成功');
							},
							fail: function (res) {
								console.log(res.errMsg);
								// util.successTips('区域选择失败');
							}
						});
					}
				})
			},
			
			// 删除找料单个信息
			closed(index) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认删除吗？',
					confirmText: '确认',
					success: (res) => {
						if (res.confirm) {
							_this.$data.fetchs.splice(index, 1);
						} else if (res.cancel) {
							util.errorTips('您点击了取消')
						}
					}
				})
			},
			// 继续添加找料
			addFind() {
				let data = {
						address:this.$data.address,
						cname:this.$data.cname,
						cid:this.$data.cid,
						desc:'',
						desc_img:[],
						address_id:'',
						is_limit: 0,
						area_id:this.$data.area_id,
						areaText:this.$data.areaText,
						files:[],
						is_compare:0
					};
				this.$data.fetchs.push(data);
			},
			// 图片上传返回数据
			imageUpload(e) {
				this.$data.files = e.files;
			},
			// 选择物料类型
			goClassify(index){
				uni.navigateTo({
					url: '../classify/classify?from=2&index='+index
				})
			},
			// 同意须知
			checkIsResNotes() {
				this.$data.isResNotes = !this.$data.isResNotes;
				this.$data.isResNotes?uni.setStorageSync('isFetchNotes', true):uni.removeStorageSync('isFetchNotes');
			},
			// 获取单个任务价格
			getTaskFee() {
				api.getTaskFee({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.fecthPrice = res.data.fetch_price;
						this.$data.totalFecthPrice = util.formatMoney(res.data.fetch_price);
						uni.setStorageSync('fecthPrice', res.data.fetch_price);
					} else {
						util.errorTips('获取单价失败');
					}
				})
			},
			// 显示照料须知
			showNotes() {
				this.$data.isNotes = true
			},
			// 隐藏找料须知
			hiddenNotes() {
				this.$data.isNotes = false
			},
			// 减法
			sub() {
				if (this.$data.findNum <= 1) {
					util.errorTips('最少1个取料单');
					return false;
				}

				this.$data.findNum--;
				this.$data.totalFecthPrice = util.formatMoney(this.$data.fecthPrice * this.$data.findNum);
			},
			// 加法
			plu() {
				if (this.$data.findNum >= 10) {
					util.errorTips('最多10个取料单');
					return false;
				}
				this.$data.findNum++;
				this.$data.totalFecthPrice = util.formatMoney(this.$data.fecthPrice * this.$data.findNum);
			},
			// 数量输入
			changeNumber(e){
				this.$data.findNum = e.detail.value;
				this.$data.totalFecthPrice = util.formatMoney(this.$data.fecthPrice * this.$data.findNum);
			},
			// 获取默认地址
			getDefaultAddress() {
				api.defaultAddress({}).then((res) => {
					if (res.code == 0 || res.code == 200) {
						this.$data.fetchs[0].address = res.data;
						this.$data.fetchs[0].address_id = res.data.id;
						this.$data.address = res.data;
					}
				})
			},
			// 去地址选择页面
			goConsigneeAddress(index) {
				uni.navigateTo({
					url: '../address/address?from=fetchPage&findIndex=' + index,
				})
			},
			// 去支付
			goPay() {
				let _this = this;
				this.$data.payNum = 10;
				clearInterval(this.$data.interval);
				uni.reLaunch({
					url: '../index/index',
					success:function(){
						_this.$store.commit("change_page",1);
					}
				});
			},
			// 继续找料
			goBack() {
				this.$data.payNum = 10;
				clearInterval(this.$data.interval);
				this.$data.isPopup = false;
			},
			// 取料任务提交
			fethchSubmit(e) {
				let _this = this;
				let fetchs = this.$data.fetchs;
				// 图片获取
				for(let i=0;i<fetchs.length;i++){
					let uploadImgs = [];
					let isUploading = fetchs[i].files.every((ele, i) => {
						return (ele.pct && ele.pct === 'finish')
					})
					if (!isUploading) {
						util.errorTips('第' + (i + 1) +'个任务,图片正在上传')
						return false
					}
					fetchs[i].files.forEach((ele, i) => {
						if (ele.url) {
							uploadImgs.push(ele.url)
						}
					})
					fetchs[i].desc_img = uploadImgs;
					if (fetchs[i].cname == '') {
						util.errorTips('第' + (i + 1) +'个任务,请填写物料品类')
						return false
					}
					if (fetchs[i].desc == '') {
						util.errorTips('第' + (i + 1) +'个任务,请填写描述')
						return false
					}
					
					if (fetchs[i].address == '') {
						util.errorTips('第' + (i + 1) +'个任务,请添加地址')
						return false
					}
					fetchs[i].type = 2;
					fetchs[i].address_id = fetchs[i].address.id;
				}
				
				let data = {
					task: fetchs
				}
				if(this.$data.taskEditItem!=''){  // 编辑
					data.task[0].id = this.$data.taskEditItem.id;
					api.updateTaskInit({
						method: 'POST',
						data:data.task[0]
					}).then((res)=>{
						if(res.code == 200 || res.code == 0){
							this.$eventHub.$emit('editData', data);
							uni.navigateBack({
								delta:1
							})
						}else{
							util.errorTips(res.msg);
						}
					}).catch((res) => {
						util.errorTips(res.msg);
					})
				}else{  // 新增
					api.joinTask({
						method: 'POST',
						data
					}).then((res) => {
						console.log(res);
						if (res.code == 200 || res.code == 0) {
				
							this.$data.isPopup = true;
							_this.$data.interval = setInterval(function() {
								_this.$data.payNum--;
								if (_this.$data.payNum == 0) {
									_this.$data.isPopup = false;
									clearInterval(_this.$data.interval);
									_this.goPay();
									_this.$data.payNum = 10;
								}
							}, 1000)
						} else {
							util.errorTips(res.msg);
						}
					}).catch((res) => {
						util.errorTips(res.msg);
					})
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.remark {
		border: 1rpx solid rgba(242,152,0,1);
		color: rgba(242,152,0,1);
		border-radius: 5rpx;
		margin-right: 10rpx;
		padding: 0 5rpx;
		display: inline !important;
		margin-left: 20upx;
	}
	.checkIsResNotes{
		padding-left: 200upx;
	}
	.cname{
		margin-left: 50upx;
	}
	.th {
		height: 90upx;
		line-height: 90upx;
		position: relative;
		border-top: 1upx solid #eee; 
		.close_btn image {
			display: inline-block;
			width: 56upx;
			height: 56upx;
			margin-top: 30upx;
			position: absolute;
			right: 20upx;
			top: -10upx;
		}
	
	}
	.area{
		position: relative;
		top: -4upx;
	}
	.address-info {
		position: relative;
		top: -30upx;
		view{
			line-height: 50upx;
		}
		
	}
	.close_btn image {
		display: inline-block;
		width: 56upx;
		height: 56upx;
		margin-top: 30upx;
		position: absolute;
		right: 30upx;
		top: 0upx;
	}
	.add-find {
		text-align: center;
	}
	
	.add-find image {
		display: block;
		width: 120rpx;
		height: 120rpx;
		margin: 0 auto;
		margin-top: 40rpx;
	}
	
	.icon-jiantou{
		display: inline-block;
	}
	.area{
		position: relative;
		.triangle-down {
			width: 0;
			height: 0;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			border-top: 6px solid #999;
			position: absolute;
			right: 50upx;
			top: 44upx;
		}
		.area-text{
			border: 1upx solid #eee; 
			padding: 0 10upx;
			width: 460upx;
			margin-left: 50upx;
			height: 60upx;
			line-height: 60upx;
			margin: 16upx 30upx 0 0;
			// position: relative;
			// top: 20upx;
		}
	}
	.rich-text{
		padding: 10upx 30upx;
	}
	.material-number {
		height: 90upx;
		border-bottom: 1upx solid #f4f4f4;
	}

	.material-number text {
		float: left;
	}

	.sub {
		margin-left: 50upx;
	}

	.sub,
	.plu {
		width: 70upx;
		height: 70upx;
		line-height: 70upx;
		background-color: #eeeeee;
		text-align: center;
		font-size: 50upx;
		border-radius: 10upx;
		margin-top: 10upx;
	}

	.material-input {
		margin: 0 20upx;
		width: 80upx;
		border: 1upx solid #eeeeee;
		height: 68upx;
		display: inline-block;
		float: left;
		border-radius: 10upx;
		margin-top: 10upx;
		text-align: center;
	}

	.material-describe {}

	.material-describe-title {
		width: 200upx;
	}

	.material-describe textarea {
		width: 300px;
		height: 150px;
		display: block;
		position: relative;

	}

	.width-200 {
		width: 200upx;
	}

	.height-200 {
		height: 200upx;
	}

	.align-start {
		align-items: flex-start;
		border-bottom: 1px solid #f0eff5;
	}

	.word-spacing {
		word-spacing: 12upx;
	}

	.join-find {
		text-align: center;
		background-color: #F29800;
		margin: 0 20upx;
		border-radius: 10upx;
		margin-top: 50upx;
		color: #fff;
	}

	.field-desc {
		// display: inline-block;
		// width: 500upx;
		// float: right;
		// position: relative;
		// top: -10upx;
		
		position: relative;
		top: 0upx;
		left:20upx;
		width: 470upx;
		height: 230upx;
		overflow: hidden;
		background: #F5F5F5;
		font-size: 24upx;
		padding: 10upx;
	}

	.field-txt {
		float: left;
		width: 150upx;
	}

	.field-warp {
		position: relative;
		z-index: 9;
	}

	.index-popup {
		width: 100%;
		height: 100%;
		position: absolute;
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
		z-index: 9999;
	}

	.index-popup-content {
		width: 700upx;
		height: 330upx;
		background-color: #fff;
		position: absolute;
		top: 20%;
		left: 25upx;
		border-radius: 10upx;
		z-index: 9999;
	}

	.index-popup-title {
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		text-align: center;

	}

	.index-popup-main {
		font-size: 30upx;
		padding: 0 80upx;
		border-bottom: 1px solid #f4f4f4;
	}

	.index-popup-main .index-popup-view-1 {
		letter-spacing: 9px;
		line-height: 90upx;
		height: 90upx;
		float: left;
	}

	.index-popup-main view:last-child {}

	.findInput,
	.sub,
	.plu {
		float: left;
		margin-top: 10upx;
	}

	.sub,
	.plu {
		font-size: 40upx;
		display: inline-block;
		height: 70upx;
		line-height: 70upx;
		width: 70upx;
		background-color: #eee;
		border-radius: 10upx;
		text-align: center;
		position: relative;
	}

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
		border: 1upx solid #F29800;
		border-radius: 10upx;
	}

	.go-pay {
		background-color: #F29800;
		color: #fff;
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
		height: 100upx;
		line-height: 100upx;
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
		border: 1upx solid #F29800;
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
		height: 88%;
		top: 6%;
		overflow-y: auto;
	}

	.index-popup-main view {
		line-height: 50upx;
	}

	.icon-del1 {
		position: absolute;
		font-size: 50upx;
		right: 20upx;
		top: -10upx;
		color: #999;
	}

	/* 2.2改版 */

	.icon-dizhi {
		font-size: 50upx;
	}

	.address-icon {
		position: absolute;
		top: 40%;
		right: 0;
	}

	.address {
		position: relative;
		padding-right: 70upx;
	}

	.flex {
		display: flex;
	}

	.pd20 {
		padding-top: 20upx;
	}

	.form-add-img {
		
		.tl{
			line-height: 88upx;
		}
	}
	.upload{
		border-bottom: 1upx solid #eee;
		padding-bottom: 30upx;
	}
</style>
