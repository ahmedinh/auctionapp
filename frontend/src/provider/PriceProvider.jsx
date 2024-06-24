import React, { createContext, useEffect, useState } from 'react';
import { useMinMaxPrices } from '../hooks/minMaxPrices';

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
    const minMaxPrices = useMinMaxPrices();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);
    
    const [priceChangedFlag, setPriceChangedFlag] = useState(false);

    useEffect(() => {
        if (minMaxPrices.data) {
            setMinValue(minMaxPrices.data.min_price);
            setMaxValue(minMaxPrices.data.max_price);
        }
    }, [minMaxPrices.data]);

    return (
        <PriceContext.Provider value={{ minValue, setMinValue, maxValue, setMaxValue, priceChangedFlag, setPriceChangedFlag, fullMinPrice: minMaxPrices.data?.min_price, fullMaxPrice: minMaxPrices.data?.max_price }}>
            {children}
        </PriceContext.Provider>
    );
};