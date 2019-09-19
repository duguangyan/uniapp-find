if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../components/pop-show-modal');
require('../../components/wx-title');
require('../../pages/index/pages/home');
require('../../pages/index/pages/task');
require('../../pages/index/pages/order');
require('../../pages/index/pages/center');
require('../../components/footer/footer_nav');
require('../../pages/index/pages/findOrder');
require('../../pages/index/pages/findCenter');
require('../../pages/index/pages/msg');
require('../../pages/index/pages/fetchCenter');
require('../../pages/index/pages/fetchOrder');
require('../../components/list/list-item');
require('../../components/list/list-icon');
require('../../components/upload');
require('../../components/uni-number-box/uni-number-box');
require('../../components/dialog');
require('../../components/uni-icon/uni-icon');
require('../../components/uni-badge/uni-badge');
require('../../components/uni-list-item/uni-list-item');
require('../../pages/start/start');
require('../../pages/index/index');
require('../../pages/login/login');
require('../../pages/resetPassworld/resetPassworld');
require('../../pages/familyCenter/familyCenter');
require('../../pages/setting/setting');
require('../../pages/familyExplain/familyExplain');
require('../../pages/family/family');
require('../../pages/find/find');
require('../../pages/classify/classify');
require('../../pages/address/address');
require('../../pages/addressNew/addressNew');
require('../../pages/fetch/fetch');
require('../../pages/taskPay/taskPay');
require('../../pages/taskPaySuccess/taskPaySuccess');
require('../../pages/orderDetail/orderDetail');
require('../../pages/setting/userInfo/userInfo');
require('../../pages/chatList/chatList');
require('../../pages/chat/chat');
require('../../pages/recharge/recharge');
require('../../pages/giftCertificate/giftCertificate');
require('../../pages/integralmall/integralmall');
require('../../pages/setting/authentication/authentication');
require('../../pages/setting/modifyNickname/modifyNickname');
require('../../pages/setting/modifyPassword/modifyPassword');
require('../../pages/index/findPages/findOrderDetail/findOrderDetail');
require('../../pages/search/search');
require('../../pages/index/fetchPage/fetchOrderDetail/fetchOrderDetail');
require('../../pages/index/common/recordList/recordList');
require('../../pages/index/common/cash/cash');
require('../../pages/index/common/bindAlipay/bindAlipay');
require('../../pages/index/common/cashRecord/cashRecord');
require('../../pages/activity/spike/spike');
require('../../pages/activity/rush/rush');
require('../../pages/activity/promo/promo');
require('../../pages/activity/spell/spell');
require('../../pages/rechargeSuccess/rechargeSuccess');
require('../../pages/protocol/protocol');
require('../../pages/index/common/bindBankCard/bindBankCard');
require('../../pages/listCustomer/listCustomer');
require('../../pages/listOrder/listOrder');
require('../../pages/index/pages/order');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}