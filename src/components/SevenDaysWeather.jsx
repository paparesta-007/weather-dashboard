import React, { useEffect, useState } from 'react';
import Loader from "./loader.jsx";

// Mappa dei codici meteo alle icone
const weatherCodeToIcon = {
    0: "clear-day",
    1: "cloudy-1-day",
    2: "cloudy-2-day",
    3: "cloudy-3-day",
    45: "fog-day",
    48: "fog",
    51: "rainy-1-day",
    53: "rainy-2-day",
    55: "rainy-3-day",
    56: "frost-day",
    57: "frost-night",
    61: "rainy-1-day",
    63: "rainy-2-day",
    65: "rainy-3-day",
    66: "frost-day",
    67: "frost-night",
    71: "snowy-1-day",
    73: "snowy-2-day",
    75: "snowy-3-day",
    77: "snowy-1",
    80: "rainy-1",
    81: "rainy-2",
    82: "rainy-3",
    85: "snowy-2",
    86: "snowy-3",
    95: "thunderstorms",
    96: "severe-thunderstorm",
    99: "severe-thunderstorm"
};

const SeveDaysWeather = ({ weather }) => {
    const [days, setDays] = useState([]);
    const [weatherCodes, setWeatherCodes] = useState([]); // Corretto il nome dello stato
    const [maxTemp, setMaxTemp] = useState([]);
    const [minTemp, setMinTemp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (weather) {
            setDays(weather.daily.time);
            setWeatherCodes(weather.daily.weather_code); // Aggiunto il codice meteo
            setMaxTemp(weather.daily.temperature_2m_max);
            setMinTemp(weather.daily.temperature_2m_min);
            setIsLoading(false);
        }
    }, [weather]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="card flex flex-wrap  items-center justify-evenly gap-5">
            {days.map((day, index) => {
                // Ottieni il codice meteo per il giorno corrente
                const weatherCode = weatherCodes[index];
                const icon = weatherCodeToIcon[weatherCode];  // Ottieni l'icona corretta
                const dayOfWeek = new Date(day).toLocaleString('en-US', { weekday: 'long' });
                const dayTime= new Date(day).toLocaleString('en-US', { day: 'numeric' });
                return (
                        <div key={index} className="day-card select-none p-2 rounded-lg">
                            <h1 className="font-bold text-white text-xl">{index == 0 ? "Today" : index == 1 ? "Tomorrow" : `${dayOfWeek} ${dayTime}`}</h1>
                            {/* Aggiungi l'icona basata sul codice meteo */}
                            <img
                                src={`src/assets/animatedIcons/${icon}.svg`}
                                alt={`Weather icon for ${icon}`}
                                className="weather-icon m-2 w-24"
                            />
                            <p className="text-gray-400">Max : {maxTemp[index]}°C</p>
                            <p className="text-gray-400">Min : {minTemp[index]}°C</p>
                        </div>
                );
            })}
        </div>
    );
};

export default SeveDaysWeather;
