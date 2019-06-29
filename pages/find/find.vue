<template>
	<view class="find">
		<view class="items">
			<view class="item" v-for="(item ,index) in finds" :key='index'>
				<view class="th">
					<view class="mgl-20" @click="goClassify(index)"><text class="text-theme">*</text>物料类型: <text class=" mgl-20 cname fs30" v-if="item.cid!=''">{{item.cname}}</text><text
						 class="text-999 mgl-20 cname" v-if="item.cid==''">请选择物料类型</text> <text class='mgl-20 iconfont icon-jiantou'></text></view>
					<view class='close_btn' v-if="finds.length>1" @click='closed(index)'>
						<image src='../../static/icon/close_btn.png'></image>
					</view>
				</view>
				<view class="td">
					<view class="mgl-20"><text class="text-theme">*</text> <text class="word-spacing">描 述 : </text>
						<textarea v-if="isNotes" class="flex-1 find-desc" v-model="item.desc" placeholder='(注：请详细描述物料的名称、用途、材质、交货时间)'>
						</textarea>
					</view>
				</view>
				
				<view class="th area">
					<view class="mgl-20" @click="goAreaText(index)"><text class="text-theme">*</text>服务区域: 
						<text class="text-999 mgl-20 fs24 area-text">{{item.areaText}}</text> 
						<text class="triangle-down"></text>
					</view>
				</view>
				<view class="th">
					<view class="mgl-20" @click="checkLimit(index)">限时找料: 
						 <text v-if="item.is_limit == 1" class="iconfont icon-dui fs40 text-yellow mgl-20 mgr-20"></text>
						 <text v-if="item.is_limit == 0" class="iconfont icon-dui fs40 text-eb mgl-20 mgr-20"></text>
						 <text>限时三小时</text>
					</view>
				</view>
				
				<view class="th">
					<view class="mgl-20 choosePrice">
						<view>
							<text @click="checkCompare(index)">
								<text v-if="item.is_compare == 1" class="iconfont icon-dui fs40 text-yellow mgr-20"></text>
								<text v-if="item.is_compare == 0" class="iconfont icon-dui fs40 text-eb mgr-20"></text>
								比价优选
							</text>
							
							<text class="mgl-30 fs30 reference_price">参考价格: </text>
							<input type="number" :disabled="!item.is_compare" v-model="item.reference_price" placeholder="请输入参考价格" />
						</view>
					</view>
				</view>
				
				
				
				<view class="nav flex">
					<view class="flex-1" v-for="(navItem, navIndex) in navTexts" :key="navIndex" @click="checkNav(navIndex,index)">
						<text v-if="item.checkIndex == navIndex" class="iconfont icon-dui fs40 text-yellow"></text>
						<text v-if="item.checkIndex != navIndex" class="iconfont icon-dui fs40 text-eb"></text>
						<text class="mgl-20">{{navItem}}</text>
					</view>
				</view>
				
				
				
				<view class="upload" v-if="item.checkIndex == 0">

					<upload :itemIndex="index" @imageUpload='imageUpload' :upLoadMaxNum='upLoadMaxNum' :files='item.files'></upload>

				</view>
				<view v-if="item.checkIndex == 1">
					<view class="fs30 bottom-border address-q">
						<view class="cell-padding fs30 mgt-30">
							<text class="text-theme">*</text>取样地址
						</view>
						<view class=" cell-padding address flex flex-start">
							<!-- <text class="iconfont icon-dizhi fs40 text-gray mgr-20"></text> -->
							<text class='iconfont icon-jiantou address-icon'></text>
							<view v-if="item.address != ''" @click='goConsigneeAddress(index)' class="flex-1 address-info address-q-i fs24">
								<view>
									<text> 收货人 {{item.address.mobile||''}}</text>
								</view>
								<view class="text-999">
									<text class='remark' v-if="item.address && item.address.remark!=''">{{item.address.remark||''}}</text>
									{{item.address.address||''}} {{item.address.name||''}} {{item.address.room ||''}}

								</view>
								
								<view>
									<text class='text-999'>{{item.address.stall || ''}}</text>
								</view>
							</view>
							<view v-if="item.address == ''" @click='goConsigneeAddress(index)' class="no-address text-666 h100 lh100 flex-1">
								点击添加收货地址
							</view>
						</view>
					</view>

				</view>
				<view v-if="item.checkIndex == 2" class="address-j">
					<!--收货地址  -->
					<view class="flex-1 address-info fs24 cell-padding">
						<view v-for='(comItem, comIndex) in companyaddress' :key='comIndex' class='bb1 item-3'>
							<view class="fs30 cf">寄样地址  <text class="flr text-red fs20"> 寄样不支持到付,请客户自行承担寄样费用</text>
						</view>
							<view>
								<view>
									收货人 {{comItem.mobile || ''}} <text class='remark' v-if='comItem.tag'>{{comItem.tag||''}}</text>
								</view>
							</view>
							<view class="text-999">
								
								<text>{{comItem.address}}</text>
							</view>
							
							<view class='text-999'>
								{{comItem.desc}}
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>

		<!--提交按钮  -->
		<view class='add-find' @click='addFind' v-if="taskEditItem==''">
			<image src='../../static/icon/add-find.png'></image>
			<text style='font-size:20rpx;color:#999'>点击添加找料</text>
		</view>

		<view class="cell-padding submit-form">
			<button @click="submit" :disabled='findDisabled' class='btn-shadow'>{{taskEditItem!=''?'完成':'加入小鹿任务'}}</button>
		</view>
		<view class='xuzhi' @click='showNotes'>
			<image src='../../static/icon/xuzhi.png'></image> <text>《小鹿找料须知》</text>
		</view>
		<view style='height:50rpx;'></view>



		<view class='index-popup' v-if="isPopup">
			<view class='index-popup-bg' @click='goBack'></view>
			<view class='index-popup-content'>
				<view class='index-popup-title'>加入小鹿任务成功！</view>
				<view class='index-popup-btn'>
					<view class='go-pay btn-shadow bg-yellow' @click='goPay'>去结算({{payNum}}s)</view>
					<view class='btn-shadow text-yellow' @click='goBack'>继续找料</view>
				</view>
			</view>
		</view>

		<view class='index-popup notes-popup' v-if="isNotes">
			<view class='index-popup-bg' @click='hiddenNotes'></view>
			<view class='index-popup-content notes-btn-content'>
				<view class='index-popup-title'>小鹿找料须知 <text class='iconfont icon-del1' @click='hiddenNotes'></text></view>
				<rich-text :nodes="findNeedKnow"></rich-text>
				<view @click='checkIsResNotes' class='mgt-10' style='padding-left:200upx;'>
					<text v-if='isResNotes' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
					<text v-if='!isResNotes' class="iconfont icon-yuan icon-yuan-1 fs40 pdl-10 text-eb"></text>
					<text style='color:999;padding-left:20upx;'>已阅读，下次不再显示</text>
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
				// imgFiles:[{    // 初始化图片内容 
				// 	url:'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/fawn/201906/fKzqX9IkpEcYMpUuunYLCtvW6wsCJVbHVAC3RRGb.png?x-oss-process=style/big',
				// 	pct:'finish'
				// }],
				cid:'',
				cname:'',
				isCheckTime: false,
				areaText:'请选择服务区域',
				area_id :'',    // 区域ID
				interval: '',
				isPopup: false, // 提交任务
				findDisabled: false, // 防止重复提交
				payNum: 10, // 支付倒计时
				imgFiles: [],
				upLoadMaxNum: 9,
				checkIndex: 0,
				isResNotes: false,
				isNotes: false, // 小鹿找料须知是否显示
				findNeedKnow: '', // 小鹿找料须知富文本
				navTexts: ['图片找料', '上门取样', '寄送样品'], // 找料类型 
				companyaddress: '', // 公司地址
				address: '', // 找料地址
				finds: [{
					cid: '',
					desc: '',
					address: '',
					checkIndex: 0,
					desc_img: [],
					files:[],
					areaText:'请选择服务区域',
					area_id:'',
					is_compare:false,
					is_limit:false,
					reference_price:''
				}],
				taskEditItem:''
			};
		},
		components: {
			upload
		},
		onLoad(optiosn) {
			if(optiosn.taskEditItem){
				uni.setNavigationBarTitle({
					title: "修改任务"
				})
				this.$data.taskEditItem = uni.getStorageSync('findItem');
				let item = this.$data.taskEditItem;
				this.$data.finds[0].id         = item.id;
				this.$data.finds[0].cid        = item.cid;
				this.$data.finds[0].cname      = item.cname;
				this.$data.finds[0].check      = item.check;
				this.$data.finds[0].find_type  = item.find_type;
				this.$data.finds[0].checkIndex = item.find_type - 1;
				
				this.$data.finds[0].desc       = item.desc;
				this.$data.finds[0].address_id = item.address_id;
				this.$data.finds[0].address    = item.address;
				this.$data.finds[0].area_id    = item.area_id;
				this.$data.finds[0].is_compare = item.is_compare;
				this.$data.finds[0].is_limit   = item.is_limit;
				this.$data.finds[0].reference_price   = item.reference_price;
				
				// areaText:'请选择服务区域',
				// area_id:'',
				// is_compare:false,
				// is_limit:false,
				// reference_price:''
				if(item.desc_img.length>0){
					let desc_img = [];
					item.desc_img.forEach((o,i)=>{
						let imgObj = {
							url:o,
							pct:'finish'
						}
						desc_img.push(imgObj);
					})
					this.$data.finds[0].files = desc_img;
				}
				
			}else{
				uni.setNavigationBarTitle({
					title: "立即找料"
				})
			}
			// 获取公司地址
			this.getCompanyaddress();
			// 获取默认地址
			this.getSelectedAddress();

		},
		onShow() {
			// 获取说明内容
			this.getNeedKnow();
			// 获取默认区域数据第一个
			this.initArea();
			// 判断是否显示说明弹窗
			if(this.$data.taskEditItem == ''){
				if (uni.getStorageSync('isFindNotes') == '') {
					this.$data.isNotes = true
				}
			}
			
			this.$eventHub.$on('classifyData', (data) => {
				console.log('classifyData:', data)
				this.$data.cid = data.cid;
				this.$data.cname = data.cname;
				this.$data.finds[data.index].cid = data.cid;
				this.$data.finds[data.index].cname = data.cname;
				this.$eventHub.$off('classifyData');
			})
			this.$eventHub.$on('findPage', (data) => {
				console.log('findPage:', data);
				this.$data.finds[data.findIndex].address = data.address;
				this.$eventHub.$off('findPage');
			})
		},
		methods: {
			// 比价优选
			checkCompare(index){
				this.$data.finds[index].is_compare = this.$data.finds[index].is_compare == 0?1:0;
			},
			// 限时找料
			checkLimit(index){
				this.$data.finds[index].is_limit = this.$data.finds[index].is_limit == 0?1:0;
			},
			// 初始化服务区域
			initArea(){
				api.findArea({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						if(this.$data.taskEditItem == ''){
							this.$data.areaText = res.data[0].name;
							this.$data.area_id  = res.data[0].id;
							this.$data.finds[0].areaText = res.data[0].name;
							this.$data.finds[0].area_id  = res.data[0].id;
						}else{
							
							this.$data.area_id  = this.$data.finds[0].area_id;
							res.data.forEach((o,i)=>{
								if(o.id == this.$data.finds[0].area_id){
									this.$data.finds[0].areaText = res.data[i].name
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
								_this.$data.finds[index].area_id  = arr[res.tapIndex].id;
								_this.$data.finds[index].areaText = arr[res.tapIndex].name;
								util.successTips('区域选择成功');
							},
							fail: function (res) {
								console.log(res.errMsg);
								util.successTips('区域选择失败');
							}
						});
					}
				})
			},
			
			// 去地址选择页面
			goConsigneeAddress(index) {
				wx.navigateTo({
					url: '../address/address?from=findPage&findIndex=' + index
				})
			},
			// 加入小鹿任务
			submit() {
				let _this = this;
				let finds = this.$data.finds;
				
				for(let i=0;i<finds.length;i++){
					// 判断物料
					if (finds[i].cid == '') {
						util.errorTips('第' + (i + 1) + '个任务,请填写物料类型')
						return false
					}
					
					if (finds[i].desc == '') {
						util.errorTips('第' + (i + 1) + '个任务,请填写描述')
						return false
					}
					
					if (finds[i].checkIndex == 0) { // 按图找料
						if (finds[i].files.length > 0) {
							let isUploading = finds[i].files.every((ele, i) => {
								return (ele.pct && ele.pct === 'finish')
							})
							if (!isUploading) {
								util.errorTips('图片正在上传')
								return false
							}
							let imgs = [];
							finds[i].files.forEach((o, i) => {
								imgs.push(o.url);
							})
							// 找料任务赋值
							finds[i].desc_img = imgs;  
						} else {
							util.errorTips('第' + (i + 1) + '个任务，至少上传一张图片')
							return false
						}
						
					} else if (finds[i].checkIndex == 1) { // 上门取样
						if (finds[i].address == '') {
							util.errorTips('第' + (i + 1) + '个任务，请添加地址')
							return false;
						}
						finds[i].address_id = finds[i].address.id;
						
					} else if (finds[i].checkIndex == 2) { // 寄送样品
					
					}
					
					finds[i].find_type = finds[i].checkIndex + 1;
					finds[i].type = 1;
					finds[i].is_limit = finds[i].is_limit?1:0;
					finds[i].is_compare = finds[i].is_compare?1:0;
				}
				
				let task = {
					'task': finds
				};


				
				// 加入小鹿任务
				this.$data.findDisabled = true;
				
				if(this.$data.taskEditItem!=''){  // 编辑
					finds[0].fetch_num = 1;
					finds[0].id = this.$data.taskEditItem.id;
					let data = finds[0];
					api.updateTaskInit({
						method: 'POST',
						data
					}).then((res)=>{
						if(res.code == 200 || res.code == 0){
							let task = {'task':finds}
							this.$eventHub.$emit('editData', task);
							uni.navigateBack({
								delta:1
							})
						}else{
							util.errorTips(res.msg);
						}
					}).catch((res) => {
						util.errorTips(res.msg);
					})
				}else{
					api.joinTask({
						method: 'POST',
						data: task
					}).then((res) => {
						setTimeout(() => {
							this.$data.findDisabled = false;
						}, 500)
					
						if (res.code == 200 || res.code == 0) {
							console.log('joinTask-finds:',this.$data.finds);
							this.$data.isPopup = true;
							_this.$data.interval = setInterval(function() {
								console.log(_this.$data.payNum);
								_this.$data.payNum--;
								if (_this.$data.payNum == 0) {
									_this.$data.isPopup = false;
									clearInterval(_this.$data.interval);
									_this.goPay();
									_this.$data.payNum = 10;
								}
							}, 1000)
						} else {
							this.$data.findDisabled = true;
						}
					}).catch((res) => {
						if(res.msg){
							util.errorTips(res.msg);
						}else{
							util.errorTips(res);
						}
						
						this.$data.findDisabled = false;
					})
				}
				
				
				

			},
			imageUpload(e) {
				this.$data.finds[e.itemIndex].files = e.files;
			},
			// 删除找料单个信息
			closed(index) {
				let _this = this;
				wx.showModal({
					title: '提示',
					content: '确认删除吗？',
					confirmText: '确认',
					success: (res) => {
						if (res.confirm) {
							_this.$data.finds.splice(index, 1);
						} else if (res.cancel) {
							util.errorTips('您点击了取消')
						}
					}
				})
			},
			// 继续添加找料
			addFind() {
				let data = {
					cid: this.$data.cid,
					cname:this.$data.cname,
					desc: '',
					address: this.$data.address,
					checkIndex: this.$data.checkIndex,
					desc_img: [],
					files:[],
					areaText:this.$data.areaText,
					area_id:this.$data.area_id,
					is_compare:false,
					is_limit:false,
					reference_price:''
				};
				this.$data.finds.push(data);
				console.log('finds:', this.$data.finds);
			},
			// 收货地址
			getSelectedAddress() {
				// 获取默认地址
				api.defaultAddress({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.address = res.data;
						this.$data.finds[0].address = res.data;
					} else if (res.code == 2) {
						this.$data.finds[0].address = '';
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
			// 切换找料方式
			checkNav(checkIndex, index) {
				this.$data.checkIndex = checkIndex;
				this.$data.finds[index].find_type = checkIndex + 1;
				this.$data.finds[index].checkIndex = checkIndex;
			},
			// 隐藏找料须知
			hiddenNotes() {
				this.$data.isNotes = false;
			},
			// 获取找料须知
			getNeedKnow() {
				api.needKnow({}).then((res) => {
					if (res.code == 0 || res.code == 200) {
						this.$data.findNeedKnow = res.data.find_need_know
					}

				})
			},
			//须知弹窗是否继续显示 
			checkIsResNotes() {
				this.$data.isResNotes = !this.$data.isResNotes;
				if (this.$data.isResNotes) {
					uni.setStorageSync('isFindNotes', true);
				} else {
					uni.removeStorageSync('isFindNotes');
				}
			},
			// 显示照料须知
			showNotes() {
				this.$data.isNotes = false;
			},
			// 选择物料类型
			goClassify(index) {
				uni.navigateTo({
					url: '../classify/classify?from=1&index=' + index
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
		}
	}
</script>

<style lang="scss" scoped>
	.address-q-i{
		margin-top: 0;
	}
	.address-q{
		padding-left: 40upx;
	}
	.text-red{
		position: relative;
		top:-5upx;
		right: 40upx;
	}
	.address-j{
		padding-left: 60upx;
	}
	.address-info{
		position: relative;
		top: -30upx;
		view{
			line-height: 50upx;
		}
	}
	.reference_price{
		margin-left: 100upx;
	}
	.choosePrice{
		position: relative;
		margin-left: 38upx;
		input{
			border: 1upx solid #eee;
			display: inline-block;
			width: 200upx;
			position: relative;
			font-size: 24upx;
			top: 20upx;
			left: 20upx;
			padding-left: 20upx;
		}
	}
	.cname{
		font-size: 24upx;
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
			width: 480upx;
			height: 60upx;
			line-height: 60upx;
			display: inline-block;
		}
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

	/*提交按钮  */
	.submit-form {
		margin-top: 50rpx;
		margin-bottom: 50rpx;
	}

	.submit-form button {
		color: #FFF;
		background: #F29800;
		margin-bottom: 30rpx;
		position: relative;
		z-index: 99999;
	}

	.submit-form button::after {
		border: none;
	}

	.bb1 view {
		margin: 10upx 0;
	}

	.remark {
		border: 1rpx solid rgba(242,152,0,1);
		color: rgba(242,152,0,1);
		border-radius: 5rpx;
		margin-right: 10rpx;
		padding: 0 5rpx;
		display: inline !important;
		margin-left: 20upx;
	}

	.icon-gantan1 {
		position: relative;
		top: 2upx;
		margin-right: 10upx;
	}

	.address {
		position: relative;
		margin: 10upx 0;

		.no-address {
			position: relative;
			left: 100upx;
			top: 10upx;
		}

		.icon-jiantou {
			position: absolute;
			top: 40upx;
			right: 30upx;
		}

		.icon-dizhi {
			position: absolute;
			top: 30upx;
			left: 20upx;
			font-size: 50rpx;
		}
		
		.address-info view {
			width: 520upx;
			position: relative;
			
			word-break: break-all
		}
	}


	.find {
		.items {
			.item {
				margin: 0 20upx;
				border-radius: 10upx;
				box-shadow: 0 2upx 10upx rgba(102, 102, 102, 0.3);
				margin-top: 20upx;
				overflow: hidden;
				background-color: #fff;
				font-size: 32upx;

				.upload {
					margin: 20upx 0;
				}

				.nav {
					height: 110upx;
					line-height: 110upx;
					padding-left: 40upx;
					border-top: 1upx solid #eee;
					border-bottom: 1upx solid #eee;
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

				.td {
					// height: 200upx;
					border-top: 1upx solid #eee;
					position: relative;
					padding-top: 20upx;
					.find-desc {
						position: relative;
						top: -38upx;
						left: 166upx;
						width: 500upx;
						height: 230upx;
						overflow: hidden;
						background: #F5F5F5;
						font-size: 24upx;
						padding: 10upx;
					}

					.word-spacing {
						letter-spacing: 10upx;
					}
				}
			}
		}

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
		width: 660upx;
		padding: 20upx;
		min-height: 330upx;
		background-color: #fff;
		position: absolute;
		top: 20%;
		left: 25upx;
		border-radius: 10upx;
		font-size: 28upx;
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

	.address-info {
		padding:20upx 0upx;
		margin-top: 20upx;
		.text-red{
			margin-top: 10upx;
		}
	}

	.company-mobile {
		position: relative;
		left: -150upx;
	}

	.xuzhi {
		text-align: center;
		margin: 0 auto;
		margin-top: 30upx;
	}

	.xuzhi image {
		width: 35upx;
		height: 35upx;
		margin-right: 5upx;
		position: relative;
		top: 8upx;
	}

	.xuzhi text {
		font-size: 24upx;
		color: #999;
	}

	.notes-btn {

		margin-bottom: 10upx;
	}

	.mgt-10 {
		margin-top: 10upx;
	}

	.notes-btn view {
		margin-left: 218upx;
		background-color: #F29800;
		color: #fff;
	}

	.notes-btn-content {
		top: 2%;
		overflow-y: auto;
	}

	.index-popup-main view {
		line-height: 50upx;
	}

	.icon-del1 {
		position: absolute;
		font-size: 50upx;
		right: 10upx;
		top: -15upx;
		color: #999;
	}
</style>
