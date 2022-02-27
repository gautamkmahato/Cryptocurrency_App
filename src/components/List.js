import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coins from './Coins';

function List() {

    const [coins, setCoins] = useState([]);
    const[search, setSearch] = useState("");

    useEffect(() => {
        getCoinData(); 
      }, [])
    
      const getCoinData = () => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then((res) => {
          setCoins(res.data);
          //console.log(res.data)
        })
        .catch((error) => {
          console.log("There is some error");
        })
      }

      const handleChange = (e) => {
        setSearch(e.target.value)
      }
      const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );

      console.log(filteredCoins)
      console.log(search)

      return (
          <>
              <div className='coin-app'>
                  <div className='coin-search'>
                    <h1 className='coin-text'>Search a currency</h1>
                      <div>
                          <form>
                              <input type="text" value={search} onChange={handleChange} className='coin-input' />
                          </form>
                      </div>
                  </div>
                  {filteredCoins.map((coin) => (
                    <Coins key={coin.id}
                      name={coin.name}
                      image={coin.image}
                      symbol={coin.symbol}
                      price={coin.current_price}
                      market_cap= {coin.market_cap}
                      price_change_24h = {coin.price_change_24h}
                      total_volume={coin.total_volume}
                    />
                  ))}
              </div>
          </>
      )
}

export default List