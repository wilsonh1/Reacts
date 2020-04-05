chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let p = message.data;
    p.sort(function(a, b) {
        return parseInt(b.total)-parseInt(a.total);
    });
    console.log(p);
    p.forEach(function(row) {
        if (!row.total)
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
        for (let i = 0; i < 7; i++) {
            td = document.createElement("td");
            if (row["e" + i])
                td.innerText = row["e" + i];
            tr.appendChild(td);
        }
        td = document.createElement("td");
        td.innerText = row.total;
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
