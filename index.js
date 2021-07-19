const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51ItTdwSAfqeFeWnIvDfBtWNIpO3j9bmmIwA7FXfh9HPfBaHFbGArrQqcB9BuAZ4zUaUkPCHfaMUHpF7VwjG8M69V00gZoAT8x6"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hellloe world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
