

import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { CoinChart } from "./CoinChart";
export function Section(){
     const { name } = useParams();
       const [details,setDetails] =useState([])
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchDetails = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}`);
      if (!res.ok) throw new Error(`error ${res.status}`);
      const data = await res.json();
      
      setDetails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchDetails();
}, [name]);

const formatCompact = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);

return(

<div className="flex flex-col items-center bg-[#181a20] min-h-screen p-6 text-white mt-24">
  <div className="flex flex-col items-center space-y-2">
    <img
      src={details.image?.large}
      alt={`${details.name} Logo`}
      className="w-24 h-24"
    />
    <h1 className="text-4xl font-bold">{details.name}</h1>
    <p className="text-xl text-gray-400 uppercase">{details.symbol}</p>
  </div>

  
<div className="mt-10 w-full max-w-4xl min-h-[300px] bg-[#2f323b] rounded-lg p-4">
  <CoinChart coinId={name} />
</div>
  

  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
    <div className="bg-[#2f323b] p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Current Price</h2>
      <p className="text-2xl">{formatCompact(details.market_data?.current_price?.usd)}</p>
    </div>

    <div className="bg-[#2f323b] p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Market Cap</h2>
      <p className="text-2xl">{formatCompact(details.market_data?.market_cap?.usd)}</p>
    </div>

    <div className="bg-[#2f323b] p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">24h Volume</h2>
      <p className="text-2xl">{formatCompact(details.market_data?.total_volume?.usd)}</p>
    </div>
  </div>
<div className="flex-col justify-center items-center w-1/2">

    <h1 className="mr-auto text-yellow-400 text-2xl font-bold py-5">What is {details.name} ({details.symbol?.toUpperCase()})?
</h1>
    <p className="text-white break-words"> {details.description?.en}</p>
</div>
</div>

)

}