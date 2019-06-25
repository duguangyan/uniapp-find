<template>
	<view>
		<view class="container box-shadow fs30" v-if='finds.length>0'>
			<view class="bb-2 lh90 text-left " @click='parentCheck' data-nav='1'>
				<text v-if='findsCheckAll' class="iconfont icon-dui fs40 text-yellow mgl-20"></text>
				<text v-if='!findsCheckAll' class="iconfont icon-dui fs40 mgl-20 text-eb"></text>
				<text class='pdl-20'>找料任务</text>
			</view>
			<view class="touch-item" :class="item.isTouchMove ? 'touch-move-active' : ''" :data-nav="1" :data-index='index' @touchstart="touchstart" @touchmove="touchmove"
			 v-for="(item ,index) in finds" :key="index">

				<view class='content cf'>
					<view class='check-btn' :data-nav='1' :data-index='index' @click='childCheck'>
						<text v-if='item.check' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
						<text v-if='!item.check' class="iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"></text>
					</view>
					<view class='check-edit' @click='edit' :data-index='index' :data-item='item' data-nav='1'>
						<text>修改</text>
					</view>
					<view class='image-bg'>
						<image src='/static/icon/task_find.png'></image>
					</view>

					<view class='task-content pdr-20'>
						<view>
							<text>物料品类: {{item.cname}}</text>
							<text class='flr pdr-30'>金额: ￥{{item.fee}}</text>
						</view>
						<view>
							<text style='width:450upx' class='ellipsis'>物料描述: {{item.desc}}</text>
						</view>
						<view>
							<view v-if='item.find_type == 1'>找料方式: 按图找料</view>
							<view v-if='item.find_type == 2'>找料方式: 按样找料</view>
							<view v-if='item.find_type == 3'>找料方式: 寄送样品</view>
						</view>
						<view v-if='item.find_type == 1'>
							<image class='item-img' v-for='(imgItem , imgIndex) in item.desc_img' :key='imgIndex' :src='imgItem'></image>
						</view>
						<view v-if='item.find_type == 2'>

							<view class='pdr-20'>
								取样地址:
							</view>
							<view v-if="item.address">
								<view class='fs24 pdr-20' style='word-break:break-all;'>
									<text class='remark' v-if="item.address.remark !=''">{{item.address.remark||''}}</text>
									{{item.address.city_str||''}} {{item.address.address||''}} {{item.address.room||''}}

								</view>
								<view class='fs24 pdr-20 text-999' style='word-break:break-all;'>
									{{item.address.consignee||''}} / {{item.address.mobile||''}}
								</view>
								<view class='text-999 fs24 pdr-20' style='word-break:break-all;'>
									{{item.address.stall ||''}}
								</view>
							</view>
						</view>

						<view v-if='item.find_type == 3'>
							<view class='pdr-20'>
								寄样地址:
							</view>
							<view>
								<view class='fs24 pdr-20' style='word-break:break-all;'>
									<text class='remark' v-if='companyaddress[0].tag'>{{companyaddress[0].tag||''}}</text>
									{{companyaddress[0].address||''}}
								</view>
								<view class='fs24 pdr-20 text-999' style='word-break:break-all;'>
									{{companyaddress[0].consignee||''}} / {{companyaddress[0].mobile||''}}
								</view>
								<view class='fs24 text-999'>
									{{companyaddress[0].desc}}
								</view>
								<view>...</view>
							</view>
						</view>
					</view>

				</view>


				<view class="del" @click="del" :data-nav='1' :data-id='item.id' :data-index="index">删除</view>
			</view>
			<view class='cf'>
				<view class='lh90 flr pdr-30'>共{{findsLength}}个任务，小计：
					<text class='text-red'>￥{{findsSumPrice}}</text>
				</view>
			</view>
		</view>

		<view class="container box-shadow fs30" v-if='fetchs.length>0'>
			<view class=" bb-2 lh90 text-left" @click='parentCheck' :data-nav='2'>
				<text v-if='fetchsCheckAll' class="iconfont icon-dui fs40 text-yellow mgl-20"></text>
				<text v-if='!fetchsCheckAll' class="iconfont icon-dui fs40 mgl-20 text-eb"></text>
				<text class='pdl-20'>取送任务</text>
			</view>
			<view class="touch-item" :class="item.isTouchMove ? 'touch-move-active' : ''" :data-nav='2' :data-index="index"
			 @touchstart="touchstart" @touchmove="touchmove" v-for="(item, index) in fetchs" :key="index">

				<view class='content cf'>
					<view class='check-btn' @click='childCheck' :data-nav='2' :data-index='index'>
						<text v-if='item.check' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"></text>
						<text v-if='!item.check' class="iconfont icon-dui icon-dui-1 fs40 pdl-10 text-eb"></text>
					</view>
					<view class='check-edit' @click='edit' :data-index='index' :data-item='item' data-nav='2'>
						<text>修改</text>
					</view>
					<view class='image-bg'>
						<image src='/static/icon/task_get.png'></image>
					</view>
					<view class='task-content pdr-20'>
						<view>
							<text>物料品类: {{item.cname}}</text>
							<text class='flr pdr-30'>金额: ￥{{item.fee}}</text>
						</view>
						<view>
							<text style='width:450upx' class='ellipsis'>物料描述: {{item.desc}}</text>
						</view>
						<view v-if='item.desc_img.length > 0'>
							<image class='item-img' v-for='(imgItem, imgIndex) in item.desc_img' :key='imgIndex' :src='imgItem'></image>
						</view>
						<view v-if="item.address">
							
							<view class='pdr-20'>取料地址:</view>
							<view class='fs24 pdr-20' style='word-break:break-all;' v-if="item.address">
								<text class='remark' v-if='item.address.remark'>{{item.address.remark||''}}</text>
								{{item.address.city_str||''}} {{item.address.address||''}} {{item.address.room||''}}
							</view>
							<view class='fs24 pdr-20' style='word-break:break-all;'>
								{{item.address.consignee||''}} / {{item.address.mobile||''}}
							</view>
							<view class='text-999 fs24 pdr-20' style='word-break:break-all;'>
								{{item.address.stall ||''}}
							</view>
						</view>
					</view>
				</view>
				<view class="del" @click="del" :data-nav='2' :data-id='item.id' :data-index="index">删除</view>
			</view>
			<view class='cf'>
				<view class='lh90 flr pdr-30'>共{{fetchsLength}}个任务，小计：
					<text class='text-red'>￥{{fetchsSumPrice}}</text>
				</view>
			</view>
		</view>
		<view style='height:135upx;'></view>

		<view class='task-pay box-shadow lh90 fs30 mgb-30' v-if='finds.length>0 || fetchs.length>0'>
			<view class='mgl-30'>
				<text @click='doCheckAll' v-if='isCheckAll' class="iconfont icon-dui fs40 pdr-20 text-yellow"></text>
				<text @click='doCheckAll' v-if='!isCheckAll' class="iconfont icon-dui fs40 pdr-20 text-eb"></text>
				<text class='text-underline mgr-50' @click='doCheckAll'>全选</text>

				<text class='mgr-50'>合计：<text class='text-red'>￥{{sumPrice}}</text></text>
				<form v-if="sumPrice!=0" class='task-pay-btn' @click='saveTask'>
					<button class='task-pay-btn'>
						<text class='text-underline'>结算</text>
					</button>
				</form>
				<text v-if="sumPrice==0" class='task-pay-btn-default'>结算</text>

			</view>
		</view>

		<view class='no-data' v-if='finds.length<=0 &&fetchs.length<=0'>
			<image src='../../static/icon/no_order1.png'></image>
			<view class='no-data-text'>你没有相关任务</view>
			<view class='no-data-btn' @click='goIndex'>
				去添加任务
			</view>
		</view>


	</view>
