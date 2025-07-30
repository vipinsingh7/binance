import logo from '../../assets/logo.png';
import { SocialButton } from '../Button';
import { FaGoogle, FaTelegramPlane, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function SignUp() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = Object.fromEntries(formData.entries());
console.log(payload);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("✅ Backend response:", result);
        alert("🎉 Account created! Please login.");
      } else {
        console.warn("⚠️ Registration failed:", res.status);
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("❌ Fetch failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#181a20] min-h-screen flex flex-col items-center justify-center">
      <div className="rounded-xl bg-[#181a20] border-2 border-[#2f323b] w-11/12 md:w-1/3 lg:w-1/4 p-6 mb-4">
        <div className="flex flex-col items-center space-y-6">
          <img src={logo} alt="logo" className="w-1/2 mr-auto" />
          <h1 className="font-bold text-2xl text-white text-center">Welcome to Binance</h1>

          <form className="w-full" onSubmit={onSubmit}>
            <div className="relative w-full mb-4">
              <label htmlFor="email" className="text-white text-sm absolute top-[-12px] left-2 bg-[#181a20] px-1">
                Email / Phone number
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email / phone"
                required
                className="w-full mt-3 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="relative w-full mb-4">
              <label htmlFor="username" className="text-white text-sm absolute top-[-12px] left-2 bg-[#181a20] px-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="name"
                placeholder="Username"
                required
                className="w-full mt-3 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
              className="w-full mb-4 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              minLength={6}
              className="w-full mb-4 p-3 rounded-md bg-[#181a20] border-2 border-[#2f323b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <div className="flex items-center mb-4">
              <input type="checkbox" id="check" name="check" className="mr-2" required />
              <label htmlFor="check" className="text-white text-sm">
                I agree to Binance's Terms of Service.
              </label>
            </div>

            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 rounded-md w-full h-10">
              Create Account
            </button>
          </form>

          <div className="flex items-center my-6 w-full">
            <div className="flex-grow border-t border-gray-600" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-600" />
          </div>

          <SocialButton label="Continue with Gmail" icon={<FaGoogle />} />
          <SocialButton label="Continue with Apple" icon={<FaApple />} />
          <SocialButton label="Continue with Telegram" icon={<FaTelegramPlane />} />
        </div>
      </div>

      <div className="mt-4 flex justify-center mb-10">
        <Link to="/login" className="text-yellow-300 hover:text-yellow-400">
          Login to your account
        </Link>
      </div>
    </div>
  );
}
