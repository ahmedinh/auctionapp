import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../api/userApi"
import { getUserId } from "../components/utilities/Common"

export const useUserInfoGet = () => {
    const userId = getUserId();
    return useQuery({ 
        queryKey: ['get-user-info', userId],
        queryFn: () => getUserInfo()
    })
}