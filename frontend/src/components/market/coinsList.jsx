import React, { useState, useEffect } from 'react';
import { AiOutlineInfoCircle } from "react-icons/ai";

export function CoinsList() {
  const [page, setPage] = useState(1);
  const [coins,setCoins] =useState([])
  const rowsPerPage = 10;

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${page}&sparkline=false`;
   const fetchByPage =async ()=>{
    const res = await fetch(url)
    if(!res.ok) throw Error(`error ${res.status}`);
    
    const data = await res.json()
    setCoins(data)
   }

fetchByPage()

  }, [page]);

  

const formatCompact = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
  return (
    <div className="p-6 bg-[#181a20] text-white min-h-screen mt-20 flex flex-col items-center overflow-x-auto">
      <table className="w-full md:w-10/12 text-left border-collapse rounded overflow-hidden">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700 bg-[#1f222a]">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Change</th>
            <th className="py-3 px-4">24h Volume</th>
            <th className="py-3 px-4">Market Cap Rank</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin,index)=>{
           return  (

               <tr onClick={()=>window.location.href=`/price/${coin.id}`} key={index} className="border-b border-gray-700 hover:bg-gray-800 transition duration-200">
            <td className="py-3 px-4 flex items-center space-x-2">
             <img src={coin.image} className='w-6' />
              <span className="font-bold text-orange-400 uppercase">{coin.symbol}</span>
              <span className="text-gray-400">{coin.name}</span>
            </td>
            <td className="py-3 px-4">${coin.current_price.toLocaleString()}</td>
            <td  className={`py-3 px-4 ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.price_change_percentage_24h>=0 ? '+' :''}{coin.price_change_percentage_24h?.toFixed(2)}%
             </td>
            <td className="py-3 px-4">{formatCompact(coin.total_volume)}</td>
            <td className="py-3 px-4">{coin.market_cap_rank}</td>
            <td className="py-3 px-4 flex gap-2 justify-center">
              <button className="hover:text-blue-400 transition"><AiOutlineInfoCircle className="text-gray-500 hover:text-white cursor-pointer" /></button>
            </td>
          </tr>
            )
          })}
         
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className={`px-3 py-1 ${page===1 ? '' : ' cursor-pointer'} bg-gray-700 text-white rounded disabled:opacity-40`}
        >
          Prev
        </button>
        <span className="text-sm text-gray-300 ">
          Page {page} 
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
