var b = document.getElementById("received");
b.onclick = function() {
    chrome.storage.sync.set({'isr': true}, function() {});
    window.location.href = "data.html"
};
