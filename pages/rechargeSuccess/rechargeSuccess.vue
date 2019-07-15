<template>
	<view>
		<view class='task-success'>
		  <view class='task-success-top'>
			  <text class='iconfont icon-tijiaochenggong'></text>
			  <view class='task-success-msg'>
				  <view class='fs48'>支付成功</view>
				  <view class='fs24'>{{time}}</view>
			  </view>
		  </view>
		  <view class='border-b20 lh120' style=''></view>
		  <view class='lh120 pdl-30 fs30 bb-1'>
			  实付金额：<text class='text-red'>￥{{value}}</text> 
		  </view>
		  <view class='footer-btn'>
			  <view class='text-333' @tap='goIndex'>返回个人中心</view>
			  <!-- <view class='text-666' bindtap='goFindOrderDetail'>查看订单详情</view> -->
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
				value:'',
				time:''
			};
		},
		onLoad(options) {
			this.$data.value = options.value;
			this.$data.time  = options.time;
		},
		onShow() {
			
		},
		methods:{
			goIndex() {
				wx.reLaunch({
				  url: '../index/index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
/* pages/taskPaySuccess/taskPaySuccess.wxss */
page{
  background-color: #fff;
}
.task-success image{
  display: inline-block;
  width: 100rpx;
  height: 120rpx; 
  position: relative;
  top: 15rpx;
  right: 5rpx;
}
.task-success-msg{
  display: inline-block;
}
.task-success-top{
  margin: 80rpx auto;
  width: 340rpx;
}
.border-b20{
  height: 20rpx;
  background-color: #f4f4f4;
}
.footer-btn{
  margin-top: 30rpx;
}
.footer-btn view{
  display: inline-block; 
  height: 80rpx;
  line-height: 80rpx;
  font-size: 30rpx;
  width: 320rpx;
  text-align: center;
  border:1rpx solid #666;
  border-radius:10rpx;  
  margin-left :240rpx;
  margin-top: 60rpx;
}
.icon-tijiaochenggong{
  font-size: 100rpx;
  color: greenyellow;
  position: relative;
  top: 22rpx;
  left: -22rpx;
}
</style>
