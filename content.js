var data, ind;

function getReacts (m, u) {
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
                switch (r[i].getElementsByTagName("img")[0].src) {
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/t31/2/128/2764.png":
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/tdd/2/128/1f60d.png":
                        data[u].e0 += cnt;
                        break;
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/taf/2/128/1f606.png":
                        data[u].e1 += cnt;
                        break;
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/t9c/2/128/1f62e.png":
                        data[u].e2 += cnt;
                        break;
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/te9/2/128/1f622.png":
                        data[u].e3 += cnt;
                        break;
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/te7/2/128/1f620.png":
                        data[u].e4 += cnt;
                        break;
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/td7/2/128/1f44d.png":
                        data[u].e5 += cnt;
                        break;
                    case "https://static.xx.fbcdn.net/images/emoji.php/v9/t58/2/128/1f44e.png":
                        data[u].e6 += cnt;
                        break;
                }
                data[u].total += cnt;
            }
            document.getElementsByClassName("_3quh _30yy _2t_ _5ixy")[0].click();
            resolve("success");
        }, 100);
    });
}

async function getData (command) {
    if (command == "received") {
        let m = document.getElementsByClassName("_1t_p clearfix");
        for (let row of m) {
            let url = row.getElementsByClassName("_4ld- _7q1r")[0];
            if (!url)
                url = document.getElementsByClassName("_87v3 img")[0].src;
            else
                url = url.getElementsByTagName("img")[0].src;
            console.log(url);
            //let reacts = row.getElementsByClassName("_4kf6");
            let reacts = row.getElementsByClassName("_aou");
            for (let i = 0; i < reacts.length; i++) {
                console.log(await getReacts(reacts[i], ind[url]));
            }
            //    data[ind[url]].cnt += parseInt(reacts[i].innerText);
        }
    }
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
    let u = document.getElementsByClassName("_87v3 img")[0].src;
    data.push({
        pfp: u,
        name: "You",
        e0: 0, e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0,
        total: 0
    });
    ind[u] = p.length;
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
