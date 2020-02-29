import requests
adr = "http://dt.miet.ru/ppo_it/api/"
token = ""
def get():
    numcity = requests.get(adr).