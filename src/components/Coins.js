import React from 'react';
import CoinItem from './CoinItem';
import '../style/coin.css';
import { Link } from 'react-router-dom';
import Coin from '../routes/Coin';

function Coins({coins}){
    return (
      <>
        <div className='container'>
          <div>
            <div className='heading'>
              <p>#</p>
              <p className='coin-name'>Coin</p>
              <p>Price</p>
              <p>24h</p>
              <p className='hide-mobile'>Volume</p>
              <p className='hide-mobile'>Mkt Cap</p>
            </div>

            {coins.map(coin => {
              return (
                  <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
                      <CoinItem coins={coin} />
                  </Link>
              )
            })}

          </div>
        </div>
      </>
    );
  };

export default Coins