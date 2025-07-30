import { useEffect, useState } from "react";
import { FaSearch, FaMoon, FaSun, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { SearchCard } from "./searchCard";
import logo from "../assets/logo.png";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 w-full bg-[#181a20] h-24 px-6 flex items-center justify-between z-50">
      <a href="/home">
        <img src={logo} alt="Logo" className="w-36 sm:w-40 mr-4 sm:mr-20" />
      </a>

      <nav className="hidden md:flex items-center space-x-6 mr-auto">
        {["Buy Crypto", "Markets", "Trade", "Derivatives"].map((item) => (
          <a
            key={item}
            href="/market"
            className="text-white hover:text-yellow-400 cursor-pointer whitespace-nowrap"
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        className="md:hidden text-white mr-4"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {menuOpen && (
        <nav className="absolute top-24 left-0 w-full bg-[#181a20] flex flex-col items-center space-y-4 py-4 md:hidden z-40">
          {["Buy Crypto", "Markets", "Trade", "Derivatives"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white hover:text-yellow-400 cursor-pointer text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}

      <div className="flex items-center space-x-4 relative">
        <button onClick={() => setShow(!show)} className="text-white hover:text-yellow-400">
          <FaSearch size={18} />
        </button>

        {/* Show Login/Signup if NOT logged in */}
        {!username && (
          <>
            <button
              onClick={() => window.location.href = "/login"}
              className="hidden sm:block bg-[#2f323b] rounded-md hover:bg-gray-700 px-4 py-2 text-white cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => window.location.href = "/signup"}
              className="hidden sm:block bg-yellow-400 rounded-md hover:bg-yellow-500 px-4 py-2 text-black cursor-pointer"
            >
              Sign Up
            </button>
          </>
        )}

        {/* Show username + dropdown if logged in */}
        {username && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-white hover:text-yellow-400 space-x-2 cursor-pointer"
            >
              <FaUserCircle size={20} />
              <span>{username}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#2a2e39] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button className="dark:hidden text-white hover:text-yellow-400">
          <FaMoon size={18} />
        </button>
        <button className="hidden dark:block text-white hover:text-yellow-400">
          <FaSun size={18} />
        </button>
      </div>

      <SearchCard setShow={setShow} show={show} />
    </header>
  );
}
