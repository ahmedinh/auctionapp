import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesWithSubCategories } from '../api/categoriesApi';

export const useCategoriesWithSubCategories = () => {
    const {
        status,
        error,
        data,
    } = useQuery({
        queryKey: ['categoriesWithSubCategories'],
        queryFn: () => fetchCategoriesWithSubCategories(),
    })
    return { status, error, data };
};