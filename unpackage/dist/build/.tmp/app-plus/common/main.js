(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"2f62":function(t,e,o){"use strict";o.r(e),o.d(e,"Store",function(){return m}),o.d(e,"install",function(){return D}),o.d(e,"mapState",function(){return $}),o.d(e,"mapMutations",function(){return A}),o.d(e,"mapGetters",function(){return T}),o.d(e,"mapActions",function(){return E}),o.d(e,"createNamespacedHelpers",function(){return C});
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var n=function(t){var e=Number(t.version.split(".")[0]);if(e>=2)t.mixin({beforeCreate:n});else{var o=t.prototype._init;t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[n].concat(t.init):n,o.call(this,t)}}function n(){var t=this.$options;t.store?this.$store="function"===typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}},i="undefined"!==typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function a(t){i&&(t._devtoolHook=i,i.emit("vuex:init",t),i.on("vuex:travel-to-state",function(e){t.replaceState(e)}),t.subscribe(function(t,e){i.emit("vuex:mutation",t,e)}))}function c(t,e){Object.keys(t).forEach(function(o){return e(t[o],o)})}function r(t){return null!==t&&"object"===typeof t}function s(t){return t&&"function"===typeof t.then}var u=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var o=t.state;this.state=("function"===typeof o?o():o)||{}},l={namespaced:{configurable:!0}};l.namespaced.get=function(){return!!this._rawModule.namespaced},u.prototype.addChild=function(t,e){this._children[t]=e},u.prototype.removeChild=function(t){delete this._children[t]},u.prototype.getChild=function(t){return this._children[t]},u.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},u.prototype.forEachChild=function(t){c(this._children,t)},u.prototype.forEachGetter=function(t){this._rawModule.getters&&c(this._rawModule.getters,t)},u.prototype.forEachAction=function(t){this._rawModule.actions&&c(this._rawModule.actions,t)},u.prototype.forEachMutation=function(t){this._rawModule.mutations&&c(this._rawModule.mutations,t)},Object.defineProperties(u.prototype,l);var f=function(t){this.register([],t,!1)};function d(t,e,o){if(e.update(o),o.modules)for(var n in o.modules){if(!e.getChild(n))return void 0;d(t.concat(n),e.getChild(n),o.modules[n])}}f.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},f.prototype.getNamespace=function(t){var e=this.root;return t.reduce(function(t,o){return e=e.getChild(o),t+(e.namespaced?o+"/":"")},"")},f.prototype.update=function(t){d([],this.root,t)},f.prototype.register=function(t,e,o){var n=this;void 0===o&&(o=!0);var i=new u(e,o);if(0===t.length)this.root=i;else{var a=this.get(t.slice(0,-1));a.addChild(t[t.length-1],i)}e.modules&&c(e.modules,function(e,i){n.register(t.concat(i),e,o)})},f.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),o=t[t.length-1];e.getChild(o).runtime&&e.removeChild(o)};var p;var m=function(t){var e=this;void 0===t&&(t={}),!p&&"undefined"!==typeof window&&window.Vue&&D(window.Vue);var o=t.plugins;void 0===o&&(o=[]);var n=t.strict;void 0===n&&(n=!1);var i=t.state;void 0===i&&(i={}),"function"===typeof i&&(i=i()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new f(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new p;var c=this,r=this,s=r.dispatch,u=r.commit;this.dispatch=function(t,e){return s.call(c,t,e)},this.commit=function(t,e,o){return u.call(c,t,e,o)},this.strict=n,y(this,i,[],this._modules.root),v(this,i),o.forEach(function(t){return t(e)}),p.config.devtools&&a(this)},h={state:{configurable:!0}};function g(t,e){return e.indexOf(t)<0&&e.push(t),function(){var o=e.indexOf(t);o>-1&&e.splice(o,1)}}function _(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var o=t.state;y(t,o,[],t._modules.root,!0),v(t,o,e)}function v(t,e,o){var n=t._vm;t.getters={};var i=t._wrappedGetters,a={};c(i,function(e,o){a[o]=function(){return e(t)},Object.defineProperty(t.getters,o,{get:function(){return t._vm[o]},enumerable:!0})});var r=p.config.silent;p.config.silent=!0,t._vm=new p({data:{$$state:e},computed:a}),p.config.silent=r,t.strict&&M(t),n&&(o&&t._withCommit(function(){n._data.$$state=null}),p.nextTick(function(){return n.$destroy()}))}function y(t,e,o,n,i){var a=!o.length,c=t._modules.getNamespace(o);if(n.namespaced&&(t._modulesNamespaceMap[c]=n),!a&&!i){var r=P(e,o.slice(0,-1)),s=o[o.length-1];t._withCommit(function(){p.set(r,s,n.state)})}var u=n.context=b(t,c,o);n.forEachMutation(function(e,o){var n=c+o;S(t,n,e,u)}),n.forEachAction(function(e,o){var n=e.root?o:c+o,i=e.handler||e;k(t,n,i,u)}),n.forEachGetter(function(e,o){var n=c+o;O(t,n,e,u)}),n.forEachChild(function(n,a){y(t,e,o.concat(a),n,i)})}function b(t,e,o){var n=""===e,i={dispatch:n?t.dispatch:function(o,n,i){var a=j(o,n,i),c=a.payload,r=a.options,s=a.type;return r&&r.root||(s=e+s),t.dispatch(s,c)},commit:n?t.commit:function(o,n,i){var a=j(o,n,i),c=a.payload,r=a.options,s=a.type;r&&r.root||(s=e+s),t.commit(s,c,r)}};return Object.defineProperties(i,{getters:{get:n?function(){return t.getters}:function(){return w(t,e)}},state:{get:function(){return P(t.state,o)}}}),i}function w(t,e){var o={},n=e.length;return Object.keys(t.getters).forEach(function(i){if(i.slice(0,n)===e){var a=i.slice(n);Object.defineProperty(o,a,{get:function(){return t.getters[i]},enumerable:!0})}}),o}function S(t,e,o,n){var i=t._mutations[e]||(t._mutations[e]=[]);i.push(function(e){o.call(t,n.state,e)})}function k(t,e,o,n){var i=t._actions[e]||(t._actions[e]=[]);i.push(function(e,i){var a=o.call(t,{dispatch:n.dispatch,commit:n.commit,getters:n.getters,state:n.state,rootGetters:t.getters,rootState:t.state},e,i);return s(a)||(a=Promise.resolve(a)),t._devtoolHook?a.catch(function(e){throw t._devtoolHook.emit("vuex:error",e),e}):a})}function O(t,e,o,n){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(t){return o(n.state,n.getters,t.state,t.getters)})}function M(t){t._vm.$watch(function(){return this._data.$$state},function(){0},{deep:!0,sync:!0})}function P(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function j(t,e,o){return r(t)&&t.type&&(o=e,e=t,t=t.type),{type:t,payload:e,options:o}}function D(t){p&&t===p||(p=t,n(p))}h.state.get=function(){return this._vm._data.$$state},h.state.set=function(t){0},m.prototype.commit=function(t,e,o){var n=this,i=j(t,e,o),a=i.type,c=i.payload,r=(i.options,{type:a,payload:c}),s=this._mutations[a];s&&(this._withCommit(function(){s.forEach(function(t){t(c)})}),this._subscribers.forEach(function(t){return t(r,n.state)}))},m.prototype.dispatch=function(t,e){var o=this,n=j(t,e),i=n.type,a=n.payload,c={type:i,payload:a},r=this._actions[i];if(r)return this._actionSubscribers.forEach(function(t){return t(c,o.state)}),r.length>1?Promise.all(r.map(function(t){return t(a)})):r[0](a)},m.prototype.subscribe=function(t){return g(t,this._subscribers)},m.prototype.subscribeAction=function(t){return g(t,this._actionSubscribers)},m.prototype.watch=function(t,e,o){var n=this;return this._watcherVM.$watch(function(){return t(n.state,n.getters)},e,o)},m.prototype.replaceState=function(t){var e=this;this._withCommit(function(){e._vm._data.$$state=t})},m.prototype.registerModule=function(t,e,o){void 0===o&&(o={}),"string"===typeof t&&(t=[t]),this._modules.register(t,e),y(this,this.state,t,this._modules.get(t),o.preserveState),v(this,this.state)},m.prototype.unregisterModule=function(t){var e=this;"string"===typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var o=P(e.state,t.slice(0,-1));p.delete(o,t[t.length-1])}),_(this)},m.prototype.hotUpdate=function(t){this._modules.update(t),_(this,!0)},m.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(m.prototype,h);var $=z(function(t,e){var o={};return x(e).forEach(function(e){var n=e.key,i=e.val;o[n]=function(){var e=this.$store.state,o=this.$store.getters;if(t){var n=I(this.$store,"mapState",t);if(!n)return;e=n.context.state,o=n.context.getters}return"function"===typeof i?i.call(this,e,o):e[i]},o[n].vuex=!0}),o}),A=z(function(t,e){var o={};return x(e).forEach(function(e){var n=e.key,i=e.val;o[n]=function(){var e=[],o=arguments.length;while(o--)e[o]=arguments[o];var n=this.$store.commit;if(t){var a=I(this.$store,"mapMutations",t);if(!a)return;n=a.context.commit}return"function"===typeof i?i.apply(this,[n].concat(e)):n.apply(this.$store,[i].concat(e))}}),o}),T=z(function(t,e){var o={};return x(e).forEach(function(e){var n=e.key,i=e.val;i=t+i,o[n]=function(){if(!t||I(this.$store,"mapGetters",t))return this.$store.getters[i]},o[n].vuex=!0}),o}),E=z(function(t,e){var o={};return x(e).forEach(function(e){var n=e.key,i=e.val;o[n]=function(){var e=[],o=arguments.length;while(o--)e[o]=arguments[o];var n=this.$store.dispatch;if(t){var a=I(this.$store,"mapActions",t);if(!a)return;n=a.context.dispatch}return"function"===typeof i?i.apply(this,[n].concat(e)):n.apply(this.$store,[i].concat(e))}}),o}),C=function(t){return{mapState:$.bind(null,t),mapGetters:T.bind(null,t),mapMutations:A.bind(null,t),mapActions:E.bind(null,t)}};function x(t){return Array.isArray(t)?t.map(function(t){return{key:t,val:t}}):Object.keys(t).map(function(e){return{key:e,val:t[e]}})}function z(t){return function(e,o){return"string"!==typeof e?(o=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,o)}}function I(t,e,o){var n=t._modulesNamespaceMap[o];return n}var N={Store:m,install:D,version:"3.0.1",mapState:$,mapMutations:A,mapGetters:T,mapActions:E,createNamespacedHelpers:C};e["default"]=N},"3dcf":function(t,e,o){"use strict";o.r(e);var n=o("a923"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=i.a},"3f78":function(t,e,o){},"4ef1":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={state:{footer_nav:[{name:"首页",name_code:"home",icon:"/static/footer_icon/1.1.png",select_icon:"/static/footer_icon/2.1.png",size:"small"},{name:"任务中心",name_code:"task",icon:"/static/footer_icon/1.2.png",select_icon:"/static/footer_icon/2.2.png",size:"small"},{name:"订单",name_code:"order",icon:"/static/footer_icon/1.3.png",select_icon:"/static/footer_icon/2.3.png",size:"small"},{name:"个人中心",name_code:"center",icon:"/static/footer_icon/1.4.png",select_icon:"/static/footer_icon/2.4.png",size:"small"}],now_page_index:0},mutations:{change_nav_list:function(t,e){t.footer_nav=e},change_page:function(t,e){t.now_page_index=e}},actions:{menu_2:function(t){var e=[{name:"订单",name_code:"findOrder",icon:"/static/footer_icon/1.3.png",select_icon:"/static/footer_icon/2.3.png",size:"small"},{name:"消息",name_code:"message",icon:"/static/footer_icon/1.5.png",select_icon:"/static/footer_icon/2.5.png",size:"small"},{name:"个人中心",name_code:"findCenter",icon:"/static/footer_icon/1.4.png",select_icon:"/static/footer_icon/2.4.png",size:"small"}];t.commit("change_nav_list",e)},menu_3:function(t){var e=[{name:"订单",name_code:"fetchOrder",icon:"/static/footer_icon/1.3.png",select_icon:"/static/footer_icon/2.3.png",size:"small"},{name:"消息",name_code:"message",icon:"/static/footer_icon/1.5.png",select_icon:"/static/footer_icon/2.5.png",size:"small"},{name:"个人中心",name_code:"fetchCenter",icon:"/static/footer_icon/1.4.png",select_icon:"/static/footer_icon/2.4.png",size:"small"}];t.commit("change_nav_list",e)},menu_4:function(t){var e=[{name:"首页",name_code:"home",icon:"/static/footer_icon/1.1.png",select_icon:"/static/footer_icon/2.1.png",size:"small"},{name:"任务中心",name_code:"task",icon:"/static/footer_icon/1.2.png",select_icon:"/static/footer_icon/2.2.png",size:"small"},{name:"订单",name_code:"order",icon:"/static/footer_icon/1.3.png",select_icon:"/static/footer_icon/2.3.png",size:"small"},{name:"个人中心",name_code:"center",icon:"/static/footer_icon/1.4.png",select_icon:"/static/footer_icon/2.4.png",size:"small"}];t.commit("change_nav_list",e)},menu_5:function(t){var e=[{name:"首页",name_code:"home",icon:"/static/footer_icon/a2.png",select_icon:"/static/footer_icon/a1.png",size:"small"},{name:"我的",name_code:"my",icon:"/static/footer_icon/d1.png",select_icon:"/static/footer_icon/d2.png",size:"small"},{name:"发布",name_code:"publish",icon:"/static/footer_icon/f2.png",select_icon:"/static/footer_icon/f1.png",size:"big"},{name:"我的",name_code:"my",icon:"/static/footer_icon/d1.png",select_icon:"/static/footer_icon/d2.png",size:"small"},{name:"我的",name_code:"my",icon:"/static/footer_icon/d1.png",select_icon:"/static/footer_icon/d2.png",size:"small"}];t.commit("change_nav_list",e)}}};e.default=n},"8d12":function(t,e,o){"use strict";var n=o("3f78"),i=o.n(n);i.a},a923:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("e378")),i=a(o("0089"));function a(t){return t&&t.__esModule?t:{default:t}}var c={onLaunch:function(){console.log("App Launch"),t.login({success:function(e){if(console.log(e),e.code){var o={code:e.code,from:3};i.default.getOpenId({data:o}).then(function(e){200==e.code||0==e.code?t.setStorageSync("open_id",e.data.openid):n.default.errorTips(e.msg)}).catch(function(t){n.default.errorTips(t.msg)})}}})},onLoad:function(){},mounted:function(){},onShow:function(){this.initSocket(),console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{initSocket:function(){var t=this;"{}"!=JSON.stringify(t.globalData.localSocket)&&(console.log("连接已存在!!!"),t.globalData.localSocket.close());var e=wx.getStorageSync("userId");t.globalData.localSocket=wx.connectSocket({url:"wss://webapi.yidapi.com.cn/notice/socket?userId=".concat(e,"&openType=sms")}),t.globalData.localSocket.onOpen(function(e){console.log("WebSocket连接已打开！readyState="+t.globalData.localSocket.readyState),t.start(),t.globalData.connectTime=3e3}),t.globalData.localSocket.onError(function(e){console.log("WebSocket连接出错readyState="+t.globalData.localSocket.readyState),t.reconnect(),t.globalData.connectTime=2*t.globalData.connectTime}),t.globalData.localSocket.onClose(function(e){console.log("WebSocket连接已关闭！readyState="+t.globalData.localSocket.readyState)}),t.globalData.localSocket.onMessage(function(e){var o=JSON.parse(e.data);if(console.log("收到消息",o),!o.length&&!o.currentPage&&0!=o.fromUserId){var n={id:o.id,fromUserId:0,toUserId:o.fromUserId,messageId:o.messageId,content:"page",smsType:"TEXT",sysType:1,smsStatus:40,smsList:!1,currentPage:"",pageSize:""};t.sendSocketMessage(JSON.stringify(n)),console.log("通知对方已经收到消息！！！")}t.globalData.callback(o),t.reset()})}}};e.default=c}).call(this,o("6e42")["default"])},b110:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=c(o("f3d3")),i=c(o("2f62")),a=c(o("4ef1"));function c(t){return t&&t.__esModule?t:{default:t}}n.default.use(i.default);var r=new i.default.Store({state:{loading:!1,base_url:"https://cnodejs.org/api/v1",list:[],detail:"",fromRest:0,token:"",userInfo:"",defultAddress:"",addressList:"",keyword:"",isPhoneX:!1,isAndroid:!1,nickName:"游客",avatarPath:"/static/center/headIcon.png",mobile:"10086"},mutations:{switch_loading:function(t,e){t.loading=e?"true"==e:!t.loading},update_list:function(t,e){t.list=e},update_detail:function(t,e){t.detail=e},changeReset:function(t,e){e.hasOwnProperty("number")&&(t.fromRest=e.number)},setToken:function(t,e){e.hasOwnProperty("number")&&(t.token=e.token)},setUserInfo:function(t,e){e.hasOwnProperty("userInfo")&&(t.userInfo=e.userInfo)},setDefultAddress:function(t,e){e.hasOwnProperty("defultAddress")&&(t.defultAddress=e.defultAddress)},setAddressList:function(t,e){e.hasOwnProperty("addressList")&&(t.addressList=e.addressList)},setKeyword:function(t,e){e.hasOwnProperty("keyword")&&(t.keyword=e.keyword)},setPhoneX:function(t,e){e.hasOwnProperty("isPhoneX")&&(t.isPhoneX=e.isPhoneX)},setAndroid:function(t,e){e.hasOwnProperty("isAndroid")&&(t.isAndroid=e.isAndroid)},updateNickName:function(t,e){console.log(e),t.nickName=e},updateAvatarPath:function(t,e){t.avatarPath=e},updateMobile:function(t,e){t.mobile=e}},actions:{},modules:{footer_store:a.default}}),s=r;e.default=s},e2c2:function(t,e,o){"use strict";o("a3d9");var n=c(o("f3d3")),i=c(o("f74b")),a=c(o("b110"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),n.forEach(function(e){s(t,e,o[e])})}return t}function s(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}n.default.config.productionTip=!1,n.default.prototype.socket="",n.default.prototype.globalData={userInfo:null,addressIndex:0,lockReconnect:!1,timeoutObj:null,timeoutNum:null,timeout:3e4,connectTime:3e3,localSocket:{},callback:function(){}},n.default.prototype.sendSocketMessage=function(t){var e=this,o=this;return new Promise(function(n,i){1===e.globalData.localSocket.readyState?(console.log("发送消息",t),e.globalData.localSocket.send({data:t,success:function(t){n(t)},fail:function(t){i(t)}})):o.reconnect()})},n.default.prototype.reconnect=function(){var t=this;if(t.globalData.lockReconnect)return!1;t.globalData.lockReconnect=!0,t.globalData.timeoutNum&&clearTimeout(t.globalData.timeoutNum),t.globalData.timeoutNum=setTimeout(function(){t.initSocket(),t.globalData.lockReconnect=!1},t.globalData.connectTime)},n.default.prototype.reset=function(){clearTimeout(this.globalData.timeoutObj),this.start()},n.default.prototype.start=function(){var t=this;t.globalData.timeoutObj&&clearTimeout(t.globalData.timeoutObj),t.globalData.timeoutObj=setTimeout(function(){if(1==t.globalData.localSocket.readyState){var e={id:0,fromUserId:0,toUserId:0,userInfoId:0,content:"ping",smsType:"TEXT",sysType:1,smsStatus:10,smsList:!1,currentPage:"",pageSize:""};t.sendSocketMessage(JSON.stringify(e))}else t.reconnect()},t.globalData.timeout)},n.default.prototype.$store=a.default,n.default.prototype.$eventHub=new n.default,i.default.mpType="app";var u=new n.default(r({store:a.default},i.default));u.$mount()},f74b:function(t,e,o){"use strict";o.r(e);var n=o("3dcf");for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);o("8d12");var a,c,r=o("2877"),s=Object(r["a"])(n["default"],a,c,!1,null,null,null);e["default"]=s.exports}},[["e2c2","common/runtime","common/vendor"]]]);