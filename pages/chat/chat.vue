<template>
	<view>
		<scroll-view upper-threshold="20" :scroll-into-view="toView" :scroll-top="scrollTop" scroll-y="isScrollY" :focus="mode"
		 enable-back-to-top="true" :style="{ height: scroll_height + 'px' }" @scroll="bindscroll" class="message-list">
			<view class='loding-img'>
				<image v-if="noData" src='/static/images/loading.gif'></image>
				<view v-if="!noData">没有更多数据了</view>
			</view>
			<view id="hideview">
				
				<view class="row" v-for="(item , index) in HideData" :key="index">
					
					<view class="datetime" v-if="item.timeInterval && item.timeInterval != ''">{{item.timeInterval}}</view>
					
					<view class="body" :style="{'flex-flow': item.fromUserId != userId ? 'row' : 'row-reverse'}">
						<view class="avatar-container">
							<image class="avatar" :src="item.fromUserId != userId ? fromUserPhoto : toUserPhoto" />
						</view>
						
						<block v-if="item.smsType == 'TEXT'">
							<view class="triangle" :style="item.fromUserId == userId ? 'right: 110rpx; background: #7ECB4B' : 'left: 110rpx;'"></view>
							<view class="msg-content" :style="item.fromUserId == userId ? 'background: #7ECB4B;left:5rpx;' : ''">
								<text class="msg-text" v-if="item.smsType == 'TEXT'">{{item.content}}</text>
								<audio style='width:100px;height:20px' v-if="item.smsType == 'VOICE'" @tap="audioPlay" :data-id="'audio_'+index"
								 :src="item.content"></audio>
							</view>
						</block>
						<image class="picture" v-if="item.smsType == 'IMAGE'" :src="item.content" mode="widthFix" @tap="preview"
						 :data-src="item.content" />
						<block v-if='item.fromUserId == userId && item.smsStatus'>
							<image v-if='item.smsStatus == 10' class='msg-img' src='/static/images/loading.gif'></image>
							<icon v-if='item.smsStatus == 20' @tap='retry' :data-key='index' class='msg-icon' type='warn' size='22'></icon>
						</block>
					</view>
					<block v-if='item.fromUserId == userId && item.smsStatus'>
						<text v-if='item.smsStatus == 40' class='msg-status'>已送达</text>
						<text v-if='item.smsStatus == 50' class='msg-status msg-read'>已读</text>
					</block>
				</view>

			</view>



			<view>
				<view class="row" v-for="(item, index) in EventData" :key="index" :id="'row_'+index">
					
					<view class="datetime" v-if="item.timeInterval && item.timeInterval != ''">{{item.timeInterval}}</view>
				
					<view class="body" :style="{'flex-flow': item.fromUserId != userId ? 'row' : 'row-reverse'}">
						<view class="avatar-container">
							<image class="avatar" :src="item.fromUserId != userId ? fromUserPhoto : toUserPhoto" />
						</view>
						
						<block v-if="item.smsType == 'TEXT'">
							<view class="triangle" :style="item.fromUserId == userId ? 'right: 110rpx; background: #7ECB4B' : 'left: 110rpx;'"></view>
							<view class="msg-content" :style="item.fromUserId == userId ? 'background: #7ECB4B;left:5rpx;' : ''">
								<text class="msg-text" v-if="item.smsType == 'TEXT'">{{item.content}}</text>
								<audio style='width:100px;height:20px' v-if="item.smsType == 'VOICE'" @tap="audioPlay" :data-id="'audio_'+index"
								 :src="item.content"></audio>
							</view>
						</block>
						<image class="picture" v-if="item.smsType == 'IMAGE'" :src="item.content" mode="widthFix" @tap="preview" :data-src="item.content" />
						<block v-if='item.fromUserId == userId && item.smsStatus'>
							<image v-if='item.smsStatus == 10' class='msg-img' src='/static/images/loading.gif'></image>
							<icon v-if='item.smsStatus == 20' @tap='retry' :data-key='index' class='msg-icon' type='warn' size='22'></icon>
						</block>
					</view>
					<block v-if='item.fromUserId == userId && item.smsStatus'>
						<text v-if='item.smsStatus == 40' class='msg-status'>已送达</text>
						<text v-if='item.smsStatus == 50' class='msg-status msg-read'>已读</text>
					</block>
				</view>
			</view>
			
		</scroll-view>
		<view class="hud-container" v-if="status != state.normal">
			<view class="hud-background"></view>
			<view class="hud-body">
				<image src="./images/mic.png" />
				<view class="tip" :class="status == state.cancel ? 'warning' : ''">{{tips[status]}}</view>
			</view>
		</view>
		<view class="height100"></view>
		<view class="reply">
			<!-- <image style='display:none' :src="'/static/images/'+mode ? 'voice.png' : 'text.png'" class="voice-image" @tap="switchMode" /> -->
			<view class="opration-area ply">
			<input v-if="mode"  @focus="inputShowed" confirm-hold="true" type="text" confirm-type="send" @confirm="reply" v-model="content" />
				<!-- <button class="voice-button" bindlongtap="record" bindtouchstart="touchStart" bindtouchmove="touchMove" bindtouchend="touchEnd" wx:else>{{tips[status]}}</button> -->
			</view>
			<image src="/static/images/image.png" class="choose-image ply" @tap="chooseImage" />
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js';
	import IMapi from '../../utils/IMapi.js';
	import util from '../../utils/util.js';
	import md5 from '../../utils/md5.js';
	import math from '../../utils/math.js';

	export default {
		data() {
			return {
				content:'',
				isFalse: false,
				inputShowed: false,
				isConfirmHold: true,
				isScrollY: true,
				toId: '',
				sms: 0,
				baseUrl: 'https://webapi.yidap.com',
				message_list: [],
				scroll_height: wx.getSystemInfoSync().windowHeight,
				page_index: 0,
				mode: true,
				cancel: false,
				status: 0,
				tips: ['按住 说话', '松开 结束', '取消 发送'],
				state: {
					'normal': 0,
					'pressed': 1,
					'cancel': 2
				},
				toView: '',
				userId: wx.getStorageSync('userId'),
				to_avatar_path: 'https://static.yidap.com/miniapp/o2o/imgs/collection@2x.png',
				currentPage: 2,
				pageSize: 10,
				scrollLoading: 0,
				HideData: [],
				EventData: [],
				NoMoreEvent: 0,
				noData: true,
				fromUserPhoto: '',
				toUserPhoto: '',
				userInfoId: '',
				maxlength: 500,
				messageCache: [],
				prevIndex: -1,
				totalSize:'',
				scrollTop:0,
			}
		},
		onLoad(options) {
			let avatar_path = uni.getStorageSync('avatar_path');
			let userId = uni.getStorageSync('userId');

			if (options.id) {
				this.$data.toId = options.id
			} else {
				this.$data.toId = options.toUserId
			}
			uni.setNavigationBarTitle({
				title: options.fmUserName,
			})
			
			this.$data.prevIndex =  options.chatListIndex ? options.chatListIndex : -1;
			this.$data.fromUserPhoto = options.fromUserPhoto ? options.fromUserPhoto : 'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png';
			this.$data.toUserPhoto =  avatar_path ||
					'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png';
			this.$data.userInfoId =  parseInt(userId) > parseInt(this.$data.toId) ? md5.md5(this.$data.toId + userId) : md5.md5(userId +
					this.$data.toId);
		

			let message = {
				fromUserId: userId,
				toUserId: this.$data.toId,
				content: 'page',
				smsType: 'TEXT',
				sysType: 1,
				smsStatus: 10,
				smsList: false,
				currentPage: 1,
				pageSize: 10
			}
			this.sendSocketMessage(JSON.stringify(message))

		},
		mounted(){
			
		},
		onShow() {
			let _this = this;
			this.globalData.callback = function(res) {
				console.log('-->>',res);
				let result = res;
				if (String(result.userInfoId) == '0') {
					return;
				}
				let HideData = _this.$data.HideData;
				let EventData = _this.$data.EventData;
				let arr = [];
				if (result && result.list) {
					_this.$data.totalSize = result.totalSize
					let dataTjson = result.list;
					if (dataTjson.length > 0) {
						if (_this.$data.currentPage > 2) {
							_this.$data.HideData = dataTjson;
							_this.$data.noData = true;
						}
						HideData = dataTjson.concat(HideData);
					} else {
						_this.$data.noData = false;
						return false;
					}

					if (_this.$data.currentPage <= 2) {
						_this.$data.EventData = HideData
						_this.$data.toView = 'row_10';
						_this.scrollToBottom();
					} else {
						_this.$data.HideData = dataTjson
					}

					let n = _this.$data.totalSize - _this.$data.EventData.length - _this.$data.HideData.length;
					if (n == 0) {
						_this.$data.noData = false;
						var query = uni.createSelectorQuery();
						query.select('#hideview').boundingClientRect();
						query.exec(function(res) {
							_this.$data.scrollTop = res[0].height
						})
					}
				} else {
					// 单条数据
					if (result instanceof Array) {
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2];
						prevPage.$data.lists = result;
						// prevPage.setData({
						// 	lists: result
						// })
						return;
					} else {
						if (result.fromUserId == 0) {
							if (result.content.indexOf('消息含有敏感内容') != -1) {
								let key = _this.$data.messageCache.findIndex((value, index) => {
									return value.messageId == result.messageId
								})
								if (key != -1) {
									let cache = _this.$data.messageCache[key]
									_this.$data.EventData[cache.index].smsStatus = result.smsStatus
									_this.$data.messageCache.splice(key, 1)
									clearTimeout(cache.delay);
									// _this.$data.EventData = _this.$data.EventData;
								}
								return;
							}
							if (_this.$data.messageCache.length > 0) {
								if (result.currentPage && result.currentPage != '') {
									_this.$data.messageCache.forEach((value, index) => {
										_this.$data.EventData[value.index].smsStatus = result.smsStatus
									})
									
									// _this.$data.EventData = _this.$data.EventData;
									_this.$data.messageCache = [];
					
								} else {
									let key = _this.$data.messageCache.findIndex((value, index) => {
										return value.messageId == result.messageId
									})
									if (key != -1) {
										let cache = _this.$data.messageCache[key]
										_this.$data.EventData[cache.index].smsStatus = result.smsStatus
										if (result.smsStatus == 50) {
											_this.$data.messageCache.splice(key, 1)
										}
										clearTimeout(cache.delay);
										// _this.$data.EventData =  _this.$data.EventData;
									}
								}
							}
							return;
						} else {
							// 通知对方我已经阅读消息
							let message = {
								id: result.id,
								fromUserId: 0,
								toUserId: result.fromUserId,
								messageId: result.messageId,
								content: 'page',
								smsType: 'TEXT',
								sysType: 1,
								smsStatus: 50,
								smsList: false,
								currentPage: '',
								pageSize: ''
							}
							_this.sendSocketMessage(JSON.stringify(message))
							console.log('通知对方我已经阅读消息')
						}
					}

					if (result.userInfoId == _this.$data.userInfoId) {
						_this.$data.EventData.push(result);
						
						
					}

					// _this.$data.EventData = _this.$data.EventData;
					_this.scrollToBottom();

					_this.getPrevPage(true, result);
				}

				if (_this.$data.currentPage <= 2) {
					setTimeout(() => {
						_this.bindscrolltoupper1();
					}, 1000)
				}
				// 放开滚动置顶
				_this.$data.scrollLoading = 0;
			}
		},
		methods: {
			bindscroll(e) {
				// console.log('bindscroll', this.$data.scrollLoading);
				var that = this;
				if (that.$data.scrollLoading == 1) { //防止多次触发
					return false
				}
				if (!that.$data.noData) {
					return false;
				}
				if (e.detail.scrollTop <= 10) { //触发触顶事件
					// console.log('触发顶部事件', e.detail.scrollTop)
					// 获取隐藏的view 高度
					var query = uni.createSelectorQuery();
					query.select('#hideview').boundingClientRect()

					query.exec(function(res) {
						var EventData = that.$data.EventData //此数据为展示的数据
						var HideData = that.$data.HideData //此数据为隐藏数据
						EventData = HideData.concat(that.$data.EventData) // 拼接数据
						if (HideData == '' || !HideData) { // 判断是否隐藏数据为空
			
							that.$data.NoMoreEvent = 1;
							that.$data.scrollTop = 0;
							
							return false
						}
						let n = that.$data.totalSize - that.$data.EventData.length - that.$data.HideData.length;
						if (n < 10) {
							setTimeout(() => { // 自行选择是否定时进行加载
								that.$data.EventData = EventData;
								that.bindscrolltoupper1() // 请求新的数据
							}, 1000)
						} else {
							setTimeout(() => { // 自行选择是否定时进行加载
								that.$data.EventData = EventData;
								that.$data.scrollTop = res[0].height;
								that.bindscrolltoupper1() // 请求新的数据
							}, 1000)
						}

					})

				}
			},

			bindscrolltoupper1() {
				let _this = this;

				if (_this.$data.scrollLoading == 1) { //防止多次触发
					return false
				}
				_this.$data.scrollLoading = 1;
				let currentPage = this.$data.currentPage++;
				let pageSize = this.$data.pageSize;
				console.log('currentPage:' + currentPage);

				uni.showNavigationBarLoading();
				let fromUserId = uni.getStorageSync('userId');
				let toUserId = this.$data.toId;
				let message = {
					fromUserId,
					toUserId,
					content: 'page',
					smsType: 'TEXT',
					sysType: 1,
					smsStatus: 10,
					smsList: false,
					currentPage,
					pageSize
				}
				console.log('下拉message：', message);
				this.sendSocketMessage(JSON.stringify(message))
				uni.hideNavigationBarLoading(); //在当前页面隐藏导航条加载动画
				uni.stopPullDownRefresh();
			},


			getPrevPage(type, result) {
				if (this.$data.prevIndex != -1) {
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					let lists = prevPage.$data.lists;
					if (type) {
						let lists = prevPage.$data.lists;
						let res = lists.findIndex((value, index) => {
							return value.userInfoId = result.userInfoId
						})
						if (res != -1) {
							lists[this.$data.prevIndex].userMessage = result;
						} else {
							prevPage.onSend()
						}
					} else {
						let date = new Date();
						let userMessage = {
							content: result.content,
							createTime: date.getTime(),
							dateTime: date.getHours() + ':' + date.getMinutes(),
							fromUserId: result.fromUserId,
							smsStatus: 30,
							smsType: result.smsType,
							toUserId: result.toUserId,
							userInfoId: result.userInfoId
						}
						lists[this.$data.prevIndex].userMessage = userMessage
					}
					prevPage.$data.lists = lists;
				
				}
			},
			getMessageBySocket() {
				let data = {}
				data.userId = uni.getStorageSync("userId");
				IMapi.getMessageBySocket({
					method: 'POST',
					data
				}).then((res) => {

				})
			},
			getUserInfoformSocket() {
				let _this = this;
				let data = {};
				data.userId = uni.getStorageSync("userId");
				IMapi.getUserInfoformSocket({
					method: 'POST',
					data
				}).then((res) => {
					this.$data.to_avatar_path = res.avatar_path;
					
				})
			},
			audioPlay(e) {
				let id = e.currentTarget.dataset.id;
				this.audioCtx = uni.createAudioContext(id);
				this.audioCtx.play()
			},

			reply: function(e) {
				let _this = this;

				var content = e ? e.detail.value : this.$data.content;
				this.$data.content = content;
				if (content == '') {
					uni.showToast({
						title: '总要写点什么吧'
					});
					return;
				}
				var EventData = this.$data.EventData;
				// 发送消息
				let fromUserId = uni.getStorageSync('userId');
				let toUserId = this.$data.toId;
				let messageId = new Date().getTime() + fromUserId + toUserId + math.math(5);
				messageId = md5.md5(messageId);
				let message = {
					fromUserId,
					toUserId,
					messageId,
					content,
					smsType: 'TEXT',
					sysType: 1,
					smsStatus: 10,
					smsList: false,
					currentPage: '',
					pageSize: ''
				}
				this.globalData.localSocket.send({
					data: JSON.stringify(message),
					success() {
						console.log('sendSocketMessage:成功了');
						let len = EventData.push(message);
						console.log(EventData);

						
						_this.$data.inputShowed = true;
						_this.$data.EventData = EventData;
						_this.$data.content = '';
						_this.timeout(messageId, len - 1)
						_this.getPrevPage(false, message)
						
					},
					fail() {
						_this.sendError(len - 1)
					}
				})
				console.log('EventData -->');
				console.log(this.$data.EventData);
				setTimeout(() => {
					this.scrollToBottom();
				}, 100)

			},
			chooseImage: function() {
				// 选择图片供上传
				let _this = this;
				uni.chooseImage({
					count: 9,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: res => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						console.log('选择的图片', tempFilePaths);
						// 遍历多图
						tempFilePaths.forEach((tempFilePath) => {
							let fromUserId = wx.getStorageSync('userId');
							let toUserId = this.$data.toId;
							let content = tempFilePath;
							let messageId = new Date().getTime() + fromUserId + toUserId + math.math(5);
							messageId = md5.md5(messageId);
							let message = {
								fromUserId,
								toUserId,
								messageId,
								content,
								smsType: 'IMAGE',
								sysType: 1,
								smsStatus: 10,
								smsList: false,
								currentPage: '',
								pageSize: ''
							}

							var EventData = _this.$data.EventData;

							let len = EventData.push(message);
							
							_this.$data.EventData = EventData;
							
							this.upload(tempFilePath, 'image', message, len);
						});
					}
				})
			},
			preview: function(e) {
				// 当前点击图片的地址加载高清大图
				var src = e.currentTarget.dataset.src; //获取data-src
				let index = src.indexOf('?')
				if (index != -1) {
					src = src.substring(0, index) + '?x-oss-process=style/big'
				}
				//图片预览
				uni.previewImage({
					current: src, // 当前显示图片的http链接
					urls: [src] // 需要预览的图片http链接列表
				})
			},
			switchMode: function() {
				// 切换语音与文本模式
				// this.setData({
				//   mode: !this.data.mode
				// });
			},
			record: function() {
				// 录音事件
				console.log("------------------");
				console.log(this.$data.cancel);
				let _this = this;
				wx.startRecord({
					success: function(res) {
						console.log("------------------");
						console.log(_this.$data.cancel)
						if (!_this.$data.cancel) {
							_this.upload(res.tempFilePath, 'voice');
						}
					},
					fail: function(res) {
						console.log(res);
						//录音失败
					},
					complete: function(res) {
						console.log(res);

					}
				})

			},
			stop: function() {
				uni.stopRecord();
			},
			touchStart: function(e) {
				// 触摸开始
				var startY = e.touches[0].clientY;
				// 记录初始Y值
				this.setData({
					startY: startY,
					status: this.$data.state.pressed
				});
			},
			touchMove: function(e) {
				// 触摸移动
				var movedY = e.touches[0].clientY;
				var distance = this.$data.startY - movedY;
				// console.log(distance);
				// 距离超过50，取消发送
				this.setData({
					status: distance > 50 ? this.$data.state.cancel : this.$data.state.pressed
				});
			},
			touchEnd: function(e) {
				// 触摸结束
				var endY = e.changedTouches[0].clientY;
				var distance = this.$data.startY - endY;
				// console.log(distance);
				// 距离超过50，取消发送
				this.setData({
					cancel: distance > 50 ? true : false,
					status: this.$data.state.normal
				});
				// 不论如何，都结束录音
				this.stop();
			},
			upload: function(tempFilePath, type, message, len) {
				let _this = this;
				// 上传图片，返回链接地址跟id,返回进度对象
				if (type == 'image') {
					const access_token = uni.getStorageSync('access_token') || uni.getStorageSync('token') || "";
					let data = {};
					data.file = '[object Object]';
					data.type = 'big';
					let timestamp = Date.parse(new Date());
					data.timestamp = timestamp;
					data.sign = util.makeSign(api.apiUrl + '/api/upload', data);
					data.deviceId = "wx";
					data.platformType = "1";
					data.versionCode = '4.0';
					let uploadTask = uni.uploadFile({
						url: `${api.apiUrl}/api/upload`,
						filePath: tempFilePath,
						name: 'file',
						header: {
							'content-type': 'multipart/form-data',
							'Accept': 'application/json',
							'Authorization': `Bearer ${access_token}`
						},
						formData: data,
						success: (res) => {
							console.log(res);
							var res = JSON.parse(res.data);
							if (200 === res.code || 0 === res.code) {
								// 发送消息
								message.content = res.data;
								this.globalData.localSocket.send({
									data: JSON.stringify(message),
									success() {
										_this.timeout(message.messageId, len - 1)
										_this.getPrevPage(false, message)
									},
									fail() {
										_this.sendError(len - 1)
									}
								})
							} else {
								_this.sendError(len - 1)
							}
						},
						fail(err) {
							_this.sendError(len - 1)
						},
						complete: () => {
							this.scrollToBottom();
						}
					})
				}
				setTimeout(() => {
					this.scrollToBottom();
					uni.hideLoading();
				}, 300)
			},
			sendError: function(len) {
				let _this = this;
				let error = this.$data.EventData[len];
				if (error) {
					error.smsStatus = 20;
					_this.$data.EventData = _this.$data.EventData;
				}
			},
			timeout: function(messageId, len) {
				let _this = this;
				let delay = setTimeout(() => {
					if (_this.$data.messageCache.length > 0) {
						let key = _this.$data.messageCache.findIndex((value, index) => {
							return value.messageId == messageId
						});
						if (key != -1) {
							_this.$data.EventData[len].smsStatus = 20;
							_this.$data.EventData = _this.$data.EventData
							clearTimeout(this)
						}
					}
				}, 60000);
				_this.$data.messageCache.push({
					'messageId': messageId,
					'delay': delay,
					'index': len
				});
			},
			retry: function(e) { // 消息重试
				let _this = this;
				let index = e.currentTarget.dataset.key;
				let message = _this.$data.EventData[index]
				if (message) {
					message.smsStatus = 10;
					_this.$data.EventData = _this.$data.EventData;
					this.globalData.localSocket.send({
						data: JSON.stringify(message),
						success() {
							_this.timeout(message.messageId, index)
						},
						fail() {
							console.log('消息重试失败')
						}
					})
				}
			},

			scrollToBottom: function() {
				this.$data.toView = 'row_' + (this.$data.EventData.length - 1);
			}




		},
		
	}
