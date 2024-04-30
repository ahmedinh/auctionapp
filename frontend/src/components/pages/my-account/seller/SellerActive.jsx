import React from "react";
import SellerTable from "./SellerTable";
import { getActiveUserProducts } from "../../../../api/productsApi";

export default function SellerActive() {
    return <SellerTable fetchProducts={getActiveUserProducts} queryString="active-products-user"/>;
}