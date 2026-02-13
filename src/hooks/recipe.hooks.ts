import {
  generateRecipe,
  getFavouritedRecipes,
  getMyRecipes,
  getRecipeDetailedInfo,
  getTrashedRecipes,
  saveRecipe,
} from "@/lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

export const useGetRecipeDetailedInfo = ({ id }: { id: string }) => {
  console.log(id);
  const { data, isPending, error } = useQuery({
    queryKey: ["recipe-detailed-info", { id }],
    queryFn: () => getRecipeDetailedInfo(id),
    placeholderData: keepPreviousData,
  });

  return {
    detailedInfo: data,
    isPending,
    error,
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
