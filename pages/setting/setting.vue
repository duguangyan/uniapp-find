<template>
	<view class="index">
		<view class="setting_list">
			<navigator url="userInfo/userInfo">
				<list-icon subTitle="完善个人信息"></list-icon>
			</navigator>
			<navigator url="">
				<list-item title="登录密码"></list-item> <!-- 传入一个静态的值 动态绑定 再前面加冒号： -->
			</navigator>
			
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
	import listIcon from "@/components/list/list-icon.vue"
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		},
		components:{
			listItem,listIcon,
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F5F5F5;
		height: 100vh;
	}
	.setting_list{
			background-color: #F5F5F5;
			height: 800upx;
			
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
