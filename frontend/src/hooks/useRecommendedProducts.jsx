import { useQuery } from '@tanstack/react-query';
import { getUserId } from '../components/utilities/Common';
import { getRecommendedProducts } from '../api/productsApi';

export function useRecommendedProducts() {
    const userId = getUserId();
    return useQuery({
        queryKey: ['recommended-products', userId],
        queryFn: () => getRecommendedProducts(userId)
    });
}