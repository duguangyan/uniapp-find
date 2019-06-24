<template>
	<view>
		<view class="text-center no-address fs30" v-if="isEmpty">
			<view>
				<text style="font-size: 220upx; color: #DFDFDF;" class="iconfont icon-genggaishouhuodizhi text-gray"></text>
			</view>
			<view class="no-address-text text-gray">暂无收货地址</view>
			<view class="text-999">您可以新增地址已方便收货</view>
		</view>

		<view class='consignee-address' v-if="!isEmpty">
			<view class='btn-shadow address-right' v-if='hasAddressNum1>0'>
				<view class='cf address-right-title'>
					<text class='fll'>我的地址</text>
					<text class='flr text-theme' @click='editShow' data-index='1'>{{editTitle1}}</text>
				</view>
				<view class='address-right-list cf'>

					<view class="address-right-warp cf" :class="editTitle1=='完成'?'pd0':''" v-for='(item, index) in addressList' :key='index' v-if='item.area_id>0'>
						<view class='address-del fll' style='flex: 1' @click='del(item.id,index)' v-if="editTitle1=='完成'">
							<image src='../../static/icon/address-del.png'></image>
						</view>
						<view class="fll address-list-content" :class="editTitle1=='完成'?'':'width100'" style='flex: 8' @click='goBlack(item,index)'>
							<view style='margin-top:20upx;word-break:break-all;'>
								<text class='remark' v-if='item.remark'>{{item.remark||''}}</text>
								{{item.address||''}}
								{{item.room==0||item.room==null||item.room==''||item.room==undefined ?'':item.room}}
							</view>
							<view class='cf color-999'>
								<view style='word-break:break-all;'>
									{{item.consignee||''}} / {{item.mobile||''}}
								</view>

							</view>
							<view class='cf color-999 border-bottom'>
								<view style='word-break:break-all;'>
									{{item.stall||''}}
								</view>
							</view>
						</view>
						<view class='address-edit fll text-theme' style='flex: 1' @click='edit(item.id,index)' v-if="editTitle1=='完成'">
							<view>更改</view>
						</view>
					</view>

				</view>
			</view>


			<view class='btn-shadow address-right' v-if='hasAddressNum2>0'>
				<view class='cf address-right-title'>
					<text class='fll'>以下地址超出配送范围</text>
					<text class='flr text-theme' @click='editShow(2)'>{{editTitle2}}</text>
				</view>
				<view class='fs24 jifen'>(积分商城无地址范围限制)</view>
				<view class='address-right-list cf'>

					<view class="address-right-warp cf" :class="editTitle2=='完成'?'pd0':''" v-for='(item, index) in addressList' :key='index' v-if='item.area_id==0'>
						<view class='address-del ' style='flex: 1' @click='del(item.id, index)' v-if="editTitle2=='完成'">
							<image src='../../public/images/icon/address-del.png'></image>
						</view>
						<view class=" address-list-content color-999" :class="editTitle2=='完成'?'':'width100'" style='flex: 8' @click='goBlack(item)'>
							<view style='margin-top:20upx;'>
								<text class='remark' v-if='item.remark'>{{item.remark||''}}</text>
								{{item.address||''}} {{item.room||''}}
							</view>
							<view class='cf color-999'>
								<view style='word-break:break-all;'>
									{{item.consignee||''}} / {{item.mobile||''}}
								</view>
							</view>
							<view class='cf color-999 border-bottom'>
								<view style='word-break:break-all;'>
									{{item.stall||''}}
								</view>
							</view>
						</view>
						<view class='address-edit  text-theme' style='flex: 1' @click='edit(item.id, index)' v-if="editTitle2=='完成'">
							<view>更改</view>
						</view>
					</view>

				</view>
			</view>

		</view>

		<view @click="goNewAddress" class="bottom-fixed text-center text-white h100 lh100 fs32 bg-yellow">
			+ 新建收货地址
		</view>
	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				editTitle1: '编辑',
				editTitle2: '编辑',
				isFullAddress: false,
				isEmpty: true,
				from:'',                     // 来自什么页面
				addressList:[],              // 地址数据列表
				hasAddressNum1:'',  
				hasAddressNum2:'',
				findIndex:''
			};
		},
		onLoad(options) {
			if(options.from){
				this.$data.from = options.from;  // findPage找料   fetchPage取送
				if(this.$data.from == 'findPage'){
					this.$data.findIndex = options.findIndex
				}
			}
		},
		onShow() {
			this.$data.editTitle1 = '编辑';
			this.$data.editTitle2 = '编辑';
			this.getAddressListData();
		},
		methods: {
			// 去新建页面
			goNewAddress(){
				uni.navigateTo({
					url:'../addressNew/addressNew?type=new'
				})
			},
			// 编辑显示
			editShow(e) {
				let index = e.currentTarget.dataset.index;
				if (index == 1) {
					this.$data.editTitle2 = '编辑';
					this.$data.editTitle1 == '编辑'?this.$data.editTitle1 = '完成':this.$data.editTitle1 = '编辑'
				} else {
					this.$data.editTitle1 = '编辑';
					this.$data.editTitle2 == '编辑'?this.$data.editTitle2 = '完成':this.$data.editTitle2 = '编辑'
				}
			},
			// 设为默认
			setDefault(e) {
				console.log(e)
				let id = e.currentTarget.dataset.id,
					index = e.currentTarget.dataset.index;
				api.setDefaultAddress({
					method: 'POST',
					data: {
						address_id: id
					}
				}).then((res) => {
					let addressList = this.data.addressList;
					addressList.forEach((ele) => {
						if (ele.is_default == 1) {
							ele.is_default = 0;
						}
					})
					addressList[index].is_default = 1;
					this.setData({
						addressList
					})

					uni.showToast({
						title: '已设为默认地址',
					})
				})
			},

			// 编辑
			edit(id) {
				uni.navigateTo({
					url: `../addressNew/addressNew?type=edit&id=${id}`,
				})
			},

			// 删除
			del(id,index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					// confirmColor: '#C81A29',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							// 确定删除
							api.deleteAddress({
								method: 'POST',
								data: {
									id
								}
							}).then((res) => {
								uni.showToast({
									title: '删除成功',
								})
								let addressId = uni.getStorageSync('defaultAddress').id;

								if (addressId) {
									if (id == addressId) {
										uni.setStorageSync('defaultAddress', false);
									}
								}

								// 获取列表数据
								this.$data.addressList = [];
								this.$data.isEmpty     = true;
								this.getAddressListData();
							})

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			// 获取收货地址列表数据
			getAddressListData() {
				api.listAddress({}).then((res) => {
					if (res.code == 0 || res.code == 200) {
						let addressList = res.data;
						let isEmpty = addressList.length <= 0 || addressList == null || addressList == undefined ? true : false;
						
						let hasAddressNum1 = 0,
							hasAddressNum2 = 0;
						addressList.forEach((v, i) => {
							if (v.area_id == 0) {
								hasAddressNum2++
							} else {
								hasAddressNum1++
							}
						})
						this.$data.addressList    = addressList;
						this.$data.isEmpty        = isEmpty;
						this.$data.hasAddressNum1 = hasAddressNum1;
						this.$data.hasAddressNum2 = hasAddressNum2;
						
					} else if (res.code == 1) {
						this.$data.addressList = [];
						this.$data.isEmpty     = true;
					}
				})
			},

			// 点击选中地址返回
			goBlack(item) {
				if (item.area_id == 0) {
					util.successTips('此地址不在服务范围');
					return false
				}
				
				
				// 来自找料任务
				if (this.$data.from == 'findPage') {
					let data = {'address':item,'findIndex':this.$data.findIndex};
					this.$eventHub.$emit('findPage', data);
				}
				// 来自取送任务
				if(this.$data.from == 'fetchPage'){
					let data = {'address':item};
					this.$eventHub.$emit('fetchPage', data);
				}
				if(this.$data.from == 'taskPayPage'){
					let data = {'address':item};
					this.$eventHub.$emit('taskPayPage', data);
				}
				// 返回上一页
				wx.navigateBack({
					delta: 1
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.bottom-fixed{
		position:fixed;
		left:0;
		bottom:0;
		width:100%;
		z-index:999;
		background:#F29800;
	}
	.no-address {
		padding-top: 250upx;
	}

	.no-address-text {
		margin: 120upx 0 30upx;
	}

	.address-item {
		background: #FFF;
		padding: 0upx 20upx 0upx 34upx;
		border-top: 1upx #DDD solid;
		border-bottom: 1upx #DDD solid;
		margin-bottom: 20upx;
	}

	.address-item:first-of-type {
		border-top: 0;
	}

	.address-item-center {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;

		padding-bottom: 30upx;
		position: relative;
	}

	.address-item-detail {}

	/* 波浪 */
	.dot-btn {
		height: 100upx;
		width: 100upx;
		border-radius: 100%;
		position: relative;
		margin: 0 auto;
		position: absolute;
		top: 100upx;
		right: 30upx;
	}

	.dot {
		animation: sploosh 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.dot2 {
		animation: sploosh2 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.dot3 {
		animation: sploosh3 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.dot,
	.dot2,
	.dot3 {
		height: 100upx;
		width: 100upx;
		font-size: 20upx;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		border-radius: 100%;
		position: absolute;
		z-index: 10;
		animation-iteration-count: infinite;
		background: transparent;
	}

	@keyframes sploosh {
		0% {
			box-shadow: 0 0 0 0px rgba(255, 220, 1, 0.7);
			background: rgba(255, 220, 1, 0.7);
		}

		100% {
			box-shadow: 0 0 0 30upx rgba(255, 220, 1, 0);
			background: rgba(255, 220, 1, 0);
		}
	}

	@keyframes sploosh2 {
		0% {
			box-shadow: 0 0 0 0upx rgba(255, 220, 1, 0.7);
			background: rgba(255, 220, 1, 0.7);
		}

		100% {
			box-shadow: 0 0 0 20upx rgba(255, 220, 1, 0);
			background: rgba(255, 220, 1, 0.3);
		}
	}

	@keyframes sploosh3 {
		0% {
			box-shadow: 0 0 0 0upx rgba(255, 220, 1, 0.7);
			background: rgba(255, 220, 1, 0.7);
		}

		100% {
			box-shadow: 0 0 0 10upx rgba(255, 220, 1, 0);
			background: rgba(255, 220, 1, 1);
		}
	}


	/* 2.2 */
	.consignee-address {
		font-size: 30upx;
		margin-bottom: 15upx;
	}

	.address-right {
		margin: 30upx;
		margin-top: 15upx;
		background-color: #fff;
		border-radius: 10upx;
		padding: 0 30upx;
	}

	.jifen {
		position: relative;
		top: -30upx;
		left: 20upx;
	}

	.address-right-title {
		height: 110upx;
		line-height: 110upx;
	}

	.text-theme {
		text-decoration: underline;
	}

	.address-right-list {
		font-size: 24upx;
		position: relative;
		top: -30upx;
	}

	.address-right-warp {
		padding: 0 20upx;
		border-bottom: 1upx solid #eee;
		position: relative;
		display: flex;

	}

	.color-999 {
		color: #999;
		line-height: 50upx;
	}

	.border-bottom {

		display: flex;
	}

	.address-del {
		/* width: 10%;
  position: relative;
  margin-top:6%; 
  left: -20upx;
  font-size: 30upx;
  height:100%; */

	}

	.address-del image {
		width: 42upx;
		height: 42upx;
		position: absolute;
		top: 35%;
	}

	.address-edit view {
		position: absolute;
		top: 35%;
	}

	.address-edit {
		font-size: 30upx;
		position: relative;
		left: 5upx;
	}

	.address-list-content {
		width: 78%;

	}

	.width100 {
		width: 100%;

	}

	.pd0 {
		padding: 0;
	}
</style>