</script>

<style lang="scss" scoped>
	/** 聊天窗口样式
 * 54px为回复框高度，js同
 */
	.height100{
		
	}
	.loding-img {
		height: 60rpx;
		width: 100%;
		background: rgb(235, 235, 235);
		text-align: center;
		margin-bottom: 40rpx;
	}

	.loding-img image {
		width: 60rpx;
		height: 60rpx;
	}

	.loding-img view {
		line-height: 60rpx;
	}

	/*聊天记录*/
	.message-list {
		/*margin-bottom: 54px;*/
		background: rgb(235, 235, 235);
		padding-bottom: 100upx;
	}

	/*单元行*/
	.row {
		display: flex;
		flex-direction: column;
		margin: 0;
		margin-bottom: 40rpx;
	}

	/*日期*/
	.datetime {
		font-size: 14px;
		margin-bottom: 20px;
		color: #999;
		text-align: center;
	}

	/*主体*/
	.body {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
	}


	/*头像容器*/
	.body.avatar-container {
		width: 20%;
	}

	/*头像*/
	.body .avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin: 0 20rpx;
	}

	/*文本消息*/
	.body .msg-content {
		display: inline-block;
		font-size: 28rpx;
		background: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		line-height: 44rpx;
		position: relative;
		left: -2rpx;
		top: 0;
		word-break: break-all;
		max-width: calc(85% - 140rpx);
	}

	.body .msg-image {
		display: inline-block;
		position: relative;
	}

	/* 三角箭头 */
	.body .triangle {
		background: white;
		width: 20rpx;
		height: 20rpx;
		margin-top: 30rpx;
		transform: rotate(45deg);
		position: absolute;
	}

	.msg-text {
		font-size: 30rpx;
	}

	.msg-status {
		font-size: 10px;
		display: block;
		margin-right: 60px;
		color: #999;
		text-align: right;
	}

	.msg-img {
		width: 30px;
		height: 30px;
		margin: auto 0;
	}

	.msg-icon {
		margin: auto 4px;
	}

	/*图片消息*/
	.picture {
		width: 35%;
	}

	.textarea {
		background-color: #fff;
		width: 96%;
		border-radius: 10rpx;
		height: 24px;
		padding: 10rpx 20rpx;
	}

	/*回复框*/
	.reply {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: auto;
		border-top: 1px solid rgb(215, 215, 215);
		background: rgb(245, 245, 245);
	}

	.reply .voice-image {
		width: 25px;
		height: 25px;
		margin-left: 3%;
		position: relative;
	}

	/*文本输入或语音录入*/
	.reply .opration-area {
		flex: 1;
		padding: 8px;
	}

	/*回复文本框*/
	.reply input {
		background: rgb(252, 252, 252);
		height: 32px;
		border-radius: 8rpx;
		padding: 0 16rpx;
		font-size: 16px;
	}

	/*选取图片*/
	.reply .choose-image {
		width: 25px;
		height: 25px;
		margin-right: 3%;
	}

	/*按住说话button*/
	.voice-button {
		height: 36px;
		color: #818181;
		font-size: 14px;
		line-height: 36px;
	}

	/*悬浮提示框*/
	.hud-container {
		position: fixed;
		width: 150px;
		height: 150px;
		left: 50%;
		top: 50%;
		margin-left: -75px;
		margin-top: -75px;
	}

	/*背景层*/
	.hud-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #999;
		opacity: .8;
		z-index: 11;
		border-radius: 10px;
	}

	/*悬浮框主体*/
	.hud-body {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 19;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	/*图标*/
	.hud-body image {
		margin-top: 20px;
		width: 80px;
		height: 80px;
	}

	/*文字*/
	.hud-body .tip {
		color: #fff;
		text-align: center;
		width: 90%;
		line-height: 34px;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	.hud-body .warning {
		background: #cc3333;
		border-radius: 5px;
	}

	::-webkit-scrollbar {
		width: 6rpx;
		height: 6rpx;
		color: transparent;
	}

	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 20rpx rgba(0, 0, 0, 0);
		border-radius: 20rpx;
		background-color: transparent;
	}

	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb {
		border-radius: 20rpx;
		-webkit-box-shadow: inset 0 0 20rpx rgba(0, 0, 0, .2);
		background-color: rgba(0, 0, 0, .2);
	}
</style>
