<template>
	<view class="index">
		<view class="center-top">
			<view class="title">个人中心</view>
			<image class="icon" src="../../../static/footer_icon/2.1.png" mode=""></image>
			<view class="name">Eric</view>
			<button class="top-button recharge" type="primary" plain="true">余额充值</button>
			<button class="top-button buy" type="default">购买鹿币</button>
			<image class="setting" src="" mode=""></image>
			<image class="message" src="" mode=""></image>
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
			<ul>
				<li>
				<image class="order_image" src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" mode=""></image>
				<text class="order_item_text">待找料</text>
				</li>
				<li>
				<image class="order_image" src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" mode=""></image>
				<text class="order_item_text">待确认</text>
				</li>
				<li>
				<image class="order_image" src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" mode=""></image>
				<text class="order_item_text">待收货</text>
				</li>
				<li>
				<image class="order_image" src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" mode=""></image>
				<text class="order_item_text">待评价</text>
				</li>
			</ul>
		</view>
		<view class="order fectch">
			<text class="order_text">取料订单</text>
			<text class="order_check">查看全部订单</text>
			<ul>
				<li v-for="(item,index) in order_finds" :key=index>
					<image class="order_image" :src="item.img" mode=""></image>
					<text class="order_item_text">{{item.text}}</text>
				</li>
			</ul>
		</view>
		
		<view class="horizon_list">
			<ul>
				<li>
					<text>小鹿家人</text>
					<image class="arrow" src=""></image>
				</li>
				<li>
					<text>小鹿家人</text>
					<image class="arrow" src=""></image>
				</li>
				<li>
					<text>小鹿家人</text>
					<image class="arrow" src=""></image>
				</li>
			</ul>
		</view>
		
	</view>
</template>

<script>
	export var imageUrl="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560941321832&di=7513fdf538cb2d391d614f0ec103a584&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130604%2F12127826_163002377300_2.jpg";
	
	export default {
		data() {
			return {
				
				order_finds:[{
					img:imageUrl,
					text:"待找料",
					},
					{
					img:imageUrl,
					text:"待确认",
					},
					{
					img:imageUrl,
					text:"待评价",
					},
					{
					img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560941321832&di=7513fdf538cb2d391d614f0ec103a584&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130604%2F12127826_163002377300_2.jpg",
					text:"待找料",
					}
				]
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: bisque;
		height: 1836upx;
	}
	//top
	.center-top {
		width: 100%;
		height: 400upx;
		background-color: #F29800;

		.title {
			// background-color: pink;
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
			background-color: pink;
			float: right;
			margin-top: 94upx;
			margin-right: 38upx;
			width: 48upx;
			height: 48upx;
		}
		.message {
			background-color: darkcyan;
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
		background-color: white;
		height: 580upx;
		
		ul{
			padding-left:0upx;
		}
		li{
			background-color: orange;
			height: 112upx;
		}
		text{
			
			float: left;
			color: #333333;
			font-size:30upx;
			position: absolute;
			left: 30upx;
			// top: 35upx;
		}
		.arrow{
			float: right;
			background-color: #666666;
			position: absolute;
			right: 20upx;
			height:28upx;
		}
	}
	
</style>
