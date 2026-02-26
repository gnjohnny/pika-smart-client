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
    return res.data;
  } catch (err: unknown) {
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

export const getMyRecipes = async (queryKey: [string, RecipeQuery]) => {
  const [_key, { title, sortby, page = 1, limit = 10 }] = queryKey;
  try {
    const res = await axiosInstance.get("/recipe/my-recipes", {
      params: { title, sortby, page, limit },
    });
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      getErrorMessage(error, "Something went wrong when getting your recipes"),
    );
  }
};
export const generateRecipe = async (data: Array<string>) => {
  try {
    const res = await axiosInstance.post("/recipe/generate", {
      ingredients: data,
    });
    return res.data;
  } catch (error: unknown) {
    throw new Error(
      getErrorMessage(
        error,
        "Something went wrong while generating your recipe",
      ),
    );
  }
};
export const saveRecipe = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/recipe/save/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};
export const getFavouritedRecipes = async (queryKey: [string, RecipeQuery]) => {
  const [_key, { title, sortby, page = 1, limit = 10 }] = queryKey;
  try {
    const res = await axiosInstance.get("/recipe/favourite-recipes", {
      params: { title, sortby, page, limit },
    });
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const getTrashedRecipes = async () => {
  try {
    const res = await axiosInstance.get("/recipe/trashed-recipes");
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const getRecipeDetailedInfo = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/recipe/recipe-info/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const updateEmail = async ({ newEmail }: { newEmail: string }) => {
  try {
    const res = await axiosInstance.patch("/auth/update-email", { newEmail });
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await axiosInstance.patch("/auth/update-password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const favouriteRecipe = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/recipe/favourite/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const trashRecipe = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/recipe/move-to-trash/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};

export const restoreRecipe = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/recipe/restore/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, "Something went wrong - try again"));
  }
};
