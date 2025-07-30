import { SignUp } from './components/auth/signup'
import './App.css'
import { Login } from './components/auth/login'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { CoinDetails } from './pages/CoinDetails';
import { Market } from './pages/Market';
import { Verify } from './components/auth/verify';
function App() {
  

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Market" element={<Markets />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
