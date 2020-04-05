const emoji = {
    "https://static.xx.fbcdn.net/images/emoji.php/v9/t31/2/128/2764.png": "e0",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/tdd/2/128/1f60d.png": "e0",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/taf/2/128/1f606.png": "e1",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/t9c/2/128/1f62e.png": "e2",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/te9/2/128/1f622.png": "e3",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/te7/2/128/1f620.png": "e4",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/td7/2/128/1f44d.png": "e5",
    "https://static.xx.fbcdn.net/images/emoji.php/v9/t58/2/128/1f44e.png": "e6"
};

var data, ind;
var you;

function getReceived (m, u) {
    console.log(m);
    m.click();
    return new Promise(resolve => {
        setTimeout(function(){
            let list = document.getElementsByClassName("_koh _2pit")[0];
            if (!list) {
                resolve("success");
                return;
            }
            let r = list.getElementsByTagName("li");
            for (let i = 1; i < r.length; i++) {
                let cnt = parseInt(r[i].innerText);
                console.log(u);
                data[u][emoji[r[i].getElementsByTagName("img")[0].src]] += cnt;
                data[u].total += cnt;
            }
            document.getElementsByClassName("_3quh _30yy _2t_ _5ixy")[0].click();
            resolve("success");
        }, 100);
    });
}

function getGiven (m) {
    console.log(m);
    m.click();
    return new Promise(resolve => {
        setTimeout(function(){
            let list = document.getElementsByClassName("_3s-3 _2pin");
            if (!list.length) {
                resolve("success");
                return;
            }
            for (let i = 0; i < list.length; i++) {
                let url = list[i].getElementsByClassName("_4ld- _7q1r")[0];
                url = url.getElementsByTagName("img")[0].src;
                let e = list[i].getElementsByClassName("_1ift _5m3a img")[0].src;
                if (!ind.hasOwnProperty(url)) // pm ?
                    url = you;
                data[ind[url]][emoji[e]]++;
                data[ind[url]].total++;
            }
            document.getElementsByClassName("_3quh _30yy _2t_ _5ixy")[0].click();
            resolve("success");
        }, 100);
    });
}

async function getData (command) {
    let style = document.styleSheets[0];
    style.addRule("._10", "display: none;", 0);
    let m = document.getElementsByClassName("_1t_p clearfix");
    for (let row of m) {
        let url = row.getElementsByClassName("_4ld- _7q1r")[0];
        if (!url)
            url = you;
        else
            url = url.getElementsByTagName("img")[0].src;
        console.log(url);
        let reacts = row.getElementsByClassName("_aou");
        for (let i = 0; i < reacts.length; i++) {
            if (command == "received")
                console.log(await getReceived(reacts[i], ind[url]));
            else
                console.log(await getGiven(reacts[i]))
        }
    }
    style.deleteRule(0);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let p = document.getElementsByClassName("_5l37");
    data = [];
    ind = {};
    for (let i = 0; i < p.length; i++) {
        let url = p[i].getElementsByTagName("img")[0].src;
        data.push({
            pfp: url,
            name: p[i].getElementsByClassName("_8slc")[0].innerText,
            e0: 0, e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0,
            total: 0
        });
        ind[url] = i;
    }
    you = document.getElementsByClassName("_87v3 img")[0].src;
    data.push({
        pfp: you,
        name: "You",
        e0: 0, e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0,
        total: 0
    });
    ind[you] = p.length;
    if (!p.length) {
        let pm = document.getElementsByClassName("_4ld- _7q1r")[0];
        if (pm) {
            let url = pm.getElementsByTagName("img")[0].src;
            data.push({
                pfp: url,
                name: document.getElementsByClassName("_6ybk")[0].innerText,
                e0: 0, e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0,
                total: 0
            });
            ind[url] = 1;
        }
    }
    getData(message.command).then(function(value) {
        console.log(value);
        console.log(data);
        chrome.runtime.sendMessage({data: data}, function(response) {
            console.log(response.data);
        });
        sendResponse({result: "success"});
    });
    return true;
});
