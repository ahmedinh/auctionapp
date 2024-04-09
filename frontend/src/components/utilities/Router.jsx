import AboutUs from '../pages/static/AboutUs';
import Terms from '../pages/static/Terms';
import Privacy from '../pages/static/Privacy';
import Home from '../pages/HomePage/Home';
import Layout from './Layout';
import NewArrivals from '../pages/HomePage/Products/NewArrivals';
import LastChance from '../pages/HomePage/Products/LastChance';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Product from '../pages/ProductOverview/Product';
import CategoryProducts from '../pages/BasicSearch/CategoryProducts';
import BasicSearch from '../pages/BasicSearch/BasicSearch';
import Thresholdsearch from '../pages/BasicSearch/ThresholdSearch';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="/home/new-arrivals" />} />
            <Route path="home" element={<Home />}>
                <Route index element={<Navigate replace to="/home/new-arrivals" />} />
                <Route path="new-arrivals" element={<NewArrivals />} />
                <Route path="last-chance" element={<LastChance />} />
            </Route>
            <Route path="home">
                <Route path="categories/:categoryId" element={<CategoryProducts />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="terms-and-conditions" element={<Terms />} />
                <Route path="privacy-and-policy" element={<Privacy />} />
                <Route path="search" element={<BasicSearch />} />
                <Route path="search-advanced" element={<Thresholdsearch/>}/>
            </Route>
            <Route path="shop">
                <Route path="product/:productId" element={<Product />} />
            </Route>
        </Route>
    )
);
export default Router;