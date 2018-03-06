"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
    function Chat() {
        _classCallCheck(this, Chat);

        this.chatRooms = {};
        this.chatroomCurrent = "current_chatroom";
        this.chatroomData = "chatroom_data";
    }

    _createClass(Chat, [{
        key: "createNewChatRoom",
        value: function createNewChatRoom(user, chatroom, avatar) {
            if (!this.isChatRoomCreated(chatroom)) {
                sessionStorage.setItem(this.chatroomCurrent, chatroom);

                this._loadChatRoom(chatroom);

                this.sendMessage(chatroom, user, avatar, "Welcome to the chat! :-)");
            } else {
                this.chatRooms = this.getChatRoomData();
            }
        }
    }, {
        key: "getChatRoomData",
        value: function getChatRoomData() {
            var chatRoomSessionData = sessionStorage.getItem(this.chatroomData);

            if (chatRoomSessionData) return JSON.parse(chatRoomSessionData);

            return {};
        }
    }, {
        key: "getCurrentChatRoom",
        value: function getCurrentChatRoom() {
            var chatRoomSessionName = sessionStorage.getItem(this.chatroomCurrent);

            if (chatRoomSessionName) return chatRoomSessionName;

            return "randomId";
        }
    }, {
        key: "hasChatRooms",
        value: function hasChatRooms() {
            if (sessionStorage.getItem(this.chatroomCurrent)) return true;

            return;
        }
    }, {
        key: "isChatRoomCreated",
        value: function isChatRoomCreated(chatroom) {
            if (this.hasChatRooms()) {
                if (sessionStorage.getItem(this.chatroomCurrent) == chatroom) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "sendMessage",
        value: function sendMessage(chatroom, user_id, user_avatar, message) {
            if (message) {
                this.chatRooms[chatroom].log.push({
                    from_user: user_id,
                    avatar: user_avatar,
                    message: message
                });

                this._setChatRoomData(this.chatRooms);
            }
        }
    }, {
        key: "getMessagesLog",
        value: function getMessagesLog(chatroom) {
            return this.chatRooms[chatroom].log;
        }
    }, {
        key: "_loadChatRoom",
        value: function _loadChatRoom(chatroom) {
            if (chatroom) {
                this.chatRooms[chatroom] = {
                    log: []
                };
            }
        }
    }, {
        key: "_setChatRoomData",
        value: function _setChatRoomData(chat_rooms) {
            sessionStorage.setItem(this.chatroomData, JSON.stringify(chat_rooms));
        }
    }]);

    return Chat;
}();