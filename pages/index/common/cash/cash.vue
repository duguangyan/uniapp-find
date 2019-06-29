<template>
	<view class="cash">
		<view class="flex">
			<view class="flex-1" @click="checkNav(index)" v-for="(item, index) in navs" :key="index">
				<text :class="index == navIndex?'active':''">{{item}}</text>
			</view>
		</view>
		<view class="zfb">
			<view class="t1">{{txts.z}}</view>
			<view class="t2 cf">
				<image class="fll" src="/static/icon/logo.png" mode=""></image>
				<view class="v1 fll">
					<view>张三</view>
					<view>111@qq.com</view>
				</view>
				<view class="v2" @click="repAlipay">更换支付宝 <text class="arrow-right"></text></view>
			</view>
		</view>
		<view class="get">
			{{txts.m}}
		</view>
		<view class="input">
			<text class="t1">￥</text>
			<input class="t2" type="number" :placeholder="'本次最多可转出'+moreMoney+'元'" v-model='money' />
			<text class="t3" @click="getMoreMoney">全部</text>
		</view>
		<view class="type">
			{{txts.t}}
		</view>
		<view class="mess">
			<view class="v1" @click="checkTransfer">
				<text v-if="isTransfer" class="iconfont icon-dui fs40 text-yellow mgl-20 mgr-20"></text>
				<text v-if="!isTransfer" class="iconfont icon-dui fs40 text-eb mgl-20 mgr-20"></text>
				<text class="t1">{{txts.n}}</text>
			</view>
			<view class="v2">
				<text>{{txts.s}}</text>
			</view>
		</view>
		
		<uni-list>
			<view class="uni-list">
				<uni-list-item :title="txts.j" @click="goCashRecord"></uni-list-item>
			</view>
		</uni-list>
		<view class="footer-btn">
			<view class="btn" @tap="masks()">确认转出</view>
		</view>
		
		
		<!-- <button  @tap="masks()">确认收货</button> -->
		
		
		<!-- 密码框 -->
		<view v-if="mask" style="width: 100%;height: 100%;position:fixed;background: rgb(0,0,0,0.4);top: 0;z-index: 9999;overflow: hidden;">
			<view :class="bott" class="masks">
				<view style="padding: 0 3%;">
				<view @tap="maskss()" style="float: left;font-size: 60upx;margin: -10upx 0 0 0;">×</view>
				<view style="text-align: center;font-size:30upx;padding-top: 3%;">请输入支付密码</view>
				</view>
				<view style="display: flex;width: 80%;margin:5% auto;text-align: center;">
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 0" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 1" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 2" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 3" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 4" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 5" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
				</view>
				<view style="display: flex;flex-wrap: wrap;text-align: center;">
					<view @tap="password(1)" class="password">1</view>
					<view @tap="password(2)" class="password">2</view>
					<view @tap="password(3)" class="password">3</view>
					<view @tap="password(4)" class="password">4</view>
					<view @tap="password(5)" class="password">5</view>
					<view @tap="password(6)" class="password">6</view>
					<view @tap="password(7)" class="password">7</view>
					<view @tap="password(8)" class="password">8</view>
					<view @tap="password(9)" class="password">9</view>
					<view @tap="reset()" class="password" style="background: #F29800;color: #fff;">重置</view>
					<view @tap="password(0)" class="password">0</view>
					<view @tap="backspace()" class="password" style="background: #F29800;color: #fff;">◀</view>
					
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				mask:false,
				array:[],
				bott:'',
				txts:{
					j:'提现记录',
					m:'提取金额',
					t:'提现方式',
					n:'普通转账',
					s:'预计确认提现后，24小时内到账',
					z:'绑定支付宝信息'
				},
				navs:['转出到微信','转出到支付宝'],
				navIndex: 0,  
				moreMoney:1000.00,       // 最多提取金额
				money:'',          // 提取金额
				isTransfer: true,  // 是否转账
			};
		},
		onLoad(options) {
			
		},
		onShow() {
			
		},
		methods: {
			password(num){
				if(this.$data.array.length < 6){
					this.$data.array.push(num)
					console.log(num)
				}
				if(this.$data.array.length == 6){
					console.log('跳转')
					this.$data.mask = false
					this.$data.array = []
					this.$data.bott = ''
				}
			},
			reset(){
				this.array = []
			},
			backspace(){
				this.array.pop()
			},
			masks(){
				let _this = this
				this.mask = true
				setTimeout( function(){
					_this.bott = 'bot'
				},50)
			},
			maskss(){
				this.mask = false
				this.bott = ''
				this.array = []
			},
			goCashRecord(){
				uni.navigateTo({
					url:'../cashRecord/cashRecord'
				})
			},
			repAlipay(){
				uni.navigateTo({
					url:'../bindAlipay/bindAlipay'
				})
			},
			getOutMoney(){
				
			},
			getMoreMoney(){
				this.$data.money = this.$data.moreMoney;
			},
			checkTransfer(){
				this.$data.isTransfer = !this.$data.isTransfer;
			},
			checkNav(index) {
				if(index == 1){
					uni.showModal({
						title: '提示',
						content: '绑定支付宝?',
						confirmText:'立即绑定',
						cancelColor:'#000000',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({
									url:'../bindAlipay/bindAlipay'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					this.$data.navIndex = index;
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	
	.password{
		width: 25%;flex-grow:1;padding: 3%;font-size:40upx;border-bottom: 1px solid#eee;
	}
	.password:hover{
		background: #eee;
	}
	/* 密码框 */
	.masks{bottom:-50%;position: fixed;background: #fff;width: 100%;transition:.5s}
	.bot{bottom: 0;}
	
	.cash{
		height: 100%;
		background: #f4f4f4;
		.zfb{
			background: #fff;
			margin-top: 20upx;
			
			.t2{
				height: 164upx;
				position: relative;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin:0 30upx;
					position: relative;
					top: 30upx;
				}
				.v1{
					position: relative;
					top: 50upx;
					font-size: 30upx;
					line-height: 40upx;
				}
				.v2{
					position: absolute;
					right: 50upx;
					top: 50upx;
					color: #F29800;
					.arrow-right{
						display: inline-block;
						width:16upx;height: 16upx;
						border-right: 1px solid #F29800;
						border-bottom: 1px solid #F29800;
					}
				}
			}
			
			.t1{
				height: 100upx;
				line-height: 100upx;
				padding-left: 30upx;
				border-bottom: 1upx solid #f4f4f4;
			}
		}
		.footer-btn{
			background: #f4f4f4;
			padding-top: 60upx;
			height: 100upx;
			position: relative;
			.btn{
				width: 630upx;
				height: 88upx;
				line-height: 88upx;
				background: #F29800;
				color: #fff;
				font-size: 32upx;
				text-align: center;
				border-radius: 10upx;
				position: absolute;
				bottom: 30upx;
				left: 60upx;
			}
		}
		
		.mess{
			height: 148upx;
			background: #fff;
			padding: 10upx 0;
			border-top: 1upx solid #f4f4f4; 
			border-bottom:  1upx solid #f4f4f4; 
			margin-bottom: 20upx;
			.v1{
				height: 60upx;
				line-height: 60upx;
				font-size: 28upx;
			}
			.v2{
				height: 60upx;
				line-height: 60upx;
				padding-left: 80upx;
				color: #666;
				font-size: 28upx;
			}
		}
		.type{
			height: 100upx;
			line-height: 100upx;
			padding-left: 30upx;
			font-size: 30upx;
			margin-top: 20upx;
			background: #fff;
		}
		.input{
			height: 196upx;
			line-height: 196upx;
			background: #fff;
			.t1{
				font-size: 80upx;
			}
			.t2{
				display: inline-block;
				width: 450upx;
				margin-left: 20upx;
				font-size: 32upx;
			}
			.t3{
				color: #F29800;
				font-size: 32upx;
				position: relative;
				top: -14upx;
				left: 60upx;
				display: inline-block;
				width: 100upx;
				padding: 0 30upx;
			}
		}
		.get{
			font-size: 30upx;
			height: 100upx;
			line-height: 100upx;
			margin-top: 20upx;
			background: #fff;
			padding-left: 30upx;
			border-bottom: 1upx solid #f4f4f4;
		}
		.flex{
			height: 100upx;
			line-height: 100upx;
			background: #fff;
			text-align: center;
			font-size: 32upx;
			.flex-1{
				
			}
			.active{
				border-bottom: 4upx solid #F29800;
				padding-bottom: 30upx;
			}
		}
	}
	.uni-list{
		background: #fff;
		border: #fff;
	}
</style>
