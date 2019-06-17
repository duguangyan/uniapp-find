<template>
 	<view class="wx_content fs24">

 		<view class="nav flex fw6">
 			<view class="flex-1 text-center" :class="{active:navIndex == index}" v-for="(item,index) in navText" :key="index" @click="checkNav(index)">
 				{{item}}
 			</view>
 		</view>
 		
 		<view class="code">
 			<view class="box">
 				<image class="img" src="https://static.yidap.com/miniapp/o2o/imgs/ic_login_user.png"></image>
 				<image class="close" src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="isPhone" @click="clearPhone"></image>
 				<input class="input" type="number" @input="clickPhone" placeholder="请输入您的手机号" v-model="phone" />
 			</view>
 		</view>
 		
 		<view class="passworld" v-if="navIndex == 0">
 			<view class="box">
 				<image class="img" src="https://static.yidap.com/miniapp/o2o/imgs/ic_login_code.png"></image>
 				<image class="close" src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="isCode" @click="clearCode"></image>
 				<input class="input" type="number" @input="clickCode" placeholder="请输入验证码" v-model="code" />
 				<view class="code" :class="{codeActive:isCodeActive}" @click="generateCode">{{codeText}}</view>
 			</view>
 		</view>
 		
 		<view class="code pass" v-if="navIndex == 1">
 			<view class="box">
 				<image class="img" src="https://static.yidap.com/miniapp/o2o/imgs/ic_login_pass.png"></image>
 				<image class="close" src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="isPassworld" @click="clearPassworld"></image>
 				<input class="input" password type="text" placeholder="请输入登录密码" @input="clickPassworld" v-model="passworld" />
 			</view>
 		</view>
 		
 		
 		<view class="forget" @click="reset">
 			<!-- {{navIndex == 0?"忘记密码？":""}} -->
			忘记密码
 		</view>
 		<view class="login text-666 text-center" :class="{loginActive:isLogin}" @click="doLogin">
 			登录
 		</view>
 		
 		<view class="tips text-666 text-center" v-if="navIndex == 0">
 			无需注册,可直接登录
 		</view>
 		
 		<view class="footer text-666 text-center" v-if="navIndex == 0">
 			首次登录将自动注册,注册则代表您同意《用户协议》
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
 				title: "登录",
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
 		computed:{
 			navIndex(){
 				return this.$store.state.fromRest;
 			}
 		},
 		methods:{
 			goblack(){
 				uni.navigateBack({
 					delta: 1
 				});
 			},
 			checkNav(index){
 				this.$store.commit('changeReset',{number: index})
 				this.judgeIsSelect();
 				
 			},
 			judgeIsSelect(){
 				if(this.$store.state.fromRest == 0){
 					if(util.vailPhone(this.$data.phone)&&this.$data.code!=""){
 						this.$data.isLogin = true;
 					}else{
 						this.$data.isLogin = false;
 					}
 				}else if(this.$store.state.fromRest == 1){
 					if(util.vailPhone(this.$data.phone)&&this.$data.passworld!=""){
 						this.$data.isLogin = true;
 					}else{
 						this.$data.isLogin = false;
 					}
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
 				console.log(this.$data.phone);
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
 							type: 2
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
 				
 				console.log(uni.getStorageSync("page") == "order");
 				if(this.$data.isLogin){
 					if(this.$store.state.fromRest == 0){
 						api.loginByValidateCode({
 							method:"POST",
 							data:{
 								mobile:this.$data.phone,
 								validateCode:this.$data.code
 							}
 						}).then((res)=>{
 							if(res.code==0){
 								
 								
 								
 								console.log("login:"+res);
 								let resData = res;
 								uni.setStorageSync("token",resData.data.token);
 								
 								api.getUserInfo().then((res)=>{
 									resData.data.name = name
 								})
 								uni.setStorageSync('userInfo', resData.data);
 								this.$store.commit('setToken',{token: resData.data.token});
 								this.$store.commit('setUserInfo',{userInfo: resData.data});
 								this.$eventHub.$emit('doUserInfo',resData.data);
 								
 								
 // 								// #ifdef  MP-WEIXIN || APP-PLUS
 // 								if(this.$store.state.footer_store.now_page_index == 3){
 // 									this.$store.commit("change_page",0)
 // 								}else{
 // 									this.$store.commit("change_page",this.$store.state.footer_store.now_page_index)
 // 								}
 // 								// #endif
 // 								
 // 								// #ifdef  H5
 // 								if(this.$store.state.footer_store.now_page_index == 2){
 // 									this.$store.commit("change_page",0)
 // 								}else{
 // 									this.$store.commit("change_page",this.$store.state.footer_store.now_page_index)
 // 								}
 // 								// #endif
 								
 								uni.navigateBack({
 									delta: 1
 								});
 								
 								
 							}
 						})
 					}else{
 						api.login({
 							method:"POST",
 							data:{
 								mobile:this.$data.phone,
 								password:this.$data.passworld
 							}
 						}).then((res)=>{
 							if(res.code==0){
 								
 								let resData = res;
 								uni.setStorageSync("token",resData.data.token);
 			
 								api.getUserInfo().then((res)=>{
 									resData.data.name = res.data.name;
 								})
 								uni.setStorageSync('userInfo', resData.data);
 								this.$store.commit('setToken',{token: resData.data.token});
								
 								this.$store.commit('setUserInfo',{userInfo: resData.data});
 								this.$eventHub.$emit('doUserInfo',res.data);
 								this.$eventHub.$emit('order',"order");
 								uni.navigateBack({
 									delta: 1
 								});
 							}
 						})
 					}
 					
 				}
 			},
 			reset(){
 				uni.navigateTo({
 					url: "/pages/resetPassworld/resetPassworld"
 				})
 			}
 		},
 		getUserInfo(){
 			
 		}
 	}
 </script>
 
 <style lang="scss" scoped>
 	page{
 		background: #fff;
 	}
 	.wx_content{
 		background: #fff;
 		height: 100%;
 		overflow: hidden;
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
 				z-index: 999999;
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
 				z-index: 999999;
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
 		margin-top: 40upx;
 		line-height: 80upx;
 		border-bottom: 1upx solid orange; 
		font-size: 32upx;
 		.active{
 			border-bottom: 4upx solid orange;
 		}
 	}
 	.icon-close{
 		image{
 			width: 80upx;
 			height: 80upx;
 		}
 		position:relative;
 		top: 130upx;
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
 