(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chat/chat"],{"1dcc":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("scroll-view",{staticClass:"message-list",style:{height:t.scroll_height+"px"},attrs:{"upper-threshold":"20","scroll-into-view":t.toView,"scroll-top":t.scrollTop,"scroll-y":"isScrollY",focus:t.mode,"enable-back-to-top":"true",eventid:"73b8c1b7-6"},on:{scroll:t.bindscroll}},[a("view",{staticClass:"loding-img"},[t.noData?a("image",{attrs:{src:"/static/images/loading.gif"}}):t._e(),t.noData?t._e():a("view",[t._v("没有更多数据了")])]),a("view",{attrs:{id:"hideview"}},t._l(t.HideData,function(e,s){return a("view",{key:s,staticClass:"row"},[e.timeInterval&&""!=e.timeInterval?a("view",{staticClass:"datetime"},[t._v(t._s(e.timeInterval))]):t._e(),a("view",{staticClass:"body",style:{"flex-flow":e.fromUserId!=t.userId?"row":"row-reverse"}},[a("view",{staticClass:"avatar-container"},[a("image",{staticClass:"avatar",attrs:{src:e.fromUserId!=t.userId?t.fromUserPhoto:t.toUserPhoto}})]),"TEXT"==e.smsType?a("block",[a("view",{staticClass:"triangle",style:e.fromUserId==t.userId?"right: 110rpx; background: #7ECB4B":"left: 110rpx;"}),a("view",{staticClass:"msg-content",style:e.fromUserId==t.userId?"background: #7ECB4B;left:5rpx;":""},["TEXT"==e.smsType?a("text",{staticClass:"msg-text"},[t._v(t._s(e.content))]):t._e(),"VOICE"==e.smsType?a("audio",{staticStyle:{width:"100px",height:"20px"},attrs:{"data-id":"audio_"+s,src:e.content,eventid:"73b8c1b7-0-"+s},on:{tap:t.audioPlay}}):t._e()],1)]):t._e(),"IMAGE"==e.smsType?a("image",{staticClass:"picture",attrs:{src:e.content,mode:"widthFix","data-src":e.content,eventid:"73b8c1b7-1-"+s},on:{tap:t.preview}}):t._e(),e.fromUserId==t.userId&&e.smsStatus?a("block",[10==e.smsStatus?a("image",{staticClass:"msg-img",attrs:{src:"/static/images/loading.gif"}}):t._e(),20==e.smsStatus?a("icon",{staticClass:"msg-icon",attrs:{"data-key":s,type:"warn",size:"22",eventid:"73b8c1b7-2-"+s},on:{tap:t.retry}}):t._e()],1):t._e()],1),e.fromUserId==t.userId&&e.smsStatus?a("block",[40==e.smsStatus?a("text",{staticClass:"msg-status"},[t._v("已送达")]):t._e(),50==e.smsStatus?a("text",{staticClass:"msg-status msg-read"},[t._v("已读")]):t._e()]):t._e()],1)})),a("view",t._l(t.EventData,function(e,s){return a("view",{key:s,staticClass:"row",attrs:{id:"row_"+s}},[e.timeInterval&&""!=e.timeInterval?a("view",{staticClass:"datetime"},[t._v(t._s(e.timeInterval))]):t._e(),a("view",{staticClass:"body",style:{"flex-flow":e.fromUserId!=t.userId?"row":"row-reverse"}},[a("view",{staticClass:"avatar-container"},[a("image",{staticClass:"avatar",attrs:{src:e.fromUserId!=t.userId?t.fromUserPhoto:t.toUserPhoto}})]),"TEXT"==e.smsType?a("block",[a("view",{staticClass:"triangle",style:e.fromUserId==t.userId?"right: 110rpx; background: #7ECB4B":"left: 110rpx;"}),a("view",{staticClass:"msg-content",style:e.fromUserId==t.userId?"background: #7ECB4B;left:5rpx;":""},["TEXT"==e.smsType?a("text",{staticClass:"msg-text"},[t._v(t._s(e.content))]):t._e(),"VOICE"==e.smsType?a("audio",{staticStyle:{width:"100px",height:"20px"},attrs:{"data-id":"audio_"+s,src:e.content,eventid:"73b8c1b7-3-"+s},on:{tap:t.audioPlay}}):t._e()],1)]):t._e(),"IMAGE"==e.smsType?a("image",{staticClass:"picture",attrs:{src:e.content,mode:"widthFix","data-src":e.content,eventid:"73b8c1b7-4-"+s},on:{tap:t.preview}}):t._e(),e.fromUserId==t.userId&&e.smsStatus?a("block",[10==e.smsStatus?a("image",{staticClass:"msg-img",attrs:{src:"/static/images/loading.gif"}}):t._e(),20==e.smsStatus?a("icon",{staticClass:"msg-icon",attrs:{"data-key":s,type:"warn",size:"22",eventid:"73b8c1b7-5-"+s},on:{tap:t.retry}}):t._e()],1):t._e()],1),e.fromUserId==t.userId&&e.smsStatus?a("block",[40==e.smsStatus?a("text",{staticClass:"msg-status"},[t._v("已送达")]):t._e(),50==e.smsStatus?a("text",{staticClass:"msg-status msg-read"},[t._v("已读")]):t._e()]):t._e()],1)}))]),t.status!=t.state.normal?a("view",{staticClass:"hud-container"},[a("view",{staticClass:"hud-background"}),a("view",{staticClass:"hud-body"},[a("image",{attrs:{src:"./images/mic.png"}}),a("view",{staticClass:"tip",class:t.status==t.state.cancel?"warning":""},[t._v(t._s(t.tips[t.status]))])])]):t._e(),a("view",{staticClass:"height100"}),a("view",{staticClass:"reply"},[a("view",{staticClass:"opration-area ply"},[t.mode?a("input",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{"confirm-hold":"true",type:"text","confirm-type":"send",eventid:"73b8c1b7-7"},domProps:{value:t.content},on:{focus:t.inputShowed,confirm:t.reply,input:function(e){e.target.composing||(t.content=e.target.value)}}}):t._e()]),a("image",{staticClass:"choose-image ply",attrs:{src:"/static/images/image.png",eventid:"73b8c1b7-8"},on:{tap:t.chooseImage}})])],1)},o=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return o})},"2d20":function(t,e,a){"use strict";var s=o(a("d4cf"));function o(t){return t&&t.__esModule?t:{default:t}}var n="https://webapi.yidap.com";function r(t,e){for(var a=Object.keys(e).sort(),o={},n=0;n<a.length;n++)o[a[n]]=e[a[n]];var r="";for(var i in o)r+=i+"="+o[i]+"&";var c="";c=t.indexOf("https://webapi.yidap.com")>-1?t.split("https://webapi.yidap.com")[1]:t.split("https://apiv2.yidap.com")[1];var d=c+"?"+r.substring(0,r.length-1)+"zhong_pi_lian";return d=d.replace("sign=&",""),(0,s.default)(d)}Promise.prototype.finally=function(t){var e=this.constructor;return this.then(function(a){return e.resolve(t()).then(function(){return a})},function(a){return e.resolve(t()).then(function(){throw a})})};var i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0,a=arguments.length>2?arguments[2]:void 0,s=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0;return new Promise(function(n,i){var c=Date.parse(new Date),d=t.data||{};d.timestamp=c,d.sign=r(e,d),d.deviceId="wx",d.platformType="2",d.versionCode="4.0";var u=wx.getStorageSync("token")||"",l=wx.getStorageSync("token_type")||"Bearer",g={Accept:"application/json",Authorization:l+" "+u},f=e;void 0!=a&&(f=e+"/"+a),void 0!=s&&(f=f+"/"+s),void 0!=o&&(f=f+"?page="+o),wx.request({url:f,method:t.method||"GET",data:d,header:g,success:function(t){t=t.data;if(200===t.code||0===t.code)n(t);else{if(401===t.code){wx.hideLoading(),console.log("401统一处理");var e=wx.getStorageSync("fromCenter");wx.setStorageSync("fromCenter","0"),1!=e&&wx.showModal({title:"您尚未登录",content:"是否前往登录页面",confirmText:"前往",success:function(t){if(t.confirm)return wx.navigateTo({url:"../login/login"}),!1;t.cancel&&console.log("用户点击取消")}})}201===t.code&&wx.showToast({title:t.msg,icon:"none",duration:2e3}),i(t)}},fail:function(t){(t.errMsg||"request:fail timeout"===t.errMsg)&&(wx.showToast({title:"网络请求超时",image:"../../public/images/icon/error.png",duration:3e3}),wx.hideLoading())},complete:function(t){}})})},c=function(t){return i(t,"".concat(n,"/app/socket/getPhoto?userId=").concat(t.data.userId))},d=function(t){return i(t,"".concat(n,"/app/socket/getMessage"))},u=function(t){return i(t,"".concat(n,"/app/socket/getCacheMessage"))},l=function(t){return i(t,"".concat(n,"/app/socket/getPhoto"))};t.exports={getPhotoByIM:l,getCacheMessage:u,getMessageBySocket:d,getUserInfoformSocket:c}},"3ad9":function(t,e,a){"use strict";var s=a("67ad"),o=a.n(s);o.a},4082:function(t,e,a){"use strict";a.r(e);var s=a("1dcc"),o=a("c603");for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);a("3ad9");var r=a("2877"),i=Object(r["a"])(o["default"],s["a"],s["b"],!1,null,"c8bf0438",null);e["default"]=i.exports},"67ad":function(t,e,a){},8615:function(t,e,a){"use strict";a("a3d9");var s=n(a("b0ce")),o=n(a("4082"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(o.default))},"8bfb":function(t,e,a){"use strict";var s=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G"];function o(t){for(var e="",a=0;a<t;a++){var o=Math.ceil(17*Math.random());e+=s[o]}return e}t.exports={math:o}},b031:function(t,e,a){"use strict";function s(t){var e,a,s,o,r,i,c,d,p,I=Array(),y=7,S=12,$=17,w=22,C=5,T=9,b=14,x=20,_=4,E=11,D=16,P=23,U=6,k=10,M=15,B=21;for(t=v(t),I=m(t),i=1732584193,c=4023233417,d=2562383102,p=271733878,e=0;e<I.length;e+=16)a=i,s=c,o=d,r=p,i=u(i,c,d,p,I[e+0],y,3614090360),p=u(p,i,c,d,I[e+1],S,3905402710),d=u(d,p,i,c,I[e+2],$,606105819),c=u(c,d,p,i,I[e+3],w,3250441966),i=u(i,c,d,p,I[e+4],y,4118548399),p=u(p,i,c,d,I[e+5],S,1200080426),d=u(d,p,i,c,I[e+6],$,2821735955),c=u(c,d,p,i,I[e+7],w,4249261313),i=u(i,c,d,p,I[e+8],y,1770035416),p=u(p,i,c,d,I[e+9],S,2336552879),d=u(d,p,i,c,I[e+10],$,4294925233),c=u(c,d,p,i,I[e+11],w,2304563134),i=u(i,c,d,p,I[e+12],y,1804603682),p=u(p,i,c,d,I[e+13],S,4254626195),d=u(d,p,i,c,I[e+14],$,2792965006),c=u(c,d,p,i,I[e+15],w,1236535329),i=l(i,c,d,p,I[e+1],C,4129170786),p=l(p,i,c,d,I[e+6],T,3225465664),d=l(d,p,i,c,I[e+11],b,643717713),c=l(c,d,p,i,I[e+0],x,3921069994),i=l(i,c,d,p,I[e+5],C,3593408605),p=l(p,i,c,d,I[e+10],T,38016083),d=l(d,p,i,c,I[e+15],b,3634488961),c=l(c,d,p,i,I[e+4],x,3889429448),i=l(i,c,d,p,I[e+9],C,568446438),p=l(p,i,c,d,I[e+14],T,3275163606),d=l(d,p,i,c,I[e+3],b,4107603335),c=l(c,d,p,i,I[e+8],x,1163531501),i=l(i,c,d,p,I[e+13],C,2850285829),p=l(p,i,c,d,I[e+2],T,4243563512),d=l(d,p,i,c,I[e+7],b,1735328473),c=l(c,d,p,i,I[e+12],x,2368359562),i=g(i,c,d,p,I[e+5],_,4294588738),p=g(p,i,c,d,I[e+8],E,2272392833),d=g(d,p,i,c,I[e+11],D,1839030562),c=g(c,d,p,i,I[e+14],P,4259657740),i=g(i,c,d,p,I[e+1],_,2763975236),p=g(p,i,c,d,I[e+4],E,1272893353),d=g(d,p,i,c,I[e+7],D,4139469664),c=g(c,d,p,i,I[e+10],P,3200236656),i=g(i,c,d,p,I[e+13],_,681279174),p=g(p,i,c,d,I[e+0],E,3936430074),d=g(d,p,i,c,I[e+3],D,3572445317),c=g(c,d,p,i,I[e+6],P,76029189),i=g(i,c,d,p,I[e+9],_,3654602809),p=g(p,i,c,d,I[e+12],E,3873151461),d=g(d,p,i,c,I[e+15],D,530742520),c=g(c,d,p,i,I[e+2],P,3299628645),i=f(i,c,d,p,I[e+0],U,4096336452),p=f(p,i,c,d,I[e+7],k,1126891415),d=f(d,p,i,c,I[e+14],M,2878612391),c=f(c,d,p,i,I[e+5],B,4237533241),i=f(i,c,d,p,I[e+12],U,1700485571),p=f(p,i,c,d,I[e+3],k,2399980690),d=f(d,p,i,c,I[e+10],M,4293915773),c=f(c,d,p,i,I[e+1],B,2240044497),i=f(i,c,d,p,I[e+8],U,1873313359),p=f(p,i,c,d,I[e+15],k,4264355552),d=f(d,p,i,c,I[e+6],M,2734768916),c=f(c,d,p,i,I[e+13],B,1309151649),i=f(i,c,d,p,I[e+4],U,4149444226),p=f(p,i,c,d,I[e+11],k,3174756917),d=f(d,p,i,c,I[e+2],M,718787259),c=f(c,d,p,i,I[e+9],B,3951481745),i=n(i,a),c=n(c,s),d=n(d,o),p=n(p,r);return h(i)+h(c)+h(d)+h(p)}function o(t,e){return t<<e|t>>>32-e}function n(t,e){var a,s,o,n,r;return o=2147483648&t,n=2147483648&e,a=1073741824&t,s=1073741824&e,r=(1073741823&t)+(1073741823&e),a&s?2147483648^r^o^n:a|s?1073741824&r?3221225472^r^o^n:1073741824^r^o^n:r^o^n}function r(t,e,a){return t&e|~t&a}function i(t,e,a){return t&a|e&~a}function c(t,e,a){return t^e^a}function d(t,e,a){return e^(t|~a)}function u(t,e,a,s,i,c,d){return t=n(t,n(n(r(e,a,s),i),d)),n(o(t,c),e)}function l(t,e,a,s,r,c,d){return t=n(t,n(n(i(e,a,s),r),d)),n(o(t,c),e)}function g(t,e,a,s,r,i,d){return t=n(t,n(n(c(e,a,s),r),d)),n(o(t,i),e)}function f(t,e,a,s,r,i,c){return t=n(t,n(n(d(e,a,s),r),c)),n(o(t,i),e)}function m(t){var e,a=t.length,s=a+8,o=(s-s%64)/64,n=16*(o+1),r=Array(n-1),i=0,c=0;while(c<a)e=(c-c%4)/4,i=c%4*8,r[e]=r[e]|t.charCodeAt(c)<<i,c++;return e=(c-c%4)/4,i=c%4*8,r[e]=r[e]|128<<i,r[n-2]=a<<3,r[n-1]=a>>>29,r}function h(t){var e,a,s="",o="";for(a=0;a<=3;a++)e=t>>>8*a&255,o="0"+e.toString(16),s+=o.substr(o.length-2,2);return s}function v(t){for(var e="",a=0;a<t.length;a++){var s=t.charCodeAt(a);s<128?e+=String.fromCharCode(s):s>127&&s<2048?(e+=String.fromCharCode(s>>6|192),e+=String.fromCharCode(63&s|128)):(e+=String.fromCharCode(s>>12|224),e+=String.fromCharCode(s>>6&63|128),e+=String.fromCharCode(63&s|128))}return e}t.exports={md5:s}},c603:function(t,e,a){"use strict";a.r(e);var s=a("e01e"),o=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);e["default"]=o.a},e01e:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=c(a("0089")),o=c(a("2d20")),n=c(a("e378")),r=c(a("b031")),i=c(a("8bfb"));function c(t){return t&&t.__esModule?t:{default:t}}var d={data:function(){return{content:"",isFalse:!1,inputShowed:!1,isConfirmHold:!0,isScrollY:!0,toId:"",sms:0,baseUrl:"https://webapi.yidap.com",message_list:[],scroll_height:wx.getSystemInfoSync().windowHeight,page_index:0,mode:!0,cancel:!1,status:0,tips:["按住 说话","松开 结束","取消 发送"],state:{normal:0,pressed:1,cancel:2},toView:"",userId:wx.getStorageSync("userId"),to_avatar_path:"https://static.yidap.com/miniapp/o2o/imgs/collection@2x.png",currentPage:2,pageSize:10,scrollLoading:0,HideData:[],EventData:[],NoMoreEvent:0,noData:!0,fromUserPhoto:"",toUserPhoto:"",userInfoId:"",maxlength:500,messageCache:[],prevIndex:-1,totalSize:"",scrollTop:0}},onLoad:function(e){var a=t.getStorageSync("avatar_path"),s=t.getStorageSync("userId");e.id?this.$data.toId=e.id:this.$data.toId=e.toUserId,t.setNavigationBarTitle({title:e.fmUserName}),this.$data.prevIndex=e.chatListIndex?e.chatListIndex:-1,this.$data.fromUserPhoto=e.fromUserPhoto?e.fromUserPhoto:"https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png",this.$data.toUserPhoto=a||"https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png",this.$data.userInfoId=parseInt(s)>parseInt(this.$data.toId)?r.default.md5(this.$data.toId+s):r.default.md5(s+this.$data.toId);var o={fromUserId:s,toUserId:this.$data.toId,content:"page",smsType:"TEXT",sysType:1,smsStatus:10,smsList:!1,currentPage:1,pageSize:10};this.sendSocketMessage(JSON.stringify(o))},mounted:function(){},onShow:function(){var e=this;this.globalData.callback=function(a){console.log("--\x3e>",a);var s=a;if("0"!=String(s.userInfoId)){var o=e.$data.HideData;e.$data.EventData;if(s&&s.list){e.$data.totalSize=s.totalSize;var n=s.list;if(!(n.length>0))return e.$data.noData=!1,!1;e.$data.currentPage>2&&(e.$data.HideData=n,e.$data.noData=!0),o=n.concat(o),e.$data.currentPage<=2?(e.$data.EventData=o,e.$data.toView="row_10",e.scrollToBottom()):e.$data.HideData=n;var r=e.$data.totalSize-e.$data.EventData.length-e.$data.HideData.length;if(0==r){e.$data.noData=!1;var i=t.createSelectorQuery();i.select("#hideview").boundingClientRect(),i.exec(function(t){e.$data.scrollTop=t[0].height})}}else{if(s instanceof Array){var c=getCurrentPages(),d=c[c.length-2];return void(d.$data.lists=s)}if(0==s.fromUserId){if(-1!=s.content.indexOf("消息含有敏感内容")){var u=e.$data.messageCache.findIndex(function(t,e){return t.messageId==s.messageId});if(-1!=u){var l=e.$data.messageCache[u];e.$data.EventData[l.index].smsStatus=s.smsStatus,e.$data.messageCache.splice(u,1),clearTimeout(l.delay)}return}if(e.$data.messageCache.length>0)if(s.currentPage&&""!=s.currentPage)e.$data.messageCache.forEach(function(t,a){e.$data.EventData[t.index].smsStatus=s.smsStatus}),e.$data.messageCache=[];else{var g=e.$data.messageCache.findIndex(function(t,e){return t.messageId==s.messageId});if(-1!=g){var f=e.$data.messageCache[g];e.$data.EventData[f.index].smsStatus=s.smsStatus,50==s.smsStatus&&e.$data.messageCache.splice(g,1),clearTimeout(f.delay)}}return}var m={id:s.id,fromUserId:0,toUserId:s.fromUserId,messageId:s.messageId,content:"page",smsType:"TEXT",sysType:1,smsStatus:50,smsList:!1,currentPage:"",pageSize:""};e.sendSocketMessage(JSON.stringify(m)),console.log("通知对方我已经阅读消息"),s.userInfoId==e.$data.userInfoId&&e.$data.EventData.push(s),e.scrollToBottom(),e.getPrevPage(!0,s)}e.$data.currentPage<=2&&setTimeout(function(){e.bindscrolltoupper1()},1e3),e.$data.scrollLoading=0}}},methods:{bindscroll:function(e){var a=this;if(1==a.$data.scrollLoading)return!1;if(!a.$data.noData)return!1;if(e.detail.scrollTop<=10){var s=t.createSelectorQuery();s.select("#hideview").boundingClientRect(),s.exec(function(t){var e=a.$data.EventData,s=a.$data.HideData;if(e=s.concat(a.$data.EventData),""==s||!s)return a.$data.NoMoreEvent=1,a.$data.scrollTop=0,!1;var o=a.$data.totalSize-a.$data.EventData.length-a.$data.HideData.length;o<10?setTimeout(function(){a.$data.EventData=e,a.bindscrolltoupper1()},1e3):setTimeout(function(){a.$data.EventData=e,a.$data.scrollTop=t[0].height,a.bindscrolltoupper1()},1e3)})}},bindscrolltoupper1:function(){var e=this;if(1==e.$data.scrollLoading)return!1;e.$data.scrollLoading=1;var a=this.$data.currentPage++,s=this.$data.pageSize;console.log("currentPage:"+a),t.showNavigationBarLoading();var o=t.getStorageSync("userId"),n=this.$data.toId,r={fromUserId:o,toUserId:n,content:"page",smsType:"TEXT",sysType:1,smsStatus:10,smsList:!1,currentPage:a,pageSize:s};console.log("下拉message：",r),this.sendSocketMessage(JSON.stringify(r)),t.hideNavigationBarLoading(),t.stopPullDownRefresh()},getPrevPage:function(t,e){if(-1!=this.$data.prevIndex){var a=getCurrentPages(),s=a[a.length-2],o=s.$data.lists;if(t){var n=s.$data.lists,r=n.findIndex(function(t,a){return t.userInfoId=e.userInfoId});-1!=r?n[this.$data.prevIndex].userMessage=e:s.onSend()}else{var i=new Date,c={content:e.content,createTime:i.getTime(),dateTime:i.getHours()+":"+i.getMinutes(),fromUserId:e.fromUserId,smsStatus:30,smsType:e.smsType,toUserId:e.toUserId,userInfoId:e.userInfoId};o[this.$data.prevIndex].userMessage=c}s.$data.lists=o}},getMessageBySocket:function(){var e={};e.userId=t.getStorageSync("userId"),o.default.getMessageBySocket({method:"POST",data:e}).then(function(t){})},getUserInfoformSocket:function(){var e=this,a={};a.userId=t.getStorageSync("userId"),o.default.getUserInfoformSocket({method:"POST",data:a}).then(function(t){e.$data.to_avatar_path=t.avatar_path})},audioPlay:function(e){var a=e.currentTarget.dataset.id;this.audioCtx=t.createAudioContext(a),this.audioCtx.play()},reply:function(e){var a=this,s=this,o=e?e.detail.value:this.$data.content;if(this.$data.content=o,""!=o){var n=this.$data.EventData,c=t.getStorageSync("userId"),d=this.$data.toId,u=(new Date).getTime()+c+d+i.default.math(5);u=r.default.md5(u);var l={fromUserId:c,toUserId:d,messageId:u,content:o,smsType:"TEXT",sysType:1,smsStatus:10,smsList:!1,currentPage:"",pageSize:""};this.globalData.localSocket.send({data:JSON.stringify(l),success:function(){console.log("sendSocketMessage:成功了");var t=n.push(l);console.log(n),s.$data.inputShowed=!0,s.$data.EventData=n,s.$data.content="",s.timeout(u,t-1),s.getPrevPage(!1,l)},fail:function(){s.sendError(len-1)}}),console.log("EventData --\x3e"),console.log(this.$data.EventData),setTimeout(function(){a.scrollToBottom()},100)}else t.showToast({title:"总要写点什么吧"})},chooseImage:function(){var e=this,a=this;t.chooseImage({count:9,sizeType:["compressed"],sourceType:["album","camera"],success:function(t){var s=t.tempFilePaths;console.log("选择的图片",s),s.forEach(function(t){var s=wx.getStorageSync("userId"),o=e.$data.toId,n=t,c=(new Date).getTime()+s+o+i.default.math(5);c=r.default.md5(c);var d={fromUserId:s,toUserId:o,messageId:c,content:n,smsType:"IMAGE",sysType:1,smsStatus:10,smsList:!1,currentPage:"",pageSize:""},u=a.$data.EventData,l=u.push(d);a.$data.EventData=u,e.upload(t,"image",d,l)})}})},preview:function(e){var a=e.currentTarget.dataset.src,s=a.indexOf("?");-1!=s&&(a=a.substring(0,s)+"?x-oss-process=style/big"),t.previewImage({current:a,urls:[a]})},switchMode:function(){},record:function(){console.log("------------------"),console.log(this.$data.cancel);var t=this;wx.startRecord({success:function(e){console.log("------------------"),console.log(t.$data.cancel),t.$data.cancel||t.upload(e.tempFilePath,"voice")},fail:function(t){console.log(t)},complete:function(t){console.log(t)}})},stop:function(){t.stopRecord()},touchStart:function(t){var e=t.touches[0].clientY;this.setData({startY:e,status:this.$data.state.pressed})},touchMove:function(t){var e=t.touches[0].clientY,a=this.$data.startY-e;this.setData({status:a>50?this.$data.state.cancel:this.$data.state.pressed})},touchEnd:function(t){var e=t.changedTouches[0].clientY,a=this.$data.startY-e;this.setData({cancel:a>50,status:this.$data.state.normal}),this.stop()},upload:function(e,a,o,r){var i=this,c=this;if("image"==a){var d=t.getStorageSync("access_token")||t.getStorageSync("token")||"",u={file:"[object Object]",type:"big"},l=Date.parse(new Date);u.timestamp=l,u.sign=n.default.makeSign(s.default.apiUrl+"/api/upload",u),u.deviceId="wx",u.platformType="1",u.versionCode="4.0";t.uploadFile({url:"".concat(s.default.apiUrl,"/api/upload"),filePath:e,name:"file",header:{"content-type":"multipart/form-data",Accept:"application/json",Authorization:"Bearer ".concat(d)},formData:u,success:function(t){console.log(t);t=JSON.parse(t.data);200===t.code||0===t.code?(o.content=t.data,i.globalData.localSocket.send({data:JSON.stringify(o),success:function(){c.timeout(o.messageId,r-1),c.getPrevPage(!1,o)},fail:function(){c.sendError(r-1)}})):c.sendError(r-1)},fail:function(t){c.sendError(r-1)},complete:function(){i.scrollToBottom()}})}setTimeout(function(){i.scrollToBottom(),t.hideLoading()},300)},sendError:function(t){var e=this,a=this.$data.EventData[t];a&&(a.smsStatus=20,e.$data.EventData=e.$data.EventData)},timeout:function(t,e){var a=this,s=this,o=setTimeout(function(){if(s.$data.messageCache.length>0){var o=s.$data.messageCache.findIndex(function(e,a){return e.messageId==t});-1!=o&&(s.$data.EventData[e].smsStatus=20,s.$data.EventData=s.$data.EventData,clearTimeout(a))}},6e4);s.$data.messageCache.push({messageId:t,delay:o,index:e})},retry:function(t){var e=this,a=t.currentTarget.dataset.key,s=e.$data.EventData[a];s&&(s.smsStatus=10,e.$data.EventData=e.$data.EventData,this.globalData.localSocket.send({data:JSON.stringify(s),success:function(){e.timeout(s.messageId,a)},fail:function(){console.log("消息重试失败")}}))},scrollToBottom:function(){this.$data.toView="row_"+(this.$data.EventData.length-1)}}};e.default=d}).call(this,a("6e42")["default"])}},[["8615","common/runtime","common/vendor"]]]);