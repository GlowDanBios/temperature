async function f() {
    for (let cid = 1; cid <= 16; cid++) {
        const MongoClient = require('mongodb').MongoClient;
        const mongoClient = new MongoClient('mongodb://Matiash:mth@45.8.230.173', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let client = await mongoClient.connect();
        const db = client.db('gdms');
        const col = db.collection('temp');
        const k = await col.find({cid: cid, com: 'NUM'})
            .toArray();
        const num = k[0]['anum'];
        for (let i = 1; i < num; i++) {
            let res = await col.find({cid: cid, aid: i})
                .toArray();
            let neores = [];
            res.forEach(el => neores.push(el['temp']));
            let t = Math.max.apply(null, neores);
            col.insertOne({cid:cid, aid:i, t:t, com:"MAX"});
        }
    }
}
f();