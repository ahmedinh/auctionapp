import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { setSession } from '../components/utilities/Common';

export function useLoginMutation() {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: ({ email, password }) => login({ email, password }),
        onSuccess: (data) => {
            setSession(data.person, data.token);
            navigate(`/home/new-arrivals`);
        }
    });
}