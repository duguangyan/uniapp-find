<template>
	<view class="index">
		<list-icon subTitle="修改头像" showCamera="true" @didClick="modifyHeadIcon()" :avatar_path="avatar_path"></list-icon>
		<list-item title="昵称" :subTitle="nick_name" @didClick="modifyNickname()"></list-item>
	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue"
	import listIcon from "@/components/list/list-icon.vue"
	
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
				console.log('hahaha')
				uni.showActionSheet({
					itemList:['拍照','我的相册'],
					success(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						
					},
					fail(res) {
						console.log(res.errMsg);
					}
				})
			},
			modifyNickname(){
				uni.navigateTo({
					url:"../modifyNickname/modifyNickname"
				})
			}
		},
		onLoad(options) {
			console.log(options);
			this.avatar_path = options.avatarPath;
			this.nick_name = options.nickName;
		},
		onShow() {
			this.$eventHub.$on('modifySuccess',(data)=>{
				console.log(data)
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
