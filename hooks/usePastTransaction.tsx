import { Moralis } from 'moralis'
import { useEffect, useState } from 'react'

export const usePastTransaction = (
  user: Moralis.User<Moralis.Attributes> | null,
) => {
  const [results, setResults] = useState<Moralis.Object<Moralis.Attributes>[]>()
  const query = new Moralis.Query('EthTransactions')
  query.equalTo('from_address', user?.get('ethAddress'))

  function fetchNow() {
    query.find().then((results) => {
      setResults(results)
    })
  }

  useEffect(() => {
    if (user) {
      fetchNow()

      query.subscribe().then((subscription) => {
        subscription.on('create', function (data) {
          console.log('new transaction: ', data)
        })
      })
    }
  }, [user])

  return results
}
