import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProductsBasic } from '../api/productsApi';

export function useBasicSearch(query, size = 9) {
    return useInfiniteQuery({
        queryKey: ['products-basic', query],
        queryFn: async ({ pageParam = 0 }) => searchProductsBasic({ page: pageParam, size, query }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
        enabled: !!query,
        retry: 1,
    });
}; 