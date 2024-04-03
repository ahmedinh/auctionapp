import { useInfiniteQuery } from '@tanstack/react-query';

export function useCategoryProducts(fetchFunction, queryKeyPrefix, size, categoryId) {
    return useInfiniteQuery({
        queryKey: [queryKeyPrefix, { categoryId }],
        queryFn: ({ pageParam = 0 }) => fetchFunction({ page: pageParam, size, categoryId }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length; // Assuming 'last' indicates if more pages are available
        },
    });
}