import { useQuery } from '@tanstack/react-query';
import { searchSuggestion } from '../api/productsApi';

export function useThresholdSearch(query, isEnabled = true) {
    return useQuery({
        queryKey: ['products-threshold', query],
        queryFn: () => searchSuggestion({ query }),
        enabled: !!query && isEnabled,
        retry: 1,
    });
}; 