const Server = require('./lib/server');
const Slack = require('slack');

const token = process.env.SLACK_TOKEN;

if (!token) {
  console.log('Missing env var SLACK_TOKEN');
  process.exit(1);
}

const slack = new Slack({token});

Server.start(slack);
