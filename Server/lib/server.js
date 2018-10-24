const express = require('express');
const bodyParser = require('body-parser');
const ChannelsService = require('./services/channelsservice');

const _configure_routes = (app, slack) => {
  app.get('/', (req, res) => res.send('Hello World!'))
  
  app.get('/channels', (req, res) => {
    ChannelsService.get_channels(slack).then((channels) => {
      res.send(channels);
    });
  });

  app.get('/public_channels', (req, res) => {
    ChannelsService.get_public_channels(slack).then((channels) => {
      res.send(channels);
    });
  });

  app.post('/broadcast', (req, res) => {
    const envelope = req.body;
    ChannelsService.broadcast(slack, envelope).then((response) =>{
      res.send(response);
    });
  });
}

const Server = {
  start: (slack) => {
    const app = express()
    const port = 3000

    app.use(bodyParser.json());

    _configure_routes(app, slack);
    
    app.listen(port, () => console.log(`Slack-Broadcaster listening on port ${port}!`))
  }
};

module.exports = Server;
