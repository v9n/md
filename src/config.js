var config = {}
var dotenv = require('dotenv')

module.exports = exports = config
config.init = function () {
  if ('test' == process.env.ENV) {
    dotenv.load({path: './.env.test'});
  } else {
    dotenv.load();
  }
}
