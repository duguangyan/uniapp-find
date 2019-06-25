<template>
	<view>
		<web-view :src="url" />
	</view>
</template>


<script>
	export default {
		data() {
			return {
				url: 'https://integralmall.yidap.com?token=' + uni.getStorageSync('token'),
				token: '',
				addressId:''
			};
		},
		onLoad(options) {
			this.$data.nowTime = parseInt(new Date().getTime() / 1000);
			this.$data.token = uni.getStorageSync('token');
			if (options.addressId){
				this.$data.addressId = options.addressId
			}
			this.$data.url = 'https://integralmall.yidap.com?token='+this.$data.token+'&addressId='+this.$data.addressId+'&nowTime='+this.$data.nowTime
		},
		onShow() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">

</style>
