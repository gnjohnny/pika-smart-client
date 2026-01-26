import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Grid3X3, List, Search, Stars, Utensils } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useGetMyRecipes } from "@/hooks/recipe.hooks";
import CustomLoader from "@/components/loaders/main-loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const RecipesPage = () => {
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const { userRecipes, isPending } = useGetMyRecipes();

  if (isPending)
    return (
      <div className="w-full h-[80vh] flex flex-col justify-center items-center">
        <CustomLoader color="oklch(70.5% 0.213 47.604)" />
        <p className="text-xs text-primary/60 animate-pulse">
          Loading your recipes. Please wait...
        </p>
      </div>
    );

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
              className="size-full border-none bg-none flex-1 outline-none rounded-r-xl placeholder: text-primary/70"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 md:px-4">
          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Sort recipes by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
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
        {showGrid ? (
          <div className="w-full p-1.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2">
            {userRecipes.saved_recipes.map((recipe: Recipe, idx: number) => (
              <Link
                to={`/dashboard/recipe/${recipe._id}`}
                key={recipe._id || idx}
                className="w-full"
              >
                <Card className="mx-auto w-full h-88 md:max-w-sm hover:bg-primary/20 transition duration-200 gap-2">
                  <CardHeader className="h-3/4">
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={"/chef.webp"}
                        alt="pika smart brand logo"
                        width={250}
                        height={50}
                      />
                    </div>
                    <CardTitle>
                      {recipe.title.length > 35
                        ? recipe.title.slice(0, 35) + "..."
                        : recipe.title}
                    </CardTitle>
                    <CardDescription>
                      {recipe.description.length > 45
                        ? recipe.description.slice(0, 45) + "..."
                        : recipe.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary/80 font-semibold">
                      Generated At:{" "}
                      <span className="text-xs font-bold">
                        {format(recipe.createdAt, "dd MMMM, yyyy")}
                      </span>
                    </p>
                    <p className="text-primary/80 font-semibold">
                      {" "}
                      Serves:{" "}
                      <span className="text-xs font-bold">
                        {recipe.servings}{" "}
                        {recipe.servings > 1 ? "peoples" : "people"}
                      </span>
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-2 h-1/4">
                    <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
                      <Clock />
                      Cook time: {recipe.cook_time}min
                    </Badge>
                    <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
                      <Utensils />
                      {recipe.ingredients.length} ingridients used
                    </Badge>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full p-1.5 flex justify-start items-center flex-col gap-2">
            {userRecipes.saved_recipes.map((recipe: Recipe, idx: number) => (
              <Link
                to={`/dashboard/recipe/${recipe._id}`}
                key={recipe._id || idx}
                className="w-full"
              >
                <Card className="w-full gap-2 hover:bg-primary/20 transition duration-200">
                  <div className="w-full flex justify-center items-center gap-2 p-1.5">
                    <div className="flex justify-center items-center w-1/4">
                      <img
                        src={"/chef.webp"}
                        alt="pika smart brand logo"
                        width={150}
                        height={150}
                      />
                    </div>

                    <div className="flex justify-start items-start flex-col gap-1.5 w-3/4">
                      <div>
                        <CardTitle className="line-clamp-1">
                          {recipe.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-1 md:line-clamp-2">
                          {recipe.description}
                        </CardDescription>
                      </div>
                      <div>
                        <p className="text-primary/80 text-sm font-semibold">
                          Generated At:{" "}
                          <span className="text-xs font-bold">
                            {format(recipe.createdAt, "dd MMMM, yyyy")}
                          </span>
                        </p>
                        <p className="text-primary/80 text-sm font-semibold">
                          {" "}
                          Serves:{" "}
                          <span className="text-xs font-bold">
                            {recipe.servings}{" "}
                            {recipe.servings > 1 ? "peoples" : "people"}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-start items-start gap-2 h-fit">
                        <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
                          <Clock />
                          Cook time: {recipe.cook_time}min
                        </Badge>
                        <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
                          <Utensils />
                          {recipe.ingredients.length} ingridients used
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
