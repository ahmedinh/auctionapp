import { fetchHighlight } from '../api/productsApi';
import { useQuery } from '@tanstack/react-query';

export const useHighlight = () => {
    const {
        status,
        error,
        data,
    } = useQuery({
        queryKey: ['highlight'],
        queryFn: () => fetchHighlight(),
    })
    return { status, error, data };
};