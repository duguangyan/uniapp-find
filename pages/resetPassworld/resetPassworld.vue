<template>
	<view class="wx_content fs24">
	
		
		
		<!-- <view class="icon-close" @click="goblack">
			<image src="https://static.yidap.com/miniapp/o2o/imgs/ic_window_close.png"></image>
		</view>
		<view class="reset-title">
			找回密码
		</view> -->
		
	
		
		
		
		<view class="code">
			<view class="box">
				<image class="img" src="https://static.yidap.com/miniapp/o2o/imgs/ic_login_user.png"></image>
				<image class="close" src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="isPhone" @click="clearPhone"></image>
				<input class="input" type="number" @input="clickPhone" placeholder="请输入您的手机号" v-model="phone" />
			</view>
		</view>
		
		<view class="passworld">
			<view class="box">
				<image class="img" src="https://static.yidap.com/miniapp/o2o/imgs/ic_login_code.png"></image>
				<image class="close" src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="isCode" @click="clearCode"></image>
				<input class="input" type="number" @input="clickCode" placeholder="请输入验证码" v-model="code" />
				<view class="code" :class="{codeActive:isCodeActive}" @click="generateCode">{{codeText}}</view>
			</view>
		</view>
		
		<view class="code pass">
			<view class="box">
				<image class="img" src="https://static.yidap.com/miniapp/o2o/imgs/ic_login_pass.png"></image>
				<image class="close" src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="isPassworld" @click="clearPassworld"></image>
				<input class="input" type="text" password placeholder="请输入您的新密码" @input="clickPassworld" v-model="passworld" />
			</view>
		</view>
		
		
		<view class="login text-666 text-center" :class="{loginActive:isLogin}" @click="doLogin">
			登录
		</view>
		
	
		
	</view>
</template>

