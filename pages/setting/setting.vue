<template>
	<view class="index">
		<view class="setting_list">
			<view class="item_first">
				<view class="item-subTitle">完善个人信息</view>
			</view>
			<view class="item">
				<view class="item-title">登录密码</view>
			</view>
			<view class="item">
				<view class="item-title">支付密码</view>
			</view>
			<view class="item">
				<view class="item-title">推荐人</view>
			</view>
			<view class="item">
				<view class="item-title">版本号</view>
			</view>
			<view class="item">
				<view class="item-title">清除缓存</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F5F5F5;
	}
	.setting_list{
			background-color: orange;
			height: 800upx;
			.item{
				background-color: green;
				height: 116upx;
			}
			.item_first{
				background-color: red;
				height: 180upx;
			}
			.item-title{
				font-size:32upx;
				color: #333333;
				text-align: center;
			}
		}
</style>
