"use strict";

(function () {
    var updateMessages = function updateMessages() {
        var messages = [chat.getMessagesLog(getHash())];

        var messagesTemplate = "\n            <ul class=\"messages-list\">\n                " + messages[0].map(function (message) {
            return "\n                    <li class=\"" + (message["from_user"] == myProfileId ? "messages-list__is-sender" : "") + "\">\n                        <div>\n                            <img src=\"" + message.avatar + "\"/>\n                        </div>\n                        <div class=\"message\">\n                            " + message["message"] + "\n                        </div>\n                        <div>\n                            <a href=\"#profile\">\n                                <img src=\"" + message.avatar + "\"/>\n                            </a>\n                        </div>\n                    </li>\n                ";
        }).join("") + "\n            </ul>\n        ";

        var messagesContainer = document.getElementById("messagesContainer");

        messagesContainer.innerHTML = messagesTemplate;
    };

    var loadProfileTemplate = function loadProfileTemplate() {
        var profileTemplate = "\n            <div class=\"container\">\n                <header class=\"header\">\n                    <h1>" + userProfileData.name + "</h1>\n                </header>\n \n                <div class=\"profile\" id=\"profile\">\n                    <div class=\"avatar\">\n                        <a href=\"#chat-" + userProfileData.chatroom + "\">\n                            <div class=\"avatar__image\">\n                                <div class=\"avatar__status round-label\">\n                                    <span>" + userProfileData.status + "</span>\n                                </div>\n                            \n                                <img src=\"" + userProfileData.avatar + "\"/>\n                            </div>\n                        </a>\n                    </div>\n    \n                    <div class=\"user-description\">\n                        <h3>" + userProfileData.name + ", " + userProfileData.age + "</h3>\n                        <h4>" + userProfileData.location + "</h4>\n    \n                        <p>" + userProfileData.description + "</p>\n                    </div>\n    \n                    <button class=\"btn btn--fullwidth\" id=\"addFriend\">Add as a friend</button>\n                </div>\n            </div>\n        ";

        document.getElementById("app").innerHTML = profileTemplate;

        if (favoriteUsers.isFriend(userProfileId)) {
            document.getElementById("profile").classList.add("profile--is-active");
        }
    };

    var loadChatTemplate = function loadChatTemplate() {
        chat = new Chat();

        chat.createNewChatRoom(userProfileId, getHash(), userProfileAvatar);

        var chatTemplate = "\n            <div class=\"container\">\n                <header class=\"header\">\n                    <a href=\"#profile\" class=\"header__back-button\">\n                        <i class=\"icon-chevron-left\"></i>\n                    </a>\n\n                    <h1>" + userProfileData.name + "</h1>\n                </header>\n                <div class=\"profile\">\n                    <div id = \"messagesContainer\"></div>\n                    \n                    <div class=\"input-group\">\n                        <input type=\"text\" id=\"messageText\" class=\"form-control\" placeholder=\"Write a message...\"/>\n                    </div>\n                </div>\n            </div>\n        ";

        document.getElementById("app").innerHTML = chatTemplate;

        updateMessages();
    };

    var pageSwitcher = function pageSwitcher() {
        if (location.hash.indexOf("chat") == 1) {
            loadChatTemplate();
        } else {
            loadProfileTemplate();
        }
    };

    window.onhashchange = function () {
        pageSwitcher();
    };

    document.addEventListener("click", function (e) {
        var profileWrapper = document.getElementById("profile");

        if (e.target && e.target.id == "addFriend") {
            if (favoriteUsers.isFriend(userProfileId)) {
                favoriteUsers.removeFriend(userProfileId);

                profileWrapper.classList.remove("profile--is-active");
            } else {
                favoriteUsers.addFriend(userProfileId);

                profileWrapper.classList.add("profile--is-active");
            }
        }
    });

    document.addEventListener("keypress", function (e) {
        var textTarget = "messageText";

        if (e.target && e.target.id == textTarget) {
            if (e.keyCode == 13) {
                var message = document.querySelector("#" + textTarget);

                chat.sendMessage(getHash(), myProfileId, myProfileAvatar, message.value);

                message.value = "";

                updateMessages();
            }
        }
    });

    pageSwitcher();
})();