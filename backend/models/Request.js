
// // models/Request.js
// const mongoose = require('mongoose');

// const requestSchema = new mongoose.Schema({
//   pickup: {
//     type: String,
//     required: true,
//   },
//   drop: {
//     type: String,
//     required: true,
//   },
//   packageDetails: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'completed', 'cancelled'],
//     default: 'pending',
//   }
// }, {
//   timestamps: true,
// });

// module.exports = mongoose.model('Request', requestSchema);
// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true
  },
  pickupLocation: String,
  dropLocation: String,
  itemDetails: String,
  status: {
    type: String,
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
