
export interface MealPlan {
  id: string;
  title: string;
  description: string;
  goal: "weightLoss" | "muscleGain" | "maintenance" | "performance";
  dietType: "standard" | "vegan" | "vegetarian" | "keto" | "paleo" | "mediterranean";
  image: string;
  totalCalories: number;
  macros: {
    protein: number; // in grams
    carbs: number; // in grams
    fat: number; // in grams
  };
  meals: Meal[];
  createdBy: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions?: string;
  image?: string;
}

export const mealPlans: MealPlan[] = [
  {
    id: "1",
    title: "Fat Loss Meal Plan",
    description: "A calorie-controlled plan focused on high protein intake to preserve muscle while losing fat.",
    goal: "weightLoss",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 1800,
    macros: {
      protein: 150,
      carbs: 150,
      fat: 60
    },
    meals: [
      {
        id: "1-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 400,
        protein: 30,
        carbs: 30,
        fat: 15,
        ingredients: [
          "3 egg whites",
          "1 whole egg",
          "1/2 cup oatmeal",
          "1 cup berries",
          "1 tbsp almond butter"
        ],
        instructions: "Cook the eggs and serve with oatmeal topped with berries and almond butter."
      },
      {
        id: "1-2",
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 200,
        protein: 20,
        carbs: 15,
        fat: 5,
        ingredients: [
          "1 scoop protein powder",
          "1 medium apple",
          "Water"
        ],
        instructions: "Mix protein powder with water and enjoy with an apple."
      },
      {
        id: "1-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 500,
        protein: 40,
        carbs: 45,
        fat: 15,
        ingredients: [
          "5 oz grilled chicken breast",
          "1 cup brown rice",
          "2 cups mixed vegetables",
          "1 tbsp olive oil"
        ],
        instructions: "Season chicken with herbs and grill. Serve with brown rice and vegetables sautéed in olive oil."
      },
      {
        id: "1-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 15,
        carbs: 20,
        fat: 5,
        ingredients: [
          "1 cup Greek yogurt",
          "1/4 cup granola",
          "1/2 tbsp honey"
        ],
        instructions: "Mix all ingredients together."
      },
      {
        id: "1-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 500,
        protein: 45,
        carbs: 40,
        fat: 20,
        ingredients: [
          "6 oz salmon fillet",
          "1 medium sweet potato",
          "2 cups salad greens",
          "1 tbsp balsamic vinaigrette"
        ],
        instructions: "Bake salmon and sweet potato. Serve with salad dressed with balsamic vinaigrette."
      }
    ],
    createdBy: "Nutritionist Lisa"
  },
  {
    id: "2",
    title: "Muscle Building Plan",
    description: "A high-calorie plan focused on providing ample protein and carbs to fuel muscle growth.",
    goal: "muscleGain",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1469&auto=format&fit=crop",
    totalCalories: 3200,
    macros: {
      protein: 200,
      carbs: 400,
      fat: 90
    },
    meals: [
      {
        id: "2-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 700,
        protein: 40,
        carbs: 80,
        fat: 20,
        ingredients: [
          "3 whole eggs",
          "4 egg whites",
          "2 cups oatmeal",
          "1 banana",
          "2 tbsp peanut butter",
          "1 cup milk"
        ],
        instructions: "Scramble eggs. Cook oatmeal with milk and top with sliced banana and peanut butter."
      },
      {
        id: "2-2",
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 500,
        protein: 30,
        carbs: 60,
        fat: 10,
        ingredients: [
          "2 scoops protein powder",
          "1 cup Greek yogurt",
          "1 cup berries",
          "1/4 cup granola",
          "1 tbsp honey"
        ],
        instructions: "Mix all ingredients together."
      },
      {
        id: "2-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 800,
        protein: 50,
        carbs: 100,
        fat: 20,
        ingredients: [
          "8 oz lean ground beef",
          "2 cups brown rice",
          "1 cup black beans",
          "1 cup vegetables",
          "1 avocado",
          "2 tbsp salsa"
        ],
        instructions: "Cook beef and serve with rice, beans, vegetables, and sliced avocado. Top with salsa."
      },
      {
        id: "2-4",
        name: "Pre-Workout Snack",
        time: "4:00 PM",
        calories: 300,
        protein: 20,
        carbs: 40,
        fat: 5,
        ingredients: [
          "1 banana",
          "1 scoop protein powder",
          "1 cup almond milk",
          "1/4 cup rolled oats"
        ],
        instructions: "Blend all ingredients together into a smoothie."
      },
      {
        id: "2-5",
        name: "Post-Workout",
        time: "6:30 PM",
        calories: 400,
        protein: 30,
        carbs: 50,
        fat: 5,
        ingredients: [
          "2 scoops protein powder",
          "1 banana",
          "2 cups water",
          "1/4 cup dextrose"
        ],
        instructions: "Mix all ingredients together in a shaker."
      },
      {
        id: "2-6",
        name: "Dinner",
        time: "8:00 PM",
        calories: 500,
        protein: 40,
        carbs: 50,
        fat: 15,
        ingredients: [
          "8 oz chicken breast",
          "2 cups sweet potato",
          "2 cups broccoli",
          "1 tbsp olive oil",
          "Herbs and spices"
        ],
        instructions: "Season chicken with herbs and bake. Serve with baked sweet potato and steamed broccoli drizzled with olive oil."
      }
    ],
    createdBy: "Nutritionist Mark"
  }
];
