import logo from '../../assets/logo.png';
import { SocialButton } from '../Button';
import { FaGoogle, FaTelegramPlane, FaApple, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export function Login() {
  
const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  

   
    const payload = Object.fromEntries(formData.entries());
    console.log(payload);
    
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || 'login failed.');
      return;
    }
const result = await res.json();   
console.log(result);
localStorage.setItem('token',result.access_token)
localStorage.setItem('id',result.id)
localStorage.setItem('username',result.username)

    window.location.href='/home'
  } catch (error) {
    console.error('login failed:', error);
    alert('Something went wrong. Please try again later.');
  }
}
  return (
    <div id="login" className="bg-[#181a20] min-h-screen flex flex-col items-center justify-center p-4">
      <div className="rounded-xl bg-[#181a20] border-2 border-[#2f323b] w-full max-w-sm p-6">
        <div className="flex flex-col items-center space-y-6">
          <img src={logo} alt="logo" className="w-1/2" />
          <h1 className="font-bold text-2xl text-white text-center">Log in</h1>

          <form onSubmit={onSubmit} className="w-full">
            <div className="relative w-full">
              <label
                htmlFor="email"
                className="text-white text-sm absolute top-[-12px] left-2 bg-[#181a20] px-1"
              >
                Email / Phone number
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full mt-3 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Email / phone (without country code)"
              />
            </div>   
            
            <div className="relative w-full top-5">
              <label
                htmlFor="password"
                className="text-white text-sm absolute top-[-12px] left-2 bg-[#181a20] px-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full mt-3 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className=" bg-yellow-400 hover:bg-yellow-500 cursor-pointer rounded-md w-full h-10 mt-8"
            >
              Login
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <SocialButton label="Continue with Passkey" icon={<FaKey />} />
            <SocialButton label="Continue with Gmail" icon={<FaGoogle />} />
            <SocialButton label="Continue with Apple" icon={<FaApple />} />
            <SocialButton label="Continue with Telegram" icon={<FaTelegramPlane />} />
          </form>

         
        </div>
      </div>
       <div className="mt-4">
            <Link to="/signup" className="text-yellow-300 hover:text-yellow-400">
              Create a Binance account
            </Link>
          </div>
    </div>
  );
}
