import { useState, useEffect } from "react";
import CustomLoader from "@/components/loaders/main-loader";
import { useGetFavouriteRecipe } from "@/hooks/recipe.hooks";
import { Link } from "react-router";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { EmptyState } from "@/components/empty-state";
import { Heart, Search } from "lucide-react";

const FavouriteRecipesPage = () => {
  const [queries, setQueries] = useState<RecipeQuery>({
    title: "",
    sortby: "newest",
    page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState<string>("");
  const { favouriteRecipes, isPending } = useGetFavouriteRecipe(queries);
  const recipes = favouriteRecipes?.favourite_recipes ?? [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueries((q) => ({ ...q, title: search, page: 1 }));
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (search === queries.title) return;

    const timer = setTimeout(() => {
      setQueries((q) => ({ ...q, title: search, page: 1 }));
    }, 400);

    return () => clearTimeout(timer);
  }, [search, queries.title]);
  return (
    <div className="w-full py-2 space-y-6">
      <div className="w-full p-2 flex justify-start items-start flex-col">
        <div className="space-y-1.5 flex flex-col items-start">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-primary/80">
            All Your Favourited Recipes
          </h1>
          <p className="text-xs md:text-sm text-primary/70">
            Manage and Organize all of your favourited Recipes
          </p>
        </div>
        <div className="w-full my-4">
          <div className="lg:w-3/4 h-10 border border-primary/30 rounded-xl flex justify-start items-start gap-2">
            <div className="h-full p-1 flex justify-center items-center">
              <Search size={22} className="text-primary/60" />
            </div>
            <input
              type="search"
              placeholder="Search your recipes..."
              onChange={(e) => setSearch(e.target.value)}
              className="size-full border-none bg-none flex-1 outline-none rounded-r-xl placeholder: text-primary/70"
            />
          </div>
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
              title="No Favourite Recipes"
              desc="You haven't favourited any recipes yet."
              link="/dashboard/recipes"
              buttonText="Browse Recipes"
              Icon={Heart}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FavouriteRecipesPage;
