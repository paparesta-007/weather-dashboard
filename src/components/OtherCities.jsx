import React, { useEffect, useState } from 'react';
import Loader from "./loader.jsx";

const OtherCities = ({ citiesWeather }) => {
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
        <div className="md:w-[60%] w-full ml-1 my-2">
            <h1 className="text-2xl card mb-1 rounded-md text-white">Other Cities</h1>
            <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-2 sm:grid-cols-1 gap-1 items-center">
                {isLoading ? (
                    <Loader />
                ) : (
                    weathers.map((weather, index) => (
                        <div key={index} className="card rounded-md">
                            <h2 className="text-white">{weather.city}</h2>
                            <p className="text-white">{weather.currentTemp}</p>
                            <p className="text-white">{weather.maxTemp}</p>
                            <p className="text-white">{weather.minTemp}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OtherCities;
