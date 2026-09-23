const express = require("express");
const chatbot = require("../models/model");

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    const trimmedMessage = message.trim();
    const userMessage = trimmedMessage.toLowerCase();
    let reply = "";

    try {
        // Greeting — no order lookup needed
        if (userMessage.includes("hello") || userMessage.includes("hi")) {
            reply = "Hi, Enter your Order Id or Tracking Id.";
            return res.json({ reply });
        }

        // Case 1: user is asking about location/delivery for the order already found
        if (userMessage.includes("location") || userMessage.includes("delivery")) {
            if (!req.session.order_id) {
                reply = "Please enter your Order Id first.";
                return res.json({ reply });
            }
            const order = await chatbot.findOne({ order_id: req.session.order_id });
            reply = `Your order ${order.order_id} has reached ${order.location} now.`;
            return res.json({ reply });
        }

        // Case 2: user is asking about the expected delivery date
        if (userMessage.includes("date")) {
            if (!req.session.order_id) {
                reply = "Please enter your Order Id first.";
                return res.json({ reply });
            }
            const order = await chatbot.findOne({ order_id: req.session.order_id });
            reply = `Your order ${order.order_id} will reach you on ${order.expected_date}.`;
            return res.json({ reply });
        }

        // Case 3: treat the message as a possible Order ID
        const order = await chatbot.findOne({ order_id: trimmedMessage.toUpperCase() });

        if (order) {
            // Remember this order for follow-up questions (location/date)
            req.session.order_id = order.order_id;
            reply = `Hi ${order.name}, your order ${order.order_id} was found. Ask me "location" or "date" to know more.`;
        } else {
            reply = "Sorry, can't find your order. Please enter a valid Order Id or Tracking Id.";
        }

        res.json({ reply });

    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Something went wrong, please try again." });
    }
});

module.exports = router;