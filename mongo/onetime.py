import requests
from pymongo import MongoClient


adr = "http://dt.miet.ru/ppo_it/api/"
token = "6gjgr2u0mqzzx8hm"
headers = {'X-Auth-Token': token}

respc = requests.get(adr, headers=headers).json()
d = {}
for key in respc['data']:
    d[key['city_name']] = key['city_id']
print(d)

client = MongoClient("mongodb://Matiash:mth@45.8.230.173")
db = client.get_database("gdms")
col = db.get_collection("temp")
