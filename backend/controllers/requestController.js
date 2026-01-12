const Request = require('../models/Request'); // Adjust path if needed

exports.createDeliveryRequest = async (req, res) => {
  try {
    const request = new Request({
      ...req.body,
      user: req.user.id, // Assuming you attach user in authMiddleware
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
