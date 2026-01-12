const mongoose = require('mongoose');

const deliveryRequestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  itemDetails: { type: String },
  status: { type: String, default: 'Pending' }, // 'Pending', 'Accepted', 'Delivered'
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DeliveryRequest', deliveryRequestSchema);
