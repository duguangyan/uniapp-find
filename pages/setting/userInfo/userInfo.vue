<template>
	<view class="index">
		<list-item title="昵称"></list-item>
	</view>
</template>

<script>
	import listItem from "@/components/list/list-item.vue"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			listItem
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		background-color: orange;
		height: 100vh;
	}

</style>
