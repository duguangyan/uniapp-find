(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderDetail/orderDetail"],{"0144":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"orde-detail"},[s("view",{staticClass:"find-order-detail fs30"},[s("view",[s("view",{staticClass:"find-order-detail-top bb-20 lh120 fs30"},[s("text",{staticClass:"fs30 text-yellow"},[t._v(t._s(t.itemObj.status_label))])]),1==t.itemObj.can_delete||1==t.itemObj.can_comment?s("view",{staticClass:"find-order-detail-number fs30 pdl-30 bb-20 pdb-30"},[s("view",{staticClass:"lh50"},[t._v("确认收货 : "+t._s(t.itemObj.finish_at))]),s("view",{staticClass:"lh50"},[t._v("确认送达 : "+t._s(t.itemObj.shipping_at))]),s("view",{staticClass:"lh50"},[t._v("找到物料 : "+t._s(t.itemObj.find_at))])]):t._e(),s("view",{staticClass:"find-order-detail-type bb-20 fs30"},[s("view",{staticClass:"lh50"},[s("text",{staticClass:"fs28"},[t._v("物料类型:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.itemObj.cname))]),1==t.itemObj.type?s("text",{staticClass:"flr text-yellow fs24"},[t._v(t._s(t.itemObj.find_type_label))]):t._e()]),s("view",{staticClass:"lh50 describe"},[s("text",{staticClass:" fs28"},[t._v("物料描述:")]),s("text",{staticClass:"ellipsis describe-content fs24 text-999 mgl-20"},[t._v(t._s(t.itemObj.desc))]),s("text",{staticClass:"flr text-yellow fs24"},[t._v("费用:￥"+t._s(t.itemObj.fee))])]),s("view",{staticClass:"lh50"},[s("text",{staticClass:"fs28"},[t._v("比价优选:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v("参考价格￥"+t._s(t.itemObj.reference_price))])]),1==t.itemObj.find_type?s("view",{staticClass:"task-find-method-img"},t._l(t.itemObj.desc_img,function(e,a){return s("image",{key:a,attrs:{src:e,"data-src":e,eventid:"bcb9d712-0-"+a},on:{click:t.previewImage}})})):t._e()]),3==t.itemObj.find_type?s("view",{staticClass:"type3"},[s("view",{staticClass:"fs30 title"},[t._v("寄样地址:")]),t._l(t.companyaddress,function(e,a){return s("view",{key:a,staticClass:"bb1 mg10 con"},[s("view",[e.tag?s("text",{staticClass:"remark"},[t._v(t._s(e.tag||""))]):t._e(),s("text",[t._v(t._s(e.address))])]),s("view",{staticClass:"text-999"},[s("view",[t._v(t._s(e.consignee||"")+" / "+t._s(e.mobile||""))])]),s("view",{staticClass:"text-999"},[t._v(t._s(e.desc))])])}),t._m(0)],2):t._e(),t.itemObj.get_address&&3!=t.itemObj.find_type&&1!=t.itemObj.find_type?s("view",{staticClass:"lh90 fs30 pdl-30"},[t._v(t._s(2==t.itemObj.find_type?"取样地址":"取料地址"))]):t._e(),t.itemObj.get_address&&3!=t.itemObj.find_type&&1!=t.itemObj.find_type?s("view",{staticClass:"find-order-detail-address bb1 fs30 pdl-30"},[t.itemObj.get_address?s("view",[s("view",{staticClass:"lh50 fs28",staticStyle:{"word-break":"break-all"}},[t._v("收货人  "+t._s(t.itemObj.get_address.mobile||"")),t.itemObj.get_address.remark?s("text",{staticClass:"remark"},[t._v(t._s(t.itemObj.get_address.remark||""))]):t._e()]),s("view",{staticClass:"lh50 fs24 text-999"},[t._v(t._s(t.itemObj.get_address.address||"")+" "+t._s(t.itemObj.get_address.name||"")+" "+t._s(t.itemObj.get_address.room||""))])]):t._e(),t._l(t.itemObj.get_address,function(e,a){return t.itemObj.get_address.length>1?s("view",{key:a,staticClass:"mg10"},[s("view",{staticClass:"lh50 fs28",staticStyle:{"word-break":"break-all"}},[t._v("收货人"+t._s(e.mobile||"")),e.tag?s("text",{staticClass:"remark"},[t._v(t._s(e.tag||""))]):t._e()]),s("view",{staticClass:"lh50 text-999"},[t._v(t._s(e.address||""))])]):t._e()})],2):t._e(),t.itemObj.shipping_address?s("view",{staticClass:"lh90 fs30 pdl-30"},[t._v("送料地址")]):t._e(),t.itemObj.shipping_address?s("view",{staticClass:"find-order-detail-address bb-1 fs30 pdl-30"},[s("view",{staticClass:"lh50  fs28",staticStyle:{"word-break":"break-all"}},[t._v("收货人 "+t._s(t.itemObj.shipping_address.mobile||"")),t.itemObj.shipping_address.remark?s("text",{staticClass:"remark"},[t._v(t._s(t.itemObj.shipping_address.remark||""))]):t._e()]),s("view",{staticClass:"lh50 text-999 fs24"},[t._v(t._s(t.itemObj.shipping_address.city_str||"")+" "+t._s(t.itemObj.shipping_address.address||"")+"\n\t\t\t\t\t\t"+t._s(t.itemObj.shipping_address.room||""))])]):t._e(),s("view",{staticClass:"bb-20 pdl-30 lh100"},[s("text",{staticClass:"fs28"},[t._v("配送方式 :")]),2==t.itemObj.shipping_type?s("text",{staticClass:"fs24 mgl-20 text-999"},[t._v("物流到付")]):t._e(),1==t.itemObj.shipping_type?s("text",{staticClass:"fs24 mgl-20 text-999"},[t._v("送货上门")]):t._e(),0==t.itemObj.shipping_type?s("text",{staticClass:"fs24 mgl-20 text-999"},[t._v("送货上门")]):t._e()]),s("view",{staticClass:"find-order-detail-number fs30 pdl-30 pdb-30",staticStyle:{"margin-top":"30rpx"}},[s("view",{staticClass:"lh50"},[s("text",{staticClass:"fs28"},[t._v("订单编号:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.itemObj.order_sn))])]),s("view",{staticClass:"lh50"},[s("text",{staticClass:"fs28"},[t._v("下单时间:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.itemObj.created_at))])])]),s("view",{staticClass:"find-order-detail-btn bt-1 cf"},[1==t.itemObj.can_delete?s("button",{attrs:{eventid:"bcb9d712-1"},on:{click:function(e){t.delOrder(t.itemObj.id)}}},[t._v("删除")]):t._e(),1==t.itemObj.can_comment?s("button",{attrs:{eventid:"bcb9d712-2"},on:{click:function(e){t.toComment(t.itemObj.id)}}},[t._v("评价")]):t._e(),1==t.itemObj.can_refuse?s("button",{attrs:{eventid:"bcb9d712-3"},on:{click:function(e){t.toReturn(t.itemObj.id)}}},[t._v("申请退款")]):t._e(),1==t.itemObj.can_confirm?s("button",{staticClass:"order-footer-btn-red",attrs:{"data-index":t.index,eventid:"bcb9d712-4"},on:{click:function(e){t.affirmOrder(t.itemObj.id)}}},[t._v("确认收货")]):t._e(),""!=t.itemObj.find_status?s("view",[3!=t.status&&5!=t.itemObj.find_status&&1==t.itemObj.type&&""!=t.itemObj.findman_id?s("button",{attrs:{eventid:"bcb9d712-5"},on:{click:function(e){t.goChat(t.itemObj)}}},[t._v("联系找料员")]):t._e(),5!=t.itemObj.find_status&&2==t.itemObj.type&&""!=t.itemObj.findman_id?s("button",{attrs:{eventid:"bcb9d712-6"},on:{click:function(e){t.goChat(t.itemObj)}}},[t._v("联系找料员")]):t._e()],1):t._e(),""!=t.itemObj.distribution_status?s("view",[t.itemObj.distribution_status>1&&5!=t.itemObj.distribution_status&&1==t.itemObj.type&&""!=t.itemObj.distribution_id?s("button",{attrs:{eventid:"bcb9d712-7"},on:{click:function(e){t.goChat(t.itemObj)}}},[t._v("联系配送员")]):t._e(),t.itemObj.distribution_status>1&&5!=t.itemObj.distribution_status&&2==t.itemObj.type&&""!=t.itemObj.distribution_id?s("button",{attrs:{eventid:"bcb9d712-8"},on:{click:function(e){t.goChat(t.itemObj)}}},[t._v("联系配送员")]):t._e()],1):t._e()],1)])]),t.itemObj.find_status>=4?s("view",{staticClass:"status-2"},[s("view",{staticClass:"li"},[s("text",{staticClass:"fs28"},[t._v("物料单价:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v("￥"+t._s(t.itemObj.result_price))])]),s("view",{staticClass:"li"},[s("text",{staticClass:"fs28"},[t._v("物料数量:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v(t._s(t.itemObj.result_num))])]),s("view",{staticClass:"li"},[s("text",{staticClass:"fs28"},[t._v("大货配送费:")]),s("text",{staticClass:"fs24 text-999 mgl-20"},[t._v("￥"+t._s(t.itemObj.result_extra_fee)+" ("+t._s(t.itemObj.result_big_num)+" * "+t._s(t.big_price)+")")])]),t.itemObj.desc_img.length>0&&t.itemObj.desc_img?s("view",{staticClass:"img cf"},t._l(t.itemObj.desc_img,function(t,e){return s("image",{key:e,staticClass:"fll",attrs:{src:t,mode:""}})})):t._e()]):t._e(),4==t.itemObj.find_status?s("view",{staticClass:"task-get cell-padding fs30 mgt-30 pay-type"},[s("view",{staticClass:"title"},[t._v("选择支付方式")]),s("view",{staticClass:"items"},t._l(t.payTypeList,function(e,a){return s("view",{key:a,staticClass:"item cf",attrs:{"data-index":a,eventid:"bcb9d712-9-"+a},on:{click:t.payTypeCheck}},[s("image",{staticClass:"fll",attrs:{src:e.icon}}),"微信支付"==e.title?s("text",{staticClass:"fll mgl-20 text"},[t._v(t._s(e.title))]):t._e(),"余额"==e.title?s("text",{staticClass:"fll mgl-20 text"},[t._v(t._s(e.title)+" (￥"+t._s(t.balance)+")")]):t._e(),"支付宝支付"==e.title?s("text",{staticClass:"fll mgl-20 text"},[t._v(t._s(e.title))]):t._e(),s("view",{staticClass:"flr check-btn"},[t.payTypeCheckIndex==a?s("text",{staticClass:"iconfont icon-dui icon-dui-1 fs40 pdl-10 text-yellow"}):t._e(),t.payTypeCheckIndex!=a?s("text",{staticClass:"iconfont icon-dui icon-yuan-1 fs40 pdl-10 text-eb"}):t._e()])])}))]):t._e(),4==t.itemObj.find_status?s("view",{staticStyle:{height:"140rpx"}}):t._e(),4==t.itemObj.find_status?s("view",{staticClass:"task-pay fs30 lh120"},[s("view",{staticClass:"flr task-paybtn",staticStyle:{"margin-right":"240rpx"}},[t._v("应付款："),s("text",{staticClass:"text-red"},[t._v("￥"+t._s(t.total_amount))])]),s("button",{staticClass:"task-pay-btn text-underline",attrs:{disabled:t.isDisabled,eventid:"bcb9d712-10"},on:{click:t.doPay}},[t._v("支付")])],1):t._e(),s("view",{staticStyle:{height:"120rpx"}}),t.isCommentModel?s("view",{staticClass:"comment-model"},[s("view",{staticClass:"comment-model-bg"}),s("view",{staticClass:"comment-content"},[s("view",{staticClass:"title"},[t._v("评价本次服务")]),s("view",{staticClass:"star-warp pdt-30 pdb-30"},[s("view",[t._v("找料满意度："),t._l(t.starArr,function(e,a){return s("text",{key:a,staticClass:"star iconfont icon-star",class:t.starIndex_1>=a?"text-yellow":"",attrs:{"data-idx":a,eventid:"bcb9d712-11-"+a},on:{click:t.satisfact}})})],2),s("view",[t._v("配送及时性："),t._l(t.starArr,function(e,a){return s("text",{key:a,staticClass:"star iconfont icon-star",class:t.starIndex_2>=a?"text-yellow":"",attrs:{"data-idx":a,eventid:"bcb9d712-12-"+a},on:{click:t.timely}})})],2)]),t.isStarShow?s("input",{staticClass:"input bt-1 lh50 pdt-30",attrs:{type:"text",placeholder:"请输入评语",eventid:"bcb9d712-13"},on:{input:t.commentModelInput}}):t._e(),s("view",{staticClass:"btn flex"},[s("view",{staticClass:"cancel flex-1",attrs:{eventid:"bcb9d712-14"},on:{click:t.commentCancel}},[t._v("取消")]),s("view",{staticClass:"confirm flex-1",attrs:{eventid:"bcb9d712-15"},on:{click:t.commentConfirm}},[t._v("确定")])])])]):t._e()])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"text-red"},[s("text",{staticClass:"iconfont icon-gantan1"}),t._v("寄样不支持到付,请客户自行承担寄样费用")])}];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},"75c8":function(t,e,s){"use strict";s.r(e);var a=s("0144"),i=s("d457");for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);s("f0d0");var c=s("2877"),d=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"5cc7b0aa",null);e["default"]=d.exports},b82b:function(t,e,s){},cc71:function(t,e,s){"use strict";s("a3d9");var a=n(s("b0ce")),i=n(s("75c8"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},d457:function(t,e,s){"use strict";s.r(e);var a=s("efe7"),i=s.n(a);for(var n in a)"default"!==n&&function(t){s.d(e,t,function(){return a[t]})}(n);e["default"]=i.a},efe7:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(s("e378")),i=n(s("0089"));function n(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{companyaddress:"",id:"",commentId:"",itemObj:"",status:1,nav:1,isCommentModel:!1,orderNav:1,isDelModel:!0,delMsg:"",commentMsg:"",isStarShow:!1,starArr:[0,1,2,3,4],starIndex_1:4,starIndex_2:4,isDisabled:!1,payDates:{},isOldPayPasswordModel:!1,Length:6,isFocus:!0,Value:"",ispassword:!0,payTypeList:[{icon:"../../static/icon/icon-balance.png",title:"余额"},{icon:"../../static/icon/wx.png",title:"微信支付"},{icon:"../../static/icon/zfb.png",title:"支付宝支付"}],payTypeCheckIndex:0,shipping_extra_price:0,big_price:0,balance:"",total_amount:0}},onLoad:function(t){console.log("options:",t),this.$data.commentId=t.id,this.$data.id=t.id,this.$data.status=t.status,this.$data.nav=t.nav},onShow:function(){this.$data.orderNav=t.getStorageSync("orderNav"),this.getData(),this.getCompanyaddress(),this.getTaskFee(),this.getUserAsset()},methods:{toComment:function(t){this.$data.commentMsg="",this.$data.isCommentModel=!0,this.$data.commentId=t},commentModelInput:function(t){this.$data.commentMsg=t.detail.value},commentCancel:function(){this.$data.isCommentModel=!1},commentConfirm:function(e){var s={id:this.$data.commentId,star:this.$data.starIndex_1+1,star_ship:this.$data.starIndex_2+1,content:this.$data.commentMsg};i.default.toCommentOrder({method:"POST",data:s}).then(function(e){200==e.code||0==e.code?(a.default.successTips("评价成功"),t.navigateBack({delta:1})):a.default.errorTips(e.msg)}).catch(function(t){a.default.errorTips(t.msg||t.message)})},satisfact:function(t){this.$data.starIndex_1=t.target.dataset.idx,this.$data.isStarShow=this.$data.starIndex_1<3||this.$data.starIndex_2<3},timely:function(t){this.$data.starIndex_2=t.target.dataset.idx,this.$data.isStarShow=this.$data.starIndex_1<3||this.$data.starIndex_2<3},getUserAsset:function(){var t=this;i.default.getUserAsset({}).then(function(e){200!=e.code&&0!=e.code||(t.$data.balance=e.data.balance)})},getTaskFee:function(){var t=this;i.default.getTaskFee({}).then(function(e){200!=e.code&&0!=e.code||(t.$data.shipping_extra_price=e.data.shipping_extra_price,t.$data.big_price=e.data.big_price)})},goChat:function(e){1==e.type?t.navigateTo({url:"/pages/chat/chat?id="+e.findman_id+"&fmUserName="+e.findman_name}):t.navigateTo({url:"/pages/chat/chat?id="+e.distribution_id+"&fmUserName="+e.distribution_name})},contact:function(){wx.makePhoneCall({phoneNumber:"400-8088-156"})},affirmOrder:function(e){var s=this;t.showModal({title:"提示",content:"确认收货吗?",success:function(t){t.confirm?i.default.affirmOrder({method:"POST",data:{id:e}}).then(function(t){200==t.code||0==t.code?(s.$data.itemObj.can_confirm=0,a.default.successTips("收货成功")):a.default.errorTips(t.msg)}):t.cancel&&a.default.errorTips("你点击了取消")}}),console.log("确认收货")},delOrder:function(e){t.showModal({title:"提示",content:"确认删除此订单？",confirmText:"确定",success:function(s){s.confirm?i.default.orderDelete({method:"POST",data:{id:e}}).then(function(e){200!=e.code&&0!=e.code||t.showToast({title:"删除成功",icon:"success",success:function(){t.navigateBack({delta:1})}})}):s.cancel&&(console.log("用户点击取消"),a.default.errorTips("你点击了取消"))}})},toReturn:function(e){var s={id:e},n=this;t.showModal({title:"提示",content:"确认退款吗？",success:function(t){t.confirm?i.default.refuse({method:"POST",data:s}).then(function(t){(t.code=200)?(n.$data.itemObj.can_refuse=0,n.$data.itemObj.status_label="申请退款",a.default.successTips(t.msg)):a.default.errorTips(t.msg)}).catch(function(t){a.default.errorTips(t.msg||t.message)}):t.cancel&&console.log("用户点击取消")}})},getCompanyaddress:function(){var t=this;i.default.getCompanyaddress({}).then(function(e){200!=e.code&&0!=e.code||(t.$data.companyaddress=e.data)})},getData:function(){var t=this;this.$data.id&&i.default.getOrderDetail({data:{id:this.$data.id}}).then(function(e){if(200==e.code||0==e.code){var s=e.data;if(1==s.type?s.type_name="按图找料":2==s.type?s.type_name="按样找料":3==s.type&&(s.type_name="按描述找料"),"string"==typeof s.desc_img){var i=[];i.push(s.desc_img),s.desc_img=i}t.$data.itemObj=s,t.$data.total_amount=parseFloat(s.result_fee)+parseFloat(s.result_extra_fee)}else a.default.errorTips(e.msg)}).catch(function(t){console.log(t.msg)})},payTypeCheck:function(t){if(2==t.currentTarget.dataset.index)return a.default.errorTips("小程序暂不支持支付宝支付"),!1;this.$data.payTypeCheckIndex=t.currentTarget.dataset.index},doPay:function(){var e=this;this.$data.isDisabled=!0;var s=this;if(1==this.$data.payTypeCheckIndex)console.log("微信支付"),i.default.apiOrderPay({method:"POST",data:{id:this.$data.id,type:"miniapp",open_id:t.getStorageSync("open_id"),asset_type:"wx"}}).then(function(i){if(a.default.errorTips(i),200==i.code||0==i.code){var n=i.data.data,c=i.data.pay;n.success=function(e){console.log("支付成功"),console.log(e),t.redirectTo({url:"../taskPaySuccess/taskPaySuccess?pay_log="+JSON.stringify(c)})},n.fail=function(t){s.$data.isDisabled=!1,a.default.errorTips(支付失败)},wx.requestPayment(n)}else a.default.errorTips("支付失败"),e.$data.isDisabled=!1}).catch(function(t){a.default.errorTips(t.msg),e.$data.isDisabled=!1});else{console.log("余额支付");var n=this;t.showModal({title:"提示",content:"确认支付吗?",success:function(e){if(e.confirm){var s={id:n.$data.id,type:"miniapp",asset_type:"balance",open_id:t.getStorageSync("open_id")};i.default.apiOrderPay({method:"POST",data:s}).then(function(e){if(200==e.code||0==e.code){var s=JSON.stringify(e.data.pay);t.redirectTo({url:"../taskPaySuccess/taskPaySuccess?pay_log="+s})}else a.default.errorTips(e.msg),n.$data.isDisabled=!1}).catch(function(t){a.default.errorTips(t.msg),n.$data.isDisabled=!1})}else e.cancel&&(a.default.errorTips("你点击了取消"),n.$data.isDisabled=!1)}})}}}};e.default=c}).call(this,s("6e42")["default"])},f0d0:function(t,e,s){"use strict";var a=s("b82b"),i=s.n(a);i.a}},[["cc71","common/runtime","common/vendor"]]]);