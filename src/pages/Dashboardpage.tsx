import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { extractNameFromEmail } from "@/helpers/helpers";
import { useAuth } from "@/hooks/auth.hooks";
import { format } from "date-fns";
import {
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  CookingPot,
  ListChecks,
  Settings,
  Star,
  Stars,
  Trash,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router";

const Dashboardpage = () => {
  const { authUser } = useAuth();

  const statsItems: StatItemsType[] = [
    {
      title: "Total Recipes",
      icon: Bot,
      stat: authUser?.user.saved_recipes.length,
      desc: "All your generations",
    },
    {
      title: "Favourited Recipes",
      icon: Star,
      stat: authUser?.user.favourite_recipes.length,
      desc: "All your favourited recipes",
    },
    {
      title: "Trashed Recipes",
      icon: Trash,
      stat: authUser?.user.trashed_recipes.length,
      desc: "All your trashed generations",
    },
    {
      title: "Member since",
      icon: Calendar,
      stat: format(authUser?.user.createdAt, "dd MMMM, yyyy"),
      desc: "Account created",
    },
  ];

  const quickActionItems: QuickActionItemsType[] = [
    {
      title: "Generate A New Recipe",
      icon: CookingPot,
      desc: "Enter your ingredients to generate a recipe",
      url: "/dashboard/create",
    },
    {
      title: "View All Recipes",
      icon: ListChecks,
      desc: "Browse your recipe library",
      url: "/dashboard/recipes",
    },
    {
      title: "Account Settings",
      icon: Settings,
      desc: "Manage you account",
      url: "/dashboard/settings",
    },
  ];
  return (
    <div className="w-full py-2 space-y-6">
      <div className="w-full flex items-start flex-col space-y-1.5">
        <h1 className="text-2xl md:text-4xl font-bold text-primary/90">
          Welcome back, {extractNameFromEmail(authUser?.user.email)}!
        </h1>
        <p className="text-sm md:text-lg text-secondary-foreground/80">
          Here is an overview of your pika smart workspace
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {statsItems.map((item, idx) => (
          <Card
            className="mx-auto w-full max-w-sm gap-4"
            key={item.title || idx}
          >
            <CardHeader>
              <div className="w-full flex justify-between items-center">
                <CardTitle>{item.title}</CardTitle>
                <item.icon
                  className={`${item.title === "Favourited Recipes" ? "text-orange-400" : item.title === "Trashed Recipes" ? "text-red-400" : item.title === "Member since" ? "text-blue-400" : "text-primary"}`}
                />
              </div>
            </CardHeader>
            <CardContent
              className={`text-2xl font-bold ${item.title === "Favourited Recipes" ? "text-orange-400" : item.title === "Trashed Recipes" ? "text-red-400" : item.title === "Member since" ? "text-blue-400" : "text-primary"}`}
            >
              {item.stat}
            </CardContent>
            <CardFooter className="text-xs text-primary/70">
              {item.desc}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="w-full rounded-2xl border border-primary/10 shadow-sm shadow-primary/20 p-4 space-y-4">
        <h1 className="text-lg md:text-xl font-semibold text-accent-foreground flex items-center gap-1.5">
          <Stars /> Quick Actions
        </h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {quickActionItems.map((item, idx) => (
            <Link to={item.url} key={item.title || idx}>
              <Card
                className={`mx-auto w-full md:max-w-sm gap-1.5 flex justify-center items-center cursor-pointer transition duration-200 ${idx === 0 ? "bg-primary/80 text-secondary hover:bg-primary/70" : "hover:bg-primary/10"}`}
              >
                <CardHeader className="w-full flex flex-col justify-center items-center">
                  <item.icon />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardFooter
                  className={`text-xs ${idx !== 0 ? "text-secondary-foreground/80" : ""} text-center`}
                >
                  {item.desc}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full rounded-2xl border border-primary/10 shadow-sm shadow-primary/20 p-4 space-y-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-semibold text-accent-foreground flex items-center gap-1.5">
            <CookingPot /> Recent Recipes
          </h1>
          <Link
            to={"/dashboard/recipes"}
            className="flex items-center gap-2 text-semibold"
          >
            View All <ArrowRight />
          </Link>
        </div>
        {authUser.user.saved_recipes.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {" "}
            {authUser.user.saved_recipes
              .slice(0, 3)
              .map((recipe: Recipe, idx: number) => (
                <Link
                  to={`/dashboard/recipe/${recipe._id}`}
                  key={recipe._id || idx}
                >
                  <Card className="mx-auto w-full h-68 md:max-w-sm hover:bg-primary/20 transition duration-200">
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
                    <CardFooter className="flex items-center gap-2 h-1/4">
                      <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
                        <Clock />
                        Cook time: {recipe.cook_time}min
                      </Badge>
                      <Badge className="bg-orange-200/80 border border-orange-400 flex justify-center items-center gap-1.5 text-black/80 font-semibold">
                        <Utensils />
                        {recipe.ingredients.length} used
                      </Badge>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        ) : (
          <Empty className="bg-muted/30 h-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UtensilsCrossed />
              </EmptyMedia>
              <EmptyTitle>No Recent Recipes Found</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                You have not generated any recipes. Click the button below to
                start generating now.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link to={"/dashboard/create"}>
                <Button variant="outline" className="cursor-pointer">
                  <Stars />
                  Generate Recipe
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
};

export default Dashboardpage;
