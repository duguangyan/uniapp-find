<template>
	<view class="upload-box">
		<view v-if="files.length>0" class="upload-img-box relative" v-for="(item, index) in files" :key="index">
			<image class="img" :src="item.url"></image>
			<image @click='deleteItem(index)' class="delete-icon" src='../../static/icon/del.png'></image>
			<view class="fail"  v-if="item.pct == 'wait'">图片上传中...</view>
			<view class="fail" v-if="item.pct == 'fail'">图片上传失败</view>
		</view>
		<view v-if="files.length<9" @click='uploadAll' class="upload-img-box">
			<image src="../../static/icon/upload_bg.png" mode=""></image>
		</view>

	</view>
</template>


<script>
	import util from '../utils/util.js';
	import api from '../utils/api.js';
	export default {
		data() {
			return {
				addUpload: true,
				index: 0
			};
		},
		props: {
			upLoadMaxNum: {
				type: Number,
				default: 9
			},
			files:{
				type:Array
			},
			itemIndex:{
				type: Number,
				default: 0
			}
		},
		created(){
			// console.log('created');
			// console.log(this.upLoadMaxNum);
			this.$data.files = this.files;
			this.$data.upLoadMaxNum = this.upLoadMaxNum;
			this.$data.index = this.files.length;
			this.$data.itemIndex = this.itemIndex;
		},
		mounted(){
			// console.log('mounted');
			// console.log(this.upLoadMaxNum);
		},
		methods: {
			uploadAll() {
				let _this = this;
				if (this.$data.files > 0) {
				  this.$data.index = this.$data.files.length - 1
				}
				let count = this.$data.upLoadMaxNum - this.$data.files.length;
				uni.chooseImage({
					count: count,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						let files = this.$data.files;
						res.tempFilePaths.forEach((ele, i) => {
							let item = {
							  url: ele,
							  pct: 'wait',
						  }
						  files.push(item)
						})
						
						_this.uploadServcer(files,_this.$data.index);
					}
				})
			},

			uploadServcer(files,i){
				let _this = this;
				const access_token = uni.getStorageSync('access_token');
				let timestamp = Date.parse(new Date());
				let data = {};
				data.file = '[object Object]';
				data.type = 'big';
				data.timestamp = timestamp;
				data.sign = util.makeSign(api.apiUrl + '/api/upload', data);
				data.deviceId = "uniapp";
				data.platformType = "1";
				data.versionCode = '4.0';
				// 上传图片，返回链接地址跟id,返回进度对象
				let uploadTask = uni.uploadFile({
					url: `${api.apiUrl}/api/upload`,
					filePath:  _this.files[i].url,
					name: 'file',
					header: {
						'content-type': 'multipart/form-data',
						'Accept': 'application/json',
						'Authorization': `Bearer ${access_token}`
					},
					formData: data,
					success: (res) => {
						console.log(res);
						var res = JSON.parse(res.data);
						if (200 === res.code || 0 === res.code) {
							console.log(_this);
							_this.$data.files[i].url = res.data;
							_this.$data.files[i].pct = 'finish';
				
						}
					},
					fail(err) {
						console.log(err)
						// util.errorTips('上传错误');
						_this.$data.files[i].pct = 'fail';
						console.log(_this.$data.files);
					},
					complete: () => {
					  i++; //这个图片执行完上传后，开始上传下一张
					  _this.$data.index = i;
					  if (i == _this.$data.files.length) { //当图片传完时，停止调用          
						  console.log('执行完毕');
						  this.$emit('imageUpload', {'files':_this.$data.files,'itemIndex': _this.$data.itemIndex});
						  // wx.hideLoading()
					  } else { //若图片还没有传完，则继续调用函数
						  console.log(i);
						  _this.uploadServcer(_this.$data.files, i);
					  }
					}
				})
			},
			// 删除上传
			deleteItem(i) {
				let files = this.$data.files;
				let isFiniish = files.every((ele, i) => {
					return (ele.pct === 'finish' || ele.pct === 'fail')
				})
				files.splice(i, 1);
				this.$data.index -= 1;
				this.$data.files = files;
				
				// if (files.length === this.$data.upLoadMaxNum) {
				// 	
				// 	this.$data.files = files;
				// } else {
				// 	this.$data.files = files;
				// }

			},
		}
	}
</script>

<style lang="scss" scoped>
	.fail{
		color: #333;
		font-size:24upx;
		position: absolute;
		z-index: 9999;
		top: 0;
		left: 0;
		opacity: .7;
		width:100%;
		background:#000;
		color:#fff;
	}
	.upload-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
	}

	.relative {
		position: relative;
		background: none!important;
	}

	.hidden {
		display: none;
	}

	.upload-img-box {
		width: 160upx;
		height: 160upx;
		line-height: 160upx;
		text-align: center;
		font-size: 120upx;
		color: #fff;
		background: #ccc;
		margin: 10upx 36upx;
		border-radius:10upx;
		image{
			width: 160upx;
			height: 160upx;
		}
	}
	/*删除icon  */
	.delete-icon {
		width: 44upx !important;
		height: 44upx !important;
		position: absolute;
		right: -12upx;
		top: -12upx;
		background: transparent;
		z-index: 99999;
	}
</style>
