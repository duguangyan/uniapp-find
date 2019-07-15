<template>
	<view class="record">
		<view class="items">
			<view class="item" v-for="(item, index) in list" :key="index">
				
				<view>
					<text>提现时间：</text><text class="mgl-20 text-666">{{item.created_at}}</text>
				</view>
				<view>
					<text>提现方式：</text><text class="mgl-20  text-666">{{item.type_label}}</text>
				</view>
				<view>
					<text>提现金额</text><text class="mgl-20  text-666">￥{{item.type_label}}</text>
				</view>
				
				<view class="text-yellow">提现中</view>
			</view>
		</view>
		
		<view class="footer-text" @click="uploadMore">{{footerText}}</view>
	</view>
</template>

<script>
	import api from '../../../../utils/api.js';
	import util from '../../../../utils/util.js';
	export default {
		data() {
			return {
				page:1,
				footerText:'没有更多信息了',
				txts:{
					t1:'提现时间:',
					t2:'提现方式:',
					t3:'提现金额:'
				},
				list:[
					
				]
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.apiAssetTake();
		},
		methods: {
			uploadMore(){
				if(this.$data.footerText == '点击加载更多'){
					this.$data.page++;
					this.apiAssetTake();
				}
			},
			apiAssetTake() {
				api.apiAssetTake({
					data:{
						"page":this.$data.page,
						"asset_type": "commission"
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.list = this.$data.list.concat(res.data);
						if(res.data.length<10){
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
		background: #f4f4f4;
		height: 100%;
		.footer-text{
			line-height: 100upx;
			text-align: center;
			color: #999;
		}
		.items{
			font-size: 28upx;
			padding-top: 20upx; 
			.item{
				margin: 0 20upx 20upx 20upx;
				border-radius: 10upx;
				background: #fff;
				padding: 20upx;
				position: relative;
				.text-yellow{
					position: absolute;
					right: 30upx;
					top: 50upx;
				}
			}
		}
	}
</style>
