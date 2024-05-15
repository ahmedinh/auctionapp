import { useQuery } from "@tanstack/react-query";
import { getUserPicture } from "../api/userApi";

export const useUserPictureGet = () => {
    return useQuery({ 
        queryKey: ['get-user-picture'],
        queryFn: () => getUserPicture()
    });
}