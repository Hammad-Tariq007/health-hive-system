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
  },
  {
    id: "3",
    title: "Mediterranean Lifestyle Diet",
    description: "A heart-healthy eating plan based on traditional foods from Mediterranean countries, rich in vegetables, fruits, whole grains, and healthy fats.",
    goal: "maintenance",
    dietType: "mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 2200,
    macros: {
      protein: 100,
      carbs: 275,
      fat: 85
    },
    meals: [
      {
        id: "3-1",
        name: "Breakfast",
        time: "8:00 AM",
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 15,
        ingredients: [
          "1 cup Greek yogurt",
          "1 tbsp honey",
          "1/4 cup granola",
          "1/2 cup mixed berries",
          "1 tbsp chopped walnuts",
          "1 tsp cinnamon"
        ],
        instructions: "Mix yogurt with honey, top with granola, berries, and walnuts. Sprinkle with cinnamon."
      },
      {
        id: "3-2",
        name: "Morning Snack",
        time: "10:30 AM",
        calories: 200,
        protein: 5,
        carbs: 30,
        fat: 7,
        ingredients: [
          "1 medium apple",
          "10 almonds",
          "1 tsp honey"
        ],
        instructions: "Enjoy almonds with apple slices drizzled with a touch of honey."
      },
      {
        id: "3-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 650,
        protein: 35,
        carbs: 70,
        fat: 25,
        ingredients: [
          "2 whole grain pita pockets",
          "3 oz grilled chicken",
          "2 tbsp hummus",
          "1/2 cucumber, sliced",
          "1/2 cup cherry tomatoes",
          "1/4 cup feta cheese",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "Fresh herbs (mint, parsley)"
        ],
        instructions: "Fill pita pockets with chicken, vegetables, and feta. Drizzle with olive oil and lemon juice, and sprinkle with herbs."
      },
      {
        id: "3-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 7,
        carbs: 30,
        fat: 8,
        ingredients: [
          "1/4 cup hummus",
          "2 cups vegetable sticks (carrots, celery, bell peppers)",
          "5 olives"
        ],
        instructions: "Serve vegetables with hummus and olives for dipping."
      },
      {
        id: "3-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        protein: 38,
        carbs: 80,
        fat: 30,
        ingredients: [
          "5 oz baked salmon",
          "1 cup quinoa",
          "2 cups roasted vegetables (zucchini, eggplant, bell peppers)",
          "2 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "1 clove garlic, minced",
          "Fresh herbs (basil, oregano)",
          "Lemon wedges"
        ],
        instructions: "Season salmon with herbs and bake. Cook quinoa according to package instructions. Toss vegetables with olive oil, balsamic, and garlic before roasting. Serve with lemon wedges."
      }
    ],
    createdBy: "Nutritionist Elena"
  },
  {
    id: "4",
    title: "Plant-Based Power Diet",
    description: "A nutrient-dense vegan meal plan designed to support athletic performance and recovery while providing all essential nutrients from plant sources.",
    goal: "performance",
    dietType: "vegan",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1484&auto=format&fit=crop",
    totalCalories: 2600,
    macros: {
      protein: 120,
      carbs: 370,
      fat: 65
    },
    meals: [
      {
        id: "4-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 600,
        protein: 25,
        carbs: 90,
        fat: 15,
        ingredients: [
          "1 cup rolled oats",
          "2 tbsp chia seeds",
          "1 scoop plant protein powder",
          "1 banana, sliced",
          "2 tbsp almond butter",
          "1/4 cup blueberries",
          "1 cup almond milk",
          "1 tsp cinnamon",
          "1 tbsp maple syrup"
        ],
        instructions: "Cook oats with almond milk, stir in protein powder, chia seeds, and cinnamon. Top with banana, blueberries, almond butter, and maple syrup."
      },
      {
        id: "4-2",
        name: "Pre-Workout Snack",
        time: "10:00 AM",
        calories: 250,
        protein: 10,
        carbs: 45,
        fat: 5,
        ingredients: [
          "1 banana",
          "2 dates",
          "1 tbsp hemp seeds",
          "1 cup coconut water"
        ],
        instructions: "Blend all ingredients for a smoothie or enjoy separately."
      },
      {
        id: "4-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 750,
        protein: 35,
        carbs: 100,
        fat: 20,
        ingredients: [
          "1 cup lentils",
          "1 cup quinoa",
          "2 cups mixed vegetables (kale, sweet potato, broccoli)",
          "1/2 avocado",
          "2 tbsp nutritional yeast",
          "2 tbsp tahini",
          "1 tbsp olive oil",
          "Lemon juice, herbs, and spices"
        ],
        instructions: "Cook lentils and quinoa. Roast vegetables with olive oil and spices. Mix all ingredients and drizzle with tahini sauce (tahini, lemon juice, water, garlic)."
      },
      {
        id: "4-4",
        name: "Post-Workout",
        time: "4:30 PM",
        calories: 300,
        protein: 20,
        carbs: 45,
        fat: 5,
        ingredients: [
          "1 scoop plant protein powder",
          "1 cup berries",
          "1 cup almond milk",
          "1 tbsp flaxseed",
          "1/2 cup spinach",
          "Ice cubes"
        ],
        instructions: "Blend all ingredients into a recovery smoothie."
      },
      {
        id: "4-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        protein: 30,
        carbs: 90,
        fat: 20,
        ingredients: [
          "8 oz extra firm tofu",
          "1 cup brown rice",
          "2 cups stir-fried vegetables",
          "2 tbsp tamari or soy sauce",
          "1 tbsp sesame oil",
          "1 tbsp ginger, minced",
          "2 cloves garlic, minced",
          "1/4 cup cashews",
          "Green onions for garnish"
        ],
        instructions: "Press and cube tofu, marinate in tamari, then bake until crispy. Cook rice according to package. Stir-fry vegetables with ginger and garlic, add tofu, then toss with sesame oil. Serve over rice and top with cashews and green onions."
      }
    ],
    createdBy: "Vegan Nutritionist James"
  },
  {
    id: "5",
    title: "Ketogenic Fat Loss Plan",
    description: "A low-carb, high-fat diet designed to shift your body into ketosis for efficient fat burning and sustained energy.",
    goal: "weightLoss",
    dietType: "keto",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 1800,
    macros: {
      protein: 120,
      carbs: 30,
      fat: 140
    },
    meals: [
      {
        id: "5-1",
        name: "Breakfast",
        time: "8:00 AM",
        calories: 450,
        protein: 25,
        carbs: 5,
        fat: 35,
        ingredients: [
          "3 eggs",
          "2 tbsp butter",
          "1 oz cheese",
          "1/2 avocado",
          "1 cup spinach",
          "Salt, pepper, and herbs"
        ],
        instructions: "Cook spinach in butter, add beaten eggs and cheese to make an omelet. Serve with sliced avocado."
      },
      {
        id: "5-2",
        name: "Mid-Morning Snack",
        time: "11:00 AM",
        calories: 200,
        protein: 5,
        carbs: 2,
        fat: 20,
        ingredients: [
          "1 oz macadamia nuts",
          "1 oz cheese"
        ],
        instructions: "Enjoy nuts and cheese together."
      },
      {
        id: "5-3",
        name: "Lunch",
        time: "1:30 PM",
        calories: 500,
        protein: 35,
        carbs: 8,
        fat: 35,
        ingredients: [
          "5 oz grilled chicken thigh",
          "2 cups mixed greens",
          "1/4 cup cucumber",
          "2 tbsp olive oil",
          "1 tbsp apple cider vinegar",
          "1 oz feta cheese",
          "10 olives",
          "Salt, pepper, and herbs"
        ],
        instructions: "Prepare salad with mixed greens, cucumber, feta, and olives. Top with grilled chicken and dress with olive oil and vinegar."
      },
      {
        id: "5-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 150,
        protein: 10,
        carbs: 2,
        fat: 12,
        ingredients: [
          "1/4 cup guacamole",
          "Celery sticks",
          "2 slices of bacon, cooked crisp"
        ],
        instructions: "Use celery sticks to scoop guacamole, enjoy with bacon strips."
      },
      {
        id: "5-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 500,
        protein: 45,
        carbs: 13,
        fat: 38,
        ingredients: [
          "6 oz salmon fillet",
          "1 cup broccoli",
          "1 cup cauliflower rice",
          "2 tbsp butter",
          "1 clove garlic, minced",
          "Lemon wedges",
          "Salt, pepper, and herbs"
        ],
        instructions: "Pan-sear salmon in butter with garlic. Steam broccoli and sauté cauliflower rice in remaining butter. Serve with lemon wedges."
      }
    ],
    createdBy: "Keto Specialist Dr. Brown"
  }
];
