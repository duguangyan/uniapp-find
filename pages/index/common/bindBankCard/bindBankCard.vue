<template>
	<view class="alipay">
		<view class="items">
			<view class="item" v-for="(item, index) in items" :key="index">
				<text>{{item.t}}</text>:
				<input :class="{ 'item-2': index == 1, 'item-5': index==5 }" :disabled="index==1" type="text" v-model="item.v" :placeholder="item.p">
				<view class="item-5-btn" v-if="index == 1" @click="getBankCardInfo(index)">
					<image src="../../../../static/icon/xinji.png"></image>
				</view>
				<view class="item-2-btn" v-if="index == 5" @click="getCode">{{codeBtnTxt}}</view>
			</view>
			
		</view>
		<view class="btn" @click="bindAlipay">立即绑定</view>
	</view>
</template>

<script>
	import util from "../../../../utils/util.js";
	import api from "../../../../utils/api.js";
	export default {
		data() {
			return {
				btnText:'立即绑定',
				codeBtnTxt:'获取验证码',
				code_id:'',
				bank_card_type :0,
				bank_name:'',
				items:[
					{
						t:'持卡人姓名',
						v:'',
						p:'请输入持卡人姓名'
					},
					{
						t:'储蓄卡号',
						v:'',
						p:'请上传储蓄银行卡正面照片'
					},
					{
						t:'开户银行',
						v:'',
						p:'请输入开户银行'
					},
					{
						t:'开户网点',
						v:'',
						p:'请输入开户网点信息'
					},
					{
						t:'手机号码',
						v:'',
						p:'请输入您的手机号码'
					},
					{
						t:'短信验证码',
						v:'',
						p:'请输入短信验证码'
					}
				]
			};
		},
		onLoad(options) {
			
			if(options.edit == 1){   // 编辑
				
				this.memberBankCardBind();
			}
		},
		onShow() {
			
		},
		methods: {
			memberBankCardBind(){
				api.memberBankCardBind({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						let info = res.data;
						this.$data.items[0].v = info.real_name;
						this.$data.items[1].v = info.bank_card_number;
						this.$data.items[2].v = info.bank_name;
						this.$data.items[3].v = info.bank_card_opening;
						this.$data.items[4].v = info.mobile;
						this.$data.bank_card_type = info.bank_card_type;
						this.$data.bank_card_img  = info.bank_card_img;
					}else{
						util.errorTips(res.msg);
					}
				}).catch((res)=>{
					util.errorTips(res.msg || res.message);
				})
			},
			
			// 获取银行卡信息
			getBankCardInfo(index){
			
				
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
									_this.$data.bank_card_img  = ress.data;
									api.apiOcrBankCard({
										method:'POST',
										data:{
											bank_card_img : ress.data
										}
									}).then((resss)=>{
										if(resss.code == 200 || resss.code == 0){
											_this.$data.bank_card_type = resss.data.bank_card_type;
											_this.$data.items[2].v     = resss.data.bank_name;
											_this.$data.bank_name      = resss.data.bank_name;
											_this.$data.items[index].v = resss.data.bank_card_number;
											
										}
									})
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
			// 绑定银行卡信息
			bindAlipay() {
				
				if(this.$data.items[0].v == ""){
					util.errorTips('请输入您的银行卡姓名');
					return false; 
				}
				
				
				
				if(this.$data.items[1].v == ""){
					util.errorTips('请输入您的储蓄卡卡号');
					return false; 
					
					if(this.$data.bank_card_type != 1){
						util.errorTips('请上传正确的储蓄卡照片');
						return false;
					}
				}
				
				if(this.$data.items[2].v == ""){
					util.errorTips('请输入您的开户银行');
					return false; 
				}
				
				if(this.$data.items[3].v == ""){
					util.errorTips('请输入您的开户银行网点地址');
					return false; 
				}
				if(this.$data.items[4].v == ""){
					util.errorTips('请输入您的手机号');
					return false; 
				}
				if(this.$data.items[5].v == ""){
					util.errorTips('请输入短信验证码');
					return false; 
				}
				
				if(this.$data.code_id == ""){
					util.errorTips('请重新获取验证码');
					return false; 
				}
				
				if(this.$data.bank_card_type >1){
					util.errorTips('此类型卡不能办理提现业务，请重新上传储蓄卡照片');
					return false; 
				}
				let data = {
					bank_name :this.$data.items[2].v,
					real_name:this.$data.items[0].v,
					id:this.$data.code_id,
					mobile:this.$data.items[4].v,
					code:this.$data.items[5].v,
					bank_card_number :this.$data.items[1].v,
					bank_card_type : this.$data.bank_card_type,
					bank_card_opening :this.$data.items[3].v,
					bank_card_img:this.$data.bank_card_img,
				}
				api.memberBankCardBind({
					method:'POST',
					data
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						util.successTips(res.msg);
						uni.navigateBack({
							delta:1
						})
					}else{
						util.errorTips(res.msg)
					}
				}).catch((res)=>{
					util.errorTips(res.msg || res.message)
				})
			},
			getCode(){
				if(this.$data.items[4].v == ""){
					util.errorTips('手机号不能为空');
					return false; 
				}
				if(!util.vailPhone(this.$data.items[4].v)){
					util.errorTips('请输入正确手机号');
					return false; 
				}
				
				let data = {
					mobile:this.$data.items[4].v
				}
				api.regSMS({
					method:'POST',
					data
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.code_id = res.data.id;
						util.errorTips('短信发送成功');
						this.$data.codeBtnTxt = '重新获取';
					}else{
						util.errorTips(res.msg);
					}
				}).catch((res)=>{
					util.errorTips(res.msg || res.message);
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.item-2{
		width: 360rpx !important;
		position: relative;
	}
	.item-5{
		width: 420rpx !important;
		position: relative;
	}
	.item-5-btn{
		width: 88upx;
		height: 88upx;
		position: absolute;
		right:5upx;
		top:0upx;
		image{
			width: 88upx;
			height: 88upx;
		}
	}
	.item-2-btn{
		width: 180upx;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		background: #F29800;
		color: #fff;
		position: absolute;
		right:5upx;
		top:0upx;
		z-index: 99999;
		border-radius:0upx 10upx 10upx 0upx;
	}
	.alipay{
		height: 100%;
		background: #f4f4f4;
		.btn{
			width: 630upx;
			height: 88upx;
			line-height: 88upx;
			background: #F29800;
			color: #fff;
			font-size: 32upx;
			text-align: center;
			margin: 0 auto;
			border-radius: 10upx;
			margin-top: 140upx;
		}
		.items{
			padding: 50upx 30upx;
			background: #fff;
			.item{
				margin-bottom: 30upx;
				position: relative;
				font-size: 30upx;
				position: relative;
				top: -20upx;
				text{
					display: inline-block;
					width: 160upx;
				}
				input{
					display: inline-block;
					width: 480upx;
					height: 88upx;
					line-height: 88upx;
					margin-left: 20upx;
					background: #f4f4f4;
					color: #333;
					padding-left: 20upx;
					position: relative;
					top: 0upx;
					border-radius: 10upx;
				}
			}
		}
	}
</style>
