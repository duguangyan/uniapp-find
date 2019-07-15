(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chat/chat"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:\\uniapp\\find.yidapi.com.cn\\pages\\chat\\chat.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/uniapp/find.yidapi.com.cn/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;































































































var _api = _interopRequireDefault(__webpack_require__(/*! ../../utils/api.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\api.js"));
var _IMapi = _interopRequireDefault(__webpack_require__(/*! ../../utils/IMapi.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\IMapi.js"));
var _util = _interopRequireDefault(__webpack_require__(/*! ../../utils/util.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\util.js"));
var _md = _interopRequireDefault(__webpack_require__(/*! ../../utils/md5.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\md5.js"));
var _math = _interopRequireDefault(__webpack_require__(/*! ../../utils/math.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\math.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  data: function data() {
    return {
      content: '',
      isFalse: false,
      inputShowed: false,
      isConfirmHold: true,
      isScrollY: true,
      toId: '',
      sms: 0,
      baseUrl: 'https://webapi.yidap.com',
      message_list: [],
      scroll_height: wx.getSystemInfoSync().windowHeight,
      page_index: 0,
      mode: true,
      cancel: false,
      status: 0,
      tips: ['按住 说话', '松开 结束', '取消 发送'],
      state: {
        'normal': 0,
        'pressed': 1,
        'cancel': 2 },

      toView: '',
      userId: wx.getStorageSync('userId'),
      to_avatar_path: 'https://static.yidap.com/miniapp/o2o/imgs/collection@2x.png',
      currentPage: 2,
      pageSize: 10,
      scrollLoading: 0,
      HideData: [],
      EventData: [],
      NoMoreEvent: 0,
      noData: true,
      fromUserPhoto: '',
      toUserPhoto: '',
      userInfoId: '',
      maxlength: 500,
      messageCache: [],
      prevIndex: -1,
      totalSize: '',
      scrollTop: 0 };

  },
  onLoad: function onLoad(options) {
    var avatar_path = uni.getStorageSync('avatar_path');
    var userId = uni.getStorageSync('userId');

    if (options.id) {
      this.$data.toId = options.id;
    } else {
      this.$data.toId = options.toUserId;
    }
    uni.setNavigationBarTitle({
      title: options.fmUserName });


    this.$data.prevIndex = options.chatListIndex ? options.chatListIndex : -1;
    this.$data.fromUserPhoto = options.fromUserPhoto ? options.fromUserPhoto : 'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png';
    this.$data.toUserPhoto = avatar_path ||
    'https://ossyidap.oss-cn-shenzhen.aliyuncs.com/image/png/9EAFE4BFEFDDF762718332C8F1BE9F2C.png';
    this.$data.userInfoId = parseInt(userId) > parseInt(this.$data.toId) ? _md.default.md5(this.$data.toId + userId) : _md.default.md5(userId +
    this.$data.toId);


    var message = {
      fromUserId: userId,
      toUserId: this.$data.toId,
      content: 'page',
      smsType: 'TEXT',
      sysType: 1,
      smsStatus: 10,
      smsList: false,
      currentPage: 1,
      pageSize: 10 };

    this.sendSocketMessage(JSON.stringify(message));

  },
  mounted: function mounted() {

  },
  onShow: function onShow() {
    var _this = this;
    this.globalData.callback = function (res) {
      console.log('-->>', res);
      var result = res;
      if (String(result.userInfoId) == '0') {
        return;
      }
      var HideData = _this.$data.HideData;
      var EventData = _this.$data.EventData;
      var arr = [];
      if (result && result.list) {
        _this.$data.totalSize = result.totalSize;
        var dataTjson = result.list;
        if (dataTjson.length > 0) {
          if (_this.$data.currentPage > 2) {
            _this.$data.HideData = dataTjson;
            _this.$data.noData = true;
          }
          HideData = dataTjson.concat(HideData);
        } else {
          _this.$data.noData = false;
          return false;
        }

        if (_this.$data.currentPage <= 2) {
          _this.$data.EventData = HideData;
          _this.$data.toView = 'row_10';
          _this.scrollToBottom();
        } else {
          _this.$data.HideData = dataTjson;
        }

        var n = _this.$data.totalSize - _this.$data.EventData.length - _this.$data.HideData.length;
        if (n == 0) {
          _this.$data.noData = false;
          var query = uni.createSelectorQuery();
          query.select('#hideview').boundingClientRect();
          query.exec(function (res) {
            _this.$data.scrollTop = res[0].height;
          });
        }
      } else {
        // 单条数据
        if (result instanceof Array) {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.$data.lists = result;
          // prevPage.setData({
          // 	lists: result
          // })
          return;
        } else {
          if (result.fromUserId == 0) {
            if (result.content.indexOf('消息含有敏感内容') != -1) {
              var key = _this.$data.messageCache.findIndex(function (value, index) {
                return value.messageId == result.messageId;
              });
              if (key != -1) {
                var cache = _this.$data.messageCache[key];
                _this.$data.EventData[cache.index].smsStatus = result.smsStatus;
                _this.$data.messageCache.splice(key, 1);
                clearTimeout(cache.delay);
                // _this.$data.EventData = _this.$data.EventData;
              }
              return;
            }
            if (_this.$data.messageCache.length > 0) {
              if (result.currentPage && result.currentPage != '') {
                _this.$data.messageCache.forEach(function (value, index) {
                  _this.$data.EventData[value.index].smsStatus = result.smsStatus;
                });

                // _this.$data.EventData = _this.$data.EventData;
                _this.$data.messageCache = [];

              } else {
                var _key = _this.$data.messageCache.findIndex(function (value, index) {
                  return value.messageId == result.messageId;
                });
                if (_key != -1) {
                  var _cache = _this.$data.messageCache[_key];
                  _this.$data.EventData[_cache.index].smsStatus = result.smsStatus;
                  if (result.smsStatus == 50) {
                    _this.$data.messageCache.splice(_key, 1);
                  }
                  clearTimeout(_cache.delay);
                  // _this.$data.EventData =  _this.$data.EventData;
                }
              }
            }
            return;
          } else {
            // 通知对方我已经阅读消息
            var message = {
              id: result.id,
              fromUserId: 0,
              toUserId: result.fromUserId,
              messageId: result.messageId,
              content: 'page',
              smsType: 'TEXT',
              sysType: 1,
              smsStatus: 50,
              smsList: false,
              currentPage: '',
              pageSize: '' };

            _this.sendSocketMessage(JSON.stringify(message));
            console.log('通知对方我已经阅读消息');
          }
        }

        if (result.userInfoId == _this.$data.userInfoId) {
          _this.$data.EventData.push(result);


        }

        // _this.$data.EventData = _this.$data.EventData;
        _this.scrollToBottom();

        _this.getPrevPage(true, result);
      }

      if (_this.$data.currentPage <= 2) {
        setTimeout(function () {
          _this.bindscrolltoupper1();
        }, 1000);
      }
      // 放开滚动置顶
      _this.$data.scrollLoading = 0;
    };
  },
  methods: {
    bindscroll: function bindscroll(e) {
      // console.log('bindscroll', this.$data.scrollLoading);
      var that = this;
      if (that.$data.scrollLoading == 1) {//防止多次触发
        return false;
      }
      if (!that.$data.noData) {
        return false;
      }
      if (e.detail.scrollTop <= 10) {//触发触顶事件
        // console.log('触发顶部事件', e.detail.scrollTop)
        // 获取隐藏的view 高度
        var query = uni.createSelectorQuery();
        query.select('#hideview').boundingClientRect();

        query.exec(function (res) {
          var EventData = that.$data.EventData; //此数据为展示的数据
          var HideData = that.$data.HideData; //此数据为隐藏数据
          EventData = HideData.concat(that.$data.EventData); // 拼接数据
          if (HideData == '' || !HideData) {// 判断是否隐藏数据为空

            that.$data.NoMoreEvent = 1;
            that.$data.scrollTop = 0;

            return false;
          }
          var n = that.$data.totalSize - that.$data.EventData.length - that.$data.HideData.length;
          if (n < 10) {
            setTimeout(function () {// 自行选择是否定时进行加载
              that.$data.EventData = EventData;
              that.bindscrolltoupper1(); // 请求新的数据
            }, 1000);
          } else {
            setTimeout(function () {// 自行选择是否定时进行加载
              that.$data.EventData = EventData;
              that.$data.scrollTop = res[0].height;
              that.bindscrolltoupper1(); // 请求新的数据
            }, 1000);
          }

        });

      }
    },

    bindscrolltoupper1: function bindscrolltoupper1() {
      var _this = this;

      if (_this.$data.scrollLoading == 1) {//防止多次触发
        return false;
      }
      _this.$data.scrollLoading = 1;
      var currentPage = this.$data.currentPage++;
      var pageSize = this.$data.pageSize;
      console.log('currentPage:' + currentPage);

      uni.showNavigationBarLoading();
      var fromUserId = uni.getStorageSync('userId');
      var toUserId = this.$data.toId;
      var message = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        content: 'page',
        smsType: 'TEXT',
        sysType: 1,
        smsStatus: 10,
        smsList: false,
        currentPage: currentPage,
        pageSize: pageSize };

      console.log('下拉message：', message);
      this.sendSocketMessage(JSON.stringify(message));
      uni.hideNavigationBarLoading(); //在当前页面隐藏导航条加载动画
      uni.stopPullDownRefresh();
    },


    getPrevPage: function getPrevPage(type, result) {
      if (this.$data.prevIndex != -1) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        var lists = prevPage.$data.lists;
        if (type) {
          var _lists = prevPage.$data.lists;
          var res = _lists.findIndex(function (value, index) {
            return value.userInfoId = result.userInfoId;
          });
          if (res != -1) {
            _lists[this.$data.prevIndex].userMessage = result;
          } else {
            prevPage.onSend();
          }
        } else {
          var date = new Date();
          var userMessage = {
            content: result.content,
            createTime: date.getTime(),
            dateTime: date.getHours() + ':' + date.getMinutes(),
            fromUserId: result.fromUserId,
            smsStatus: 30,
            smsType: result.smsType,
            toUserId: result.toUserId,
            userInfoId: result.userInfoId };

          lists[this.$data.prevIndex].userMessage = userMessage;
        }
        prevPage.$data.lists = lists;

      }
    },
    getMessageBySocket: function getMessageBySocket() {
      var data = {};
      data.userId = uni.getStorageSync("userId");
      _IMapi.default.getMessageBySocket({
        method: 'POST',
        data: data }).
      then(function (res) {

      });
    },
    getUserInfoformSocket: function getUserInfoformSocket() {var _this2 = this;
      var _this = this;
      var data = {};
      data.userId = uni.getStorageSync("userId");
      _IMapi.default.getUserInfoformSocket({
        method: 'POST',
        data: data }).
      then(function (res) {
        _this2.$data.to_avatar_path = res.avatar_path;

      });
    },
    audioPlay: function audioPlay(e) {
      var id = e.currentTarget.dataset.id;
      this.audioCtx = uni.createAudioContext(id);
      this.audioCtx.play();
    },

    reply: function reply(e) {var _this3 = this;
      var _this = this;

      var content = e ? e.detail.value : this.$data.content;
      this.$data.content = content;
      if (content == '') {
        uni.showToast({
          title: '总要写点什么吧' });

        return;
      }
      var EventData = this.$data.EventData;
      // 发送消息
      var fromUserId = uni.getStorageSync('userId');
      var toUserId = this.$data.toId;
      var messageId = new Date().getTime() + fromUserId + toUserId + _math.default.math(5);
      messageId = _md.default.md5(messageId);
      var message = {
        fromUserId: fromUserId,
        toUserId: toUserId,
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
          console.log('sendSocketMessage:成功了');
          var len = EventData.push(message);
          console.log(EventData);


          _this.$data.inputShowed = true;
          _this.$data.EventData = EventData;
          _this.$data.content = '';
          _this.timeout(messageId, len - 1);
          _this.getPrevPage(false, message);

        },
        fail: function fail() {
          _this.sendError(len - 1);
        } });

      console.log('EventData -->');
      console.log(this.$data.EventData);
      setTimeout(function () {
        _this3.scrollToBottom();
      }, 100);

    },
    chooseImage: function chooseImage() {var _this4 = this;
      // 选择图片供上传
      var _this = this;
      uni.chooseImage({
        count: 9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function success(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log('选择的图片', tempFilePaths);
          // 遍历多图
          tempFilePaths.forEach(function (tempFilePath) {
            var fromUserId = wx.getStorageSync('userId');
            var toUserId = _this4.$data.toId;
            var content = tempFilePath;
            var messageId = new Date().getTime() + fromUserId + toUserId + _math.default.math(5);
            messageId = _md.default.md5(messageId);
            var message = {
              fromUserId: fromUserId,
              toUserId: toUserId,
              messageId: messageId,
              content: content,
              smsType: 'IMAGE',
              sysType: 1,
              smsStatus: 10,
              smsList: false,
              currentPage: '',
              pageSize: '' };


            var EventData = _this.$data.EventData;

            var len = EventData.push(message);

            _this.$data.EventData = EventData;

            _this4.upload(tempFilePath, 'image', message, len);
          });
        } });

    },
    preview: function preview(e) {
      // 当前点击图片的地址加载高清大图
      var src = e.currentTarget.dataset.src; //获取data-src
      var index = src.indexOf('?');
      if (index != -1) {
        src = src.substring(0, index) + '?x-oss-process=style/big';
      }
      //图片预览
      uni.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      });
    },
    switchMode: function switchMode() {
      // 切换语音与文本模式
      // this.setData({
      //   mode: !this.data.mode
      // });
    },
    record: function record() {
      // 录音事件
      console.log("------------------");
      console.log(this.$data.cancel);
      var _this = this;
      wx.startRecord({
        success: function success(res) {
          console.log("------------------");
          console.log(_this.$data.cancel);
          if (!_this.$data.cancel) {
            _this.upload(res.tempFilePath, 'voice');
          }
        },
        fail: function fail(res) {
          console.log(res);
          //录音失败
        },
        complete: function complete(res) {
          console.log(res);

        } });


    },
    stop: function stop() {
      uni.stopRecord();
    },
    touchStart: function touchStart(e) {
      // 触摸开始
      var startY = e.touches[0].clientY;
      // 记录初始Y值
      this.setData({
        startY: startY,
        status: this.$data.state.pressed });

    },
    touchMove: function touchMove(e) {
      // 触摸移动
      var movedY = e.touches[0].clientY;
      var distance = this.$data.startY - movedY;
      // console.log(distance);
      // 距离超过50，取消发送
      this.setData({
        status: distance > 50 ? this.$data.state.cancel : this.$data.state.pressed });

    },
    touchEnd: function touchEnd(e) {
      // 触摸结束
      var endY = e.changedTouches[0].clientY;
      var distance = this.$data.startY - endY;
      // console.log(distance);
      // 距离超过50，取消发送
      this.setData({
        cancel: distance > 50 ? true : false,
        status: this.$data.state.normal });

      // 不论如何，都结束录音
      this.stop();
    },
    upload: function upload(tempFilePath, type, message, len) {var _this5 = this;
      var _this = this;
      // 上传图片，返回链接地址跟id,返回进度对象
      if (type == 'image') {
        var access_token = uni.getStorageSync('access_token') || uni.getStorageSync('token') || "";
        var data = {};
        data.file = '[object Object]';
        data.type = 'big';
        var timestamp = Date.parse(new Date());
        data.timestamp = timestamp;
        data.sign = _util.default.makeSign(_api.default.apiUrl + '/api/upload', data);
        data.deviceId = "wx";
        data.platformType = "1";
        data.versionCode = '4.0';
        var uploadTask = uni.uploadFile({
          url: "".concat(_api.default.apiUrl, "/api/upload"),
          filePath: tempFilePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': "Bearer ".concat(access_token) },

          formData: data,
          success: function success(res) {
            console.log(res);
            var res = JSON.parse(res.data);
            if (200 === res.code || 0 === res.code) {
              // 发送消息
              message.content = res.data;
              _this5.globalData.localSocket.send({
                data: JSON.stringify(message),
                success: function success() {
                  _this.timeout(message.messageId, len - 1);
                  _this.getPrevPage(false, message);
                },
                fail: function fail() {
                  _this.sendError(len - 1);
                } });

            } else {
              _this.sendError(len - 1);
            }
          },
          fail: function fail(err) {
            _this.sendError(len - 1);
          },
          complete: function complete() {
            _this5.scrollToBottom();
          } });

      }
      setTimeout(function () {
        _this5.scrollToBottom();
        uni.hideLoading();
      }, 300);
    },
    sendError: function sendError(len) {
      var _this = this;
      var error = this.$data.EventData[len];
      if (error) {
        error.smsStatus = 20;
        _this.$data.EventData = _this.$data.EventData;
      }
    },
    timeout: function timeout(messageId, len) {var _this6 = this;
      var _this = this;
      var delay = setTimeout(function () {
        if (_this.$data.messageCache.length > 0) {
          var key = _this.$data.messageCache.findIndex(function (value, index) {
            return value.messageId == messageId;
          });
          if (key != -1) {
            _this.$data.EventData[len].smsStatus = 20;
            _this.$data.EventData = _this.$data.EventData;
            clearTimeout(_this6);
          }
        }
      }, 60000);
      _this.$data.messageCache.push({
        'messageId': messageId,
        'delay': delay,
        'index': len });

    },
    retry: function retry(e) {// 消息重试
      var _this = this;
      var index = e.currentTarget.dataset.key;
      var message = _this.$data.EventData[index];
      if (message) {
        message.smsStatus = 10;
        _this.$data.EventData = _this.$data.EventData;
        this.globalData.localSocket.send({
          data: JSON.stringify(message),
          success: function success() {
            _this.timeout(message.messageId, index);
          },
          fail: function fail() {
            console.log('消息重试失败');
          } });

      }
    },

    scrollToBottom: function scrollToBottom() {
      this.$data.toView = 'row_' + (this.$data.EventData.length - 1);
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
  return _c(
    "view",
    [
      _c(
        "scroll-view",
        {
          staticClass: "message-list",
          style: { height: _vm.scroll_height + "px" },
          attrs: {
            "upper-threshold": "20",
            "scroll-into-view": _vm.toView,
            "scroll-top": _vm.scrollTop,
            "scroll-y": "isScrollY",
            focus: _vm.mode,
            "enable-back-to-top": "true",
            eventid: "73b8c1b7-6"
          },
          on: { scroll: _vm.bindscroll }
        },
        [
          _c("view", { staticClass: "loding-img" }, [
            _vm.noData
              ? _c("image", { attrs: { src: "/static/images/loading.gif" } })
              : _vm._e(),
            !_vm.noData ? _c("view", [_vm._v("没有更多数据了")]) : _vm._e()
          ]),
          _c(
            "view",
            { attrs: { id: "hideview" } },
            _vm._l(_vm.HideData, function(item, index) {
              return _c(
                "view",
                { key: index, staticClass: "row" },
                [
                  item.timeInterval && item.timeInterval != ""
                    ? _c("view", { staticClass: "datetime" }, [
                        _vm._v(_vm._s(item.timeInterval))
                      ])
                    : _vm._e(),
                  _c(
                    "view",
                    {
                      staticClass: "body",
                      style: {
                        "flex-flow":
                          item.fromUserId != _vm.userId ? "row" : "row-reverse"
                      }
                    },
                    [
                      _c("view", { staticClass: "avatar-container" }, [
                        _c("image", {
                          staticClass: "avatar",
                          attrs: {
                            src:
                              item.fromUserId != _vm.userId
                                ? _vm.fromUserPhoto
                                : _vm.toUserPhoto
                          }
                        })
                      ]),
                      item.smsType == "TEXT"
                        ? _c("block", [
                            _c("view", {
                              staticClass: "triangle",
                              style:
                                item.fromUserId == _vm.userId
                                  ? "right: 110rpx; background: #7ECB4B"
                                  : "left: 110rpx;"
                            }),
                            _c(
                              "view",
                              {
                                staticClass: "msg-content",
                                style:
                                  item.fromUserId == _vm.userId
                                    ? "background: #7ECB4B;left:5rpx;"
                                    : ""
                              },
                              [
                                item.smsType == "TEXT"
                                  ? _c("text", { staticClass: "msg-text" }, [
                                      _vm._v(_vm._s(item.content))
                                    ])
                                  : _vm._e(),
                                item.smsType == "VOICE"
                                  ? _c("audio", {
                                      staticStyle: {
                                        width: "100px",
                                        height: "20px"
                                      },
                                      attrs: {
                                        "data-id": "audio_" + index,
                                        src: item.content,
                                        eventid: "73b8c1b7-0-" + index
                                      },
                                      on: { tap: _vm.audioPlay }
                                    })
                                  : _vm._e()
                              ],
                              1
                            )
                          ])
                        : _vm._e(),
                      item.smsType == "IMAGE"
                        ? _c("image", {
                            staticClass: "picture",
                            attrs: {
                              src: item.content,
                              mode: "widthFix",
                              "data-src": item.content,
                              eventid: "73b8c1b7-1-" + index
                            },
                            on: { tap: _vm.preview }
                          })
                        : _vm._e(),
                      item.fromUserId == _vm.userId && item.smsStatus
                        ? _c(
                            "block",
                            [
                              item.smsStatus == 10
                                ? _c("image", {
                                    staticClass: "msg-img",
                                    attrs: { src: "/static/images/loading.gif" }
                                  })
                                : _vm._e(),
                              item.smsStatus == 20
                                ? _c("icon", {
                                    staticClass: "msg-icon",
                                    attrs: {
                                      "data-key": index,
                                      type: "warn",
                                      size: "22",
                                      eventid: "73b8c1b7-2-" + index
                                    },
                                    on: { tap: _vm.retry }
                                  })
                                : _vm._e()
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  ),
                  item.fromUserId == _vm.userId && item.smsStatus
                    ? _c("block", [
                        item.smsStatus == 40
                          ? _c("text", { staticClass: "msg-status" }, [
                              _vm._v("已送达")
                            ])
                          : _vm._e(),
                        item.smsStatus == 50
                          ? _c("text", { staticClass: "msg-status msg-read" }, [
                              _vm._v("已读")
                            ])
                          : _vm._e()
                      ])
                    : _vm._e()
                ],
                1
              )
            })
          ),
          _c(
            "view",
            _vm._l(_vm.EventData, function(item, index) {
              return _c(
                "view",
                {
                  key: index,
                  staticClass: "row",
                  attrs: { id: "row_" + index }
                },
                [
                  item.timeInterval && item.timeInterval != ""
                    ? _c("view", { staticClass: "datetime" }, [
                        _vm._v(_vm._s(item.timeInterval))
                      ])
                    : _vm._e(),
                  _c(
                    "view",
                    {
                      staticClass: "body",
                      style: {
                        "flex-flow":
                          item.fromUserId != _vm.userId ? "row" : "row-reverse"
                      }
                    },
                    [
                      _c("view", { staticClass: "avatar-container" }, [
                        _c("image", {
                          staticClass: "avatar",
                          attrs: {
                            src:
                              item.fromUserId != _vm.userId
                                ? _vm.fromUserPhoto
                                : _vm.toUserPhoto
                          }
                        })
                      ]),
                      item.smsType == "TEXT"
                        ? _c("block", [
                            _c("view", {
                              staticClass: "triangle",
                              style:
                                item.fromUserId == _vm.userId
                                  ? "right: 110rpx; background: #7ECB4B"
                                  : "left: 110rpx;"
                            }),
                            _c(
                              "view",
                              {
                                staticClass: "msg-content",
                                style:
                                  item.fromUserId == _vm.userId
                                    ? "background: #7ECB4B;left:5rpx;"
                                    : ""
                              },
                              [
                                item.smsType == "TEXT"
                                  ? _c("text", { staticClass: "msg-text" }, [
                                      _vm._v(_vm._s(item.content))
                                    ])
                                  : _vm._e(),
                                item.smsType == "VOICE"
                                  ? _c("audio", {
                                      staticStyle: {
                                        width: "100px",
                                        height: "20px"
                                      },
                                      attrs: {
                                        "data-id": "audio_" + index,
                                        src: item.content,
                                        eventid: "73b8c1b7-3-" + index
                                      },
                                      on: { tap: _vm.audioPlay }
                                    })
                                  : _vm._e()
                              ],
                              1
                            )
                          ])
                        : _vm._e(),
                      item.smsType == "IMAGE"
                        ? _c("image", {
                            staticClass: "picture",
                            attrs: {
                              src: item.content,
                              mode: "widthFix",
                              "data-src": item.content,
                              eventid: "73b8c1b7-4-" + index
                            },
                            on: { tap: _vm.preview }
                          })
                        : _vm._e(),
                      item.fromUserId == _vm.userId && item.smsStatus
                        ? _c(
                            "block",
                            [
                              item.smsStatus == 10
                                ? _c("image", {
                                    staticClass: "msg-img",
                                    attrs: { src: "/static/images/loading.gif" }
                                  })
                                : _vm._e(),
                              item.smsStatus == 20
                                ? _c("icon", {
                                    staticClass: "msg-icon",
                                    attrs: {
                                      "data-key": index,
                                      type: "warn",
                                      size: "22",
                                      eventid: "73b8c1b7-5-" + index
                                    },
                                    on: { tap: _vm.retry }
                                  })
                                : _vm._e()
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  ),
                  item.fromUserId == _vm.userId && item.smsStatus
                    ? _c("block", [
                        item.smsStatus == 40
                          ? _c("text", { staticClass: "msg-status" }, [
                              _vm._v("已送达")
                            ])
                          : _vm._e(),
                        item.smsStatus == 50
                          ? _c("text", { staticClass: "msg-status msg-read" }, [
                              _vm._v("已读")
                            ])
                          : _vm._e()
                      ])
                    : _vm._e()
                ],
                1
              )
            })
          )
        ]
      ),
      _vm.status != _vm.state.normal
        ? _c("view", { staticClass: "hud-container" }, [
            _c("view", { staticClass: "hud-background" }),
            _c("view", { staticClass: "hud-body" }, [
              _c("image", { attrs: { src: "./images/mic.png" } }),
              _c(
                "view",
                {
                  staticClass: "tip",
                  class: _vm.status == _vm.state.cancel ? "warning" : ""
                },
                [_vm._v(_vm._s(_vm.tips[_vm.status]))]
              )
            ])
          ])
        : _vm._e(),
      _c("view", { staticClass: "height100" }),
      _c("view", { staticClass: "reply" }, [
        _c("view", { staticClass: "opration-area ply" }, [
          _vm.mode
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.content,
                    expression: "content"
                  }
                ],
                attrs: {
                  "confirm-hold": "true",
                  type: "text",
                  "confirm-type": "send",
                  eventid: "73b8c1b7-7"
                },
                domProps: { value: _vm.content },
                on: {
                  focus: _vm.inputShowed,
                  confirm: _vm.reply,
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.content = $event.target.value
                  }
                }
              })
            : _vm._e()
        ]),
        _c("image", {
          staticClass: "choose-image ply",
          attrs: { src: "/static/images/image.png", eventid: "73b8c1b7-8" },
          on: { tap: _vm.chooseImage }
        })
      ])
    ],
    1
  )
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

/***/ "E:\\uniapp\\find.yidapi.com.cn\\utils\\IMapi.js":
/*!***************************************************!*\
  !*** E:/uniapp/find.yidapi.com.cn/utils/IMapi.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var _md5Min = _interopRequireDefault(__webpack_require__(/*! ./md5.min.js */ "E:\\uniapp\\find.yidapi.com.cn\\utils\\md5.min.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var apiUrl = 'https://webapi.yidap.com'; // 测试
//const apiUrl = 'https://apiv2.yidap.com';     // 正式
//const apiUrl = 'http://localhost:9331';
Promise.prototype.finally = function (callback) {var P = this.constructor;return this.then(
  function (value) {return P.resolve(callback()).then(function () {return value;});},
  function (reason) {return P.resolve(callback()).then(function () {throw reason;});});

};
/*
    *  
    * @param {*} params 
    * @param {*} url String
    * @param {*} data Object
    * @param {*} success Function
    * @param {*} fail Function
    * @param {*} complete Function
    */
// id 类型或id   st 状态

// sign签名拼接方法
function MakeSign(url, Obj) {
  var newKey = Object.keys(Obj).sort();
  var newObj = {};
  for (var i = 0; i < newKey.length; i++) {
    newObj[newKey[i]] = Obj[newKey[i]];
  }
  var str = '';
  for (var key in newObj) {
    str += key + '=' + newObj[key] + '&';
  }
  var newUrl = '';
  if (url.indexOf('https://webapi.yidap.com') > -1) {
    newUrl = url.split('https://webapi.yidap.com')[1];
  } else {
    newUrl = url.split('https://apiv2.yidap.com')[1];
  }
  var newStr = newUrl + '?' + str.substring(0, str.length - 1) + 'zhong_pi_lian';
  newStr = newStr.replace('sign=&', '');
  return (0, _md5Min.default)(newStr);
}

var myRequest = function myRequest() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var url = arguments.length > 1 ? arguments[1] : undefined;var id = arguments.length > 2 ? arguments[2] : undefined;var st = arguments.length > 3 ? arguments[3] : undefined;var page = arguments.length > 4 ? arguments[4] : undefined;

  return new Promise(function (resolve, reject) {
    var timestamp = Date.parse(new Date());

    var data = params.data || {};

    data.timestamp = timestamp;
    data.sign = MakeSign(url, data);
    data.deviceId = "wx";
    data.platformType = "2";
    data.versionCode = '4.0';

    var token = wx.getStorageSync('token') || '';
    var token_type = wx.getStorageSync('token_type') || 'Bearer';
    // data.member_token = token;
    var header = { 'Accept': 'application/json', 'Authorization': token_type + ' ' + token };
    var apiUrl = url;
    if (id != undefined) {
      apiUrl = url + '/' + id;
    }
    if (st != undefined) {
      apiUrl = apiUrl + '/' + st;
    }
    if (page != undefined) {
      apiUrl = apiUrl + '?page=' + page;
    }
    wx.request({
      url: apiUrl,
      method: params.method || 'GET',
      data: data,
      header: header,
      success: function success(res) {
        var res = res.data;
        if (200 === res.code || 0 === res.code) {
          resolve(res);
        } else {

          if (401 === res.code) {
            wx.hideLoading();
            console.log('401统一处理');
            var fromCenter = wx.getStorageSync('fromCenter');
            wx.setStorageSync('fromCenter', '0');
            if (fromCenter != 1) {
              wx.showModal({
                title: '您尚未登录',
                content: '是否前往登录页面',
                confirmText: '前往',
                // confirmColor: '#c81a29',
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../login/login' });

                    return false;
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                } });

            }
          }
          if (201 === res.code) {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000 });

          }
          reject(res);
        }
      },
      fail: function fail(err) {
        // 请求超时处理
        if (err.errMsg || err.errMsg === "request:fail timeout") {
          wx.showToast({
            title: '网络请求超时',
            image: '../../public/images/icon/error.png',
            duration: 3000 });

          wx.hideLoading();
        }

        //reject(err);

      },
      complete: function complete(res) {

      } });

  });
};

// 根据用户ID获取用户信息
var getUserInfoformSocket = function getUserInfoformSocket(params) {return myRequest(params, "".concat(apiUrl, "/app/socket/getPhoto?userId=").concat(params.data.userId));};

// 获取聊天记录
var getMessageBySocket = function getMessageBySocket(params) {return myRequest(params, "".concat(apiUrl, "/app/socket/getMessage"));};


// 未读消息
var getCacheMessage = function getCacheMessage(params) {return myRequest(params, "".concat(apiUrl, "/app/socket/getCacheMessage"));};

// 未读消息
var getPhotoByIM = function getPhotoByIM(params) {return myRequest(params, "".concat(apiUrl, "/app/socket/getPhoto"));};




module.exports = {
  getPhotoByIM: getPhotoByIM,
  getCacheMessage: getCacheMessage,
  getMessageBySocket: getMessageBySocket,
  getUserInfoformSocket: getUserInfoformSocket };

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