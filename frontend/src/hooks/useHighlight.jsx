import { useState, useEffect } from 'react';
import { fetchHighlight } from "../api/productsApi";

const useHighlight = () => {
  const [highlight, setHighlight] = useState({
    id: null,
    name: "",
    description: "",
    start_price: 0,
    picture_url: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHighlight = async () => {
      setIsLoading(true);
      try {
        const fetchedHighlight = await fetchHighlight();
        setHighlight(fetchedHighlight);
        setError(null);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch highlight: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getHighlight();
  }, []);

  return { highlight, isLoading, error };
};
export default useHighlight;