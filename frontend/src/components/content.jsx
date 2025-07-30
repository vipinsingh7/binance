import {  useEffect } from "react";
import { useState } from "react";

export function Content() {


  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('popular');
  const [order,setOrder]=useState('desc')
  const [page,setPage]=useState(1)
  
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_${order}&per_page=5&page=${page}&sparkline=false`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setCoins(data))
      .catch(err => setError(err.message));
  }, [order,page]);


  return (<div id="content" className="min-h-screen bg-[#181a20] flex items-center justify-center px-4 md:px-10 mt-20 ">
  <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 items-start mt-20">
    <div className="w-full lg:w-2/3 px-2 md:px-5">
      <p className="text-white font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
        <span className="text-yellow-400">200,000,000</span>
        <br /> USERS <br /> TRUST US
      </p>

      <div className="flex flex-col sm:flex-row mt-4 gap-3">
        <input
          type="text"
          className="w-full sm:w-2/3 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Email / phone number"
        />
        <button className="w-full sm:w-1/3 bg-yellow-400 hover:bg-yellow-500 rounded-md font-medium text-black p-3">
          Sign up
        </button>
      </div>
    </div>

    <div className="w-full lg:w-1/3 flex flex-col gap-6">
      <div className="bg-[#2f323b] rounded-2xl p-5 text-white">
        <div className="flex space-x-6 mb-2 overflow-x-auto">
          {['popular', 'new'].map((tab) =>(
            <button
              key={tab}
              onClick={() => {setActiveTab(tab);   
                 if (tab==='new') {setOrder('asc');setPage(100)} 
                 if (tab==='popular') {setOrder('desc');setPage(1)}}}
              className={`pb-2 whitespace-nowrap font-semibold cursor-pointer hover:text-gray-300 ${
                activeTab === tab ? 'border-b-4 border-yellow-400' : 'text-white'
              }`}
            >
              {tab === 'popular' ? 'Popular' : tab === 'new' ? 'New Listing' : 'Top Coins'}
            </button>
          ))}
        </div>

        <ul className="space-y-1">
          {coins.map((coin, index) => (
            <li key={index} className="flex items-center hover:bg-[#373b47] text-sm sm:text-base cursor-pointer py-4 px-1 rounded-md" onClick={()=>window.location.href=`/price/${coin.id}`}>
              <img src={coin.image} alt={coin.name} className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
              <span className="font-semibold">{coin.symbol.toUpperCase()}</span>
              <span className="ml-2 text-gray-300">{coin.name}</span>
              <span className="ml-4 text-yellow-400">${coin.current_price.toLocaleString()}</span>
              <span
                className={`ml-auto font-semibold ${
                  coin.market_cap_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {coin.market_cap_change_percentage_24h?.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#2f323b] rounded-2xl p-5 text-white">
        <h2 className="text-xl font-bold mb-3">Latest News</h2>
        <ul className="space-y-2 text-sm sm:text-base">
          <li>📈 Bitcoin hits new all-time high.</li>
          <li>📰 Ethereum upgrade coming soon.</li>
          <li>🔐 Binance enhances security features.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

  );
}
