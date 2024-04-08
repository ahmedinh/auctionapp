import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProductsThreshold } from '../api/productsApi';

export function useThresholdSearch(query, size = 9) {
    return useInfiniteQuery({
        queryKey: ['products-threshold', query],
        queryFn: ({ pageParam = 0 }) => searchProductsThreshold({ page: pageParam, size, query }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
        enabled: !!query,
    });
}; 