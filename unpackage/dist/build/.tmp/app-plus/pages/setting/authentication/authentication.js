(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/authentication/authentication"],{4413:function(a,t,e){"use strict";e.r(t);var i=e("82ab"),s=e.n(i);for(var r in i)"default"!==r&&function(a){e.d(t,a,function(){return i[a]})}(r);t["default"]=s.a},"4e41":function(a,t,e){"use strict";var i=e("7cdb"),s=e.n(i);s.a},"6f64":function(a,t,e){"use strict";e("a3d9");var i=r(e("b0ce")),s=r(e("fefa"));function r(a){return a&&a.__esModule?a:{default:a}}Page((0,i.default)(s.default))},"7cdb":function(a,t,e){},"82ab":function(a,t,e){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(e("e378")),s=r(e("0089"));function r(a){return a&&a.__esModule?a:{default:a}}var n={data:function(){return{title:"用户认证",VerificationCodeText:"获取验证码",code_id:"",userType:0,userStatus:0,status_label:"",showCon:!1,navArr:[{name:"个人用户",imgUrl:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_personl_no_select.png",activeImg:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_personl_select.png"},{name:"企业用户",imgUrl:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_company_no_select.png",activeImg:"https://static.yidap.com/miniapp/o2o/imgs/ic_certification_company_select.png"}],navIndex:0,bgImg:["","",""],arr:[{name:"姓名:",value:"",placeholder:"请输入您的姓名"},{name:"联系电话:",value:"",placeholder:"请输入您的手机"},{name:"验证码:",value:"",placeholder:"请输入验证码"},{name:"详细地址:",value:"",placeholder:"请选择地区"},{name:"门牌号:",value:"",placeholder:"街道、楼牌等"},{name:"身份证号码:",value:"",placeholder:"请输入您的身份证号码"}],ngImgTextArr:[{text:"请上传身份证正面(信息页)",img:"https://static.yidap.com/miniapp/o2o/imgs/ic_certifcation_card_back.png"},{text:"请上传身份证反面(国徽页)",img:"https://static.yidap.com/miniapp/o2o/imgs/ic_certifcation_card_back.png"},{text:"请上传营业执照正面",img:"https://static.yidap.com/miniapp/o2o/imgs/ic_certifcation_card_back.png"}]}},onLoad:function(t){var e=this;this.$data.userType=a.getStorageSync("userType"),1==this.$data.userType||2==this.$data.userType?this.$data.arr=[{name:"姓名:",value:"",placeholder:"请输入您的姓名"},{name:"联系电话:",value:"",placeholder:"请输入您的手机"},{name:"验证码:",value:"",placeholder:"请输入验证码"},{name:"详细地址:",value:"",placeholder:"请选择地区"},{name:"门牌号:",value:"",placeholder:"街道、楼牌等"},{name:"身份证号码:",value:"",placeholder:"请输入您的身份证号码"}]:this.$data.arr=[{name:"姓名:",value:"",placeholder:"请输入您的姓名"},{name:"联系电话:",value:"",placeholder:"请输入您的手机"},{name:"详细地址:",value:"",placeholder:"请选择地区"},{name:"门牌号:",value:"",placeholder:"街道、楼牌等"},{name:"身份证号码:",value:"",placeholder:"请输入您的身份证号码"}],s.default.auditApply({}).then(function(a){if((200==a.code||0==a.code)&&(e.$data.userStatus=a.data.status,a.data.status>0)){e.$data.userAuthentication=a.data;var t=a.data;e.$data.status_label=t.status_label,e.$data.arr[0].value=t.consignee,e.$data.arr[1].value=t.mobile,e.$data.arr[3].value=t.address,2==e.$data.userType||3==e.$data.userType?(e.$data.arr[4].value="",e.$data.arr[5].value=t.id_card_no):e.$data.arr[4].value=t.id_card_no,0!=e.$data.userStatus&&(1==t.type?(e.$data.ngImgTextArr[0].img=t.id_card_front,e.$data.ngImgTextArr[1].img=t.id_card_back,e.$data.bgImg[0]=t.id_card_front,e.$data.bgImg[1]=t.id_card_back):(e.$data.ngImgTextArr[3].img=t.id_card_front,e.$data.bgImg[3]=t.id_card_front))}})},onShow:function(){0==this.$data.userType||3==this.$data.userType?a.setNavigationBarTitle({title:"用户认证"}):1==this.$data.userType?a.setNavigationBarTitle({title:"认证找料员"}):2==this.$data.userType&&a.setNavigationBarTitle({title:"认证配送员"})},methods:{getVerificationCode:function(){var a=this;if(""==this.$data.arr[1].value)return i.default.successTips("请填写手机号码"),!1;s.default.regSMS({method:"POST",data:{mobile:this.$data.arr[1].value}}).then(function(t){200!=t.code&&0!=t.code||(a.$data.code_id=t.data.id,a.$data.VerificationCodeText="重新发送")}).catch(function(a){i.default.errorTips(a.msg||a.message)})},changeModalCancel:function(){this.$data.showCon=!1},onFocus:function(t){console.log(t);var e=this,s=a.getStorageSync("userType");0==s||3==s?2==t&&a.chooseLocation({success:function(a){console.log("位置名称："+a.name),console.log("详细地址："+a.address),console.log("纬度："+a.latitude),console.log("经度："+a.longitude),0==e.$data.userType||3==e.$data.userType?(e.$data.arr[2].value=a.address,e.$data.arr[3].value=a.name):(e.$data.arr[3].value=a.address,e.$data.arr[4].value=a.name)},fail:function(t){i.default.errorTips("获取地图定位失败："+t.errMsg),console.log(t),a.getSetting({success:function(a){a.authSetting["scope.userLocation"]||(e.$data.showCon=!0)}})}}):3==t&&a.chooseLocation({success:function(a){console.log("位置名称："+a.name),console.log("详细地址："+a.address),console.log("纬度："+a.latitude),console.log("经度："+a.longitude),0==e.$data.userType||3==e.$data.userType?(e.$data.arr[2].value=a.address,e.$data.arr[3].value=a.name):(e.$data.arr[3].value=a.address,e.$data.arr[4].value=a.name)},fail:function(t){i.default.errorTips("获取地图定位失败："+t.errMsg),console.log(t),a.getSetting({success:function(a){a.authSetting["scope.userLocation"]||(e.$data.showCon=!0)}})}})},navCheck:function(a){this.$data.navIndex=a,0==a?(this.$data.arr[0].name="姓名:",this.$data.arr[1].name="联系电话:",this.$data.arr[4].name="身份证号码:",this.$data.arr[0].placeholder="请输入您的姓名",this.$data.arr[1].placeholder="请输入您的联系电话",this.$data.arr[4].placeholder="请输入您的身份证号码"):(this.$data.arr[0].name="企业名称:",this.$data.arr[1].name="企业法人:",this.$data.arr[4].name="营业执照编号:",this.$data.arr[0].placeholder="请输入您的企业名称",this.$data.arr[1].placeholder="请输入您的企业法人",this.$data.arr[4].placeholder="请输入您的营业执照编号")},checkImg:function(t){var e=this;a.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(a){var r=wx.getStorageSync("access_token")||"",n={file:"[object Object]",type:"big"},o=Date.parse(new Date);n.timestamp=o,n.sign=i.default.makeSign(s.default.apiUrl+"/api/upload",n),n.deviceId="wx",n.platformType="2",n.versionCode="4.0";wx.uploadFile({url:"".concat(s.default.apiUrl,"/api/upload"),filePath:a.tempFilePaths[0],name:"file",header:{"content-type":"multipart/form-data",Accept:"application/json",Authorization:"Bearer ".concat(r)},formData:n,success:function(a){console.log("图片上传"),console.log(a);var s=JSON.parse(a.data);if(200===s.code||0===s.code){var r=JSON.parse(a.data).data;e.$data.ngImgTextArr[t].img=r,e.$data.bgImg[t]=r,i.default.successTips("图片上传成功")}else i.default.errorTips("上传错误")},fail:function(a){console.log(a)},complete:function(){}})}})},save:function(){var t=this;if(0==this.$data.navIndex){if(""==this.$data.bgImg[0]||""==this.$data.bgImg[1]){if(""==this.$data.bgImg[0])return i.default.errorTips("请上传身份证正面照"),!1;if(""==this.$data.bgImg[1])return i.default.errorTips("请上传身份证背面照"),!1}}else if(""==this.$data.bgImg[2])return i.default.errorTips("请上传营业执照"),!1;if(""==this.$data.code_id)return i.default.errorTips("请输入验证码"),!1;var e="";e=1==this.$data.userType||2==this.$data.userType?{from:1,type:this.$data.navIndex+1,consignee:this.$data.arr[0].value,mobile:this.$data.arr[1].value,address:t.$data.arr[3].value+t.$data.arr[4].value,id_card_no:this.$data.arr[5].value,id_card_back:this.$data.bgImg[1],id_card_front:this.$data.bgImg[0]}:{from:1,type:this.$data.navIndex+1,consignee:this.$data.arr[0].value,mobile:this.$data.arr[1].value,address:t.$data.arr[2].value+t.$data.arr[3].value,id_card_no:this.$data.arr[4].value,id_card_back:this.$data.bgImg[1],id_card_front:this.$data.bgImg[0]},1==t.$data.navIndex&&(e.id_card_front=this.$data.bgImg[2]),0==this.$data.userType||3==this.$data.userType?s.default.auditApply({method:"POST",data:e}).then(function(t){200==t.code||0==t.code?(i.default.successTips("提交审核成功"),setTimeout(function(){a.navigateBack({delta:1})},1e3)):i.default.errorTips(t.msg)}).catch(function(a){i.default.errorTips(a.msg||a.message)}):1==this.$data.userType?(e.code=this.$data.arr[2].value,e.id=this.$data.code_id,e.type=1,s.default.staffAudit({method:"POST",data:e}).then(function(t){200==t.code||0==t.code?(i.default.successTips("提交审核成功"),setTimeout(function(){a.navigateBack({delta:1})},1e3)):i.default.successTips(t.msg)}).catch(function(a){i.default.errorTips(a.msg||a.message)})):2==this.$data.userType&&(e.code=this.$data.arr[2].value,e.id=this.$data.code_id,e.type=2,s.default.staffAudit({method:"POST",data:e}).then(function(t){200==t.code||0==t.code?(i.default.successTips("提交审核成功"),setTimeout(function(){a.navigateBack({delta:1})},1e3)):i.default.errorTips(t.msg)}).catch(function(a){i.default.errorTips(a.msg||a.message)}))}}};t.default=n}).call(this,e("6e42")["default"])},9580:function(a,t,e){"use strict";var i=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("view",{staticClass:"wx_content"},[e("view",{staticClass:"authentication"},[0!=a.userType&&3!=a.userType||0!=a.userStatus&&3!=a.userStatus?a._e():e("view",{staticClass:"nav flex"},[a._l(a.navArr,function(t,i){return e("view",{key:i,staticClass:"flex-1",attrs:{eventid:"7fb52578-0-"+i},on:{click:function(t){a.navCheck(i)}}},[e("image",{attrs:{src:a.navIndex==i?t.activeImg:t.imgUrl}}),e("view",[a._v(a._s(t.name))])])}),e("view",{staticClass:"line"})],2),e("view",{staticClass:"input"},a._l(a.arr,function(t,i){return e("view",{key:i,staticClass:"li cf"},[e("view",{staticClass:"name fll"},[a._v(a._s(t.name))]),e("view",{staticClass:"value fll cf"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"item.value"}],attrs:{type:"text",placeholder:t.placeholder,eventid:"7fb52578-1-"+i},domProps:{value:t.value},on:{tap:function(t){t.stopPropagation(),a.onFocus(i)},input:function(a){a.target.composing||(t.value=a.target.value)}}}),1!=a.userType&&2!=a.userType||2!=i?a._e():e("view",{staticClass:"VerificationCode flr",attrs:{eventid:"7fb52578-2-"+i},on:{click:function(t){t.stopPropagation(),a.getVerificationCode(t)}}},[a._v(a._s(a.VerificationCodeText))])])])})),e("view",a._l(a.ngImgTextArr,function(t,i){return(0==a.navIndex?i<2:i>=2)?e("view",{key:i,staticClass:"image"},[e("image",{attrs:{src:t.img,eventid:"7fb52578-3-"+i},on:{click:function(t){a.checkImg(i)}}}),""==a.bgImg[i]?e("view",{staticClass:"bgszie",attrs:{eventid:"7fb52578-4-"+i},on:{click:function(t){a.checkImg(i)}}},[a._v("+")]):a._e(),e("view",{staticClass:"text"},[a._v(a._s(t.text))])]):a._e()})),0!=a.userStatus?e("view",{staticClass:"info text-red"},[a._v(a._s(a.status_label))]):a._e(),0==a.userStatus?e("view",{staticClass:"btn-warp"},[e("view",{staticClass:"btn",attrs:{eventid:"7fb52578-5"},on:{click:a.save}},[a._v("提交")])]):a._e(),3==a.userStatus?e("view",{staticClass:"btn-warp"},[e("view",{staticClass:"btn",attrs:{eventid:"7fb52578-6"},on:{click:a.save}},[a._v("重新提交")])]):a._e()]),a.showCon?e("view",{staticClass:"modal-mask",attrs:{eventid:"7fb52578-9"},on:{click:a.changeModalCancel}},[e("view",{staticClass:"modal-dialog"},[e("view",{staticClass:"modal-title"},[a._v("温馨提示")]),e("view",{staticClass:"modal-content"},[a._v("获取定位失败，请前往设置打开定位权限")]),e("view",{staticClass:"modal-footer"},[e("view",{staticClass:"btn-cancel",attrs:{eventid:"7fb52578-7"},on:{click:a.changeModalCancel}},[a._v("取消")]),e("button",{staticClass:"btn-confirm button-on-view",staticStyle:{padding:"0rpx"},attrs:{"open-type":"openSetting",eventid:"7fb52578-8"},on:{click:a.changeModalCancel}},[a._v("设置")])],1)])]):a._e()])},s=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return s})},fefa:function(a,t,e){"use strict";e.r(t);var i=e("9580"),s=e("4413");for(var r in s)"default"!==r&&function(a){e.d(t,a,function(){return s[a]})}(r);e("4e41");var n=e("2877"),o=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,"1b290f3a",null);t["default"]=o.exports}},[["6f64","common/runtime","common/vendor"]]]);