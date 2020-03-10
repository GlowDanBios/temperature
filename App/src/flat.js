const cities = {'Алмазный': 1, 'Восточный': 2, 'Западный': 3, 'Заречный': 4, 'Курортный': 5, 'Лесной': 6, 'Научный': 7, 'Полярный': 8, 'Портовый': 9, 'Приморский': 10, 'Садовый': 11, 'Северный': 12, 'Степной': 13, 'Таёжный': 14, 'Центральный': 15, 'Южный': 16}
let select = document.getElementById('id');

Object.keys(cities).forEach(el=> {
    let opt = document.createElement('option');
    opt.value = el;
    opt.innerHTML = el;
    select.add(opt);
})

let sec = document.getElementById( 'id2' );
for ( let i = 1; i <= 15; i += 1 ) {
    let option = document.createElement( 'option' );
    option.value = option.text = i;
    sec.add( option );
}

$('id').change(()=>{
    $('id1').find('option').remove()
    window.id = $('#id').val()
    let xhr = new XMLHttpRequest(),
        url = 'http://127.0.0.1:8000/get_areas_list?city_id=' + window.id
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            response = JSON.parse(xhr.responseText)
            areas_count = response.areas_count
            $('#id1').append($("<option></option>").text('Не выбрано'));
            for (i = 1; i <= areas_count; i++){
                $('#id1').append($("<option></option>").attr("value", i).text(i));
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
})

async function main() {
    const MongoClient = require("mongodb").MongoClient;
    const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const name = document.getElementById("id").value
    const aid = Number(document.getElementById("id1").value)
    const hid = Number(document.getElementById("id2").value)
    const cid = Number(cities[name])
    let client = await mongoClient.connect();
    const db = client.db("gdms");
    const col = db.collection("temp");
    let res = await col.find({cid: cid,aid:aid,hid:hid,fid:1}).toArray();
    let temparr = [];
    res.forEach((el, index) => {
        temparr.push([index, el['temp']]);
    });
    const GoogleCharts = require("google-charts").GoogleCharts;
    GoogleCharts.load(drawChart);
    const options = {
        "title": "Temperature " + cid.toString(), "width": 900,
        "curveType": 'function',
        'explorer': {"actions": ["dragToZoom", "rightClickToReset"]},
        //'animation': {"startup": true, "duration": 1000, "ease":'inAndOut'},
        "height": "20vh"
    };

    function drawChart() {
        let data = new GoogleCharts.api.visualization.DataTable();
        data.addColumn('number', 'INDEX')
        data.addColumn('number', 'TEMP')
        data.addRows(temparr)
        const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("chart" ));
        chart.draw(data, options);
    }

    client.close()
}
