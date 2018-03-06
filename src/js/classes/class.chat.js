"use strict";

class Chat {
    constructor() {
        this.chatRooms = {};
        this.chatroomCurrent = "current_chatroom";
        this.chatroomData = "chatroom_data";
    }

    createNewChatRoom(user, chatroom, avatar) {
        if(!this.isChatRoomCreated(chatroom)) {
            sessionStorage.setItem(this.chatroomCurrent, chatroom);

            this._loadChatRoom(chatroom);

            this.sendMessage(
                chatroom,
                user,
                avatar,
                "Welcome to the chat! :-)"
            );
        } else {
            this.chatRooms = this.getChatRoomData();
        }
    }

    getChatRoomData() {
        const chatRoomSessionData = sessionStorage.getItem(this.chatroomData);

        if(chatRoomSessionData)
            return JSON.parse(chatRoomSessionData);

        return {};
    }

    getCurrentChatRoom() {
        const chatRoomSessionName = sessionStorage.getItem(this.chatroomCurrent);

        if(chatRoomSessionName)
            return chatRoomSessionName;

        return "randomId";
    }

    hasChatRooms() {
        if (sessionStorage.getItem(this.chatroomCurrent))
            return true;

        return;
    }

    isChatRoomCreated(chatroom) {
        if(this.hasChatRooms())
        {
            if(sessionStorage.getItem(this.chatroomCurrent) == chatroom)
            {
                return true;
            }
        }

        return false;
    }

    sendMessage(chatroom, user_id, user_avatar, message) {
        if(message)
        {
            this.chatRooms[chatroom].log.push({
                from_user: user_id,
                avatar: user_avatar,
                message: message
            });

            this._setChatRoomData(this.chatRooms);
        }
    }

    getMessagesLog(chatroom) {
        return this.chatRooms[chatroom].log;
    }

    _loadChatRoom(chatroom) {
        if(chatroom) {
            this.chatRooms[chatroom] = {
                log: []
            };
        }
    }

    _setChatRoomData(chat_rooms) {
        sessionStorage.setItem(this.chatroomData, JSON.stringify(chat_rooms));
    }
}
