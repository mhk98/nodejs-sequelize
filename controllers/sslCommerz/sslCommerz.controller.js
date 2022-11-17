const db = require('../../models');
const express = require('express');
const { async } = require('rxjs');
const Recharge = db.recharge;
const shortid = require('shortid');
const SSLCommerzPayment = require('sslcommerz-lts');

const demoFunc = async (amount, TranId) => {
  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: TranId,
    success_url: `http://localhost:4000/api/v1/ssl-payment-success?transactionId=${TranId}`,
    fail_url: `http://localhost:4000/api/v1/ssl-payment-fail?transactionId=${TranId}`,
    cancel_url: `http://localhost:4000/api/v1/ssl-payment-cancel?transactionId=${TranId}`,
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
    ipn_url: `http://localhost:4000/api/v1/ssl-payment-notification?transactionId=${TranId}`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false,
  ); //true for live default false for sandbox
  const result = await sslcommerz.init(data);
  if (result?.GatewayPageURL) {
    return { TranId, GatewayPageURL: result.GatewayPageURL };
  } else {
    return false;
  }
};

module.exports.sslrequestInsert = async (req, res) => {
  const { amount } = req.body;
  const TranId = `${shortid.generate()}`;
  const ddd = await demoFunc(amount, TranId);
  console.log(req.body);
  // save information to database
  // rechargeStatus: Pending

  res.json(ddd.GatewayPageURL);
};

module.exports.sslpaymentsuccessInsert = async (req, res) => {
  const { transactionId } = req.query;
  const body = req.body;
  if (body.status === 'VALID') {
    // uodate  // reacharge_status: Pending => Complete
  }
  res.redirect(`http://localhost:3000/success/${transactionId}`);
};

module.exports.findOne = async (req, res) => {
  const { transactionId } = req.body;
  console.log(transactionId);
  // //   // search info in db
  // //   "status": Complete
  // //   if  ====>
};

module.exports.sslpaymentnotifiactionInsert = async (req, res) => {
  return res.status(200).json({
    data: req.body,
    message: 'Payment notification',
  });
};
module.exports.sslpaymentfailInsert = async (req, res) => {
  let status = 'fail';
  intimidiate_process(req.body, status);
  return res.status(200).json({
    data: req.body,
    message: 'Payment failed',
  });
};

module.exports.sslpaymentcancelInsert = async (req, res) => {
  /**
   * If payment cancelled
   */
  let status = 'cancel';
  intimidiate_process(req.body, status);

  return res.status(200).json({
    data: req.body,
    message: 'Payment cancelled',
  });
};

// async function Create(Recharge, where, newItem) {
//   // First try to find the record

//   const id = req.body;
//   const foundItem = await model.findOne({
//     where: {
//       id: id,
//     },
//   });
//   if (!foundItem) {
//     // Item not found, create a new one
//     const item = await Recharge.create({});
//     return { item, created: true };
//   }
//   // Found an item, update it
//   const item = await model.update(newItem, { where });
//   return { item, created: false };
// }
