import { useInfiniteQuery } from '@tanstack/react-query';

export function useCategoryProducts(fetchFunction, size, categoryId) {
    return useInfiniteQuery({
        queryKey: ["categoryProducts", { categoryId }],
        queryFn: ({ pageParam = 0 }) => fetchFunction({ page: pageParam, size, categoryId }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
    });
}