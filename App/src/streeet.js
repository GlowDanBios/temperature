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
    const MongoClient = require("mongodb").MongoClient;
    const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const name = document.getElementById("id").value
    const cid = Number(cities[name])
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("tempc");
    let res = await col.find({
        cid: cid
    }).toArray();
    let temparr = [];
    res.forEach((el, index) => {
        temparr.push([index, el['temp']]);
    });
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    const options = {
        "title": "Temperature " + cid.toString(),
        "width": 900,
        "curveType": 'function',
        'explorer': {
            "actions": ["dragToZoom", "rightClickToReset"]
        },
        //'animation': {"startup": true, "duration": 1000, "ease":'inAndOut'},
        "height": 500
    };

    function drawChart() {
        let data = new GoogleCharts.api.visualization.DataTable();
        data.addColumn('number', 'INDEX')
        data.addColumn('number', 'TEMP')
        data.addRows(temparr)
        const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("chart"));
        chart.draw(data, options);
    }

    client.close()
}