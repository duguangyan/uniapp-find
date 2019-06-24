<template>
	<view class="content">
		<home v-if="page_code=='home'"></home>
		<task v-if="page_code=='task'"></task>
		<order v-if="page_code=='order'"></order>
		<center v-if="page_code=='center'"></center>
		
		<footerNav></footerNav>
	</view>
</template>

<script>
	import home from "./pages/home.vue";
	import task from "./pages/task.vue";
	import order from "./pages/order.vue";
	import center from "./pages/center.vue";
	import footerNav from "../../components/footer/footer_nav.vue";
	export default {
		data() {
			return {}
		},
		components: {
			home,
			task,
			order,
			center,
			footerNav
		},
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			}
		},
		onLoad() {
			console.log('index onload')
			// this.$store.dispatch('get_data')
		},
		methods: {
			
		}
		
	}
</script>

<style lang="scss" scoped>
	 
	.content {
		text-align: center;
		padding-bottom: 130upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
