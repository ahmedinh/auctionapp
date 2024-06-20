import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductsForCategory } from '../api/productsApi';

export function useCategoryProducts(categoryId, sortField, sortDirection, subCategoryIds, minValue, maxValue, size = 9) {
    return useInfiniteQuery({
        queryKey: ["categoryProducts", { categoryId, sortField, sortDirection, subCategoryIds }],
        queryFn: ({ pageParam = 0 }) => getProductsForCategory({ page: pageParam, size, categoryId, sortField, sortDirection, subCategoryIds, minValue, maxValue}),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
    });
}