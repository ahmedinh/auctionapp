import { fetchHighlight } from '../api/productsApi';
import { useQuery } from '@tanstack/react-query';

export const useHighlight = () => {
    return useQuery({
        queryKey: ['highlight'],
        queryFn: () => fetchHighlight(),
    });
};