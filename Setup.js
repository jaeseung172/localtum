var scanf = require('scanf');
var http = require('http');
var fs = require('fs');
var credinfo = {};
console.log("GET YOUR LOCATION FROM IP ADDRESS");
http.get("http://ipinfo.io/json", function(res) {
	var body = '';
	res.on('data', function(data){
		body += data;
		var parsed = JSON.parse(body);
		var geoloc = parsed.loc.split(',');
		credinfo['lat'] = parseFloat(geoloc[0]);
		credinfo['lon'] = parseFloat(geoloc[1]);
		console.log("PLEASE PRESS YOUR OPENWEATHERMAP API KEY");
		var owmkey = scanf("%s");
		console.log("PLEASE PRESS YOUR AQICN API KEY");
		var aqikey = scanf("%s");
		credinfo['ownkey'] = owmkey;
		credinfo['aqikey'] = aqikey;
		fs.writeFile("Key.json", JSON.stringify(credinfo), "utf-8");
		console.log("File Write Successfully!");
	});
});