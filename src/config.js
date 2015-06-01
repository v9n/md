if ('test' == process.env.ENV) {
  require('dotenv').load({path: './.env.test'});
} else {
  require('dotenv').load();
}

