import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import '../style/singleCoin.css';

function Coin() {
  const [singleCoin, setSingleCoin] = useState({});
  const params = useParams();

  useEffect(() => {
    getCoin();
  },[]);
  
  const getCoin = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${params.coinId}`)
    .then((res) => {
      console.log(res.data);
      setSingleCoin(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <div>
        <div className='coin-container'>
          <div className='content'>
            <h1>{singleCoin.name}</h1>
          </div>
          <div className='content'>
            <div className='rank'>
                <span className='rank-btn'>Rank # {singleCoin.market_cap_rank}</span>
            </div>
            <div className='info'>
                <div className='coin-heading'>
                    {singleCoin.image ? <img src={singleCoin.image.small} alt='' /> : null}
                    <p>{singleCoin.name}</p>
                    {singleCoin.symbol ? <p>{singleCoin.symbol.toUpperCase()}/USD</p> : null}               
                </div>
                <div className='coin-price'>
                  {singleCoin.market_data?.current_price ? <h1>${singleCoin.market_data.current_price.usd.toLocaleString()}</h1> : null}
                </div>
            </div>
          </div>

          <div className='content'>
            <table>
              <thead>
                  <tr>
                      <th>1h</th>
                      <th>24h</th>
                      <th>7d</th>
                      <th>14d</th>
                      <th>30d</th>
                      <th>1yr</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>{singleCoin.market_data?.price_change_percentage_1h_in_currency ? <p>{singleCoin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                      <td>{singleCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{singleCoin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                      <td>{singleCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{singleCoin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                      <td>{singleCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{singleCoin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                      <td>{singleCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{singleCoin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                      <td>{singleCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{singleCoin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>
                  </tr>
              </tbody>
            </table>
          </div>

          <div className='content'>
            <div className='stats'>
                <div className='left'>
                    <div className='row'>
                        <h4>24 Hour Low</h4>
                        {singleCoin.market_data?.low_24h ? <p>${singleCoin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                    </div>
                    <div className='row'>
                        <h4>24 Hour High</h4>
                        {singleCoin.market_data?.high_24h ? <p>${singleCoin.market_data.high_24h.usd.toLocaleString()}</p> : null}                            </div>

                </div>
                <div className='right'>
                    <div className='row'>
                        <h4>Market Cap</h4>
                        {singleCoin.market_data?.market_cap ? <p>${singleCoin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                    </div>
                    <div className='row'>
                        <h4>Circulating Supply</h4>
                        {singleCoin.market_data ? <p>{singleCoin.market_data.circulating_supply}</p> : null}
                    </div>

                </div>
            </div>
          </div>

          <div className='content'>
              <div className='about'>
                  <h3>About</h3>
                  <p dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(singleCoin.description ? singleCoin.description.en : ''),
                    }}>
                  </p> 

              </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Coin