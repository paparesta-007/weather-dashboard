import React from 'react';

const OtherCities = () => {
    const cities = ['London', 'New York', 'Paris', 'Rome'];
    const weather = ['12°C', '13°C', '14°C', '15°C'];

    return (
        <div className="md:w-[60%] w-full ml-1 my-2 ">
            <h1 className="text-2xl card mb-1 rounded-md text-white">Other Cities</h1>
            <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-2  sm:grid-cols-1 gap-1 items-center">
                {
                    cities.map((city, index) => (
                        <div key={index} className="p-2 m-1 h-[150px] card">
                            <p className="text-white">{city}</p>
                            <p className="text-white">{weather[index]}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default OtherCities;
