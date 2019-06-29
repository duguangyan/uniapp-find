<template>
	<view class="classify-warp">
		<view class='classify-sider'>
			<view class="classify-sider-list" :class="index == navIndex ? 'navActive':''" v-for='(item, index) in classifyList' :key='index'
			 @click='_navClick(item.id,item.title,index)'>{{item.title}}</view>
		</view>
		<view class='classify-content'>
			<view v-for='(parentItem, parentIndex) in classifyListChild' :key='parentIndex'>
				<view class='classify-content-title'>
					<text class="classify-content-title-text " :class="parentItem.title.length>3 ? 'item-length-size':''">
						<text :class="parentItem.title.length>3 ? 'item-big-size':''">{{parentItem.title}}</text>
					</text>
				</view>
				<view class='classify-content-middle cf'>
					<!-- data-index='{{index}}'  data-parentindex='{{parentIndex}}'
					 data-parent='{{parentItem.id}}' data-id='{{childItem.id}}' data-parentname='{{parentItem.title}}'
					 data-idname='{{childItem.title}}' -->
					<text v-for='(childItem, index) in parentItem.children' :key='index' :class="index==childIndex &&parentIndexX == parentIndex?'childActive':''"
					 @click='_childClick(index,parentindex,parentItem.id,childItem.id,parentItem.title,childItem.title)'>{{childItem.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				navIndex: 0, // nav选择 
				classifyList: '',
				classifyListChild: '',
				parentIndexX: '',
				idname: '',
				id: '',
				fromType: '',
				indexType: ''
			};
		},
		onLoad(options) {
			// 获取上一级传值
			let fromType = options.from; // 1找料订单 2去送订单
			this.$data.fromType = fromType;
			this.$data.indexType = options.index;
		},
		onShow() {
			// 获取物料品类数据
			this.getCheckTypes();
		},
		methods: {
			// 获取物料类型数据
			getCheckTypes() {

				if (wx.getStorageSync('classifyList')) {
					let classifyList = wx.getStorageSync('classifyList');
					this.$data.classifyList = classifyList;
					this.$data.classifyListChild = classifyList[0].children;
				} else {
					api.getCheckTypes({}).then((res) => {
						let classifyList = res.data;
						this.$data.classifyList = classifyList;
						this.$data.classifyListChild = classifyList[0].children;
						wx.setStorageSync('classifyList', classifyList);
					})
				}

			},
			// 导航切换
			_navClick(id, name, index) {
				this.$data.navIndex = index;
				this.$data.id = id;
				this.$data.idname = name;
				this.$data.classifyListChild = this.$data.classifyList[index].children;
			},
			// 分类详情点击
			_childClick(index, parentindex, parent, id, parentname, idname) {

				this.$data.childIndex = index;
				this.$data.parentIndexX = parentindex;
				if (!this.$data.id) {
					this.$data.id = this.$data.classifyList[0].id;
					this.$data.idname = this.$data.classifyList[0].title;
				}
				let obj = {
					id1name: this.$data.idname,
					id2name: parentname,
					id3name: idname,
					id1: this.$data.id,
					id2: parent,
					id3: id
				}
				let checkType = '';
				checkType += obj.id1name + ">";
				checkType += obj.id2name + ">";
				checkType += obj.id3name;
				let cid = obj.id1 + ',' + obj.id2 + ',' + obj.id3;
				let indexType = this.$data.indexType;
				
				let data = {'cname':checkType,cid,'index':indexType}
				this.$eventHub.$emit('classifyData', data);

				// 返回上一页
				uni.navigateBack({
					delta: 1
				})

			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.navActive {
		background-color: #fff;
		border-bottom: 1rpx solid #fff;
	}

	.classify-warp {
		display: flex;
		font-size: 30rpx;
		height: 100%;
	}

	.classify-sider {
		width: 160rpx;
		height: 100%;
		text-align: center;
		background-color: #eee;
		position: fixed;
		top: 0;
		left: 0;
	}

	.childActive {
		color: #c81a29 !important;
		border: 1rpx solid #c81a29 !important;
	}

	.classify-sider-list {
		height: 99rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #ddd;
	}

	.classify-content {
		width: 590rpx;
		height: 100%;
		background-color: #fff;
		position: fixed;
		left: 160rpx;
		overflow: scroll;
	}

	.classify-content-title {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: relative;
		background-color: #fff;
	}

	.classify-content-title-text {
		display: block;
		height: 60rpx;
		line-height: 60rpx;
		width: 185rpx;
		background-color: #fff;
		position: absolute;
		z-index: 9999;
		left: 220rpx;
		font-size: 30rpx;
		color: #fff;
	}

	.classify-content-title-text text {
		display: block;
		height: 60rpx;
		line-height: 60rpx;
		width: 90rpx;
		background-color: #c8c8c8;
		border-radius: 20rpx;
		position: absolute;
		top: 20rpx;
		left: 28rpx;
		padding: 0 20rpx;
	}

	.item-big-size {
		width: 120rpx !important;
	}

	.item-length-size {
		width: 215rpx !important;
		left: 200rpx !important;

	}

	.classify-content-title::after {
		content: ' ';
		position: absolute;
		top: 49rpx;
		left: 20rpx;
		height: 2rpx;
		width: 550rpx;
		background-color: #e6e6e6;
		z-index: 999;
	}

	.classify-content-middle {
		margin-left: 20rpx;
		position: relative;
		top: -40rpx;
	}

	.classify-content-middle text {
		display: block;
		float: left;
		margin-left: 40rpx;
		width: 130rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		text-align: center;
		border: 1rpx solid #666;
		color: #333;
		margin-top: 40rpx;
		overflow: hidden;
	}

	.height-auto {
		height: auto;
	}

	.cf:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.cf {
		zoom: 1
	}
</style>
