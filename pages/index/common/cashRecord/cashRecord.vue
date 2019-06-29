<template>
	<view class="record">
		<view class="items">
			<view class="item" v-for="(item, index) in list" :key="index">
				
				<view>
					<text>{{txts.t1}}</text><text class="mgl-20 text-666">{{item.t}}</text>
				</view>
				<view>
					<text>{{txts.t2}}</text><text class="mgl-20  text-666">{{item.y}}</text>
				</view>
				<view>
					<text>{{txts.t3}}</text><text class="mgl-20  text-666">￥{{item.m}}</text>
				</view>
				
				<view class="text-yellow">提现中</view>
			</view>
		</view>
		
		<view class="footer-text">{{footerText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				footerText:'没有更多信息了',
				txts:{
					t1:'提现时间:',
					t2:'提现方式:',
					t3:'提现金额:'
				},
				list:[
					{
						t : '2018-12-12 12:12:12',
						y : '微信',
						m : '40.00'
					},
					{
						t : '2018-12-12 12:12:12',
						y : '微信',
						m : '40.00'
					}
				]
			};
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			name() {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.record{
		background: #f4f4f4;
		height: 100%;
		.footer-text{
			line-height: 100upx;
			text-align: center;
			color: #999;
		}
		.items{
			font-size: 28upx;
			padding-top: 20upx; 
			.item{
				margin: 0 20upx 20upx 20upx;
				border-radius: 10upx;
				background: #fff;
				padding: 20upx;
				position: relative;
				.text-yellow{
					position: absolute;
					right: 30upx;
					top: 50upx;
				}
			}
		}
	}
</style>
