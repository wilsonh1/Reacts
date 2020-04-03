chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let p = document.getElementsByClassName("_5l37");
    let data = [], ind = {};
    for (let i = 0; i < p.length; i++) {
        let name = p[i].getElementsByClassName("_8slc")[0].innerText
        r = {
            pfp: p[i].getElementsByTagName("img")[0].src,
            name: name,
            cnt: 0
        }
        data.push(r);
        ind[name] = i;
    }
    if (message.command == "received") {
        let m = document.getElementsByClassName("_1t_p clearfix");
        for (let row of m) {
            let name = row.getElementsByClassName("_ih3")[0].innerText
            let reacts = row.getElementsByClassName("_4kf6")[0];
            console.log(name);
            if (reacts)
                data[ind[name]].cnt += parseInt(reacts.innerText);
        }
    }
    //console.log(data);
    chrome.runtime.sendMessage({data: data}, function(response) {
        console.log(response.data);
    });
    sendResponse({result: "success"});
});
