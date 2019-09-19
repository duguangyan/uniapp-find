import global from './global.js'

function initSocket (userId, toUserId) {
	if (global.connentSocket) {
		console.warn('连接已存在！');
		return false
	}
	if (!userId || userId == '') {
		console.error('用户id为空连接失败！');
		return false
	}
	if (global.initType == 2 && toUserId == '') {
		console.error('用户id为空连接失败！')
		return false
	}
	global.localSocket = wx.connectSocket({
		//此处 url 可以用来测试 // im.yidap.com webapi.yidapi.com.cn
		url: `${global.url}/notice/socket?userId=${userId}&platform=1`,
		success: () => {
			global.userId = userId;
			if (global.initType == 2) {
				global.toUserId = toUserId
			}
			global.connentSocket = true
		}
	})
	//版本库需要在 1.7.0 以上
	global.localSocket.onOpen(function (res) {
		console.log('socket连接成功，initType = ' + global.initType)
		if (global.initType == 1) {
			sendChatList(userId)
		} else if (global.initType == 2) {
			sendChat(userId, toUserId)
		}
		global.connentSocket = true;
		startConnect();
		global.connectTime = 3000
	})
	global.localSocket.onError(function (res) {
		global.connentSocket = false;
		reconnect();
		global.connectTime = global.connectTime * 2
	})
	global.localSocket.onClose(function (res) {
		global.connentSocket = false
	})
	global.localSocket.onMessage(function (res) {
		// 用于在其他页面监听 websocket 返回的消息
		let result = JSON.parse(res.data);
		console.log('收到消息', result)
		if (!result.length && !result.currentPage) {
			if (result.fromUserId != 0) {
				let message = { id: result.id, fromUserId: 0, toUserId: result.fromUserId, messageId: result.messageId, content: 'page', smsType: 'TEXT', sysType: 1, smsStatus: 40, smsList: false, currentPage: '', pageSize: '' };
				
				sendSocketMessage(JSON.stringify(message));
			}
		}
		global.callback(result);
		resetConnect()
	})
}

function sendSocketMessage (msg) {
	return new Promise((resolve, reject) => {
		if (global.connentSocket) {
			global.localSocket.send({
				data: msg,
				success: function(res) {
					resolve(res)
				},
				fail: function(e) {
					reject(e)
				}
			})
		}
	})
}

function reconnect () {
	if (global.lockReconnect) {
		return false
	}
	global.lockReconnect = true;
	global.timeoutNum && clearTimeout(global.timeoutNum);
	global.timeoutNum = setTimeout(() => {
		if (global.userId && global.userId != '') {
			initSocket(global.userId, global.toUserId);
			global.lockReconnect = false
		}
	}, global.connectTime)
}

function resetConnect () {
	clearTimeout(global.timeoutObj);
	startConnect()
}

function startConnect () {
	global.timeoutObj && clearTimeout(global.timeoutObj)
	global.timeoutObj = setTimeout(() => {
		if (global.connentSocket) {
			let message = { id: 0, fromUserId: 0, toUserId: 0, userInfoId: 0, content: 'ping', smsType: 'TEXT', sysType: 1, smsStatus: 10, smsList: false, currentPage: '', pageSize: '' };
			sendSocketMessage(JSON.stringify(message))
		} else {
			reconnect()
		}
	}, global.timeout)
}

function sendChatList(userId) {
	let message = {
		fromUserId: userId,
		toUserId: '',
		content: 'page',
		smsType: 'TEXT',
		sysType: 1,
		smsStatus: 10,
		smsList: true,
		currentPage: '',
		pageSize: ''
	}
	console.log('获取聊天列表！！！')
	sendSocketMessage(JSON.stringify(message))
}

function sendChat(userId, toUserId) {
	let message = {
		fromUserId: userId,
		toUserId: toUserId,
		content: 'page',
		smsType: 'TEXT',
		sysType: 1,
		smsStatus: 10,
		smsList: false,
		currentPage: 1,
		pageSize: 15
	}
	console.log('获取聊天历史！！！')
	sendSocketMessage(JSON.stringify(message))
}

export default {
	initSocket
}