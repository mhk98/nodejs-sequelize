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

const demoFunc = async (a) => {
  const tranId = 'REF123';
  const data = {
    total_amount: a,
    currency: 'BDT',
    tran_id: tranId,
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
  const result = await sslcommerz.init(data);
  if (result?.GatewayPageURL) {
    return { tranId, GatewayPageURL: result.GatewayPageURL };
  } else {
    return false;
  }
};

app.post('/ssl-request', async (req, res) => {
  const { amount } = req.body;
  const ddd = await demoFunc(amount);
  const reData = await getRechareValue(ddd.tranId);
  res.json(ddd.GatewayPageURL);
});

const getRechareValue = async (tranID) => {
  const data = {
    tran_id: tranID,
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

app.post('/ssl-payment-success', async (req, res) => {
  /**
   * If payment successful
   */

  console.log(req.body);
  return res.status(200).json({
    data: req.body,
    message: 'Payment success',
  });
});

app.get('/ssl-payment-success/:tranId', async (req, res) => {
  const tranId = req.params.tranId;

  try {
    const successPayment = await data.findOne({
      where: {
        tranId,
      },
    });
    res.send(successPayment);
  } catch (err) {
    res.send(err);
  }
});

// exports.SSLCommerz_payment_success = async (req, res) => {
//   const { transactionId } = req.query;

//   if (!transactionId) {
//     return res.json({ message: 'transactionId must be required' });
//   } else {
//     const currentOrder = Order.findByIdAndUpdate(transactionId, {
//       paymentDone: true,
//       updatedAt: Date.now(),
//     });

//     currentOrder.exec((err, result) => {
//       if (err) console.log(err);
//       res.redirect(
//         `${process.env.CLIENT_URL}/checkout/success/${transactionId}`,
//       );
//     });
//   }
// };

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
