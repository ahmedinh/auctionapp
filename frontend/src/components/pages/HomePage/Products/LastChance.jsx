import React from 'react';
import './Products.scss';
import { getLastChance } from '../../../../api/productsApi';
import { Products } from './Products';

const LastChance = () => {
    return (
        <>
            <Products fetchFunction={getLastChance} queryKeyPrefix="lastChance" />
        </>
    );
};
export default LastChance;