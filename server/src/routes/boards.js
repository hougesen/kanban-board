// helpers
const express = require('express');

// models
const Boards = require('../models/boards');

const router = express.Router();

// Get specific board
router.get('/:boardId', async (req, res) => {
  const board = await Boards.findOne({
    _id: req.params.boardId,
  });
  if (!board || board === null || board === undefined) {
    res.status(404).send({ success: false, msg: 'Board not found' });
  } else {
    res.status(200).send(board);
  }
});

// Get users boards
router.get('/list/:userId', async (req, res) => {
  const boards = await Boards.find({
    users: {
      $all: req.params.userId,
    },
  }).sort({ lastUpdated: -1 });
  res.send(boards);
});

// Create new board
router.post('/create', async (req, res) => {
  const new_board = {
    users: [`${req.body.userId}`],
    board: {
      title: req.body.boardTitle || null,
    },
  };

  const b = new Boards(new_board);

  await b
    .save()
    .then(() => {
      res.status(200).send({ success: true, msg: 'New board created', b });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, msg: 'Please try again', err });
    });
});

// Update board
router.put('/update/:boardId', async (req, res) => {
  const board = await Boards.findOne({ _id: req.params.boardId });
  if (!board) res.status(404).send({ success: false, msg: 'Please try again', err });

  board.board = req.body.board;

  board.lastUpdated = new Date();

  await board
    .save()
    .then(() => {
      res.status(200).send({ success: true, msg: 'Board updated' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, msg: 'Please try again', err });
    });
});

router.delete('/delete/:boardId', async (req, res) => {
  await Boards.deleteOne({ _id: req.params.boardId })
    .then(() => {
      res.status(200).send({ success: true, msg: 'Board deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ success: false, msg: 'Please try again', err });
    });
});

module.exports = router;
