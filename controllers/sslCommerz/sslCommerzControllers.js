// const SSLCommerz = require('ssl-commerz-node');
// const PaymentSession = SSLCommerz.PaymentSession;
// const shortid = require('shortid');
// const success = require('../../models/sslCommerz/sslCommerz');
// require('dotenv').config();

// // For live payment set first parameter `false` and for sandbox set it `true`
// const payment = new PaymentSession(
//   true,
//   process.env.STORE_ID,
//   process.env.STORE_PASSWORD,
// );

// exports.SSLCommerz_payment_init = async (req, res) => {
//   // console.log(req.body);

//   const {
//     tran_id,
//     val_id,
//     card_type,
//     store_amount,
//     bank_tran_id,
//     status,
//     tran_date,
//     card_issuer,
//     card_brand,
//   } = req.body;

//   const transactionId = `transaction_${shortid.generate()}`;
//   // let paymentDone = false;

//   if (
//     !tran_id ||
//     !val_id ||
//     !card_type ||
//     !store_amount ||
//     !bank_tran_id ||
//     !status ||
//     !tran_date ||
//     !card_issuer ||
//     !card_brand
//   ) {
//     return res.json({ message: 'All filled must be required' });
//   } else {
//     try {
//       // Set the urls
//       payment.setUrls({
//         // success: "yoursite.com/success", // If payment Succeed
//         success: `http://localhost:4000/api/payment/checkout/success?transactionId=${transactionId}`, // If payment Succeed
//         fail: 'http://localhost:4000/api/payment/checkout/fail', // If payment failed
//         cancel: 'http://localhost:4000/api/payment/checkout/cancel', // If user cancel payment
//         ipn: 'http://localhost:4000/ipn', // SSLCommerz will send http post request in this link
//       });
//       // Set order details
//       payment.setsuccessinfo({
//         // total_amount: totalAmount, // Number field
//         currency: 'BDT', // Must be three character string
//         tran_id: transactionId, // Unique Transaction id
//         emi_option: 0, // 1 or 0
//         multi_card_name: 'internetbank', // Do not Use! If you do not customize the gateway list,
//         allowed_bin: '371598,371599,376947,376948,376949', // Do not Use! If you do not control on transaction
//         emi_max_inst_option: 3, // Max instalment Option
//         emi_allow_only: 0, // Value is 1/0, if value is 1 then only EMI transaction is possible
//       });

//       // Set customer info
//       //   const {
//       //     cusName,
//       //     cusEmail,
//       //     cusAdd1,
//       //     cusAdd2,
//       //     cusCity,
//       //     cusState,
//       //     cusPostcode,
//       //     cusCountry,
//       //     cusPhone,
//       //     cusFax,
//       //   } = customerInfo;
//       //   payment.setCusInfo({
//       //     name: cusName,
//       //     email: cusEmail,
//       //     add1: cusAdd1,
//       //     add2: cusAdd2,
//       //     city: cusCity,
//       //     state: cusState,
//       //     postcode: cusPostcode,
//       //     country: cusCountry,
//       //     phone: cusPhone,
//       //     fax: cusFax,
//       //   });

//       // Set shipping info
//       //   const {
//       //     name,
//       //     shippingAdd1,
//       //     shippingAdd2,
//       //     shippingCity,
//       //     shippingState,
//       //     shippingPostcode,
//       //     shippingCountry,
//       //   } = shippingInfo;
//       //   payment.setShippingInfo({
//       //     method: deliveryMethod, //Shipping method of the order. Example: YES or NO or Courier
//       //     num_item: numItem,
//       //     name: name,
//       //     add1: shippingAdd1,
//       //     add2: shippingAdd2,
//       //     city: shippingCity,
//       //     state: shippingState,
//       //     postcode: shippingPostcode,
//       //     country: shippingCountry,
//       //   });

//       //   // Set Product Profile
//       //   payment.setProductInfo({
//       //     product_name: cartItems.map((i) => i.productName).join(', '),
//       //     product_category: 'Electronics',
//       //     product_profile: 'general',
//       //   });

//       // Initiate Payment and Get session key
//       payment.paymentInit().then(async (response) => {
//         // console.log(response);
//         res.send(response['GatewayPageURL']);
//         // paymentDone = response["status"] === "SUCCESS";

//         const newSuccess = new success({
//           _id: transactionId,
//           //   cartItems: cartItems.map((item) => {
//           //     return {
//           //       ...item,
//           //       productImage: process.env.CLIENT_URL + item.productImage,
//           //     };
//           //   }),
//           val_id,
//           card_type,
//           store_amount,
//           bank_tran_id,
//           status,
//           tran_date,
//           card_issuer,
//           card_brand,
//         });
//         const save = await newSuccess.save();
//       });
//     } catch (error) {
//       return res.status(400).json({ error });
//     }
//   }
// };

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

// exports.SSLCommerz_payment_fail = (req, res) => {
//   res.redirect(`${process.env.CLIENT_URL}/checkout/fail`);
// };

// exports.SSLCommerz_payment_cancel = (req, res) => {
//   res.redirect(`${process.env.CLIENT_URL}/checkout/cancel`);
// };
