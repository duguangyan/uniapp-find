<template>
	<view class="wx_content">
		<view class="search_content search_warp_active" >				
			<view class="search_warp">
				<view class="search">
					<image src='https://static.yidap.com/miniapp/o2o/imgs/icon/ic_top_search_gray.png'></image>
				</view>
				<input class="uni-input fs30 ellipsis" @input='changeSearch' v-model="focusValue" placeholder="006牛皮" />
				<text v-if="isClear" @click="doClear">x</text>
			</view>
			<view class="customer-service">
				<text class="fs32 text-333" @click="goBack">取消</text>
			</view>
		</view>
		
		<!-- 最近搜索 -->
		<view class="lately-search">
			<view class="title cf">
				<text class="left fll">最近搜索</text>
				<text class="right flr" @click="clearShowData" v-if="searchData.length>0">
					<image src="https://static.yidap.com/miniapp/o2o/imgs/icon/trash-icon.png" ></image>
				</text>
			</view>
			<view class="content">
				<text class="li" v-for="(item,index) in searchData" :key="index" @click="goClassifyListByHoT(item)">{{item}}</text>
				<view class="no-data" v-if="searchData.length<= 0">
					暂无数据
				</view>
			</view>
		</view>
	
		<!-- 热门搜索 -->
		<view class="lately-search" style="margin-top: 20upx;">
			<view class="title cf">
				<text class="left fll">热门搜索</text>
			</view>
			<view class="content">
				<text class="li" v-for="(item,index) in hots" :key="index" @click="goClassifyListByHoT(item)">{{item}}</text>
				<view class="no-data" v-if="hots.length<= 0">
					暂无数据
				</view>
			</view>
		</view>
		
		
		<view class="show-data" v-if="isSearchShow">
			<view class="focus-value ellipsis" v-if="!hasSearchData" @click="goClassifyList('')">
				 {{focusValue}}
			</view>
			<view class="focus-value ellipsis" v-if="hasSearchData" v-for="(item,index) in focusValueList" :key="index" @click="goClassifyList(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../utils/api.js"
	export default {
		data() {
			return {
				title: "搜索",
				hots: [],
				searchData: [],
				isSearchShow: false,
				isClear: false,
				hasSearchData: false,
				focusValueList: [],
				focusValue:""
			};
		},
		methods:{
			goClassifyListByHoT(value){
				this.$store.commit('setKeyword', {"keyword":value});
				uni.navigateTo({
					url: "/pages/classGoods/classGoods"
				})
			},
			goClassifyList(value){
				let prodName = value == ""?this.$data.focusValue:value;
			
				let arr  = uni.getStorageSync("searchData") || [];
				arr.push(prodName);
				uni.setStorageSync('searchData', arr);
				this.$data.searchData = arr;
				this.$store.commit('setKeyword', {"keyword":prodName});
				uni.navigateTo({
					url: "/pages/classGoods/classGoods"
				})
			},
			goBack(){
				this.$store.commit("setKeyword",{"keyword":""});
				uni.navigateBack({
					delta: 1
				});
			},
			changeSearch(e){
				this.$data.focusValue = e.detail.value;
				if(this.$data.focusValue !=""){
					this.$data.isSearchShow = true;
					this.$data.isClear = true;
					api.getSearchRecommendData({
						method:"POST",
						data:{
							content: this.$data.focusValue
						}
					}).then((res)=>{
						if(res.data.length>0){
							this.$data.hasSearchData = true;
							this.$data.focusValueList = res.data;
						}else{
							this.$data.hasSearchData = false;
						}
						console.log(res)
					})
				}else{
					this.$data.isSearchShow = false;
					this.$data.isClear = false;
				}
				console.log(e.detail.value);
			},
			search(){
				console.log("search");
			},
			doClear(){
				let arr  = uni.getStorageSync("searchData") || [];
				arr.push(this.$data.focusValue);
				this.$data.focusValue = "";
				this.$store.commit("setKeyword",{"keyword":""});
				uni.setStorageSync('searchData', arr);
				this.$data.searchData = arr;
				this.$data.isSearchShow = false;
				this.$data.isClear = false;
				
			},
			clearShowData(){
				this.$data.searchData = [];
				uni.setStorageSync('searchData', []);
			}
		},
		mounted() {
			// 最近搜索
			this.$data.searchData = uni.getStorageSync("searchData") || [];
			
			
			// 推荐搜索
			api.getSearchHotKeywordData({
				method:"GET",
				data:{}
			}).then((res)=>{
				this.$data.hots = res.data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input{
		width: 480upx;
		height: 40upx;
		line-height: 40upx;
	}
	
	/*  #ifdef  APP-PLUS || APP-PLUS-NVUE */
	.uni-input{
		width: 480upx;
		height: 60upx;
		line-height: 60upx;
	}
	/*  #endif  */
	
	
	
	 .wx_content{
		 height: 100%;
		 background: #fff;
	 }
	.show-data{
		height: 100%;
		width: 100%;
		position: fixed;
		top: 200upx;
		background: #fff;
		z-index: 9999999;
		.focus-value{
			border-bottom: 1upx solid #999; 
			height: 60upx;
			line-height: 60upx;
			margin: 0 20upx;
			color: #333;
			font-size: 28upx;
		}
	}
	
	 /* #ifdef MP-WEIXIN */
		.show-data{
			margin-top: 100upx;
		}
	/* #endif */
.no-data{
	text-align: center;
	color: #666;
	font-size: 28upx;
	margin: 30upx 0;
}
.lately-search{
	width: 750upx;
	.title{
		height: 60upx;
		line-height: 60upx;
		.left{
			color: #666;
			font-size: 30upx;
			margin-left: 20upx;
		}
		.right{
			color: #333;
			color: #666;
			margin-right: 20upx;
			width: 60upx;
			height: 60upx;
			image{
				width: 30upx;
				height: 30upx;
				position: relative;
				z-index: 9999999;
				top: 10upx;
			}
		}
	}
	.content{
		padding: 0 20upx;
		margin-top: 10upx;
		.li{
			border-radius:10upx; 
			background: #eee;
			padding: 4upx 8upx;
			margin-right: 20upx;
			font-size: 28upx;
			color: #333;
			display: inline-block;
			margin-bottom: 20upx;
		}
	}
}
.search_warp input{
	position: absolute;
	left: 110upx;
	top: 16upx;
}
.search_warp_active{
		background: #fff;
	}
	.search_warp_active .search_warp{
		background: #fff;
	}
	.search_warp_active .search{
		background: #eee;
	}
	.search_warp_active .search_text{
		color: #666;
	}
	.search_text{
		color:#fff;
		font-size:34upx;
		position:absolute;
		left:100upx;
		top:0upx;
	}
	.search image,.server image{
		width: 50upx;
		height: 50upx;
	}
	.search image{
		left: 40upx;
		top: 16upx;
		position: absolute;
	}
	.search{
		background: #fff;
		opacity: .6;
		height: 80upx;
		width: 620upx;
		border-radius:100upx; 
	}
	
	.search_content .title{
		height: 140upx;
		width: 750upx;
		position: relative;
		top: 0;
		background: #fff;
		z-index: 999999;
	}
	.search_content{
		position: relative;
		z-index: 999999;
		width: 750upx;
		height: 120upx;
	
	}
	.customer-service{
		position: absolute;
		right: 20upx;
		top: 15upx;
		z-index: 99999;
	}
	.customer-service image{
		width: 60upx;
		height: 60upx;
	}
	.title{
		height: 140upx;
		color: #333;
		line-height: 180upx;
		text-align: center;
	}
	.search_warp{
		position: relative;
		z-index: 99999;
		padding-left: 20upx;
		text-align: left;
		line-height: 80upx;
		width: 100%;
		height: 120upx;
		
	}
	
	
	
	.search_warp text{
		display: inline-block;
		width: 40upx;
		height: 40upx;
		line-height: 36upx;
		text-align: center;
		position: absolute;
		right: 160upx;
		top: 20upx;
		color: #fff;
		border-radius: 50%;
		z-index: 999999;
		background: #999;
	}
	/* #ifdef H5 || APP-PLUS */  
	.search_warp{
		top: 40upx;
	}
	.customer-service{
		top: 55upx;
	}
	.lately-search{
		margin-top: 40upx;
		
	}
	/* #endif */
</style>
