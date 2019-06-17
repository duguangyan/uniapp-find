<template>
	<view class="pop">
		<view class="bg" @click="hideBg"></view>
		<view class="con">
			<view class="info">
				<slot></slot>
			</view>
			<view class="btn" @click="toDo">{{btnText}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			btnText: {
				type:String,
				default:"确认"
			},
			
		},
		methods:{
			toDo(){
				//第一个参数名为调用的方法名，第二个参数为需要传递的参数
				this.$emit('toDo'); 
			},
			hideBg(){
				this.$emit('hideBg'); 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;;
		left: 0;
		font-size: 28upx;
		z-index: 99999999;
		.bg{
			position: absolute;
			top: 0;left: 0;width: 100%;height: 100%;
			background: #000;
			opacity: .7;
		}
		.con{
			width: 500upx;
			background: #fff;
			border-radius: 10upx; 
			position: absolute;
			z-index: 9999;
			left:125rpx;
			top:400rpx;
			overflow: hidden;
			text-align: center;
			.info{
				padding: 20upx;
				input{
					border: 1upx solid #eee;
					
				}
			}
			.btn{
				height: 88upx;
				line-height: 88upx;
				text-align: center;
				background: #c81a29;
				color: #fff;
				font-size: 28upx;
				width: 100%;
			}
			.tit{
				height: 200upx;
				line-height: 200upx;
			}
			.fll{
				width: 249upx;
				border-top:1upx solid #eee; 
				line-height: 100upx;
				
			}
			.fll:last-child{
				border-left: 1upx solid #eee;
				background: #000;
				color: #fff;
			}
			.fll:first-child{
				border-right: 1upx solid #eee;
			}
		}
	}
</style>
