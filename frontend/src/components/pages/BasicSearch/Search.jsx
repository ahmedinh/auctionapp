import React, { useState, useEffect } from "react";
import "./Search.scss";
import { getProductsForCategory } from "../../../api/productsApi";
import { useCategoryProducts } from "../../../hooks/useCategoryProducts";
import { useParams } from "react-router-dom";
import ProductCard from "../HomePage/Products/ProductCard";
import { useCategoriesWithSubCategories } from "../../../hooks/useCategoriesWithSubCategories";


export default function Search() {
    const { categoryId } = useParams();
    const [selected, setSelected] = useState();
    const size = 9;

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useCategoryProducts(getProductsForCategory, "categoryProducts", size, categoryId);

    const {
        status: categoriesStatus,
        data: categoriesData,
        error: categoriesError,
    } = useCategoriesWithSubCategories();

    useEffect(() => {
        if (categoriesData) {
            const index = categoriesData.findIndex(item => item.id.toString() === categoryId);
            if (index !== -1) {
                setSelected(index);
            }
        }
    }, [categoriesData, categoryId]);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }

        setSelected(i);
    }

    return (
        <div className="search-page">
            <div className="all-filters">
                <div className="product-categories">
                    <p className="product-categories headline">PRODUCT CATEGORIES</p>
                    {categoriesData?.map((item, i) => (
                        <div className="item">
                            <div className="title" onClick={() => toggle(i)}>
                                <p>{item.name}</p>
                                <span>{selected === i ? '-' : '+'}</span>
                            </div>
                            <div
                                className={selected === i ? 'subcategories-show' : 'subcategories'}>
                                {item.subCategoryProjectionList.map((item2, i) => (
                                    <div className="subitem">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <p className="subcategory">{item2.name} ({item2.noOfProducts})</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="products-part">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'error' && <p>Error: {error.message}</p>}
                <div className="products-gridview">
                    {data?.pages.map((page, i) => (
                        <React.Fragment key={i}>
                            {page.content.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                {hasNextPage && (
                    <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading...' : 'Explore More'}
                    </button>
                )}
            </div>
        </div>
    );
}