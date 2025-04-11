import React from 'react';
import {Search} from "lucide-react";

const SearchBar = ({ setSearchCity}) => {
    const handleInputChange = (event) => {
        setSearchCity(event.target.value);
    };
    return (
        <div className="flex searchBar my-2  items-center text-white p-2 w-full">
            <Search className="text-white"/>
            <input placeholder="Search" className="w-full ml-2 bg-transparent outline-none"
                   onChange={handleInputChange}></input>
        </div>
    );
};

export default SearchBar;
