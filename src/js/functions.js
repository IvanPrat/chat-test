function getHash() {
    const current_hash = location.hash.substr(1);

    return current_hash.split("-")[1];
};

function getUsers() {
    const xhReq = new XMLHttpRequest();

    xhReq.open("GET", "data/users.json", false);
    xhReq.send(null);

    return JSON.parse(xhReq.responseText);
}