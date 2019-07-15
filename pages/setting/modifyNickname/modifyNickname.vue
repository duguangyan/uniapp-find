<template>
	<view class="index">
		<text>可使用中英文(英文区分大小写)、数字(不可为纯数字或字符)、“-”和“_”，字数限制4-20个字符</text>
		<view class="editContent">
			<input v-model="nickName" placeholder-style="color:#D3D3D3" placeholder="输入新昵称" />
			<view class="close" @click.stop="clear">
				<image src="https://static.yidap.com/miniapp/o2o/imgs/ic_delete.png" v-if="nickName != ''"></image>
			</view>
		</view>
		<button type="primary" @click="confirm()">确定</button>
	</view>
</template>

<script>
	import api from "../../../utils/api.js";
	export default {
		data() {
			return {
				nickName:''
			};
		},
		onLoad(options) {
			this.$data.nickName = options.nickName;
		},
		methods:{
			clear(){
				this.$data.nickName = '';
			},
			confirm(){
				api.changeNickName({
					method: "POST",
					data: {
						nick_name: this.nickName
					},
				}).then((res)=>{
					if (res.code == 0) {
						this.$store.commit('updateNickName',this.nickName);
						uni.navigateBack({
							delta:1
						})
					}
					console.log(res)
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.close{
		position: absolute;
		right: 0upx;
		top: 0upx;
		height: 88upx;
		width: 100upx;
		z-index: 99999;
		image{
			width: 40upx;
			height: 40upx;
			position: absolute;
			right: 20upx;
			top: 20upx;
			z-index: 999999;
		}
		
	}
	.index{
		height: 95vh;
		position:relative;
		text{
			color: #333333;
			font-size: 28upx;
			position:absolute;
			top: 94upx;
			left: 60upx;
			right: 60upx;
		}
		.editContent{
			background-color: #F5F5F5;
			height: 88upx;
			position: absolute;
			top: 248upx;
			left: 60upx;
			right: 60upx;
			input{
				height: 88upx;
				line-height: 88upx;
				padding-left: 20upx;
			}
		}
		textarea{
			position: absolute;
			left: 20upx;
			top: 30upx;
		}
		button {
			background-color: rgb(240, 141, 5);
			position:absolute;
			left: 60upx;
			right: 60upx;
			bottom: 40upx;
		}
	}
</style>
