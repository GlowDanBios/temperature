const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function main() {
    var tempmap = new Map;
    var sum = 0;
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("temp");
    let res = await col.find({ cid: 1, aid: 1, hid: 1, fid: 1 }).toArray();
    res.forEach(el => {
        var a = el.temp;
        if (isNaN(tempmap.get(a))) tempmap.set(a, a);
        else tempmap.set(a, tempmap.get(a) + a);
        sum += a;
    });
    var temparr = new Array();
    temparr.push(["Temp.", "Sum"]);
    tempmap.forEach((value, key) => {
        temparr.push([key.toString() + "°C", value]);
    });
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    var options = {
        "title": "Temperature", "width": 500,
        "height": 300, "pieHole": 0.4, 
    };
    function drawChart() {
        const data = GoogleCharts.api.visualization.arrayToDataTable(temparr);
        const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById("chart"));
        pie_1_chart.draw(data, options);
    }
    client.close()
} main();