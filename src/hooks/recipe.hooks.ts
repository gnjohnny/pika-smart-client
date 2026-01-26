import { generateRecipe, getMyRecipes, saveRecipe } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMyRecipes = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: getMyRecipes,
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
