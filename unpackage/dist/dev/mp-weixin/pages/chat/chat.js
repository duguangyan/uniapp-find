(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chat/chat"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

























































































var _md = _interopRequireDefault(__webpack_require__(/*! ../../utils/md5.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\md5.js"));
var _math = _interopRequireDefault(__webpack_require__(/*! ../../utils/math.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\math.js"));
var _util = _interopRequireDefault(__webpack_require__(/*! ../../utils/util.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\util.js"));
var _api = _interopRequireDefault(__webpack_require__(/*! ../../utils/api.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\api.js"));
var _socketIo = _interopRequireDefault(__webpack_require__(/*! ../../utils/socket-io.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\socket-io.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  data: function data() {
    return {
      //文字消息
      textMsg: '',
      //消息列表
      scrollAnimation: false,
      scrollTop: 0,
      scrollToView: '',
      msgList: [],
      hideMsgList: [],
      msgImgList: [],
      fromUserId: 0,
      toUserId: 0,
      toAvatarPath: '',
      fromAvatarPath: '',
      userInfoId: '',
      toupperTop: true,
      currentPage: 1,
      nextPage: true,
      msgTotal: 0,
      //录音相关参数

      //H5不能录音
      RECORDER: uni.getRecorderManager(),

      isVoice: false,
      voiceTis: '按住 说话',
      recordTis: "手指上滑 取消发送",
      recording: false,
      willStop: false,
      initPoint: { identifier: 0, Y: 0 },
      recordTimer: null,
      recordLength: 0,
      //播放语音相关参数
      AUDIO: uni.createInnerAudioContext(),
      playMsgid: null,
      VoiceTimer: null,
      //表情定义
      showEmji: '',
      emojiList: [
      [{ "url": "100.gif", alt: "[微笑]" }, { "url": "101.gif", alt: "[伤心]" }, { "url": "102.gif", alt: "[美女]" }, { "url": "103.gif", alt: "[发呆]" }, { "url": "104.gif", alt: "[墨镜]" }, { "url": "105.gif", alt: "[哭]" }, { "url": "106.gif", alt: "[羞]" }, { "url": "107.gif", alt: "[哑]" }, { "url": "108.gif", alt: "[睡]" }, { "url": "109.gif", alt: "[哭]" }, { "url": "110.gif", alt: "[囧]" }, { "url": "111.gif", alt: "[怒]" }, { "url": "112.gif", alt: "[调皮]" }, { "url": "113.gif", alt: "[笑]" }, { "url": "114.gif", alt: "[惊讶]" }, { "url": "115.gif", alt: "[难过]" }, { "url": "116.gif", alt: "[酷]" }, { "url": "117.gif", alt: "[汗]" }, { "url": "118.gif", alt: "[抓狂]" }, { "url": "119.gif", alt: "[吐]" }, { "url": "120.gif", alt: "[笑]" }, { "url": "121.gif", alt: "[快乐]" }, { "url": "122.gif", alt: "[奇]" }, { "url": "123.gif", alt: "[傲]" }],
      [{ "url": "124.gif", alt: "[饿]" }, { "url": "125.gif", alt: "[累]" }, { "url": "126.gif", alt: "[吓]" }, { "url": "127.gif", alt: "[汗]" }, { "url": "128.gif", alt: "[高兴]" }, { "url": "129.gif", alt: "[闲]" }, { "url": "130.gif", alt: "[努力]" }, { "url": "131.gif", alt: "[骂]" }, { "url": "132.gif", alt: "[疑问]" }, { "url": "133.gif", alt: "[秘密]" }, { "url": "134.gif", alt: "[乱]" }, { "url": "135.gif", alt: "[疯]" }, { "url": "136.gif", alt: "[哀]" }, { "url": "137.gif", alt: "[鬼]" }, { "url": "138.gif", alt: "[打击]" }, { "url": "139.gif", alt: "[bye]" }, { "url": "140.gif", alt: "[汗]" }, { "url": "141.gif", alt: "[抠]" }, { "url": "142.gif", alt: "[鼓掌]" }, { "url": "143.gif", alt: "[糟糕]" }, { "url": "144.gif", alt: "[恶搞]" }, { "url": "145.gif", alt: "[什么]" }, { "url": "146.gif", alt: "[什么]" }, { "url": "147.gif", alt: "[累]" }],
      [{ "url": "148.gif", alt: "[看]" }, { "url": "149.gif", alt: "[难过]" }, { "url": "150.gif", alt: "[难过]" }, { "url": "151.gif", alt: "[坏]" }, { "url": "152.gif", alt: "[亲]" }, { "url": "153.gif", alt: "[吓]" }, { "url": "154.gif", alt: "[可怜]" }, { "url": "155.gif", alt: "[刀]" }, { "url": "156.gif", alt: "[水果]" }, { "url": "157.gif", alt: "[酒]" }, { "url": "158.gif", alt: "[篮球]" }, { "url": "159.gif", alt: "[乒乓]" }, { "url": "160.gif", alt: "[咖啡]" }, { "url": "161.gif", alt: "[美食]" }, { "url": "162.gif", alt: "[动物]" }, { "url": "163.gif", alt: "[鲜花]" }, { "url": "164.gif", alt: "[枯]" }, { "url": "165.gif", alt: "[唇]" }, { "url": "166.gif", alt: "[爱]" }, { "url": "167.gif", alt: "[分手]" }, { "url": "168.gif", alt: "[生日]" }, { "url": "169.gif", alt: "[电]" }, { "url": "170.gif", alt: "[炸弹]" }, { "url": "171.gif", alt: "[刀子]" }],
      [{ "url": "172.gif", alt: "[足球]" }, { "url": "173.gif", alt: "[瓢虫]" }, { "url": "174.gif", alt: "[翔]" }, { "url": "175.gif", alt: "[月亮]" }, { "url": "176.gif", alt: "[太阳]" }, { "url": "177.gif", alt: "[礼物]" }, { "url": "178.gif", alt: "[抱抱]" }, { "url": "179.gif", alt: "[拇指]" }, { "url": "180.gif", alt: "[贬低]" }, { "url": "181.gif", alt: "[握手]" }, { "url": "182.gif", alt: "[剪刀手]" }, { "url": "183.gif", alt: "[抱拳]" }, { "url": "184.gif", alt: "[勾引]" }, { "url": "185.gif", alt: "[拳头]" }, { "url": "186.gif", alt: "[小拇指]" }, { "url": "187.gif", alt: "[拇指八]" }, { "url": "188.gif", alt: "[食指]" }, { "url": "189.gif", alt: "[ok]" }, { "url": "190.gif", alt: "[情侣]" }, { "url": "191.gif", alt: "[爱心]" }, { "url": "192.gif", alt: "[蹦哒]" }, { "url": "193.gif", alt: "[颤抖]" }, { "url": "194.gif", alt: "[怄气]" }, { "url": "195.gif", alt: "[跳舞]" }],
      [{ "url": "196.gif", alt: "[发呆]" }, { "url": "197.gif", alt: "[背着]" }, { "url": "198.gif", alt: "[伸手]" }, { "url": "199.gif", alt: "[耍帅]" }, { "url": "200.png", alt: "[微笑]" }, { "url": "201.png", alt: "[生病]" }, { "url": "202.png", alt: "[哭泣]" }, { "url": "203.png", alt: "[吐舌]" }, { "url": "204.png", alt: "[迷糊]" }, { "url": "205.png", alt: "[瞪眼]" }, { "url": "206.png", alt: "[恐怖]" }, { "url": "207.png", alt: "[忧愁]" }, { "url": "208.png", alt: "[眨眉]" }, { "url": "209.png", alt: "[闭眼]" }, { "url": "210.png", alt: "[鄙视]" }, { "url": "211.png", alt: "[阴暗]" }, { "url": "212.png", alt: "[小鬼]" }, { "url": "213.png", alt: "[礼物]" }, { "url": "214.png", alt: "[拜佛]" }, { "url": "215.png", alt: "[力量]" }, { "url": "216.png", alt: "[金钱]" }, { "url": "217.png", alt: "[蛋糕]" }, { "url": "218.png", alt: "[彩带]" }, { "url": "219.png", alt: "[礼物]" }]] };


  },
  onLoad: function onLoad(option) {var _this = this;
    this.globalData.initType = 2;
    uni.setNavigationBarTitle({
      title: option.name // 对方的名称
    });
    this.fromUserId = option.fromUserId; // 当前登录的用户 id
    this.toUserId = option.toUserId; // 对方的用户 id
    this.fromAvatarPath = uni.getStorageSync('fromAvatarPath') || option.fromAvatarPath || 'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png'; // 当前登录用户的头像
    this.toAvatarPath = uni.getStorageSync('toAvatarPath') || option.toAvatarPath || 'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png'; // 对方的用户头像
    this.userInfoId = parseInt(this.fromUserId) > parseInt(this.toUserId) ? _md.default.md5(this.toUserId + this.fromUserId) : _md.default.md5(this.fromUserId + this.toUserId);
    if (this.globalData.connentSocket) {// 已连接则直接获取聊天历史
      var message = {
        fromUserId: this.fromUserId,
        toUserId: this.toUserId,
        content: 'page',
        smsType: 'TEXT',
        sysType: 1,
        smsStatus: 10,
        smsList: false,
        currentPage: 1,
        pageSize: 15 };

      this.globalData.localSocket.send({
        data: JSON.stringify(message) });

    } else {// 未连接则连接过后再获取聊天历史
      _socketIo.default.initSocket(this.fromUserId, this.toUserId);
    }
    //语音自然播放结束
    this.AUDIO.onEnded(function (res) {
      _this.playMsgid = null;
    });

    //录音开始事件
    this.RECORDER.onStart(function (e) {
      _this.recordBegin(e);
    });
    //录音结束事件
    this.RECORDER.onStop(function (e) {
      _this.recordEnd(e);
    });

  },
  onShow: function onShow() {
    var that = this;
    this.globalData.callback = function (res) {
      if (String(res.userInfoId) == '0' || res.fromUserId == 0) {
        return;
      }
      if (res && res.list) {
        that.nextPage = res.totalPage != that.currentPage;
        var result = res.list;
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            if (result[i].smsType == 'IMAGE') {
              result[i] = that.setPicSize(result[i]);
            }
          }
          that.msgList = result.concat(that.msgList);

          that.$nextTick(function () {
            if (that.currentPage == 1) {
              // 滚动到底部
              that.scrollTop = 99999;
            } else {
              if (that.nextPage) {
                uni.createSelectorQuery().
                select('#msg' + (15 + that.msgTotal)).
                boundingClientRect().
                exec(function (res) {
                  if (res[0] != null) {
                    that.scrollTop = res[0].top;
                  }
                });
              }
              that.toupperTop = true;
            }
          });
        }
      } else {
        if (res.userInfoId == that.userInfoId) {
          var index = that.msgList.push(res);
          that.toView(index);
        } else {
          that.$emit('chatList', true);
        }
      }
    };
  },
  methods: {
    toupper: function toupper() {
      var that = this;
      if (that.nextPage && that.toupperTop) {
        that.toupperTop = false;
        that.currentPage = that.currentPage + 1;
        var message = {
          fromUserId: that.fromUserId,
          toUserId: that.toUserId,
          content: 'page',
          smsType: 'TEXT',
          sysType: 1,
          smsStatus: 10,
          smsList: false,
          currentPage: that.currentPage,
          pageSize: 15 };

        that.globalData.localSocket.send({
          data: JSON.stringify(message) });

      }
    },
    //处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
    setPicSize: function setPicSize(row) {
      var maxW = uni.upx2px(350);
      var maxH = uni.upx2px(350);
      if (row.width > maxW || row.height > maxH) {
        var scale = row.width / row.height;
        if (row.width > row.height) {
          row.width = maxW;
          row.height = row.width / scale;
        } else {
          row.height = maxH;
          row.width = row.height * scale;
        }
      }
      return row;
    },
    // 选择表情
    chooseEmoji: function chooseEmoji() {
      this.showEmji = this.showEmji == 'showEmoji' ? 'hideEmoji' : 'showEmoji';
    },
    // 隐藏表情
    hideEmoji: function hideEmoji() {
      this.showEmji = this.showEmji == 'showEmoji' ? 'hideEmoji' : '';
    },
    //添加表情
    addEmoji: function addEmoji(em) {
      this.textMsg += em.alt;
    },
    // 预览图片
    showPic: function showPic(row) {
      var src = row.content; //获取data-src
      var index = src.indexOf('?');
      if (index != -1) {
        src = src.substring(0, index) + '?x-oss-process=style/big';
      }
      uni.previewImage({
        indicator: "none",
        current: src,
        urls: [src] });

    },
    // 播放语音
    playVoice: function playVoice(msg) {
      this.playMsgid = msg.id;
      this.AUDIO.src = msg.msg.url;
      console.log("msg.msg.url: " + msg.msg.url);
      this.AUDIO.play();
    },
    sendText: function sendText(e) {
      this.hideEmoji();
      var that = this;
      var content = e.detail.value ? e.detail.value : that.textMsg;
      if (!content || content == '') {
        return;
      }
      var messageId = new Date().getTime() + that.fromUserId + that.toUserId + _math.default.math(5);
      messageId = _md.default.md5(messageId);

      var message = {
        fromUserId: that.fromUserId,
        toUserId: that.toUserId,
        messageId: messageId,
        content: content,
        smsType: 'TEXT',
        sysType: 1,
        smsStatus: 10,
        smsList: false,
        currentPage: '',
        pageSize: '' };


      this.globalData.localSocket.send({
        data: JSON.stringify(message),
        success: function success() {
          var index = that.msgList.push(message);
          that.toView(index);
          that.textMsg = '';
          that.msgTotal = that.msgTotal + 1;
          message.dateTime = that.getTime();
          uni.$emit('message', message);
        },
        fail: function fail() {
          console.log('发送失败！！！');
        } });

    },
    // 选择图片发送
    chooseImage: function chooseImage() {
      this.hideEmoji();
      var that = this;
      uni.chooseImage({
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: function success(res) {
          uni.showLoading({
            title: '发送中',
            mask: false });

          var tempFilePaths = res.tempFilePaths;
          for (var index in tempFilePaths) {
            uni.getImageInfo({
              src: tempFilePaths[index],
              success: function success(image) {
                var messageId = new Date().getTime() + that.fromUserId + that.toUserId + _math.default.math(5);
                messageId = _md.default.md5(messageId);
                var message = {
                  fromUserId: that.fromUserId,
                  toUserId: that.toUserId,
                  messageId: messageId,
                  content: image.path,
                  smsType: 'IMAGE',
                  sysType: 1,
                  smsStatus: 10,
                  smsList: false,
                  currentPage: '',
                  pageSize: '',
                  width: image.width,
                  height: image.height };

                that.upload(message);
              } });

          }
        } });

    },
    upload: function upload(message) {
      var that = this;
      var data = {};
      var access_token = wx.getStorageSync('access_token') || '';
      data.file = '[object Object]';
      data.type = 'big';
      var timestamp = Date.parse(new Date());
      data.timestamp = timestamp;
      data.sign = _util.default.makeSign(_api.default.apiUrl + '/api/upload', data);
      data.deviceId = "wx";
      data.platformType = "2";
      data.versionCode = '4.0';
      var uploadTask = uni.uploadFile({
        url: "".concat(_api.default.apiUrl, "/api/upload"),
        filePath: message.content,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': "Bearer ".concat(access_token) },

        formData: data,
        success: function success(res) {
          var result = JSON.parse(res.data);
          console.log('result', result);
          if (result.code == 200 || result.code == 0) {
            message.content = result.data;
            that.globalData.localSocket.send({
              data: JSON.stringify(message),
              success: function success() {
                message = that.setPicSize(message);
                var index = that.msgList.push(message);
                that.toView(index);
                that.msgTotal = that.msgTotal + 1;
                message.dateTime = that.getTime();
                that.$emit('message', message);
              } });

          }
        },
        complete: function complete() {
          uni.hideLoading();
        } });

    },
    toView: function toView(index) {
      var that = this;
      this.$nextTick(function () {
        that.scrollToView = 'msg' + (index - 1);
      });
    },
    getTime: function getTime() {
      var date = new Date();
      return date.getHours() + ':' + date.getMinutes();
    },
    sendBlur: function sendBlur(event) {






    },
    discard: function discard() {
      return;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=template&id=26a3dd72&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=template&id=26a3dd72&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", [
    _c(
      "view",
      {
        staticClass: "content",
        attrs: { eventid: "73b8c1b7-5" },
        on: { touchstart: _vm.hideEmoji }
      },
      [
        _c(
          "scroll-view",
          {
            staticClass: "msg-list",
            attrs: {
              "upper-threshold": "20",
              "scroll-y": "true",
              "scroll-with-animation": _vm.scrollAnimation,
              "scroll-top": _vm.scrollTop,
              "scroll-into-view": _vm.scrollToView,
              eventid: "73b8c1b7-4"
            },
            on: { scrolltoupper: _vm.toupper }
          },
          [
            _vm.nextPage && !_vm.toupperTop
              ? _c("view", { staticClass: "loding" }, [
                  _c("image", { attrs: { src: "/static/img/loading.gif" } })
                ])
              : _vm._e(),
            _vm._l(_vm.msgList, function(row, index) {
              return _c(
                "view",
                {
                  key: index,
                  staticClass: "row",
                  attrs: { id: "msg" + index }
                },
                [
                  row.timeInterval && row.timeInterval != ""
                    ? _c("view", { staticClass: "time" }, [
                        _vm._v(_vm._s(row.timeInterval))
                      ])
                    : _vm._e(),
                  row.fromUserId == _vm.fromUserId
                    ? _c("view", { staticClass: "my" }, [
                        _c("view", { staticClass: "left" }, [
                          row.smsType == "TEXT"
                            ? _c(
                                "view",
                                { staticClass: "bubble" },
                                [
                                  _c("rich-text", {
                                    attrs: {
                                      nodes: row.content,
                                      mpcomid: "73b8c1b7-0-" + index
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e(),
                          row.smsType == "VOICE"
                            ? _c(
                                "view",
                                {
                                  staticClass: "bubble voice",
                                  class: _vm.playMsgid == row.id ? "play" : "",
                                  attrs: { eventid: "73b8c1b7-0-" + index },
                                  on: {
                                    tap: function($event) {
                                      _vm.playVoice(row)
                                    }
                                  }
                                },
                                [
                                  _c("view", { staticClass: "length" }, [
                                    _vm._v(_vm._s(row.length))
                                  ]),
                                  _c("view", { staticClass: "icon my-voice" })
                                ]
                              )
                            : _vm._e(),
                          row.smsType == "IMAGE"
                            ? _c(
                                "view",
                                {
                                  staticClass: "bubble img",
                                  attrs: { eventid: "73b8c1b7-1-" + index },
                                  on: {
                                    tap: function($event) {
                                      _vm.showPic(row)
                                    }
                                  }
                                },
                                [
                                  _c("image", {
                                    style: {
                                      width: row.width + "px",
                                      height: row.height + "px"
                                    },
                                    attrs: { src: row.content }
                                  })
                                ]
                              )
                            : _vm._e()
                        ]),
                        _c("view", { staticClass: "right" }, [
                          _c("image", { attrs: { src: _vm.fromAvatarPath } })
                        ])
                      ])
                    : _vm._e(),
                  row.fromUserId != _vm.fromUserId
                    ? _c("view", { staticClass: "other" }, [
                        _c("view", { staticClass: "left" }, [
                          _c("image", { attrs: { src: _vm.toAvatarPath } })
                        ]),
                        _c("view", { staticClass: "right" }, [
                          row.smsType == "TEXT"
                            ? _c(
                                "view",
                                { staticClass: "bubble" },
                                [
                                  _c("rich-text", {
                                    attrs: {
                                      nodes: row.content,
                                      mpcomid: "73b8c1b7-1-" + index
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e(),
                          row.smsType == "VOICE"
                            ? _c(
                                "view",
                                {
                                  staticClass: "bubble voice",
                                  class: _vm.playMsgid == row.id ? "play" : "",
                                  attrs: { eventid: "73b8c1b7-2-" + index },
                                  on: {
                                    tap: function($event) {
                                      _vm.playVoice(row)
                                    }
                                  }
                                },
                                [
                                  _c("view", {
                                    staticClass: "icon other-voice"
                                  }),
                                  _c("view", { staticClass: "length" }, [
                                    _vm._v(_vm._s(row.length))
                                  ])
                                ]
                              )
                            : _vm._e(),
                          row.smsType == "IMAGE"
                            ? _c(
                                "view",
                                {
                                  staticClass: "bubble img",
                                  attrs: { eventid: "73b8c1b7-3-" + index },
                                  on: {
                                    tap: function($event) {
                                      _vm.showPic(row)
                                    }
                                  }
                                },
                                [
                                  _c("image", {
                                    style: {
                                      width: row.width + "px",
                                      height: row.height + "px"
                                    },
                                    attrs: { src: row.content }
                                  })
                                ]
                              )
                            : _vm._e()
                        ])
                      ])
                    : _vm._e()
                ]
              )
            })
          ],
          2
        )
      ],
      1
    ),
    _c(
      "view",
      {
        staticClass: "input-box",
        class: _vm.showEmji,
        attrs: { eventid: "73b8c1b7-9" },
        on: {
          touchmove: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            _vm.discard($event)
          }
        }
      },
      [
        _c("view", { staticClass: "textbox" }, [
          _c(
            "view",
            {
              staticClass: "voice-mode",
              class: [
                _vm.isVoice ? "" : "hidden",
                _vm.recording ? "recording" : ""
              ],
              attrs: { eventid: "73b8c1b7-6" },
              on: {
                touchstart: _vm.voiceBegin,
                touchmove: function($event) {
                  $event.stopPropagation()
                  $event.preventDefault()
                  _vm.voiceIng($event)
                },
                touchend: _vm.voiceEnd,
                touchcancel: _vm.voiceCancel
              }
            },
            [_vm._v(_vm._s(_vm.voiceTis))]
          ),
          _c(
            "view",
            { staticClass: "text-mode", class: _vm.isVoice ? "hidden" : "" },
            [
              _c("view", { staticClass: "box" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.textMsg,
                      expression: "textMsg"
                    }
                  ],
                  attrs: {
                    "confirm-type": "send",
                    "confirm-hold": "true",
                    "cursor-spacing": "15",
                    id: "textMsg",
                    eventid: "73b8c1b7-7"
                  },
                  domProps: { value: _vm.textMsg },
                  on: {
                    blur: _vm.sendBlur,
                    confirm: _vm.sendText,
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.textMsg = $event.target.value
                    }
                  }
                })
              ])
            ]
          )
        ]),
        _c(
          "view",
          {
            staticClass: "more",
            attrs: { eventid: "73b8c1b7-8" },
            on: { tap: _vm.chooseImage }
          },
          [_c("view", { staticClass: "icon tupian" })]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\main.js?{\"page\":\"pages%2Fchat%2Fchat\"}":
/*!***************************************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/main.js?{"page":"pages%2Fchat%2Fchat"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "E:\\uniapp\\find.yidapi.com.cn\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./pages/chat/chat.vue */ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_chat.default));

/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue":
/*!********************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chat_vue_vue_type_template_id_26a3dd72_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=26a3dd72&scoped=true& */ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=template&id=26a3dd72&scoped=true&");
/* harmony import */ var _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js& */ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true& */ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true&");
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chat_vue_vue_type_template_id_26a3dd72_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chat_vue_vue_type_template_id_26a3dd72_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "26a3dd72",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=style&index=0&id=26a3dd72&lang=scss&scoped=true&");
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_26a3dd72_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=template&id=26a3dd72&scoped=true&":
/*!***************************************************************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=template&id=26a3dd72&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_26a3dd72_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=template&id=26a3dd72&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=template&id=26a3dd72&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_26a3dd72_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_26a3dd72_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\utils\\math.js":
/*!**************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/utils/math.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

function math(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 17);
    res += chars[id];
  }
  return res;
}

module.exports = {
  math: math };

/***/ }),

