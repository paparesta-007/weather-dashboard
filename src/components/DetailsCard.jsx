import React from 'react';
import { Eye, MapPin, WindArrowDown } from "lucide-react";
import { Gauge, Thermometer, Wind, Droplets, SunMedium, Moon } from "lucide-react";

const MainCard = ({ weather }) => {

    // Estrai i valori correnti direttamente dal JSON
    const apparentTemp = weather.current.apparent_temperature;
    const humidity = weather.current.relative_humidity_2m;
    const windSpeed = weather.current.wind_speed_10m;
    const windDirection = weather.current.wind_direction_10m;
    const pressure = weather.current.surface_pressure;

    // Dati giornalieri
    const sunriseTime = weather.daily.sunrise[0].slice(11, 16);
    const sunsetTime = weather.daily.sunset[0].slice(11, 16);

    return (
        <div className="w-full p-6  h-auto rounded-lg bg-gradient-to-br card shadow-lg">
            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                    <div className="border border-color   p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-blue-100 mb-2">
                            <Thermometer className="mr-2" />
                            <span className="font-medium">Apparent Temperature</span>
                        </div>
                        <p className="text-white text-2xl font-bold">{apparentTemp} {weather.current_units.apparent_temperature}</p>
                    </div>

                    <div className="border border-color    p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-blue-100 mb-2">
                            <Droplets className="mr-2" />
                            <span className="font-medium">Humidity</span>
                        </div>
                        <p className="text-white text-2xl font-bold">{humidity} {weather.current_units.relative_humidity_2m}</p>
                    </div>

                    <div className="border border-color   p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-blue-100 mb-2">
                            <Wind className="mr-2" />
                            <span className="font-medium">Wind Speed</span>
                        </div>
                        <p className="text-white text-2xl font-bold">{windSpeed} {weather.current_units.wind_speed_10m}</p>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    <div className="border border-color    p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-blue-100 mb-2">
                            <WindArrowDown className="mr-2" />
                            <span className="font-medium">Wind Direction</span>
                        </div>
                        <p className="text-white text-2xl font-bold">{windDirection}°</p>
                    </div>

                    <div className="border border-color    p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-blue-100 mb-2">
                            <SunMedium className="mr-2" />
                            <span className="font-medium">Sunrise</span>
                        </div>
                        <p className="text-white text-2xl font-bold">{sunriseTime}</p>
                    </div>

                    <div className="border border-color    p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-blue-100 mb-2">
                            <Moon className="mr-2" />
                            <span className="font-medium">Sunset</span>
                        </div>
                        <p className="text-white text-2xl font-bold">{sunsetTime}</p>
                    </div>
                </div>
            </div>

            {/* Bottom row - full width */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 mt-6">
                <div className="border border-color    p-2 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center text-blue-100 mb-2">
                        <Gauge className="mr-2" />
                        <span className="font-medium">Pressure</span>
                    </div>
                    <p className="text-white text-2xl font-bold">{pressure} {weather.current_units.surface_pressure}</p>
                </div>

                <div className="border border-color    p-2 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center text-blue-100 mb-2">
                        <Eye className="mr-2" />
                        <span className="font-medium">UV index</span>
                    </div>
                    <p className="text-white text-2xl font-bold"> {weather.daily.uv_index_max[0]}</p>
                </div>
            </div>
        </div>
    );
};

export default MainCard;
