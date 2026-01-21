import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { extractNameFromEmail } from "@/helpers/helpers";
import { useAuth } from "@/hooks/auth.hooks";
import { Bot, Calendar, Star, Trash } from "lucide-react";

const Dashboardpage = () => {
  const { authUser } = useAuth();

  const statsItems = [
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
      stat: authUser?.user.trashed_recipes.length,
      desc: "Account created",
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
    </div>
  );
};

export default Dashboardpage;
