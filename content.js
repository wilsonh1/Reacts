chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let p = document.getElementsByClassName("_5l37");
    let data = [], ind = {};
    for (let i = 0; i < p.length; i++) {
        let url = p[i].getElementsByTagName("img")[0].src;
        data.push({
            pfp: url,
            name: p[i].getElementsByClassName("_8slc")[0].innerText,
            cnt: 0
        });
        ind[url] = i;
    }
    let u = document.getElementsByClassName("_87v3 img")[0].src;
    data.push({
        pfp: u,
        name: "You",
        cnt: 0
    });
    ind[u] = p.length;
    if (!p.length) {
        let pm = document.getElementsByClassName("_4ld- _7q1r")[0];
        if (pm) {
            let url = pm.getElementsByTagName("img")[0].src;
            data.push({
                pfp: url,
                name: document.getElementsByClassName("_6ybk")[0].innerText,
                cnt: 0
            });
            ind[url] = 1;
        }
    }
    if (message.command == "received") {
        let m = document.getElementsByClassName("_1t_p clearfix");
        for (let row of m) {
            let url = row.getElementsByClassName("_4ld- _7q1r")[0];
            if (!url)
                url = u;
            else
                url = url.getElementsByTagName("img")[0].src;
            console.log(url);
            let reacts = row.getElementsByClassName("_4kf6");
            for (let i = 0; i < reacts.length; i++)
                data[ind[url]].cnt += parseInt(reacts[i].innerText);
        }
    }
    data.sort(function(a, b) {
        return parseInt(b.cnt)-parseInt(a.cnt);
    });
    console.log(data);
    chrome.runtime.sendMessage({data: data}, function(response) {
        console.log(response.data);
    });
    sendResponse({result: "success"});
});
