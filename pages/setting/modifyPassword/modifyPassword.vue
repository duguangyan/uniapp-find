<template>
	<view class="index">
		<text>{{title}}</text>
		<view class="editSection" id="id_mobile">
			<image src="/static/center/contact.png" mode=""></image>
			<input type="number" placeholder="请输入您的手机号码" v-model="mobile" @input="inputMobile"/>
		</view>
		<view class="editSection" id="id_verify">
			<image src="/static/center/verify.png" mode=""></image>
			<input type="number" placeholder="请输入验证码" @input="inputVerify"/>
		</view>
		<button class="verifyButton" :class="{verifyActive:isVerifyActive}" @click="getVerify">获取验证码</button>
		<view class="editSection" id="id_password">
			<image src="/static/center/password.png" mode=""></image>
			<input type="number" placeholder="请输入新密码" @input="inputPassword"/>
		</view>
		<button class="commitButton" :class="{commitActive:isCommitActive}" type="primary" @click="commitPassword">提交</button>
	</view>
</template>

<script>
	import util from "../../../utils/util.js";
 	import api from "../../../utils/api.js";
	export default {
		data() {
			return {
				title:'修改登录密码',
				isVerifyActive:false,
				isCommitActive:false,
				mobile:'',
				verify:'',
				password:'',
			};
		},
		onLoad(options) {
			console.log(options);
			if(options.index == 1){
				this.$data.title = '修改支付密码'
			}
		},
		methods:{
			getVerify(){
				if(this.$data.isVerifyActive){
					console.log('isVerifyActive');
					api.changeNickName({
						method: "POST",
					data: {
						
						},
					}).then((res)=>{
						if (res.code == 0) {
							
						}
						console.log(res)
					});
				}
			},
			inputMobile(event){
				// console.log(this.$data.mobile);
				// console.log(util.vailPhone(this.$data.mobile));
				console.log(util.vailPhone(event.target.value));
				this.$data.mobile = event.target.value;
				util.vailPhone(event.target.value) ? this.$data.isVerifyActive = true : this.$data.isVerifyActive = false;
				this.judgeIsCommit();
			},
			inputVerify(event){
				this.$data.verify = event.target.value;
				this.judgeIsCommit();
			},
			inputPassword(event){
				this.$data.passworld = event.target.value;
				this.judgeIsCommit();
			},
			judgeIsCommit(){
				if(util.vailPhone(this.$data.mobile)&&this.$data.verify!=""&&this.$data.passworld!=""){
					this.$data.isCommitActive = true;
				}else{
					this.$data.isCommitActive = false;
				}
 			},
			commitPassword(){
				if(this.$data.isCommitActive){
					
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: white;
		position: relative;
		top: 0upx;
		height: 724upx;
		text{
			color: black;
			font-size:40upx;
			position: absolute;
			left: 60upx;
			top: 62upx;	
		}
		image{
			height: 64upx;
			width: 64upx;
			position: absolute;
			left: 10upx;
			top: 12upx;
		}
		input{
			font-size: 28upx;
			position: absolute;
			top: 20upx;
			left: 82upx;
		}
		.editSection{
			background-color: #F5F5F5;
			height: 88upx;
			position: absolute;
			left: 60upx;
			right: 60upx;
			border-radius: 8upx;
		}
		#id_mobile{
			top: 208upx;
		}
		#id_verify{
			top: 328upx;
			right: 280upx;
		}
		#id_password{
			top: 448upx;
		}
		.verifyButton{
			position: absolute;
			top: 328upx; 
			right: 60upx;
			font-size: 28upx;
			width: 200upx;
			border: 2upx solid #DDDDDD;
			border-radius: 8upx;
			background-color: white;
			color: #DDDDDD;
		}
		.verifyActive{
			background-color: #F08D05;
			color: white;
		}
		.commitButton{
			background-color: #8E8E8E;
			position: absolute;
			bottom:0upx; 
			left: 60upx;
			right: 60upx;
		}
		.commitActive{
			background-color: #F08D05;
		}
		
	}
</style>
