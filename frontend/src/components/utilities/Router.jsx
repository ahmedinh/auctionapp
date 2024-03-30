import AboutUs from '../pages/static/AboutUs';
import Terms from '../pages/static/Terms';
import Privacy from '../pages/static/Privacy';
import Home from '../pages/HomePage/Home';
import Layout from './Layout';
import NewArrivals from '../pages/HomePage/Products/NewArrivals';
import LastChance from '../pages/HomePage/Products/LastChance';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import ProductDetails from '../pages/ProductOverview/Details';
import SellerInformation from '../pages/ProductOverview/SellerInformation';
import CustomerReviews from '../pages/ProductOverview/CustomerReviews';
import Product from '../pages/ProductOverview/Product';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="/home/new-arrivals" />} />
            <Route path="home" element={<Home />}>
                <Route path="new-arrivals" element={<NewArrivals />} />
                <Route path="last-chance" element={<LastChance />} />
            </Route>
            <Route path="home">
                <Route path="about-us" element={<AboutUs />} />
                <Route path="terms-and-conditions" element={<Terms />} />
                <Route path="privacy-and-policy" element={<Privacy />} />
            </Route>
            <Route path="shop">
                <Route path="product/:id" element={<Product />}>
                    <Route path="details" element={<ProductDetails />} />
                    <Route path="seller-information" element={<SellerInformation />} />
                    <Route path="reviews" element={<CustomerReviews />} />
                </Route>
            </Route>
        </Route>
    )
);
export default Router;