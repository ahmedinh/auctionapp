import { useQuery } from "@tanstack/react-query";
import { getUserPicture } from "../api/userApi";
import { getUserId } from "../components/utilities/Common";

export const useUserPictureGet = () => {
    const userId = getUserId();
    return useQuery({ 
        queryKey: ['get-user-picture', userId],
        queryFn: () => getUserPicture()
    });
}