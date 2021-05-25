// helpers
const express = require('express');

// models
const Users = require('../models/users');

const router = express.Router();

router.post('/create', async (req, res) => {
  const new_user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const u = new Users(new_user);

  await u
    .save()
    .then(() => {
      res.status(200).send({ auth: true, msg: 'User created successfully', userId: u._id, username: u.username });
    })
    .catch((err) => {
      console.log(err);
      res.send({ auth: false, msg: 'Please try again', err });
    });
});

module.exports = router;
