var email   = require("emailjs/email");
var RESDIR = __dirname + "/../../res/";

module.exports = exports = noty = function (opt) {
  this.mailer  = email.server.connect({
    user:     process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host:     process.env.SMTP_HOST,
    ssl:     true,
    port:     process.env.SMTP_PORT
  });
}

noty.prototype.alarm = function () {
  this.mailer.send({
    text:    "A motion occured",
    from:    "you <k2351987@gmail.com>",
    to:      "vinh <vinh@listia.com>, another <kurei@axcoto.com>",
    cc:      "else <kureikain@gmail.com>",
    subject: "Motion detect alerts"
  }, function(err, message) {
      console.log(err || message)
  })

}
