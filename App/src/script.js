const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


async function main(cid) {
    var tempmap = new Map;
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("temp");
    let res = await col.find({ cid: cid}).toArray();
    let temparr = [];
    res.forEach((el, index) => {
        temparr.push([index, el['temp']]);
    });
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    var options = {
        "title": "Temperature "+cid.toString(), "width": 900,
        "curveType": 'function',
        'explorer':{ "actions" :["dragToZoom", "rightClickToReset"]},
        //'animation': {"startup": true, "duration": 1000, "ease":'inAndOut'},
        "height": 500
    };
    function drawChart() {
        let data = new GoogleCharts.api.visualization.DataTable();
        data.addColumn('number','INDEX')
        data.addColumn('number', 'TEMP')
        data.addRows(temparr)
        const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("chart"+cid.toString()));
        chart.draw(data, options);
    }
    client.close()
}
areas(1);
async function areas(cid) {
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("temp");
    //const n = await col.find({cid:cid,com:"NUM"})
    //const num = n.toArray()[0]['anum']
    let num = 5
    let temparr = [['Area','Max Temp']];
    for(let i = 1;i<num;i++) {
        let res = await col.find({cid: cid, aid: i}).toArray();
        let neores = [];
        res.forEach(el=>neores.push(el['temp']))
        let t = Math.max.apply(null,neores);
        temparr.push([i.toString(),t])
    }
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    var options = {
        "title": "Temperature " + cid.toString(), "width": 900,
        'explorer': {"actions": ["dragToZoom", "rightClickToReset"]},
        //'animation': {"startup": true, "duration": 1000, "ease":'inAndOut'},
        legend: { position: 'none' },
        "height": 500
    };

    function drawChart() {
        let data = new GoogleCharts.api.visualization.arrayToDataTable(temparr);
        const chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById("chart" + cid.toString()));
        chart.draw(data, options);
    }
    client.close()
}
