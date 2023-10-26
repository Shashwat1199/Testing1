const razorpay = require('razorpay');
// Initialize the Razorpay instance with your API Key and Secret Key
const rzp = new razorpay({
  key_id: 'rzp_test_7DYaDcDBt3EhI1',
  key_secret: 'NFFSPLEd5DGsMQr6f5wxvUgy',
});

exports.prePayment = async(req, res) => {
  const options = {
    amount: 500, // Amount in paise (e.g., 1000 paise = ₹10)
    currency: 'INR',
  };

  try {
    const order = await rzp.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

exports.postPayment = async (req, res) => {
  const { paymentId, amount } = req.body;

  try {
    const payment = await rzp.payments.capture(paymentId, amount);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Error capturing payment' });
  }
};