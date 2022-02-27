import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Coin from "./routes/Coin";
import './style.css';


function App(){

    const [coins, setCoins] = useState([]); 
    const [inputText, setInputText] = useState("");

    useEffect(() => {
      getCoinData(); 
    }, []);

    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    //create a new array by filtering the original array
    const filteredData = coins.filter((el) => {
      //if no input the return the original
      if (inputText === '') {
          return el;
      }
      //return the item which contains the user input
      else {
          return el.name.toLowerCase().includes(inputText)
      }
    })

    const getCoinData = () => {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
      .then((res) => {
        setCoins(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
    }
    

    return(
      <>
        <Navbar /> 
        <div className="coin-search">
          <input className="coin-input" type="text" value={inputText} onChange={inputHandler} />
        </div>
        <Routes>
        <Route path='/' element={<Coins coins={filteredData} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
        </Routes>

      </>
    )
  
}


export default App;