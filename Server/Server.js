require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd', 
            payment_method_types: ['card'],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
