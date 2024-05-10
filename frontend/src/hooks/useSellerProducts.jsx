import { useQuery } from "@tanstack/react-query";
import { getUser } from "../components/utilities/Common";

export function useSellerProducts({ fetchProducts, queryString, userId }) {
    const userID = getUser().id;
    return useQuery({
        queryKey: [queryString, userID],
        queryFn: () => fetchProducts({ userId })
    });
}