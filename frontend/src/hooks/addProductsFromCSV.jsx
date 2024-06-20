import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductsCSV } from "../api/productsApi";
import { useNavigate } from "react-router-dom";
import { sellerActiveRoute } from "../components/utilities/AppUrls";

export function useAddProductsFromCSV(setError, setLoading) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['add-products-csv'],
        mutationFn: (file) => addProductsCSV({ file }),
        onSuccess: () => {
            alert('Products successfully added');
            queryClient.invalidateQueries('newArrivals');
            queryClient.invalidateQueries('lastChance');
            navigate(sellerActiveRoute);
        },
        onError: (error) => {
            setError(error);
            console.error('Mutation failed', error);
            setLoading(false);
        },
        onMutate: () => {
            setLoading(true);
        },
        onSettled: () => {
            setLoading(false);
        }
    })
}