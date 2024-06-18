const express = require('express');
const router = express.Router();
const School = require('../models/school');
const upload = require('../config/multerConfig'); // Assuming you have multer configured for file upload

// POST 
router.post('/', upload.single('picture'), async (req, res) => {
  try {
    const { name, fees, details } = req.body;
    const picture = req.file.location; // Assuming you're using multer for file upload

    const newSchool = new School({ name, fees, picture, details });
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all 
router.get('/all', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET paginated schools
router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1; // Get the requested page from query params, default to 1 if not provided
    const limit = 5; // Number of schools per page

    const schools = await School.find()
      .skip((page - 1) * limit) // Skip schools based on the requested page
      .limit(limit); // Limit the number of schools per page

    const totalCount = await School.countDocuments(); // Get the total count of schools

    res.json({
      schools,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching paginated schools:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// GET one
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    console.error('Error fetching school by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update
router.put('/:id', upload.single('picture'), async (req, res) => {
  try {
    const { name, fees, details } = req.body;
    const picture = req.file.location; 

    let updatedSchool = {
      name,
      fees,
      details,
    };
    if (picture) {
      updatedSchool.picture = picture;
    }

    const school = await School.findByIdAndUpdate(
      req.params.id,
      updatedSchool,
      { new: true }
    );
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    console.error('Error updating school by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Error deleting school by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
