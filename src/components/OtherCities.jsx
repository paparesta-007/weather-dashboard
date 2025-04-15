import React, {useEffect, useState} from 'react';
import Loader from "./loader.jsx";
import weatherCodeToIcon from "../assets/weatherCode.js";

const OtherCities = ({citiesWeather}) => {
    const [weathers, setWeathers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setWeathers(citiesWeather);
        setIsLoading(false);
    }, [citiesWeather]);

    useEffect(() => {
        console.log(weathers);
    }, [weathers]);

    return (
        <div className="md:w-[60%] w-full my-2">
            <h1 className="text-2xl card  mb-1 sm:ml-2 px-4 py-2 rounded-md text-white">Other Cities</h1>
            <div className="grid grid-cols-1 ml-2 mt-4 md:grid-cols-2 sm:grid-cols-2 justify-evenly items-center gap-4">
                {isLoading ? (
                    <Loader />
                ) : (
                    weathers.map((weather, index) => (
                        <div key={index} className="card p-4 flex items-center justify-between rounded-md">
                            <div>
                                <h2 className="text-white text-2xl">{weather.city}</h2>
                                <hr className="mt-1" />
                                <p className="text-white">{weather.currentTemp}°C</p>
                                <p className="text-gray-400">Max: {weather.maxTemp}°C</p>
                                <p className="text-gray-400">Min: {weather.minTemp}°C</p>
                            </div>
                            <div>
                                <img
                                    src={`https://raw.githubusercontent.com/Makin-Things/weather-icons/main/static/${weatherCodeToIcon[weather.weatherCode]}.svg`}
                                    alt={weather.city}
                                    className="w-24"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default OtherCities;
