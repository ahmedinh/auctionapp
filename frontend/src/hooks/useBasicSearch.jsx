import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts } from '../api/productsApi';

export function useBasicSearch(query, sortField, sortDirection, subCategoryIds, minValue, maxValue, size = 9) {
    return useInfiniteQuery({
        queryKey: ["products-basic-search", { query, sortField, sortDirection, subCategoryIds }],
        queryFn: async ({ pageParam = 0 }) => searchProducts({ page: pageParam, size, query, sortField, sortDirection, subCategoryIds, minValue, maxValue }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
        enabled: !!query,
        retry: 1,
    });
}; 