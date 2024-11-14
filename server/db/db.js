const mongoose = require('mongoose');
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
main().catch(err => console.log(err));
const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  birth_date: Date,
  photo_url: String,
  borrowed: [Number],
  lent: [Number],
  preferred_contact: { type: String, enum: ["phone", "email"] },
});
const bookSchema = new mongoose.Schema({
  bookID: { type: Number, unique: true },
  userID: { type: Number, required: true, index: true },
  borrowerID: { type: Number, index: true },
  title: String,
  available: { type: Boolean, default: false },
  due_date: { Date, index: true },
  created_date: { type: Date, default: Date.now() }
  author: String,
  description: String,
  notes: String,
  image: String,
  ratings: { type: Number, default: null,min:1,max:5 },
  genre: String,
  publish_date: Date,
  likes: { type: Number, default: 0 },
});
const contactSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  phone: phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  name: { type: String, required: true },
  message: { type: String, required: true },

});
const Users = mongoose.model('User', userSchema);
const Books = mongoose.model('Book', bookSchema);


module.exports.getAll = (page = 1) => {


}
