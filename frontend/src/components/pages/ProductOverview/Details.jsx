import React, { useContext } from "react";

export default function ProductDetails ({ description }) {
    return (
        <div>
            <p className="description">{description}</p>
        </div>
    );
}