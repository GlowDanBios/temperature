from pymongo import MongoClient

def  writeap(cid,aid,hid,fid,temp):
    client = MongoClient('mongodb://Matiash:mth@45.8.230.173')
    db = client.get_database("gdms")
    col = db.get_collection("temp")
    post = {
        "cid": cid,
        "aid": aid,
        "hid": hid,
        "fid": fid,
        "temp": temp
    }
    col.insert(post)

def writecit(cid,temp):
    client = MongoClient('mongodb://Matiash:mth@45.8.230.173')
    db = client.get_database("gdms")
    col = db.get_collection("temp-c")
    post = {
        "cid": cid,
        "temp-c": temp
    }
    col.insert(post)