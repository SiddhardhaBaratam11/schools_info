const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fees: { type: String, required: true },
  picture: { type: String },
  details: { type: String },
});

schoolSchema.plugin(mongoosePaginate);
const School = mongoose.model('School', schoolSchema);

module.exports = School;
