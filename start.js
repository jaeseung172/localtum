/*
LocalTum, SEUNGWOO LEE, Version 0.1
FIRST, YOU NEED TO SPECIFY YOUR OWN API KEA FROM aqicn.org, openweatbermap.org (It's FREE!)
SEOND, YOU NEED TO SPECIFY YOUR LOCATION.
*/
var express = require('express'); // import express
var request = require('request'); // import request
var pug = require('pug');
var config = require('./config.json')
var app = express(); // open context
app.set('view engine', 'pug');
var weathercode = {200: '강한 비', 201: '강한 비', 202: '강한 비', 210: '강한 비', 211: '강한 비', 212: '강한 비', 221: '강한 비', 230: ' 강한 비', 231: '강한 비', 232: '강한 비', 300: '이슬비', 301: '이슬비', 302: '이슬비', 310: '이슬비', 311: '이슬비', 312: '이슬비', 313: '이슬비', 314: '이슬비', 321: '이슬비', 500: '비', 501: '비', 502: '비', 503: '비', 504: '비', 511: '비', 520: '비', 521: '비', 522: '비', 531: '비', 600: '눈', 601: '눈', 602: '눈', 611: '눈', 612: '눈', 615: '눈', 616: '눈', 620: '눈', 621: '눈', 622: '눈', 701: '안개', 702: '안개', 721: '안개', 731: '안개', 741: '안개', 751: '안개', 761: '안개', 762: '안개', 771: '안개', 781: '안개', 800: '맑음', 801: '구름 낌', 802: '구름 낌', 803: '구름 낌', 804: '구름 낌', 900: '토네이도', 901: '태풍', 902: '허리케인', 903: '폭한', 904: '폭염', 905: '바람 붐', 906: '우박', 951: '고요함', 952: '남실바람', 953: '산들바람', 954: '건들바람', 955: '흔들바람', 956: '된바람', 957: '강풍', 958: '강풍', 959: '강풍', 960: '폭풍', 961: '폭풍', 962: '허리케인'};
var obj = {};

function aqiindi(x){
    if (x <= 50){
        return "공기질 좋음";
    }
    else if (51<= x && x <= 100){
        return "공기질 나쁨";
    }
    else if (101 <= x && x <= 150){
        return "공기질 보통";
    }
    else if (151 <= x && x <= 200){
        return "공기질 조금 나쁨";
    }
    else if (201 <= x && x <= 300){
        return "공기질 보통 나쁨";
    }
    else if (x > 300){
        return "공기질 최고 나쁨";
    }
    else {
        return "에러";
    }
}

function BusInfo(time){
    // 어차피 공기수송 차이니까 네이버, 다음 지도 참고해서 거리 평균으로 때려서 만듦.
    // 금어 2리 -> 고은하우스 (평균: 25분), 마성 2리 -> 고은하우스 (평균: 8분)
    // 근데 내 경험으로는 마성리에서 쉬는게 아니라 마성리와 에버힐스마을입구 부근에서 쉰다.
    // 내가 찍어놓은 첫차 막차 리스트 가지고 대충 가늚 해보면 답 나옴.
    if (630 <= time && time <= 655) {
        return "상행, 7:40";
    }
    else if (730 <= time && time <= 740){
        return "버스 내려오니 지금 나가요";
    }
    else if (800 <= time && time <= 825){
        return "상행, 9시 10분 하행";
    }
    else if (910 <= time && time <= 920){
        return "버스 내려오니 지금 나가요";
    }
    else if (940 <= time && time <= 1005){
        return "상행, 10시 10분 하행";
    }
    else if (1010 <= time && time <= 1020){
        return "버스 내려오니 지금 나가요";
    }
    else if (1050 <= time && time <= 1105){
        return "상행, 11시 40분 하행";
    }
    else if (1140 <= time && time <= 1150){
        return "버스 내려오니 지금 나가요";
    }
    else if (1210 <= time && time <= 1235){
        return "상행, 1시 40분 하행";
    }
    else if (1340 <= time && time <= 1350){
        return "버스 내려오니 지금 나가요";
    }
    else if (1420 <= time && time <= 1445){
        return "상행, 3시 10분 하행";
    }
    else if (1510 <= time && time <= 1520){
        return "버스 내려오니 지금 나가요";
    }
    else if (1540 <= time && time <= 1605){
        return "상행, 4시 20분 하행";
    }
    else if (1620 <= time && time <= 1630){
        return "버스 내려오니 지금 나가요";
    }
    else if (1700 <= time && time <= 1725){
        return "상행, 6시 30분 하행";
    }
    else if (1830 <= time && time <= 1840){
        return "버스 내려오니 지금 나가요";
    }
    else if (1900 <= time && time <= 1925){
        return "상행, 7시 30분 하행";
    }
    else if (1930 <= time && time <= 1940){
        return "버스 내려오니 지금 나가요";
    }
    else if (2000 <= time && time <= 2025){
        return "마성리 막차 출발";
    }
    else if (2030 <= time && time <= 2040){
        return "금어리 막차 출발";
    }
    else if (2040 < time || time < 630){
        return "버스 없음";
    }
    else{
        return "차고지 대기중";
    }
}

function AQIInfos(){
    request("http://api.waqi.info/feed/"+config.aqiloc+"/?token="+config.aqikey, function(request, error, body){
    //console.log(body);
    var returnjson = JSON.parse(body);
    obj.AQI = returnjson.data.aqi;
    obj.AQIINFO = aqiindi(parseInt(returnjson.data.aqi));
    console.log("Success Loaded PPM INFO!");
    // 되었는지 확인.
});
}

function WeatherInfos(){
    request("http://api.openweathermap.org/data/2.5/weather?id="+config.ownloc+"&APPID="+config.ownkey, function(request, error, body){
    var jsonresp = JSON.parse(body);
    obj.WEATHERCODE = parseInt(jsonresp.weather[0].id);
    obj.WEATHERKORDESC = weathercode[obj.WEATHERCODE];
    console.log("Success Loaded Weather Info");
    // 되었는지 확인
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
    res.render('index', {weatherinfo: obj.WEATHERKORDESC, dustinfo: obj.AQIINFO, businfo: BusInfo(GetRealtime())});
});
app.listen(80, function(){
    console.log("Please Wait for 10 sec to Retrive Weather and AQI Data");
}); // http 포트에서 실행.
