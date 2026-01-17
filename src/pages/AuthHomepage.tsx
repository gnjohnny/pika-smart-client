import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CookingPot,
  Heart,
  ShoppingBasket,
  Sparkles,
  Timer,
  UsersRound,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";

const AuthHomepage = () => {
  type StepsType = {
    name: string;
    icon: LucideIcon;
    description: string;
  };

  type AboutBannersType = {
    title: string;
    desc: string;
  };

  type RecipeType = {
    title: string;
    description: string;
    ingredients: {
      name: string;
      quantity: number;
      unit: string;
    }[];
    cook_time: number;
    servings: number;
  };

  type WhyPikaSmartTypes = {
    title: string;
    desc: string;
    icon: LucideIcon;
  };

  const steps: StepsType[] = [
    {
      name: "Input Ingredients",
      icon: ShoppingBasket,
      description:
        "Enter the ingredients you have on hand that you would like to use.",
    },
    {
      name: "Generate Recipe",
      icon: Sparkles,
      description:
        "Sit back and let our AI create a delicious, budget-friendly recipe for you.",
    },
    {
      name: "Prepare & Enjoy",
      icon: CookingPot,
      description: "Follow the simple steps to prepare your meal and enjoy!",
    },
  ];

  const aboutBanners: AboutBannersType[] = [
    {
      title: "+10 K",
      desc: "Recpies Generated",
    },
    {
      title: "+5 K",
      desc: "Active Users Monthly",
    },
    {
      title: "4.8/5",
      desc: "User Satisfaction Rating",
    },
    {
      title: "+500 Kg",
      desc: "Ingredients Saved from Waste",
    },
  ];

  const recipesMockData: RecipeType[] = [
    {
      title: "Spicy Ugali with Sukuma Wiki",
      description:
        "A traditional Kenyan dish made with maize flour and served with sautéed kale.",
      ingredients: [
        {
          name: "Maize Flour",
          quantity: 2,
          unit: "cups",
        },
      ],
      cook_time: 30,
      servings: 4,
    },
    {
      title: "Chicken Pilau",
      description:
        "A flavorful rice dish cooked with spices and tender chicken pieces.",
      ingredients: [
        {
          name: "Rice",
          quantity: 1.5,
          unit: "cups",
        },
      ],
      cook_time: 45,
      servings: 4,
    },
    {
      title: "Mashed Potato with Grilled Fish",
      description:
        "Creamy mashed potatoes served alongside perfectly grilled fish fillets.",
      ingredients: [
        {
          name: "Potatoes",
          quantity: 3,
          unit: "pieces",
        },
      ],
      cook_time: 45,
      servings: 4,
    },
  ];

  const whyPikaSmart: WhyPikaSmartTypes[] = [
    {
      title: "AI-Powered Creativity",
      desc: "Our Gemini integration creates unique recipes based on what you actually have in your pantry.",
      icon: Sparkles,
    },
    {
      title: "Reduce Food Waste",
      desc: "Stop throwing away ingredients. Pika Smart finds a delicious use for that lone carrot.",
      icon: Utensils,
    },
    {
      title: "Health Personalized",
      desc: "Keto, Vegan, or Gluten-free? The AI adapts every recipe to fit your dietary needs perfectly.",
      icon: Heart,
    },
  ];
  return (
    <main className="w-full mt-15 flex justify-center items-center flex-col gap-20 pb-20">
      <section
        className="max-w-6xl h-fit mx-auto flex justify-center items-center flex-col p-4 md:p-6"
        id="home"
      >
        <Badge className="bg-orange-100/30 border border-orange-500 inline-flex items-center gap-2 px-3 py-1.5 ">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold text-primary">
            Powered by Gemini AI
          </span>
        </Badge>

        <div className="mb-4">
          <h1 className="w-3/4 mx-auto mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Cook Smarter with What You Have
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            PikaSmart helps you turn everyday ingredients into delicious,
            budget-friendly meals. Just tell us what’s in your kitchen—or how
            much you want to spend—and our AI creates a simple, Kenyan-friendly
            recipe in seconds.
          </p>
        </div>

        <div className="w-full md:w-[45%] mx-auto flex justify-center items-center flex-col md:flex-row p-2 gap-4 md:gap-6">
          <Button className="w-3/4 md:w-1/2 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 cursor-pointer">
            <Link to="/sign-in">Get Started</Link>
          </Button>
          <Button
            variant={"outline"}
            className="w-3/4 md:w-1/2 border border-orange-500 text-primary shadow-lg shadow-orange-500/30 cursor-pointer"
          >
            <Link to="/sign-in">Generate Recipe</Link>
          </Button>
        </div>
      </section>
      <section
        className="max-w-6xl h-fit mx-auto flex flex-col"
        id="how-it-works"
      >
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-center text-primary/90">
            How Pika Smart Works
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter what you have and let PikaSmart instantly generate a simple,
            affordable recipe tailored for Kenyan kitchens.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 px-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-full h-72 flex flex-col items-center justify-center gap-4 p-4 bg-orange-200/10 backdrop-blur-sm rounded-xl border border-orange-300/40 shadow-lg md:w-[30%] relative"
            >
              <Badge className="absolute top-4 left-4 bg-orange-500/60 border border-orange-600/40 text-primary/80 flex items-center justify-center">
                Step {index + 1}
              </Badge>
              <div className="w-18 h-18 rounded-full border border-amber-500 bg-orange-200/60 flex justify-center items-center shadow-md shadow-orange-400/20">
                <step.icon size={28} className=" text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-primary">{step.name}</h3>
              <p className="text-center text-sm md:text-lg text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="max-w-6xl max-h-fit mx-auto flex flex-col"
        id="recipes"
      >
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-center text-primary/90 relative">
            Trending AI Recipes
            <span>
              <Sparkles
                fill="yellow"
                className="w-6 h-6 text-orange-500 absolute top-[18%] right-[10%] md:right-[21%] transform -translate-y-1/2"
              />
            </span>
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover popular recipes generated by PikaSmart users, showcasing
            the versatility and creativity of our AI-powered cooking assistant.
          </p>
        </div>

        <div className="max-w-7xl mx-auto place-content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipesMockData.map((recipe, index) => (
            <div
              key={index}
              className=" flex flex-col gap-4 p-4 bg-orange-200/10 backdrop-blur-sm rounded-xl border border-orange-300/40 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="group overflow-hidden w-full h-38 rounded-t-xl">
                <img
                  src="/chef.webp"
                  alt={recipe.title}
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary/80">
                  {recipe.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {recipe.description.length > 56
                    ? recipe.description.slice(0, 56) + "..."
                    : recipe.description}
                </p>

                <div className="w-full flex flex-wrap justify-start items-center my-4">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <Badge
                      key={idx}
                      className="text-sm text-muted-foreground border border-orange-400/50 bg-orange-200/30 mr-2 mb-2"
                    >
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </Badge>
                  ))}
                </div>

                <div className="w-full flex justify-start items-center gap-4">
                  <span className="text-sm text-muted-foreground mr-4 flex justify-center place-items-center">
                    <UsersRound className="inline-block w-4 h-4 mr-1 text-orange-500" />
                    Serves: {recipe.servings}
                  </span>
                  <span className="text-sm text-muted-foreground flex justify-center place-items-center">
                    <Timer className="inline-block w-4 h-4 mr-1 text-orange-500" />
                    Cook Time: {recipe.cook_time} mins
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-6xl max-h-fit mx-auto flex flex-col" id="about">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-center text-primary/90">
            About Pika Smart
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-muted-foreground max-w-full mx-auto">
            Founded in 2025, Pika Smart was born from a simple question:{" "}
            <span className="italic font-bold">
              "What can I cook with this?"
            </span>
            <br />" We leverage the power of Gemini's advanced language models
            to understand ingredients, flavors, and cooking techniques deeply.
            Unlike traditional recipe sites, we don't just search a database we
            generate custom instructions tailored to your kitchen's reality.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-4 place-items-center">
          {aboutBanners.map((banner, index) => (
            <div
              key={index}
              className="bg-orange-200/10 backdrop-blur-sm rounded-xl border border-orange-300/40 shadow-lg p-4 flex flex-col justify-center items-center text-center size-37.5 md:size-50 gap-2"
            >
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary">
                {banner.title}
              </h2>
              <p className="text-muted-foreground text-sm">{banner.desc}</p>
            </div>
          ))}
        </div>

        <div className="my-4">
          <h1 className="text-4xl font-bold text-center text-primary/90">
            Why Pika Smart?
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            We blend culinary expertise with advanced AI to make home cooking
            simpler, faster, and more fun.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 p-4">
          {whyPikaSmart.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 flex flex-col items-start p-4 bg-orange-200/10 backdrop-blur-sm rounded-xl border border-orange-300/40 shadow-lg gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-amber-500 bg-orange-200/60 flex justify-center items-center shadow-md shadow-orange-400/20">
                <item.icon
                  size={32}
                  fill="orange"
                  className=" text-orange-500"
                />
              </div>
              <h3 className="text-xl font-bold text-primary text-center">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-start">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-24 bg-gray-900 relative max-w-6xl mx-auto"
        id="cta"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-orange-50 mb-6">
            Ready to upgrade your kitchen?
          </h2>
          <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto mb-10">
            Join thousands of foodies creating magic with Pika Smart today. Free
            to start, delicious forever.
          </p>
          <div className="w-3/4 mx-auto flex flex-row justify-center items-center gap-4">
            <Button className="w-1/2 bg-orange-500 hover:bg-orange-600 text-primary font-bold transition-all shadow-lg shadow-orange-500/25 cursor-pointer">
              Start Generating Free
            </Button>
            <Button
              variant="outline"
              className="w-1/2 text-primary font-bold backdrop-blur-sm transition-all border border-orange-400 cursor-pointer"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthHomepage;
