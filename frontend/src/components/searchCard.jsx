import { useState, useEffect } from "react";

export function SearchCard({ show, setShow }) {
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setCoins(data))
      .catch(err => setError(err.message));
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`;
      const res = await fetch(url);
      const data = await res.json();
      setCoins(data);
      return;
    }

    const url = `https://api.coingecko.com/api/v3/search?query=${value}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setCoins(data.coins))
      .catch(err => setError(err.message));
  };

  if (!show) return null;

  return (
    <div className="absolute top-16 md:right-[16.6%] md:w-[400px] bg-[#0f1115] text-white p-4 rounded-2xl shadow-xl z-50 border border-yellow-400">
      <div className="flex items-center bg-[#181a20] border border-yellow-400 rounded px-3 py-2 mb-4">
        <span className="text-yellow-400 mr-2">🔍</span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
          value={query}
          onChange={handleChange}
        />
        <button
          onClick={() => setShow(false)}
          className="text-yellow-400 ml-3 text-sm hover:underline"
        >
          Cancel
        </button>
      </div>

      <div>
        <h3 className="text-sm text-gray-400 mb-2">
          {query ? 'Search Results' : 'Hot Trading'}
        </h3>
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {coins.map((coin, index) => (
            <li  key={coin.id || coin.coin_id} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img src={coin.image || coin.thumb} alt={coin.name} className="w-5 h-5 rounded-full" />
              <a href={`/price/${coin.id}`}> <span className="font-semibold">{(coin.symbol || '').toUpperCase()}</span>
                <span className="text-sm text-gray-400">/USDT</span></a> 
              </div>
              <div className="text-right">
                {coin.current_price ? (
                  <>
                    <p className="font-semibold">${coin.current_price}</p>
                    <p
                      className={`text-sm ${
                        coin.price_change_percentage_24h < 0
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </>
                ) : (
                 <></>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
