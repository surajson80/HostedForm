require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.static('public'));
const YOUR_DOMAIN = 'http://localhost:4242';
const stripe = require('stripe')('sk_test_51M7YQZSCsDCIa4NeBAGqW1N5BJWr7Dp1Kb3kIz511f4Q6mYYqlIhbyhVDdAdmadb6RdmjY5Bt0mFL5oD4JkcDOV700iLBDIJKf');
// const endpointSecret = "whsec_423802b2ad3905fd4933554eeb9d9a3baa2dc65c087c4d1a97047404b6196b5a";
//connected to database//
const bodyParser=require("body-parser");
// const cors = require("cors");
const db = require("./database/models");
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// db.sequelize.sync();
require("./database/routes/transaction.route")(app)

app.post('/gateway/webhook', async(req, res) =>{
  // console.log("here webhook", req.body);
  // console.log("----------------")
  // console.log(req.body.data.object.customer_details.name)
  // console.log(req.body.data.object.customer_details.email)
  // console.log(req.body.data.object.customer_details.address.country)
  // console.log(req.body.data.object.currency)
  // console.log(req.body.data.object.mode)
  // console.log(req.body.data.object.payment_method_types)
  // console.log(req.body.data.object.payment_status)
  // console.log(req.body.data.object.status);
  // console.log(req.body.data.object.amount_total)
  // console.log("----------------")
  // db.transactions.create({
  //   name:req.body.data.object.customer_details.name,
  //   price:req.body.data.object.amount_total/100,
  //   statusComplete:req.body.data.object.payment_status,
  //   country:req.body.data.object.customer_details.address.country=="IN"?"INDIA":"OTHERS",
  //   email:req.body.data.object.customer_details.email
  // })
  // console.log("----------------")


  let payment_id = req.body.data.object.id
  let statusComplete = req.body.data.object.payment_status
  var data ={
    statusComplete: statusComplete
  }
  db.transaction5.update(data,{
    where:{payment_id:payment_id}
  })

  res.send({messege:"success"}, 200)
} );

app.post('/create-checkout-session', async (req, res) => {
  //checkout session created
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    line_items: [
      { price: 'price_1M97bBSCsDCIa4NelpI3cIED', quantity: 1 },
    ],
    mode: 'payment',
  });
  console.log("hello");
  db.transaction5.create({
    payment_id: session.id,
    statusComplete: session.payment_status
  })

  res.redirect(303, session.url);
  // res.redirect({url :session.url});
});

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.async_payment_failed':
//       var session = event.data.object;
//       // Then define and call a function to handle the event checkout.session.async_payment_failed
//       break;
//     case 'checkout.session.async_payment_succeeded':
//       var session = event.data.object;
//       // Then define and call a function to handle the event checkout.session.async_payment_succeeded
//       break;
//     case 'checkout.session.completed':
//       var session = event.data.object;
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     case 'checkout.session.expired':
//       var session = event.data.object;
//       // Then define and call a function to handle the event checkout.session.expired
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

app.listen(4242, () => console.log('Running on port 4242'));