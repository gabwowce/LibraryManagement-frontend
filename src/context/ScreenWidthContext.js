import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';

export const ScreenWidthContext = createContext();

export const ScreenWidthProvider = ({children})=>{
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    },[])

    return(
        <ScreenWidthContext.Provider value={{screenWidth }}>
            {children}
        </ScreenWidthContext.Provider>
    );
};

export const useScreenWidthContext = () => useContext(ScreenWidthContext);
export default ScreenWidthContext;