<script>
	import wxTitle from "../../components/wx-title.vue";
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	import md5 from "../../utils/md5.min.js";
	export default {
		data() {
			return {
				title: "找回密码",
				navIndex: 0,
				navText:["验证码登录","密码登录"],
				phone: "",
				code:"",
				passworld:"",
				isPhone: false,
				isCode: false,
				isPassworld: false,
				isLogin:false,
				isCodeActive: false,
				codeText:"获取验证码"
			};
		},
		components: {
			wxTitle
		},
		methods:{
			goblack(){
				uni.navigateBack({
					delta: 1
				});
			},
			checkNav(index){
				this.$data.navIndex = index;
				this.judgeIsSelect();
				
			},
			judgeIsSelect(){
				if(util.vailPhone(this.$data.phone)&&this.$data.code!=""&&this.$data.passworld!=""){
					this.$data.isLogin = true;
				}else{
					this.$data.isLogin = false;
				}
			},
			clickPhone(event){
				console.log(this.$data.phone);
				console.log(util.vailPhone(this.$data.phone));
				this.$data.phone =  event.target.value;
				this.$data.phone != ""?this.$data.isPhone = true:this.$data.isPhone = false;
				util.vailPhone(this.$data.phone)?this.$data.isCodeActive = true:this.$data.isCodeActive = false;
				this.judgeIsSelect();
			},
			clearPhone(){
				this.$data.phone = "";
				this.$data.isLogin = false;
				this.$data.isCodeActive = false;
				this.judgeIsSelect();
				this.$data.isPhone = false;
			},
			clickCode(){
				this.$data.code != ""?this.$data.isCode = true:this.$data.isCode = false;
				this.judgeIsSelect();
				
			},
			clearCode(){
				this.$data.code = "";
				this.$data.isLogin = false;
				this.$data.isCode = false;
			},
			clickPassworld(){
				this.$data.passworld != ""?this.$data.isPassworld = true:this.$data.isPassworld = false;
				this.judgeIsSelect();
			},
			clearPassworld(){
				this.$data.passworld = "";
				this.$data.isLogin = false;
				this.$data.isPassworld = false;
			},
			generateCode(){
				if(this.$data.isCodeActive){
					api.generateCode({
						method:"POST",
						data:{
							mobile: this.$data.phone,
							type: 1
						}
					}).then((res)=>{
						if(res.code == 0){
							uni.showToast({
								title: '短信发送成功',
								icon:'none',
								duration: 2000
							});
							this.$data.codeText = "重新获取";
						}
					})
				}
			},
			doLogin(){
				if(this.$data.isLogin){
					api.updatePassword({
						method:"POST",
						data:{
							mobile:this.$data.phone,
							password:this.$data.passworld,
							validateCode:this.$data.code
						}
					}).then((res)=>{
						if(res.code==0){
							this.$store.commit('changeReset',{number: 1});
							uni.navigateBack({
								delta: 1
							});
						}
					})
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.height140{
		height: 60upx;
	}
	page{
		background: #fff;
	}
	.wx_content{
		background: #fff;
		height: 100%;
	}
	.reset-title{
		margin-top: 160upx;
		margin-left: 50upx;
		font-size: 44upx;
	}
	.forget{
		text-align: right;
		margin-right: 20upx;
		color: #999;
		height: 30upx;
		margin-top: 30upx;
	}
	.tips{
		margin-top: 100upx;
	}
	.login{
		height: 80upx;
		width: 680upx;
		background: #999;
		line-height: 80upx;
		border-radius: 10upx;
		margin: 0 auto;
		margin-top: 50upx;
		color: #fff;
	}
	.footer{
		margin-top: 360upx;
		color: #999;
	}
	.passworld{
		.box{
			height: 80upx;
			width: 480upx;
			background: #eee;
			margin-left: 40upx;
			border-radius: 10upx;
			margin-top: 40upx;
			position: relative;
			.code{
				position: absolute;
				height: 80upx;
				line-height: 80upx;
				width: 180upx;
				background: #e2e2e2;
				font-size: 24upx;
				border-radius: 10upx;
				right: -200upx;
				color: #fff;
				text-align: center;
		
				.close{
					z-index: 999999;
				}
				
			}
			.img{
				width: 60upx;
				height: 60upx;
				position: absolute;
				top: 14upx;
				left: 10upx;
			}
			.close{
				width: 40upx;
				height: 40upx;
				position: absolute;
				right: 20upx;
				top: 20upx;
				z-index: 99999;
			}
			.input{
				position: absolute;
				left: 80upx;
				top: 6upx;
				color: #333;
				font-size: 28upx;
				width: 320upx;
				height: 60upx;
				line-height: 60upx;
				padding: 10upx 0;
				font-size: 32upx;
			}
		}
	}
	
	.code{
		.box{
			height: 80upx;
			width: 680upx;
			background: #eee;
			margin: 0 auto;
			border-radius: 10upx;
			margin-top: 100upx;
			position: relative;
			.img{
				width: 60upx;
				height: 60upx;
				position: absolute;
				top: 14upx;
				left: 10upx;
			}
			.close{
				width: 40upx;
				height: 40upx;
				position: absolute;
				right: 20upx;
				top: 20upx;
				z-index: 99999;
			}
			.input{
				position: absolute;
				left: 80upx;
				top: 6upx;
				color: #333;
				font-size: 28upx;
				width: 600upx;
				height: 60upx;
				line-height: 60upx;
				padding: 10upx 0;
				font-size: 32upx;
			}
		}
	}
	.password{
		margin-top: 30upx;
	}
	.pass{
		.box{
			margin-top: 40upx;
		}
	}
	.nav{
		font-size: 28upx;
		margin-top: 200upx;
		line-height: 80upx;
		border-bottom: 1upx solid orange; 
		.active{
			border-bottom: 4upx solid orange;
		}
	}
	.icon-close{
		image{
			width: 80upx;
			height: 80upx;
		}
		position: relative;
		top: 100upx;
		left: 30upx;
		opacity: .8;
	}
	.codeActive{
		background: orange !important;
	}
	.loginActive{
		background: orange !important;
	}
</style>
