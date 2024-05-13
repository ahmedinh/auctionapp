import { useMutation } from "@tanstack/react-query"
import { changeUserInfo } from "../api/userApi"

export const useChangeUserInfo = () => {
    return useMutation({
        mutationKey: ['change-user-info'],
        mutationFn: (payload) => changeUserInfo({ payload }),
        onSuccess: () => {
            alert('You successfuly changed information!')
        },
        onError: (error) => {
            alert('Information did not change. ', error?.message)
            console.error('Mutation failed', error);
        }
    })
}