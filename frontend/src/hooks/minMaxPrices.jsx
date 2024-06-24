import { useQuery } from "@tanstack/react-query"
import { getMinMaxPrices } from "../api/productsApi"

export function useMinMaxPrices() {
    return useQuery({
        queryKey: ['min-max-prices'],
        queryFn: () => getMinMaxPrices()
    })
};