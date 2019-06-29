<template>
	<view class="index">
		<view class="center-top">
			<!-- <view class="title">个人中心</view> -->
			<image class="icon" :src="avatar_path"  mode="" @click="changeAvatarPath"></image>
			<view class="name">{{nick_name}}</view>
			<image class="setting" src="/static/center/setting.png" @click="goSetting()"></image>
		</view>
		<view class="wallet">
			<view class="wallet-left">
				<text class="wallet_up">佣金(元)</text>
				<text class="wallet_down">{{virtual}}</text>
			</view>
			<view class="wallet-right">
				<text class="wallet_up">余额(元)</text>
				<text class="wallet_down">{{balance}}</text>
			</view>
			<view class="wallet-separator"></view>
		</view>
		<view class="order find">
			<text class="order_text">找料订单</text>
			<text class="order_check" @click="goOrderPage(-1,0)">查看全部订单</text>
			<view class="horizon_separator"></view>
			<ul>
				<li v-for="(item,index) in order_find" :key='index' @click="goOrderPage(index,0)">
					<image class="order_image" :src="item.img" mode=""></image>
					<text class="order_item_text">{{item.text}}</text>
				</li>
			</ul>
		</view>
		<view class="order fectch">
			<text class="order_text">取料订单</text>
			<text class="order_check" @click="goOrderPage(-1,1)">查看全部订单</text>
			<view class="horizon_separator"></view>
			<ul>
				<li v-for="(item,index) in order_fetch" :key='index' @click="goOrderPage(index,1)">
					<image class="order_image" :src="item.img" mode=""></image>
					<text class="order_item_text">{{item.text}}</text>
				</li>
			</ul>
		</view>
		<view class="horizon_list">
			<view class="items">
				<view class="item" v-for="(item, index) in contents" :key='index'>
					<button class="navigator-text fs30 pdl-30" style="background-color:#fff;border:none;height:115rpx;line-height:115rpx;text-align:left;"
					 open-type="contact">客服</button>
					<image class="arrow" src="/static/center/arrow.png"></image>
				</view>
			</view>
		</view>
		
		<text class="copyright"> Copyright @2019  众皮联 版权所有 版本 {{v}}</text>
	</view>
</template>

