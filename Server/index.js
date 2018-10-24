const Server = require('./lib/server');
const Slack = require('slack');

const token = process.env.SLACK_TOKEN;
const slack = new Slack({token});

Server.start(slack);
