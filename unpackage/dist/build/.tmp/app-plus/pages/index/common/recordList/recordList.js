(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/common/recordList/recordList"],{"7bbc":function(t,a,e){"use strict";e.r(a);var s=e("9f95"),n=e.n(s);for(var o in s)"default"!==o&&function(t){e.d(a,t,function(){return s[t]})}(o);a["default"]=n.a},9913:function(t,a,e){},"9f95":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=n(e("0089"));n(e("e378"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{records:"",now_amount:"",total_amount:"",list:[],footerText:"没有更多信息了",page:1,pageIndex:1}},onLoad:function(a){1==a.index?(this.$data.pageIndex=1,t.setNavigationBarTitle({title:"佣金明细"})):(this.$data.pageIndex=2,t.setNavigationBarTitle({title:"代采明细"}))},onShow:function(){this.getRecords()},methods:{goCash:function(){t.navigateTo({url:"../cash/cash?now_amount="+this.$data.records.now_amount+"&pageIndex="+this.$data.pageIndex})},getMore:function(){"点击加载更多"==this.$data.footerText&&(this.$data.page++,this.getRecords())},getRecords:function(){var t=this;1==this.$data.page&&(this.$data.list=[]),2==this.$data.pageIndex?s.default.staffReplace({data:{page:this.$data.page}}).then(function(a){200!=a.code&&0!=a.code||(t.$data.records=a.data,t.$data.now_amount=a.data.now_amount,t.$data.total_amount=a.data.total_amount,t.$data.list=t.$data.list.concat(a.data.list),a.data.list.length<10?t.$data.footerText="没有更多信息了":t.$data.footerText="点击加载更多")}):1==this.$data.pageIndex&&s.default.staffCommissions({data:{page:this.$data.page}}).then(function(a){200!=a.code&&0!=a.code||(t.$data.records=a.data,t.$data.now_amount=a.data.now_amount,t.$data.total_amount=a.data.total_amount,t.$data.list=t.$data.list.concat(a.data.list),a.data.list.length<10?t.$data.footerText="没有更多信息了":t.$data.footerText="点击加载更多")})}}};a.default=o}).call(this,e("6e42")["default"])},a8d3:function(t,a,e){"use strict";var s=e("9913"),n=e.n(s);n.a},b1c9:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"record"},[e("view",{staticClass:"cf top"},[e("view",{staticClass:"fll"},[e("view",{staticClass:"t1"},[t._v("当前佣金(元)")]),e("view",{staticClass:"t2"},[t._v(t._s(t.records.now_amount))])]),e("view",{staticClass:"line"}),e("view",{staticClass:"fll"},[e("view",{staticClass:"t1"},[t._v("累计佣金(元)")]),e("view",{staticClass:"t2"},[t._v(t._s(t.records.total_amount))])])]),e("view",{staticClass:"content"},[e("view",{staticClass:"get-price",attrs:{eventid:"2584e000-0"},on:{click:t.goCash}},[t._v("提现")])]),e("view",{staticClass:"items"},t._l(t.list,function(a,s){return e("view",{key:s,staticClass:"item cf"},[e("view",{staticClass:"fll fs28"},[t._v(t._s(a.created_at))]),e("view",{staticClass:"flr fs24 text-999"},[t._v("获得金额: ￥"+t._s(a.change_amount))])])})),e("view",{staticClass:"footer-text",attrs:{eventid:"2584e000-1"},on:{click:t.getMore}},[t._v(t._s(t.footerText))])])},n=[];e.d(a,"a",function(){return s}),e.d(a,"b",function(){return n})},e665:function(t,a,e){"use strict";e("a3d9");var s=o(e("b0ce")),n=o(e("f8da"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))},f8da:function(t,a,e){"use strict";e.r(a);var s=e("b1c9"),n=e("7bbc");for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);e("a8d3");var i=e("2877"),d=Object(i["a"])(n["default"],s["a"],s["b"],!1,null,"043a0a44",null);a["default"]=d.exports}},[["e665","common/runtime","common/vendor"]]]);