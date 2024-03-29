import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categoriesApi';

export const useCategories = () => {
    const {
        status,
        error,
        data,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
    })
    return { status, error, data };
};