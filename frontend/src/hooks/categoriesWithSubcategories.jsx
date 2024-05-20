import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesWithSubCategories } from "../api/categoriesApi";

export const useCategoriesWithSubCategories = () => {
    return useQuery({
        queryKey: ['add-item-categories'],
        queryFn: () => fetchCategoriesWithSubCategories()
    })
}