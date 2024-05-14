import { useMutation } from '@tanstack/react-query';
import { register } from '../api/authApi';
import { setSession } from '../components/utilities/Common';
import { useNavigate } from 'react-router-dom';
import { homePageRoute } from '../components/utilities/AppUrls';

export function useRegisterMutation() {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['register'],
        mutationFn: ({ firstName, lastName, email, password }) => register({ firstName, lastName, email, password }),
        onSuccess: (data) => {
            setSession(data.person, data.token);
            navigate(homePageRoute + `new-arrivals`);
        }
    });
}