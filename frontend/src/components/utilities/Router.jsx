import AboutUs from '../pages/AboutUs';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Home from '../pages/HomePage/Home';
import Layout from './Layout';
import Page from '../pages/Page';
import NewArrivals from '../pages/HomePage/Products/NewArrivals';
import LastChance from '../pages/HomePage/Products/LastChance';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index path="home" element={<Home />}/>
        <Route path="home" element={<Home/>}>
          <Route path="new-arrivals" element={<NewArrivals/>}/>
          <Route path="last-chance" element={<LastChance/>}/>
          <Route index element={<NewArrivals />} />
        </Route>
        <Route path="home" element={<Page />}>
          <Route path="about-us" element={<AboutUs />} />
          <Route path="terms-and-conditions" element={<Terms />} />
          <Route path="privacy-and-policy" element={<Privacy />} />
        </Route>
      </Route>
    )
  );

  export default Router;