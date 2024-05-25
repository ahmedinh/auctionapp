import { useQuery } from "@tanstack/react-query";
import { getSimilarProducts } from "../api/productsApi";

export function useSimilarProducts({ productId }) {
    return useQuery({
        queryKey: ['similar-products', productId],
        queryFn: () => getSimilarProducts(productId)
    })
}