<template>
	<view class="record">
		<view class="cf top">
			<view class="fll">
				<view class="t1">当前佣金(元)</view>
				<view class="t2">{{records.now_amount}}</view>
			</view>
			<view class="line"></view>
			<view class="fll">
				<view class="t1">累计佣金(元)</view>
				<view class="t2">{{records.total_amount}}</view>
			</view>
		</view>
		<view class="content">
			<view class="get-price" @click="goCash">提现</view>
		</view>
		
		
		<view class="items">
			<view class="item cf" v-for="(item, index) in list" :key="index">
				<view class="fll fs28">{{item.created_at}}</view>
				<view class="flr fs24 text-999">获得金额: ￥{{item.change_amount}}</view>
			</view>
		</view>
		
		<view class="footer-text" @click="getMore">{{footerText}}</view>
	</view>
</template>

<script>
	import api from '../../../../utils/api.js';
	import util from '../../../../utils/util.js';
	export default {
		data() {
			return {
				records:'',
				now_amount:'',
				total_amount:'',
				list:[],
				footerText:'没有更多信息了',
				page:1,
			};
		},
		onLoad(options) {
			

		},
		onShow() {
			this.getRecords();
		},
		methods: {
			goCash(){
				uni.navigateTo({
					url:'../cash/cash'
				})
			},
			getMore(){
				if(this.$data.footerText == "点击加载更多"){
					this.$data.page++;
					this.getRecords();
				}
				
			},
			getRecords(){
				api.staffCommissions({
					data:{
						page:this.$data.page
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.records = res.data;
						this.$data.now_amount = res.data.now_amount;
						this.$data.total_amount = res.data.total_amount;
						this.$data.list = this.$data.list.concat(res.data.list);
						if(res.data.list.length<10){
							this.$data.footerText = '没有更多信息了'
						}else{
							this.$data.footerText = '点击加载更多'
						}
					}
				})
			}

		
		},
	}
</script>

<style lang="scss" scoped>
	
	.record{
		height: 100%;
		background: #f5f5f5;
		.footer-text{
			line-height: 100upx;
			text-align: center;
			font-size: 24upx;
			color: #999;
		}
		.top{
			background: #fff;
		}
		.content{
			background: #fff;
			height: 100upx;
			line-height: 100upx;
			padding-top: 40upx;
			.get-price{
				width: 186upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				background: #F29800;
				color: #fff;
				border-radius: 60upx;
				margin: 0 auto;
				font-size: 38upx;
			}
		}
		.cf{
			width: 750upx;
			height: 194upx;
			line-height: 96upx;
			position: relative;
			border-bottom: 1upx solid #eee; 
			.fll{
				text-align: center;
				font-weight: 600;
				width: 50%;
				.t1{
					font-size: 24upx;
				}
				.t2{
					font-size: 38upx;
					color: #F29800;
				}
			}
			.line{
				position: absolute;
				width: 2upx;
				height: 100upx;
				background: #eee;
				left: 374upx;
				top: 50upx;
			}
		}
		
		.items{
		
			.item{
				background: #fff;
				height: 80upx;
				margin-top: 20upx;
				line-height: 80upx;
				.fll{
					text-align: left;
					margin-left: 30upx;
				}
				.flr{
					text-align: right;
					margin-right: 30upx;
				}
			}
		}
	}
</style>
