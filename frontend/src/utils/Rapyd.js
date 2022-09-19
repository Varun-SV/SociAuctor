async function createPayment(amount, country, currency, requestedCurrency){
console.log('This is called');
    const result = 
    await fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          amount: amount,
          country: country,
          currency: currency,
          requested_currency: requestedCurrency
        }
      )
    })
  const resultJSON = await result.json()
  return resultJSON;
}

export default createPayment;