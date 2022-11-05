const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const SSLCommerzPayment = require('sslcommerz-lts');
const bodyParser = require('body-parser');
const { notFoundHandler, errorHandler } = require('./middlewares/error');
require('./models');
require('dotenv').config();

// middlewares
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4000'],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', routes);

// port initializing
const port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.get('/', async (req, res) => {
//   /**
//    * Root url response
//    */

//   return res.status(200).json({
//     message: 'Welcome to sslcommerz app',
//     url: `${process.env.ROOT}/ssl-request`,
//   });
// });

app.get('/ssl-request', async (req, res) => {
  /**
   * Create ssl session request
   */

  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: 'http://localhost:4000/ssl-payment-success',
    fail_url: 'http://localhost:4000/ssl-payment-fail',
    cancel_url: 'http://localhost:4000/ssl-payment-cancel',
    shipping_method: 'No',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    multi_card_name: 'mastercard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false,
  ); //true for live default false for sandbox
  sslcommerz.init(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters

    if (data?.GatewayPageURL) {
      return res.status(200).redirect(data?.GatewayPageURL);
    } else {
      return res.status(400).json({
        message: 'Session was not successful',
      });
    }
  });
});

app.post('/ssl-payment-notification', async (req, res) => {
  /**
   * If payment notification
   */

  return res.status(200).json({
    data: req.body,
    message: 'Payment notification',
  });
});

app.post('/ssl-payment-success', async (req, res) => {
  /**
   * If payment successful
   */

  return res.status(200).json({
    data: req.body,
    message: 'Payment success',
  });
});

app.post('/ssl-payment-fail', async (req, res) => {
  /**
   * If payment failed
   */

  return res.status(200).json({
    data: req.body,
    message: 'Payment failed',
  });
});

app.post('/ssl-payment-cancel', async (req, res) => {
  /**
   * If payment cancelled
   */

  return res.status(200).json({
    data: req.body,
    message: 'Payment cancelled',
  });
});

// main route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// error handler
app.use([notFoundHandler, errorHandler]);

// listening server
app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`),
);
