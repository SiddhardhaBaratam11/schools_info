const School = require('../models/school');

const addSchool = async (req, res) => {
  try {
    const { name, fees, details } = req.body;
    const picture = req.file.location;
    const newSchool = new School({ name, fees, picture, details });
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addSchool };
