function setR (isr) {
    chrome.storage.sync.set({'isr': isr});
    window.location.href = "data.html"
}

document.getElementById("received").onclick = function() {
    setR(true)
};

document.getElementById("given").onclick = function() {
    setR(false)
};
