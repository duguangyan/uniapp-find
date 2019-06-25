<template>
	<view>
		<view class='no-data' v-if="lists.length<=0">暂无数据</view>
		<!-- 自定义单选/多选/全选实现删除功能 -->
		<view class="chat-list">
			<view class="items">
				<view v-for="(item, index) in lists" :key="index" class="item" :data-name='item.nick_name || item.user_name'
				 :data-photo='item.avatar_path' :data-id='item.to_user_id' @click='goChat'>
					<view @touchstart="touchS" @touchmove="touchM" @touchend="touchE" :data-index="index" :style="item.txtStyle" class="inner txt cf">
						<view class='fll item-1'>
							<image :src="item.avatar_path || avatar_path"></image>
							<view v-if="item.userMessage.sms_status == 1" class='spot'></view>
						</view>
						<view class='fll item-2'>
							<view class='nickName'>{{item.nick_name || item.user_name}}</view>
							<view class='ellipsis'>{{item.userMessage.sms_type=="TEXT"?item.userMessage.content:'[图片]'}}</view>
						</view>
						<view class='flr item-3'>
							{{item.userMessage.date_time}}

						</view>
					</view>
					<view :data-index="index" @click="delItem" class="inner del">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>

	import IMapi from "../../utils/IMapi.js";
	import util from "../../utils/util.js";
	export default {
		data() {
			return {
				avatar_path: 'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png',
				delBtnWidth: 180,
				lists: [],
				startX: ""
			};
		},
		onLoad(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.initEleWidth();
			uni.setStorageSync('chatListIds', [])
		},
		onShow() {
			if (this.socket != '') {
				uni.closeSocket();
			}
			let userId = uni.getStorageSync('userId');
			console.log('userId:' + userId);
			this.socket = uni.connectSocket({ //im.yidap.com webapi.yidapi.com.cn 
				url: 'wss://im.yidap.com/notice/socket?userId=' + userId + '&openType=1'
			});
			let _this = this;
			uni.onSocketClose((res) => {
				console.log("onSocketClose:断开了");
				this.onShow();
			})
			uni.onSocketOpen(function(res) {
				console.log("连接上了");
				console.log(res);
				uni.onSocketMessage(function(res) {
					let resLists = JSON.parse(res.data);
					if (resLists.length > 0) {
						_this.$data.lists = resLists
					} else {
						_this.onShow();

					}


				})
			})
		},
		methods: {
			touchS: function(e) {
				if (e.touches.length == 1) this.$data.startX = e.touches[0].clientX;
			},
			touchM: function(e) {
				if (e.touches.length == 1) {
					//手指移动时水平方向位置
					var moveX = e.touches[0].clientX;
					//手指起始点位置与移动期间的差值
					var disX = this.data.startX - moveX;
					var delBtnWidth = this.data.delBtnWidth;
					var txtStyle = "";
					if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
						txtStyle = "left:0px";
					} else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
						txtStyle = "left:-" + disX + "px";
						if (disX >= delBtnWidth) {
							//控制手指移动距离最大值为删除按钮的宽度
							txtStyle = "left:-" + delBtnWidth + "px";
						}
					}

					//获取手指触摸的是哪一项
					var index = e.currentTarget.dataset.index;
					var lists = this.$data.lists;
					lists[index].txtStyle = txtStyle;
					//更新列表的状态
					this.$data.lists = lists;
				}
			},
			touchE: function(e) {
				if (e.changedTouches.length == 1) {
					//手指移动结束后水平位置
					var endX = e.changedTouches[0].clientX;
					//触摸开始与结束，手指移动的距离
					var disX = this.$data.startX - endX;
					var delBtnWidth = this.$data.delBtnWidth;
					//如果距离小于删除按钮的1/2，不显示删除按钮
					var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
					//获取手指触摸的是哪一项
					var index = e.currentTarget.dataset.index;
					var lists = this.$data.lists;
					lists[index].txtStyle = txtStyle;
					//更新列表的状态
					this.$data.lists = lists;
				}
			},
			//获取元素自适应后的实际宽度
			getEleWidth: function(w) {
				var real = 0;
				try {
					var res = uni.getSystemInfoSync().windowWidth;
					var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
					real = Math.floor(res / scale);
					return real;
				} catch (e) {
					return false;
					// Do something when catch error
				}
			},
			initEleWidth: function() {
				this.$data.delBtnWidth = this.getEleWidth(this.$data.delBtnWidth);
			},
			//点击删除按钮事件
			delItem: function(e) {
				//获取列表中要删除项的下标
				var index = e.currentTarget.dataset.index;
				var lists = this.$data.list;
				//移除列表中下标为index的项
				lists.splice(index, 1);
				//更新列表的状态
				this.$data.lists = lists;
			},
			getCacheMessage() {
				IMapi.getCacheMessage({
					data: {
						receiveUserId: 1,
						sendUserId: 2
					}
				}).then((res) => {
					this.setData({
						list: res.data
					})
				})
			},
			goChat(e) {
				let toUserId = e.currentTarget.dataset.id;
				let chatListIndex = e.currentTarget.dataset.index;
				let fromUserPhoto = e.currentTarget.dataset.photo;
				let userName = e.currentTarget.dataset.name;
				let oldArr = wx.getStorageSync('chatListIds') || [];
				if (oldArr.length > 0) {
					oldArr.forEach((o, i) => {
						if (o != toUserId) {
							oldArr.push(toUserId);
						}
					})
				} else {
					oldArr.push(toUserId);
				}

				wx.setStorageSync('chatListIds', oldArr);
				wx.navigateTo({
					url: '../chat1/chat?toUserId=' + toUserId + '&fmUserName=' + userName + '&fromUserPhoto=' + fromUserPhoto,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat-list .items {
		background: #fff;
		border-top: 1rpx solid #eee;
	}

	.chat-list .items .item {
		height: 140rpx;
		width: 730rpx;
		margin-left: 20rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.no-data {
		text-align: center;
		line-height: 100rpx;
	}

	.chat-list .items .item .item-1 {
		width: 120rpx;
		position: relative;
		text-align: center;
	}

	.chat-list .items .item .item-1 image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 10rpx;
	}

	.chat-list .items .item .item-1 .spot {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background: #C81A29;
		border-radius: 50%;
		top: -5rpx;
		right: 2rpx;
	}

	.chat-list .items .item .item-2 {
		width: 450rpx;
		font-size: 32rpx;
		line-height: 50rpx;
		margin-left: 12rpx;
	}

	.chat-list .items .item .item-2 .ellipsis {
		font-size: 28rpx;
		color: #999;
		width: 420rpx;
		display: block;
		position: relative;
	}

	.chat-list .items .item .item-3 {
		width: 140rpx;
		text-align: right;
		font-size: 24rpx;
		color: #999;
		padding-right: 30rpx;
		line-height: 60rpx;
	}

	.nickName {
		font-weight: 500;
	}


	/* 向左滑动实现删除操作 */
	view {
		box-sizing: border-box;
	}

	.item-box {
		margin: 0 auto;
	}

	.items {
		width: 100%;
	}

	.item {
		position: relative;
		border-top: 2rpx solid #eee;
		height: 140rpx;
		line-height: 140rpx;
		overflow: hidden;
	}

	.item:last-child {
		border-bottom: 2rpx solid #eee;
	}

	.inner {
		position: absolute;
		top: 0;
	}

	.inner.txt {
		font-family: Monaco;
		background: #fff;
		width: 100%;
		z-index: 5;
		transition: left 0.2s ease-in-out;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 20rpx 0;
	}

	.inner.del {
		font-family: Monaco;
		background-color: #e64340;
		width: 180rpx;
		text-align: center;
		z-index: 4;
		right: 0;
		color: #fff;
		font-size: 32rpx;
	}

	.item-icon {
		width: 64rpx;
		height: 120rpx;
		vertical-align: middle;
		margin-right: 16rpx
	}

	::-webkit-scrollbar {
		width: 6px;
		background-color: #f5f5f5;
	}

	::-webkit-scrollbar-thumb {
		background-color: #999;
	}
</style>
