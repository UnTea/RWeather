import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Состояние для хранения погоды в Москве
  const [weather, setWeather] = useState(null);

  // Функция для получения погоды с API
  const getWeather = async () => {
    try {
      // Запрос к API с ключом и координатами Москвы
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=fb880c44125d405f697fb530203e6303&query=Moscow`
      );
      // Обновление состояния с данными о погоде
      setWeather(response.data);
    } catch (error) {
      // Обработка ошибок
      console.error(error);
    }
  };

  // Эффект для вызова функции получения погоды при первом рендеринге
  useEffect(() => {
    getWeather();
  }, []);

  // Обработчик события нажатия на клавишу
  const handleKeyPress = (event) => {
    // Если нажата клавиша Enter
    if (event.key === "Enter") {
      // Вызов функции получения погоды
      getWeather();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Кнопка для получения погоды */}
        <button onClick={getWeather} className="App-button">
          Получить погоду в Москве
        </button>
        {/* Инструкция для пользователя */}
        <p>Или нажмите клавишу Enter...</p>
        {/* Контейнер для отображения погоды */}
        <div className="App-weather">
        {weather && (
          <>
            <p>Температура в Москве:</p>
            {/* Отображение температуры */}
            <p>Температура: {weather.current.temperature} °C</p>
            {/* Отображение ощущаемой температуры */}
            <p>Ощущается как: {weather.current.feelslike} °C</p>
            {/* Отображение давления */}
            <p>Давление: {weather.current.pressure} hPa</p>
            {/* Отображение влажности */}
            <p>Влажность: {weather.current.humidity} %</p>
            {/* Отображение скорости ветра */}
            <p>Скорость ветра: {weather.current.wind_speed} м/с</p>
            {/* Отображение направления ветра */}
            <p>Направление ветра: {weather.current.wind_dir} °</p>
            {/* Отображение облачности */}
            <p>Облачность: {weather.current.cloudcover} %</p>
          </>
        )}
        {!weather && <p>Загрузка...</p>}
        </div>
      </header>
      {/* Добавление обработчика события нажатия на клавишу к документу */}
      <script>{document.addEventListener("keypress", handleKeyPress)}</script>
    </div>
  );
}

export default App;