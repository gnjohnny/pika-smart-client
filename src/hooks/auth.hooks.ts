import {
    getAuthUser,
    SignIn,
    SignOut,
    SignUp,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";

export const useAuth = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ["auth_user"],
        queryFn: getAuthUser,
    });

    return {
        authUser: data,
        isPending,
        error,
    };
};

export const useSignIn = () => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();
    const { data, error, isPending, mutateAsync, reset } = useMutation({
        mutationFn: SignIn,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["auth_user"] });
            const from = location.state?.from || "/dashboard";
            navigate(from, { replace: true });
        },
    });

    return {
        signIn: mutateAsync,
        signInData: data,
        error,
        isPending,
        reset,
    };
};

export const useSignUp = () => {
    const queryClient = useQueryClient();
    const { data, error, isPending, mutateAsync, reset } = useMutation({
        mutationFn: SignUp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth_user"] });
        },
    });

    return {
        signUp: mutateAsync,
        signUpData: data,
        error,
        isPending,
        reset,
    };
};

export const useSignOut = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, reset } = useMutation({
        mutationFn: SignOut,
        onSuccess: () => {
            queryClient.setQueryData(["auth_user"], null);
            queryClient.invalidateQueries({
                queryKey: ["auth_user"],
            });
        },
    });

    return {
        signOut: mutateAsync,
        isPending,
        reset,
    };
};