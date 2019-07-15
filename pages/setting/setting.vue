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

			<view @click="doFamily" v-if="userType == 0 || userType == 3">
				<list-item title="绑定小鹿家人" id="item_mid_top"></list-item>
			</view>
			<view @click="goAuthentication" class="bb20">
				<list-item :title="authent" id="item_mid_bottom"></list-item>
			</view>

			<list-item title="版本号" isShowText="true" :showText='v'></list-item>
			<list-item title="清除缓存" isShowText="true" :showText='currentSize' @didClick="clearSync"></list-item>
			<button type="primary" class="logout" @click="logout">退出登录</button>
		</view>
		
		
		
		<view class='wx_dialog_container' v-if="isDialogShow">
			<view class='wx-mask' @click.stop="_cancelEvent"></view>
			<view class='wx-dialog'>
				<view class='wx-dialog-title'>{{ dialogTitle }}</view>
				<!-- <view class='wx-dialog-content'>{{ content }}</view> -->
				<view class='wx-dialog-content'>
					 <view class='family-view'><input @input="getInputValue"  placeholder='请输入绑定手机号码'></input></view>
				</view>
				
				<view class='wx-dialog-footer'>
				  <view class='wx-dialog-btn' @click.stop='_cancelEvent'>{{ cancelText }}</view>
				  <view class='wx-dialog-btn' @click.stop='_confirmEvent'>{{ confirmText }}</view>
				</view>
			</view>
		</view>
		
		
		


	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue" //这里不能用list
	import listIcon from "@/components/list/list-icon.vue"
	import dialog from "@/components/dialog.vue"
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				dialogTitle: '绑定小鹿家人',
				cancelText:'取消',
				confirmText:'确定',
				inputValue: '',
				v: '',
				currentSize: '',
				userType: 0,
				authent: '用户认证',
				userStatus: 0,
				userAuthentication: '',
				isDialogShow: false
			}
		},
		computed: {
			avatarPath() {
				return this.$store.state.avatarPath;
			},
		},
		onShow() {
			let _this = this;
			this.$data.userType = uni.getStorageSync('userType');
			if (this.$data.userType == 0 || this.$data.userType == 3) {
				this.$data.authent = '用户认证';
			} else if (this.$data.userType == 1) {
				this.$data.authent = '认证找料员';
			} else if (this.$data.userType == 2) {
				this.$data.authent = '认证配送员';
			}
			uni.getStorageInfo({
				success: function(res) {
					// console.log(res.keys);
					// console.log(res.currentSize);
					// console.log(res.limitSize);
					_this.$data.currentSize = res.currentSize + ' kb';
				}
			});
			// 用户认证信息
			this.auditApply();
		},
		methods: {

			// 绑定小鹿家人
			doFamily() {
				let _this = this;
				api.inviteCodeRecommend({}).then((res) => {
					if (res.code == 0 || res.code == 200) {
						if (res.data.status == 0) {
							util.errorTips(res.data.msg);
						} else if (res.data.status == 1) {
							util.errorTips(res.data.data.mobile + ' ：绑定成功！');
						}

					} else if (res.code == 1) {
						this.$data.isDialogShow = true;
					}
				}).catch((res) => {
					this.$data.isDialogShow = true;
				})

			},
			_confirmEvent() {
				api.inviteCodeRecommend({
					method: 'POST',
					data: {
						mobile: this.$data.inputValue
					}
				}).then((res) => {
					if (res.code == 0 || res.code == 200) {
						if (res.data.status == 0) {
							util.errorTips(res.data.msg);
						} else if (res.data.status == 1) {
							util.errorTips(res.data.data.mobile + ' ：绑定成功！');
						}
						this.$data.isDialogShow = false;
					}
				}).catch((res)=>{
					util.errorTips(res.msg || res.message);
				})
			},
			_cancelEvent(){
				this.$data.isDialogShow = false;
			},
			getInputValue(e) {
				this.$data.inputValue = e.detail.value;
				
			},

			auditApply() {
				api.auditApply({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.userAuthentication = res;
					}

				})
			},
			// 清除缓存
			clearSync() {

			},
			// 去认证中心
			goAuthentication() {
				uni.navigateTo({
					url: './authentication/authentication'
				})
				// if(this.$data.userAuthentication.code == 0 || this.$data.userAuthentication.code == 200){
				// 	uni.setStorageSync('userAuthentication',this.$data.userAuthentication.data);
				// }
			},
			// 退出登录
			logout() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录吗?',
					success: function(res) {
						if (res.confirm) {
							try {
								uni.clearStorageSync();
							} catch (e) {
								util.errorTips('退出登录失败，请稍后再试！');
							}
							uni.reLaunch({
								url: '../start/start'
							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
							util.errorTips('你点击了取消');
						}
					}
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
			goUserInfo() {
				uni.navigateTo({
					url: 'userInfo/userInfo'
				})
			},
			goModifyPassword(index) {
				uni.navigateTo({
					url: 'modifyPassword/modifyPassword?index=1'
				})
			}
		},
		components: {
			listItem,
			listIcon,
		},
		onLoad(options) {
			this.$data.v = uni.getStorageSync('v');
		}
	}
