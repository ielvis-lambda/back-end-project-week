const express = require('express');
const router = express.Router();
const db = require('./notesModel');

// Notes endpoints
router.get('/notes/', (req, res) => {
  res.status(200).send('Server Listens and Obeys or WTFDoes it???');
});

router.get('/notes/all/', async (req, res) => {
  try {
    const notes = await db.getAll();
    console.log('the notes are... ', notes);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'There was an error while getting the notes. The error is ', error });
  }
});

router.post('/api/notes/', async (req, res) => {
  const NoteData = req.body;
  console.log(req.body);
  if (!NoteData.title || !NoteData.content) {
    res.status(422).json({ errorMessage: 'Please provide a title and/or content for your note.' });
  } else if (!db.findByTitle(NoteData.title)) {
    res.status(405).json({ errorMessage: 'Duplicate Note Titles Not Allowed' });
  } else {
    try {
      const newGame = await db.insert(NoteData);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ error: 'There was an error while saving the note to the database. The error is ', error });
    }
  }
});

module.exports = router;