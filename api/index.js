const { createServer, proxy } = require('aws-serverless-express');
const app = require('../dist/apps/voter-api/main').default;

const server = createServer(app.callback());

module.exports = (req, res) => {
  proxy(server, req, res);
};
