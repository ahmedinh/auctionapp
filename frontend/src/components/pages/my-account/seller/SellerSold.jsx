import React from "react";
import SellerTable from "./SellerTable";
import { getSoldUserProducts } from "../../../../api/productsApi";

export default function SellerSold() {
    return <SellerTable fetchProducts={getSoldUserProducts} queryString="sold-products-user" />;
}