var express = require('express');
var nm = require('nodemailer');
var fs = require('fs');

var t = nm.createTransport();

var app = express();
app.set('port', 4242);
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded());

app.post('/lol', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  var mailOption = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.body
  };

  t.sendMail(mailOption, function(err, info) {
    if (err) {
      console.log('Boooo ', err);
      res.json(false);
    }
    if (info) {
      console.log('And voilà! ', info);
      res.json(true);
      var logText = JSON.stringify(mailOption) + \n;
      fs.appendFile('log.txt', logText, function (err) {
        console.log("error", err);
      });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started on port %d', app.get('port'));
});
