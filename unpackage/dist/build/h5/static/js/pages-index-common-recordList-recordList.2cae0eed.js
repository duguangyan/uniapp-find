(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-common-recordList-recordList"],{"29b8":function(t,a,e){"use strict";var n=e("b79b"),i=e.n(n);i.a},"5c8c":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("0089"));i(e("e378"));function i(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{records:"",now_amount:"",total_amount:"",list:[],footerText:"没有更多信息了",page:1,pageIndex:1}},onLoad:function(t){1==t.index?(this.$data.pageIndex=1,uni.setNavigationBarTitle({title:"佣金明细"})):(this.$data.pageIndex=2,uni.setNavigationBarTitle({title:"代采明细"}))},onShow:function(){this.getRecords()},methods:{goCash:function(){uni.navigateTo({url:"../cash/cash?now_amount="+this.$data.records.now_amount+"&pageIndex="+this.$data.pageIndex})},getMore:function(){"点击加载更多"==this.$data.footerText&&(this.$data.page++,this.getRecords())},getRecords:function(){var t=this;1==this.$data.page&&(this.$data.list=[]),2==this.$data.pageIndex?n.default.staffReplace({data:{page:this.$data.page}}).then(function(a){200!=a.code&&0!=a.code||(t.$data.records=a.data,t.$data.now_amount=a.data.now_amount,t.$data.total_amount=a.data.total_amount,t.$data.list=t.$data.list.concat(a.data.list),a.data.list.length<10?t.$data.footerText="没有更多信息了":t.$data.footerText="点击加载更多")}):1==this.$data.pageIndex&&n.default.staffCommissions({data:{page:this.$data.page}}).then(function(a){200!=a.code&&0!=a.code||(t.$data.records=a.data,t.$data.now_amount=a.data.now_amount,t.$data.total_amount=a.data.total_amount,t.$data.list=t.$data.list.concat(a.data.list),a.data.list.length<10?t.$data.footerText="没有更多信息了":t.$data.footerText="点击加载更多")})}}};a.default=o},"7bbcc":function(t,a,e){"use strict";e.r(a);var n=e("5c8c"),i=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);a["default"]=i.a},"8c55":function(t,a,e){a=t.exports=e("2350")(!1),a.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.record[data-v-1cdc3e54]{height:100%;background:#f5f5f5}.record .footer-text[data-v-1cdc3e54]{line-height:%?100?%;text-align:center;font-size:%?24?%;color:#999}.record .top[data-v-1cdc3e54]{background:#fff}.record .content[data-v-1cdc3e54]{background:#fff;height:%?100?%;line-height:%?100?%;padding-top:%?40?%}.record .content .get-price[data-v-1cdc3e54]{width:%?186?%;height:%?60?%;line-height:%?60?%;text-align:center;background:#f29800;color:#fff;border-radius:%?60?%;margin:0 auto;font-size:%?38?%}.record .cf[data-v-1cdc3e54]{width:%?750?%;height:%?194?%;line-height:%?96?%;position:relative;border-bottom:%?1?% solid #eee}.record .cf .fll[data-v-1cdc3e54]{text-align:center;font-weight:600;width:50%}.record .cf .fll .t1[data-v-1cdc3e54]{font-size:%?24?%}.record .cf .fll .t2[data-v-1cdc3e54]{font-size:%?38?%;color:#f29800}.record .cf .line[data-v-1cdc3e54]{position:absolute;width:%?2?%;height:%?100?%;background:#eee;left:%?374?%;top:%?50?%}.record .items .item[data-v-1cdc3e54]{background:#fff;height:%?80?%;margin-top:%?20?%;line-height:%?80?%}.record .items .item .fll[data-v-1cdc3e54]{text-align:left;margin-left:%?30?%}.record .items .item .flr[data-v-1cdc3e54]{text-align:right;margin-right:%?30?%}',""])},"9bda":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"record"},[e("v-uni-view",{staticClass:"cf top"},[e("v-uni-view",{staticClass:"fll"},[e("v-uni-view",{staticClass:"t1"},[t._v("当前佣金(元)")]),e("v-uni-view",{staticClass:"t2"},[t._v(t._s(t.records.now_amount))])],1),e("v-uni-view",{staticClass:"line"}),e("v-uni-view",{staticClass:"fll"},[e("v-uni-view",{staticClass:"t1"},[t._v("累计佣金(元)")]),e("v-uni-view",{staticClass:"t2"},[t._v(t._s(t.records.total_amount))])],1)],1),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"get-price",on:{click:function(a){a=t.$handleEvent(a),t.goCash(a)}}},[t._v("提现")])],1),e("v-uni-view",{staticClass:"items"},t._l(t.list,function(a,n){return e("v-uni-view",{key:n,staticClass:"item cf"},[e("v-uni-view",{staticClass:"fll fs28"},[t._v(t._s(a.created_at))]),e("v-uni-view",{staticClass:"flr fs24 text-999"},[t._v("获得金额: ￥"+t._s(a.change_amount))])],1)}),1),e("v-uni-view",{staticClass:"footer-text",on:{click:function(a){a=t.$handleEvent(a),t.getMore(a)}}},[t._v(t._s(t.footerText))])],1)},i=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return i})},b79b:function(t,a,e){var n=e("8c55");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("4f06").default;i("49170c5e",n,!0,{sourceMap:!1,shadowMode:!1})},f8da:function(t,a,e){"use strict";e.r(a);var n=e("9bda"),i=e("7bbcc");for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);e("29b8");var c=e("2877"),s=Object(c["a"])(i["default"],n["a"],n["b"],!1,null,"1cdc3e54",null);a["default"]=s.exports}}]);