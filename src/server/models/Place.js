const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: String,
  type: String,
  coordinates: {
    x: Number,
    y: Number,
  },
  connections: [
    {
      to: String,
      distance: Number,
    },
  ],
});

module.exports = mongoose.model('Place', PlaceSchema);
