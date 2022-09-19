require('dotenv').config()

const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors');
const makeRequest = require('./utilities').makeRequest;

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/checkout", async (req, res) => {
  const amount = req.body.amount
  const currency = req.body.currency
  const requestedCurrency = req.body.requested_currency
  const country = req.body.country

  const bodyForCheckout = {
    country: country,
    currency: currency,
    requested_currency: requestedCurrency,
    amount: amount
  }

  const result = await makeRequest('POST', '/v1/checkout', bodyForCheckout);
  return res.json({'redirect_url': result.body.data.redirect_url})

})

app.post("/createWallet", async (req, res) => {
    const data = req.body;
  
    const result = await makeRequest('POST', '/v1/user', data);
    return res.json(result.body)
  
})

app.post("/sendMoney", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await makeRequest('POST', '/v1/account/transfer', data);
  return res.json(result.body)

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});