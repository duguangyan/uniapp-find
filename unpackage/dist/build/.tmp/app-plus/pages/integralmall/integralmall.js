(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integralmall/integralmall"],{1203:function(t,e,n){"use strict";n.r(e);var a=n("ff20"),r=n.n(a);for(var d in a)"default"!==d&&function(t){n.d(e,t,function(){return a[t]})}(d);e["default"]=r.a},4343:function(t,e,n){"use strict";n.r(e);var a=n("c931"),r=n("1203");for(var d in r)"default"!==d&&function(t){n.d(e,t,function(){return r[t]})}(d);var o=n("2877"),u=Object(o["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},a5cd:function(t,e,n){"use strict";n("a3d9");var a=d(n("b0ce")),r=d(n("4343"));function d(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(r.default))},c931:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",[n("web-view",{attrs:{src:t.url,mpcomid:"1d1893b7-0"}})],1)},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},ff20:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{url:"https://integralmall.yidap.com?token="+t.getStorageSync("token"),token:"",addressId:""}},onLoad:function(e){this.$data.nowTime=parseInt((new Date).getTime()/1e3),this.$data.token=t.getStorageSync("token"),e.addressId&&(this.$data.addressId=e.addressId),this.$data.url="https://integralmall.yidap.com?token="+this.$data.token+"&addressId="+this.$data.addressId+"&nowTime="+this.$data.nowTime},onShow:function(){},methods:{}};e.default=n}).call(this,n("6e42")["default"])}},[["a5cd","common/runtime","common/vendor"]]]);