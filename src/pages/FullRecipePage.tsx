import { EmptyState } from "@/components/empty-state";
import CustomLoader from "@/components/loaders/main-loader";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import {
  useFavouriteRecipe,
  useGetFavouriteRecipe,
  useGetRecipeDetailedInfo,
} from "@/hooks/recipe.hooks";
import { format } from "date-fns";
import {
  Camera,
  Clock,
  Clock1,
  Heart,
  Trash2,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";

const FullRecipePage = () => {
  const { id } = useParams();

  const { detailedInfo, isPending } = useGetRecipeDetailedInfo({
    id: id || "",
  });

  const recipe: Recipe | null = detailedInfo?.recipe ?? null;

  const { favouriteRecipes } = useGetFavouriteRecipe({
    title: "",
    sortby: "newest",
  });

  const isFavourited =
    favouriteRecipes?.favourite_recipes?.some(
      (fav: Recipe) => fav._id === recipe?._id,
    ) ?? false;

  const {
    favouriteRecipeMutation,
    isPending: isFavouritePending,
    reset: resetFavourite,
  } = useFavouriteRecipe();

  const handleFavourite = async () => {
    if (!recipe) return;
    resetFavourite();
    try {
      const res = await favouriteRecipeMutation(recipe._id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="w-full p-1.5">
      {isPending ? (
        <div className="w-full h-[80vh] flex flex-col justify-center items-center">
          <CustomLoader color="oklch(70.5% 0.213 47.604)" />
          <p className="text-xs text-primary/60 animate-pulse">
            Loading your recipe. Please wait...
          </p>
        </div>
      ) : recipe && recipe !== null ? (
        <div className="w-full space-y-4">
          <div className="w-full h-64 bg-primary/10 rounded-xl group overflow-hidden relative">
            <div className="absolute bg-linear-to-t from-black/30 to-transparent w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
              <span className="absolute bottom-2 left-2 text-white font-medium text-xs flex items-center">
                <Camera className="inline mr-2" /> Quick View
              </span>
            </div>
            <img
              src="/chef.webp"
              alt="recipe image"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className="absolute top-2 right-2 bg-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-30"
              title="favourite"
            >
              {isFavourited ? (
                <Heart size={16} className="fill-white" />
              ) : (
                <Heart size={16} className="text-white" />
              )}
            </span>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold">{recipe.title}</h1>
            <p className="text-primary/80 text-sm">{recipe.description}</p>
          </div>

          <div className="w-full flex flex-wrap justify-center items-center border border-primary/20 shadow-sm shadow-primary/10 rounded-lg overflow-hidden">
            <div className="lg:flex-1 p-4 flex gap-2 items-center justify-center border-r border-primary/20">
              <Clock size={22} className="text-orange-500" />
              <span className="text-xs text-primary font-medium uppercase">
                Prep Time :
              </span>
              <span className="text-sm font-bold text-primary">
                {recipe.prep_time} mins
              </span>
            </div>
            <div className="lg:flex-1 p-4 flex gap-2 items-center justify-center lg:border-r border-primary/20">
              <Clock1 size={22} className="text-orange-500" />
              <span className="text-xs text-primary font-medium uppercase">
                Cook Time :
              </span>
              <span className="text-sm font-bold text-primary">
                {recipe.cook_time} mins
              </span>
            </div>
            <div className="lg:flex-1 p-4 flex gap-2 items-center justify-center border-t lg:border-none border-primary/20 place-self-center">
              <Users size={22} className="text-orange-500" />
              <span className="text-xs text-primary font-medium uppercase">
                Serves :
              </span>
              <span className="text-sm font-bold text-primary">
                {recipe.servings}
              </span>
            </div>
          </div>

          <div className="w-full flex gap-4 flex-col md:flex-row">
            <div className="flex-1 w-full lg:w-1/2 border border-primary/20 shadow-sm shadow-primary/10 rounded-lg overflow-hidden px-4 py-2.5">
              <h1 className="text-primary/80 font-semibold">Ingredients</h1>
              <Separator className="my-3" />

              <ul className="space-y-2 mb-8">
                {recipe.ingredients.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-primary/80"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                    <span className="font-medium text-primary/90">
                      {item.quantity} {item.unit} of {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full lg:w-1/2 border border-primary/20 shadow-sm shadow-primary/10 rounded-lg overflow-hidden px-4 py-2.5">
              <h1 className="text-primary/80 font-semibold">Cooking Steps</h1>
              <Separator className="my-3" />

              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-orange-400 text-primary font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-primary text-sm leading-relaxed mt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex gap-4 justify-end mb-6">
            <Button
              className="font-bold bg-orange-400 hover:bg-orange-400/80 cursor-pointer transition duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-1.5"
              title="favourite"
              onClick={handleFavourite}
              disabled={isFavourited || isFavouritePending}
            >
              <LoadingSwap
                isLoading={isFavouritePending}
                className="text-white font-bold flex items-center justify-center gap-1.5"
              >
                {!isFavourited ? (
                  <>
                    <Heart /> Favorite Recipe
                  </>
                ) : (
                  <>
                    <Heart className="fill-white" /> Already Favorited
                  </>
                )}
              </LoadingSwap>
            </Button>
            <Button
              className="font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              variant={"outline"}
              title="trash"
            >
              <Trash2 className="text-red-400" /> Move Recipe To Trash
            </Button>
          </div>

          <Separator />

          <div className="w-full flex gap-2 items-center justify-center">
            <span className="text-xs text-primary/80">
              This recipe was generated by AI on{" "}
              {recipe.createdAt
                ? `${format(new Date(recipe.createdAt), "dd MMMM, yyyy")}`
                : ""}
              .
            </span>
          </div>
        </div>
      ) : (
        <>
          <EmptyState
            title="Recipe Not Found"
            desc="The recipe was not found. Click the button below to view your recipes."
            link="/dashboard/recipes"
            Icon={UtensilsCrossed}
            buttonText="Browse Recipes"
          />
        </>
      )}
    </div>
  );
};

export default FullRecipePage;
