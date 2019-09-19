<template>
	<view>
		<view class='list-customer'>
		  <view class='item bb1 cf' v-for="(item,index) in list" :key="index">
			<view class='fll'>用户账号： {{item.mobile}}</view>
			<view class='flr'>{{item.created_at}}</view>
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
			this.getInviteCodeUser();
		},
		methods:{
			/**
			   * 获取数据列表 
			   */
			  getInviteCodeUser(){
				api.inviteCodeUser({
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
				  this.getInviteCodeUser();
		},
	}
</script>

<style lang="scss" scoped>
/* pages/listCustomer/listCustomer.wxss */
.list-customer .item{
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  background: #fff;
  margin-top: 20rpx;
}

.list-customer .item .fll{
  font-size: 28rpx;
}

.list-customer .item .flr{
  color: #999;
}

.no-data{
  text-align: center;
  line-height: 100rpx;
  color: #999;
}
</style>
