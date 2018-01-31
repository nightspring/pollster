const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '465488',
  key: 'bebe81c70727ec9b0795',
  secret: '6ba619dbaa8fadab49c2',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
	Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
	const newVote = {
		coin: req.body.coin,
		points: 1
	};

	new Vote(newVote).save().then(vote => {
		pusher.trigger('coin-poll', 'coin-vote', {
  			points: parseInt(vote.points),
  			coin: vote.coin
		});

		return res.json({ success: true, message: "Thank you for voting." });
	});
});

module.exports = router;