import React from "react";
import "./Products.scss";
import { getNewArrivals } from "../../../../api/productsApi";
import { Products } from "./Products";

const NewArrivals = () => {
    return (
        <>
            <Products fetchFunction={getNewArrivals} queryKeyPrefix="newArrivals" />
        </>
    );
};
export default NewArrivals;