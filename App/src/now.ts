//Romanenko suka tut napishet code s vunkcieei getNow()
async function now(toFind: { cid: number, aid: number, hid: number, fid: number }) {
    var url = `http://dt.miet.ru/ppo_it/api/${toFind.cid}/${toFind.aid}/${toFind.hid}/${toFind.fid}/temperature`;
    var headers = { 'X-Auth-Token': '6gjgr2u0mqzzx8hm' }
    var res = (await (await fetch(url, { headers })).json()).data
    //еби этот резалт полностью
} now({cid: 1, aid: 1, hid: 1, fid: 1})