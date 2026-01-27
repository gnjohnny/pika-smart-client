import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Utensils } from "lucide-react";

const RecipHeader = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
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
    </>
  );
};

const RecipeMeta = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <p className="text-primary/80 font-semibold">
        Generated At:{" "}
        <span className="text-xs font-bold">
          {format(recipe.createdAt, "dd MMMM, yyyy 'at' hh:mm a")}
        </span>
      </p>
      <p className="text-primary/80 font-semibold">
        {" "}
        Serves:{" "}
        <span className="text-xs font-bold">
          {recipe.servings} {recipe.servings > 1 ? "people" : "person"}
        </span>
      </p>
    </>
  );
};

const RecipeBadges = ({ recipe }: { recipe: Recipe }) => {
  return (
    <CardFooter className="flex items-center gap-2 h-1/4">
      <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
        <Clock />
        Cook time: {recipe.cook_time}min
      </Badge>
      <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
        <Utensils />
        {recipe.ingredients.length} ingredients used
      </Badge>
    </CardFooter>
  );
};

export const RecipeCard = ({ recipe, variant }: RecipeCardProps) => {
  if (variant === "grid") {
    return (
      <Card className="mx-auto w-full h-88 md:max-w-sm hover:bg-primary/20 transition duration-200 gap-2">
        <CardHeader className="h-3/4">
          <RecipHeader recipe={recipe} />
        </CardHeader>
        <CardContent>
          <RecipeMeta recipe={recipe} />
        </CardContent>
        <RecipeBadges recipe={recipe} />
      </Card>
    );
  }

  return (
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
            <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
            <CardDescription className="line-clamp-1 md:line-clamp-2">
              {recipe.description}
            </CardDescription>
          </div>
          <div>
            <RecipeMeta recipe={recipe} />
          </div>
          <RecipeBadges recipe={recipe} />
        </div>
      </div>
    </Card>
  );
};
