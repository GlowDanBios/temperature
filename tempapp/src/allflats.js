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
};
let select = document.getElementById('id');

Object.keys(cities)
  .forEach(el => {
    let opt = document.createElement('option');
    opt.value = el;
    opt.innerHTML = el;
    select.appendChild(opt);
  });

async function main() {
  const MongoClient = require('mongodb').MongoClient;
  const mongoClient = new MongoClient('mongodb://Matiash:mth@45.8.230.173', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const name = document.getElementById('id').value;
  const cid = Number(cities[name]);
  document.getElementsByClassName('content')[0].innerHTML = 'Средняя температура в городе ' + name;
  const client = await mongoClient.connect();
  const db = client.db('gdms');
  const col = db.collection('temp');
  let res = await col.find({
    cid: cid
  })
    .toArray();
  let temparr = [];
  let t = 0;
  let k = 0;
  let i = 0;
  res.forEach((el, index) => {
    if (el['aid'] == 1 && el['hid'] == 1 && index > 1) {
      temparr.push([i, t / k]);
      k = 0;
      t = 0;
      i++;
    } else {
      t += el['temp'];
      k++;
    }
  });
  const GoogleCharts = require('google-charts').GoogleCharts;
  GoogleCharts.load(drawChart);
  const options = {
    'title': 'Температура в городе ' + name,
    'width': '40vh',
    'curveType': 'function',
    'explorer': {
      'actions': ['dragToZoom', 'rightClickToReset']
    },
    //'animation': {"startup": true, "duration": 1000, "ease":'inAndOut'},
    'height': '20vh'
  };

  function drawChart() {
    let data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('number', 'INDEX');
    data.addColumn('number', 'Температура');
    data.addRows(temparr);
    const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);
  }

  client.close();
}
