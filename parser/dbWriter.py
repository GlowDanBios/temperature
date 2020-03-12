from pymongo import MongoClient
from datetime import datetime


def writeap(cid, aid, hid, fid, temp):
    client = MongoClient("mongodb://Matiash:mth@45.8.230.173")
    db = client.get_database("gdms")
    col = db.get_collection("temp")
    post = {
        "time": [
            datetime.now().year, 
            datetime.now().month, 
            datetime.now().day, 
            datetime.now().hour, 
            datetime.now().minute
        ],
        "cid": cid,
        "aid": aid,
        "hid": hid,
        "fid": fid,
        "temp": temp
    }
    col.insert(post)


def writecit(cid, temp):
    client = MongoClient("mongodb://Matiash:mth@45.8.230.173")
    db = client.get_database("gdms")
    col = db.get_collection("tempc")
    post = {
        "time": [
            datetime.now().year, 
            datetime.now().month, 
            datetime.now().day, 
            datetime.now().hour, 
            datetime.now().minute
        ],
        "cid": cid,
        "temp": temp
    }
    col.insert(post)
