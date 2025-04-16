import './App.css';
import MainCard from "./components/MainCard.jsx";
import SearchBar from "./components/Search.jsx";
import DetailsCard from "./components/DetailsCard.jsx";
import {useEffect, useState} from "react";
import Loader from "./components/loader.jsx";
import {useDebounce} from 'use-debounce';
import SevenDaysWeather from "./components/SevenDaysWeather.jsx";
import UvCard from "./components/UvCard.jsx";
import OtherCities from "./components/OtherCities.jsx";
import WeatherMap from "./components/WeatherMap.jsx";

function App() {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchCity, setSearchCity] = useState();
    const [debouncedSearch] = useDebounce(searchCity, 500);
    const [locationStr, setLocationStr] = useState("latitude=45.07&longitude=7.69");
    const [locationCity, setLocation] = useState("Turin");
    const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);
    const [isLoadingOtherCities, setIsLoadingOtherCities] = useState(false);

    useEffect(() => {
        getWeather(locationStr).then(

        )
        getOtherWeather().then(

        )
    }, [locationStr]);

    useEffect(() => {
        if (debouncedSearch) {
            handleCitySearch(debouncedSearch);
        }
    }, [debouncedSearch]);

    const handleCitySearch = async (city) => {
        try {
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                alert("Something went wrong");
            }
            const data = await response.json();
            const {lat, lng} = data.results[0].geometry;
            setLocation(data.results[0].formatted);

            const newLocationStr = `latitude=${lat}&longitude=${lng}`;
            setLocationStr(newLocationStr);
            getWeather(newLocationStr);
        } catch (error) {
            console.error(error);
        }
    };

    const getOtherWeather = async () => {
        setIsLoadingOtherCities(true);
        try {
            const otherCities = ["London", "Paris", "New York", "Rome"];
            const weatherData = await Promise.all(
                otherCities.map(async (city) => {
                    try {
                        // Get coordinates first
                        const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`;
                        const geoResponse = await fetch(geoUrl);
                        if (!geoResponse.ok) alert("Geocoding failed");

                        const geoData = await geoResponse.json();
                        const {lat, lng} = geoData.results[0].geometry;

                        // Then get weather data
                        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,weather_code,temperature_2m_min&current=temperature_2m&timezone=auto`;
                        const weatherResponse = await fetch(weatherUrl);
                        if (!weatherResponse.ok) alert("Weather API failed");

                        const weatherData = await weatherResponse.json();

                        return {
                            city,
                            currentTemp: weatherData.current.temperature_2m,
                            maxTemp: weatherData.daily.temperature_2m_max[0],
                            minTemp: weatherData.daily.temperature_2m_min[0],
                            weatherCode: weatherData.daily.weather_code[0]
                        };
                    } catch (error) {
                        console.error(`Error fetching data for ${city}:`, error);
                        return {
                            city,
                            error: "Could not fetch data"
                        };
                    }
                })
            );
            setOtherCitiesWeather(weatherData);
        } catch (error) {
            console.error("Error in getOtherWeather:", error);
        } finally {
            setIsLoadingOtherCities(false);
        }
    };

    const getWeather = async (locationParams) => {
        setIsLoading(true);
        try {
            const url = `https://api.open-meteo.com/v1/forecast?${locationParams}&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max,weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,weather_code,apparent_temperature,wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation,rain,showers,snowfall,cloud_cover,surface_pressure,is_day&timezone=auto`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
       <div className="w-full my-4 flex align-middle justify-center items-center">
           <div className="h-full mx-4 lg:w-[60%] md:w-[80%] w-full overflow-auto">
               {/* Search Bar - Full width */}


               {isLoading ? (
                   <div className="flex justify-center items-center h-64">
                       <Loader/>
                   </div>
               ) : (
                   <div className="flex flex-col  ">
                       {/* Left Column - Stacked on mobile, 40% on desktop */}
                       <div className="w-full flex flex-col mb-2 gap-2">
                           <div className="w-full ">
                               <SearchBar setSearchCity={setSearchCity}/>
                           </div>
                           <MainCard weather={weather} locationCity={locationCity}/>
                           <DetailsCard weather={weather}/>
                       </div>

                       {/* Right Column - Stacked on mobile, 60% on desktop */}
                       <div className="w-full h-full mt-2 flex flex-col gap-2">
                           {/* Seven Days Weather - Full width */}
                           <div className="card p-4">
                               <SevenDaysWeather weather={weather}/>
                           </div>

                           {/* UV and Other Cities - Stacked on mobile, side by side on desktop */}
                           <div className="flex flex-col  md:flex-row gap-2">
                               <div className="w-full mb-4 ">
                                   <UvCard weather={weather}/>
                               </div>
                               <div className="w-full">
                                   <OtherCities
                                       citiesWeather={otherCitiesWeather}
                                       isLoading={isLoadingOtherCities}
                                   />
                               </div>
                           </div>

                           <div className="card p-4 h-[400px]">
                               <WeatherMap />
                           </div>
                       </div>
                   </div>
               )}
           </div>
       </div>
    );
}

export default App;