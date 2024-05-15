import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../api/productsApi"

export const useProduct = ({ productId }) => {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct({ productId }),
    })
}