# 🍲 PikaSmart Client

PikaSmart Client is a **modern, responsive web application** that allows users to generate **simple, affordable Kenyan recipes** based on the ingredients they have and their available budget.

The application consumes the **PikaSmart API**, which is powered by **Google Gemini Pro**, to generate realistic home-cooked meals tailored for Kenyan households and students.

---

## 🚀 Features

- 🥘 Enter available ingredients
- 💰 Specify a cooking budget (KES)
- 🤖 AI-generated Kenyan-friendly recipes
- ⚡ Real-time recipe generation
- 🎨 Clean, modern, responsive UI
- 📱 Mobile-friendly design

---

## 🛠 Tech Stack

- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks / tanstack query
- **API Communication:** Fetch / Axios
- **AI Backend:** PikaSmart API (Gemini Flash)

---

## 🎯 Target Users

- University students
- Budget-conscious households
- Anyone unsure what to cook with available ingredients
- Food-tech and AI experimenters

---

## 📦 How It Works

1. User enters ingredients they have
2. User sets a budget amount
3. App sends data to PikaSmart API
4. AI generates a suitable Kenyan recipe
5. Recipe is displayed instantly to the user

---

## 🔌 API Integration Example

```ts
const generateRecipe = async () => {
  const res = await fetch("http://localhost:5000/api/recipe/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: [
        { name: "rice", quantity: 2, unit: "cups" },
        { name: "eggs", quantity: 3, unit: "pieces" }
      ],
      budget: 300,
    }),
  });

  const data = await res.json();
  console.log(data);
};
```
---
## Enviroment Setup

```.env
VITE_API_BASE_URL=http://localhost:5173
```
---
## Running the project locally

### Clone the repository
```
git clone https://github.com/gnjohnny/pika-smart-client.git
```
### After a success clone run this command
```
pnpm install
pnpm dev
```
#END
