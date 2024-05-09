import { useQuery } from "@tanstack/react-query";

export function useSellerProducts({ fetchProducts, queryString, userId }) {
    return useQuery({
        queryKey: [queryString],
        queryFn: () => fetchProducts({ userId })
    });
}