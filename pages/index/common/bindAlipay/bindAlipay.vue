<template>
	<view class="alipay">
		<view class="items">
			<view class="item" v-for="(item, index) in items" :key="index">
				<text>{{item.t}}</text>:
				<input type="text" v-model="item.v" :placeholder="item.p">
			</view>
		</view>
		<view class="btn" @click="bindAlipay">立即绑定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnText:'立即绑定',
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
				
			}
		},
	}
</script>

<style lang="scss" scoped>
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
			margin-top: 740upx;
		}
		.items{
			padding: 50upx 30upx;
			background: #fff;
			.item{
				margin-bottom: 30upx;
				
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
					top: 30upx;
					border-radius: 10upx;
				}
			}
		}
	}
</style>
