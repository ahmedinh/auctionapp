import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../api/userApi"

export const useUserInfoGet = () => {
    return useQuery({ 
        queryKey: ['get-user-info'],
        queryFn: () => getUserInfo()
    })
}