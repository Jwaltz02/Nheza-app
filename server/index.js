const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const nhezaMembership = new Map([
  [1, { priceInCents: 19900, name: "Nheza Membership (Annually)" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = nhezaMembership.get(item.id);
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

let globalData = null;

app.post("/getInfo", bodyParser.urlencoded({ extended: false }), (req, res) => {
  globalData = req.body;
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, response) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const invoiceItems = await stripe.invoiceItems.list({
          limit: 3,
        });

        const invoiceId = invoiceItems.data[0].invoice;
        console.log(invoiceId);
        console.log("PaymentIntent was successful!");

        const name = session.customer_details.name;
        const email = session.customer_details.email;
        const phone = session.customer_details.phone;
        const device = globalData.device;
        const date = globalData.date;
        const location = session.customer_details.address.line1.concat(
          " ,",
          session.customer_details.address.city,
          " ,",
          session.customer_details.address.country
        );

        console.log(location);
        const mail = {
          from: "Nheza <donotreply@gmail.com>",
          to: [email, process.env.EMAIL_ADDRESS],
          subject: "Invoice Purchase from Nheza",
          html: `

      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Invoice</h2>
          <p style="color: #666; font-size: 16px;">Invoice ID: <strong>${invoiceId}</strong></p>
          <p style="color: #666; font-size: 16px;">Date: <strong>${date}</strong></p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <h3 style="color: #333;">Billing Information</h3>
          <p style="color: #666; font-size: 16px;">
              Customer Name: <strong>${name}</strong><br>
              Address: <strong>${location}</strong><br>
              Email: <strong>${email}</strong><br>
              Phone: <strong>${phone}</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f8f8;">
                  <th style="padding: 10px; text-align: left;">Description</th>
                  <th style="padding: 10px; text-align: right;">Amount</th>
              </tr>
              <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">Annual Subscription (including tax)</td>
                  <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$300.00</td>
              </tr>
              <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">Free Medical Device: <strong>${device}</strong></td>
                  <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$0.00</td>
              </tr>
              <tr>
                  <td style="padding: 10px;">Total</td>
                  <td style="padding: 10px; text-align: right;">$300.00</td>
              </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;" />

          <p style="margin-top: 20px; color: #666; font-size: 16px;">Thank you for your purchase!</p>

          <p style="color: #888; font-size: 14px;">This is a system-generated email. Please do not reply.</p>
      </div>

      </body>
      </html>

            `,
        };

        contactEmail.sendMail(mail);

        break;
      }
      default:
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
app.listen(3002, () => console.log("Running on port 3002"));

// app.get("/api", (req, res) => {
//   res.json({ message: "hello from server" });
// });

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready to send");
  }
});
