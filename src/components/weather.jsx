import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  // State variables
  const [city, setCity] = useState('');  // Default city
  const [weatherData, setWeatherData] = useState(null);  // To store weather data
  const [error, setError] = useState(null);  // To handle errors
  const [loading, setLoading] = useState(false);  // To show loading state

  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your API key

  // Fetch weather data based on the city
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: apiKey,
          q: city,   // City for which to get the weather
          aqi: 'yes', // Optional: Disable air quality data
        },
      });
      setWeatherData(response.data); // Set the data into state
    } catch (err) {
      setError('Failed to fetch weather data'); // Set error state
    } finally {
      setLoading(false);  // Set loading state to false after request completes
    }
  };

  // Fetch data when the component mounts or the city changes
//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

  // Render
  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      
      {/* Input field to change city */}
      <div className="flex flex-col gap-4">
  <div className="w-full">
    <input
      className="w-full p-4 text-lg border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 bg-white shadow-lg placeholder-gray-500 transition duration-300"
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city"
    />
  </div>

  <div className="w-full">
    <button
      onClick={fetchWeatherData}
      className="w-1/2 mx-auto p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Get Weather
    </button>
  </div>
</div>


      {loading && <p>Loading...</p>}

      {error && city!=null && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>{weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
          <p>AirQuality: {weatherData.current.aqi} kph</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
