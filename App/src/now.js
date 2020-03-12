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
}
$('#id').change(async function () {
    $('#id1').find('option').remove()
    $('#id2').find('option').remove()
    $('#id3').find('option').remove()
    window.id = $('#id').val()
    let url = await fetch('https://dt.miet.ru/ppo_it/api/' + cities[window.id], {headers: {'X-Auth-Token': '6gjgr2u0mqzzx8hm'}})
    let response = await (await url.json()).data
    let areas_count = response.area_count
    let secs = document.getElementById('id1')
    let option = document.createElement('option');
    option.setAttribute('disabled', 'disabled')
    option.value = option.text = "Выберите район";
    secs.add(option);
    for (let i = 1; i <= areas_count; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        secs.add(option);
    }
    let urp = await fetch('https://dt.miet.ru/ppo_it/api/' + cities[$('#id').val()] + '/' + 1, {headers: {'X-Auth-Token': '6gjgr2u0mqzzx8hm'}})
    let respoe = await (await urp.json()).data
    let house_Count = respoe.length
    let s = document.getElementById('id2')
    let o = document.createElement('option');
    o.setAttribute('disabled', 'disabled')
    o.text = "Выберите дом";
    s.add(o);
    for (let i = 1; i <= house_Count; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        s.add(option);
    }
    let urk = await fetch('https://dt.miet.ru/ppo_it/api/' + cities[$('#id').val()] + '/' + 1 + '/' + 1, {headers: {'X-Auth-Token': '6gjgr2u0mqzzx8hm'}})
    let resp = await (await urk.json()).data
    let ap_Count = resp.apartment_count
    let se = document.getElementById('id3')
    let opt = document.createElement('option');
    opt.setAttribute('disabled', 'disabled')
    opt.value = opt.text = "Выберите квартиру";
    se.add(opt);
    for (let i = 1; i <= ap_Count; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        se.add(option);
    }
})
$('#id1').change(async function () {
    $('#id2').find('option').remove()
    $('#id3').find('option').remove()
    window.id = $('#id').val()
    window.id1 = $('#id1').val()
    let url = await fetch('https://dt.miet.ru/ppo_it/api/' + cities[window.id] + '/' + window.id1, {headers: {'X-Auth-Token': '6gjgr2u0mqzzx8hm'}})
    let response = await (await url.json()).data
    let house_Count = response.length
    let secs = document.getElementById('id2')
    let optio = document.createElement('option');
    optio.setAttribute('disabled', 'disabled')
    optio.text = "Выберите дом";
    secs.add(optio);
    for (let i = 1; i <= house_Count; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        secs.add(option);
    }
    let urk = await fetch('https://dt.miet.ru/ppo_it/api/' + cities[$('#id').val()] + '/' + $('#id1').val() + '/' + $('#id2').val(), {headers: {'X-Auth-Token': '6gjgr2u0mqzzx8hm'}})
    let resp = await (await urk.json()).data
    let ap_Count = resp.apartment_count
    let se = document.getElementById('id3')
    let opt = document.createElement('option');
    opt.setAttribute('disabled', 'disabled')
    opt.value = opt.text = "Выберите квартиру";
    se.add(opt);
    for (let i = 1; i <= ap_Count; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        se.add(option);
    }
})
$('#id2').change(async function () {
    $('#id3').find('option').remove()
    window.id2 = $('#id2').val()
    let url = await fetch('https://dt.miet.ru/ppo_it/api/' + cities[$('#id').val()] + '/' + $('#id1').val() + '/' + $('#id2').val(), {headers: {'X-Auth-Token': '6gjgr2u0mqzzx8hm'}})
    let response = await (await url.json()).data
    let ap_Count = response.apartment_count
    let secs = document.getElementById('id3')
    let option = document.createElement('option');
    option.setAttribute('disabled', 'disabled')
    option.value = option.text = "Выберите квартиру";
    secs.add(option);
    for (let i = 1; i <= ap_Count; i++) {
        let option = document.createElement('option');
        option.value = option.text = i;
        secs.add(option);
    }
})

async function now(toFind) {
    const url = `http://dt.miet.ru/ppo_it/api/${toFind.cid}/${toFind.aid}/${toFind.hid}/${toFind.fid}/temperature`;
    const headers = {
        'X-Auth-Token': '6gjgr2u0mqzzx8hm'
    }
    return (await (await fetch(url, {
        headers
    })).json()).data
}


const select = document.getElementById('id');
Object.keys(cities).forEach(el => {
    let opt = document.createElement('option');
    opt.value = el;
    opt.innerHTML = el;
    select.add(opt);
})

async function main() {
    document.getElementById("temp").innerHTML = ""
    document.getElementById("temp").innerHTML += `<strong>${await now({
        cid: cities[document.getElementById("id").value],
        aid: Number(Number(document.getElementById("id1").value) + 1),
        hid: Number(document.getElementById("id2").value),
        fid: Number(document.getElementById("id3").value)
    })}°</strong>`
}
