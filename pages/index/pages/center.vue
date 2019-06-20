<template>
	<view class="index">
		<view class="center-top">
			<view class="title">个人中心</view>
			<image class="icon" :src="avatar_path" mode=""></image>
			<view class="name">{{nick_name}}</view>
			<button class="top-button recharge" type="primary" plain="true">余额充值</button>
			<button class="top-button buy" type="default">购买鹿币</button>
			<navigator url="/pages/setting/setting">
                <image class="setting" src="/static/center/setting.png"></image>
            </navigator>
			<image class="message" src="/static/center/message.png"></image>
		</view>
		<view class="wallet">
			<view class="wallet-left">
				<text class="wallet_up">鹿币(个)</text>
				<text class="wallet_down">10</text>
			</view>
			<view class="wallet-right">
				<text class="wallet_up">余额(元)</text>
				<text class="wallet_down">150</text>
			</view>
			<view class="wallet-separator"></view>
		</view>
		<view class="order find">
			<text class="order_text">找料订单</text>
			<text class="order_check">查看全部订单</text>
			<view class="horizon_separator"></view>
			<ul>
				<li>
				<image class="order_image" src="/static/center/find.png" mode=""></image>
				<text class="order_item_text">待找料</text>
				</li>
				<li>
				<image class="order_image" src="/static/center/deliver.png" mode=""></image>
				<text class="order_item_text">待确认</text>
				</li>
				<li>
				<image class="order_image" src="/static/center/receive.png" mode=""></image>
				<text class="order_item_text">待收货</text>
				</li>
				<li>
				<image class="order_image" src="/static/center/evaluate.png"></image>
				<text class="order_item_text">待评价</text>
				</li>
			</ul>
		</view>
		<view class="order fectch">
			<text class="order_text">取料订单</text>
			<text class="order_check">查看全部订单</text>
			<view class="horizon_separator"></view>
			<ul>
				<li v-for="(item,index) in order_finds" :key=index>
					<image class="order_image" :src="item.img" mode=""></image>
					<text class="order_item_text">{{item.text}}</text>
				</li>
			</ul>
		</view>
		
		<view class="horizon_list">
			<view class="family">
					<text class="title">小鹿家人</text>
					<text class="subTitle">注册小鹿家人，增添更大收益</text>
					<image class="arrow" src="/static/center/arrow.png"></image>
			</view>
			<ul>
				<li v-for="(item,index) in contents" :key=index>
					<text class="title">{{item.title}}</text>
					<image class="arrow" src="/static/center/arrow.png"></image>
				</li>
			</ul>
		</view>
		<text class="copyright">Copyright@2018-现在 \n 众皮联版权所有</text>
		
	</view>
</template>

