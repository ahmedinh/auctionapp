import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts } from '../api/productsApi';

export function useSearchProducts(query, size = 9) {
    return useInfiniteQuery({
        queryKey: ['products', query],
        queryFn: ({ pageParam = 0 }) => searchProducts({ page: pageParam, size, query }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
        enabled: !!query,
    });
};