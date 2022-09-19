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

async function createWallet(firstName, lastName, email, type, uid){
      const result = 
      await fetch('http://localhost:3001/createWallet', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            first_name: firstName,
            last_name: lastName,
            type: type,
            ewallet_reference_id: uid,
            contact: {
              first_name: firstName,
              last_name: lastName,
              email: email,
              contact_type: 'personal'
            }
          }
        )
      })
    const resultJSON = await result.json()
    return resultJSON;
}

export {createPayment, createWallet};