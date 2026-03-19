const router = require('express').Router();
const About = require('../models/About');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    res.json(about);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', auth, async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
    }
    res.json(about);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
