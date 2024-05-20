import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts } from '../api/productsApi';

export function useBasicSearch(query, sortField, sortDirection, size = 9) {
    return useInfiniteQuery({
        queryKey: ["products-basic-search", { query, sortField, sortDirection }],
        queryFn: async ({ pageParam = 0 }) => searchProducts({ page: pageParam, size, query, sortField, sortDirection }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
        enabled: !!query,
        retry: 1,
    });
}; 