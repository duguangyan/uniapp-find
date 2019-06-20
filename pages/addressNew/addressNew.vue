<template>
	<view>
		<view class="fs30 address-form pd-30 btn-shadow">
			<view class="flex lh90 address-list">
				<view><text class='text-theme'>*</text><text class='spacing'>联系人</text></view>:
				<input class='address-input' placeholder='联系人姓名' v-model='addressInfo.consignee'>
				</input>
			</view>

			<view class="flex lh90 address-list">
				<view><text class='text-theme'>*</text>手机号码:</view>
				<input class='address-input' placeholder='联系人手机号码' maxlength='11' v-model='addressInfo.mobile'>
				</input>
			</view>

			<view class="flex lh90 address-list" @click='getMapAddress'>
				<view><text class='text-theme'>*</text><text class='spacing1'>地址</text></view>:
				<input class='address-input ellipsis' placeholder='请填写地址' :disabled="true" v-model="addressInfo.address">
				</input>
			</view>

			<view class="flex lh90 address-list">
				<view><text class='text-theme display-none'>*</text>详细门牌:</view>
				<input class='address-input' placeholder='例如: 1栋16楼116室XXX公司' v-model='addressInfo.room'>
				</input>
			</view>
			<view class="flex lh90 address-list">
				<view><text class='text-theme display-none'>*</text><text class='spacing1'>名称</text></view>:
				<input class='address-input' placeholder='公司名称、档口名称等' v-model='addressInfo.stall'>
				</input>
			</view>

			<view class="flex lh90 address-list">
				<view><text class='text-theme display-none'>*</text><text class='spacing1'>标签</text></view>:
				<input class='address-input' placeholder='不超过两个字,例如:找料、送料' maxlength='2' v-model='addressInfo.remark'>
				</input>
			</view>
			<view class='check-btn mgt-20' @click='doCheck'>
				<text v-if='check' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
				<text v-if='!check' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
				<text class="mgl-20">设置默认</text>

			</view>
		</view>

		<view @click='saveSubmit' hover-class="hover-style" class="bottom-fixed btn-shadow h100 text-center lh100 text-white fs30">
			完成
		</view>

		<view v-if="showCon" class="modal-mask">
			<view class="modal-dialog">
				<view class="modal-title">温馨提示</view>
				<view class="modal-content">
					获取定位失败，请前往设置打开定位权限
				</view>
				<view class="modal-footer">
					<view class="btn-cancel" @click="changeModalCancel">取消</view>
					<button open-type="openSetting" class="btn-confirm button-on-view" style="padding:0upx;" @click="changeModalCancel">设置</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	let qqmapsdk;
	export default {
		data() {
			return {
				addressInfo: {
					address: '',
					consignee: '',
					mobile: '',
					latitude: '',
					longitude: '',
					room: '',
					stall: '',
					remark: '',
					is_default: '',
					name:''
				},
				showCon: false,
				check: false,
				type: '',
				id: ''
			};
		},
		onLoad(options) {
			// 设置腾讯地图app_key
			qqmapsdk = new QQMapWX({
				key: 'TREBZ-NE3KW-VZ5RD-OFP22-IUGZO-MEF7A'
			});
			// 判断是新增还是编辑 
			this.$data.type = options.type;
			if (options.type == 'new') {
				// 获取当前用户地址信息
				this.getUserMapAddress();

			} else if (options.type == 'edit') {
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				})
				this.$data.id = options.id;
				// 获取编辑用户地址信息
				this.getAddressInfo(this.$data.id);
			}
		},
		onShow() {

		},
		methods: {
			// 请求输出编辑信息
			getAddressInfo(id) {
				api.infoAddress({
					data: {
						id
					}
				}).then((res) => {
					let addressInfo = res.data;
					this.$data.addressInfo = addressInfo;
					this.$data.check = addressInfo.is_default == 0 ? false : true;
				})
			},
			// 保存地址
			saveSubmit() {
				let _this = this;
				let addressInfo = this.$data.addressInfo,
					type = this.$data.type;

				// 地址为空
				if (addressInfo.consignee.length === 0) {
					util.errorTips('请确认收货人');
					return false;
				}
				// 判断手机验证
				if (!util.vailPhone(addressInfo.mobile)) {
					util.errorTips('请确认手机号');
					return false;
				}
				if (!addressInfo.address) {
					util.errorTips('请确认地址信息');
					return false;
				}
				this.$data.addressInfo.is_default = this.$data.check ? 1 : 0
				// 判断新增还是编辑
				if (type == 'new') {
					api.addAddress({
						method: "POST",
						data: this.$data.addressInfo
					}).then((res) => {
						if (res.code == 200 || res.code == 0) {
							// 修改上一个页面栈数据
							util.successTips(res.msg);
							uni.navigateBack();
						} else {
							util.errorTips(res.msg);
						}
					})
				} else if (type == 'edit') {
					// 编辑提交
					api.editAddress({
						method: 'POST',
						data: this.$data.addressInfo
					}).then((res) => {
						if (res.code == 200 || res.code == 0) {
							// 修改上一个页面栈数据
							util.successTips(res.msg);
							wx.navigateBack();
						} else {
							util.errorTips(res.msg);
						}
					})
				}

			},
			// 设置默认
			doCheck() {
				this.$data.check = !this.$data.check
			},
			// 关闭授权
			changeModalCancel() {
				_this.$data.showCon = false;
			},
			// 获取用户当前地址
			getUserMapAddress() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res.longitude;
						var speed = res.speed;
						var accuracy = res.accuracy;
						console.log('----------------------');
						console.log(res);
						// 调用接口
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: latitude,
								longitude: longitude
							},
							success: function(res) {
								let mapAddress = {
									address: res.result.address,
									city: res.result.address_component.city,
									district: res.result.address_component.district,
									location: res.result.location,
									province: res.result.address_component.province,
									title: res.result.formatted_addresses.recommend
								}
								console.log('mapAddress-->>', mapAddress);
								if (mapAddress.location != null && mapAddress.location != undefined && mapAddress.location != '') {
									_this.$data.addressInfo.address = mapAddress.address;
									_this.$data.addressInfo.consignee = wx.getStorageSync("nick_name") || '';
									_this.$data.addressInfo.mobile = wx.getStorageSync("user_name") || '';
									_this.$data.addressInfo.latitude = mapAddress.location.lat.toString();
									_this.$data.addressInfo.longitude = mapAddress.location.lng.toString();


								}

							},
							fail: function(res) {
								console.log(res)
							},
							complete: function(res) {
								console.log(res)
							}
						});
					}
				})

			},
			// 获取地图地址
			getMapAddress() {
				let _this = this;
				uni.chooseLocation({
					success: (res) => {
						this.$data.addressInfo.address = res.address;
						this.$data.addressInfo.name = res.name;
						this.$data.addressInfo.latitude = res.latitude.toString();
						this.$data.addressInfo.longitude = res.longitude.toString();
						this.$data.addressInfo.room = res.name == res.address ? '' : res.name;
					},
					fail: (res) => {
						util.errorTips("获取地图定位失败：" + res.errMsg);
						//不允许打开定位
						uni.getSetting({
							success: (res) => {
								if (!res.authSetting['scope.userLocation']) {
									_this.$data.showCon = true;
								}
							}
						})
					},
					complete: (res) => {}
				})
			},
		}
	}
