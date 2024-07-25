import styles from "../Components/Weather.module.css";
import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_Key = "58415bfe526d482ca1d80858242705";
  const fetchWeatherApi = async () => {
    setLoading(true);
    setWeather(null);
    try {
      const Response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${city}`
      );
      const Result = await Response.json();
      console.log("result", Result);
      setWeather(Result);
    } catch (e) {
      console.log("fetch weather App", e.message);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button onClick={fetchWeatherApi}>Search</button>

      {loading && <p>loading data...</p>}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <p onChange={(e) => setWeather(e.target.value)}>
              <h4>Tempature</h4>
              {weather.current.temp_c}°C
            </p>
          </div>
          <div className="weather-card">
            <p>Humidity {weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition {weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed {weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
