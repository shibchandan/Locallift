// const express = require('express');
// const router = express.Router();
// const protect = require('../middlewares/authMiddleware').protect; // Ensure this matches your auth middleware path
// const DeliveryRequest = require('../models/DeliveryRequest');

// router.post('/', protect, async (req, res) => {
//   const { pickupLocation, dropLocation, itemDetails } = req.body;

//   try {
//     const request = await DeliveryRequest.create({
//       customer: req.user._id,
//       pickupLocation,
//       dropLocation,
//       itemDetails,
//     });
//     res.status(201).json(request);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// module.exports = router;

// 

// const express = require('express');
// const router = express.Router();
// const protect = require('../middlewares/authMiddleware').protect; // Ensure this matches your auth middleware path
// const DeliveryRequest = require('../models/DeliveryRequest');

// router.post('/', protect, async (req, res) => {
//   const { pickupLocation, dropLocation, itemDetails } = req.body;

//   try {
//     const request = await DeliveryRequest.create({
//       customer: req.user._id,
//       pickupLocation,
//       dropLocation,
//       itemDetails,
//     });
//     res.status(201).json(request);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware').protect; // Adjust path if needed
const DeliveryRequest = require('../models/DeliveryRequest');

// POST: Create a new delivery request (protected route)
router.post('/', protect, async (req, res) => {
  const { pickupLocation, dropLocation, itemDetails } = req.body;

  try {
    const request = await DeliveryRequest.create({
      customer: req.user._id,
      pickupLocation,
      dropLocation,
      itemDetails,
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET: Retrieve all delivery requests (public route or make protected if needed)
router.get('/', async (req, res) => {
  try {
    const requests = await DeliveryRequest.find().populate('customer', 'name phone email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