<script>
	import api from "../../../utils/api.js";
	import util from "../../../utils/util.js";
	export default {
		data() {
			return {
				v:'', // 版本号
				order_find: [{
						img: "/static/center/find.png",
						text: "找料中",
					},
					{
						img: "/static/center/deliver.png",
						text: "待收货",
					},
					{
						img: "/static/center/receive.png",
						text: "待评价",
					},
					{
						img: "/static/center/evaluate.png",
						text: "已完成",
					}
				],
				order_fetch: [{
						img: "/static/center/find.png",
						text: "取料中",
					},
					{
						img: "/static/center/deliver.png",
						text: "待收货",
					},
					{
						img: "/static/center/receive.png",
						text: "待评价",
					},
					{
						img: "/static/center/evaluate.png",
						text: "已完成",
					}
				],
				contents: [
					// {
					// 	title: "我的地址",
					// },
					{
						title: "在线客服",
					},
					// {
					// 	title: "我的礼券",
					// },
					// {
					// 	title: "积分商城",
					// }
				],
				nick_name: "游客",
				avatar_path: "/static/footer_icon/2.1.png",
				balance: 0,
				marketing: 0,
				virtual: 0,

			};
		},
		onLoad() {
			
		},
		onShow() {
			let xx = uni.getStorageSync('user_name');
			if(uni.getStorageSync('user_name')!=''){
				// 获取用户信息
				this.getUserInfo();
				// 版本号
				this.$data.v = wx.getStorageSync('v');
			}
		},
		created() {
			// 获取用户信息
			this.getUserInfo();
			// 版本号
			this.$data.v = wx.getStorageSync('v');
		},
		mounted() {
			
		},
		methods: {
			// 获取用户信息
			
			getUserInfo(){
				console.log("获取用户信息");
				
				api.getUserInfo({
					method: "GET"
				}).then((res) => {
					console.log(res.data);
					if (res.code == 0 || res.code == 200) {
						this.$data.nick_name = res.data.nick_name;
						this.$data.avatar_path = res.data.avatar_path;
						this.$data.balance = res.data.balance;
						this.$data.marketing = res.data.marketing;
						this.$data.virtual = res.data.virtual;
						// console.log(res.data);
					}
		
				}).catch((res)=>{
					debugger
				})
			},
			goSetting(){
				uni.navigateTo({
					url:"/pages/setting/setting?avatarPath="+this.$data.avatar_path+"&nickName="+this.$data.nick_name
				})
			},
			//跳转下一个页面
			goNextPage(index) {
				//util.successTips('index->' + index);
				if(index == 0){
					uni.navigateTo({
						url:'../address/address'
					})
				}else if(index == 2){
					uni.navigateTo({
						url:'../giftCertificate/giftCertificate'
					})
					
				}else if(index == 3){
					// 去 web-view 积分商城
					uni.navigateTo({
					  url: "../integralmall/integralmall"
					})
				}
				
			},
			// 跳转订单页面
			goOrderPage(index, nav) {
				uni.setStorageSync('method', nav);
				uni.setStorageSync('status', index + 1);
				uni.redirectTo({
					url: '../index/index?from=2'
				});
			},
			// 跳转IM列表
			goChatList() {
				uni.navigateTo({
					url: '../chatList/chatList',
				})
			},
			// 修改头像
			changeAvatarPath() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否修改头像',
					success: (res) => {
						if (res.confirm) {
							uni.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
								success: (res) => {
									// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
									const access_token = wx.getStorageSync('access_token') || '';
									let data = {};
									data.file = '[object Object]';
									data.type = 'big';
									let timestamp = Date.parse(new Date());
									data.timestamp = timestamp;
									data.sign = util.makeSign(api.apiUrl + '/api/upload', data);
									data.deviceId = "wx";
									data.platformType = "2";
									data.versionCode = '4.0';
									// 上传图片，返回链接地址跟id,返回进度对象
									let uploadTask = wx.uploadFile({
										url: `${api.apiUrl}/api/upload`,
										filePath: res.tempFilePaths[0],
										name: 'file',
										header: {
											'content-type': 'multipart/form-data',
											'Accept': 'application/json',
											'Authorization': `Bearer ${access_token}`
										},
										formData: data,
										success: (res) => {
											console.log('图片上传');
											console.log(res);
											var ress = JSON.parse(res.data);
											if (200 === ress.code || 0 === ress.code) {
												_this.$data.avatar_path = ress.data;
												uni.setStorageSync('avatarPath', ress.data);
												api.memberAvatarPath({
													method: 'POST',
													data: {
														avatar_path: ress.data
													}
												}).then((res) => {
													util.successTips('图片上传成功');
												})

											} else {
												util.errorTips('上传错误');
											}

										},
										fail(err) {
											console.log(err)
										},
										complete() {

										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			// 去余额充值页面
			goRecharge(index) {
				wx.navigateTo({
					url: '../recharge/recharge?index=' + index,
				})

			},
			goIn() {
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
			
			
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
	}

	input {
		outline: none;
		border: none;
		list-style: none;
	}

	.index {
		background-color: #F6F6F6;
		padding-bottom: 100upx;
	}

	//top
	.center-top {
		width: 100%;
		height: 320upx;
		background-color: #F29800;

		.title {
			padding-top: 68upx;
			color: white;
			font-size: 36upx;
			line-height: 16px;
		}

		.icon {
			border:1upx solid #fff;
			border-radius: 50%; 
			height: 120upx;
			width: 120upx;
			float: left;
			margin-left: 30upx;
			margin-top: 58upx;
			border-radius: 50%;
		}

		.setting {
			// background-color: pink;
			float: right;
			margin-top: 95upx;
			margin-right: 38upx;
			width: 48upx;
			height: 48upx;
		}
		.message {
			float: right;
			margin-top: 92upx;
			margin-right: 40upx;
			width: 56upx;
			height: 56upx;
		}

		.name {
			color: white;
			font-size: 32upx;
			position: absolute;
			top: 100upx;
			left: 180upx;
		}

		.top-button {
			color: white;
			border: 2upx solid white;
			border-radius: 20upx;
			position: absolute;
			top: 140upx;
			padding: 8upx 20upx;
			height: 40upx;
			font-size: 20upx;
			line-height: 20upx;
		}

		.recharge {
			left: 180upx;
		}

		.buy {
			background-color: transparent;
			left: 340upx;
		}
	}

	//钱包
	.wallet {
		background-color: white;
		border-radius: 8upx;
		height: 180upx;
		position: relative;
		top: -80upx;
		margin: 0upx 30upx;

		.wallet-left {
			// background-color: pink;
			float: left;
			width: 50%;
			height: 100%;
		}

		.wallet-right {
			// background-color: lawngreen;
			float: right;
			width: 50%;
			height: 100%;
		}

		.wallet-separator {
			background-color: #EEEEEE;
			width: 2upx;
			height: 80upx;
			position: absolute;
			top: 50upx;
			left: 50%;

		}

		.wallet_up {
			color: #666666;
			font-size: 30upx;
			position: relative;
			top: 30upx;
		}

		.wallet_down {
			display: block;
			color: #F29800;
			font-size: 48upx;
			position: relative;
			top: 44upx;
		}
	}

	//order
	.order {
		position: relative;
		background-color: white;
		height: 264upx;

		.order_text {
			font-size: 30upx;
			color: #333333;
			position: absolute;
			left: 30upx;
			margin-top: 30upx;
		}

		.order_check {
			font-size: 24upx;
			color: #999999;
			position: absolute;
			right: 38upx;
			margin-top: 30upx;
		}

		.horizon_separator {
			background-color: #D8D8D8;
			position: relative;
			top: 104upx;
			width: 100%;
			height: 2upx;

		}

		ul {
			background-color: blue;
			display: flex;
			display: -webkit-flex;
			/* Safari */
			height: 158upx;
			position: absolute;
			left: 0upx;
			right: 0upx;
			bottom: 0upx;
			padding-left: 0upx;
		}

		li {
			background-color: white;
			display: inline;
			width: 25%;
			height: 158upx;
			justify-content: center;
			flex: 1;
		}

		.order_image {
			display: block;
			align-content: center;
			width: 80upx;
			height: 80upx;
			margin: 28upx auto -8upx;
		}

		.order_item_text {
			color: #333333;
			font-size: 24upx;
			position: relative;
			top: 10upx;
		}
	}

	.find {
		top: -40upx;
	}

	.fectch {
		top: -20upx;
	}

	//列表
	.horizon_list {
		position: relative;
		background-color: #F6F6F6;

		.family {
			display: flex;
			background-color: white;
			height: 112upx;
		}

		.items {

			display: -webkit-flex;
			flex-direction: column;
			margin-top: 20upx;
			padding-left: 0upx;
			.item {
				position: relative;
				background-color: white;
				height: 112upx;
				border-top: 1upx solid #eee;
			
			}
		}

		

		text.title {
			color: #333333;
			font-size: 30upx;
			position: absolute;
			left: 30upx;
			top: 35upx;
		}

		text.subTitle {
			color: #999999;
			font-size: 24upx;
			position: absolute;
			left: 170upx;
			top: 42upx;
		}

		.arrow {
			// background-color: #666666;
			position: absolute;
			top: 42upx;
			right: 25upx;
			width: 28upx;
			height: 28upx;
		}
	}

	.copyright {
		
		color: #999999;
		font-size: 24upx;
		text-align: center;
		line-height: 100upx;
		padding-bottom: 40upx;
		height: 100upx;
		display: block;
	}
</style>
