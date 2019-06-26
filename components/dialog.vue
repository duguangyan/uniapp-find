<template>
	<view>
		<view class='wx_dialog_container' hidden="{{!isShow}}">
			<view class='wx-mask' catchtap="hideDialog"></view>
			<view class='wx-dialog'>
				<view class='wx-dialog-title'>{{ title }}</view>
				<!-- <view class='wx-dialog-content'>{{ content }}</view> -->
				<view class='wx-dialog-content'><slot></slot></view>
				
				<view class='wx-dialog-footer'>
				  <view class='wx-dialog-btn' catchtap='_cancelEvent'>{{ cancelText }}</view>
				  <view class='wx-dialog-btn' catchtap='_confirmEvent'>{{ confirmText }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false
			};
		},
		props:{
			// 弹窗标题
			title: {            // 属性名
			  type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
			  value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
			},
			// 弹窗内容
			content: {
			  type: String,
			  value: '弹窗内容'
			},
			// 弹窗取消按钮文字
			cancelText: {
			  type: String,
			  value: '取消'
			},
			// 弹窗确认按钮文字
			confirmText: {
			  type: String,
			  value: '确定'
			}
		},
		methods:{
			doLeft(){
				//第一个参数名为调用的方法名，第二个参数为需要传递的参数
				this.$emit('doLeft'); 
				//console.log("left");
			},
			doRight(){
				this.$emit('doRight'); 
				//console.log("right");
			},
			hideBg(){
				this.$emit('hideBg'); 
			}
		}
	}
</script>

<style lang="scss" scoped>
/* components/Dialog/dialog.wxss */
.wx-mask{
  position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
}
.wx-dialog{
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 600rpx;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
}
.wx-dialog-title{
    font-size: 36rpx;
    padding-top: 20rpx;
}
.wx-dialog-content{
    padding: 30rpx 20rpx;
    min-height: 40rpx;
    font-size: 32rpx;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999999;
    /* height: 500rpx; */
    overflow: scroll;
}
.wx-dialog-footer{
    display: flex;
    align-items: center;
    position: relative;
    line-height: 45px;
    font-size: 17px;
}
.wx-dialog-footer::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.wx-dialog-btn{
    display: block;
    -webkit-flex: 1;
    flex: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    background: #F29800;
    
}
.wx-dialog-footer .wx-dialog-btn:nth-of-type(1){
    color: #fff;
}
.wx-dialog-footer .wx-dialog-btn:nth-of-type(2){
    color: #fff;
    background-color: #F29800;
}
.wx-dialog-footer .wx-dialog-btn:nth-of-type(2):after{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
}
</style>
