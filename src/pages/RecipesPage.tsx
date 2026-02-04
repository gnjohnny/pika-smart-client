import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Search, Stars } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useGetMyRecipes } from "@/hooks/recipe.hooks";
import CustomLoader from "@/components/loaders/main-loader";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { EmptyState } from "@/components/empty-state";

const RecipesPage = () => {
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [queries, setQueries] = useState<RecipeQuery>({
    title: "",
    sortby: "newest",
    page: 1,
    limit: 10,
  });

  const [search, setSearch] = useState<string>("");

  const { userRecipes, isPending } = useGetMyRecipes(queries);

  const recipes = userRecipes?.saved_recipes ?? [];

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
      <div className="w-full p-2 flex justify-between items-center">
        <div className="space-y-1.5 flex flex-col items-start">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-primary/80">
            All Your Generated Recipes
          </h1>
          <p className="text-xs md:text-sm text-primary/70">
            Manage and Organize all of your generated Recipes
          </p>
        </div>
        <div>
          <Link to={"/dashboard/create"}>
            <Button className="font-bold flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-400/80 cursor-pointer transition duration-200">
              <Stars /> Generate New Recipe
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full p-2 border border-primary/30 rounded-xl flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-2">
        <div className="w-full md:flex-1 md:p-4">
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
        <div className="flex justify-center items-center gap-2 md:px-4">
          <Select
            onValueChange={(value) =>
              setQueries((q) => ({ ...q, sortby: value, page: 1 }))
            }
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Sort recipes by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-center items-center w-20 h-8 border border-primary rounded-xl px-0.5">
            <button
              className={`${showGrid ? "bg-primary text-background/80" : "bg-none text-primary"} size-full px-2 py-1.5 rounded-l-xl flex justify-center items-center cursor-pointer`}
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3X3 />
            </button>
            <button
              className={`${!showGrid ? "bg-primary text-background/80" : "bg-none text-primary"} size-full px-2 py-1.5 rounded-r-xl flex justify-center items-center cursor-pointer`}
              onClick={() => setShowGrid(!showGrid)}
            >
              <List />
            </button>
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

        {showGrid ? (
          recipes.length > 0 ? (
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
            !isPending && <EmptyState />
          )
        ) : recipes.length > 0 ? (
          <div className="w-full p-1.5 flex justify-start items-center flex-col gap-2">
            {recipes.map((recipe: Recipe, idx: number) => (
              <Link
                to={`/dashboard/recipe/${recipe._id}`}
                key={recipe._id || idx}
                className="w-full"
              >
                <RecipeCard recipe={recipe} variant="list" />
              </Link>
            ))}
          </div>
        ) : (
          !isPending && <EmptyState />
        )}

        <div className="w-full flex flex-col justify-center items-center gap-2">
          {!isPending && (
            <p className="text-sm font-bold text-primary/70">
              {`Showing page ${userRecipes?.currentPage} of ${userRecipes?.totalPages}`}
            </p>
          )}

          {!isPending &&
            Array.from(
              { length: userRecipes?.totalPages || 0 },
              (_, i) => i + 1,
            ).map((pageNum) => (
              <button
                className={`px-2 py-1 rounded ${
                  userRecipes?.currentPage === pageNum
                    ? "bg-primary text-white"
                    : "text-primary/70"
                }`}
                disabled={userRecipes?.currentPage === pageNum}
                onClick={() => setQueries((q) => ({ ...q, page: pageNum }))}
              >
                {pageNum}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
