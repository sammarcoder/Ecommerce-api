require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRETE_KEY);

// create payment intent

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount || !currency) {
      return res
        .status(404)
        .json({ success: false, message: "Amount and currency are required" });
    }

    const paymenIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res.status(200).json({
      success: true,
      clientSecrete: paymenIntent.client_secrete,
      paymenIntent
    });

    console.log("hi");
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    // const event = req.body
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRETE
    );
    if (event.type === 'payment_intent.succeeded')
    {
        const paymenIntent = event.data.object;
        console.log('Payment succeeded',paymenIntent)
    }
    res.json({recieved : true})
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
};

// createPaymentIntent()

console.log(process.env.STRIPE_SECRETE_KEY);
// console.log(stripe.paymenIntents.create({}))

module.exports = {createPaymentIntent, handleStripeWebhook}
