const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://Matiash:mth@45.8.230.173", {
    useNewUrlParser: true
});
mongoClient.connect(function (err, client) {
    const db = client.db("gdms");
    const col = db.collection("temp");
    col.find().toArray(function (err, res) {
        res.forEach(el => {
            document.write("<div>");
            document.write("cid=" + el.cid + "; ");
            document.write("aid=" + el.aid + "; ");
            document.write("hid=" + el.hid + "; ");
            document.write("fid=" + el.fid + "; ");
            document.write(`time=${el.time[0]}-${el.time[1]}-${el.time[2]}, ${el.time[3]}:${el.time[4]}; `);
            document.write("temp=" + el.temp + ";");
            document.write("</div>");
        });
    });
    client.close()
});