import AIGeneratingRecipeLoader from "@/components/loaders/ai-generating-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CalendarClock,
  ChefHat,
  Clock,
  Clock1,
  Plus,
  Stars,
  Users,
  X,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const CreateRecipePage = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient();
    }
  };

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients?.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue("");
    }
  };

  const removeIngredient = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const isSubmitting = false;

  // const handleGenerateRecipe = () => {};

  return (
    <div className="w-full py-2 space-y-6">
      <div className="w-full flex justify-center items-center flex-col space-y-0.5">
        <h1 className="text-2xl md:text-3xl font-bold text-primary/90 text-center tracking-normal">
          What's in your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">
            kitchen right now?
          </span>
        </h1>
        <p className="text-sm text-secondary-foreground/80">
          Turn your leftover ingredients into a delicious Kenyan meal in
          seconds.
        </p>
      </div>
      <Separator />
      <section className="w-full rounded-2xl border border-primary/10 shadow-sm shadow-primary/20 p-4 space-y-2">
        <h1 className="text-primary/80 text-sm font-semibold">
          Select How you would like to generate you recipe:{" "}
        </h1>
        <Tabs defaultValue="ingredients-only" className="w-full">
          <TabsList>
            <TabsTrigger value="ingredients-only">Ingredients only</TabsTrigger>
            <TabsTrigger value="budget-only">Budget only</TabsTrigger>
            <TabsTrigger value="both">Ingredients and Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients-only">
            {isSubmitting ? (
              <Card className="gap-2">
                <CardHeader className="flex justify-center items-center">
                  <AIGeneratingRecipeLoader color="oklch(70.5% 0.213 47.604)" />
                </CardHeader>
                <CardContent>
                  <h4 className="text-primary/60 text-center text-sm animate-pulse">
                    Please wait for pika smart chef cook your recipe...
                  </h4>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Enter your ingredients</CardTitle>
                  <CardDescription>
                    Enter the list of ingredients you have in your kitchen that
                    you would like to use in your recipe.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="w-full border border-gray-400/40 rounded-lg focus-within:ring-2 focus-within:ring-orange-400">
                    <div className="p-4">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        {ingredients.map((ing, idx) => (
                          <Badge className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100 animate-scale-in">
                            {ing}
                            <button
                              onClick={() => removeIngredient(idx)}
                              className="ml-1.5 hover:text-green-900 cursor-pointer"
                            >
                              <X size={14} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={
                            ingredients.length === 0
                              ? "e.g. eggs, tomatoes, dhania..."
                              : "Add another..."
                          }
                          className="flex-1 bg-transparent outline-none text-primary placeholder:text-primary/40 text-lg"
                        />
                        <button
                          onClick={addIngredient}
                          disabled={!inputValue.trim()}
                          className="p-2 bg-orange-600 rounded-full text-primary hover:text-primary/60 hover:bg-orange-600/80 disabled:opacity-50 disabled:hover:bg-orang-600/95 disabled:hover:text-primary/40 transition-colors duration-200 cursor-pointer"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || ingredients.length === 0}
                    className="w-full bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    size={"icon-lg"}
                  >
                    <LoadingSwap
                      isLoading={isSubmitting}
                      className="text-white font-bold flex items-center justify-center gap-1.5 p-4"
                    >
                      <Stars size={20} /> Generate Recipe
                    </LoadingSwap>
                  </Button>
                </CardContent>

                {recipe && recipe !== null && <Separator />}

                {recipe && recipe !== null && (
                  <CardContent className="p-2 md:p-4 lg:p-6">
                    {" "}
                    <div className="h-fit bg-linear-to-br from-orange-600 to-orange-800 p-2 flex flex-col justify-end relative overflow-hidden rounded-t-2xl">
                      <div className="absolute top-0 right-0 p-10 opacity-10 transform rotate-12">
                        <ChefHat size={120} color="white" />
                      </div>
                      <div className="relative z-10">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                          Match: 95%
                        </span>
                        <h2 className="text-2xl font-bold text-white leading-tight">
                          {recipe.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex border-b border-primary">
                      <div className="flex-1 p-4 flex flex-col items-center justify-center border-r border-primary">
                        <Clock size={18} className="text-orange-500 mb-1" />
                        <span className="text-xs text-primary font-medium uppercase">
                          Prep
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {recipe.prep_time} mins
                        </span>
                      </div>
                      <div className="flex-1 p-4 flex flex-col items-center justify-center border-r border-primary">
                        <Clock1 size={18} className="text-orange-500 mb-1" />
                        <span className="text-xs text-primary font-medium uppercase">
                          Cook
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {recipe.cook_time} mins
                        </span>
                      </div>
                      <div className="flex-1 p-4 flex flex-col items-center justify-center">
                        <Users size={18} className="text-orange-500 mb-1" />
                        <span className="text-xs text-primary font-medium uppercase">
                          Serves
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {recipe.servings}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-primary/80 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        Ingredients
                      </h3>
                      <ul className="space-y-2 mb-8">
                        {recipe.ingredients.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-primary/80"
                          >
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                            <span
                              className={
                                ingredients.some((i) =>
                                  item.name.toLowerCase().includes(i),
                                )
                                  ? "font-medium text-primary/90"
                                  : ""
                              }
                            >
                              {item.quantity} {item.unit} of {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="font-bold text-primary/80 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        Instructions
                      </h3>
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

                      {/* Chef's Tip */}
                      {/* <div className="mt-8 bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <p className="text-amber-800 text-sm italic">
                          <span className="font-bold not-italic">
                            💡 Chef's Tip:{" "}
                          </span>
                          {recipe.tip}
                        </p>
                      </div> */}

                      <div className="p-4 w-full relative">
                        <Button className="text-sm font-medium bg-orange-600 hover:bg-orange-600/80 flex items-center justify-center gap-1 mx-auto transition duration-200 cursor-pointer absolute right-1">
                          Save this Recipe <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}

                {!recipe && !isSubmitting && (
                  <div
                    className="mt-6 text-center animate-fade-in-delayed"
                    style={{
                      animationDelay: "0.3s",
                      animationFillMode: "forwards",
                    }}
                  >
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                      Trending in Kenya
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => {
                          setIngredients([
                            "maize flour",
                            "sukuma wiki",
                            "beef",
                          ]);
                        }}
                        className="px-4 py-2 rounded-full shadow-sm text-sm text-primary hover:text-orange-600 border border-primary/60 hover:border-orange-200 transition-all"
                      >
                        Ugali & Sukuma
                      </button>
                      <button
                        onClick={() => {
                          setIngredients([
                            "eggs",
                            "onions",
                            "tomatoes",
                            "dhania",
                          ]);
                        }}
                        className="px-4 py-2 rounded-full shadow-sm text-sm text-primary hover:text-orange-600 border border-primary/60 hover:border-orange-200 transition-all"
                      >
                        Spanish Omelette
                      </button>
                      <button
                        onClick={() => {
                          setIngredients([
                            "wheat flour",
                            "Ndengu",
                            "carrots",
                            "dhania",
                            "tomatoes",
                          ]);
                        }}
                        className="px-4 py-2 rounded-full shadow-sm text-sm text-primary hover:text-orange-600 border border-primary/60 hover:border-orange-200 transition-all"
                      >
                        Chapati & Ndengu
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </TabsContent>
          <TabsContent value="budget-only">
            <Empty className="border border-dashed gap-1">
              <EmptyHeader className="mb-1.5">
                <EmptyMedia variant="icon">
                  <CalendarClock />
                </EmptyMedia>
                <EmptyTitle>Feature Coming Soon</EmptyTitle>
                <EmptyDescription>
                  This feature is under development. It will be out soon
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </TabsContent>
          <TabsContent value="both">
            <Empty className="border border-dashed gap-1">
              <EmptyHeader className="mb-1.5">
                <EmptyMedia variant="icon">
                  <CalendarClock />
                </EmptyMedia>
                <EmptyTitle>Feature Coming Soon</EmptyTitle>
                <EmptyDescription>
                  This feature is under development. It will be out soon
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default CreateRecipePage;
