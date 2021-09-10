const express = require('express');
const abilityController = require('../controller/abilityController');
const logUtil = require('../common/util/logUtil');

module.exports = function webConfig() {
  const app = express();
  const port = 8091;

  app.use('/api/ability', abilityController);

  app.listen(port, () => {
    logUtil.info(`server port: ${port}`)
    logUtil.info('app is runnig.');
  })
}