import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import AboutUs from './components/pages/AboutUs';
import Terms from './components/pages/Terms';
import Privacy from './components/pages/Privacy';
import Home from './components/pages/Home';
import Layout from './components/utilities/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="home">
        <Route path="about-us" element={<AboutUs />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="privacy-and-policy" element={<Privacy />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}/>;
};
export default App;