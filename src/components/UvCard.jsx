import React, {useEffect, useState} from 'react';
import Loader from "./loader.jsx";
import {CircleHelp} from "lucide-react";
import { Tooltip as ReactTooltip } from 'react-tooltip'
const UvCard = ({weather}) => {
    const [uvData, setUvData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (weather && weather.daily && weather.daily.uv_index_max) {
            // Prendi i primi 7 giorni e limita la visualizzazione a un massimo di 20 per evitare barre troppo alte
            const normalizedData = weather.daily.uv_index_max.slice(0, 7).map(val => Math.min(val, 20));
            setUvData(normalizedData);
            setLoading(false);
        }
    }, [weather]);

    const getUvColor = (value) => {
        if (value <= 2) return '#A3C86D'; // Verde - basso
        if (value <= 5) return '#FFD700'; // Giallo - moderato
        if (value <= 7) return '#FFA500'; // Arancione - alto
        if (value <= 10) return '#FF4500'; // Rosso - molto alto
        return '#8B00FF'; // Viola - estremo
    };

    const getDayName = (index) => {
        const days = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
        return days[index];
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="card flex flex-col my-2 gap-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg flex justify-between font-semibold text-white">
                <span>UV Index (Next 7 days)</span>
                <CircleHelp data-tip="React-tooltip" className="cursor-pointer"
                            onClick={() => window.open("https://www.epa.gov/enviro/uv-index-description")}/>
            </h2>
            <ReactTooltip data-tooltip-id="ciao" place="top" type="dark" effect="solid" id="my-tooltip"/>
            <hr/>
            <div className="flex flex-col items-start gap-2  h-auto w-full">
                {uvData.map((value, index) => {

                    return (
                        <div className="flex w-full" key={index}>
                            <span
                                className="mr-2 text-gray-400 ">{value.toFixed(2)}</span>
                            <div key={index} className=" h-6 rounded-lg"
                                 style={{width: `${(value) * 10}%`, backgroundColor: getUvColor(value)}}></div>

                        </div>

                    )
                })}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                <span>&nbsp;&nbsp;</span>
                <span>Low (0-2)</span>
                <span>Medium (3-5)</span>
                <span>High (6-7)</span>
                <span>Very High (8-10)</span>
                <span>Extreme (11+)</span>

            </div>
        </div>
    );
};

export default UvCard;