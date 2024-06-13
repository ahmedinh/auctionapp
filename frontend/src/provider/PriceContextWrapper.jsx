import React from 'react';
import { PriceProvider } from './PriceProvider';
import { Outlet } from 'react-router-dom';

const PriceContextWrapper = () => {
    return (
        <PriceProvider>
            <Outlet />
        </PriceProvider>
    );
};
export default PriceContextWrapper;