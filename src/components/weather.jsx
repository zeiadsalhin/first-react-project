import { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from './LottieAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, 
  faSpinner, 
  faCloud, 
  faSun, 
  faCloudRain, 
  faSnowflake, 
  faSmog, 
  faWind, 
  faTachometer, 
  faClock } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  useEffect(() => {
    document.title = 'First React Weather App by Alfa☘';
  }, []);
  
  // State variables
  const [city, setCity] = useState('');  // Default city
  const [weatherData, setWeatherData] = useState(null);  // To store weather data
  const [error, setError] = useState(null);  // To handle errors
  const [loading, setLoading] = useState(false);  // To show loading state

  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your API key

  // Fetch weather data based on the city
  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: apiKey,
          q: location || city,   // City or coordinates for which to get the weather
          aqi: 'yes', // Optional: Disable air quality data
        },
      });
      setWeatherData(response.data); // Set the data into state
    } catch (err) {
      console.log(err);
      setError('Failed to fetch weather data'); // Set error state
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);  // Set loading state to false after request completes with realism
    }
  };

  // Get user's city from IP address using ipapi
  const getCityFromIP = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const city = response.data.city;
      setCity(city);
      fetchWeatherData(city);
    } catch (err) {
      console.log(err);
      setError('Error getting city from Location');
    }
  };

  // Function to get the appropriate icon based on the weather condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <FontAwesomeIcon icon={faSun} />;
      case 'cloudy':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'rain':
      case 'rainy':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'snow':
      case 'snowy':
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 'fog':
      case 'smog':
        return <FontAwesomeIcon icon={faSmog} />;
      default:
        return <FontAwesomeIcon icon={faCloud} />;
    }
  };

  // Render
  return (
    <div className="weather-container transition-all duration-500 ease-in-out">
      {!weatherData && (
        <div>
          <Lottie/>
          <h1 className='my-8 font-semibold'>Weather App</h1>
        </div>
      )}
      {weatherData && (
        <div className='flex justify-center gap-4 p-5'>
        <div className='w-[5rem] my-auto'>
        <Lottie />
        </div>
        <h2 className='my-8 font-semibold text-2xl'>Weather App</h2>
        </div>
      )}
      
      {/* Input field to change city */}
      <div className="flex gap-2">
        <div className="flex w-full border-2 border-black bg-black rounded-lg overflow-hidden">
          <input
            className="w-full p-2 text-base focus:outline-none focus:ring-2a focus:ring-blue-400 focus:border-blue-600 bg-black placeholder-gray-500 transition duration-300"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button
            onClick={() => fetchWeatherData()}
            className="p-2"
          >
            Search
          </button>
        </div>
        <button
            onClick={getCityFromIP}
            className="p-2 bg-green-500 text-white hover:bg-green-600"
          >
            <FontAwesomeIcon size='xl' icon={faLocation} />
            </button>
      </div>

      <div className="WeatherData">
          
          {loading && <div className="loader flex justify-center min-h-[8rem]">
            <FontAwesomeIcon className='my-auto' size='xl' icon={faSpinner} spin />
            </div>}
          

          {error && city !== null && <div className="error flex justify-center min-h-[10rem]">
            <p className='my-auto text-lg font-semibold text-red-700/90'>{error}</p>
            </div>}

          {!loading && !error && weatherData && (
            <div className="Data min-h-[20rem]">
            <div className='my-10 text-lg'>
              <h2 className='font-semibold mb-2 text-left text-2xl'>{weatherData.location.name}, {weatherData.location.country}</h2>
              <p className='text-8xl'>{getWeatherIcon(weatherData.current.condition.text)}</p>
              <p className='text-5xl font-bold p-4'>{weatherData.current.condition.text}</p>
              <p className='text-4xl font-medium p-2'>{(weatherData.current.temp_c).toFixed()}<sup className='font-light text-2xl'>°C</sup></p>
              <div className="flex justify-center gap-5 mt-8 opacity-90">
              <p><FontAwesomeIcon icon={faSmog} /> {weatherData.current.humidity}%</p>
              <p><FontAwesomeIcon icon={faWind} /> {weatherData.current.wind_kph} kph</p>
              <p><FontAwesomeIcon icon={faTachometer} /> {weatherData.current.pressure_mb} mb</p>
              </div>
              <p className='p-3 opacity-80'> <FontAwesomeIcon icon={faClock} /> Last Update: {new Date(weatherData.current.last_updated).toLocaleTimeString()}</p>
            </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Weather;