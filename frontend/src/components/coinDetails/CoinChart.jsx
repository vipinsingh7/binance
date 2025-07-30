import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';









export function CoinChart({ coinId = 'bitcoin' }) {
  const [data, setData] = useState([]);
  const [days,setDays] = useState(7)
  const [activeTab,setActiveTab] = useState("7D")
  useEffect(() => {
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)
      .then(res => res.json())
      .then(json => {
        const chartData = json.prices.map(([timestamp, price]) => ({
          time: days<7 ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :new Date(timestamp).toLocaleDateString('en-US', {  day: 'numeric' }),
          price: price,
        }));
        setData(chartData);
      });
  }, [coinId,days]);

  return (
    <div className="bg-[#2f323b] rounded-xl p-2">
      <div className="flex space-x-2 mb-2 overflow-x-auto">
          {['1D', '7D', '30D'].map((tab) => {
            const dayMap = { '1D': 1, '7D': 7, '30D': 30 };
            return(
            <button
              key={tab}
              onClick={() => {setActiveTab(tab);setDays(dayMap[tab])}}
              className={`pb-2 whitespace-nowrap font-sans cursor-pointer ${
                activeTab === tab ? 'border-b-4 border-yellow-400 text-yellow-400' : 'text-white'
              }`}
            >
              {tab}
            </button>)
})}
        </div>
      <h2 className="text-white font-semibold text-xl mb-2">{days}{days >1 ? '-Days':'-Day'} Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis domain={['auto', 'auto']} stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#facc15" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
