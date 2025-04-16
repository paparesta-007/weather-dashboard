import React from 'react';

const WeatherMap = ({lat, lon}) => {
    const mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=7&level=surface&overlay=rain&menu=true&message=true&marker=true&calendar=now`;
    return (
        <div className="card p-0 h-full w-full my-2 card">
            <iframe
                title="Windy Map"
                width="100%"
                height="100%"
                src={mapUrl}
                className="rounded-lg"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default WeatherMap;
