async function now(toFind: {
    cid: number,
    aid: number,
    hid: number,
    fid: number
}) {
    var url = `http://dt.miet.ru/ppo_it/api/${toFind.cid}/${toFind.aid}/${toFind.hid}/${toFind.fid}/temperature`;
    var headers = {
        'X-Auth-Token': '6gjgr2u0mqzzx8hm'
    }
    return (await (await fetch(url, {
        headers
    })).json()).data
}
const cities = {
    'Алмазный': 1,
    'Восточный': 2,
    'Западный': 3,
    'Заречный': 4,
    'Курортный': 5,
    'Лесной': 6,
    'Научный': 7,
    'Полярный': 8,
    'Портовый': 9,
    'Приморский': 10,
    'Садовый': 11,
    'Северный': 12,
    'Степной': 13,
    'Таёжный': 14,
    'Центральный': 15,
    'Южный': 16
}
var select = document.getElementById('id');
Object.keys(cities).forEach(el => {
    let opt = document.createElement('option');
    opt.value = el;
    opt.innerHTML = el;
    select.add(opt);
})

let sec = document.getElementById('id2');
for (let i = 1; i <= 15; i += 1) {
    let option = document.createElement('option');
    option.value = option.text = i;
    sec.add(option);
}
async function main() {
    const MongoClient = require("mongodb").MongoClient;
    const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    document.getElementById("temp").innerHTML += `<h1>${await now({
        cid: cities[document.getElementById("id").value],
        aid: Number(document.getElementById("id1").value),
        hid: Number(document.getElementById("id2").value),
        fid: 1 //////////////////////////////////////////////////доделай плучание fid из селекта
    })}</h1>`
    client.close()
}