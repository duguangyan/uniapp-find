(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/common/bindAlipay/bindAlipay"],{"0808":function(t,e,a){"use strict";a.r(e);var i=a("5860"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=n.a},5860:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(a("e378")),n=r(a("0089"));function r(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{btnText:"立即绑定",codeBtnTxt:"获取验证码",code_id:"",items:[{t:"支付宝账号",v:"",p:"请输入您的支付宝账号"},{t:"账号姓名",v:"",p:"请输入您的支付宝姓名"},{t:"手机号码",v:"",p:"请输入您的手机号码"},{t:"短信验证码",v:"",p:"请输入短信验证码"}]}},onLoad:function(){},onShow:function(){},methods:{bindAlipay:function(){if(""==this.$data.items[0].v)return i.default.errorTips("请输入您的支付宝账号"),!1;if(""==this.$data.items[1].v)return i.default.errorTips("请输入您的支付宝姓名"),!1;if(""==this.$data.items[2].v)return i.default.errorTips("请输入您的手机号码"),!1;if(""==this.$data.items[3].v)return i.default.errorTips("请输入短信验证码"),!1;var e={account:this.$data.items[0].v,real_name:this.$data.items[1].v,id:this.$data.code_id,mobile:this.$data.items[2].v,code:this.$data.items[3].v};n.default.memberAliBind({method:"POST",data:e}).then(function(e){200==e.code||0==e.code?(i.default.successTips(e.msg),t.navigateBack({delta:1})):i.default.errorTips(e.msg)}).catch(function(t){i.default.errorTips(t.msg||t.message)})},getCode:function(){var t=this;if(""==this.$data.items[2].v)return i.default.errorTips("手机号不能为空"),!1;var e={mobile:this.$data.items[2].v};n.default.regSMS({method:"POST",data:e}).then(function(e){200==e.code||0==e.code?(t.$data.code_id=e.data.id,i.default.errorTips("短信发送成功"),t.$data.codeBtnTxt="重新获取"):i.default.errorTips(e.msg)}).catch(function(t){i.default.errorTips(t.msg||t.message)})}}};e.default=s}).call(this,a("6e42")["default"])},"7cf9":function(t,e,a){"use strict";var i=a("a60c"),n=a.n(i);n.a},a36d:function(t,e,a){"use strict";a.r(e);var i=a("c316"),n=a("0808");for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);a("7cf9");var s=a("2877"),d=Object(s["a"])(n["default"],i["a"],i["b"],!1,null,"0ff4cd10",null);e["default"]=d.exports},a60c:function(t,e,a){},bcf8:function(t,e,a){"use strict";a("a3d9");var i=r(a("b0ce")),n=r(a("a36d"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},c316:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"alipay"},[a("view",{staticClass:"items"},t._l(t.items,function(e,i){return a("view",{key:i,staticClass:"item"},[a("text",[t._v(t._s(e.t))]),t._v(":"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v,expression:"item.v"}],class:2==i?"item-2":"",attrs:{type:"text",placeholder:e.p,eventid:"be328e00-0-"+i},domProps:{value:e.v},on:{input:function(t){t.target.composing||(e.v=t.target.value)}}}),2==i?a("view",{staticClass:"item-2-btn",attrs:{eventid:"be328e00-1-"+i},on:{click:t.getCode}},[t._v(t._s(t.codeBtnTxt))]):t._e()])})),a("view",{staticClass:"btn",attrs:{eventid:"be328e00-2"},on:{click:t.bindAlipay}},[t._v("立即绑定")])])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})}},[["bcf8","common/runtime","common/vendor"]]]);