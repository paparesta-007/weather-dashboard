import './App.css';
import MainCard from "./components/MainCard.jsx";
import SearchBar from "./components/Search.jsx";
import DetailsCard from "./components/DetailsCard.jsx";
import {useEffect, useState} from "react";
import Loader from "./components/loader.jsx";
import { useDebounce } from 'use-debounce';
import SevenDaysWeather from "./components/SevenDaysWeather.jsx";
import UvCard from "./components/UvCard.jsx";
function App() {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchCity, setSearchCity] = useState();
    const [debouncedSearch] = useDebounce(searchCity, 500);
    const [locationStr, setLocationStr] = useState("latitude=45.07&longitude=7.69");
    const [locationCity, setLocation] = useState("Turin");
    useEffect(() => {
        getWeather(locationStr);
    }, []);
    useEffect(() => {
        console.log(locationCity)
    }, [locationCity]);
    useEffect(() => {
        if (debouncedSearch) {
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${debouncedSearch}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`;

            async function getLocation() {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error("Something went wrong");
                    }
                    const data = await response.json();
                    console.log(data)
                    const {lat, lng} = data.results[0].geometry;
                    setLocation(data.results[0].formatted)


                    const newLocationStr = `latitude=${lat}&longitude=${lng}`;
                    setLocationStr(newLocationStr); // Update the state
                    return newLocationStr; // Return the new location string
                } catch (error) {
                    console.error(error);
                    return locationStr; // Return current location if error
                }
            }

            async function fetchData() {
                const newLocation = await getLocation();
                getWeather(newLocation);
            }

            fetchData();
        }
    }, [debouncedSearch]);

    const getWeather = async (locationParams) => {
        setIsLoading(true);
        try {
            const url = `https://api.open-meteo.com/v1/forecast?${locationParams}&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max,weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,weather_code,apparent_temperature,wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation,rain,showers,snowfall,cloud_cover,surface_pressure,is_day&timezone=Europe%2FBerlin`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            console.log(data)
            setWeather(data);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-wrap border">
            <div className="px-2 md:w-[40%] w-full">
                <SearchBar setSearchCity={setSearchCity} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <MainCard weather={weather} locationCity={locationCity} />
                        <DetailsCard weather={weather} />
                    </>
                )}
            </div>
            <div className="px-2 mt-2 md:w-[60%] w-full">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <SevenDaysWeather weather={weather} />
                        <UvCard weather={weather}/>
                    </>
            )}

            </div>
        </div>
    );

}

export default App;