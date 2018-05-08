var linebot = require('linebot');
var express = require('express');
var randRecom = require('./godzilla.js');

const bot = linebot({
  channelId: "1579298061",
  channelSecret: "1ea7aa1e8268ceb3707ab063cf15cbad",
  channelAccessToken: "J6u2mGIQgDc2kev4xgRSdB3ZHXPhnp7ebEjSbkoKPHGUTFTj0abAfDVpDrKF1S/ST/U3flEQOLUx1vLNB+Buh5vkPRcBJDSLjKUEXj8nA8aqjBIKxEGSOWmfCUdJRqr7bWydEQzHFvfolbCzCmu+PAdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    var user = event.source.userId;
    console.log(event);
    randRecom.handle(event, msg);
  }
});


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});


