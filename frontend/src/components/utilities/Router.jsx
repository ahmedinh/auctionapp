import AboutUs from '../pages/static/AboutUs';
import Terms from '../pages/static/Terms';
import Privacy from '../pages/static/Privacy';
import Home from '../pages/HomePage/Home';
import Layout from './Layout';
import NewArrivals from '../pages/HomePage/Products/NewArrivals';
import LastChance from '../pages/HomePage/Products/LastChance';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Product from '../pages/Product';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="home" element={<Home />} />
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
        <Route path="product/:id" element={<Product />} />
      </Route>
    </Route>
  )
);
export default Router;