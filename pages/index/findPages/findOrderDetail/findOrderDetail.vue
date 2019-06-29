<template>
	<view class="find-order-detail">
		<view class="container tl">
			<!--顶部订单状态展示  -->
			<view class="b500 tl padding lh60 text-yellow">
				{{detailData.status_label}}
			</view>
			<view class="padding fs30">
				<view>
					<text class="c999"> 物料类型：</text>
					<text class="text-666 fs24">{{detailData.cname}}</text>
				</view>
				
				<view class="flex">
					<view class="c999">物料描述：</view>
					<view class="flex-1 text-666 fs24">{{detailData.desc}}</view>
				</view>
				<view class="flex">
					<view class="c999">限时找料：</view>
					<view class="flex-1 text-666 fs24">三小时</view>
				</view>
				<view class="flex">
					<view class="c999">比较优选：</view>
					<view class="flex-1 text-666 fs24">参考价格 ￥200.00</view>
				</view>
				<view>
					<view class="flex flex-start pdb30 image">
						<!--遍历图片  -->
						<image @click='preview' v-for="(img, idx) in detailData.desc_img" :src="img"
						 :data-idx="idx" :key="idx"
						 mode='aspectFill'></image>
					</view>
				</view>

				<view class="item-right fs24 text-yellow">
					<view class="c999"> {{detailData.find_type_label}}</view>
					<view class="c999"> 费用:￥{{detailData.fee}}</view>
				</view>
			</view>

			<!--取样地址  -->
			<view class="top20"></view>
			<view class="get-address" v-if="detailData.get_address">
				<view class="t1 fs28">寄料地址</view>
				<view class="t2 fs24">
					<text>收货人 {{detailData.get_address.mobile}}</text>
					<text v-if="detailData.get_address.stall">{{detailData.get_address.stall}}</text>
					<!-- <text class="stall">xxx</text> -->
				</view>
				<view class="t3 fs24 text-999">
					{{ detailData.get_address.address}}
				</view>
			</view>
			<!--送料地址  -->
			<view class="get-address" v-if="detailData.shipping_address">
				<view class="t1 fs28">寄料地址</view>
				<view class="t2 fs24">
					<text>收货人 {{detailData.shipping_address.mobile}}</text>
					<text v-if="detailData.shipping_address.stall">{{detailData.shipping_address.stall}}</text>
					<!-- <text class="stall">xxx</text> -->
				</view>
				<view class="t3 fs24 text-999">
					{{ detailData.shipping_address.address}}
				</view>
			</view>

			<view class="pdl-30 bt-1 lh100">
				<text class="fs28">配送方式:</text>
				<text class="fs24 text-999 mgl-20">{{detailData.find_type_label}}</text>
			</view>
			
			<view class="pdl-30 bt-1 top20 order_sn">
				<view>
					<text class="fs28">订单编号:</text> <text class="fs24 text-999 mgl-20">{{detailData.order_sn}}</text>
				</view>
				<view>
					<text class="fs28">下单时间:</text> <text class="fs24 text-999 mgl-20">{{detailData.created_at}}</text>
				</view>
			</view>
			
			<view class="flex-end order-handle cf">
				<!--找料中  -->
				<view v-if="detailData.find_status == 2" class="flex find-status">
					<view :data-type='2' :data-id="item.id" @click='showForm'>{{nav==1?'找':'取'}}不到物料</view>
					<view :data-type='1' :data-id="item.id" @click='showForm' class="ctheme warm-border">{{nav==1?'找':'取'}}到物料</view>
				</view>
			
				<view v-if="detailData.find_status == 1" class="find-status flr" @click="receiptOrder(item.id)">
					确认接单
				</view>
				
				<view class="cancat flr" v-if="detailData.find_status == 2">
					<image src="/static/icon/concat.png"></image>
					<text>联系客户</text>
					<view class="btn-1" @click="goChat"></view>
					<view class="btn-2" @click="contact"></view>
				</view>
			</view>


			<!-- <button :data-id='detailData.user_id' @click='goChat' class='order-footer-btn-red order-chat'>
				联系客户</button>
			<view class='height40'></view> -->
		</view>
	</view>
