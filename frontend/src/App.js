import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './components/pages/AboutUs';
import Terms from './components/pages/Terms';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Specify routes for AboutUs and Terms pages */}
        <Route path="about-us" element={<AboutUs />} />
        <Route path="terms-and-conditions" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
