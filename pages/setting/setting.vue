<template>
	<view class="index">
		<view class="setting_list">
			<view class="item_first">
				1
			</view>
			<view class="item">
				2
			</view>
			<view class="item">
				3
			</view>
			<view class="item">
				4
			</view>
			<view class="item">
				5
			</view>
			<view class="item">
				6
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
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			height: 800upx;
			.item{
				background-color: green;
				flex-basis: 116upx;
			}
			.item_first{
				background-color: red;
				flex-basis: 180upx;
			}
		}
</style>
