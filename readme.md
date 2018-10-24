# Consuming the API

## Get all channels

Returns all non archived channels

**Usage:**

`curl -X GET http://localhost:3000/channels`

**Return:**

Returns a list of objects:

`{"id":"channel_id","name":"channel_name"}`

## Get all public channels

Returns all non archived public channels

**Usage:**

`curl -X GET http://localhost:3000/public_channels`

Return the same JSON style as `Get all channels`

## Broadcast a message

Send a text message to a list of channels

**Usage:**

```json
curl -X POST \
  http://localhost:3000/broadcast \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Hello everyone!",
    "channel_ids": [
        "channel_id_0",
        "channel_id_1",
        "channel_id_2"
    ]
}'
```

POST JSON body style:

`{"message": "text message here", "channels_ids": ["channel_1", "channel_2"]}`
