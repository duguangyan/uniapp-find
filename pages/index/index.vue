<template>
	<view class="content">
		<home v-if="page_code=='home'"></home>
		<task v-if="page_code=='task'"></task>
		<order v-if="page_code=='order'"></order>
		<center v-if="page_code=='center'"></center>
		<findCenter v-if="page_code=='findCenter'"></findCenter>
		<findOrder v-if="page_code=='findOrder'"></findOrder>
		<fetchOrder v-if="page_code=='fetchOrder'"></fetchOrder>
		<fetchCenter v-if="page_code=='fetchCenter'"></fetchCenter>
		<message v-if="page_code=='message'"></message>
		<!-- <view class="height120"></view> -->
		<footerNav></footerNav>
		
	</view>
</template>

<script>
	import home from "./pages/home.vue";
	import task from "./pages/task.vue";
	import order from "./pages/order.vue";
	import center from "./pages/center.vue";
	import findOrder from "./pages/findOrder.vue";
	import findCenter from "./pages/findCenter.vue";
	import fetchCenter from "./pages/fetchCenter.vue";
	import fetchOrder from "./pages/fetchOrder.vue";
	import message from "./pages/msg.vue";
	import footerNav from "../../components/footer/footer_nav.vue";
	import api from '../../utils/api.js';
	import util from '../../utils/util.js';
	export default {
		data() {
			return {
				from:0
			}
		},
		components: {
			home,
			task,
			order,
			center,
			footerNav,
			findOrder,
			findCenter,
			message,
			fetchCenter,
			fetchOrder
		},
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			}
		},
		onLoad(options) {
			if(options.invite_code){
				uni.setStorageSync('invite_code',options.invite_code)
			}
			util.successTips('options.invite_code:'+options.invite_code);
			if(options.from){
				this.$store.commit("change_page",options.from); 
			}
			//this.$store.dispatch('menu_2')
			if(options.menuFrom){
				let i = parseInt(options.menuFrom);
				switch (i){
					case 0:   // 我要找料
						uni.setStorageSync('myStatus',1);  // 1是4个栏目 2是3个栏目
						this.$store.dispatch('menu_4')
						break;
					case 1:   // 我是找料员
						uni.setStorageSync('myStatus',2);
						this.$store.dispatch('menu_2')
						break;
					case 2:   // 我是配送员
						uni.setStorageSync('myStatus',3);
						this.$store.dispatch('menu_3')
						break;	
					case 3:   // 小鹿家人
						uni.setStorageSync('myStatus',1);
						this.$store.dispatch('menu_4')
						// 获取小鹿家人状态
						api.getInviteCode({}).then((res) => {
							if (res.code == 200 || res.code == 0) {
								if (res.data.status == 0) {
									uni.navigateTo({
										url: '../familyExplain/familyExplain?familyStatus=' + res.data.status,
									})
								} else if (res.data.status == 1) {
									uni.navigateTo({
										url: '../familyCenter/familyCenter',
									})
								} else {
									uni.navigateTo({
										url: '../family/family',
									})
								}
						
							}
						})
						break;	
					default:
						break;
				}
			}
			console.log(options)
			// 注册页面过来的
			// if(options.authentication){
			// 	if(options.authentication == 1){
			// 		uni.navigateTo({
			// 			url:'../setting/authentication/authentication'
			// 		})
			// 	}
			// }
			
			// this.$store.dispatch('get_data')
		},
		onShow() {
			
		},
		methods: {
			
		}
		
	}
</script>

<style lang="scss" scoped>
	 .height120{
	 	height: 120upx;
	 }
	.content {
		text-align: center;
		padding-bottom: 130upx;
		// height: 100%;
		width: 100%;
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
