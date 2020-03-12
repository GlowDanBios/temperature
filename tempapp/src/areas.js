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
let select = document.getElementById('id');

Object.keys(cities).forEach(el => {
    let opt = document.createElement('option');
    opt.value = el;
    opt.innerHTML = el;
    select.appendChild(opt);
})

async function main() {
    const name = document.getElementById("id").value
    const cid = Number(cities[name])
    const MongoClient = require("mongodb").MongoClient;
    const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("temp");
    const k = await col.find({cid: cid, com: "NUM"}).toArray()
    const num = k[0]['anum']
    let temparr = [['Area', 'Max Temp']];
    for (let i = 1; i < num; i++) {
        let res = await col.find({cid: cid, aid: i}).toArray();
        let neores = [];
        res.forEach(el => neores.push(el['temp']))
        let t = Math.max.apply(null, neores);
        temparr.push([i.toString(), t])
    }
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    const options = {
        "title": "Температура в районах города  " + name,
        "width": "40vh",
        'explorer': {
            "actions": ["dragToZoom", "rightClickToReset"]
        },
        "height": "20vh",
        //'animation': {"startup": true, "duration": 1000, "ease":'inAndOut'},
        legend: {
            position: 'none'
        },
    };

    function drawChart() {
        let data = new GoogleCharts.api.visualization.arrayToDataTable(temparr);
        const chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById("chart"));
        chart.draw(data, options);
    }

    client.close()
}
