import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductBids } from "../api/productsApi";

export function useProductBidderTable({ productId }) {
    return useInfiniteQuery({
        queryKey: ['product-bidders-table', productId],
        queryFn: ({ pageParam = 0 }) => getProductBids({ productId, page: pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.last ? undefined : allPages.length;
        },
    })
}