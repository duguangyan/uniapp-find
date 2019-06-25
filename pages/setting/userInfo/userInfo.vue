<template>
	<view class="index">
		<list-icon subTitle="修改头像" showCamera="true"></list-icon>
		<list-item title="昵称" subTitle="Eric"></list-item>
	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue"
	import listIcon from "@/components/list/list-icon.vue"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			listItem,listIcon
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: #F5F5F5;
		height: 100vh;
	}

</style>
