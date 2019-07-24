<template>
	<view>
		<view class='list-order'>
		  <view class='item bb-1' v-for="(item,index) in list" :key="index">
			<view class='t-1'>订单号：{{item.order_sn}}</view>
			<view class='t-2'>结算时间：{{item.created_at}}</view>
			<view class='t-3'>下单金额：￥{{item.fee}}   
			  <text class='c-1 flr'>佣金：￥{{item.commission}}</text> 
			</view>
		  </view>
		  <view class='no-data'>{{noDataText}}</view>
		</view>
	</view>
</template>

<script>
	import util from '../../utils/util.js';
	import api  from '../../utils/api.js';
	export default {
		data() {
			return {
				list:[],
				page:1,
				noDataText:'正在加载中...'
			};
		},
		onShow() {
			 this.getInviteCodeOrder();
		},
		methods:{
			/**
		   * 获取推广订单
		   */
		  getInviteCodeOrder(){
			api.inviteCodeOrder({
			  data:{
				page:this.$data.page
			  }
			}).then((res)=>{
			  if(res.code == 200 || res.code == 0){
				if(res.data.length>0){
				  this.$data.list = this.$data.list.concat(res.data);
				}else{
					this.$data.noDataText = '没有更多信息了'
				}
				
			  }
			})
		  }
		},
		/**
	   * 页面上拉触底事件的处理函数
	   */
	  onReachBottom: function () {
		  this.$data.page++;
		  this.getInviteCodeOrder();
	  },
	}
</script>

<style lang="scss" scoped>
/* pages/listOrder/listOrder.wxss */
.list-order .item{
  width:670rpx;
  height:160rpx;
  background:rgba(255,255,255,1);
  border-radius:8rpx;
  margin: 0 20rpx;
  margin-top: 20rpx;
  padding: 20rpx;
  font-size: 28rpx;
}
.list-order .item view{
  line-height: 54rpx;
}

.list-order .item view .c-1{
  color: #F29800;
  margin-right: 20rpx;
}
.no-data{
  text-align: center;
  line-height: 100rpx;
  color: #999;
}
</style>
