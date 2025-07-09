
const paypal = require('paypal-rest-sdk')


paypal.configure({
    mode : 'sandbox',
    client_id : 'AUgndcKSlid1teEu7f48fTUcnFzJhPAp0aB-ZkvC008IOU7JnXIv8H2b8ilzlxWxk4xw1Fp-IYG-sb33',
    client_secret: 'EIXPa7WoOEs4Hx1b96Rn7zrMAj8ApHEu_6A9aHBOjsVmY7gLezIPGUd4aq4jgWDVualRBTQxdWWvWSgj'
});

module.exports = paypal;