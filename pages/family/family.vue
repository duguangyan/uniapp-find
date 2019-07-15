<template>
	<view class='family'>
		<view class='item cf'>
			<view class='fll fs32 it-1'>姓名:</view>
			<view class='fll fs32 it-2'> <input type='text' v-model="name" :disabled='isExamine' placeholder='请输入姓名' @input='getName'></input>
			</view>
		</view>
		<view class='item cf'>
			<view class='fll fs32 it-1'>联系电话:</view>
			<view class='fll fs32 it-2'> <input type='number' v-model="phone" :disabled='isExamine' placeholder='请输入联系电话' @input='getPhone'></input>
			</view>
		</view>
		<view class='cf address'>
			<view class='fll fs32 it-1'>联系地址:</view>
			<view class='fll fs32 it-2'>
				<!-- <input type='text' placeholder='请输入联系地址' bindinput='getAddress'></input>  -->
				<textarea placeholder="请输入联系地址" v-model="address" auto-height='true' :disabled='isExamine' @input='getAddress' />
				</view>
    </view>
    <view class='item cf'>
      <view class='fll fs32 it-1'>身份证号码:</view>
      <view class='fll fs32 it-2'> <input type='text' v-model="number" :disabled='isExamine' placeholder='请输入身份证号码' @input='getNumber'></input>           </view>
      
    </view>


    <view class='bgg' @click='uploadImg(1)'>
        <image :src="imgBg1"></image>
        <view>请上传身份证正面(信息页)</view>
    </view> 
    <view class='bgg' @click='uploadImg(2)'>
        <image :src="imgBg2"></image>
        <view>请上传身份证反面(国徽页)</view>
    </view> 


    <view class='bt_item cf'  v-if="id !=''">
        <view class='fll'>{{status_label}}</view>
        <view class='flr'>{{remark || ''}}</view>
    </view>

    <view style='padding-bottom:20rpx;' v-if="!isExamine" @click='submit'><view  class='submit'>提交</view></view>

</view> 
</template>

