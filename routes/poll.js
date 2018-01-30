const express = require('express');
const router = express.Router();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '465488',
  key: 'bebe81c70727ec9b0795',
  secret: '6ba619dbaa8fadab49c2',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
	res.send('POLL');
});

router.post('/', (req, res) => {
	pusher.trigger('coin-poll', 'coin-vote', {
  		points: 1,
  		coin: req.body.coin
	});

	return res.json({ success: true, message: "Thank you for voting." });
});

module.exports = router;