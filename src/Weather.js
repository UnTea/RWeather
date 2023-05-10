import React, { useState } from 'react';

const API_KEY = 'YOUR_API_KEY_HERE';

function App() {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    setWeather(data);
  }

  return (
    <div>
      <button onClick={getWeather}>Получить погоду в Москве</button>
      {weather && (
        <div>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Ощущается как: {weather.main.feels_like}°C</p>
          <p>Влажность: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;