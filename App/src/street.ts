const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
streets(13);
async function streets(cid) {
    var tempmap = new Map;
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("tempc");
    let res = await col.find({ cid: cid }).toArray();
    let temparr = [];
    res.forEach((el, index) => {
        temparr.push([index, el['temp']]);
    });
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    var options = {
        "title": "Temperature " + cid.toString(), "width": 900,
        "curveType": 'function',
        'explorer': { "actions": ["dragToZoom", "rightClickToReset"] },
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
