import { RouterProvider } from 'react-router-dom';
import './App.css';
import Router from './components/utilities/Router';
import { useEffect } from 'react';

function App() {
    /* useEffect(() => {
        const handleUnload = () => {
            localStorage.clear();
        };

        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, []); */
    return <RouterProvider router={Router} />;
};
export default App;