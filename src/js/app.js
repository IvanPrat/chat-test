"use strict";

(function () {
    var updateMessages = function() {
        var messages = [
            chat.getMessagesLog(getHash())
        ];

        var messagesTemplate = `
            <ul class="messages-list">
                ${messages[0].map(message =>
                `
                    <li class="${message["from_user"] == myProfileId ? "messages-list__is-sender" : ""}">
                        <div>
                            <img src="${message.avatar}"/>
                        </div>
                        <div class="message">
                            ${message["message"]}
                        </div>
                        <div>
                            <a href="#profile">
                                <img src="${message.avatar}"/>
                            </a>
                        </div>
                    </li>
                `).join("")}
            </ul>
        `;

        var messagesContainer = document.getElementById("messagesContainer");

        messagesContainer.innerHTML = messagesTemplate;
    };

    var loadProfileTemplate = function () {
        var profileTemplate = `
            <div class="container">
                <header class="header">
                    <h1>${userProfileData.name}</h1>
                </header>
 
                <div class="profile" id="profile">
                    <div class="avatar">
                        <a href="#chat-${userProfileData.chatroom}">
                            <div class="avatar__image">
                                <div class="avatar__status round-label">
                                    <span>${userProfileData.status}</span>
                                </div>
                            
                                <img src="${userProfileData.avatar}"/>
                            </div>
                        </a>
                    </div>
    
                    <div class="user-description">
                        <h3>${userProfileData.name}, ${userProfileData.age}</h3>
                        <h4>${userProfileData.location}</h4>
    
                        <p>${userProfileData.description}</p>
                    </div>
    
                    <button class="btn btn--fullwidth" id="addFriend">Add as a friend</button>
                </div>
            </div>
        `;

        document.getElementById("app").innerHTML = profileTemplate;

        if(favoriteUsers.isFriend(userProfileId)) {
            document.getElementById("profile").classList.add("profile--is-active");
        }
    };

    var loadChatTemplate = function() {
        chat = new Chat();

        chat.createNewChatRoom(userProfileId, getHash(), userProfileAvatar);

        var chatTemplate = `
            <div class="container">
                <header class="header">
                    <a href="#profile" class="header__back-button">
                        <i class="icon-chevron-left"></i>
                    </a>

                    <h1>${userProfileData.name}</h1>
                </header>
                <div class="profile">
                    <div id = "messagesContainer"></div>
                    
                    <div class="input-group">
                        <input type="text" id="messageText" class="form-control" placeholder="Write a message..."/>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("app").innerHTML = chatTemplate;

        updateMessages();
    };

    var pageSwitcher = function () {
        if(location.hash.indexOf("chat") == 1) {
            loadChatTemplate();
        }
        else
        {
            loadProfileTemplate();
        }
    };

    window.onhashchange = function(){
        pageSwitcher();
    };

    document.addEventListener("click", function(e){
        const profileWrapper = document.getElementById("profile");

        if(e.target && e.target.id== "addFriend") {
            if(favoriteUsers.isFriend(userProfileId))
            {
                favoriteUsers.removeFriend(userProfileId);

                profileWrapper.classList.remove("profile--is-active");
            }
            else
            {
                favoriteUsers.addFriend(userProfileId);

                profileWrapper.classList.add("profile--is-active");
            }
        }


    });

    document.addEventListener("keypress", function(e) {
        const textTarget = "messageText";

        if(e.target && e.target.id== textTarget) {
            if (e.keyCode == 13) {
                const message = document.querySelector("#" + textTarget);

                chat.sendMessage(
                    getHash(),
                    myProfileId,
                    myProfileAvatar,
                    message.value
                );

                message.value = "";

                updateMessages();
            }
        }
    });

    pageSwitcher();
})();