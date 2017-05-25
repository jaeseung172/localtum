/*
LocalTum, SEUNGWOO LEE, Version 0.1
FIRST, YOU NEED TO SPECIFY YOUR OWN API KEA FROM aqicn.org, openweatbermap.org (It's FREE!)
SEOND, YOU NEED TO SPECIFY YOUR LOCATION.
*/
var express = require('express'); // import express
var request = require('request'); // import request
var pug = require('pug');
var app = express(); // open context
app.set('view engine', 'pug');
var token = {'aqi':'YOUR_API_KEY', 'weather':'YOUR_API_KEY'};
var location = {'weather':'YOUR_HOME_LOCATION', 'aqi':'YOUR_HOME_LOCATION'};
var obj = {};

function aqiindi(x){
    if (x <= 50){
        return "VERY GOOD";
    }
    else if (51<= x && x <= 100){
        return "NORMAL";
    }
    else if (101 <= x && x <= 150){
        return "DRINK WATER";
    }
    else if (151 <= x && x <= 200){
        return "WEARING MASK";
    }
    else if (201 <= x && x <= 300){
        return "WEARING MASK";
    }
    else if (x > 300){
        return "DO NOT GO OUTSIDE";
    }
    else {
        return "ERROR";
    }
}

function BusInfo(time){
    // 어차피 공기수송 차이니까 네이버, 다음 지도 참고해서 거리 평균으로 때려서 만듦.
    // 금어 2리 -> 고은하우스 (평균: 25분), 마성 2리 -> 고은하우스 (평균: 8분)
    // 근데 내 경험으로는 마성리에서 쉬는게 아니라 마성리와 에버힐스마을입구 부근에서 쉰다.
    // 내가 찍어놓은 첫차 막차 리스트 가지고 대충 가늚 해보면 답 나옴.
    if (630 <= time && time <= 655) {
        return "DOWN, 7:40";
    }
    else if (730 <= time && time <= 740) {
        return "BUS WILL COME";
    }
    else if (800 <= time && time <= 825){
        return "DOWN, 9:10";
    }
    else if (910 <= time && time <= 920){
        return "BUS WILL COME";
    }
    else if (940 <= time && time <= 1005){
        return "DOWN, 10:10";
    }
    else if (1010 <= time && time <= 1020){
        return "BUS WILL COME";
    }
    else if (1050 <= time && time <= 1105){
        return "DOWN, 11:40";
    }
    else if (1140 <= time && time <= 1150){
        return "BUS WILL COME";
    }
    else if (1210 <= time && time <= 1235){
        return "DOWN, 1:40 PM";
    }
    else if (1340 <= time && time <= 1350){
        return "BUS WILL COME";
    }
    else if (1420 <= time && time <= 1445){
        return "DOWN, 3:10 PM";
    }
    else if (1510 <= time && time <= 1520){
        return "BUS WILL COME";
    }
    else if (1540 <= time && time <= 1605){
        return "UP, 4:20 PM";
    }
    else if (1620 <= time && time <= 1630){
        return "BUS WILL COME";
    }
    else if (1700 <= time && time <= 1725){
        return "UP, 6:30 PM";
    }
    else if (1830 <= time && time <= 1840){
        return "BUS WILL COME";
    }
    else if (1900 <= time && time <= 1925){
        return "UP, 7:30 PM";
    }
    else if (1930 <= time && time <= 1940){
        return "BUS WILL COME";
    }
    else if (2000 <= time && time <= 2025){
        return "LAST BUS UP TO MASEUNGRI";
    }
    else if (2030 <= time && time <= 2040){
        return "LAST BUS DOWN TO GEUMEURI";
    }
    else if (2040 < time || time < 630){
        return "NIGHT TIME";
    }
    else{
        return "WAITING AT THE BASE";
    }
}

function AQIInfos(){
    request("http://api.waqi.info/feed/"+location.aqi+"/?token="+token.aqi, function(request, error, body){
    //console.log(body);
    var returnjson = JSON.parse(body);
    obj.AQI = returnjson.data.aqi;
    obj.AQIINFO = aqiindi(parseInt(returnjson.data.aqi));
    console.log("Success Loaded PPM INFO!");
    // 되었는지 확인.
});
}

function WeatherInfos(){
    request("http://api.openweathermap.org/data/2.5/weather?id="+location.weather+"&APPID="+token.weather, function(request, error, body){
    var jsonresp = JSON.parse(body);
    obj.WEATHERDESC = jsonresp.weather[0].description.toUpperCase();
    console.log("Success Loaded Weather Info");
    // 되었는지 확인.
});
}

function GetRealtime(){
    var date = new Date();
    return parseInt(String(date.getHours())+String('0'+date.getMinutes()).slice(-2));
}

setTimeout(function() {AQIInfos();}, 3000); // 3초 텀을 주고
setTimeout(function() {WeatherInfos();}, 5000); // 5초 텀 // 총 8초의 텀을 가져야 꼬이지 않고 실행이 됨.
setInterval(function() {AQIInfos();}, 5400000 ); // 1시간 30분마다 반복하도록 만들어주고
setInterval(function() {WeatherInfos();}, 7200000); // 2시간마다 반복하도록 만들어줌

app.get('/', function(req, res){
    console.log("%s, %s, %s",req.method,req.headers.host,req.connection.remoteAddress);
    // logging on the console
    res.render('index', {weatherinfo: obj.WEATHERDESC, dustinfo: obj.AQIINFO, businfo: BusInfo(GetRealtime())});
});
app.listen(80, function(){
    console.log("Please Wait for 10 sec to Retrive Weather and AQI Data");
}); // http 포트에서 실행.
