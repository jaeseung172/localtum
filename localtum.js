/*
* Localtum localhost server
* Write By SEUNGWOO LEE
* June 18, 2017 11:22 PM KST
*/

var http = require('http'); // import http module
var key = require('./key.json');
var infos = {}; // store data

function Get_Weather_info(){
	http.get('http://api.openweathermap.org/data/2.5/weather?lat='+key.lat+'&lon='+key.lon+'&appid='+key.owmkey, function(res) {
		var body = ''; 
	res.on('data', function(data){
		body += data;
		var jsonread = JSON.parse(body);
		infos['loc'] = jsonread.name;
		infos['code'] = jsonread.weather[0].id;
		infos['temp'] = jsonread.main.temp;
		infos['pressure'] = jsonread.main.pressure;
		infos['humidity'] = jsonread.main.humidity;
		});
	});
}

function Get_Aqi_Info(){
	http.get("http://api.waqi.info/feed/geo:"+key.lat+":"+key.lon+"/?token="+key.aqikey, function(res) {
		var body = '';
	res.on('data', function(data){
		body += data;
		var jsonread = JSON.parse(body);
		infos['aqi'] = jsonread.data.aqi;
		// console.log(infos); // USE FOR DEVELOPMENT
		console.log("Data Sync Completed!")
	});
});
}

var server = http.createServer(function(request, response) {	
	if (request.url == '/'){
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(infos));
		response.end();
	}
	else {
		response.writeHead(404, {"Content-Type": "text/html"})
		response.write("404 Error");
		response.end();
	}
	});
server.listen(3800);

// AVOID FUCKING PROBLEM OF NODE
setTimeout(Get_Weather_info, 150);
setTimeout(Get_Aqi_Info, 300);
// Set Interval Time for Sync Data Hour and 30 Minutes
setInterval(Get_Weather_info, 5400000);
setInterval(Get_Aqi_Info, 5400000);