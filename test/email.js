var assert = require("assert"); // node.js core module
var sinon  = require("sinon")

var Email = require('../src/email/index')
var emailjs   = require("emailjs/email");
var stub_server

describe('Email', function(){

  before(function() {
    process.env.SMTP_HOST= "smtp.gmail.com",
    process.env.SMTP_PORT= 465,
    process.env.SMTP_USER= "foo@gmail.com",
    process.env.SMTP_PASSWORD= "dummy",
    process.env.SMTP_DEFAULT_FROM= "foo@gmail.com"

    stub_server = sinon.stub()
    stub_server.send = sinon.stub()

    var stub_connect = sinon
          .stub(emailjs.server, "connect")
          .returns(stub_server)
  })

  after(function() {
    //emailjs.server.connect.restore()
  })

  describe('#alarm', function(){
    it('should call send email', function(){
      var email = new Email()
      email.alarm()

      assert.equal(emailjs.server.connect.called, true)
      assert.equal(stub_server.send.called, true)

    })
  })
})
