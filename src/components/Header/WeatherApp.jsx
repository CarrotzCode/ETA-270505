import { useEffect, useState } from "react"
import { DigitalClock } from "./Clock";
import './WeatherApp.css'
import searchIcon from "../../assets/search.png";

import sunny from '../../assets/weatherpngs/sunny.png'
import snowy from '../../assets/weatherpngs/snow.png'
import rainy from '../../assets/weatherpngs/rain.png'
import cloudy from '../../assets/weatherpngs/partly cloudy.png'

import { Loading } from "../LoadingInterface";


export function WeatherApp() {
  const apikey = "4036009f4f88f6c39884cc30ee0ad2d5";
  const [icon, setIcon] = useState(sunny);
  const [data, setData] = useState(null);
  const [city, setCity] = useState("")
  const [inputCity, setInputCity] = useState("");
  const [measurment, setMeasurment] = useState(() => {
    return localStorage.getItem("measurment") === "true";
  });

  async function getCityName() {
    try {
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();

      return data.city || "Unknown";

    } catch {
      return Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone
        .split("/")
        .pop()
        .replaceAll("_", " ");
    }
  }

  async function getWeatherData(city) {
    const apiurl =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

    const response = await fetch(apiurl);

    return await response.json();
  }

  useEffect(() => {
    async function load() {

      const result = await getCityName();

      setCity(result);

      const weather = await getWeatherData(result);

      setData(weather);
    }

    load();

  }, []);

  function get_img(data) {
    switch (data.weather[0].main) {
      case "Clear":
        return sunny;

      case "Snow":
        return snowy;

      case "Clouds":
        return cloudy;

      case "Rain":
      case "Drizzle":
      case "Thunderstorm":
        return rainy;

      default:
        return sunny;
    }
  }

  function searchCity() {
    setCity(inputCity);
  }

  useEffect(() => {
    if (!city) return;

    async function loadWeather() {
      const weather = await getWeatherData(city);
      setData(weather);
    }

    loadWeather();
  }, [city]);

  if (!data) {
    return (
      <div className="button">
        <Loading />
      </div>);
  }

  function toggleConverter() {
    const newMode = !measurment;

    setMeasurment(newMode);
    localStorage.setItem("measurment", newMode);
  }

  const measurmentCheck = {
    temperature: () => Math.round(measurment ? data.main.temp : (((data.main.temp) * 9 / 5) + 32)),
    wind: () => Math.round(measurment ? data.wind.speed : (data.wind.speed) / 1.6),
    kmm: () => measurment ? "km/h" : "mph"
  };



  return (
    <>
      <div className='weather button'>
        <img className="icon" onClick={() => window.open("https://www.w3schools.com", "_blank")} src={get_img(data)} />
        <div className='Clock'>
          <DigitalClock />
        </div>
        <div className='searchBar'>
          <input
            type="text"
            placeholder="Enter City Name"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchCity()}>
          </input>
          <button onClick={searchCity} className="search"><img src={searchIcon} /></button>
          <div className="cityName">{city}</div>
          <p className='temperature' >{measurmentCheck.temperature()}</p>
          <button className="measurment" onClick={toggleConverter}>
            {measurment ? "°C" : "°F"}
          </button>
        </div>
        <div className='details'>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind : {measurmentCheck.wind()}{measurmentCheck.kmm()} </p>
        </div>

      </div>
    </>
  )
}