import { useQuery } from "@tanstack/react-query";
import { getUserBids } from "../api/userApi";

export function useBids() {
    return useQuery({
        queryKey: ['get-user-bids'],
        queryFn: () => getUserBids()
    });
}