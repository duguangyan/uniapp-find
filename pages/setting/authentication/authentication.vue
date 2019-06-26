<template>
	<view class="wx_content">
		<view class="authentication">
			<view class="nav flex">
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
					<view class="value fll">
						<input type="text" v-model="item.value" :placeholder="item.placeholder" @focus="onFocus(index)">
					</view>
				</view>
			</view>
			<view>
				<view class="image" v-for="(item,index) in ngImgTextArr" :key="index" @click="checkImg(index)" v-if="navIndex == 0 ? index < 2:index>=2">
					<image :src="item.img"></image>
					<view class="bgszie" v-if="bgImg[index] == '' ">+</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
			<view class="btn-warp">
				<view class="btn" @click="save">提交</view>
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
				showCon:false,
				navArr:[
					{name:"个人用户",imgUrl:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_personl_no_select.png",activeImg:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_personl_select.png"},
					{name:"企业用户",imgUrl:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_company_no_select.png",activeImg:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_company_select.png"},
				],
				navIndex:0,
				bgImg:["","",""],
				arr:[
					{name:"姓名:",value:"",placeholder:"请输入您的姓名"},
					{name:"联系电话:",value:"",placeholder:"请输入您的联系电话"},
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
		methods:{
			changeModalCancel(){
				this.$data.showCon = false;
			},
			onFocus(index){
				console.log(index);
				let _this = this;
				if(index==2){
					uni.chooseLocation({
						success: function (res) {
							console.log('位置名称：' + res.name);
							console.log('详细地址：' + res.address);
							console.log('纬度：' + res.latitude);
							console.log('经度：' + res.longitude);
							_this.$data.arr[2].value = res.address;
							_this.$data.arr[3].value = res.name;
							
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
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						let tempFilePaths = res.tempFilePaths;
						let url = "https://webapi.yidapi.com.cn/app/common/upload";
						uni.uploadFile({
							url,
							filePath: tempFilePaths[0],
							name: 'file',
							formData: api.returnData(url),
							success: function (uploadFileRes) {
								console.log(uploadFileRes.data);
								console.log("--------------------");
								let img = JSON.parse(uploadFileRes.data).data;
								_this.$data.ngImgTextArr[index].img = img; 
								_this.$data.bgImg[index] = img; 
								util.successTips("图片上传成功");
							}
						});
				
					}
				});
			},
			save(){
				
				let province,city,county;
				if(this.$data.arr[2].value != ""){
					 province = this.$data.arr[2].value.split("省")[0] + "省";
					 city     = this.$data.arr[2].value.split("省")[1].split("市")[0] + "市";
					 county   = this.$data.arr[2].value.split("省")[1].split("市")[1].split("区")[0] + "区";
				}
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
				
				api.auditApply({
					method:"POST",
					data:{
						type:this.$data.navIndex,
						buyerName:this.$data.arr[0].value,
						mobile:this.$data.arr[1].value,
						identificationCard:this.$data.arr[4].value,
						idCardBackImg:this.$data.bgImg[1],
						idCardFrontImg:this.$data.bgImg[0],
						
						province,
						city,
						county,
						buyerAddressDetail:this.$data.arr[3].value,
						
						
						businessLicence:this.$data.bgImg[2],
						businessNumber:this.$data.arr[4].value,
						companyName:this.$data.arr[0].value,
						corporationName:this.$data.arr[1].value
					}
				}).then((res)=>{
					util.successTips("提交审核成功");
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wx_content{
		background: #fff;
		height: 100%;
	}
	.height160{
		height: 140upx;
	}
	.authentication{
		height: 100%;
		background: #fff;
		margin-bottom: 240upx;
		.btn-warp{
			background: #fff;
			padding-bottom: 40upx;
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
