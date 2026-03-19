const router = require('express').Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: 'All fields required' });
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id/read', auth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(msg);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
