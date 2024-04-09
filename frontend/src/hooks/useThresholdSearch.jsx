import { useQuery } from '@tanstack/react-query';
import { searchProductsThreshold } from '../api/productsApi';

export function useThresholdSearch(query, isEnabled = true) {
    return useQuery({
        queryKey: ['products-threshold', query],
        queryFn: () => searchProductsThreshold({ query }),
        enabled: !!query && isEnabled,
        retry: 1,
    });
}; 