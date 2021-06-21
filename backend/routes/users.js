const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

const channelSecret = process.env.CHANEL_SECRET
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/line/webhook', async function(req, res, next) {
  try {
    await axios.post('https://api.line.me/v2/bot/message/reply', {
      replyToken: req.body.events[0].replyToken,
      messages: [req.body.events[0].message]
    }, {
      headers: {
        Authorization: `Bearer ${channelSecret}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  res.send('respond with a resource');
});
router.get('/:id/sendMessage', async function(req, res, next) {
  // send api to POST https://api.line.me/v2/bot/message/push
  console.log(channelSecret)
  try {
    await axios.post('https://api.line.me/v2/bot/message/push', {
      to: req.params.id,
      messages:[
        {
          type: 'text',
          text: 'Hello, world1'
        },
      ]
    }, {
      headers: {
        Authorization: `Bearer ${channelSecret}`
      }
    })
  }
  catch (e) {
    console.log(e.messages)
  }
  // with channel access token
  /* {
      "to": "U4af4980629...",
      "messages":[
          {
              "type":"text",
              "text":"Hello, world1"
          },
          {
              "type":"text",
              "text":"Hello, world2"
          }
      ]
  }*/
  res.send(`respond with a resource ${req.params.id}`);
});

module.exports = router;
