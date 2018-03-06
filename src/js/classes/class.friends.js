"use strict";

class Friends {
    constructor() {
        this.favoriteUsers = {};

        this.friendsData = "friends";

        if(this.getStoredFriends())
            this.favoriteUsers = this.getStoredFriends();
    }

    getStoredFriends() {
        const friendsSessionData = sessionStorage.getItem(this.friendsData);

        if(friendsSessionData)
            return JSON.parse(friendsSessionData);
    }

    getListOfFriends() {
        return this.favoriteUsers;
    }

    getTotalFriends() {
        return Object.keys(this.favoriteUsers).length;
    }

    isFriend(id) {
        if(this.favoriteUsers[id]) {
            return true;
        }

        return;
    }

    addFriend(id) {
        this.favoriteUsers[id] = true;

        this._setFriend();

        return true;
    }

    removeFriend(id) {
        delete this.favoriteUsers[id];

        this._setFriend();

        return true;
    }

    _setFriend() {
        sessionStorage.setItem(this.friendsData, JSON.stringify(this.favoriteUsers));
    }

    _hasFriendsInSession() {
        if(sessionStorage.friends)
            return true;

        return false;
    }
}