import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Camera, Clock, Clock1, Heart, Trash2, Users } from "lucide-react";

const FullRecipePage = () => {
  const mockRecipe = {
    _id: "69763f8d513e1de7830763b2",
    title: "Creamy Maize Porridge (Uji wa Unga na Maziwa)",
    description:
      "A wholesome, simple, and comforting Kenyan-style porridge, made with maize flour and milk. Perfect for a nourishing breakfast or a light, warm meal.",

    ingredients: [
      {
        name: "Maize Flour",
        quantity: "1",
        unit: "cup",
      },
      {
        name: "Milk",
        quantity: "3",
        unit: "cups",
      },
      {
        name: "Salt",
        quantity: "0.25",
        unit: "teaspoon",
      },
      {
        name: "Cooking Oil",
        quantity: "1",
        unit: "teaspoon",
      },
    ],

    instructions: [
      "In a small bowl, whisk together 1/4 cup of maize flour with 1/2 cup of cold milk to form a smooth, lump-free paste. Set aside.",
      "Pour the remaining 2.5 cups of milk into a medium-sized sufuria (pot) and bring it to a gentle simmer over medium heat.",
      "Once the milk is simmering, slowly pour in the maize flour paste from step 1 while continuously whisking vigorously to prevent any lumps from forming.",
      "Add the salt to the porridge and continue stirring.",
      "Reduce the heat to low and allow the porridge to cook, stirring occasionally, for 10-15 minutes, or until it reaches your desired thickness and is cooked through.",
      "Serve the Creamy Maize Porridge hot. (Note: The cooking oil is listed as an essential kitchen item as per instructions, but is not typically added directly to this type of porridge.)",
    ],

    prep_time: 5,
    cook_time: 15,
    servings: 2,
    generated_by_AI: true,

    createdAt: "2026-01-25T16:06:37.190Z",
    updatedAt: "2026-01-25T16:06:37.190Z",

    __v: 0,
  };

  return (
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
          <Heart size={16} className="text-white" />
        </span>
      </div>

      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold">{mockRecipe.title}</h1>
        <p className="text-primary/80 text-sm">{mockRecipe.description}</p>
      </div>

      <div className="flex border border-primary/20 shadow-sm shadow-primary/10 rounded-lg overflow-hidden">
        <div className="flex-1 p-4 flex gap-2 items-center justify-center border-r border-primary/20">
          <Clock size={22} className="text-orange-500" />
          <span className="text-xs text-primary font-medium uppercase">
            Prep Time :
          </span>
          <span className="text-sm font-bold text-primary">
            {mockRecipe.prep_time} mins
          </span>
        </div>
        <div className="flex-1 p-4 flex gap-2 items-center justify-center border-r border-primary/20">
          <Clock1 size={22} className="text-orange-500" />
          <span className="text-xs text-primary font-medium uppercase">
            Cook Time :
          </span>
          <span className="text-sm font-bold text-primary">
            {mockRecipe.cook_time} mins
          </span>
        </div>
        <div className="flex-1 p-4 flex gap-2 items-center justify-center">
          <Users size={22} className="text-orange-500" />
          <span className="text-xs text-primary font-medium uppercase">
            Serves :
          </span>
          <span className="text-sm font-bold text-primary">
            {mockRecipe.servings}
          </span>
        </div>
      </div>

      <div className="w-full flex gap-4 flex-col md:flex-row">
        <div className="flex-1 w-full lg:w-1/2 border border-primary/20 shadow-sm shadow-primary/10 rounded-lg overflow-hidden px-4 py-2.5">
          <h1 className="text-primary/80 font-semibold">Ingredients</h1>
          <Separator className="my-3" />

          <ul className="space-y-2 mb-8">
            {mockRecipe.ingredients.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-primary/80">
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
            {mockRecipe.instructions.map((step, idx) => (
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
          className="font-bold flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-400/80 cursor-pointer transition duration-200"
          title="favourite"
        >
          <Heart /> Favorite Recipe
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
          {format(mockRecipe?.createdAt, "dd MMMM, yyyy")}.
        </span>
      </div>
    </div>
  );
};

export default FullRecipePage;
