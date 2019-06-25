<template>
	<view class="index">
		<view class="setting_list">
			<navigator url="userInfo/userInfo">
				<view class="item_first">
				<image class="icon" src="/static/icon/add-find.png"></image>
				<text>完善个人信息</text>
				<image class="arrow" src="/static/center/arrow.png"></image>
			</view>
			</navigator>
			aa
			<list-item title="登录密码"></list-item> <!-- 传入一个静态的值 动态绑定 再前面加冒号： -->
			<list-item title="支付密码"></list-item>
			<list-item title="绑定小鹿家人" id="item_mid_top"></list-item>
			<list-item title="用户认证" id="item_mid_bottom"></list-item>
			<list-item title="版本号" isShowText="true"></list-item>
			<list-item title="清除缓存" isShowText="true"></list-item>
			<button type="primary" class="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue" //这里不能用list
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		},
		components:{
			listItem,
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F5F5F5;
		height: 1334upx;
	}
	.setting_list{
			background-color: #F5F5F5;
			height: 800upx;
			
			.item_first{
				background-color: white;
				height: 180upx;
				position: relative;
				.icon{
					position: absolute;
					top: 28upx;
					left: 40upx;
					height: 120upx;
					width: 120upx;
				}
				text{
					color: #999999;
					position: absolute;
					right: 88upx;
					top: 76upx;
				}
				.arrow{
					position: absolute;
					right: 20upx;
					top: 76upx;
					height: 28upx;
					width: 28upx;
				}
			}
			#item_mid_top{
				margin-top: 20upx;
			}
			#item_mid_bottom{
				margin-bottom: 20upx;
			}
			.item-title{
				font-size:32upx;
				color: #333333;
				position: relative;
				top: 40upx;
				left: 40upx;
			}
			
			.logout {
				background-color: rgb(240, 141, 5);
				width: 90%;
				margin-top: 162upx;
			}
		}
</style>
