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
	var todayToNum = today.getFullYear()+today.getMonth()+today.getDate();

	return answer[(useridToNum+todayToNum) % answer.length];
}

// 問籤用語
function isGodzilla(text){
	return text && (text.indexOf("哥吉拉") != -1);
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