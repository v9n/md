var assert = require("assert")
var sinon  = require("sinon")

var dotenv = require("dotenv")

describe('Config', function(){
  beforeEach(function() {
    sinon
      .stub(dotenv, "load", function () { })
  })

  afterEach(function() {
    dotenv.load.restore()
  })

  it('load .env when not running test', function(){
    var r = require('../src/config')
    r.init()
    sinon.assert.calledOnce(dotenv.load)
    sinon.assert.calledWith(dotenv.load)
  })

  it('load .env.test when running test', function(){
    process.env.ENV = "test"
    var r = require('../src/config')
    r.init()
    //assert(stub_load.calledWith({path: './.env.test'}))
    sinon.assert.calledOnce(dotenv.load)
    sinon.assert.calledWith(dotenv.load, {path: './.env.test'})
  })

})
