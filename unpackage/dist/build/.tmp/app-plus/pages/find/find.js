(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/find/find"],{"0612":function(t,e,a){"use strict";a("a3d9");var s=d(a("b0ce")),i=d(a("61f8"));function d(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},"1e05":function(t,e,a){"use strict";a.r(e);var s=a("26b6"),i=a.n(s);for(var d in s)"default"!==d&&function(t){a.d(e,t,function(){return s[t]})}(d);e["default"]=i.a},"26b6":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(a("e378")),i=n(a("0089")),d=n(a("8dde"));function n(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{cid:"",cname:"",isCheckTime:!1,areaText:"请选择服务区域",area_id:"",interval:"",isPopup:!1,findDisabled:!1,payNum:10,imgFiles:[],upLoadMaxNum:9,checkIndex:0,isResNotes:!1,isNotes:!1,findNeedKnow:"",navTexts:["按图找料","上门取样","寄送样品"],companyaddress:"",address:"",finds:[{cid:"",desc:"",address:"",checkIndex:0,desc_img:[],files:[],areaText:"请选择服务区域",area_id:"",is_compare:!1,is_limit:!1,reference_price:""}],taskEditItem:"",isTaskEditItem:!1}},components:{upload:d.default},onLoad:function(e){if(""==this.$data.taskEditItem&&""==t.getStorageSync("isFindNotes")&&(this.$data.isNotes=!0),e.taskEditItem){this.$data.isNotes=!1,t.setNavigationBarTitle({title:"修改任务"}),this.$data.taskEditItem=t.getStorageSync("findItem");var a=this.$data.taskEditItem;if(this.$data.finds[0].id=a.id,this.$data.finds[0].cid=a.cid,this.$data.finds[0].cname=a.cname,this.$data.finds[0].check=a.check,this.$data.finds[0].find_type=a.find_type,this.$data.finds[0].checkIndex=a.find_type-1,this.$data.finds[0].desc=a.desc,this.$data.finds[0].address_id=a.address_id,this.$data.finds[0].address=a.address,this.$data.finds[0].area_id=a.area_id,this.$data.finds[0].is_compare=a.is_compare,this.$data.finds[0].is_limit=a.is_limit,this.$data.finds[0].reference_price=a.reference_price,a.desc_img.length>0){var s=[];a.desc_img.forEach(function(t,e){var a={url:t,pct:"finish"};s.push(a)}),this.$data.finds[0].files=s}}else t.setNavigationBarTitle({title:"立即找料"});this.getCompanyaddress(),this.getSelectedAddress()},onShow:function(){var t=this;this.getNeedKnow(),this.initArea(),this.$eventHub.$on("classifyData",function(e){console.log("classifyData:",e),t.$data.isNotes=!1,t.$data.cid=e.cid,t.$data.cname=e.cname,t.$data.finds[e.index].cid=e.cid,t.$data.finds[e.index].cname=e.cname,t.$eventHub.$off("classifyData")}),this.$eventHub.$on("findPage",function(e){console.log("findPage:",e),t.$data.finds[e.findIndex].address=e.address,t.$eventHub.$off("findPage")})},methods:{doCompare:function(t){t||s.default.errorTips("请先勾选比价优选按钮")},checkCompare:function(t){this.$data.finds[t].is_compare=0==this.$data.finds[t].is_compare?1:0,0==this.$data.finds[t].is_compare&&(this.$data.finds[t].reference_price="")},checkLimit:function(t){this.$data.finds[t].is_limit=0==this.$data.finds[t].is_limit?1:0,0!=this.$data.finds[t].is_limit&&(this.$data.finds[t].checkIndex=0)},initArea:function(){var t=this;i.default.findArea({}).then(function(e){200!=e.code&&0!=e.code||(""==t.$data.taskEditItem?(t.$data.areaText=e.data[0].name,t.$data.area_id=e.data[0].id,t.$data.finds[0].areaText=e.data[0].name,t.$data.finds[0].area_id=e.data[0].id):(t.$data.area_id=t.$data.finds[0].area_id,e.data.forEach(function(a,s){a.id==t.$data.finds[0].area_id&&(t.$data.finds[0].areaText=e.data[s].name)})))})},goAreaText:function(e){var a=this;i.default.findArea({}).then(function(i){if(200==i.code||0==i.code){var d=i.data,n=[];d.forEach(function(t,e){n.push(t.name)}),t.showActionSheet({itemList:n,success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮"),a.$data.finds[e].area_id=d[t.tapIndex].id,a.$data.finds[e].areaText=d[t.tapIndex].name,s.default.successTips("区域选择成功")},fail:function(t){console.log(t.errMsg),s.default.successTips("区域选择失败")}})}})},goConsigneeAddress:function(t){wx.navigateTo({url:"../address/address?from=findPage&findIndex="+t})},submit:function(){for(var e=this,a=this,d=this.$data.finds,n=0;n<d.length;n++){if(""==d[n].cid)return s.default.errorTips("第"+(n+1)+"个任务,请填写物料类型"),!1;if(""==d[n].desc)return s.default.errorTips("第"+(n+1)+"个任务,请填写描述"),!1;if(1==d[n].is_compare&&""==d[n].reference_price)return s.default.errorTips("第"+(n+1)+"个任务,请填写参考价格"),!1;if(0==d[n].checkIndex){if(!(d[n].files.length>0))return s.default.errorTips("第"+(n+1)+"个任务，至少上传一张图片"),!1;var c=function(){var t=d[n].files.every(function(t,e){return t.pct&&"finish"===t.pct});if(!t)return s.default.errorTips("图片正在上传"),{v:!1};var e=[];d[n].files.forEach(function(t,a){e.push(t.url)}),d[n].desc_img=e}();if("object"===typeof c)return c.v}else if(1==d[n].checkIndex){if(""==d[n].address)return s.default.errorTips("第"+(n+1)+"个任务，请添加地址"),!1;d[n].desc_img=[],d[n].address_id=d[n].address.id}else 2==d[n].checkIndex&&(d[n].desc_img=[]);d[n].find_type=d[n].checkIndex+1,d[n].type=1,d[n].is_limit=d[n].is_limit?1:0,d[n].is_compare=d[n].is_compare?1:0}var o={task:d};if(this.$data.findDisabled=!0,""!=this.$data.taskEditItem){d[0].fetch_num=1,d[0].id=this.$data.taskEditItem.id;var r=d[0];i.default.updateTaskInit({method:"POST",data:r}).then(function(a){if(200==a.code||0==a.code){var i={task:d};e.$eventHub.$emit("editData",i),t.navigateBack({delta:1})}else s.default.errorTips(a.msg)}).catch(function(t){s.default.errorTips(t.msg)})}else i.default.joinTask({method:"POST",data:o}).then(function(t){setTimeout(function(){e.$data.findDisabled=!1},500),200==t.code||0==t.code?(console.log("joinTask-finds:",e.$data.finds),e.$data.isPopup=!0,a.$data.interval=setInterval(function(){console.log(a.$data.payNum),a.$data.payNum--,0==a.$data.payNum&&(a.$data.isPopup=!1,clearInterval(a.$data.interval),a.goPay(),a.$data.payNum=10)},1e3)):e.$data.findDisabled=!0}).catch(function(t){t.msg?s.default.errorTips(t.msg):s.default.errorTips(t),e.$data.findDisabled=!1})},imageUpload:function(t){this.$data.finds[t.itemIndex].files=t.files},closed:function(t){var e=this;wx.showModal({title:"提示",content:"确认删除吗？",confirmText:"确认",success:function(a){a.confirm?e.$data.finds.splice(t,1):a.cancel&&s.default.errorTips("您点击了取消")}})},addFind:function(){var t={cid:this.$data.cid,cname:this.$data.cname,desc:"",address:this.$data.address,checkIndex:this.$data.checkIndex,desc_img:[],files:[],areaText:this.$data.areaText,area_id:this.$data.area_id,is_compare:!1,is_limit:!1,reference_price:""};this.$data.finds.push(t),console.log("finds:",this.$data.finds)},getSelectedAddress:function(){var t=this;i.default.defaultAddress({}).then(function(e){200==e.code||0==e.code?(t.$data.address=e.data,t.$data.finds[0].address=e.data):2==e.code&&(t.$data.finds[0].address="")})},getCompanyaddress:function(){var t=this;i.default.getCompanyaddress({}).then(function(e){200!=e.code&&0!=e.code||(t.$data.companyaddress=e.data)})},checkNav:function(t,e){if(1==this.$data.finds[e].is_limit)return s.default.errorTips("不支持限时找料"),!1;this.$data.checkIndex=t,this.$data.finds[e].find_type=t+1,this.$data.finds[e].checkIndex=t},hiddenNotes:function(){this.$data.isNotes=!1},getNeedKnow:function(){var t=this;i.default.needKnow({}).then(function(e){0!=e.code&&200!=e.code||(t.$data.findNeedKnow=e.data.find_need_know)})},checkIsResNotes:function(){this.$data.isResNotes=!this.$data.isResNotes,this.$data.isResNotes?t.setStorageSync("isFindNotes",!0):t.removeStorageSync("isFindNotes")},showNotes:function(){this.$data.isNotes=!0},goClassify:function(e){t.navigateTo({url:"../classify/classify?from=1&index="+e})},goPay:function(){var e=this;this.$data.payNum=10,clearInterval(this.$data.interval),t.reLaunch({url:"../index/index",success:function(){e.$store.commit("change_page",1)}})},goBack:function(){this.$data.payNum=10,clearInterval(this.$data.interval),this.$data.isPopup=!1}}};e.default=c}).call(this,a("6e42")["default"])},"61f8":function(t,e,a){"use strict";a.r(e);var s=a("6a98"),i=a("1e05");for(var d in i)"default"!==d&&function(t){a.d(e,t,function(){return i[t]})}(d);a("af0b");var n=a("2877"),c=Object(n["a"])(i["default"],s["a"],s["b"],!1,null,"149a3c38",null);e["default"]=c.exports},"6a98":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"find"},[a("view",{staticClass:"items"},t._l(t.finds,function(e,s){return a("view",{key:s,staticClass:"item"},[a("view",{staticClass:"th"},[a("view",{staticClass:"mgl-20",attrs:{eventid:"2ccc1657-0-"+s},on:{click:function(e){t.goClassify(s)}}},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("物料类型:"),""!=e.cid?a("text",{staticClass:" mgl-20 cname fs30"},[t._v(t._s(e.cname))]):t._e(),""==e.cid?a("text",{staticClass:"text-999 mgl-20 cname"},[t._v("请选择物料类型")]):t._e(),a("text",{staticClass:"mgl-20 iconfont icon-jiantou"})]),t.finds.length>1?a("view",{staticClass:"close_btn",attrs:{eventid:"2ccc1657-1-"+s},on:{click:function(e){t.closed(s)}}},[a("image",{attrs:{src:"../../static/icon/close_btn.png"}})]):t._e()]),a("view",{staticClass:"td"},[a("view",{staticClass:"mgl-20"},[a("text",{staticClass:"text-theme"},[t._v("*")]),a("text",{staticClass:"word-spacing"},[t._v("描 述 :")]),t.isNotes?t._e():a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.desc,expression:"item.desc"}],staticClass:"flex-1 find-desc",attrs:{placeholder:"(注：请详细描述物料的名称、用途、材质、交货时间)",eventid:"2ccc1657-2-"+s},domProps:{value:e.desc},on:{input:function(t){t.target.composing||(e.desc=t.target.value)}}})])]),a("view",{staticClass:"th area"},[a("view",{staticClass:"mgl-20",attrs:{eventid:"2ccc1657-3-"+s},on:{click:function(e){t.goAreaText(s)}}},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("服务区域:"),a("text",{staticClass:"text-999 mgl-20 fs24 area-text"},[t._v(t._s(e.areaText))]),a("text",{staticClass:"triangle-down"})])]),a("view",{staticClass:"th"},[a("view",{staticClass:"mgl-20",attrs:{eventid:"2ccc1657-4-"+s},on:{click:function(e){t.checkLimit(s)}}},[t._v("限时找料:"),1==e.is_limit?a("text",{staticClass:"iconfont icon-dui fs40 text-yellow mgl-20 mgr-20"}):t._e(),0==e.is_limit?a("text",{staticClass:"iconfont icon-dui fs40 text-eb mgl-20 mgr-20"}):t._e(),a("text",[t._v("限时三小时")])])]),a("view",{staticClass:"th"},[a("view",{staticClass:"mgl-20 choosePrice"},[a("view",[a("text",{attrs:{eventid:"2ccc1657-5-"+s},on:{click:function(e){t.checkCompare(s)}}},[1==e.is_compare?a("text",{staticClass:"iconfont icon-dui fs40 text-yellow mgr-20"}):t._e(),0==e.is_compare?a("text",{staticClass:"iconfont icon-dui fs40 text-eb mgr-20"}):t._e(),t._v("比价优选")]),a("text",{staticClass:"mgl-30 fs30 reference_price"},[t._v("参考价格:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.reference_price,expression:"item.reference_price"}],staticClass:"flr mgr-20",attrs:{type:"number",disabled:!e.is_compare,placeholder:"请输入参考价格",eventid:"2ccc1657-6-"+s},domProps:{value:e.reference_price},on:{click:function(a){t.doCompare(e.is_compare)},input:function(t){t.target.composing||(e.reference_price=t.target.value)}}})])])]),a("view",{staticClass:"nav flex"},t._l(t.navTexts,function(i,d){return a("view",{key:d,staticClass:"flex-1",attrs:{eventid:"2ccc1657-7-"+s+"-"+d},on:{click:function(e){t.checkNav(d,s)}}},[e.checkIndex==d?a("text",{staticClass:"iconfont icon-dui fs40 text-yellow"}):t._e(),e.checkIndex!=d?a("text",{staticClass:"iconfont icon-dui fs40 text-eb"}):t._e(),a("text",{staticClass:"mgl-20"},[t._v(t._s(i))])])})),0==e.checkIndex?a("view",{staticClass:"upload"},[a("upload",{attrs:{itemIndex:s,upLoadMaxNum:t.upLoadMaxNum,files:e.files,eventid:"2ccc1657-8-"+s,mpcomid:"2ccc1657-0-"+s},on:{imageUpload:t.imageUpload}})],1):t._e(),1==e.checkIndex?a("view",[a("view",{staticClass:"fs30 bottom-border address-q"},[t._m(0,!0),a("view",{staticClass:" cell-padding address flex flex-start"},[a("text",{staticClass:"iconfont icon-jiantou address-icon"}),""!=e.address?a("view",{staticClass:"flex-1 address-info address-q-i fs24",attrs:{eventid:"2ccc1657-9-"+s},on:{click:function(e){t.goConsigneeAddress(s)}}},[a("view",[a("text",[t._v("收货人 "+t._s(e.address.mobile||""))]),e.address&&""!=e.address.remark?a("text",{staticClass:"remark"},[t._v(t._s(e.address.remark||""))]):t._e()]),a("view",{staticClass:"text-999"},[t._v(t._s(e.address.address||"")+" "+t._s(e.address.name||"")+" "+t._s(e.address.room||""))]),a("view",[a("text",{staticClass:"text-999"},[t._v(t._s(e.address.stall||""))])])]):t._e(),""==e.address?a("view",{staticClass:"no-address text-666 h100 lh100 flex-1",attrs:{eventid:"2ccc1657-10-"+s},on:{click:function(e){t.goConsigneeAddress(s)}}},[t._v("点击添加收货地址")]):t._e()])])]):t._e(),2==e.checkIndex?a("view",{staticClass:"address-j"},[a("view",{staticClass:"flex-1 address-info fs24 cell-padding"},t._l(t.companyaddress,function(e,s){return a("view",{key:s,staticClass:"bb1 item-3"},[t._m(1,!0),a("view",[a("view",[t._v("收货人 "+t._s(e.mobile||"")),e.tag?a("text",{staticClass:"remark"},[t._v(t._s(e.tag||""))]):t._e()])]),a("view",{staticClass:"text-999"},[a("text",[t._v(t._s(e.address))])]),a("view",{staticClass:"text-999"},[t._v(t._s(e.desc))])])}))]):t._e()])})),""==t.taskEditItem?a("view",{staticClass:"add-find",attrs:{eventid:"2ccc1657-11"},on:{click:t.addFind}},[a("image",{attrs:{src:"../../static/icon/add-find.png"}}),a("text",{staticStyle:{"font-size":"20rpx",color:"#999"}},[t._v("点击添加找料")])]):t._e(),a("view",{staticClass:"cell-padding submit-form"},[a("button",{staticClass:"btn-shadow",attrs:{disabled:t.findDisabled,eventid:"2ccc1657-12"},on:{click:t.submit}},[t._v(t._s(""!=t.taskEditItem?"完成":"加入小鹿任务"))])],1),a("view",{staticClass:"xuzhi",attrs:{eventid:"2ccc1657-13"},on:{click:t.showNotes}},[a("image",{attrs:{src:"../../static/icon/xuzhi.png"}}),a("text",[t._v("《小鹿找料须知》")])]),a("view",{staticStyle:{height:"50rpx"}}),t.isPopup?a("view",{staticClass:"index-popup"},[a("view",{staticClass:"index-popup-bg",attrs:{eventid:"2ccc1657-14"},on:{click:t.goBack}}),a("view",{staticClass:"index-popup-content"},[a("view",{staticClass:"index-popup-title"},[t._v("加入小鹿任务成功！")]),a("view",{staticClass:"index-popup-btn"},[a("view",{staticClass:"go-pay btn-shadow bg-yellow",attrs:{eventid:"2ccc1657-15"},on:{click:t.goPay}},[t._v("去结算("+t._s(t.payNum)+"s)")]),a("view",{staticClass:"btn-shadow text-yellow",attrs:{eventid:"2ccc1657-16"},on:{click:t.goBack}},[t._v("继续找料")])])])]):t._e(),t.isNotes?a("view",{staticClass:"index-popup notes-popup"},[a("view",{staticClass:"index-popup-bg",attrs:{eventid:"2ccc1657-17"},on:{click:t.hiddenNotes}}),a("view",{staticClass:"index-popup-content notes-btn-content"},[a("view",{staticClass:"index-popup-title"},[t._v("小鹿找料须知"),a("text",{staticClass:"iconfont icon-del1",attrs:{eventid:"2ccc1657-18"},on:{click:t.hiddenNotes}})]),a("rich-text",{attrs:{nodes:t.findNeedKnow,mpcomid:"2ccc1657-1"}}),a("view",{staticClass:"mgt-10",staticStyle:{"padding-left":"200rpx"},attrs:{eventid:"2ccc1657-19"},on:{click:t.checkIsResNotes}},[t.isResNotes?a("text",{staticClass:"iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"}):t._e(),t.isResNotes?t._e():a("text",{staticClass:"iconfont icon-yuan icon-yuan-1 fs40 pdl-10 text-eb"}),a("text",{staticStyle:{color:"999","padding-left":"20rpx"}},[t._v("已阅读，下次不再显示")])]),a("view",{staticClass:"index-popup-btn notes-btn"},[a("view",{staticClass:"text-red btn-shadow",attrs:{eventid:"2ccc1657-20"},on:{click:t.hiddenNotes}},[t._v("确定")])])],1)]):t._e()])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"cell-padding fs30 mgt-30"},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("取样地址")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"fs30 cf"},[t._v("寄样地址"),a("text",{staticClass:"flr text-red fs20"},[t._v("寄样不支持到付,请客户自行承担寄样费用")])])}];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},af0b:function(t,e,a){"use strict";var s=a("faef"),i=a.n(s);i.a},faef:function(t,e,a){}},[["0612","common/runtime","common/vendor"]]]);