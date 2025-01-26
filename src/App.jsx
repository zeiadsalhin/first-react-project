import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

// Importing the pages
import Home from './components/Home';
import About from './components/About';
import Weather from './components/weather';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  // You can add more items here
];

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
        {/* Routes for pages */}
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/about" element={<About />} />
        </Routes>
      <div>
        {/* Navigation links */}
        <nav className='mt-20'>
          <div className='flex justify-center list-none'>
            {navItems.map((item, index)=>(
              <li key={index} className='px-4a'>
                <NavLink  to={item.path} className={({ isActive }) =>
                isActive ? 'hidden' : 'text-gray-700'
              }>
                {item.name}
                </NavLink >
              </li>
            ))}

          </div>
        </nav>


      </div>
    </Router>
  )
}

export default App
