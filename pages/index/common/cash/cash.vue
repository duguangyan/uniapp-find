<template>
	<view class="cash">
		<view class="flex">
			<view class="flex-1" @click="checkNav(index)" v-for="(item, index) in navs" :key="index">
				<text :class="index == navIndex?'active':''">{{item}}</text>
			</view>
		</view>
		<view class="zfb">
			<view class="t1">{{navIndex == 0?txts.z:txts.g}}</view>
			<view class="t2 cf">
				<image class="fll" :src="userInfo.avatarUrl" mode=""></image>
				<view class="v1 fll">
					<view>{{userInfo.nickName}}</view>
					<!-- <view>111@qq.com</view> -->
				</view>
				<view class="v2" @click="bindWxInfo" v-if="!wxIsBind">点击绑定微信信息 <text class="arrow-right"></text></view>
			</view>
		</view>
		<view class="get">
			{{txts.m}}
		</view>
		<view class="input">
			<text class="t1">￥</text>
			<input class="t2" type="number" :placeholder="'本次最多可转出'+moreMoney+'元'" v-model='amount' />
			<text class="t3" @click="getMoreMoney">全部</text>
		</view>
		<!-- <view class="type">
			{{txts.t}}
		</view>
		<view class="mess">
			<view class="v1" @click="checkTransfer">
				<text v-if="isTransfer" class="iconfont icon-dui fs40 text-yellow mgl-20 mgr-20"></text>
				<text v-if="!isTransfer" class="iconfont icon-dui fs40 text-eb mgl-20 mgr-20"></text>
				<text class="t1">{{txts.n}}</text>
			</view>
			<view class="v2">
				<text>{{txts.s}}</text>
			</view>
		</view> -->
		
		<uni-list>
			<view class="uni-list bb-1">
				<uni-list-item :title="txts.j" @click="goCashRecord"></uni-list-item>
			</view>
		</uni-list>
		<view class="footer-btn">
			<view class="btn" @tap="masks()">申请</view>
		</view>
		
		
		<!-- <button  @tap="masks()">确认收货</button> -->
		
		
		<!-- 密码框 -->
		<view v-if="mask" style="width: 100%;height: 100%;position:fixed;background: rgb(0,0,0,0.4);top: 0;z-index: 9999;overflow: hidden;">
			<view :class="bott" class="masks">
				<view style="padding: 0 3%;">
				<view @tap="maskss()" style="float: left;font-size: 60upx;margin: -10upx 0 0 0;">×</view>
				<view style="text-align: center;font-size:30upx;padding-top: 3%;">请输入短信验证码</view>
				</view>
				<view style="display: flex;width: 80%;margin:5% auto;text-align: center;">
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 0" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 1" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 2" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 3" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 4" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
					<view style="flex: 1;">
						<view style="width: 80upx;height: 80upx;border: 1px solid#ccc;margin: auto;line-height:1;">
							<text v-if="array.length > 5" style="font-size:80upx;position: relative;top: -8upx;">●</text>
						</view>
					</view>
				</view>
				<view style="display: flex;flex-wrap: wrap;text-align: center;">
					<view @tap="password(1)" class="password">1</view>
					<view @tap="password(2)" class="password">2</view>
					<view @tap="password(3)" class="password">3</view>
					<view @tap="password(4)" class="password">4</view>
					<view @tap="password(5)" class="password">5</view>
					<view @tap="password(6)" class="password">6</view>
					<view @tap="password(7)" class="password">7</view>
					<view @tap="password(8)" class="password">8</view>
					<view @tap="password(9)" class="password">9</view>
					<view @tap="reset()" class="password" style="background: #F29800;color: #fff;">重置</view>
					<view @tap="password(0)" class="password">0</view>
					<view @tap="backspace()" class="password" style="background: #F29800;color: #fff;">◀</view>
					
					
				</view>
			</view>
		</view>
		
		
		<view v-if="showCon" class="modal-mask">
			<view class="modal-dialog">
				<view class="modal-title">温馨提示</view>
				<view class="modal-content">
					允许获取用户微信信息
				</view>
				<view class="modal-footer">
					<view class="btn-cancel" @click="changeModalCancel">取消</view>
					<button open-type="getUserInfo" class="btn-confirm button-on-view" style="padding:0upx;" @click="changeModalCancel">确定</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import util from "../../../../utils/util.js";
	import api from "../../../../utils/api.js";
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				showCon:false,
				mask:false,
				array:'',
				bott:'',
				txts:{
					j:'提现记录',
					m:'提取金额',
					t:'提现方式',
					n:'普通转账',
					s:'预计确认提现后，24小时内到账',
					z:'绑定微信信息',
					g:'绑定支付宝信息'
				},
				navs:['转出到微信','转出到支付宝'],
				navIndex: 0,  
				moreMoney:5000,       // 最多提取金额
				amount:'',          // 提取金额
				isTransfer: true,  // 是否转账
				infoRes:'',        // 微信授权信息
				userInfo:'',       // 用户微信资料
				encryptedData:'',
				iv:'',
				session_key:'',
				open_id:'',
				wxIsBind: false,
				code_id:'',
				code_msg:'',
				now_amount:'',
				pageIndex:0,
				wxNickName:''
			};
		},
		onLoad(options) {
			this.$data.now_amount = options.now_amount;
			this.$data.pageIndex = options.pageIndex;
			if(this.$data.pageIndex == 1){  // 佣金提现
				uni.setNavigationBarTitle({
					title: "佣金提现"
				})
			}else if(this.$data.pageIndex == 2){   // 代采提现
				uni.setNavigationBarTitle({
					title: "代采提现"
				})
			}
		},
		onShow() {
			this.apiMemberWxBind();
		},
		methods: {
			
			// 获取微信绑定信息
			apiMemberWxBind(){
				api.apiMemberWxBind({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.wxIsBind = true;
						this.$data.userInfo = res.data;
						this.$data.wxNickName = res.data.nickName
					}else{
						this.$data.wxIsBind = false;
					}
				}).catch((res)=>{
					this.$data.wxIsBind = false;
				})
			},
			// 关闭授权
			changeModalCancel() {
				this.$data.showCon = false;
				let _this = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					console.log(loginRes.authResult);
					// 获取用户信息
					//发起网络请求
					let data = {
					  code: loginRes.code,
					  from: 3
					}
					
					uni.getUserInfo({
					  provider: 'weixin',
					  success: function (infoRes) {
						_this.$data.infoRes = infoRes;
						_this.$data.userInfo = infoRes.userInfo;
						_this.$data.encryptedData = infoRes.encryptedData;
						_this.$data.iv   = infoRes.iv;
						api.getOpenId({
						  data
						}).then((res) => {
						  if (res.code == 200 || res.code == 0) {
							uni.setStorageSync('open_id', res.data.openid);
							_this.$data.session_key = res.data.session_key;
							_this.$data.open_id = res.data.openid;
							_this.$data.wxIsBind = true;
							
							
							if(!_this.$data.wxIsBind){
								util.errorTips('请先绑定用户微信信息');
								return false;
							}
							
							if(_this.$data.encryptedData == "" || _this.$data.iv == "" || _this.$data.session_key == "" || _this.$data.open_id == ""){
								_this.$data.showCon = true;
								return false;
							}
							api.apiMemberWxBind({
								method:'POST',
								data:{
									openid: _this.$data.open_id,
									session_key: _this.$data.session_key,
									iv: _this.$data.iv,
									encryptedData: _this.$data.encryptedData,
								}
							}).then((res)=>{
								if(res.code == 200 || res.code == 0){
									util.successTips(res.msg);
								}else{
									util.errorTips(res.msg);
								}
							}).catch((res)=>{
								util.errorTips(res.msg);
							})
							
						  } else {
							util.errorTips(res.msg)
						  }
						})
						
					  }
					});
				  }
				});
			},
			password(num){
				let _this = this;
				if(this.$data.array.length < 6){
					this.$data.array= this.$data.array + num;
					console.log(this.$data.array)
				}
				if(this.$data.array.length == 6){
					console.log('跳转')
					this.$data.mask = false
					
					this.$data.bott = ''
					
					let data = {
						"id": this.$data.code_id,
						"code": this.$data.array,
						"mobile": uni.getStorageSync('user_name'),
						"type": "wx",
						"amount": this.$data.amount,
					}
					
					if(this.$data.navIndex == 1){
						data.type = "ali"
					}
					if(this.$data.pageIndex == 1){
						data.asset_type = 'commission';
					}else if(this.$data.pageIndex == 2){
						data.asset_type = 'replace';
					}
					api.apiAssetTake({
						method:'POST',
						data
					}).then((res)=>{
						if(res.code == 200 || res.code == 0){
							_this.$data.array = ''
							uni.navigateBack({
								delta:1
							})
						}else{
							_this.$data.array = '';
							util.errorTips(res.msg);
						}
					}).catch((res)=>{
						_this.$data.array = ''
						util.errorTips(res.msg || res.message);
					})	
				}
			},
			reset(){
				this.$data.array = []
			},
			backspace(){
				let data = this.$data.array;
				data = data.substr(0,data.length-1);
				this.$data.array = data;
			},
			masks(){
				 let _this = this;
				if(!this.$data.wxIsBind){
					if(_this.$data.encryptedData == "" || _this.$data.iv == "" || _this.$data.session_key == "" || _this.$data.open_id == ""){
						_this.$data.showCon = true;
						util.errorTips('请绑定用户微信信息');
						return false;
					}
				}
				
				if(_this.$data.amount == ""){
					util.errorTips('请填写提现金额');
					return false;
				}
				
				
				api.regSMS({
					method:'POST',
					data:{
						mobile:uni.getStorageSync('user_name')
					}
				}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						_this.$data.code_id = res.data.id;
						
						_this.mask = true;
						setTimeout( function(){
							_this.bott = 'bot'
						},50)
						
					}
				}).catch((res)=>{
					util.errorTips(res.msg);
				})
				
			},
			maskss(){
				this.mask = false
				this.bott = ''
				this.array = [];
				
			},
			goCashRecord(){
				uni.navigateTo({
					url:'../cashRecord/cashRecord'
				})
			},
			bindWxInfo(){
				// uni.navigateTo({
				// 	url:'../bindAlipay/bindAlipay'
				// })
				this.$data.showCon = true;
				
			},
			getOutMoney(){
				
			},
			getMoreMoney(){
				if(this.$data.now_amount >= 5000){
					this.$data.amount = 5000;
				}else{
					this.$data.amount = this.$data.now_amount;
				}
			},
			checkTransfer(){
				this.$data.isTransfer = !this.$data.isTransfer;
			},
			
			// 获取支付宝绑定信息
			memberAliBind(index){
				api.memberAliBind({}).then((res)=>{
					if(res.code == 200 || res.code == 0){
						this.$data.userInfo.nickName = res.data.real_name;
						this.$data.navIndex = index;
					}else{
						uni.showModal({
							title: '提示',
							content: '绑定支付宝?',
							confirmText:'立即绑定',
							cancelColor:'#000000',
							success: function (res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'../bindAlipay/bindAlipay'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}).catch((res)=>{
					uni.showModal({
						title: '提示',
						content: '绑定支付宝?',
						confirmText:'立即绑定',
						cancelColor:'#000000',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({
									url:'../bindAlipay/bindAlipay'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				})
			},
			checkNav(index) {
				if(index == 1){
					this.memberAliBind(index);
				}else{
					this.$data.navIndex = index;
					this.$data.userInfo.nickName = this.$data.wxNickName;
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	
	.password{
		width: 25%;flex-grow:1;padding: 3%;font-size:40upx;border-bottom: 1px solid#eee;
	}
	.password:hover{
		background: #eee;
	}
	/* 密码框 */
	.masks{bottom:-50%;position: fixed;background: #fff;width: 100%;transition:.5s}
	.bot{bottom: 0;}
	
	.cash{
		height: 100%;
		background: #f4f4f4;
		.zfb{
			background: #fff;
			margin-top: 20upx;
			
			.t2{
				height: 164upx;
				position: relative;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin:0 30upx;
					position: relative;
					top: 30upx;
				}
				.v1{
					position: relative;
					top: 50upx;
					font-size: 30upx;
					line-height: 40upx;
				}
				.v2{
					position: absolute;
					right: 50upx;
					top: 50upx;
					color: #F29800;
					.arrow-right{
						display: inline-block;
						width:16upx;height: 16upx;
						border-right: 1px solid #F29800;
						border-bottom: 1px solid #F29800;
					}
				}
			}
			
			.t1{
				height: 100upx;
				line-height: 100upx;
				padding-left: 30upx;
				border-bottom: 1upx solid #f4f4f4;
			}
		}
		.footer-btn{
			background: #f4f4f4;
			padding-top: 60upx;
			height: 100upx;
			position: relative;
			.btn{
				width: 630upx;
				height: 88upx;
				line-height: 88upx;
				background: #F29800;
				color: #fff;
				font-size: 32upx;
				text-align: center;
				border-radius: 10upx;
				position: absolute;
				bottom: 30upx;
				left: 60upx;
			}
		}
		
		.mess{
			height: 148upx;
			background: #fff;
			padding: 10upx 0;
			border-top: 1upx solid #f4f4f4; 
			border-bottom:  1upx solid #f4f4f4; 
			margin-bottom: 20upx;
			.v1{
				height: 60upx;
				line-height: 60upx;
				font-size: 28upx;
			}
			.v2{
				height: 60upx;
				line-height: 60upx;
				padding-left: 80upx;
				color: #666;
				font-size: 28upx;
			}
		}
		.type{
			height: 100upx;
			line-height: 100upx;
			padding-left: 30upx;
			font-size: 30upx;
			margin-top: 20upx;
			background: #fff;
		}
		.input{
			height: 196upx;
			line-height: 196upx;
			background: #fff;
			.t1{
				font-size: 80upx;
			}
			.t2{
				display: inline-block;
				width: 450upx;
				margin-left: 20upx;
				font-size: 32upx;
			}
			.t3{
				color: #F29800;
				font-size: 32upx;
				position: relative;
				top: -14upx;
				left: 60upx;
				display: inline-block;
				width: 100upx;
				padding: 0 30upx;
			}
		}
		.get{
			font-size: 30upx;
			height: 100upx;
			line-height: 100upx;
			margin-top: 20upx;
			background: #fff;
			padding-left: 30upx;
			border-bottom: 1upx solid #f4f4f4;
		}
		.flex{
			height: 100upx;
			line-height: 100upx;
			background: #fff;
			text-align: center;
			font-size: 32upx;
			.flex-1{
				
			}
			.active{
				border-bottom: 4upx solid #F29800;
				padding-bottom: 30upx;
			}
		}
	}
	.uni-list{
		background: #fff;
		
	}
	
	
	.modal-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		overflow: hidden;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.modal-dialog {
		width: 540upx;
		overflow: hidden;
		z-index: 9999;
		background: #f9f9f9;
		border-radius: 5upx;
	}
	
	.modal-title {
		padding-top: 30upx;
		font-size: 32upx;
		color: #030303;
		text-align: center;
	}
	
	.modal-content {
		padding: 20upx 32upx;
		font-size: 28upx;
		text-align: center;
	}
	
	.modal-footer {
		display: flex;
		flex-direction: row;
		height: 86upx;
		border-top: 1px solid #dedede;
		font-size: 34upx;
		line-height: 86upx;
	}
	
	.btn-cancel {
		width: 50%;
		color: #abb4bd;
		text-align: center;
		border-right: 1px solid #dedede;
	}
	
	.btn-confirm {
		width: 50%;
		color: #6fb64b;
		text-align: center;
		font-weight: 500;
	}
</style>
