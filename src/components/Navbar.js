import React from 'react';
import {FaCoins} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../style/navbar.css';

function Navbar() {
  return (
    <>
        <Link to="/">
          <div>
              <div className='navbar'>
                  <FaCoins className='icon' />
                  <h1> coin<span className='purple'>Search</span></h1>
              </div>
          </div>
        </Link>
    </>
  )
}

export default Navbar