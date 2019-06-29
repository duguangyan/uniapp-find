<template>
	<view class="index">
		<view class="setting_list">
			<list-icon subTitle="完善个人信息" :avatar_path="avatarPath" @didClick="goUserInfo()"></list-icon>
			<navigator url="modifyPassword/modifyPassword">
				<list-item title="登录密码"></list-item>
			</navigator>
			
			<view class="bb20">
				<list-item title="支付密码" @didClick="goModifyPassword(1)"></list-item>
			</view>
			
			<view @click="goIn" v-if="userType == 0 || userType == 3">
				<list-item title="绑定小鹿家人" id="item_mid_top"></list-item>
			</view>
			<view @click="goAuthentication" class="bb20">
				<list-item :title="authent" id="item_mid_bottom"></list-item>
			</view>
			
			<list-item title="版本号" isShowText="true" :showText='v'></list-item>
			<list-item title="清除缓存" isShowText="true" :showText='currentSize' @didClick="clearSync"></list-item>
			<button type="primary" class="logout" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue" //这里不能用list
	import listIcon from "@/components/list/list-icon.vue"
	import util     from "../../utils/util.js";
	import api      from "../../utils/api.js";
	export default {
		data() {
			return {
				avatar_path:"/static/icon/add-find.png",
				v:'',
				currentSize:'',
				userType:0,
				authent:'用户认证',
				userStatus:0,
				userAuthentication:''
			}
		},
		onShow() {
			let _this = this;
			this.$data.userType = uni.getStorageSync('userType');
			if(this.$data.userType == 0 || this.$data.userType == 3){
				this.$data.authent = '用户认证';
			}else if(this.$data.userType == 1){
				this.$data.authent = '认证找料员';
			}else if(this.$data.userType == 2){
				this.$data.authent = '认证配送员';
			}
			uni.getStorageInfo({
				success: function (res) {
					// console.log(res.keys);
					// console.log(res.currentSize);
					// console.log(res.limitSize);
					_this.$data.currentSize =  res.currentSize  + ' kb';
				}
			});
			// 用户认证信息
			this.auditApply();
		},
		methods: {
			auditApply(){
				api.auditApply({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.userAuthentication = res;
					}
					
				})
			},
			// 清除缓存
			clearSync(){
				
			},
			// 去认证中心
			goAuthentication(){
				if(this.$data.userAuthentication.code == 0 || this.$data.userAuthentication.code == 200){
					uni.setStorageSync('userAuthentication',this.$data.userAuthentication.data);
					uni.navigateTo({
						url:'./authentication/authentication'
					})
				}
			},
			// 退出登录
			logout(){
				try {
					uni.clearStorageSync();
				} catch (e) {
					util.errorTips('退出登录失败，请稍后再试！');
				}
				uni.reLaunch({
					url: '../index/index'
				});
			},
			goIn() {
				let token = wx.getStorageSync('token');
				let isTrue = token ? false : true;
				
				if (isTrue) {
					uni.showModal({
						title: '您尚未登录',
						content: '是否前往登录页面',
						confirmText: '前往',
						// confirmColor: '#c81a29',
						success: (res) => {
							if (res.confirm) {
								wx.navigateTo({
									url: '../login/login',
								})
								return false;
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
			
					return false;
				}
				api.getInviteCode({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						if (res.data.status == 0) {
							uni.navigateTo({
								url: '../familyExplain/familyExplain?familyStatus=' + res.data.status,
							})
						} else if (res.data.status == 1) {
							uni.navigateTo({
								url: '../familyCenter/familyCenter',
							})
						} else {
							uni.navigateTo({
								url: '../family/family',
							})
						}
			
					}
				})
			},
			goUserInfo(){
				uni.navigateTo({
					url:'userInfo/userInfo?avatarPath='+this.avatar_path
				})
			},
			goModifyPassword(index){
				uni.navigateTo({
					url:'modifyPassword/modifyPassword?index=1'
				})
			}
		},
		components:{
			listItem,listIcon,
		},
		onLoad(options) {
			console.log(options);
			this.avatar_path = options.avatarPath;
			this.$data.v = uni.getStorageSync('v');
		}
	}
</script>

<style lang="scss" scoped>
	.bb20{
		border-bottom: 20upx solid #F5F5F5;
	}
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
