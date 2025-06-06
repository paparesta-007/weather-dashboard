import React from 'react';

const Footer = () => {
    return (
        <div className="card mt-4 p-4 text-center flex items-center justify-between">
            <span></span>
            <span className="text-white text-sm block mt-1">© 2025 - All rights reserved</span>
            <div onClick={()=>{window.open("https://github.com/paparesta-007")}} className="cursor-pointer text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-github-icon lucide-github">
                    <path
                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
            </div>
        </div>
    );
};

export default Footer;
