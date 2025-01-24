import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

// Importing the pages
import Home from './components/Home';
import About from './components/About';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  // You can add more items here
];

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav >
          <ul className='flex justify-around list-none'>

            {navItems.map((item, index)=>(
              <li key={index} className='px-4'>
                <NavLink  to={item.path} className={({ isActive }) =>
                isActive ? 'opacity-90' : 'text-gray-700'
              }>
                {item.name}
                </NavLink >
              </li>
            ))}

          </ul>
        </nav>

        {/* Routes for pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
