import AboutUs from '../pages/static/AboutUs';
import Terms from '../pages/static/Terms';
import Privacy from '../pages/static/Privacy';
import Home from '../pages/HomePage/Home';
import Layout from './Layout';
import NewArrivals from '../pages/HomePage/Products/NewArrivals';
import LastChance from '../pages/HomePage/Products/LastChance';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import Product from '../pages/ProductOverview/Product';
import CategoryProducts from '../pages/BasicSearch/CategoryProducts';
import BasicSearch from '../pages/BasicSearch/BasicSearch';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AuthLayout from './AuthLayout';
import MyProfile from '../pages/my-account/profile/MyProfile';
import AccordionExpandIcon from '../pages/my-account/profile/Accordion';
import Seller from '../pages/my-account/seller/Seller';
import ProtectedRoute from './ProtectedRoute';
import Bids from '../pages/my-account/bids/Bids';
import Settings from '../pages/my-account/settings/Settings';
import SellerTable from '../pages/my-account/seller/SellerTable';
import { myProfileRoute, newArrivalsRoute, sellerActiveRoute } from './AppUrls';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<Layout />}>
                <Route index element={<Navigate replace to={newArrivalsRoute} />} />
                <Route path="home" element={<Home />}>
                    <Route index element={<Navigate replace to={newArrivalsRoute} />} />
                    <Route path="new-arrivals" element={<NewArrivals />} />
                    <Route path="last-chance" element={<LastChance />} />
                </Route>
                <Route path="home">
                    <Route path="categories/:categoryId" element={<CategoryProducts />} />
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="terms-and-conditions" element={<Terms />} />
                    <Route path="privacy-and-policy" element={<Privacy />} />
                    <Route path="search" element={<BasicSearch />} />
                </Route>
                <Route path="shop">
                    <Route path="product/:productId" element={<Product />} />
                </Route>

            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="my-account" element={<MyProfile />}>
                    <Route index element={<Navigate replace to={myProfileRoute} />} />
                    <Route path="profile" element={<AccordionExpandIcon />} />
                    <Route path="seller" element={<Seller />}>
                        <Route index element={<Navigate replace to={sellerActiveRoute} />} />
                        <Route path="active" element={<SellerTable />} />
                        <Route path="sold" element={<SellerTable />} />
                    </Route>
                    <Route path="bids" element={<Bids />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="my-account" element={<MyProfile />}>
                    <Route index element={<Navigate replace to={myProfileRoute} />} />
                    <Route path="profile" element={<AccordionExpandIcon />} />
                    <Route path="seller" element={<Seller />}>
                        <Route index element={<Navigate replace to={sellerActiveRoute} />} />
                        <Route path="active" element={<SellerTable />} />
                        <Route path="sold" element={<SellerTable />} />
                    </Route>
                    <Route path="bids" element={<Bids />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Route>
    )
);
export default Router;