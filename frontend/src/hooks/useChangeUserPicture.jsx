import { useMutation } from "@tanstack/react-query"
import { changeUserPicture } from "../api/userApi"

export const useChangeUserPicture = () => {
    return useMutation({
        mutationKey: ['change-user-picture'],
        mutationFn: (file) => changeUserPicture({ file }),
        onSuccess: () => {
            alert('You successfuly changed picture!')
        },
        onError: (error) => {
            alert('Information did not change. ', error?.message)
            console.error('Mutation failed', error);
        }
    })
}