import { useMutation } from "@tanstack/react-query";
import { getUserId, removeSession } from "../components/utilities/Common";
import { deactivateUserAccount } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export function useDeactivateUser() {
    const userId = getUserId();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['deactivate-user', userId],
        mutationFn: () => deactivateUserAccount(),
        onSuccess: () => {
            alert('You have successfully deactivated your account!');
            removeSession();
            navigate('/home/new-arrivals');
        }
    })
}