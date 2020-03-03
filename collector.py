import requests
from dbWriter import writeap,writecit
import time

adr = "http://dt.miet.ru/ppo_it/api/"
token = "6gjgr2u0mqzzx8hm"
headers = {'X-Auth-Token': token}


def getaps():
    respc = requests.get(adr,headers=headers).json()
    for cit in respc['data']:
        respa = requests.get(adr+str(cit['city_id']), headers=headers).json()
        for are in range(1,respa['data']['area_count']):
            resph = requests.get(adr+str(cit['city_id'])+"/"+str(are),headers=headers).json()
            for hous in resph['data']:
                resfin = requests.get(adr + str(cit['city_id'])+"/"+str(are) + "/"+str(hous['house_id'])+"/"+'1',headers=headers).json()
                t = float(resfin['data']["temperature"])

                writeap(cit['city_id'], are, hous['house_id'], 1, t)
                time.sleep(0.3)


def getcit():
    respc = requests.get(adr, headers=headers).text
    for cit in respc['data']:
        resp = respa = requests.get(adr+"/:"+cit['city_id'],headers=headers).text
        writecit(cit['city_id'], resp['temperature'])


getaps()