"use strict";

function getHash() {
    var current_hash = location.hash.substr(1);

    return current_hash.split("-")[1];
};

function getUsers() {
    var xhReq = new XMLHttpRequest();

    xhReq.open("GET", "data/users.json", false);
    xhReq.send(null);

    return JSON.parse(xhReq.responseText);
}
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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Friends = function () {
    function Friends() {
        _classCallCheck(this, Friends);

        this.favoriteUsers = {};

        this.friendsData = "friends";

        if (this.getStoredFriends()) this.favoriteUsers = this.getStoredFriends();
    }

    _createClass(Friends, [{
        key: "getStoredFriends",
        value: function getStoredFriends() {
            var friendsSessionData = sessionStorage.getItem(this.friendsData);

            if (friendsSessionData) return JSON.parse(friendsSessionData);
        }
    }, {
        key: "getListOfFriends",
        value: function getListOfFriends() {
            return this.favoriteUsers;
        }
    }, {
        key: "getTotalFriends",
        value: function getTotalFriends() {
            return Object.keys(this.favoriteUsers).length;
        }
    }, {
        key: "isFriend",
        value: function isFriend(id) {
            if (this.favoriteUsers[id]) {
                return true;
            }

            return;
        }
    }, {
        key: "addFriend",
        value: function addFriend(id) {
            this.favoriteUsers[id] = true;

            this._setFriend();

            return true;
        }
    }, {
        key: "removeFriend",
        value: function removeFriend(id) {
            delete this.favoriteUsers[id];

            this._setFriend();

            return true;
        }
    }, {
        key: "_setFriend",
        value: function _setFriend() {
            sessionStorage.setItem(this.friendsData, JSON.stringify(this.favoriteUsers));
        }
    }, {
        key: "_hasFriendsInSession",
        value: function _hasFriendsInSession() {
            if (sessionStorage.friends) return true;

            return false;
        }
    }]);

    return Friends;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profile = function Profile(profile_data) {
    _classCallCheck(this, Profile);

    this.profileData = profile_data;
};