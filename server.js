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
// const success = './models/success/success.js';
const shortid = require('shortid');

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

const demoFunc = async (amount, TranId) => {
  // const tranId = `${shortid.generate()}`;
  const tranId = TranId;
  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: tranId,
    success_url: 'http://localhost:4000/ssl-payment-success',
    fail_url: 'http://localhost:4000/ssl-payment-fail',
    cancel_url: 'http://localhost:4000/ssl-payment-cancel',
    shipping_method: 'No',
    product_name: 'device_number.',
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
    // value_c: 'ref003_C',
    value_d: 'ref004_D',
    ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false,
  ); //true for live default false for sandbox
  const result = await sslcommerz.init(data);
  if (result?.GatewayPageURL) {
    return { tranId, GatewayPageURL: result.GatewayPageURL };
  } else {
    return false;
  }
};

app.post('/ssl-request', async (req, res) => {
  console.log('>>> i am from submit button');
  console.log(req.body);
  const { amount } = req.body;
  const TranId = `${shortid.generate()}`;
  const ddd = await demoFunc(amount, TranId);
  console.log(ddd);
  const res_ssl = res.json(ddd.GatewayPageURL);
  // console.log(res_ssl);
  // console.log('after res_ssl' * 10);
});

const getRechareValue = async (tranID) => {
  const data = {
    tranID: tranID,
  };
  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false,
  );
  const result = await sslcz.validate(data);

  return result;
};

app.post('/ssl-payment-notification', async (req, res) => {
  /**
   * If payment notification
   */
  return res.status(200).json({
    data: req.body,
    message: 'Payment notification',
  });
});

function intimidiate_process(successful_json, status) {
  console.log(
    '------------------------intimidiate_process----------------------------',
  );
  let local_payemnt_data = successful_json;
  console.log('tran_id ', local_payemnt_data.tran_id);
  console.log(status);
  console.log(
    '------------------------intimidiate_process----------------------------',
  );
}
app.post('/ssl-payment-success', async (req, res) => {
  /**
   * If payment successful
   */
  // console.log('req.body----------------------------------------------------');
  let status = 'susccess';
  intimidiate_process(req.body, status);
  // console.log(req.body.tran_id);
  // console.log('req.body----------------------------------------------------');

  return res.status(200).json({
    data: req.body,
    message: 'Payment success',
  });
});

app.post('/ssl-payment-fail', async (req, res) => {
  /**
   * If payment failed
   */
  let status = 'fail';
  intimidiate_process(req.body, status);
  return res.status(200).json({
    data: req.body,
    message: 'Payment failed',
  });
});

app.post('/ssl-payment-cancel', async (req, res) => {
  /**
   * If payment cancelled
   */
  let status = 'cancel';
  intimidiate_process(req.body, status);

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
