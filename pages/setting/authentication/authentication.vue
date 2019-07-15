<template>
	<view class="wx_content">
		<view class="authentication">
			<view class="nav flex" v-if="(userType == 0 || userType == 3) && (userStatus == 0 || userStatus == 3)">
				<view class="flex-1" v-for="(item,index) in navArr" :key="index" @click="navCheck(index)">
					<image :src="navIndex==index?item.activeImg:item.imgUrl"></image>
					<view>{{item.name}}</view>
				</view>
				<view class="line"></view>
			</view>
			<view class="input">
				<view class="li cf" v-for="(item,index) in arr" :key="index">
					<view class="name fll">
						{{item.name}}
					</view>
					<view class="value fll cf">
						<input type="text" v-model="item.value" :placeholder="item.placeholder" @tap.stop="onFocus(index)">
						<view v-if="(userType == 1 || userType == 2) && index == 2" class="VerificationCode flr" @click.stop="getVerificationCode">{{VerificationCodeText}}</view>
					</view>
				</view>
			</view>
			
			<view>
				<view class="image" v-for="(item,index) in ngImgTextArr" :key="index" v-if="navIndex == 0 ? index < 2:index>=2">
					<image :src="item.img" @click="checkImg(index)" ></image>
					<view class="bgszie" v-if="bgImg[index] == '' " @click="checkImg(index)">+</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
			<!-- 状态0:未认证 1审核通过，2待审核 ，3审核不通过' -->
			<view class="info text-red" v-if="userStatus !=0">
				{{status_label}}
			</view>
			<view class="btn-warp" v-if="userStatus == 0">
				<view class="btn" @click="save">提交</view>
			</view>
			<view class="btn-warp" v-if="userStatus == 3">
				<view class="btn" @click="save">重新提交</view>
			</view>
		</view>
		
		<view  v-if="showCon" class="modal-mask" @click="changeModalCancel">
			<view class="modal-dialog">
			  <view class="modal-title">温馨提示</view>
			  <view class="modal-content">
				获取定位失败，请前往设置打开定位权限
			  </view>
			  <view class="modal-footer">
				<view class="btn-cancel" @click="changeModalCancel">取消</view>
				<button open-type="openSetting" class="btn-confirm button-on-view" style="padding:0rpx;" @click="changeModalCancel">设置</button>
			  </view>
			</view>
		  </view>
	</view>
	
	
</template>

