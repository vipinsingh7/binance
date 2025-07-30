export function Footer() {
  return (
   <>
  <div className="flex flex-col justify-center items-center bg-[#1e2329] h-52">
  <h1 className="text-white font-bold text-3xl mb-4">Start earning today</h1>
  <button className="bg-yellow-400 hover:bg-yellow-500 w-40 h-10 rounded-md font-medium text-black cursor-pointer">
    Sign up Now
  </button>
</div>

   <footer className="bg-[#181a20] text-white px-10 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

        {/* Community */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-3">Community</h3>
          <ul className="space-y-2 text-sm">
            <li>Community</li>
            <li>English</li>
            <li>EUR-€</li>
            <li>Theme</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-3">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Announcements</li>
            <li>News</li>
            <li>Press</li>
            <li>Legal</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Building Trust</li>
            <li>Blog</li>
            <li>Community</li>
            <li>Risk Warning</li>
            <li>Notices</li>
          </ul>
        </div>

        {/* Downloads */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-3">Downloads</h3>
          <ul className="space-y-2 text-sm">
            <li>Desktop Application</li>
          </ul>

          <h3 className="font-bold text-yellow-400 mt-6 mb-3">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>Exchange</li>
            <li>Buy Crypto</li>
            <li>Pay</li>
            <li>Academy</li>
            <li>Live</li>
            <li>Tax</li>
            <li>Gift Card</li>
            <li>Launchpool</li>
            <li>Auto-Invest</li>
            <li>ETH Staking</li>
            <li>NFT</li>
            <li>BABT</li>
            <li>Research</li>
            <li>Charity</li>
          </ul>
        </div>

        {/* Business */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-3">Business</h3>
          <ul className="space-y-2 text-sm">
            <li>P2P Merchant Application</li>
            <li>P2Pro Merchant Application</li>
            <li>Listing Application</li>
            <li>Institutional & VIP Services</li>
            <li>Labs</li>
            <li>Binance Connect</li>
          </ul>

          <h3 className="font-bold text-yellow-400 mt-6 mb-3">Learn</h3>
          <ul className="space-y-2 text-sm">
            <li>Learn & Earn</li>
            <li>Browse Crypto Prices</li>
            <li>Bitcoin Price</li>
            <li>Ethereum Price</li>
            <li>Browse Crypto Price Predictions</li>
            <li>Bitcoin Price Prediction</li>
            <li>Ethereum Price Prediction</li>
            <li>Ethereum Upgrade (Pectra)</li>
          </ul>
        </div>

        {/* Services & Support */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-3">Buy</h3>
          <ul className="space-y-2 text-sm">
            <li>Buy Bitcoin</li>
            <li>Buy BNB</li>
            <li>Buy XRP</li>
            <li>Buy Dogecoin</li>
            <li>Buy Ethereum</li>
            <li>Buy Tradable Altcoins</li>
          </ul>

          <h3 className="font-bold text-yellow-400 mt-6 mb-3">Service & Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Affiliate</li>
            <li>Referral</li>
            <li>BNB</li>
            <li>OTC Trading</li>
            <li>Historical Market Data</li>
            <li>Trading Insight</li>
            <li>Proof of Reserves</li>
            <li>24/7 Chat Support</li>
            <li>Support Center</li>
            <li>Product Feedback & Suggestions</li>
            <li>Fees</li>
            <li>APIs</li>
            <li>Binance Verify</li>
            <li>Trading Rules</li>
            <li>Binance Airdrop Portal</li>
            <li>Law Enforcement Req</li>
          </ul>
        </div>

      </div>

      {/* Optional bottom line */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Amine ben selem Binance Clone. All rights reserved.
      </div>
    </footer>
   </> 
  );
}
