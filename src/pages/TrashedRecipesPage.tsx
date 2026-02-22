import CustomLoader from "@/components/loaders/main-loader";
import { useGetTrashedRecipes } from "@/hooks/recipe.hooks";
import { Link } from "react-router";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { EmptyState } from "@/components/empty-state";
import { Trash } from "lucide-react";

const TrashedRecipesPage = () => {
  const { trashedRecipes, isPending } = useGetTrashedRecipes();
  const recipes = trashedRecipes?.trashed_recipes ?? [];
  return (
    <div className="w-full py-2 space-y-6">
      <div className="w-full p-2 flex justify-start items-start">
        <div className="space-y-1.5 flex flex-col items-start">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-primary/80">
            All Your Trashed Recipes
          </h1>
          <p className="text-xs md:text-sm text-primary/70">
            Manage and Organize all of your trashed Recipes
          </p>
        </div>
      </div>

      <div className="w-full">
        {isPending && recipes.length === 0 && (
          <div className="w-full h-[80vh] flex flex-col justify-center items-center">
            <CustomLoader color="oklch(70.5% 0.213 47.604)" />
            <p className="text-xs text-primary/60 animate-pulse">
              Loading your recipes. Please wait...
            </p>
          </div>
        )}

        {recipes.length > 0 ? (
          <div className="w-full p-1.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2">
            {recipes.map((recipe: Recipe, idx: number) => (
              <Link
                to={`/dashboard/recipe/${recipe._id}`}
                key={recipe._id || idx}
                className="w-full"
              >
                <RecipeCard recipe={recipe} variant="grid" />
              </Link>
            ))}
          </div>
        ) : (
          !isPending && (
            <EmptyState
              title="No Trashed Recipes"
              desc="You haven't trashed any recipes yet."
              link="/dashboard/recipes"
              buttonText="Browse Recipes"
              Icon={Trash}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TrashedRecipesPage;
