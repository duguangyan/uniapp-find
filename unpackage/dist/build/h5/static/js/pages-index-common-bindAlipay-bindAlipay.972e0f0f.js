(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-common-bindAlipay-bindAlipay"],{"0808":function(t,i,e){"use strict";e.r(i);var a=e("179c"),n=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(i,t,function(){return a[t]})}(r);i["default"]=n.a},"179c":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=r(e("e378")),n=r(e("0089"));function r(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{btnText:"立即绑定",codeBtnTxt:"获取验证码",code_id:"",items:[{t:"支付宝账号",v:"",p:"请输入您的支付宝账号"},{t:"账号姓名",v:"",p:"请输入您的支付宝姓名"},{t:"手机号码",v:"",p:"请输入您的手机号码"},{t:"短信验证码",v:"",p:"请输入短信验证码"}]}},onLoad:function(){},onShow:function(){},methods:{bindAlipay:function(){if(""==this.$data.items[0].v)return a.default.errorTips("请输入您的支付宝账号"),!1;if(""==this.$data.items[1].v)return a.default.errorTips("请输入您的支付宝姓名"),!1;if(""==this.$data.items[2].v)return a.default.errorTips("请输入您的手机号码"),!1;if(""==this.$data.items[3].v)return a.default.errorTips("请输入短信验证码"),!1;var t={account:this.$data.items[0].v,real_name:this.$data.items[1].v,id:this.$data.code_id,mobile:this.$data.items[2].v,code:this.$data.items[3].v};n.default.memberAliBind({method:"POST",data:t}).then(function(t){200==t.code||0==t.code?(a.default.successTips(t.msg),uni.navigateBack({delta:1})):a.default.errorTips(t.msg)}).catch(function(t){a.default.errorTips(t.msg||t.message)})},getCode:function(){var t=this;if(""==this.$data.items[2].v)return a.default.errorTips("手机号不能为空"),!1;var i={mobile:this.$data.items[2].v};n.default.regSMS({method:"POST",data:i}).then(function(i){200==i.code||0==i.code?(t.$data.code_id=i.data.id,a.default.errorTips("短信发送成功"),t.$data.codeBtnTxt="重新获取"):a.default.errorTips(i.msg)}).catch(function(t){a.default.errorTips(t.msg||t.message)})}}};i.default=s},a36d:function(t,i,e){"use strict";e.r(i);var a=e("c646"),n=e("0808");for(var r in n)"default"!==r&&function(t){e.d(i,t,function(){return n[t]})}(r);e("c35f");var s=e("2877"),o=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"770a32c4",null);i["default"]=o.exports},b0d1:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.item-2[data-v-770a32c4]{width:%?320?%!important;position:relative}.item-2-btn[data-v-770a32c4]{width:%?180?%;height:%?88?%;line-height:%?88?%;text-align:center;background:#f29800;color:#fff;position:absolute;right:0;top:%?0?%;border-radius:%?0?% %?10?% %?10?% %?0?%}.alipay[data-v-770a32c4]{height:100%;background:#f4f4f4}.alipay .btn[data-v-770a32c4]{width:%?630?%;height:%?88?%;line-height:%?88?%;background:#f29800;color:#fff;font-size:%?32?%;text-align:center;margin:0 auto;border-radius:%?10?%;margin-top:%?140?%}.alipay .items[data-v-770a32c4]{padding:%?50?% %?30?%;background:#fff}.alipay .items .item[data-v-770a32c4]{margin-bottom:%?30?%;position:relative;font-size:%?30?%}.alipay .items .item uni-text[data-v-770a32c4]{display:inline-block;width:%?160?%}.alipay .items .item uni-input[data-v-770a32c4]{display:inline-block;width:%?480?%;height:%?88?%;line-height:%?88?%;margin-left:%?20?%;background:#f4f4f4;color:#333;padding-left:%?20?%;position:relative;top:%?0?%;border-radius:%?10?%}',""])},c355:function(t,i,e){var a=e("b0d1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("9942fe92",a,!0,{sourceMap:!1,shadowMode:!1})},c35f:function(t,i,e){"use strict";var a=e("c355"),n=e.n(a);n.a},c646:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"alipay"},[e("v-uni-view",{staticClass:"items"},t._l(t.items,function(i,a){return e("v-uni-view",{key:a,staticClass:"item"},[e("v-uni-text",[t._v(t._s(i.t))]),t._v(":"),e("v-uni-input",{class:2==a?"item-2":"",attrs:{type:"text",placeholder:i.p},model:{value:i.v,callback:function(e){t.$set(i,"v",e)},expression:"item.v"}}),2==a?e("v-uni-view",{staticClass:"item-2-btn",on:{click:function(i){i=t.$handleEvent(i),t.getCode(i)}}},[t._v(t._s(t.codeBtnTxt))]):t._e()],1)}),1),e("v-uni-view",{staticClass:"btn",on:{click:function(i){i=t.$handleEvent(i),t.bindAlipay(i)}}},[t._v("立即绑定")])],1)},n=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})}}]);