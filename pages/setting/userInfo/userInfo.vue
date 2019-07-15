<template>
	<view class="index">
		<list-icon subTitle="修改头像" showCamera="true" @didClick="modifyHeadIcon()" :avatar_path="avatarPath"></list-icon>
		<view class="bb20">
				<list-item title="昵称" :subTitle="nickName" @didClick="modifyNickname()"></list-item>
		</view>
		<view class="bb20">
				<list-item title="绑定手机号码" isShowText="true" :subTitle="mobile" v-if="isBindMobile" ></list-item>
		</view>
	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue"
	import listIcon from "@/components/list/list-icon.vue"
	import util from "../../../utils/util.js";
 	import api from "../../../utils/api.js";
	
	export default {
		data() {
			return {
				isBindMobile:false,
			};
		},
		computed:{
			nickName(){
				return this.$store.state.nickName;
			},
			avatarPath(){
				return this.$store.state.avatarPath;
			},
			mobile(){
				return this.$store.state.mobile;
			}
		},
		components:{
			listItem,listIcon
		},
		onShow() {
			this.$data.userType = uni.getStorageSync('userType');
			if(this.$data.userType == 0 || this.$data.userType == 3){
				this.$data.isBindMobile = false;
			}else if(this.$data.userType == 1){
				this.$data.isBindMobile = true;
			}else if(this.$data.userType == 2){
				this.$data.isBindMobile = true;
			}
		},
		methods:{
			modifyHeadIcon(){
				console.log('hahaha');	
				this.checkImg();
			},
			modifyNickname(){
				uni.navigateTo({
					url:"../modifyNickname/modifyNickname?nickName=" + this.$store.state.nickName
				})
			},
			checkImg(){
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						const access_token = wx.getStorageSync('access_token') || '';
						let data = {};
						data.file = '[object Object]';
						data.type = 'big';
						let timestamp = Date.parse(new Date());
						data.timestamp = timestamp;
						data.sign = util.makeSign(api.apiUrl + '/api/upload', data);
						data.deviceId = "wx";
						data.platformType = "2";
						data.versionCode = '4.0';
						// 上传图片，返回链接地址跟id,返回进度对象
						let uploadTask = wx.uploadFile({
							url: `${api.apiUrl}/api/upload`,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								'content-type': 'multipart/form-data',
								'Accept': 'application/json',
								'Authorization': `Bearer ${access_token}`
							},
							formData: data,
							success: (res) => {
								console.log('图片上传');
								console.log(res);
								var ress = JSON.parse(res.data);
								if (200 === ress.code || 0 === ress.code) {
									// _this.$data.avatar_path = ress.data;
									this.$store.commit('updateAvatarPath',ress.data);
									uni.setStorageSync('avatarPath', ress.data);
									api.memberAvatarPath({
										method: 'POST',
										data: {
											avatar_path: ress.data
										}
									}).then((res) => {
										util.successTips('图片上传成功');
									})

								} else {
									util.errorTips('上传错误');
								}

							},
							fail(err) {
								console.log(err)
							},
							complete() {

							}
						})
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F5F5F5;
		height: 100vh;
	}
	.bb20{
		border-top: 20upx solid #F5F5F5;
	}

</style>
