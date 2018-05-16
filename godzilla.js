var fs = require('fs');
var parseString = require('xml2js').parseString;
var Q = require('q');
var http = require('http');

var deferred = Q.defer();
var weathers = [];

module.exports = {
	handle : function (event, text){
		if(isGreeting(text)){
			doGreeting(event);
		} else if(isAngry(text)){
			doAngry(event);
		} else if(isDirtyWord(text)){
			doDirtyWord(event);
		} else if(isFunnyWord(text)){
			doFunnyWord(event);
		} else if(isLucky(text)){
			doLucky(event);
		} else if(isGodzilla(text)){
			doGodzilla(event);
		} else if(isWeather(text)){
			doWeather(event);
		}
	}
}

// 打招呼用語
function isGreeting(text){
	return text && (text.indexOf("你好") != -1 || text.indexOf("早安") != -1 || text.indexOf("午安") != -1 || text.indexOf("晚安") != -1);
}
function doGreeting(event) {
	var answer = getRandGreeting();
	response = [answer];
	doResponse(event, response);
}
function getRandGreeting() {
	var answer = ["吼~", "吼~吼~", "恐恐恐~", "喔~喔~吼~~"];
	return answer[getRandomInt(0, answer.length)];
}

// 打生氣用語
function isAngry(text){
	return text && (text.indexOf("生氣") != -1 || text.indexOf("森77") != -1 
				|| text.indexOf("可惡") != -1 || text.indexOf("!!") != -1 || text.indexOf("!!") != -1);
}
function doAngry(event) {
	var answer = getRandAngry();
	response = [answer];
	doResponse(event, response);
}
function getRandAngry() {
	var answer = ["哥吉!!", "恐恐!!吼吼!!", "恐吼!!", "哥吉哥吉拉!!!"];
	return answer[getRandomInt(0, answer.length)];
}


// 髒話用語
function isDirtyWord(text){
	return text && (text.indexOf("幹") != -1);
}
function doDirtyWord(event) {
	response = ["哥吉幹!"];
	doResponse(event, response);
}

// XD用語
function isFunnyWord(text){
	return text && (text.indexOf("XD") != -1);
}
function doFunnyWord(event) {
	var answer = getRandFunny();
	response = [answer];
	doResponse(event, response);
}
function getRandFunny() {
	var answer = ["哥吉XD", "吉(￣▼￣)"];
	return answer[getRandomInt(0, answer.length)];
}

// 問籤用語
function isLucky(text){
	return text && (text.indexOf("今天的運勢") != -1);
}
function doLucky(event) {
	var answer = getRandLucky(event);
	response = ["哥吉兄弟今天的運勢吼！", answer];
	doResponse(event, response);
}
function getRandLucky(event) {
	var answer = ["哥吉吉", "哥吉小吉", "哥吉大吉（☆∀☆）", "哥吉中吉", "哥吉凶", "哥吉小胸(☉_☉)", "哥吉大凶(。・ε・。)"];
	var useridToNum = event.source.userId.hexEncode();
	var today = new Date();
	var todayToNum = today.getFullYear()*today.getMonth()*today.getDate();

	return answer[(useridToNum+todayToNum) % answer.length];
}

// 問籤用語
function isGodzilla(text){
	return text && (text.indexOf("哥吉") != -1);
}
function doGodzilla(event) {
	var answer = getRandGodzilla();
	response = [answer];
	doResponse(event, response);
}
function getRandGodzilla() {
	var answer = ["吼吼你哪位吼吼", "哥吉哥吉", "吉你吉你"];
	return answer[getRandomInt(0, answer.length)];
}


// 問天氣用語
function isWeather(text){
	return text && (text.indexOf("今天的天氣") != -1);
}
function doWeather(event) {
	getWeatherJson().then(function(result){
		console.log(result);
		response = ['今天'+ result['city'] +'的天氣是'];

		/*result['content'].forEach(function(v, i){
			response.push()
		})*/
		
		doResponse(event, response);
	});
}
function getWeatherJson() {
	var cwbAuthKey = 'CWB-77B89E64-F67E-40B9-8831-1C125054FD03';
	var dataId = getDataIdByCity()
	var url = 'http://opendata.cwb.gov.tw/opendataapi?dataid=' + dataId + '&authorizationkey=' + cwbAuthKey;
	xmlToJson(url, function(err, data) {
		if (err) {
	  	  	deferred.reject(err);
		}
		console.log(JSON.stringify(data, null, 2));

		var response = JSON.parse(data);
		var dataSet = response.cwbopendata.dataset;
		console.log(dataSet);

		weathers['city'] = dataSet.location.locationName;
		weathers['content'] = dataSet.paramterSet;

		console.log(weathers);
		
		deferred.resolve(weathers);
	})

	return deferred.promise;
}
function getDataIdByCity(cityName) {
	var cityDic = {
		'台北市':'F-C0032-009',
		'新北市':'F-C0032-010',
		'基隆市':'F-C0032-011',
		'花蓮縣':'F-C0032-012',
		'宜蘭縣':'F-C0032-013',
		'金門縣':'F-C0032-014',
		'澎湖縣':'F-C0032-015',
		'台南市':'F-C0032-016',
		'高雄市':'F-C0032-017',
		'嘉義縣':'F-C0032-018',
		'嘉義市':'F-C0032-019',
		'苗栗縣':'F-C0032-020',
		'台中市':'F-C0032-021',
		'桃園市':'F-C0032-022',
		'新竹縣':'F-C0032-023',
		'新竹市':'F-C0032-024',
		'屏東縣':'F-C0032-025',
		'南投縣':'F-C0032-026',
		'台東縣':'F-C0032-027',
		'彰化縣':'F-C0032-028',
		'雲林縣':'F-C0032-029',
		'連江縣':'F-C0032-030'};

	if(cityName in cityDic){
		return cityDic[cityName];
	}else if(cityName+'縣' in cityDic){
		return cityDic[cityName+'縣'];
	}else if(cityName+'市' in cityDic){
		return cityDic[cityName+'市'];
	}else{
		return cityDic['台北市'];
	}
}

function xmlToJson(url, callback) {
  var req = http.get(url, function(res) {
    var xml = '';
    
    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    }); 

    res.on('timeout', function(e) {
      callback(e, null);
    }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}


//共通Function
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function doResponse(event, response){
	event.reply(response).then(function(data) {
      // success 
      console.log(response);
    }).catch(function(error) {
      // error 
      console.log('error');
    });
}

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}