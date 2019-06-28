<template>
	<view class="index">
		<list-icon subTitle="修改头像" showCamera="true" @didClick="modifyHeadIcon()" :avatar_path="avatar_path"></list-icon>
		<list-item title="昵称" :subTitle="nick_name" @didClick="modifyNickname()"></list-item>
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
				avatar_path:"",
				nick_name:"",
			};
		},
		components:{
			listItem,listIcon
		},
		methods:{
			modifyHeadIcon(){
				console.log('hahaha');	
				this.checkImg();
			},
			modifyNickname(){
				uni.navigateTo({
					url:"../modifyNickname/modifyNickname"
				})
			},
			checkImg(){
				let _this = this;
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //album 从相册选图，camera 使用相机，默认二者都有
					success(res) { 
						console.log(res.tempFilePaths);
						let tempFilePaths = res.tempFilePaths;
						let url = "https://webapi.yidapi.com.cn/app/common/upload";
						uni.uploadFile({
							url,
							filePath: tempFilePaths[0],
							name: 'file',
							formData: api.returnData(url),
							success: function (uploadFileRes) {
								console.log(uploadFileRes.data);
								console.log("--------------------");
								let img = JSON.parse(uploadFileRes.data).data;
								// _this.$data.avatarPath = img; 
								util.successTips("图片上传成功");
							}
							});
					}
				});
			},
		},
		onLoad(options) {
			console.log(options);
			this.avatar_path = options.avatarPath;
			this.nick_name = options.nickName;
		},
		onShow() {
			this.$eventHub.$on('modifySuccess',(data)=>{
				console.log(data);
				// this.nick_name = data;
				this.nick_name = store.state.userInfo
				
			})
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F5F5F5;
		height: 100vh;
	}

</style>