</script>

<style lang="scss" scoped>
	.family-view{
	  height: 100rpx;
	}
	.bb20 {
		border-bottom: 20upx solid #F5F5F5;
	}

	.index {
		background-color: #F5F5F5;
		height: 100vh;
	}

	.setting_list {
		background-color: #F5F5F5;
		height: 800upx;

		#item_mid_top {
			margin-top: 20upx;
		}

		#item_mid_bottom {
			margin-bottom: 20upx;
		}

		.item-title {
			font-size: 32upx;
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
	
	
	
	.wx_dialog_container{
		.wx-mask{
		  position: fixed;
		    z-index: 1000;
			width: 100%;
			height: 100%;
		    top: 0;
		    right: 0;
		    left: 0;
		    bottom: 0;
		    background: rgba(0, 0, 0, 0.3);
		}
		.wx-dialog{
		    position: fixed;
		    z-index: 5000;
		    width: 80%;
		    max-width: 600upx;
		    top: 50%;
		    left: 50%;
		    -webkit-transform: translate(-50%, -50%);
		    transform: translate(-50%, -50%);
		    background-color: #FFFFFF;
		    text-align: center;
		    border-radius: 3px;
		    overflow: hidden;
		}
		.wx-dialog-title{
		    font-size: 36upx;
		    padding-top: 20upx;
		}
		.wx-dialog-content{
		    padding: 30upx 20upx;
		    min-height: 40upx;
		    font-size: 32upx;
		    line-height: 1.3;
		    word-wrap: break-word;
		    word-break: break-all;
		    color: #999999;
		    /* height: 500rpx; */
		    overflow: scroll;
		}
		.wx-dialog-footer{
		    display: flex;
		    align-items: center;
		    position: relative;
		    line-height: 88upx;
		    font-size: 32upx;
		}
		.wx-dialog-footer::before{
		    content: '';
		    position: absolute;
		    left: 0;
		    top: 0;
		    right: 0;
		    height: 1upx;
		    border-top: 1upx solid #D5D5D6;
		    color: #D5D5D6;
		    -webkit-transform-origin: 0 0;
		    transform-origin: 0 0;
		    -webkit-transform: scaleY(0.5);
		    transform: scaleY(0.5);
		}
		.wx-dialog-btn{
		    display: block;
		    -webkit-flex: 1;
		    flex: 1;
		    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		    position: relative;
		    background: #F29800;
		    
		}
		.wx-dialog-footer .wx-dialog-btn:nth-of-type(1){
		    color: #fff;
		}
		.wx-dialog-footer .wx-dialog-btn:nth-of-type(2){
		    color: #fff;
		    background-color: #F29800;
		}
		.wx-dialog-footer .wx-dialog-btn:nth-of-type(2):after{
		    content: " ";
		    position: absolute;
		    left: 0;
		    top: 0;
		    width: 1upx;
		    bottom: 0;
		    border-left: 1upx solid #D5D5D6;
		    color: #D5D5D6;
		    -webkit-transform-origin: 0 0;
		    transform-origin: 0 0;
		    -webkit-transform: scaleX(0.5);
		    transform: scaleX(0.5);
		}
	}
</style>
