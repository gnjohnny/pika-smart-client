import { axiosInstance } from "@/config/axios.config";

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/user");
        return res.data;
    } catch (err: any) {
        console.log("error:", err);
        return null;
    }
};

export const SignUp = async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
}) => {
    try {
        const res = await axiosInstance.post("/auth/sign-up", data);
        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Signin failed. Please try again.";

        throw new Error(message);
    }
};

export const SignIn = async (data: { email: string; password: string }) => {
    try {
        const res = await axiosInstance.post("/auth/sign-in", data);
        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Signin failed. Please try again.";

        throw new Error(message);
    }
};

export const SignOut = async () => {
    try {
        const res = await axiosInstance.post("/auth/sign-out");
        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong. Please try again.";

        throw new Error(message);
    }
};