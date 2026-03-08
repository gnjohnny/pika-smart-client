import {
  clearTrash,
  favouriteRecipe,
  generateRecipe,
  getAllRecipes,
  getFavouritedRecipes,
  getMyRecipes,
  getRecipeDetailedInfo,
  getTrashedRecipes,
  restoreRecipe,
  saveRecipe,
  trashRecipe,
  unFavouriteRecipe,
} from "@/lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useGetRecipeDetailedInfo = ({ id }: { id: string }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipe-detailed-info", { id }],
    queryFn: () => getRecipeDetailedInfo(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

  return {
    detailedInfo: data,
    isPending,
    error,
  };
};

export const useGetAllRecipes = ({
  title,
  sortby,
  limit = 10,
}: RecipeQuery) => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["all_recipes", { title, sortby, limit }],
      queryFn: ({ pageParam = 1 }) =>
        getAllRecipes([
          "all_recipes",
          { title, sortby, page: pageParam as number, limit },
        ]),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined,
    });

  return {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};

export const useGetMyRecipes = ({
  title,
  sortby,
  page = 1,
  limit = 10,
}: RecipeQuery) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipes", { title, sortby, page, limit }],
    queryFn: () => getMyRecipes(["recipes", { title, sortby, page, limit }]),
    placeholderData: keepPreviousData,
  });

  return {
    userRecipes: data,
    isPending,
    error,
  };
};

export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();
  const { data, isPending, mutateAsync, error, reset } = useMutation({
    mutationFn: generateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return {
    generateRecipeMutation: mutateAsync,
    isPending,
    generateRecipeData: data,
    error,
    reset,
  };
};

export const useSaveRecipe = () => {
  const queryClient = useQueryClient();
  const { reset, mutateAsync, isPending, error } = useMutation({
    mutationFn: saveRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return {
    saveRecipeMutation: mutateAsync,
    saveLoad: isPending,
    saveError: error,
    saveReset: reset,
  };
};

export const useGetFavouriteRecipe = ({
  title,
  sortby,
  page = 1,
  limit = 10,
}: RecipeQuery) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["favourite-recipes", { title, sortby, page, limit }],
    queryFn: () =>
      getFavouritedRecipes([
        "favourite-recipes",
        { title, sortby, page, limit },
      ]),
    placeholderData: keepPreviousData,
  });
  return {
    favouriteRecipes: data,
    isPending,
    error,
  };
};

export const useGetTrashedRecipes = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["trashed-recipes"],
    queryFn: getTrashedRecipes,
    placeholderData: keepPreviousData,
  });

  return {
    trashedRecipes: data,
    isPending,
    error,
  };
};

export const useFavouriteRecipe = () => {
  const queryClient = useQueryClient();
  const { reset, mutateAsync, isPending, error } = useMutation({
    mutationFn: favouriteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourite-recipes"] });
    },
  });

  return {
    favouriteRecipeMutation: mutateAsync,
    isPending,
    error,
    reset,
  };
};

export const useTrashRecipe = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, reset, isPending, error } = useMutation({
    mutationFn: trashRecipe,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["recipes"] }),
        queryClient.invalidateQueries({ queryKey: ["trashed-recipes"] }),
      ]);
    },
  });

  return {
    trashRecipeMutation: mutateAsync,
    trashRecipeLoad: isPending,
    trashRecipeError: error,
    trashRecipeReset: reset,
  };
};

export const useRestoreRecipe = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, reset, isPending, error } = useMutation({
    mutationFn: restoreRecipe,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["recipes"] }),
        queryClient.invalidateQueries({ queryKey: ["trashed-recipes"] }),
      ]);
    },
  });

  return {
    restoreRecipeMutation: mutateAsync,
    restoreRecipeLoad: isPending,
    restoreRecipeError: error,
    restoreRecipeReset: reset,
  };
};

export const useUnFavouriteRecipe = () => {
  const queryClient = useQueryClient();
  const { reset, mutateAsync, isPending, error } = useMutation({
    mutationFn: unFavouriteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourite-recipes"] });
    },
  });

  return {
    unFavouriteRecipeMutation: mutateAsync,
    unFavouriteRecipeLoad: isPending,
    unFavouriteRecipeError: error,
    unFavouriteRecipeReset: reset,
  };
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  const { reset, mutateAsync, isPending, error } = useMutation({
    mutationFn: clearTrash,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["recipes"] }),
        queryClient.invalidateQueries({ queryKey: ["trashed-recipes"] }),
      ]);
    },
  });
  return {
    deleteRecipeMutation: mutateAsync,
    deleteRecipeLoad: isPending,
    deleteRecipeError: error,
    deleteRecipeReset: reset,
  };
};