/***/ "E:\\uniapp\\find.yidapi.com.cn\\utils\\md5.js":
/*!*************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/utils/md5.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function md5(string) {
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,S12 = 12,S13 = 17,S14 = 22;
  var S21 = 5,S22 = 9,S23 = 14,S24 = 20;
  var S31 = 4,S32 = 11,S33 = 16,S34 = 23;
  var S41 = 6,S42 = 10,S43 = 15,S44 = 21;
  string = Utf8Encode(string);
  x = ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }
  return WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
}
function RotateLeft(lValue, iShiftBits) {
  return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
}
function AddUnsigned(lX, lY) {
  var lX4, lY4, lX8, lY8, lResult;
  lX8 = lX & 0x80000000;
  lY8 = lY & 0x80000000;
  lX4 = lX & 0x40000000;
  lY4 = lY & 0x40000000;
  lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
  if (lX4 & lY4) {
    return lResult ^ 0x80000000 ^ lX8 ^ lY8;
  }
  if (lX4 | lY4) {
    if (lResult & 0x40000000) {
      return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
    } else {
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
  } else {
    return lResult ^ lX8 ^ lY8;
  }
}
function F(x, y, z) {
  return x & y | ~x & z;
}
function G(x, y, z) {
  return x & z | y & ~z;
}
function H(x, y, z) {
  return x ^ y ^ z;
}
function I(x, y, z) {
  return y ^ (x | ~z);
}
function FF(a, b, c, d, x, s, ac) {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
  return AddUnsigned(RotateLeft(a, s), b);
}
function GG(a, b, c, d, x, s, ac) {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
  return AddUnsigned(RotateLeft(a, s), b);
}
function HH(a, b, c, d, x, s, ac) {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
  return AddUnsigned(RotateLeft(a, s), b);
}
function II(a, b, c, d, x, s, ac) {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
  return AddUnsigned(RotateLeft(a, s), b);
}
function ConvertToWordArray(string) {
  var lWordCount;
  var lMessageLength = string.length;
  var lNumberOfWords_temp1 = lMessageLength + 8;
  var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
  var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
  var lWordArray = Array(lNumberOfWords - 1);
  var lBytePosition = 0;
  var lByteCount = 0;
  while (lByteCount < lMessageLength) {
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
    lByteCount++;
  }
  lWordCount = (lByteCount - lByteCount % 4) / 4;
  lBytePosition = lByteCount % 4 * 8;
  lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
  lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
  return lWordArray;
}
function WordToHex(lValue) {
  var WordToHexValue = "",WordToHexValue_temp = "",lByte,lCount;
  for (lCount = 0; lCount <= 3; lCount++) {
    lByte = lValue >>> lCount * 8 & 255;
    WordToHexValue_temp = "0" + lByte.toString(16);
    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
  }
  return WordToHexValue;
}
function Utf8Encode(string) {
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode(c >> 6 | 192);
      utftext += String.fromCharCode(c & 63 | 128);
    } else {
      utftext += String.fromCharCode(c >> 12 | 224);
      utftext += String.fromCharCode(c >> 6 & 63 | 128);
      utftext += String.fromCharCode(c & 63 | 128);
    }
  }
  return utftext;
}
module.exports = {
  md5: md5 };

/***/ })

},[["E:\\uniapp\\find.yidapi.com.cn\\main.js?{\"page\":\"pages%2Fchat%2Fchat\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/chat.js.map