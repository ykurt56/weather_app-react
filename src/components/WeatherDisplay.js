import React, { useState } from "react";
import { useWeather } from "../context/Weather";

const WeatherDisplay = () => {
  const {
    location,
    cities,
    weatherData,
    handleLocationChange,
    getWeatherIconUrl,
  } = useWeather();

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!weatherData) {
    return <div>Beklenen veri yükleniyor...</div>;
  }

  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  const weatherDescriptions = {
    "clear sky": "Açık Hava",
    "few clouds": "Az Bulutlu",
    "scattered clouds": "Parçalı Bulutlu",
    "broken clouds": "Kırık Bulutlu",
    "shower rain": "Sağanak Yağışlı",
    rain: "Yağmurlu",
    "light rain": "Hafif Yağmurlu",
    "moderate rain": "Orta Şiddetli Yağmurlu",
    "heavy intensity rain": "Kuvvetli Yağmurlu",
    "light snow": "Hafif Karlı",
    "moderate snow": "Orta Şiddetli Karlı",
    "heavy intensity snow": "Kuvvetli Karlı",
    thunderstorm: "Gök Gürültülü Fırtına",
    snow: "Karlı",
    mist: "Sisli",
  };

  const darkModeClass = darkMode ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`main ${darkModeClass}`}>
      <div className="container">
        <div className="box p-4">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="lightBox">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 d-flex align-items-center">
                    <h2 className="text-center">
                      {weatherData.city.name} Hava Durumu
                    </h2>
                  </div>
                  <div className="col-lg-6 col-sm-12 text-center pt-4 pb-3">
                    <label htmlFor="sehir" className="me-3">
                      Şehir seçiniz:
                    </label>
                    <select
                      id="sehir"
                      className="p-1 m-2 form-select"
                      value={location}
                      onChange={handleLocationChange}
                    >
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="lightBox mt-4">
                <div className="row mx-auto d-flex align-items-center">
                  <div className="col-lg-4 col-sm-4 text-center">
                    <h4>Bugün</h4>
                    <img
                      className="img-fluid"
                      src={getWeatherIconUrl(
                        weatherData.list[0].weather[0].icon
                      )}
                      alt={weatherData.list[0].weather[0].description}
                      width={250}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <h1 className="fw-bold text-center">
                      Sıcaklık: <br /> {weatherData.list[0].main.temp}°C
                    </h1>
                    <p>
                      Hava Durumu:{" "}
                      {
                        weatherDescriptions[
                          weatherData.list[0].weather[0].description
                        ]
                      }
                    </p>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <h1 className="fw-bold text-center">
                      Rüzgar: <br />{" "}
                      {Math.round(weatherData.list[0].wind.speed * 3.6)} km/s
                    </h1>
                    <p>Yön: {weatherData.list[0].wind.deg}°</p>
                  </div>
                </div>
              </div>
              <div className="lightBox mt-4">
                <div className="row mx-auto d-flex align-items-center">
                  <h4 className="fw-bold">Saatlik Hava Durumu</h4>
                  {weatherData.list.slice(0, 8).map((item, index) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-3"
                      key={index}
                    >
                      <h5 className="fw-bold">
                        {new Date(item.dt * 1000).toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h5>
                      <img
                        src={getWeatherIconUrl(item.weather[0].icon)}
                        alt={item.weather[0].description}
                        className="img-fluid"
                      />
                      <p className="mb-0 mt-2">Sıcaklık: {item.main.temp}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="lightBox p-4">
                <h3 className="color1 text-uppercase fs-5 fw-bold text-center">
                  5 Günlük Hava Tahmini
                </h3>
                {weatherData.list.slice(1, 6).map((item, index) => (
                  <div className="p-3" key={index}>
                    <h4>{days[(new Date().getDay() + index + 1) % 7]}</h4>
                    <img
                      src={getWeatherIconUrl(item.weather[0].icon)}
                      alt={item.weather[0].description}
                    />
                    <p>Sıcaklık: {item.main.temp}°C</p>
                    <p>
                      Genel Hava Durumu:{" "}
                      {weatherDescriptions[item.weather[0].description]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`btn btn-primary position-fixed top-0 end-0 m-3 ${
              darkMode ? "btn-light" : "btn-dark"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
