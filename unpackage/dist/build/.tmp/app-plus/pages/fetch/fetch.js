(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/fetch/fetch"],{"00c7":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=c(a("e378")),i=c(a("0089")),d=c(a("8dde"));function c(t){return t&&t.__esModule?t:{default:t}}var n={data:function(){return{cid:"",cname:"",files:[],isResNotes:!1,isNotes:!1,isSelect:!1,checkTypes:"",checkType:"",checkTypes_cid:"",findNum:1,describeValue:"",desc:"",fecthPrice:0,isPopup:!1,payNum:10,address:"",deliveryNeedKnow:"",isFetchNotes:!1,totalFecthPrice:"",interval:"",taskEditItem:"",fetchs:[{address:"",cname:"",cid:"",desc:"",desc_img:[],address_id:"",is_limit:0,area_id:"",areaText:"",files:[],is_compare:0}]}},components:{upload:d.default},onLoad:function(e){var a=this;if(""==this.$data.taskEditItem&&""==t.getStorageSync("isFetchNotes")&&(this.$data.isNotes=!0),e.taskEditItem){this.$data.isNotes=!1,t.setNavigationBarTitle({title:"修改任务"}),this.$data.taskEditItem=t.getStorageSync("fetchItem");var s=this.$data.taskEditItem;if(this.$data.fetchs[0].cid=s.cid,this.$data.fetchs[0].cname=s.cname,this.$data.fetchs[0].desc=s.desc,this.$data.fetchs[0].address_id=s.address_id,this.$data.fetchs[0].address=s.address,this.$data.fetchs[0].area_id=s.area_id,this.$data.fetchs[0].areaText=s.areaText,this.$data.fetchs[0].is_compare=s.is_compare,this.$data.fetchs[0].is_limit=s.is_limit,s.desc_img.length>0){var d=[];s.desc_img.forEach(function(t,e){var a={url:t,pct:"finish"};d.push(a)}),this.$data.fetchs[0].files=d}}else t.setNavigationBarTitle({title:"立即取送"});i.default.needKnow({}).then(function(t){200!=t.code&&0!=t.code||(a.$data.deliveryNeedKnow=t.data.delivery_need_know)}),this.getTaskFee(),this.getDefaultAddress(),this.initArea()},onShow:function(){var t=this;this.$eventHub.$on("classifyData",function(e){t.$data.isNotes=!1,t.$data.cid=e.cid,t.$data.cname=e.cname,t.$data.fetchs[e.index].cid=e.cid,t.$data.fetchs[e.index].cname=e.cname,t.$eventHub.$off("classifyData")}),this.$eventHub.$on("fetchPage",function(e){console.log("fetchPage:",e),t.$data.fetchs[e.findIndex].address=e.address,t.$data.address=e.address,t.$eventHub.$off("fetchPage")})},methods:{checkLimit:function(t){this.$data.fetchs[t].is_limit=0==this.$data.fetchs[t].is_limit?1:0},initArea:function(){var t=this;i.default.findArea({}).then(function(e){200!=e.code&&0!=e.code||(t.$data.areaText=e.data[0].name,t.$data.area_id=e.data[0].id,t.$data.fetchs[0].areaText=e.data[0].name,t.$data.fetchs[0].area_id=e.data[0].id,""==t.$data.taskEditItem?(t.$data.areaText=e.data[0].name,t.$data.area_id=e.data[0].id,t.$data.fetchs[0].areaText=e.data[0].name,t.$data.fetchs[0].area_id=e.data[0].id):(t.$data.areaText=t.$data.fetchs[0].name,t.$data.area_id=t.$data.fetchs[0].id,e.data.forEach(function(a,s){a.id==t.$data.fetchs[0].area_id&&(t.$data.fetchs[0].areaText=e.data[s].name)})))})},goAreaText:function(e){var a=this;i.default.findArea({}).then(function(i){if(200==i.code||0==i.code){var d=i.data,c=[];d.forEach(function(t,e){c.push(t.name)}),t.showActionSheet({itemList:c,success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮"),a.$data.fetchs[e].area_id=d[t.tapIndex].id,a.$data.fetchs[e].areaText=d[t.tapIndex].name,s.default.successTips("区域选择成功")},fail:function(t){console.log(t.errMsg)}})}})},closed:function(e){var a=this;t.showModal({title:"提示",content:"确认删除吗？",confirmText:"确认",success:function(t){t.confirm?a.$data.fetchs.splice(e,1):t.cancel&&s.default.errorTips("您点击了取消")}})},addFind:function(){var t={address:this.$data.address,cname:this.$data.cname,cid:this.$data.cid,desc:"",desc_img:[],address_id:"",is_limit:0,area_id:this.$data.area_id,areaText:this.$data.areaText,files:[],is_compare:0};this.$data.fetchs.push(t)},imageUpload:function(t){this.$data.files=t.files},goClassify:function(e){t.navigateTo({url:"../classify/classify?from=2&index="+e})},checkIsResNotes:function(){this.$data.isResNotes=!this.$data.isResNotes,this.$data.isResNotes?t.setStorageSync("isFetchNotes",!0):t.removeStorageSync("isFetchNotes")},getTaskFee:function(){var e=this;i.default.getTaskFee({}).then(function(a){200==a.code||0==a.code?(e.$data.fecthPrice=a.data.fetch_price,e.$data.totalFecthPrice=s.default.formatMoney(a.data.fetch_price),t.setStorageSync("fecthPrice",a.data.fetch_price)):s.default.errorTips("获取单价失败")})},showNotes:function(){this.$data.isNotes=!0},hiddenNotes:function(){this.$data.isNotes=!1},sub:function(){if(this.$data.findNum<=1)return s.default.errorTips("最少1个取料单"),!1;this.$data.findNum--,this.$data.totalFecthPrice=s.default.formatMoney(this.$data.fecthPrice*this.$data.findNum)},plu:function(){if(this.$data.findNum>=10)return s.default.errorTips("最多10个取料单"),!1;this.$data.findNum++,this.$data.totalFecthPrice=s.default.formatMoney(this.$data.fecthPrice*this.$data.findNum)},changeNumber:function(t){this.$data.findNum=t.detail.value,this.$data.totalFecthPrice=s.default.formatMoney(this.$data.fecthPrice*this.$data.findNum)},getDefaultAddress:function(){var t=this;i.default.defaultAddress({}).then(function(e){0!=e.code&&200!=e.code||(t.$data.fetchs[0].address=e.data,t.$data.fetchs[0].address_id=e.data.id,t.$data.address=e.data)})},goConsigneeAddress:function(e){t.navigateTo({url:"../address/address?from=fetchPage&findIndex="+e})},goPay:function(){var e=this;this.$data.payNum=10,clearInterval(this.$data.interval),t.reLaunch({url:"../index/index",success:function(){e.$store.commit("change_page",1)}})},goBack:function(){this.$data.payNum=10,clearInterval(this.$data.interval),this.$data.isPopup=!1},fethchSubmit:function(e){for(var a=this,d=this,c=this.$data.fetchs,n=function(t){var e=[],a=c[t].files.every(function(t,e){return t.pct&&"finish"===t.pct});return a?(c[t].files.forEach(function(t,a){t.url&&e.push(t.url)}),c[t].desc_img=e,""==c[t].cname?(s.default.errorTips("第"+(t+1)+"个任务,请填写物料品类"),{v:!1}):""==c[t].desc?(s.default.errorTips("第"+(t+1)+"个任务,请填写描述"),{v:!1}):""==c[t].address?(s.default.errorTips("第"+(t+1)+"个任务,请添加地址"),{v:!1}):(c[t].type=2,void(c[t].address_id=c[t].address.id))):(s.default.errorTips("第"+(t+1)+"个任务,图片正在上传"),{v:!1})},o=0;o<c.length;o++){var r=n(o);if("object"===typeof r)return r.v}var l={task:c};""!=this.$data.taskEditItem?(l.task[0].id=this.$data.taskEditItem.id,i.default.updateTaskInit({method:"POST",data:l.task[0]}).then(function(e){200==e.code||0==e.code?(a.$eventHub.$emit("editData",l),t.navigateBack({delta:1})):s.default.errorTips(e.msg)}).catch(function(t){s.default.errorTips(t.msg)})):i.default.joinTask({method:"POST",data:l}).then(function(t){console.log(t),200==t.code||0==t.code?(a.$data.isPopup=!0,d.$data.interval=setInterval(function(){d.$data.payNum--,0==d.$data.payNum&&(d.$data.isPopup=!1,clearInterval(d.$data.interval),d.goPay(),d.$data.payNum=10)},1e3)):s.default.errorTips(t.msg)}).catch(function(t){s.default.errorTips(t.msg)})}}};e.default=n}).call(this,a("6e42")["default"])},"03a3":function(t,e,a){"use strict";a.r(e);var s=a("00c7"),i=a.n(s);for(var d in s)"default"!==d&&function(t){a.d(e,t,function(){return s[t]})}(d);e["default"]=i.a},"4c55":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"material"},[t._l(t.fetchs,function(e,s){return a("view",{key:s,staticClass:"box-shadow"},[a("view",{staticClass:"th fs30"},[a("view",{staticClass:"mgl-20",attrs:{eventid:"5823d1a6-0-"+s},on:{click:function(e){t.goClassify(s)}}},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("物料类型:"),""!=e.cid?a("text",{staticClass:" mgl-20 cname fs30"},[t._v(t._s(e.cname))]):t._e(),""==e.cid?a("text",{staticClass:"text-999 mgl-20 cname"},[t._v("请选择物料类型")]):t._e(),a("text",{staticClass:"mgl-20 iconfont icon-jiantou"})]),t.fetchs.length>1?a("view",{staticClass:"close_btn",attrs:{eventid:"5823d1a6-1-"+s},on:{click:function(e){t.closed(s)}}},[a("image",{attrs:{src:"../../static/icon/close_btn.png"}})]):t._e()]),a("view",{staticClass:"lh90 fs30 pdl-20 bb-1 area"},[a("view",{staticClass:"cf",attrs:{eventid:"5823d1a6-2-"+s},on:{click:function(e){t.goAreaText(s)}}},[t._m(0,!0),a("view",{staticClass:"text-999 mgl-20 fs24 area-text flr"},[t._v(t._s(e.areaText))]),a("text",{staticClass:"triangle-down"})])]),a("view",{staticClass:"pd-30 align-start fs30 cf field-warp"},[t._m(1,!0),t.isPopup||t.isNotes?t._e():a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.desc,expression:"item.desc"}],staticClass:"height-200 field-desc",attrs:{placeholder:"(注：请详细描述物料的名称、用途、材质、交货时间)",eventid:"5823d1a6-3-"+s},domProps:{value:e.desc},on:{input:function(t){t.target.composing||(e.desc=t.target.value)}}})]),t._m(2,!0),a("view",{staticClass:"upload"},[a("upload",{attrs:{itemIndex:s,upLoadMaxNum:t.upLoadMaxNum,files:e.files,eventid:"5823d1a6-4-"+s,mpcomid:"5823d1a6-0-"+s},on:{imageUpload:t.imageUpload}})],1),a("view",{staticClass:"fs30"},[t._m(3,!0),a("view",{staticClass:"address flex flex-start pdt-30 pdb-30 pdl-20 pdr-20"},[a("view",{staticClass:"iconfont icon-jiantou address-icon flr pdr-30"}),e.address?a("view",{staticClass:"flex-1 address-info fs24",attrs:{eventid:"5823d1a6-5-"+s},on:{click:function(e){t.goConsigneeAddress(s)}}},[a("view",{staticClass:"person",staticStyle:{"word-break":"break-all"}},[a("text",[t._v(t._s(e.address.consignee)+"  "+t._s(e.address.mobile||""))]),e.address&&""!=e.address.remark?a("text",{staticClass:"remark"},[t._v(t._s(e.address.remark||""))]):t._e()]),a("view",{staticStyle:{"word-break":"break-all"}},[a("text",{staticClass:"text-999"},[t._v(t._s(e.address.stall||""))])]),a("view",[a("view",{staticClass:"text-999"},[t._v(t._s(e.address.city_str||"")+" "+t._s(e.address.address||"")+" "+t._s(e.address.room||""))])])]):t._e(),""==e.address?a("view",{staticClass:"text-666 h100 lh100 flex-1",attrs:{eventid:"5823d1a6-6-"+s},on:{click:function(e){t.goConsigneeAddress(s)}}},[t._v("点击添加取样地址")]):t._e()])])])}),""==t.taskEditItem?a("view",{staticClass:"add-find",attrs:{eventid:"5823d1a6-7"},on:{click:t.addFind}},[a("image",{attrs:{src:"../../static/icon/add-find.png"}}),a("text",{staticStyle:{"font-size":"20rpx",color:"#999"}},[t._v("点击添加找料")])]):t._e(),a("button",{staticClass:"join-find lh90 fs30 mgb-30",attrs:{eventid:"5823d1a6-8"},on:{click:t.fethchSubmit}},[t._v(t._s(""!=t.taskEditItem?"完成":"加入小鹿任务"))]),a("view",{staticClass:"xuzhi",attrs:{eventid:"5823d1a6-9"},on:{click:t.showNotes}},[a("image",{attrs:{src:"../../static/icon/xuzhi.png"}}),a("text",{staticClass:"fs24 text-999"},[t._v("《小鹿取送须知》")])]),a("view",{staticStyle:{height:"50rpx"}})],2),t.isPopup?a("view",{staticClass:"index-popup"},[a("view",{staticClass:"index-popup-bg",attrs:{eventid:"5823d1a6-10"},on:{click:t.closePopup}}),a("view",{staticClass:"index-popup-content"},[a("view",{staticClass:"index-popup-title"},[t._v("加入小鹿任务成功！")]),a("view",{staticClass:"index-popup-btn"},[a("view",{staticClass:"go-pay",attrs:{eventid:"5823d1a6-11"},on:{click:t.goPay}},[t._v("去结算("+t._s(t.payNum)+"s)")]),a("view",{staticStyle:{color:"#F29800"},attrs:{eventid:"5823d1a6-12"},on:{click:t.goBack}},[t._v("继续取送")])])])]):t._e(),t.isNotes&&""!=t.findNeedKnow?a("view",{staticClass:"index-popup notes-popup"},[a("view",{staticClass:"index-popup-bg",attrs:{eventid:"5823d1a6-13"},on:{click:t.hiddenNotes}}),a("view",{staticClass:"index-popup-content notes-btn-content"},[a("view",{staticClass:"index-popup-title"},[t._v("小鹿取送须知"),a("text",{staticClass:"iconfont icon-del1",attrs:{eventid:"5823d1a6-14"},on:{click:t.hiddenNotes}})]),a("view",{staticClass:"rich-text"},[a("rich-text",{attrs:{nodes:t.deliveryNeedKnow,mpcomid:"5823d1a6-1"}})],1),a("view",{staticClass:"mgt-30 checkIsResNotes",attrs:{eventid:"5823d1a6-15"},on:{click:t.checkIsResNotes}},[t.isResNotes?a("text",{staticClass:"iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"}):t._e(),t.isResNotes?t._e():a("text",{staticClass:"iconfont icon-yuan icon-yuan-1 fs40 pdl-10 text-eb"}),a("text",{staticStyle:{color:"999","padding-left":"20rpx"}},[t._v("已阅读，下次不再显示")])]),a("view",{staticClass:"index-popup-btn notes-btn"},[a("view",{staticClass:"text-red btn-shadow",attrs:{eventid:"5823d1a6-16"},on:{click:t.hiddenNotes}},[t._v("确定")])])])]):t._e()])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("text",{staticClass:"area"},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("服务区域:")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"word-spacing field-txt"},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("描 述 ：")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"flex-start form-add-img fs30 pdl-20 cf'"},[a("view",{staticClass:"tl"},[a("text",{staticStyle:{opacity:"0"}},[t._v("*")]),t._v("上传图片:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"cell-padding fs30 lh90 mgt-20"},[a("text",{staticClass:"text-theme"},[t._v("*")]),t._v("取样地址")])}];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},ac40:function(t,e,a){},c679:function(t,e,a){"use strict";a.r(e);var s=a("4c55"),i=a("03a3");for(var d in i)"default"!==d&&function(t){a.d(e,t,function(){return i[t]})}(d);a("f0f8");var c=a("2877"),n=Object(c["a"])(i["default"],s["a"],s["b"],!1,null,"69e06b72",null);e["default"]=n.exports},f0f8:function(t,e,a){"use strict";var s=a("ac40"),i=a.n(s);i.a},f8c4:function(t,e,a){"use strict";a("a3d9");var s=d(a("b0ce")),i=d(a("c679"));function d(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))}},[["f8c4","common/runtime","common/vendor"]]]);