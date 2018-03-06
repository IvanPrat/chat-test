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