</template>

<script>
	import api from "../../../../utils/api.js";
	import util from "../../../../utils/util.js";
	export default {
		data() {
			return {
				orderItem: '',
				index: 1,
				id: '',
				detailData:''
			};
		},
		onLoad(options) {
			this.$data.id = options.id;
			this.getOrderDetail(options.id);
		},
		onShow() {

		},
		methods: {
			getOrderDetail(id) {
				api.findShowById({
					data:{id}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.detailData = res.data;
					}
				})
			},
			// 预览图片
			preview(e) {
				let idx = e.currentTarget.dataset.idx;
				let imgs = this.data.detailData.desc_img;
				uni.previewImage({
					current: imgs[idx],
					urls: imgs
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.order_sn{
		height: 120upx;
		line-height: 50upx;
		padding-top: 20upx;
		border-bottom: 1upx solid #f4f4f4; 
	}
	.top20{
		border-top: 20upx solid #f4f4f4; 
	}
	.get-address{
		border-top: 1upx solid #f4f4f4; 
		padding: 10upx;
		padding-left: 30upx;
		.stall{
			display: inline-block;
			line-height: 24upx;
			padding: 2upx 10upx;
			height:28upx;
			border-radius:4upx;
			margin-left: 20upx;
			border:1upx solid rgba(242,152,0,1);
		}
	}
	.find-status{
		
		width:180upx;
		height:60upx;
		line-height: 60upx;
		text-align: center;
		border-radius:30upx;
		border:2upx solid rgba(242,152,0,1);
		color: #F29800;
		font-size: 30upx;
		margin-top: 30upx;
		margin-right: 30upx;
		
	}
	.cancat{
		margin-right: 10upx;
		margin-top: 10upx;
		width: 360upx;
		height: 100upx;
		position: relative;
		text{
			position: absolute;
			top: 28upx;
			left: 38upx;
			font-size: 28upx;
			color: #F29800;
		}
		image{
			width: 360upx;
			height: 100upx;
			position: absolute;
			left: 0;
			left: 0;
		}
		.btn-1,.btn-2{
			width: 80upx;
			height: 100upx;
			position: absolute;
			top:0;
		}
		.btn-1{
			right: 28upx;
		}
		.btn-2{
			right: 120upx;
		}
		
	}
	.find-order-detail{
		height: 100%;
		background: #eee;
	}
	.image{
		width: 750upx;
		position: relative;
		left: -40upx;
		image{
			width: 140upx;
			height: 140upx;
			margin-top: 20upx;
			margin-left: 40upx;
		}
	}
	.container {
		background: #FFF;
		line-height: 50upx;
	}

	.padding {
		padding: 16upx 30upx;
		font-size: 30upx;
		border-top: 1upx solid #eee;
		position: relative;
		.item-right{
			position: absolute;
			right: 40upx;
			top: 20upx;
		}
	}

	.pd-cell {
		padding: 0 20upx;
	}

	.warm-btn {
		border: 1upx #C81C28 solid;
		color: #C81C28;
		padding: 2upx 10upx;
		border-radius: 6upx;
	}

	.normal-btn {
		border: 1upx #666 solid;
		color: #666;
		padding: 2upx 10upx;
		border-radius: 6upx;
	}

	.order-chat {
		background: #EF7510;
		color: #fff;
		width: 300upx;
		margin: 40upx auto;
	}

	.height40 {
		height: 40upx;
	}

	/*标签tag  */
	.tag {
		color: #EF7510;
		padding: 2upx 4upx;
		border: 1px #EF7510 solid;
		border-radius: 6upx;
	}
</style>