</template>

<script>
	import util from "../../../utils/util.js";
	import api from "../../../utils/api.js";
	export default {
		data() {
			return {
				finds: [],
				fetchs: [],
				startX: 0, //开始坐标
				startY: 0,
				findsCheckAll: true, //找料全选按钮
				fetchsCheckAll: true,
				isCheckAll: true,
				userType: 0,
				isData: true,

				// 新数据
				findsLength: 0, // 找料任务数量
				fetchsLength: 0, // 取送任务数据
				companyaddress: '', // 公司地址
				sumPrice: 0, // 总金额
				findsSumPrice: 0, // 找料任务总金额
				fetchsSumPrice: 0, // 取送任务总金额
			};
		},
		onLoad(options) {
			// 获取公司地址
			this.getCompanyaddress();
		},
		onShow() {
			
		},
		mounted() {
			// 初始化选择按钮
			this.$data.findsCheckAll = true;
			this.$data.fetchsCheckAll = true;
			this.$data.isCheckAll = true;
			this.$data.finds = [];
			this.$data.fetchs = [];
			this.init();
			// 获取取送任务编辑信息
			this.$eventHub.$on('editData', (data) => {
				if(data.task[0].type == 1){
					this.$data.finds.forEach((o,i)=>{
						if(o.id == data.task[0].id){
							this.$data.finds[i] = data.task[0] 
						}
					})
				}else{
					this.$data.fetchs.forEach((o,i)=>{
						if(o.id == data.task[0].id){
							this.$data.fetchs[i] = data.task[0] 
						}
					})
				}
				
			})
		},
		methods: {
			// 获取公司地址
			getCompanyaddress() {
				api.getCompanyaddress({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						this.$data.companyaddress = res.data;
					}
				})
			},
			init() {
				let cancelCheckFindsIds = uni.getStorageSync('cancelCheckFindsIds') || [];
				let cancelCheckFetchsIds = uni.getStorageSync('cancelCheckFetchsIds') || [];
				api.getTaskInit({}).then((res) => {
					if (res.code == 200 || res.code == 0) {
						let finds = res.data.find;
						let findsLength = res.data.find.length;
						let fetchs = res.data.fetch;
						let fetchsLength = res.data.fetch.length;
						finds.forEach((v, i) => {
							v.isTouchMove = false;
							finds[i].address = finds[i].address ? finds[i].address : null;
							finds[i].check = true;
							cancelCheckFindsIds.forEach((v, j) => {
								if (finds[i].id == v) {
									finds[i].check = false;
									this.$data.findsCheckAll = false;
									this.$data.isCheckAll = false;
								}
							})


						})
						fetchs.forEach((v, i) => {
							v.isTouchMove = false;
							fetchs[i].address = fetchs[i].address;
							fetchs[i].check = true;
							cancelCheckFetchsIds.forEach((v, j) => {
								if (fetchs[i].id == v) {
									fetchs[i].check = false;
									this.$data.fetchsCheckAll = false;
									this.$data.isCheckAll = false;
								}
							})
						})
						this.$data.finds = finds;
						this.$data.fetchs = fetchs;
						this.$data.findsLength = findsLength;
						this.$data.fetchsLength = fetchsLength;
						// 计算价格
						this.doSumPrice();
						this.isHasData();
					}
				})
			},
			// 判断是否还有数据
			isHasData() {
				if (this.$data.finds.length <= 0 && this.$data.fetchs.length <= 0) {
					this.$data.isData = true
					this.$data.isData = false
				}
			},
			// 计算合计金额
			doSumPrice() {
				let findsLength    = 0;
				let fetchsLength   = 0;
				let finds          = this.$data.finds;
				let fetchs         = this.$data.fetchs;
				let findsSumPrice  = 0;
				let fetchsSumPrice = 0;
				for (let i = 0; i < finds.length; i++) {
					if (finds[i].check) {
						findsSumPrice += parseFloat(finds[i].fee);
						findsLength++;
					}
				}
				for (let i = 0; i < fetchs.length; i++) {
					if (fetchs[i].check) {
						fetchsSumPrice += parseFloat(fetchs[i].fee);
						fetchsLength++;
					}
				}
				let sumPrice = findsSumPrice + fetchsSumPrice;
				this.$data.findsLength    = findsLength;
				this.$data.fetchsLength   = fetchsLength;
				this.$data.findsSumPrice  = util.formatMoney(findsSumPrice);
				this.$data.fetchsSumPrice = util.formatMoney(fetchsSumPrice);
				this.$data.sumPrice       = util.formatMoney(sumPrice);
			},
			// 手指触摸动作开始 记录起点X坐标
			touchstart: function(e) {
				let nav = e.currentTarget.dataset.nav;
				this.$data.startX = e.clientX;
				this.$data.startY = e.clientY;
			},
			//滑动事件处理
			touchmove: function(e) {
				let nav = e.currentTarget.dataset.nav;
				var that   = this,
					index  = e.currentTarget.dataset.index, //当前索引
					startX = that.$data.startX, //开始X坐标
					startY = that.$data.startY, //开始Y坐标
					touchMoveX = e.clientX, //滑动变化坐标
					touchMoveY = e.clientY, //滑动变化坐标
					//获取滑动角度
					angle = that.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});

				if (nav == 1) {
					that.$data.finds.forEach(function(v, i) {
						v.isTouchMove = false
						//滑动超过30度角 return
						if (Math.abs(angle) > 30) return;
						if (i == index) {
							if (touchMoveX > startX) //右滑
								v.isTouchMove = false
							else //左滑
								v.isTouchMove = true
						}
					})
					//更新数据
					// that.setData({
					// 	finds: that.data.finds
					// })
				} else {
					that.$data.fetchs.forEach(function(v, i) {
						v.isTouchMove = false
						//滑动超过30度角 return
						if (Math.abs(angle) > 30) return;
						if (i == index) {
							if (touchMoveX > startX) //右滑
								v.isTouchMove = false
							else //左滑
								v.isTouchMove = true
						}
					})
				}
			},
			/**
			 * 计算滑动角度
			 * @param {Object} start 起点坐标
			 * @param {Object} end 终点坐标
			 */
			angle: function(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			},
			
			//删除事件
			  del: function (e) {
				let index = e.currentTarget.dataset.index,
					nav   = e.currentTarget.dataset.nav,
					id    = e.currentTarget.dataset.id,
					_this = this;
				uni.showModal({
				  title: '提示',
				  content: '是否删除？',
				  success: function (res) {
					if (res.confirm) {
					  api.delTask({
						 method: 'POST' ,
						 data:{
						   id
						 }
					  }).then((res) => {
						console.log(res);
						if (res.code == 200 || res.code == 0) {
							util.errorTips('删除成功')
							if(nav == 1){
								_this.$data.finds.splice(index, 1);
							}else{
								_this.$data.fetchs.splice(index, 1);
							} 
											
							// 统计合计金额
							_this.doSumPrice();
							// 判断是否还有数据
							_this.isHasData();
							// 统计小计金额
							_this.doTotalPrice();
						}else{
							util.errorTips(res.msg);
						}
					  })
					}
				  }
				})
			  },
			  // 统计价格
			  doTotalPrice(){
				let finds = this.$data.finds,
				  fetchs = this.$data.fetchs;
				this.$data.totalFindsPrice = 0;
				this.$data.totalFetchsPrice= 0;
				for (let i = 0; i < finds.length;i++){
				  this.$data.totalFindsPrice += parseFloat(finds[i].fee);
				}
				for (let i = 0; i < fetchs.length; i++) {
				  this.$data.totalFetchsPrice += parseFloat(fetchs[i].fee);
				}
			  },
			  childCheck(e){
				// get nav  and index
				let nav   = e.currentTarget.dataset.nav,
					index = e.currentTarget.dataset.index;
					// this is finds items
				if(nav == 1){
				  if (this.$data.finds[index].check){
					this.$data.finds[index].check = false;
					this.$data.findsCheckAll      = false;
					this.$data.isCheckAll         = false;
				  }else{
					this.$data.finds[index].check = true;
					if (this.verdictItemsWasAllCheck(this.$data.finds)){
					  this.$data.findsCheckAll = true
					}
				  } 
				}else{  // this is fetchs items
				  if (this.$data.fetchs[index].check) {
					this.$data.fetchs[index].check = false;
					this.$data.fetchsCheckAll = false;
					this.$data.isCheckAll = false;
				  } else {
					this.$data.fetchs[index].check = true;
					if (this.verdictItemsWasAllCheck(this.$data.fetchs)) {
					  this.$data.fetchsCheckAll = true
					}
				  } 
				}
				this.verdictAllCheck();
				this.doSumPrice();
				// 判断并记录取消check
				if(nav==1){
				  this.cancelCheck(nav, this.$data.finds[index].id, this.$data.finds[index].check);
				}else{
				  this.cancelCheck(nav, this.$data.fetchs[index].id, this.$data.fetchs[index].check);
				}
			   
			  },
			  // verdict  item was all check
			  verdictItemsWasAllCheck(obj){ 
				let n = 0;
				for(let i=0;i<obj.length;i++){
				  if(obj[i].check){
					n++
				  }
				}
				if (n == obj.length) {
				  return true
				} else {
				  return false
				}
			  },
			  // verdict  all items was all check
			  verdictAllCheck(){
				if (this.$data.findsCheckAll && this.$data.fetchsCheckAll){
				  this.$data.isCheckAll = true
				}else{
				  this.$data.isCheckAll = false
				}
			  },
			  // 判断取消选中并获取ID
			  cancelCheck(nav, id,check){
				let getId = id || false;
				let isCheck = check || false;
				if (this.$data.finds.length <= 0 ){
				  uni.removeStorageSync('cancelCheckFindsIds');
				}
				if (this.$data.fetchs.length <= 0){
				  uni.removeStorageSync('cancelCheckFetchsIds');
				}
				let cancelCheckFindsIds  = uni.getStorageSync('cancelCheckFindsIds') || [];
				let cancelCheckFetchsIds = uni.getStorageSync('cancelCheckFetchsIds') || [];
				if(nav==1){ 
				  if (getId){ 
				   
					if (isCheck){
					  cancelCheckFindsIds.forEach((v,i)=>{
						if (v == getId){
						  cancelCheckFindsIds.splice(i,1);
						}
					  })
					}else{
					  cancelCheckFindsIds.push(getId);
					}
					
					
				  }else{
					if (!this.$data.findsCheckAll){
					  cancelCheckFindsIds = [];
					  this.$data.finds.forEach((v, i) => {
						cancelCheckFindsIds.push(this.$data.finds[i].id);
					  })
					}else{
					  cancelCheckFindsIds = [];
					}
				  }
				  uni.setStorageSync('cancelCheckFindsIds', cancelCheckFindsIds);

				}else if(nav==2){ 

				  if (getId) {

					if (isCheck) {
					  cancelCheckFetchsIds.forEach((v, i) => {
						if (v == getId) {
						  cancelCheckFetchsIds.splice(i, 1);
						}
					  })
					} else {
					  cancelCheckFetchsIds.push(getId);
					}


				  } else {
					if (!this.$data.fetchsCheckAll) {
					  cancelCheckFetchsIds = [];
					  this.$data.fetchs.forEach((v, i) => {
						cancelCheckFetchsIds.push(this.$data.fetchs[i].id);
					  })
					} else {
					  cancelCheckFetchsIds = [];
					}
				  }
				  wx.setStorageSync('cancelCheckFetchsIds', cancelCheckFetchsIds);

				}else if(nav==3){
				  cancelCheckFindsIds = [];
				  cancelCheckFetchsIds = [];
				  if (!this.$data.isCheckAll){
					this.$data.finds.forEach((v, i) => {
					  cancelCheckFindsIds.push(this.$data.finds[i].id);
					})
					this.$data.fetchs.forEach((v, i) => {
					  cancelCheckFetchsIds.push(this.$data.fetchs[i].id);
					})
				  }
				  uni.setStorageSync('cancelCheckFindsIds', cancelCheckFindsIds);
				  uni.setStorageSync('cancelCheckFetchsIds', cancelCheckFetchsIds);
				}
			  },
			  
			  parentCheck(e){ 
				let nav = e.currentTarget.dataset.nav;
				// 1 is finds  2 is fetch
				if(nav == 1){
				  if (this.$data.findsCheckAll){
					this.$data.findsCheckAll = false;
					this.dataForEach(this.$data.finds,false);
				  }else{
					this.$data.findsCheckAll = true;
					this.dataForEach(this.$data.finds, true);
				  }
				}else{
				  if (this.$data.fetchsCheckAll) {
					this.$data.fetchsCheckAll = false;
					this.dataForEach(this.$data.fetchs, false);
				  } else {
					this.$data.fetchsCheckAll = true;
					this.dataForEach(this.$data.fetchs, true);
				  } 
				}
				this.verdictAllCheck();
				// 计算价格
				this.doSumPrice();
				// 判断并记录取消check
				this.cancelCheck(nav);
			  },
			  // traversal data
			  dataForEach(obj,bool){ 
				obj.forEach((v,i)=>{
				  v.check = bool
				})
			  },
			  // all checkbox choosed
			  doCheckAll(){
				if (this.$data.isCheckAll){
				  this.$data.isCheckAll     = false;
				  this.$data.findsCheckAll  = false;
				  this.$data.fetchsCheckAll = false;
				  this.dataForEach(this.$data.finds,false);
				  this.dataForEach(this.$data.fetchs, false);
				}else{
				  this.$data.isCheckAll = true;
				  this.$data.findsCheckAll = true;
				  this.$data.fetchsCheckAll = true;
				  this.dataForEach(this.$data.finds, true);
				  this.dataForEach(this.$data.fetchs, true);
				}
				this.verdictAllCheck();
				
				this.doSumPrice();
				// 判断并记录取消check
				this.cancelCheck(3);
			  },
			  // 点击结算
			  saveTask(e) {
				
				let newFinds = [];
				let newFetchs = [];
				let task_ids = [];
				// 刷选选中的找料任务
				for (let i = 0; i < this.$data.finds.length; i++) {
				  if (this.$data.finds[i].check) {
					newFinds.push(this.$data.finds[i]);
					task_ids.push(this.$data.finds[i].id);
				  }
				}
				// 刷选选中的取料任务
				for (let j = 0; j < this.$data.fetchs.length; j++) {
				  if (this.$data.fetchs[j].check) {
					newFetchs.push(this.$data.fetchs[j]);
					task_ids.push(this.$data.fetchs[j].id);
				  }
				}
				let taskPayList = {
				  task_ids: task_ids,
				  finds: newFinds,
				  fetchs: newFetchs
				}
				uni.setStorageSync('taskPayList', taskPayList);
				let payMethed = 1;
				if (this.$data.finds.length > 0){
				  payMethed = 1
				} else if (this.$data.fetchs.length > 0){
				  payMethed = 2
				} else if (this.$data.finds.length > 0 && this.data.fetchs.length > 0){
				  payMethed = 3
				}
				wx.navigateTo({
				  url: '../taskPay/taskPay?payMethed=' + payMethed
				})
			  },
			  // 编辑订单
			  edit(e){
				let item = e.currentTarget.dataset.item,
				   index = e.currentTarget.dataset.index,
				   nav   = e.currentTarget.dataset.nav;
				   
				   if(nav == 1){
					 uni.setStorageSync('findItem',item);  
					 uni.navigateTo({
					   url: '../find/find?taskEditItem=true' 
					 })
				   }else{
					 uni.setStorageSync('fetchItem',item);
					 uni.navigateTo({
					   url: '../fetch/fetch?taskEditItem=true'
					 })
				   }
			  },
			  
		},
	}
