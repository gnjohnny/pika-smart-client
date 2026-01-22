import { axiosInstance } from "@/config/axios.config";

import { isAxiosError } from "axios";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    console.log(res.data);
    return res.data;
  } catch (err: unknown) {
    console.log("error:", err);
    return null;
  }
};

export const SignUp = async (data: { email: string; password: string }) => {
  try {
    const res = await axiosInstance.post("/auth/sign-up", data);
    return res.data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, "Signup failed. Please try again."));
  }
};

export const SignIn = async (data: { email: string; password: string }) => {
  try {
    const res = await axiosInstance.post("/auth/sign-in", data);
    return res.data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, "Signin failed. Please try again."));
  }
};

export const SignOut = async () => {
  try {
    const res = await axiosInstance.post("/auth/sign-out");
    return res.data;
  } catch (err: unknown) {
    throw new Error(
      getErrorMessage(err, "Something went wrong. Please try again."),
    );
  }
};

export const generatePasswordResetLink = async (data: { email: string }) => {
  try {
    const res = await axiosInstance.post(
      "/auth/request-password-reset-link",
      data,
    );
    return res.data;
  } catch (err: unknown) {
    throw new Error(
      getErrorMessage(err, "Error generating password reset link"),
    );
  }
};

export const resetPassword = async (data: {
  newPassword: string;
  token: string;
}) => {
  try {
    const { newPassword, token } = data;
    const safeToken = encodeURIComponent(token);
    const res = await axiosInstance.patch(`/auth/reset-password/${safeToken}`, {
      newPassword,
    });
    return res.data;
  } catch (err: unknown) {
    throw new Error(
      getErrorMessage(
        err,
        "Something went wrong while resetting your password",
      ),
    );
  }
};
