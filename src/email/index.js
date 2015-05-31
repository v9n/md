var email   = require("emailjs/email");
var server  = email.server.connect({
  user:     process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  host:     process.env.SMTP_HOST,
  ssl:     true,
  port:     process.env.SMTP_PORT
});

var RESDIR = __dirname + "/../../res/";

module.exports = exports = noty = function (opt) {
}

noty.prototype.alarm = noty.alarm = function () {

  // send the message and get a callback with an error or details of the message that was sent
  server.send({
    text:    "i hope this works", 
    from:    "you <k2351987@gmail.com>", 
    to:      "vinh <vinh@listia.com>, another <kurei@axcoto.com>",
    cc:      "else <kureikain@gmail.com>",
    subject: "testing emailjs"
  }, function(err, message) { console.log(err || message); });

}
