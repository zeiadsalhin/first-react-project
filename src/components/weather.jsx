import { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from './LottieAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faSpinner, faSmog, faWind, faTachometer, faClock } from '@fortawesome/free-solid-svg-icons';
import { weatherCodes } from './weatherCodes'; // Import the weatherCodes object to identify weather icons

const Weather = () => {
  useEffect(() => {
    document.title = 'First React Weather App by Alfa☘';
  }, []);
  
  // State variables
  const [city, setCity] = useState('');  // Default city
  const [weatherData, setWeatherData] = useState(null);  // To store weather data
  const [forecastData, setForecastData] = useState(null);  // To store forecast data
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
      fetchForecastData(response.data.location.name); // call the forecast get function with location name
    } catch (err) {
      console.log(err);
      setError('Failed to fetch weather data'); // Set error state
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);  // Set loading state to false after request completes with realism
    }
  };

  // Fetch forecast data based on the city
  const fetchForecastData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: apiKey,
          q: city,   // City or coordinates for which to get the weather
          days: 14, // set forecast days
          aqi: 'yes', // Optional: Disable air quality data
        },
      });
      setForecastData(response.data.forecast.forecastday); // Set the forecast data into state      
    } catch (err) {
      console.log(err);
      setError('Failed to fetch forecast data'); // Set error state
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);  // Set loading state to false after request completes with realism
    }
  };

  // Get user's city from gps and IP address using ipapi
  const getCityFromIP = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const city = response.data.city;
      setCity(city);
      fetchWeatherData(city);
    } catch (err) {
      console.log(err);
      setError('Failed to get city from IP address');
    }
  };

  // Function to get the appropriate icon and text based on the weather condition code
  const getWeatherIcon = (code) => {
    if (weatherCodes.clear.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/clear.svg" className='mx-auto w-[6rem] mt-8' alt="Clear" />
        </div>
      );
    } else if (weatherCodes.clouds.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/clouds.svg" className='mx-auto w-[6rem] mt-8' alt="Cloudy" />
        </div>
      );
    } else if (weatherCodes.mist.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/mist.svg" className='mx-auto w-[6rem] mt-8' alt="Mist" />
        </div>
      );
    } else if (weatherCodes.rain.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/rain.svg" className='mx-auto w-[6rem] mt-8' alt="Rain" />
        </div>
      );
    } else if (weatherCodes.moderate_heavy_rain.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/moderate_heavy_rain.svg" className='mx-auto w-[6rem] mt-8' alt="Moderate Heavy Rain" />
        </div>
      );
    } else if (weatherCodes.snow.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/snow.svg" className='mx-auto w-[6rem] mt-8' alt="Snow" />
        </div>
      );
    } else if (weatherCodes.thunder.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/thunder.svg" className='mx-auto w-[6rem] mt-8' alt="Thunder" />
        </div>
      );
    } else if (weatherCodes.thunder_rain.includes(code)) {
      return (
        <div className="text-center">
          <img src="/icons/thunder_rain.svg" className='mx-auto w-[6rem] mt-8' alt="Thunder Rain" />
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <img src="/icons/clear.svg" className='mx-auto w-[6rem] mt-8' alt="Clear" />
        </div>
      );
    }
  };
  
  // Render
  return (
    <div className="weather-container transition-all duration-500 ease-in-out p-4 min-w-screen lg:min-w-[40vw]">
      {/* {!weatherData && loading && (
        <div>
          <Lottie/>
          <h1 className='my-8 font-semibold'>Weather App</h1>
        </div>
      )} */}
      {/* {weatherData && ( */}
        <div className={`${weatherData ? 'flex' : undefined } justify-center gap-4`}>
        <div className={`${weatherData? 'w-[5rem]' : 'w-[10rem] mx-auto'} my-auto`}>
        <Lottie />
        </div>
        <h2 className='my-5 font-semibold text-2xl'>Weather App</h2>
        </div>
       {/* )} */}
      
      {/* Input field to change city */}
      <div className="flex gap-2">
        <div id='inputMain' className="flex w-full border-2 border-black bg-black rounded-lg overflow-hidden">
          <input
            className="w-full p-2 text-base focus:outline-none bg-black placeholder-gray-500 transition duration-300"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
            <button
            id='search'
            onClick={() => city ? fetchWeatherData() : undefined}
            className="p-2 bg-blue-500 text-whitea hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>
        <button
          id='gps'
          onClick={getCityFromIP}
          className="p-2 bg-green-500 text-white hover:bg-green-600 transition duration-300 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faLocation} />
        </button>
      </div>

      <div className="WeatherData">
          
          {loading && <div className="loader flex justify-center min-h-[60vh]">
            <FontAwesomeIcon className='my-auto' size='xl' icon={faSpinner} spin />
            </div>}
          
          {error && !loading && city !== null && <div className="error flex justify-center min-h-[10rem]">
            <p className='my-auto text-lg font-semibold text-red-700/90'>{error}</p>
            </div>}

          {!loading && !error && weatherData && (
            <div className="Data min-h-[20rem]">
            <div className='my-10 text-lg'>
              <h2 className='font-semibold mb-2 text-left text-2xl'>{weatherData.location.name}, {weatherData.location.country}</h2>
              <div className='text-2xl'>{getWeatherIcon(weatherData.current.condition.code)}</div>
              <p className='text-3xl font-bold p-4'>{weatherData.current.condition.text}</p>
              <p className='text-3xl font-medium p-2'>{(weatherData.current.temp_c).toFixed()}<sup>°C</sup></p>
              <div className="flex justify-center gap-5 mt-2 opacity-90">
              <p><FontAwesomeIcon icon={faSmog} style={{ color: 'darkgray' }} /> {weatherData.current.humidity}%</p>
              <p><FontAwesomeIcon icon={faWind} style={{ color: 'lightblue' }} /> {weatherData.current.wind_kph} kph</p>
              <p><FontAwesomeIcon icon={faTachometer} style={{ color: 'orange' }} /> {weatherData.current.pressure_mb} mb</p>
              </div>
              <p className='p-3 text-sm opacity-80'> <FontAwesomeIcon icon={faClock} style={{ color: 'gray' }} /> Last Update: {new Date(weatherData.current.last_updated).toLocaleString()}</p>
            </div>
            
            <div className='forecast -mt-10'>
              <h2 className='font-semibold mb-8 text-left text-2xl'>Forecast</h2>
              <div className='flex flex-wrap justify-center gap-2'>
                {forecastData.map((day) => (
                  <div key={day.date} className='forecast-day p-3 space-y-1 border rounded-lg max-w-[7.5rem] md:min-w-[7.5rem]'>
                    <p className='font-semibold'>{new Date(day.date).toLocaleDateString()}</p>
                    <div className='w-[3rem] mx-auto -mt-4 mb-2'>{getWeatherIcon(day.day.condition.code)}</div>
                    <p>{day.day.condition.text}</p>
                    <p className='opacity-80'>Max: {(day.day.maxtemp_c).toFixed()}<sup>°C</sup></p>
                    <p className='opacity-80'>Min: {(day.day.mintemp_c).toFixed()}<sup>°C</sup></p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Weather;