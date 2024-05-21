import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeUserInfo } from "../api/userApi"
import { getUserId } from "../components/utilities/Common";

export const useChangeUserInfo = () => {
    const queryClient = useQueryClient();
    const userId = getUserId();
    return useMutation({
        mutationKey: ['change-user-info'],
        mutationFn: (payload) => changeUserInfo({ payload }),
        onSuccess: () => {
            alert('You successfuly changed information!')
            queryClient.invalidateQueries('get-user-info', userId);
        },
        onError: (error) => {
            alert('Information did not change. ', error?.message)
            console.error('Mutation failed', error);
        }
    })
}