<script>
	import util from '../../../utils/util.js';
	import api  from '../../../utils/api.js';
	export default {
		data() {
			return {
				title: "用户认证",
				VerificationCodeText:'获取验证码',
				code_id:'',
				userType:0,
				userStatus:0,
				status_label:'',
				showCon:false,
				navArr:[
					{name:"个人用户",imgUrl:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_personl_no_select.png",activeImg:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_personl_select.png"},
					{name:"企业用户",imgUrl:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_company_no_select.png",activeImg:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_company_select.png"},
				],
				navIndex:0,
				bgImg:["","",""],
				arr:[
					{name:"姓名:",value:"",placeholder:"请输入您的姓名"},
					{name:"联系电话:",value:"",placeholder:"请输入您的手机"},
					{name:"验证码:",value:"",placeholder:"请输入验证码"},
					{name:"详细地址:",value:"",placeholder:"请选择地区"},
					{name:"门牌号:",value:"",placeholder:"街道、楼牌等"},
					{name:"身份证号码:",value:"",placeholder:"请输入您的身份证号码"},
				],
				ngImgTextArr:[
					{text:"请上传身份证正面(信息页)",img:"https://static.yidap.com/miniapp/o2o/imgs/ic_certifcation_card_back.png"},
					{text:"请上传身份证反面(国徽页)",img:"https://static.yidap.com/miniapp/o2o/imgs/ic_certifcation_card_back.png"},
					{text:"请上传营业执照正面",img:"https://static.yidap.com/miniapp/o2o/imgs/ic_certifcation_card_back.png"}
				]
			}
		},
		onLoad(options) {
			this.$data.userType = uni.getStorageSync('userType');
			if(this.$data.userType == 1 || this.$data.userType == 2){
				this.$data.arr=[
					{name:"姓名:",value:"",placeholder:"请输入您的姓名"},
					{name:"联系电话:",value:"",placeholder:"请输入您的手机"},
					{name:"验证码:",value:"",placeholder:"请输入验证码"},
					{name:"详细地址:",value:"",placeholder:"请选择地区"},
					{name:"门牌号:",value:"",placeholder:"街道、楼牌等"},
					{name:"身份证号码:",value:"",placeholder:"请输入您的身份证号码"},
				]
			}else{
				this.$data.arr=[
					{name:"姓名:",value:"",placeholder:"请输入您的姓名"},
					{name:"联系电话:",value:"",placeholder:"请输入您的手机"},
					{name:"详细地址:",value:"",placeholder:"请选择地区"},
					{name:"门牌号:",value:"",placeholder:"街道、楼牌等"},
					{name:"身份证号码:",value:"",placeholder:"请输入您的身份证号码"},
				]
			}
			
			api.auditApply({}).then((res)=>{
				if(res.code == 200 || res.code == 0){
					this.$data.userStatus      = res.data.status;
					if(res.data.status>0){
						this.$data.userAuthentication = res.data;
						let userAuthentication = res.data;

						this.$data.status_label = userAuthentication.status_label;
						this.$data.arr[0].value = userAuthentication.consignee;
						this.$data.arr[1].value = userAuthentication.mobile;
						this.$data.arr[3].value = userAuthentication.address;
						
						if(this.$data.userType == 2 || this.$data.userType == 3){
							this.$data.arr[4].value = '';
							this.$data.arr[5].value = userAuthentication.id_card_no;
						}else{
							//this.$data.arr[4].value = '';
							this.$data.arr[4].value = userAuthentication.id_card_no;
						}
						
						
						if(this.$data.userStatus != 0){
							if(userAuthentication.type == 1){
								this.$data.ngImgTextArr[0].img = userAuthentication.id_card_front;
								this.$data.ngImgTextArr[1].img = userAuthentication.id_card_back;
								this.$data.bgImg[0] = userAuthentication.id_card_front;
								this.$data.bgImg[1] = userAuthentication.id_card_back;
							}else{
								this.$data.ngImgTextArr[3].img = userAuthentication.id_card_front;
								this.$data.bgImg[3] = userAuthentication.id_card_front;
							}
						}
					}
				}	
			})
			
			
			
			
		},
		onShow() {
			
			if(this.$data.userType == 0 || this.$data.userType == 3){
				uni.setNavigationBarTitle({
					title: "用户认证"
				})
			}else if(this.$data.userType == 1){
				uni.setNavigationBarTitle({
					title: "认证找料员"
				})
			}else if(this.$data.userType == 2){
				uni.setNavigationBarTitle({
					title: "认证配送员"
				})
			}
			
		},
		methods:{
			getVerificationCode(){
				if(this.$data.arr[1].value == ""){
					util.successTips('请填写手机号码');
					return false;
				}
				api.regSMS({
					method:'POST',
					data:{
						mobile:this.$data.arr[1].value
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.code_id = res.data.id;
						this.$data.VerificationCodeText = "重新发送";
					}
				}).catch((res)=>{
					util.errorTips(res.msg || res.message);
				})
			},
			changeModalCancel(){
				this.$data.showCon = false;
			},
			onFocus(index){
				console.log(index);
				let _this = this;
				let userType = uni.getStorageSync('userType');
				if(userType == 0 || userType == 3){
					if(index==2){
						uni.chooseLocation({
							success: function (res) {
								console.log('位置名称：' + res.name);
								console.log('详细地址：' + res.address);
								console.log('纬度：' + res.latitude);
								console.log('经度：' + res.longitude);
								if(_this.$data.userType == 0 || _this.$data.userType == 3){
									_this.$data.arr[2].value = res.address;
									_this.$data.arr[3].value = res.name;
								}else{
									_this.$data.arr[3].value = res.address;
									_this.$data.arr[4].value = res.name;
								}
								
								
							},
							fail(res) {
								util.errorTips("获取地图定位失败：" + res.errMsg);
								console.log(res);
								//不允许打开定位
								uni.getSetting({
								  success: (res) => {
									if (!res.authSetting['scope.userLocation']) {
										//打开提示框，提示前往设置页面
										_this.$data.showCon = true;
									}
								  }
								})
							}
						});
					}
				}else{
					if(index==3){
						uni.chooseLocation({
							success: function (res) {
								console.log('位置名称：' + res.name);
								console.log('详细地址：' + res.address);
								console.log('纬度：' + res.latitude);
								console.log('经度：' + res.longitude);
								if(_this.$data.userType == 0 || _this.$data.userType == 3){
									_this.$data.arr[2].value = res.address;
									_this.$data.arr[3].value = res.name;
								}else{
									_this.$data.arr[3].value = res.address;
									_this.$data.arr[4].value = res.name;
								}
								
								
							},
							fail(res) {
								util.errorTips("获取地图定位失败：" + res.errMsg);
								console.log(res);
								//不允许打开定位
								uni.getSetting({
								  success: (res) => {
									if (!res.authSetting['scope.userLocation']) {
										//打开提示框，提示前往设置页面
										_this.$data.showCon = true;
									}
								  }
								})
							}
						});
					}
				}
				
			},
			navCheck(index){
				this.$data.navIndex = index;
				if(index == 0){
					this.$data.arr[0].name = "姓名:";
					this.$data.arr[1].name = "联系电话:";
					this.$data.arr[4].name = "身份证号码:";
					
					this.$data.arr[0].placeholder = "请输入您的姓名";
					this.$data.arr[1].placeholder = "请输入您的联系电话";
					this.$data.arr[4].placeholder = "请输入您的身份证号码";
				}else{
					this.$data.arr[0].name = "企业名称:";
					this.$data.arr[1].name = "企业法人:";
					this.$data.arr[4].name = "营业执照编号:";
					
					this.$data.arr[0].placeholder = "请输入您的企业名称";
					this.$data.arr[1].placeholder = "请输入您的企业法人";
					this.$data.arr[4].placeholder = "请输入您的营业执照编号";
				}
			},
			checkImg(index){
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						const access_token = wx.getStorageSync('access_token') || '';
						let data = {};
						data.file = '[object Object]';
						data.type = 'big';
						let timestamp = Date.parse(new Date());
						data.timestamp = timestamp;
						data.sign = util.makeSign(api.apiUrl + '/api/upload', data);
						data.deviceId = "wx";
						data.platformType = "2";
						data.versionCode = '4.0';
						// 上传图片，返回链接地址跟id,返回进度对象
						let uploadTask = wx.uploadFile({
							url: `${api.apiUrl}/api/upload`,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								'content-type': 'multipart/form-data',
								'Accept': 'application/json',
								'Authorization': `Bearer ${access_token}`
							},
							formData: data,
							success: (res) => {
								console.log('图片上传');
								console.log(res);
								var ress = JSON.parse(res.data);
								if (200 === ress.code || 0 === ress.code) {
									let img = JSON.parse(res.data).data;
									_this.$data.ngImgTextArr[index].img = img; 
									_this.$data.bgImg[index] = img; 
									util.successTips("图片上传成功");
				
								} else {
									util.errorTips('上传错误');
								}
				
							},
							fail(err) {
								console.log(err)
							},
							complete() {
				
							}
						})
					}
				})
			},
			save(){
				let _this = this;
				//let province,city,county;
				// if(this.$data.arr[2].value != ""){
				// 	 province = this.$data.arr[2].value.split("省")[0] + "省";
				// 	 city     = this.$data.arr[2].value.split("省")[1].split("市")[0] + "市";
				// 	 county   = this.$data.arr[2].value.split("省")[1].split("市")[1].split("区")[0] + "区";
				// }
				if(this.$data.navIndex == 0){
					if(this.$data.bgImg[0]=="" || this.$data.bgImg[1]==""){
						if(this.$data.bgImg[0]==""){
							util.errorTips("请上传身份证正面照")
							return false;
						}
						if(this.$data.bgImg[1]==""){
							util.errorTips("请上传身份证背面照")
							return false;
						}
						
					}
				}else{
					if(this.$data.bgImg[2]==""){
						util.errorTips("请上传营业执照");
						return false;
					}
				}
				
				if(this.$data.code_id == ""){
					util.errorTips("请输入验证码");
					return false;
				}
				let data ='';
				if(this.$data.userType == 1 || this.$data.userType == 2 ){
					data = {
							from:1,
							type:this.$data.navIndex + 1,
							consignee:this.$data.arr[0].value,
							mobile:this.$data.arr[1].value,
							address:_this.$data.arr[3].value + _this.$data.arr[4].value,
							id_card_no:this.$data.arr[5].value,
							id_card_back:this.$data.bgImg[1],
							id_card_front:this.$data.bgImg[0]
						}
				}else{
					data = {
							from:1,
							type:this.$data.navIndex + 1,
							consignee:this.$data.arr[0].value,
							mobile:this.$data.arr[1].value,
							address:_this.$data.arr[2].value + _this.$data.arr[3].value,
							id_card_no:this.$data.arr[4].value,
							id_card_back:this.$data.bgImg[1],
							id_card_front:this.$data.bgImg[0]
						}
				}
				
				if(_this.$data.navIndex == 1){
					data.id_card_front = this.$data.bgImg[2]
				}
				if(this.$data.userType == 0 || this.$data.userType == 3){  // 用户认证
					api.auditApply({
						method:"POST",
						data,
					}).then((res)=>{
						if(res.code == 200 || res.code == 0){
							util.successTips("提交审核成功");
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else{
							util.errorTips(res.msg)
						}
						
					}).catch((res)=>{
						util.errorTips(res.msg || res.message)
					})	
				}else if(this.$data.userType == 1){   // 找料员认证
					data.code =this.$data.arr[2].value,
					data.id = this.$data.code_id,
					data.type = 1;
					api.staffAudit({
						method:"POST",
						data,
					}).then((res)=>{
						if(res.code == 200 || res.code == 0){
							util.successTips("提交审核成功");
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else{
							util.successTips(res.msg);
						}
						
						
					}).catch((res)=>{
						util.errorTips(res.msg || res.message)
					})					
				}else if(this.$data.userType == 2){   // 配送员认证
					data.code=this.$data.arr[2].value,
					data.id=this.$data.code_id,
					data.type = 2;
					api.staffAudit({
						method:"POST",
						data,
					}).then((res)=>{
						if(res.code == 200 || res.code == 0){
							util.successTips("提交审核成功");
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else{
							util.errorTips(res.msg)
						}
						
						
					}).catch((res)=>{
						util.errorTips(res.msg || res.message)
					})	
					
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.VerificationCode{
		width: 160upx;
		text-align: center;
		border: 1upx solid #F29800;
		color: #F29800;
		position: absolute;
		right: 10upx;
		top: 10upx;
		z-index: 9999;
		height: 60upx;
		line-height: 60upx;
		color: #fff;
		background: #F29800;
	}
	.info{
		line-height: 100upx;
		padding-left: 30upx;
		border-top: 20upx solid #f4f4f4;
		background: #fff;
		
	}
	.wx_content{
		background: #f4f4f4;
		height: 100%;
	}
	.height160{
		height: 140upx;
	}
	.authentication{
		background: #fff;
		margin-bottom: 240upx;
		.btn-warp{
			background: #f4f4f4;
			padding-bottom: 100upx;
			.btn{
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				background: orange;
				color: #fff;
				width: 650upx;
				position: relative;
				left: 40upx;
				top: 40upx;
				bottom: 40upx;
				border-radius: 10upx;
			}
		}
		
		.image{
			width: 100%;
			position: relative;
			
			image{
				width: 400upx;
				height: 240upx;
				margin-left: 175upx;
			}
			.bgszie{
				position: absolute;
				font-size: 140upx;
				 top: 20upx;
				 left: 320upx;
				 z-index: 9999;
				 color: #fff;
			}
			.text{
				text-align: center;
				line-height: 60upx;
				padding-bottom: 10upx; 
			}
		}
		.input{
			margin: 20upx 30upx;
			
			.li{
				border-bottom: 1upx solid #eee; 
				height: 80upx;
				line-height: 80upx;
			
				.name{
					width: 200upx;
				}
				.value{
					width: 490upx;
					position: relative;
					input{
						height: 80upx;
						line-height: 80upx;
					}
				}
			}
		}
		.nav{
			position: relative;
			border-bottom:20upx solid #eee; 
			padding-bottom: 40upx; 
			image{
				width: 80upx;
				height: 80upx;
				margin: 10upx auto;
				margin-top: 40upx;
			}
			.flex-1{
				text-align: center;
			}
			.line{
				position: absolute;
				height: 60%;
				width: 1upx;
				background: #eee;
				left: 375upx;
				top: 50upx;
			}
		}
	}
	
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
      width: 540rpx;
      overflow: hidden;
      z-index: 9999;
      background: #f9f9f9;
      border-radius: 5rpx;
    }
    .modal-title {
      padding-top: 30rpx;
      font-size: 32rpx;
      color: #030303;
      text-align: center;
    }
    .modal-content {
      padding: 20rpx 32rpx;
      font-size: 28rpx;  
    }
    .modal-footer {
      display: flex;
      flex-direction: row;
      height: 86rpx;
      border-top: 1px solid #dedede;
      font-size: 34rpx;
      line-height: 86rpx;
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

</style>