</script>

<style lang="scss" scoped>
	.touch-item {
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		width: 100%;
		overflow: hidden;
		margin-left: 10upx;
	}

	.content {
		width: 100%;
		padding: 0 10upx;
		line-height: 22px;
		margin-right: 0;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(90px);
		transform: translateX(90px);
		margin-left: -90px;
		position: relative;
		text-align: left;
	}

	.del {
		background-color: #F29800;
		width: 90px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		-webkit-transform: translateX(90px);
		transform: translateX(90px);
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
	}

	.touch-move-active .content,
	.touch-move-active .del {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}

	.check-btn {
		position: absolute;
		width: 100upx;
		height: 100%;
	}

	.icon-dui-1,
	.icon-yuan-1 {
		position: absolute;
		top: 25%;
	}

	.image-bg {
		width: 100upx;
		height: 100upx;
		position: absolute;
		right: 30upx;
		top: 6%;
	}

	.image-bg image {
		width: 100%;
		height: 100%;
	}

	.task-content {
		margin-left: 15upx;
		border-bottom: 1upx solid #eee;
		padding: 10upx 0;
		padding-left: 55upx;
	}

	.item-img {
		width: 100upx;
		height: 100upx;
		margin-right: 70upx;
		border-radius: 10upx;
		margin-top: 20upx;
	}

	.task-pay {
		width: 710upx;
		position: fixed;
		bottom: 130upx;
		z-index: 999;
		overflow: hidden;
		height: 115upx;
		line-height: 115upx;
		background-color: #f8f8f8;
	}

	.task-pay-btn {
		width: 200upx;
		display: inline-block;
		background-color: #F29800;
		text-align: center;
		color: #fff;
		float: right;
		height: 115upx;
		line-height: 115upx;
	}

	.task-pay-btn-default {
		width: 200upx;
		display: inline-block;
		background-color: #999;
		text-align: center;
		color: #fff;
		float: right;
		font-size: 36upx;
	}

	.no-data {
		margin: 0 auto;
		text-align: center
	}

	.no-data image {
		width: 100upx;
		height: 140upx;
		margin-top: 200upx;
	}

	.no-data-text {
		text-align: center;
		margin-top: 30upx;
		font-size: 30upx;
		font-size: #333;
	}

	.no-data-btn {
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		color: #fff;
		background-color: #F29800;
		border-radius: 10upx;
		font-size: 36upx;
		margin: 0 auto;
		margin-top: 50upx;
	}

	.task-content-le {
		letter-spacing: 10upx;
	}

	.check-edit {
		position: absolute;
		right: 0;
		top: 0;
		color: #1435ff;
		width: 120upx;
		height: 100%;
		z-index: 9999;
	}

	.check-edit text {
		position: absolute;
		right: 50upx;
		top: 25%;
	}
</style>
