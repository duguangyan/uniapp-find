(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/findPages/findOrderDetail/findOrderDetail"],{"0df9":function(t,e,a){"use strict";a("a3d9");var s=l(a("b0ce")),i=l(a("6efb"));function l(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},"3bbb":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(a("0089")),i=n(a("e378")),l=n(a("8dde")),r=n(a("483a")),c=n(a("10c9")),d=n(a("3db4"));function n(t){return t&&t.__esModule?t:{default:t}}var u={components:{upload:l.default,uniNumberBox:r.default,xflSelect:c.default,dialog:d.default},data:function(){return{totalCost:0,result_num:0,result_big_num:0,orderItem:"",index:1,upLoadMaxNum:9,files:[],id:"",detailData:"",result_desc:"",big_price:0,result_price:0,supplier:"",list:[],supplier_id:"",isCheckSupplier:!1,formShow:!1,remark:"",shipping_extra_price:0}},onLoad:function(e){this.$data.id=e.id,1==e.index?t.setNavigationBarTitle({title:"找料订单详情"}):t.setNavigationBarTitle({title:"取送订单详情"}),this.getOrderDetail(e.id),this.getTaskFee()},onShow:function(){},methods:{goChat:function(e){t.navigateTo({url:"/pages/chat/chat?id="+e.user_id+"&fmUserName=客户"})},receiptOrder:function(e){var a=this;t.showModal({title:"提示",content:"确定接单?",success:function(l){l.confirm?(console.log("用户点击确定"),s.default.staffFindGet({method:"POST",data:{id:e}}).then(function(e){200!=e.code&&0!=e.code||(a.$data.status=2,i.default.successTips("接单成功"),t.navigateBack({delta:1}))})):l.cancel&&console.log("用户点击取消")}})},showForm:function(){this.$data.formShow=!0},unFormSubmit:function(){var e=this;if(""==this.$data.remark)return i.default.errorTips("请填写未找到料的原因"),!1;var a={id:this.$data.id,remark:this.$data.remark};s.default.staffFindUnfound({method:"POST",data:a}).then(function(a){200==a.code||0==a.code?(e.$data.formShow=!1,t.navigateBack({delta:1})):i.default.errorTips(a.msg)}).catch(function(t){i.default.errorTips(t.msg||t.message)})},close:function(){this.$data.formShow=!1},trim:function(t){return null==t&&(t=""),t.replace(/\s/g,"")},submit:function(){if(""==this.$data.result_desc)return i.default.errorTips("描述不能为空"),!1;if(this.$data.files.length<=0)return i.default.errorTips("至少上传一张图片"),!1;if(""==this.$data.supplier_id)return i.default.errorTips("请选择供应商"),!1;if(""==this.$data.result_price)return i.default.errorTips("物料单价不能为空"),!1;if(this.$data.result_num<=0)return i.default.errorTips("物料数量不能为空"),!1;var e=[];this.$data.files.forEach(function(t,a){e.push(t.url)});var a={id:this.$data.id,supplier_id:this.$data.supplier_id,result_desc:this.trim(this.$data.result_desc),result_img:e,result_price:this.$data.result_price,result_num:this.$data.result_num,result_big_num:this.$data.result_big_num};s.default.staffFindFound({method:"POST",data:a}).then(function(e){200==e.code||0==e.code?t.navigateBack({delta:1}):i.default.errorTips(e.msg)}).catch(function(t){i.default.errorTips(t.msg)})},checkSupplier:function(t){this.$data.supplier=this.$data.list[t].name,this.$data.supplier_id=this.$data.list[t].id,this.$data.isCheckSupplier=!1},sum:function(){this.$data.totalCost=this.$data.result_num*this.$data.result_price+this.$data.result_big_num*this.$data.big_price},staffSupplierSearch:function(t){var e=this;this.$data.supplier_id="",""!=t.detail.value&&s.default.staffSupplierSearch({data:{keyword:t.detail.value}}).then(function(t){200!=t.code&&0!=t.code||(e.$data.list=t.data,t.data.length<=0?e.$data.isCheckSupplier=!1:e.$data.isCheckSupplier=!0)})},getPriceByOne:function(t){this.$data.result_price=t.detail.value,this.sum()},bindChange1:function(t){this.$data.result_num=t,this.sum()},bindChange2:function(t){this.$data.result_big_num=t,this.sum()},getTaskFee:function(){var t=this;s.default.getTaskFee({}).then(function(e){200!=e.code&&0!=e.code||(t.$data.big_price=e.data.big_price,t.$data.shipping_extra_price=e.data.shipping_extra_price,t.$data.big_price=e.data.big_price,t.sum())})},imageUpload:function(t){this.$data.files=t.files},getOrderDetail:function(t){var e=this;s.default.findShowById({data:{id:t}}).then(function(t){200!=t.code&&0!=t.code||(e.$data.detailData=t.data)})},preview:function(e){var a=e.currentTarget.dataset.idx,s=this.data.detailData.desc_img;t.previewImage({current:s[a],urls:s})}}};e.default=u}).call(this,a("6e42")["default"])},6905:function(t,e,a){"use strict";a.r(e);var s=a("3bbb"),i=a.n(s);for(var l in s)"default"!==l&&function(t){a.d(e,t,function(){return s[t]})}(l);e["default"]=i.a},"6efb":function(t,e,a){"use strict";a.r(e);var s=a("dcd7"),i=a("6905");for(var l in i)"default"!==l&&function(t){a.d(e,t,function(){return i[t]})}(l);a("9e86");var r=a("2877"),c=Object(r["a"])(i["default"],s["a"],s["b"],!1,null,"150e0c13",null);e["default"]=c.exports},"9e86":function(t,e,a){"use strict";var s=a("dd3b"),i=a.n(s);i.a},dcd7:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"find-order-detail"},[a("view",{staticClass:"container tl"},[a("view",{staticClass:"b500 tl padding lh60 text-yellow"},[t._v(t._s(t.detailData.status_label))]),a("view",{staticClass:"padding fs30"},[a("view",[a("text",{staticClass:"c999"},[t._v("物料类型：")]),a("text",{staticClass:"text-666 fs24"},[t._v(t._s(t.detailData.cname))])]),a("view",{staticClass:"flex"},[a("view",{staticClass:"c999"},[t._v("物料描述：")]),a("view",{staticClass:"flex-1 text-666 fs24"},[t._v(t._s(t.detailData.desc))])]),a("view",{staticClass:"flex"},[a("view",{staticClass:"c999"},[t._v("比较优选：")]),a("view",{staticClass:"flex-1 text-666 fs24"},[t._v("参考价格 ￥ "+t._s(t.detailData.reference_price))])]),a("view",[a("view",{staticClass:"flex flex-start pdb30 image"},t._l(t.detailData.desc_img,function(e,s){return a("image",{key:s,attrs:{src:e,"data-idx":s,mode:"aspectFill",eventid:"21ace604-0-"+s},on:{click:t.preview}})}))]),a("view",{staticClass:"item-right fs24 text-yellow"},[a("view",{staticClass:"c999"},[t._v(t._s(t.detailData.find_type_label))]),a("view",{staticClass:"c999"},[t._v("费用:￥"+t._s(t.detailData.fee))])])]),a("view",{staticClass:"top20"}),t.detailData.get_address?a("view",{staticClass:"get-address"},[a("view",{staticClass:"t1 fs28"},[t._v("寄料地址")]),a("view",{staticClass:"t2 fs24"},[a("text",[t._v("收货人 "+t._s(t.detailData.get_address.mobile))]),t.detailData.get_address.stall?a("text",[t._v(t._s(t.detailData.get_address.stall))]):t._e()]),a("view",{staticClass:"t3 fs24 text-999"},[t._v(t._s(t.detailData.get_address.address))])]):t._e(),t.detailData.shipping_address?a("view",{staticClass:"get-address"},[a("view",{staticClass:"t1 fs28"},[t._v("寄料地址")]),a("view",{staticClass:"t2 fs24"},[a("text",[t._v("收货人 "+t._s(t.detailData.shipping_address.mobile))]),t.detailData.shipping_address.stall?a("text",[t._v(t._s(t.detailData.shipping_address.stall))]):t._e()]),a("view",{staticClass:"t3 fs24 text-999"},[t._v(t._s(t.detailData.shipping_address.address))])]):t._e(),a("view",{staticClass:"pdl-30 bt-1 lh100"},[a("text",{staticClass:"fs28"},[t._v("配送方式:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.detailData.find_type_label))])]),a("view",{staticClass:"pdl-30 bt-1 top20 order_sn"},[a("view",[a("text",{staticClass:"fs28"},[t._v("订单编号:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.detailData.order_sn))])]),a("view",[a("text",{staticClass:"fs28"},[t._v("下单时间:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.detailData.created_at))])])]),2==t.detailData.find_status?a("view",{staticClass:"order-info"},[a("view",{staticClass:"desc cf"},[t._m(0),a("view",{staticClass:"t2 fll"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.result_desc,expression:"result_desc"}],attrs:{placeholder:"(注:请详细描述物料的名称、用途、材质、交货时间)",eventid:"21ace604-1"},domProps:{value:t.result_desc},on:{input:function(e){e.target.composing||(t.result_desc=e.target.value)}}})])]),a("view",{staticClass:"upload"},[t._m(1),a("view",{staticClass:"t2"},[a("upload",{attrs:{itemIndex:t.index,upLoadMaxNum:t.upLoadMaxNum,files:t.files,eventid:"21ace604-2",mpcomid:"21ace604-0"},on:{imageUpload:t.imageUpload}})],1)]),a("view",{staticClass:"supplier cf"},[t._m(2),a("view",{staticClass:"t2 fll"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.supplier,expression:"supplier"}],attrs:{type:"text",placeholder:"请输入供应商名称",eventid:"21ace604-3"},domProps:{value:t.supplier},on:{input:[function(e){e.target.composing||(t.supplier=e.target.value)},t.staffSupplierSearch]}}),t.isCheckSupplier?a("view",{staticClass:"select"},t._l(t.list,function(e,s){return a("view",{key:s,attrs:{eventid:"21ace604-4-"+s},on:{click:function(e){e.stopPropagation(),t.checkSupplier(s)}}},[t._v(t._s(e.name))])})):t._e()])]),a("view",{staticClass:"price cf"},[t._m(3),a("view",{staticClass:"t2 fll"},[a("input",{attrs:{type:"text",placeholder:"请输入物料单价",eventid:"21ace604-5"},on:{input:t.getPriceByOne}})])]),a("view",{staticClass:"mun1 cf fs28"},[t._m(4),a("view",{staticClass:"t2 fll"},[a("uni-number-box",{attrs:{min:0,value:t.result_num,max:99999,eventid:"21ace604-6",mpcomid:"21ace604-1"},on:{change:t.bindChange1}}),a("text",{staticClass:"piece"},[t._v("件")])],1)]),a("view",{staticClass:"mun2 cf fs28"},[t._m(5),a("view",{staticClass:"t2 fll"},[a("uni-number-box",{attrs:{min:0,value:t.result_big_num,max:99999,eventid:"21ace604-7",mpcomid:"21ace604-2"},on:{change:t.bindChange2}}),a("text",{staticClass:"piece"},[t._v("件")]),a("text",{staticClass:"text-red mgl-20"},[t._v("* ￥"+t._s(t.big_price))])],1)]),a("view",{staticClass:"cost"},[a("text",{staticClass:"t1 fs28"},[t._v("合计费用:")]),a("text",{staticClass:"t2 mgl-20 text-red"},[t._v("￥ "+t._s(t.totalCost))])])]):t._e(),t.detailData.find_status>=4?a("view",{staticClass:"status-2"},[a("view",{staticClass:"li"},[a("text",{staticClass:"fs28"},[t._v("物料单价:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v("￥"+t._s(t.detailData.result_price))])]),a("view",{staticClass:"li"},[a("text",{staticClass:"fs28"},[t._v("物料数量:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.detailData.result_num))])]),a("view",{staticClass:"li"},[a("text",{staticClass:"fs28"},[t._v("大货配送费:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v("￥"+t._s(t.detailData.result_extra_fee)+" ("+t._s(t.detailData.result_big_num)+" * "+t._s(t.big_price)+")")])]),t.detailData.desc_img.length>0&&t.detailData.desc_img?a("view",{staticClass:"img cf"},t._l(t.detailData.desc_img,function(t,e){return a("image",{key:e,staticClass:"fll",attrs:{src:t,mode:""}})})):t._e()]):t._e(),5==t.detailData.find_status?a("view",{staticClass:"evaluate pd-30 bt-1"},[a("view",{staticClass:"v1"},[a("text",{staticClass:"fs28"},[t._v("找料服务:")]),a("text",{staticClass:"mgl-20"},t._l(t.detailData.find_star,function(t,e){return a("text",{key:t,staticClass:"star iconfont icon-star text-yellow"})}))]),a("view",{staticClass:"v1"},[a("text",{staticClass:"fs28"},[t._v("配送服务:")]),a("text",{staticClass:"mgl-20"},t._l(t.detailData.dist_star,function(t,e){return a("text",{key:t,staticClass:"star iconfont icon-star text-yellow"})}))]),a("view",{staticClass:"v1"},[a("text",{staticClass:"fs28"},[t._v("服务反馈:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.detailData.comment))])])]):t._e(),a("view",{staticClass:"flex-end order-handle cf"},[2==t.detailData.find_status?a("view",{staticClass:"flex find-status flr mgr-20"},[a("view",{staticClass:"ctheme warm-border ",attrs:{"data-type":1,"data-id":t.detailData.id,eventid:"21ace604-8"},on:{click:t.submit}},[t._v("提交信息")])]):t._e(),2==t.detailData.find_status?a("view",{staticClass:"flex find-status flr"},[a("view",{attrs:{"data-type":2,"data-id":t.detailData.id,eventid:"21ace604-9"},on:{click:t.showForm}},[t._v(t._s(1==t.detailData.type?"找":"取")+"不到物料")])]):t._e(),1==t.detailData.find_status?a("view",{staticClass:"find-status flr",attrs:{eventid:"21ace604-10"},on:{click:function(e){t.receiptOrder(t.detailData.id)}}},[t._v("确认接单")]):t._e(),""!=t.detailData.user_id?a("view",{staticClass:"find-status flr",attrs:{eventid:"21ace604-11"},on:{click:function(e){t.goChat(t.detailData)}}},[t._v("联系客户")]):t._e()])]),t.formShow?a("view",{staticClass:"pop-window"},[a("view",{staticClass:"form-box-2"},[a("text",{staticClass:"iconfont icon-guanbi close",attrs:{eventid:"21ace604-12"},on:{click:function(e){e.stopPropagation(),t.close(e)}}}),a("view",[a("view",{staticClass:"fs34 b600"},[t._v("填写原因")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],staticClass:"tl reason bdb bdt textarea",attrs:{placeholder:1==t.detailData.type?"请填写找不到物料的原因":"请填写取不到物料的原因",eventid:"21ace604-13"},domProps:{value:t.remark},on:{input:function(e){e.target.composing||(t.remark=e.target.value)}}}),a("view",{staticClass:"submit-box flex bt-1"},[a("view",{staticClass:"flex-1 fs28",attrs:{eventid:"21ace604-14"},on:{click:function(e){e.stopPropagation(),t.close(e)}}},[t._v("取消")]),a("view",{staticClass:"flex-1 fs28 sub",attrs:{eventid:"21ace604-15"},on:{click:function(e){e.stopPropagation(),t.unFormSubmit(e)}}},[t._v("提交")])])])])]):t._e()])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"t1 fll"},[a("text",{staticClass:"text-red"},[t._v("*")]),a("text",[t._v("描述:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"t1 fs28"},[a("text",{staticClass:"text-red"},[t._v("*")]),a("text",[t._v("上传图片:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"fll t1 fs28"},[a("text",{staticClass:"text-red"},[t._v("*")]),a("text",[t._v("供应商:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"t1 fll"},[a("text",{staticClass:"text-red"},[t._v("*")]),a("text",[t._v("物料单价:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"t1 fll"},[a("text",{staticClass:"text-red"},[t._v("*")]),a("text",[t._v("物料数量:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"t1 fll"},[a("text",{staticClass:"text-red",staticStyle:{opacity:"0"}},[t._v("*")]),a("text",[t._v("大货数量:")])])}];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},dd3b:function(t,e,a){}},[["0df9","common/runtime","common/vendor"]]]);