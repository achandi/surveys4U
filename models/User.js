const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({ googleId: String });
//aboe we can freely add in and remove properties as u please
mongoose.model('users', userSchema); //create a new collection called users, ONLY if one doesn't exist



console.log('mongoose');
