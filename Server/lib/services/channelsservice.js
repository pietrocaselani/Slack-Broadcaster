const _get_channels = (slack) => {
  return slack.channels.list().then((response) => {
    return response.channels.filter((channel) => channel.is_archived === false);
  });
}

const _get_public_channels = (slack) => {
  return _get_channels(slack).then((channels) => {
    return channels.filter((channel) => channel.is_private === false);
  });
}

const _parse_channels = (channels_promise) => {
  return channels_promise.then((channels) => {
    return channels.map(channel => ({id: channel.id, name: channel.name}) )
  });
}

const _broadcast = (slack, envelope) => {
  const text = envelope.message;
  const channel = envelope.channel;
  const other_channels = envelope.other_channels;

  return slack.chat.postMessage({channel, text})
  .then(response => {
    if (!response.ok) {
      throw `Couldn't send message to channel ${channel}`;
    }

    const message_ts = response.ts;

    return slack.chat.getPermalink({channel, message_ts});
  }).then(permalink_response => {
    if (!permalink_response.ok) {
      throw `Couldn't get message link at channel ${channel}`;
    }

    const message_link = permalink_response.permalink

    const promises = other_channels.map(channel => {
      return slack.chat.postMessage({channel, text: message_link})
    });

    return Promise.all(promises);
  });
}

const ChannelsService = {
  get_channels: (slack) => {
    return _parse_channels(_get_channels(slack));
  },
  get_public_channels: (slack) => {
    return _parse_channels(_get_public_channels(slack));
  },
  broadcast: (slack, envelope) => {
    return _broadcast(slack, envelope);
  }
};

module.exports = ChannelsService;