</script>

<style lang="scss">
	.bottom-fixed {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 999;
		background: #F29800;
	}

	.spacing-view-24 {
		background: #F5F5F5;
		height: 24upx;
	}

	.icon-suosou {
		font-size: 50upx;
	}

	.address-form {
		background: #fff;
		margin: 0 30upx;
		border-radius: 10upx;
	}

	.address-form>view:last-of-type {
		border-bottom: 0;
	}

	.address-area {
		padding: 40upx 20upx 0;
	}

	.address-area textarea {
		width: 100%;
		height: 170upx;
	}

	.border-top {
		border-top: 1upx solid #f4f4f4;
	}

	.map-input {
		display: block;
		background-color: #fff;
		height: 90upx;
		line-height: 90upx;
		position: relative;
		z-index: 9999;
	}

	.map-input-1 {
		height: 90upx;
		line-height: 90upx;
		position: absolute;
		top: 0;
		left: 200upx;
		z-index: 9999;
		width: 550upx;
		display: block;
	}

	.icon-suosou {
		position: absolute;
		right: 30upx;
		top: 0upx;
		color: #666;
	}

	.section-map {
		position: relative;
	}

	.sug_info {
		margin: 15px 10px;
	}

	.section {
		height: 90upx;
		line-height: 90upx;
	}

	.sug_info_text {
		display: block;
		height: 50upx;
		line-height: 50upx;
	}

	.address-input {
		width: 470upx;
		background-color: #eee;
		height: 90upx;
		padding-left: 10upx;
	}

	.spacing {
		letter-spacing: 5px;
	}

	.spacing1 {
		letter-spacing: 15px;
	}

	.address-list {
		margin: 15upx 0;
	}

	.display-none {
		opacity: 0
	}

	.bottom-fixed {
		position: relative;
		margin: 0 30upx;
		width: 690upx;
		margin-top: 75upx;
		border-radius: 10upx;
	}

	.address-switch {
		transform: scale(.6);
		position: absolute;
		right: 20upx;
	}




	.modal-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		overflow: hidden;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-dialog {
		width: 540upx;
		overflow: hidden;
		z-index: 9999;
		background: #f9f9f9;
		border-radius: 5upx;
	}

	.modal-title {
		padding-top: 30upx;
		font-size: 32upx;
		color: #030303;
		text-align: center;
	}

	.modal-content {
		padding: 20upx 32upx;
		font-size: 28upx;
	}

	.modal-footer {
		display: flex;
		flex-direction: row;
		height: 86upx;
		border-top: 1px solid #dedede;
		font-size: 34upx;
		line-height: 86upx;
	}

	.btn-cancel {
		width: 50%;
		color: #abb4bd;
		text-align: center;
		border-right: 1px solid #dedede;
	}

	.btn-confirm {
		width: 50%;
		color: #6fb64b;
		text-align: center;
		font-weight: 500;
	}
</style>
