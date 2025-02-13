import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useLocation } from 'react-router-dom';

// Importing the pages
import Error404 from './components/Error404';
import About from './components/About';
import Weather from './components/weather';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  // You can add more items here
];

function App() {
  const location = useLocation();

  return (
    <>
      {/* Routes for pages */}
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/about" element={<About />} />
        <Route path="/Error404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/Error404" />} />
      </Routes>
      <div>
        {/* Navigation links */}
        {location.pathname !== '/Error404' && (
          <nav className="my-5">
            <div className="flex justify-center list-none">
              {navItems.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'hidden' : 'text-gray-700'
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </div>
          </nav>
        )}
      </div>
    </>
  );
}

export default App
