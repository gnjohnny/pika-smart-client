import { axiosInstance } from "@/config/axios.config";

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    console.log("error:", err);
    return null;
  }
};

export const SignUp = async (data: { email: string; password: string }) => {
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

export const generatePasswordResetLink = async (data: { email: string }) => {
  try {
    const res = await axiosInstance.post(
      "/auth/request-password-reset-link",
      data,
    );
    return res.data;
  } catch (err: any) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Error generating password reset link";
    throw new Error(message);
  }
};

export const resetPassword = async (data: {
  newPassword: string;
  token: string;
}) => {
  try {
    const { newPassword, token } = data;
    const res = await axiosInstance.patch(`/auth/reset-password/${token}`, {
      newPassword,
    });
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    throw new Error(message);
  }
};
