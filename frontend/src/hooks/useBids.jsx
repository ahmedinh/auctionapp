import { useQuery } from "@tanstack/react-query";
import { getUserBids } from "../api/userApi";
import { getUser } from "../components/utilities/Common";

export function useBids() {
    const userId = getUser().id;
    return useQuery({
        queryKey: ['get-user-bids', userId],
        queryFn: () => getUserBids()
    });
}