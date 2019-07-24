<template>
	<view class="alipay">
		<view class="items">
			<view class="item" v-for="(item, index) in items" :key="index">
				<text>{{item.t}}</text>:
				<input :class="index == 2 ? 'item-2' : '' " type="text" v-model="item.v" :placeholder="item.p">
				<view class="item-2-btn" v-if="index == 2" @click="getCode">{{codeBtnTxt}}</view>
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
				items:[
					{
						t:'支付宝账号',
						v:'',
						p:'请输入您的支付宝账号'
					},
					{
						t:'账号姓名',
						v:'',
						p:'请输入您的支付宝姓名'
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
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			bindAlipay() {
				
				if(this.$data.items[0].v == ""){
					util.errorTips('请输入您的支付宝账号');
					return false; 
				}
				
				if(this.$data.items[1].v == ""){
					util.errorTips('请输入您的支付宝姓名');
					return false; 
				}
				
				if(this.$data.items[2].v == ""){
					util.errorTips('请输入您的手机号码');
					return false; 
				}
				
				if(this.$data.items[3].v == ""){
					util.errorTips('请输入短信验证码');
					return false; 
				}
				
				
				let data = {
					account:this.$data.items[0].v,
					real_name:this.$data.items[1].v,
					id:this.$data.code_id,
					mobile:this.$data.items[2].v,
					code:this.$data.items[3].v
				}
				api.memberAliBind({
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
				if(this.$data.items[2].v == ""){
					util.errorTips('手机号不能为空');
					return false; 
				}
				let data = {
					mobile:this.$data.items[2].v
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
		width: 320rpx !important;
		position: relative;
		
	}
	.item-2-btn{
		width: 180upx;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		background: #F29800;
		color: #fff;
		position: absolute;
		right:0;
		top:0upx;
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
