<template>
	<view class="index">
		<text>修改登录密码</text>
		<view class="editSection" id="id_mobile">
			<image src="../../../static/center/contact.png" mode=""></image>
			<textarea value="" placeholder="请输入您的手机号码" />
		</view>
		<view class="editSection" id="id_verify">
			<image src="../../../static/center/verify.png" mode=""></image>
			<textarea value="" placeholder="请输入验证码" />
		</view>
		<button class="verifyButton">获取验证码</button>
		<view class="editSection" id="id_password">
			<image src="../../../static/center/password.png" mode=""></image>
			<textarea value="" placeholder="请输入新密码" />
		</view>
		<button class="commitButton" type="primary" disabled="true">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
		textarea{
			font-size: 28upx;
			position: absolute;
			top: 30upx;
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
			border: 2upx solid #DDDDDD;
			border-radius: 8upx;
			color: #DDDDDD;
			font-size: 28upx;
			width: 200upx;
			position: absolute;
			top: 328upx; 
			right: 60upx;
		}
		.commitButton{
			background-color: #8E8E8E;
			position: absolute;
			bottom:0upx; 
			left: 60upx;
			right: 60upx;
		}
		
	}
</style>
