import { RouterProvider } from 'react-router-dom';
import './App.css';
import Router from './components/utilities/Router';
import { useEffect } from 'react';

function App() {
    return <RouterProvider router={Router} />;
};
export default App;