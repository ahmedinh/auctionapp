import React, { createContext, useState } from 'react';

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1500);
    const [priceChangedFlag, setPriceChangedFlag] = useState(false);

    return (
        <PriceContext.Provider value={{ minValue, setMinValue, maxValue, setMaxValue, priceChangedFlag, setPriceChangedFlag }}>
            {children}
        </PriceContext.Provider>
    );
};