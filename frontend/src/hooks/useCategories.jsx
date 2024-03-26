import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categoriesApi';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setError(null);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch categories: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, isLoading, error };
};
export default useCategories;