const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');
const { Schema } = mongoose;
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
});
//aboe we can freely add in and remove properties as u please
mongoose.model('surveys', surveySchema);
//create a new collection called users, ONLY if one doesn't exist
