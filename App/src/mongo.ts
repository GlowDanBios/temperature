const MongoClient = require("mongodb").MongoClient;
import {GoogleCharts} from 'google-charts';
const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
    useNewUrlParser: true
});

var ol = document.getElementById("ol");
async function mongo() {
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("temp");
    let res = await col.find({ cid: 1, aid: 1, hid: 1, fid: 1 }).toArray();
    res.forEach(el => {
        ol.innerHTML += "<li>"
            + "cid=" + el.cid + "; "
            + "aid=" + el.aid + "; "
            + "hid=" + el.hid + "; "
            + "fid=" + el.fid + "; "
            + `time=${el.time[0]}-${el.time[1]}-${el.time[2]}, ${el.time[3]}:${el.time[4]}; `
            + "temp=" + el.temp + ";"
            + "</li>";
    });
    client.close()
} mongo();

GoogleCharts.load(drawChart);
 
function drawChart() {
 
    // Standard google charts functionality is available as GoogleCharts.api after load
    const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Chart thing', 'Chart amount'],
        ['Lorem ipsum', 60],
        ['Dolor sit', 22],
        ['Sit amet', 18]
    ]);
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
    pie_1_chart.draw(data);
}