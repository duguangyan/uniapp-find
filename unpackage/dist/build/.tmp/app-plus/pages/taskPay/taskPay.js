(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/taskPay/taskPay"],{"21d0":function(t,s,a){},3951:function(t,s,a){"use strict";a.r(s);var e=a("4ca0"),i=a("8c29");for(var d in i)"default"!==d&&function(t){a.d(s,t,function(){return i[t]})}(d);a("f907");var n=a("2877"),c=Object(n["a"])(i["default"],e["a"],e["b"],!1,null,"058abf60",null);s["default"]=c.exports},"4ca0":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("view",[a("view",{staticClass:"task-warp"},[a("view",[t.finds.length>0?a("view",{staticClass:"task-find box-shadow"},[t._m(0),t._l(t.finds,function(s,e){return a("view",{key:e,staticClass:"task-find-list fs30"},[a("view",{staticClass:"task-find-item"},[a("view",[a("text",{staticClass:"fs28"},[t._v("物料品类:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(s.cname))]),1==s.find_type?a("text",{staticClass:"flr text-yellow fs24"},[t._v("按图找料")]):t._e(),2==s.find_type?a("text",{staticClass:"flr text-yellow fs24"},[t._v("按样找料")]):t._e(),3==s.find_type?a("text",{staticClass:"flr text-yellow fs24"},[t._v("按描述找料")]):t._e()]),a("view",[a("text",{staticClass:"fs28"},[t._v("物料描述:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(s.desc))]),a("text",{staticClass:"flr text-yellow fs24"},[t._v("金额:￥"+t._s(s.fee))])]),a("view",[a("text",{staticClass:"fs28"},[t._v("限时找料:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(1==s.is_limit?"三小时":""))]),a("text",{staticClass:"flr text-yellow fs24"},[t._v("超范围服务费:￥"+t._s(s.extra_fee))])]),a("view",[a("text",{staticClass:"fs28"},[t._v("比价优选:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v("参考价格￥"+t._s(s.reference_price))])]),a("image",{staticClass:"task-find-img",attrs:{src:"../../static/icon/task_find.png"}})]),a("view",{staticClass:"task-find-method"},[1==s.find_type?a("view",{staticClass:"task-find-method-img"},t._l(s.desc_img,function(s,i){return a("image",{key:i,attrs:{src:s,eventid:"0a126082-0-"+e+"-"+i},on:{click:t.imgYu}})})):t._e(),2==s.find_type?a("view",{staticClass:"task-find-method-getfind"},[a("view",[a("view",{staticClass:"fs24"},[a("text",{staticClass:"fs28"},[t._v("取样地址:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(s.address.address||"")+" "+t._s(s.address.room||""))])])])]):t._e(),3==s.find_type?a("view",{staticClass:"task-find-method-getfind"},[a("view",{staticClass:"mgl-20 fs32"},[t._v("寄样地址：")]),a("view",[a("view",{staticClass:"fs24 pdr-20",staticStyle:{"word-break":"break-all"}},[a("text",{staticClass:"remark"},[t._v(t._s(t.companyaddress[0].tag))]),t._v(t._s(t.companyaddress[0].address))]),a("view",{staticClass:"fs24 pdr-20",staticStyle:{"word-break":"break-all"}},[t._v(t._s(t.companyaddress[0].consignee)+" / "+t._s(t.companyaddress[0].mobile))]),a("view",[t._v("...")])])]):t._e()])])}),a("view",{staticClass:"task-find-sum lh90 fs30 bb-1"},[a("text",[t._v("共"+t._s(t.finds.length)+"个任务,小计："),a("text",{staticClass:"text-red"},[t._v("￥"+t._s(t.findsTotalPrice))])])])],2):t._e(),t.fetchs.length>0?a("view",{staticClass:"task-get box-shadow"},[t._m(1),t._l(t.fetchs,function(s,e){return a("view",{key:e,staticClass:"task-find-list fs30"},[a("view",{staticClass:"task-find-item"},[a("view",[a("text",{staticClass:"fs28"},[t._v("物料品类:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(s.cname))]),a("text",{staticClass:"flr text-yellow fs24"},[t._v("金额:￥"+t._s(s.fee))])]),a("view",[a("text",{staticClass:"fs28"},[t._v("物料描述:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(s.desc))]),a("text",{staticClass:"flr text-yellow fs24"},[t._v("超范围服务费:￥"+t._s(s.extra_fee))])]),a("image",{staticClass:"task-find-img",attrs:{src:"../../static/icon/task_get.png"}})]),a("view",{staticClass:"task-find-method"},[a("view",{staticClass:"task-find-method-getfind fecth-address fs30"},[a("view",{staticClass:"fs24"},[a("text",{staticClass:"fs28"},[t._v("取料地址:")]),a("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(s.address.city_str||"")+" "+t._s(s.address.address||"")+" "+t._s(s.address.room||""))])])])])])}),a("view",{staticClass:"task-find-sum lh90 fs30 bb-1"},[t._v("共"+t._s(t.fetchs.length)+"个任务,小计："),a("text",{staticClass:"text-red"},[t._v("￥"+t._s(t.fetchsTotalPrice))])])],2):t._e()]),a("view",{staticClass:"fs30 bottom-border task-get box-shadow"},[a("view",{staticClass:"cell-padding fs30 mgt-30 lh90 bottom-border"},[t._v("送料地址")]),a("view",{staticClass:"cell-padding address flex flex-start",attrs:{"data-index":2,eventid:"0a126082-2"},on:{click:t.goConsigneeAddress}},[a("text",{staticClass:"iconfont icon-jiantou address-icon"}),""!=t.address?a("view",{staticClass:"flex-1 address-info fs30 pdt-30"},[a("view",{staticClass:"fs2"},[a("text",[t._v("收货人")]),t._v(t._s(t.address.mobile||"")),""!=t.address.remark?a("text",{staticClass:"remark"},[t._v(t._s(t.address.remark||""))]):t._e()]),a("view",{staticClass:"fs24 text-999"},[t._v(t._s(t.address.city_str||"")+" "+t._s(t.address.address||"")+" "+t._s(t.address.room||""))])]):t._e(),""==t.address?a("view",{staticClass:"text-666 h100 lh100 flex-1 fetchsAddress",attrs:{"data-index":2,eventid:"0a126082-1"},on:{click:t.goConsigneeAddress}},[t._v("点击添加取料地址")]):t._e()])]),a("view",{staticClass:"task-get box-shadow cell-padding fs30 mgt-30 lh90 bottom-border coupon",attrs:{eventid:"0a126082-3"},on:{click:t.goCoupon}},[""==t.couponList?a("text",[t._v("使用优惠券")]):t._e(),""!=t.couponList?a("text",[t._v(t._s(t.couponList.name)+" "+t._s(t.couponList.coupon_data.value))]):t._e(),a("text",{staticClass:"iconfont icon-jiantou flr"})]),a("view",{staticClass:"task-get box-shadow cell-padding fs30 mgt-30 pay-type"},[a("view",{staticClass:"title"},[t._v("选择支付方式")]),a("view",{staticClass:"items"},t._l(t.payTypeList,function(s,e){return a("view",{key:e,staticClass:"item cf",attrs:{"data-index":e,eventid:"0a126082-4-"+e},on:{click:t.payTypeCheck}},[a("image",{staticClass:"fll",attrs:{src:s.icon}}),"微信支付"==s.title?a("text",{staticClass:"fll mgl-20 text"},[t._v(t._s(s.title))]):t._e(),"余额"==s.title?a("text",{staticClass:"fll mgl-20 text"},[t._v(t._s(s.title)+" (￥"+t._s(t.balance_amount||"0")+")")]):t._e(),"鹿币"==s.title?a("text",{staticClass:"fll mgl-20 text"},[t._v(t._s(s.title)+" ("+t._s(t.virtual_amount||"0")+")")]):t._e(),a("view",{staticClass:"flr check-btn"},[t.payTypeCheckIndex==e?a("text",{staticClass:"iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"}):t._e(),t.payTypeCheckIndex!=e?a("text",{staticClass:"iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"}):t._e()])])}))]),a("view",{staticStyle:{height:"140rpx"}}),t.fetchs.length>0||t.finds.length>0?a("view",{staticClass:"task-pay fs30 lh120 box-shadow pdl-30"},[a("view",{staticClass:"flr task-paybtn",staticStyle:{"margin-right":"240rpx"}},[t._v("应付款："),a("text",{staticClass:"text-red"},[t._v("￥"+t._s(t.findsTotalPrice+t.fetchsTotalPrice-t.couponListPrice))])]),a("button",{staticClass:"task-pay-btn text-underline",attrs:{disabled:t.isDisabled,eventid:"0a126082-5"},on:{click:t.doPay}},[t._v("支付")])],1):t._e()])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("view",{staticClass:"task-find-title fs30"},[a("text",[t._v("找料任务")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("view",{staticClass:"task-find-title fs30"},[a("text",[t._v("取送任务")])])}];a.d(s,"a",function(){return e}),a.d(s,"b",function(){return i})},"551b":function(t,s,a){"use strict";a("a3d9");var e=d(a("b0ce")),i=d(a("3951"));function d(t){return t&&t.__esModule?t:{default:t}}Page((0,e.default)(i.default))},6765:function(t,s,a){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e=d(a("e378")),i=d(a("0089"));function d(t){return t&&t.__esModule?t:{default:t}}var n={data:function(){return{payDates:{},isDisabled:!1,isOldPayPasswordModel:!1,Length:6,isFocus:!0,Value:"",ispassword:!0,couponId:"",payTypeList:[{icon:"../../static/icon/money.png",title:"鹿币"},{icon:"../../static/icon/icon-balance.png",title:"余额"},{icon:"../../static/icon/wx.png",title:"微信支付"}],couponList:"",couponListPrice:"",fetchsTotalPrice:"",findsTotalPrice:"",fetchs:"",finds:"",taskPayList:"",address:"",companyaddress:[{address:"",tag:"",consignee:"",mobile:""}],balance_amount:"",virtual_amount:"",payTypeCheckIndex:0,task_ids:""}},onLoad:function(s){var a=s.payMethed;1==a?t.setStorageSync("method",0):t.setStorageSync("method",1),t.setStorageSync("status",0),this.getUserAsset();var e=t.getStorageSync("taskPayList"),i=e.finds,d=e.fetchs,n=e.task_ids,c=0,o=0;i.forEach(function(t){c+=parseFloat(t.fee)}),d.forEach(function(t){o+=parseFloat(t.fee)}),this.$data.taskPayList=e,this.$data.finds=i,this.$data.fetchs=d,this.$data.task_ids=n,this.$data.findsTotalPrice=c,this.$data.fetchsTotalPrice=o,this.getDefaultAddress(),this.getCompanyaddress()},onShow:function(){var t=this;this.$data.isDisabled=!1,this.$eventHub.$on("taskPayPage",function(s){t.$data.address=s.address,t.getServicePrice()})},mounted:function(){var t=this;this.$eventHub.$on("giftData",function(s){t.$data.couponList=s,t.$data.couponListPrice=s.value,t.$data.couponId=s.id})},methods:{goCoupon:function(){var s=this.$data.findsTotalPrice+this.$data.fetchsTotalPrice;t.navigateTo({url:"../giftCertificate/giftCertificate?from=giftCertificate&totalPrice="+s})},getDefaultAddress:function(){var t=this,s=this;i.default.defaultAddress({}).then(function(a){200!=a.code&&0!=a.code||(t.$data.address=a.data,s.getServicePrice())})},getServicePrice:function(){var t=this;i.default.apiTaskPayment({method:"POST",data:{task_id:this.$data.taskPayList.task_ids,address_id:this.$data.address.id}}).then(function(s){if(200==s.code||0==s.code){var a=[],e=[],i=t.$data.taskPayList;s.data.forEach(function(t,s){1==t.type?i.finds.forEach(function(s,e){t.id==s.id&&(t.address=s.address,a.push(t))}):i.fetchs.forEach(function(s,a){t.id==s.id&&(t.address=s.address,e.push(t))})});var d=0,n=0;a.forEach(function(t){d+=parseFloat(t.total_fee)}),e.forEach(function(t){n+=parseFloat(t.total_fee)}),t.$data.finds=a,t.$data.fetchs=e,t.$data.findsTotalPrice=d,t.$data.fetchsTotalPrice=n}})},getCompanyaddress:function(){var t=this;i.default.getCompanyaddress({}).then(function(s){200!=s.code&&0!=s.code||(console.log("公司地址"),console.log(s.data.address),t.$data.companyaddress=s.data)})},getUserAsset:function(){var t=this;i.default.getUserAsset({}).then(function(s){200!=s.code&&0!=s.code||(t.$data.balance_amount=s.data.balance,t.$data.virtual_amount=s.data.virtual)})},goConsigneeAddress:function(t){wx.navigateTo({url:"../address/address?from=taskPayPage"})},payTypeCheck:function(t){this.$data.payTypeCheckIndex=t.currentTarget.dataset.index},doPay:function(){var s=this;this.$data.isDisabled=!0;var a=this;if(this.$data.payDates.task_ids=this.$data.task_ids,""!=this.$data.couponList?this.$data.couponListPrice=Math.ceil(this.$data.couponList.value):this.$data.couponListPrice=0,""==this.$data.address)return e.default.errorTips("请添加地址"),!1;if(2==this.$data.payTypeCheckIndex)console.log("微信支付"),i.default.wxPayByOrder({method:"POST",data:{type:"miniapp",open_id:t.getStorageSync("open_id"),task_id:this.$data.task_ids,coupon_id:this.$data.couponId,address_id:this.$data.address.id}}).then(function(i){if(e.default.errorTips(i),200==i.code||0==i.code){var d=i.data.data,n=i.data.pay;d.success=function(s){console.log("支付成功"),console.log(s),t.redirectTo({url:"../taskPaySuccess/taskPaySuccess?pay_log="+JSON.stringify(n)})},d.fail=function(t){a.$data.isDisabled=!1,e.default.errorTips(支付失败)},wx.requestPayment(d)}else e.default.errorTips("支付失败"),s.$data.isDisabled=!1}).catch(function(t){e.default.errorTips(t.msg),s.$data.isDisabled=!1});else{console.log("余额支付");var d=this;t.showModal({title:"提示",content:"确认支付吗?",success:function(s){if(s.confirm){var a="";1==d.$data.payTypeCheckIndex?a={type:"miniapp",asset_type:"balance",open_id:t.getStorageSync("open_id"),task_id:d.$data.task_ids,coupon_id:d.$data.couponId,address_id:d.$data.address.id}:0==d.$data.payTypeCheckIndex&&(a={type:"miniapp",asset_type:"virtual",open_id:t.getStorageSync("open_id"),task_id:d.$data.task_ids,coupon_id:d.$data.couponId,address_id:d.$data.address.id}),i.default.payAsset({method:"POST",data:a}).then(function(s){if(200==s.code||0==s.code){var a=JSON.stringify(s.data.pay);t.redirectTo({url:"../taskPaySuccess/taskPaySuccess?pay_log="+a})}else e.default.errorTips(s.msg),d.$data.isDisabled=!1}).catch(function(t){e.default.errorTips(t.msg),d.$data.isDisabled=!1})}else s.cancel&&(e.default.errorTips("你点击了取消"),d.$data.isDisabled=!1)}})}}}};s.default=n}).call(this,a("6e42")["default"])},"8c29":function(t,s,a){"use strict";a.r(s);var e=a("6765"),i=a.n(e);for(var d in e)"default"!==d&&function(t){a.d(s,t,function(){return e[t]})}(d);s["default"]=i.a},f907:function(t,s,a){"use strict";var e=a("21d0"),i=a.n(e);i.a}},[["551b","common/runtime","common/vendor"]]]);