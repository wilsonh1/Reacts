chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let p = message.data;
    p.sort(function(a, b) {
        return parseInt(b.cnt)-parseInt(a.cnt);
    });
    p.forEach(function(row) {
        if (!row.cnt)
            return;
        let img = document.createElement("img");
        img.src = row.pfp;
        img.height = 27;
        img.width = 27;
        let td = document.createElement("td");
        td.appendChild(img);
        let tr = document.createElement("tr");
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerText = row.name;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerText = row.cnt;
        tr.appendChild(td);
        document.getElementsByTagName("table")[0].appendChild(tr);
    });
    sendResponse({
        data: "received"
    });
});

chrome.storage.sync.get('isr', function(data) {
    if(data.isr){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "received"}, function(response) {
                console.log(response.result);
            });
        });
    }
});
