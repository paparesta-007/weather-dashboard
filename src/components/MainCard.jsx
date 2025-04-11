import React from 'react';
import { MapPin } from "lucide-react";
import weatherCodeToIcon from "../assets/weatherCode.js";
// Mappa codice del tempo a icona e descrizione

const weatherCodeToDescription = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
};

const MainCard = ({ weather, locationCity }) => {

    // Prendere l'icona in base al codice del tempo
    const iconName = weatherCodeToIcon[weather.current.weather_code] || "clear-day"; // default icon
    const iconUrl = `https://raw.githubusercontent.com/Makin-Things/weather-icons/main/animated/${iconName}.svg`;
    const oggi = new Date();
    const giornoSettimana = oggi.toLocaleString('en-US', { weekday: 'long' });
    const weatherDescription = weatherCodeToDescription[weather.current.weather_code] || "Unknown";
    // 12 april
    const now= new Date();
    const month=now.toLocaleString('en-US', { month: 'long' });
    const day=now.getDate();
    return (
        <div className="w-[100%] my-2 p-4 rounded-md card">
            <div className="flex items-center justify-start">
                <div className="flex items-center bg-gray-600/50 rounded-full px-4 py-2 backdrop-blur-sm">
                    <MapPin className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white text-lg font-medium">{locationCity}</span>
                </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:grid md:grid-cols-2 md:gap-4">
                <div className="flex flex-col text-center md:items-start md:text-left w-full">
                    <h1 className="text-white text-3xl">{giornoSettimana}</h1>
                    <p className="text-gray-400 text-[16px]">{month} {day}</p>
                    <h1 className="text-white text-[60px] mt-4">{weather.current.temperature_2m}°C</h1>
                    <p className="text-gray-400 text-[16px]">
                        Max {weather.daily.temperature_2m_max[0]}°C - Min {weather.daily.temperature_2m_min[0]}°C
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                    <img
                        src={`https://raw.githubusercontent.com/Makin-Things/weather-icons/main/animated/${iconName}.svg`}
                        className="w-40 md:w-48 aspect-auto"
                        alt={weatherDescription}
                    />
                    <h1 className="text-white text-2xl">{weatherDescription}</h1>
                </div>
            </div>
        </div>
    );
};

export default MainCard;
