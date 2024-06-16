import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPicturesToProduct, createProduct, deleteProduct } from "../api/productsApi";
import { clearSessionStorageProduct } from "../components/utilities/Common";
import { sellerActiveRoute } from "../components/utilities/AppUrls";

export const useProductMutations = (navigate, productName, uploadedImages) => {
    const queryClient = useQueryClient();
    const deleteProductMutation = useMutation({
        mutationKey: ['delete-product-error'],
        mutationFn: ({ productName }) => deleteProduct({ productName: productName }),
        onSuccess: () => {
            alert('Product deleted successfully')
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        }
    });

    const addPicturesMutation = useMutation({
        mutationKey: ['adding-product-pictures'],
        mutationFn: ({ uploadedImages, productName }) => addPicturesToProduct({ productPictures: uploadedImages, productName: productName }),
        onSuccess: () => {
            alert('Product added successfully');
            queryClient.invalidateQueries("newArrivals","infinite")
            queryClient.invalidateQueries("lastChance","infinite")
            clearSessionStorageProduct();
            navigate(sellerActiveRoute);
        },
        onError: (error) => {
            console.error('Error creating product:', error);
            deleteProductMutation.mutate({ productName });
        }
    });

    const createProductMutation = useMutation({
        mutationKey: ['creation-of-product'],
        mutationFn: (productData) => createProduct({ productData }),
        onSuccess: () => {
            addPicturesMutation.mutate({ uploadedImages, productName: productName });
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        }
    });

    return { createProductMutation };
};