<script>
	import util from "../../utils/util.js";
	import api from "../../utils/api.js";
	export default {
		data() {
			return {
				isExamine:false,
				isCheck:false,
				imgBg1:'https://static.yidap.com/miniapp/o2o_find/index/img_bg.png',
				imgBg2: 'https://static.yidap.com/miniapp/o2o_find/index/img_bg.png',
				name:'',
				phone:'',
				address:'',
				number:'',
				status_label:'',
				remark:'',
				id:''
			};
		},
		onLoad(options) {
			
		},
		onShow() {
			this.getInviteCode();
		},
		methods:{
			 /**
   * 获取姓名
   */
  getName(e){
    this.$data.name = e.detail.value; 
  },
  /**
   * 获取电话
   */
  getPhone(e){
    this.$data.phone = e.detail.value; 
  },
  /**
   * 获取地址
   */
  getAddress(e){
    this.$data.address = e.detail.value; 
  },
  /**
   * 获取身份证
   */
  getNumber(e){
    this.$data.number = e.detail.value; 
  },
  /**
   * 获取图片
   */
  uploadImg(i){
    let _this = this;
    let index = i;
    uni.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const access_token = wx.getStorageSync('access_token') || '';
				
        let data = {};
        data.file = '[object Object]';
        data.type = 'big';
        let timestamp = Date.parse(new Date());
        data.timestamp = timestamp;
        data.sign = util.makeSign(api.apiUrl + '/api/upload', data);
        data.deviceId = "wx";
        data.platformType = "2";
        data.versionCode = '4.0';
        // 上传图片，返回链接地址跟id,返回进度对象
        let uploadTask = wx.uploadFile({
          url: `${api.apiUrl}/api/upload`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
          formData: data,
          success: (res) => {
            var ress = JSON.parse(res.data);
            if (200 === ress.code || 0 === ress.code) {
							index == 1?_this.$data.imgBg1 = ress.data:_this.$data.imgBg2 = ress.data
            } else {
              util.errorTips('上传错误');
            }
          },
          fail(err) {
            util.errorTips('上传错误');
          }
        })


      }
    })
  },
  /**
   * 提交
   */
  submit(){
    let name = this.$data.name;
    let phone = this.$data.phone;
    let address = this.$data.address;
    let number = this.$data.number;
    let imgBg1 = this.$data.imgBg1;
    let imgBg2 = this.$data.imgBg2;
    if(name==''){
      util.errorTips('请填写姓名');
      return false;
    }
    if (phone == '') {
      util.errorTips('请填写联系电话');
      return false;
    }
    if (address == '') {
      util.errorTips('请填写联系地址');
      return false;
    }
    if (number == '') {
      util.errorTips('请填写身份证号码');
      return false;
    }
    if (imgBg1 == 'https://static.yidap.com/miniapp/o2o_find/index/img_bg.png') {
      util.errorTips('请上传身份证正面照');
      return false;
    }
    if (imgBg2 == 'https://static.yidap.com/miniapp/o2o_find/index/img_bg.png') {
      util.errorTips('请上传身份证背面照');
      return false;
    }
    let data = {
      consignee: name,
      mobile: phone,
      address,
      id_card_no: number,
      id_card_front: imgBg1,
      id_card_back: imgBg2
    }
    if(this.$data.id != ''){
      data.id = this.$data.id
    }
    api.getInviteCode({
      method:'POST',
      data
    }).then((res)=>{
      if(res.code == 200 || res.code == 0){
        util.successTips('提交成功');
				this.$data.isExamine = true;
				this.$data.status_label = res.data.status_label;
				this.$data.remark = res.data.remark;
				// uni.navigateBack({
				// 	delta:1
				// })
				uni.navigateTo({
					url:'../index/index'
				})
      }else{
				util.errorTips(res.msg);
			}
    }).catch((res)=>{
			util.errorTips(res.msg || res.message);
		})
    

  },
  /**
   * 获取小鹿家人状态
   */
  getInviteCode() {
    api.getInviteCode({}).then((res) => {
      if (res.code == 200 || res.code == 0) {
        if (res.data.status >0){
					
					this.$data.isExamine = true;
					this.$data.id = res.data.id;
					this.$data.name = res.data.consignee;
					this.$data.phone = res.data.mobile;
					this.$data.address = res.data.address;
					this.$data.number = res.data.id_card_no;
					this.$data.imgBg1 = res.data.id_card_front;
					this.$data.imgBg2 = res.data.id_card_back;
					this.$data.status_label = res.data.status_label;
					this.$data.remark = res.data.remark;
          if (res.data.status == 3){
						this.$data.isExamine = false;
          }
        }
      }
    })
  },
		}
	}
</script>

<style lang="scss" scoped>
.family{
  border-top: 20rpx solid #eee; 
}
page{
  background: #fff;
}

.item{
  height: 76rpx;
  line-height: 76rpx;
  border-bottom: 1rpx solid #eee; 
  margin-left: 40rpx;
}

.item input{
  height: 76rpx;
  line-height: 76rpx;
  padding-left: 50rpx;
}

.item .it-1{
  width: 200rpx;
}
.item .it-2{
  width: 500rpx;
}
.address{
  border-bottom: 1rpx solid #eee; 
  margin-left: 40rpx;
}

.address .it-1{
  width: 200rpx;
  position: relative;
  top: 10rpx;
  
}
.address .it-2{
  width: 450rpx;
  min-height: 152rpx;
  padding-left: 46rpx; 
  overflow: hidden;
}
.address textarea{
  min-height: 152rpx; 
  width: 440rpx !important;
}
.bgg image{
  width: 480rpx;
  height: 302rpx;
}
.bgg view{
  margin-top: 10rpx;
}
.bgg{
  text-align: center;
  padding: 40rpx 0 0 0;
}
.submit{
  margin: 30rpx auto;
  width: 630rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  color: #fff;
  background: #F29800;
  border-radius:10rpx; 
}
.submit view{
  padding-bottom:30rpx;
}
.bt_item{
  /* height: 60rpx;
  line-height: 60rpx; */
  padding: 40rpx;
  background:rgba(255,255,255,1);
  color: #EF230C;
  border-top:20rpx solid #f5f5f5; 
  border-bottom:20rpx solid #f5f5f5; 
  font-size:36rpx;
  font-weight:500;
  margin-top:40rpx; 
}
</style>