<script>
	import api from "../../../utils/api.js";
	export default {
		data() {
			return {
				
				order_finds:[{
					img:"/static/center/find.png",
					text:"待取料",
					},
					{
					img:"/static/center/deliver.png",
					text:"待确认",
					},
					{
					img:"/static/center/receive.png",
					text:"待收货",
					},
					{
					img:"/static/center/evaluate.png",
					text:"待评价",
					}
				],
				contents:[{
					title:"我的地址",
				},
				{
					title:"在线客服",
				},
				{
					title:"我的礼券",
				},
				{
					title:"积分商城",
				}
				],
				nick_name:"Eric",
				avatar_path:"/static/footer_icon/2.1.png",
				
			};
		},
		created() {
			console.log("llllllllll----------")
			api.getUserInfo({
 							method:"GET",
 							data:{
 								mobile:"18022408390",
 								password:"123456"
 							}
 						}).then((res)=>{
 							if(res.code==0){
								
								this.nick_name = res.data.nick_name;
								this.avatar_path = res.data.avatar_path;
 								console.log(res.data);
 							}
 						})
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F6F6F6;
		height: 1836upx;
	}
	//top
	.center-top {
		width: 100%;
		height: 400upx;
		background-color: #F29800;

		.title {
			padding-top: 68upx;
			color: white;
			font-size: 36upx;
			line-height: 16px;
		}

		.icon {
			background-color: pink;
			height: 120upx;
			width: 120upx;
			float: left;
			margin-left: 30upx;
			margin-top: 58upx;
			border-radius: 50%;
		}

		.setting {
			// background-color: pink;
			float: right;
			margin-top: 94upx;
			margin-right: 38upx;
			width: 48upx;
			height: 48upx;
		}
		.message {
			float: right;
			margin-top: 94upx;
			margin-right: 20upx;
			width: 48upx;
			height: 48upx;
		}
		.name {
			color: white;
			font-size: 32upx;
			position: absolute;
			top: 166upx;
			left: 180upx;
		}
		.top-button{
			color:white;
			border:2upx solid white;
			border-radius:20upx;
			position: absolute;
			top: 230upx;
			padding:8upx 20upx;
			height: 40upx;
			font-size: 20upx;
			line-height: 20upx;
		}
		.recharge {
			left: 180upx;
		}
		.buy {
			background-color: transparent;
			left: 340upx;
		}
	}
	//钱包
	.wallet{
		background-color:white;
		border-radius:8upx;
		height: 180upx;
		position:relative;
		top: -60upx;
		margin: 0upx 30upx;
		.wallet-left{
			// background-color: pink;
			float: left;
			width: 50%;
			height: 100%;
		}
		.wallet-right{
			// background-color: lawngreen;
			float: right;
			width: 50%;
			height: 100%;
		}
		.wallet-separator{
			background-color: #EEEEEE;
			width:2upx;
			height:80upx;
			position: absolute;
			top: 50upx;
			left: 50%;
			
		}
		.wallet_up{
			color:#666666;
			font-size: 30upx;
			position: relative;
			top: 30upx;
		}
		.wallet_down{
			display: block;
			color: #EF230C;
			font-size: 48upx;
			position: relative;
			top: 26upx;
			
		}
	}
	//order
	.order{
		position: relative;
		background-color: white;
		height: 264upx;
		.order_text{
			font-size: 30upx;
			color: #333333;
			position: absolute;
			left: 30upx;
			margin-top:30upx;
		}
		.order_check{
			font-size:24upx;
			color: #999999;
			position: absolute;
			right: 38upx;
			margin-top:30upx;
		}
		.horizon_separator{
			background-color: #D8D8D8;
			position: relative;
			top: 104upx;
			width: 100%;
			height:2upx;
			
		}
		ul{
			background-color: blue;
			display: flex;
			display: -webkit-flex;/* Safari */
			height: 158upx;
			position: absolute;
			left: 0upx;
			right: 0upx;
			bottom: 0upx;
			padding-left: 0upx;
		}
		li{
			background-color: white;
			display: inline;
			width: 25%;
			height: 158upx;
			justify-content: center;
			flex: 1;
		}
		.order_image{
			display: block;
			align-content: center;
			width: 80upx;
			height: 80upx;
			margin: 28upx auto -8upx;
		}
		.order_item_text{
			color: #333333;
			font-size: 24upx;
		}
	}
	.find{
		top:-40upx;
	}
	.fectch{
		top:-20upx;
	}
	
	//列表
	.horizon_list{
		position: relative;
		background-color: #F6F6F6;
		height: 580upx;
		.family{
			display: flex;
			background-color: white;
			height:112upx; 
		}
		ul{
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			margin-top: 20upx;
			padding-left:0upx;
			height: 448upx;
		}
		li{
			position: relative;
			background-color: white;
			height: 112upx;
			flex: 1;
		}
		text.title{
			color: #333333;
			font-size:30upx;
			position: absolute;
			left: 30upx;
			top: 35upx;
		}
		text.subTitle{
			color: #999999;
			font-size:24upx;
			position: absolute;
			left: 170upx;
			top: 42upx;
		}
		.arrow{
			// background-color: #666666;
			position: absolute;
			top: 30upx;
			right: 25upx;
			width: 28upx;
			height:28upx;
		}
	}
	.copyright{
		position: relative;
		top: 40upx;
		color: #999999;
		font-size: 24upx;
		text-align: center;
		line-height: 34upx;
	}
</style>
