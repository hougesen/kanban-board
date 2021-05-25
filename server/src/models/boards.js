const mongoose = require('mongoose');

const boards = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  board: {
    title: {
      type: String,
      default: 'Untitled board',
    },
    columns: [
      {
        title: {
          type: String,
        },
        tasks: [
          {
            task: String,
          },
        ],
      },
    ],
  },

  created: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Boards = mongoose.model('Boards', boards);
module.exports = Boards;
