const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// 获取所有场所
router.get('/', async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// 添加场所
router.post('/', async (req, res) => {
  const place = new Place(req.body);
  await place.save();
  res.json(place);
});

module.exports = router;
