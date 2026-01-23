import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const CreateRecipePage = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

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

  const handleGenerateRecipe = () => {};

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
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  View your key metrics and recent project activity. Track
                  progress across all your active projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full border border-gray-400/40 rounded rounded-lg focus-within:ring-2 focus-within:ring-orange-400">
                  <div className="p-4">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      {ingredients.map((ing, idx) => (
                        <Badge className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100 animate-scale-in">
                          {ing}
                          <button
                            onClick={() => removeIngredient(idx)}
                            className="ml-1.5 hover:text-green-900"
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
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget-only">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track performance and user engagement metrics. Monitor trends
                  and identify growth opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Page views are up 25% compared to last month.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="both">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download your detailed reports. Export data in
                  multiple formats for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                You have 5 reports ready and available to export.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default CreateRecipePage;
