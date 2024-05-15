import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = (fetchFunction, queryKeyPrefix) => {
    return useInfiniteQuery({
        queryKey: [queryKeyPrefix, "infinite"],
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.last) return undefined;
            return lastPage.pageable?.pageNumber !== undefined ? lastPage.pageable.pageNumber + 1 : undefined;
        },
        queryFn: ({ pageParam = 0 }) => fetchFunction({ page: pageParam }),
    });
};