import requests
from dbWriter import writeap,writecit
import time

adr = "http://dt.miet.ru/ppo_it/api/"
token = ""


def getaps():
    respc = requests.get(adr).text
    for cit in respc['data']:
        respa = requests.get(adr+":"+cit['city_id']).text
        for are in range(respa['area_count']):
            resph = requests.get(adr+":"+cit['city_id'+":"+str(are)).text
            for hous in range(resph['house_id']):
                respap = requests.get(adr+":"+cit['city_id'+":"+str(are)+":"+str(hous)).text
                for apart in range(respap["apartment_count"]):
                    resfin = requests.get(adr + ":" + cit['city_id'] + ":" + str(are) + ":" + str(hous)+":"+str(apart)).text
                    t = float(resfin["temperature"])
                    write(cit['city_id'],are,hous,apart,t)

def getcit():
    respc = requests.get(adr).text
    for cit in respc['data']:
        resp = respa = requests.get(adr+":"+cit['city_id']).text
        writecit(cit['city_id'], resp['temperature'])