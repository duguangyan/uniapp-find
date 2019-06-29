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
			<view class="padding b600 c999 bdb bdt" v-if="detailData.get_address && index !=1">{{index!=1&&index==2?'取':'送'}}料地址</view>
			<view v-if="detailData.get_address && detailData.get_address.length>0" class="padding">
				<view class="lh42">
					
					{{detailData.get_address.city_str}} {{ detailData.get_address.address}}
				</view>
				<view class="flex align-item-start lh42">
					<view class="c999 mgr30">{{detailData.get_address.consignee}} {{detailData.get_address.mobile}}</view>
					<view class="flex-1 c999">
						{{detailData.get_address.stall || ''}}
					</view>
				</view>
			</view>
			<!--送料地址  -->
			<view class="padding b600 c999 bdb bdt" v-if="detailData.shipping_address&& index ==3">送料地址</view>
			<view class="padding">
				<view class="lh42">
					{{ detailData.shipping_address.city_str}} {{ detailData.shipping_address.address}}
				</view>
				<view class="flex align-item-start lh42">
					<view class="c999 mgr30">{{detailData.shipping_address.consignee}} {{detailData.shipping_address.mobile}}</view>
					<view class="flex-1 c999">
						{{detailData.shipping_address.stall || ''}}
					</view>
				</view>
			</view>

			
			<view class="padding">
				<view>
					<text class="c999">订单编号： </text> {{detailData.order_sn}}
				</view>
				<view>
					<text class="c999">下单时间：</text> {{detailData.created_at}}
				</view>
				<view v-if="detailData.findman_name">
					<text class="c999">　找料员：</text> {{detailData.findman_name}}
				</view>
				<view v-if="detailData.find_at">
					<text class="c999">找到物料：</text> {{detailData.find_at}}
				</view>
				<!--快递  -->

				<view v-if="detailData.express_sn">
					<text class="c999">　配送：</text> {{detailData.express_company}}/{{detailData.express_sn}}
				</view>

				<view v-if="detailData.distribution_name">
					<text class="c999">　配送员：</text> {{detailData.distribution_name}}
				</view>

				<view v-if="detailData.confirm_shipping_at">
					<text class="c999">确认送达： </text> {{detailData.shipping_at}}
				</view>

				<view v-if="detailData.confirm_finish_at">
					<text class="c999">客户确认收货：</text> {{detailData.finish_at}}
				</view>
			</view>

			
			<view class="padding">
				<view class="flex">
					<view class="c999">服务费用:</view>
					<view>{{'￥' + detailData.fee}}</view>
				</view>
			</view>
			<view class="padding">
				<view class="flex">
					<view class="c999">备注:</view>
					<view>{{ detailData.remark}}</view>
				</view>
			</view>
			<view class="space" />
			<view class="pd30 flex flex-end">
				<view class="normal-btn">找不到物料</view>
				<view class="warm-btn mgl30">找到物料</view>
			</view>


			<button :data-id='detailData.user_id' @click='goChat' class='order-footer-btn-red order-chat'>
				联系客户</button>
			<view class='height40'></view>
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
