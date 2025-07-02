import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY } from './config';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [unit, setUnit] = useState('C');

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
      );
      const data = res.data;
      setWeatherData((prev) => ({ ...prev, [city]: data }));
      if (!cities.includes(city)) setCities([...cities, city]);
    } catch (err) {
      alert('City not found or API error.');
      console.error(err);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Weather Dashboard</h1>

      <div className="text-center mb-3">
        <button className="btn btn-info" onClick={toggleUnit}>
          Switch to °{unit === 'C' ? 'F' : 'C'}
        </button>
      </div>

      <div className="mb-4">
        <SearchBar onSearch={fetchWeather} />
      </div>

      <div className="row">
        {cities.map((city) => (
          <div key={city} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title text-center text-secondary">{city}</h5>
                <WeatherCard data={weatherData[city]} unit={unit} />
                <hr />
                <Forecast forecast={weatherData[city]?.forecast} unit={unit} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
