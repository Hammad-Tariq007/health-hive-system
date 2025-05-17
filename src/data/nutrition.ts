
export interface MealPlan {
  id: string;
  title: string;
  description: string;
  goal: "weightLoss" | "muscleGain" | "maintenance" | "performance";
  dietType: "standard" | "vegan" | "vegetarian" | "keto" | "paleo" | "mediterranean" | "lowCarb" | "intermittentFasting";
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
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=1374&auto=format&fit=crop",
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
  },
  {
    id: "6",
    title: "Intermittent Fasting Plan",
    description: "A time-restricted eating approach that cycles between periods of fasting and eating to enhance fat loss and metabolic health.",
    goal: "weightLoss",
    dietType: "intermittentFasting",
    image: "https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?q=80&w=1632&auto=format&fit=crop",
    totalCalories: 1900,
    macros: {
      protein: 140,
      carbs: 160,
      fat: 75
    },
    meals: [
      {
        id: "6-1",
        name: "First Meal (12:00 PM)",
        time: "12:00 PM",
        calories: 600,
        protein: 40,
        carbs: 60,
        fat: 25,
        ingredients: [
          "5 oz grilled chicken breast",
          "1.5 cups quinoa",
          "2 cups mixed vegetables",
          "1 tbsp olive oil",
          "Lemon juice",
          "Fresh herbs",
          "1 medium apple"
        ],
        instructions: "Break your fast with this balanced meal. Combine grilled chicken with quinoa and sautéed vegetables. Dress with olive oil and lemon juice. Enjoy apple as dessert."
      },
      {
        id: "6-2",
        name: "Afternoon Snack",
        time: "3:00 PM",
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        ingredients: [
          "1 cup Greek yogurt",
          "1/4 cup berries",
          "1 tbsp honey",
          "2 tbsp walnuts",
          "1 tsp cinnamon"
        ],
        instructions: "Mix Greek yogurt with berries, honey, and walnuts. Sprinkle with cinnamon."
      },
      {
        id: "6-3",
        name: "Dinner (Last Meal)",
        time: "7:30 PM",
        calories: 1000,
        protein: 80,
        carbs: 70,
        fat: 40,
        ingredients: [
          "8 oz salmon fillet",
          "1.5 cups sweet potato, cubed",
          "2 cups roasted Brussels sprouts",
          "2 tbsp olive oil",
          "1 avocado",
          "2 tbsp balsamic glaze",
          "Spices and herbs"
        ],
        instructions: "Bake salmon with herbs and spices. Roast sweet potato cubes and Brussels sprouts with olive oil. Serve with sliced avocado and drizzle with balsamic glaze. This is your last meal before beginning the 16-hour fasting period."
      }
    ],
    createdBy: "Fasting Expert Jennifer"
  },
  {
    id: "7",
    title: "Paleo Reset Plan",
    description: "A whole-foods approach based on foods presumed to have been available to ancestral humans, focusing on meat, fish, vegetables, and fruits while avoiding processed foods, grains, and dairy.",
    goal: "maintenance",
    dietType: "paleo",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1378&auto=format&fit=crop",
    totalCalories: 2100,
    macros: {
      protein: 150,
      carbs: 120,
      fat: 120
    },
    meals: [
      {
        id: "7-1",
        name: "Breakfast",
        time: "7:30 AM",
        calories: 500,
        protein: 30,
        carbs: 30,
        fat: 30,
        ingredients: [
          "3 eggs",
          "1/4 cup mushrooms",
          "1/4 cup bell peppers",
          "1/2 avocado",
          "1 cup berries",
          "1 tbsp coconut oil",
          "Herbs and spices"
        ],
        instructions: "Sauté mushrooms and peppers in coconut oil. Add eggs and cook until done. Serve with sliced avocado and fresh berries on the side."
      },
      {
        id: "7-2",
        name: "Lunch",
        time: "12:30 PM",
        calories: 650,
        protein: 45,
        carbs: 40,
        fat: 35,
        ingredients: [
          "6 oz grilled steak",
          "3 cups mixed greens",
          "1 cucumber, sliced",
          "10 cherry tomatoes",
          "1/4 cup walnuts",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "1 medium sweet potato"
        ],
        instructions: "Grill steak to desired doneness. Prepare salad with mixed greens, cucumber, tomatoes, and walnuts. Dress with olive oil and lemon juice. Serve with a baked sweet potato."
      },
      {
        id: "7-3",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 250,
        protein: 15,
        carbs: 15,
        fat: 15,
        ingredients: [
          "1/4 cup guacamole",
          "Carrot and celery sticks",
          "2 hard-boiled eggs"
        ],
        instructions: "Enjoy guacamole with vegetable sticks and hard-boiled eggs."
      },
      {
        id: "7-4",
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        protein: 60,
        carbs: 35,
        fat: 40,
        ingredients: [
          "8 oz baked salmon",
          "2 cups roasted broccoli",
          "1 cup roasted cauliflower",
          "2 tbsp olive oil",
          "1 lemon",
          "Fresh dill and parsley",
          "1 tbsp ghee",
          "Salt and pepper"
        ],
        instructions: "Season salmon with herbs, salt, and pepper, and bake until flaky. Roast broccoli and cauliflower with olive oil. Serve with a pat of ghee on vegetables and lemon wedges."
      }
    ],
    createdBy: "Paleo Nutritionist Robert"
  },
  {
    id: "8",
    title: "Low-Carb High-Protein Plan",
    description: "A moderate carb-restricted diet with ample protein to support muscle preservation during weight loss and enhance satiety.",
    goal: "weightLoss",
    dietType: "lowCarb",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1680&auto=format&fit=crop",
    totalCalories: 1750,
    macros: {
      protein: 175,
      carbs: 75,
      fat: 85
    },
    meals: [
      {
        id: "8-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 400,
        protein: 40,
        carbs: 10,
        fat: 22,
        ingredients: [
          "1 cup cottage cheese",
          "3 egg whites",
          "1 whole egg",
          "1/2 cup spinach",
          "1/4 cup bell peppers",
          "2 tsp olive oil",
          "1/4 avocado",
          "Salt, pepper, and herbs"
        ],
        instructions: "Scramble eggs with spinach and peppers in olive oil. Serve with cottage cheese and sliced avocado."
      },
      {
        id: "8-2",
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 200,
        protein: 25,
        carbs: 5,
        fat: 10,
        ingredients: [
          "1 scoop protein powder",
          "1 cup almond milk",
          "1 tbsp almond butter",
          "Ice cubes"
        ],
        instructions: "Blend all ingredients into a smoothie."
      },
      {
        id: "8-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 500,
        protein: 45,
        carbs: 30,
        fat: 25,
        ingredients: [
          "5 oz grilled turkey breast",
          "2 cups mixed greens",
          "1/2 cup cherry tomatoes",
          "1/4 cup cucumber",
          "2 tbsp feta cheese",
          "10 olives",
          "1 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "1/2 cup quinoa"
        ],
        instructions: "Combine mixed greens, tomatoes, cucumber, feta, and olives. Top with grilled turkey. Dress with olive oil and balsamic vinegar. Serve with quinoa on the side."
      },
      {
        id: "8-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 150,
        protein: 15,
        carbs: 10,
        fat: 8,
        ingredients: [
          "2 hard-boiled eggs",
          "1 small apple",
          "Salt and pepper"
        ],
        instructions: "Enjoy hard-boiled eggs with a small apple."
      },
      {
        id: "8-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 500,
        protein: 50,
        carbs: 20,
        fat: 20,
        ingredients: [
          "6 oz lean beef sirloin",
          "2 cups zucchini noodles",
          "1/2 cup cherry tomatoes",
          "2 tbsp olive oil",
          "2 cloves garlic, minced",
          "Fresh basil",
          "2 tbsp grated Parmesan",
          "Salt and pepper"
        ],
        instructions: "Grill sirloin to desired doneness. Sauté zucchini noodles and cherry tomatoes with garlic and olive oil. Top with fresh basil and Parmesan. Serve sirloin alongside."
      }
    ],
    createdBy: "Sports Nutritionist David"
  },
  {
    id: "9",
    title: "Vegetarian Macro Balance",
    description: "A plant-based meal plan that provides balanced macronutrients and complete proteins without meat, designed for vegetarians seeking optimal nutrition.",
    goal: "maintenance",
    dietType: "vegetarian",
    image: "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 2000,
    macros: {
      protein: 100,
      carbs: 250,
      fat: 70
    },
    meals: [
      {
        id: "9-1",
        name: "Breakfast",
        time: "7:30 AM",
        calories: 450,
        protein: 25,
        carbs: 50,
        fat: 20,
        ingredients: [
          "2 eggs",
          "1/2 cup cottage cheese",
          "1 slice whole grain toast",
          "1/2 avocado",
          "1 cup spinach",
          "1 tsp olive oil",
          "Salt and pepper"
        ],
        instructions: "Sauté spinach in olive oil. Scramble eggs and serve with cottage cheese, toast, and sliced avocado."
      },
      {
        id: "9-2",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 250,
        protein: 12,
        carbs: 35,
        fat: 8,
        ingredients: [
          "1 cup Greek yogurt",
          "1/2 cup berries",
          "1 tbsp honey",
          "2 tbsp mixed nuts"
        ],
        instructions: "Mix Greek yogurt with berries and honey. Top with mixed nuts."
      },
      {
        id: "9-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 550,
        protein: 25,
        carbs: 70,
        fat: 20,
        ingredients: [
          "1 cup cooked quinoa",
          "1/2 cup black beans",
          "1/2 cup chickpeas",
          "1 cup roasted vegetables",
          "1/4 cup feta cheese",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "Fresh herbs"
        ],
        instructions: "Combine quinoa, beans, chickpeas, and roasted vegetables in a bowl. Top with feta cheese and dress with olive oil, lemon juice, and herbs."
      },
      {
        id: "9-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 8,
        carbs: 25,
        fat: 7,
        ingredients: [
          "1 medium apple",
          "2 tbsp almond butter"
        ],
        instructions: "Slice apple and enjoy with almond butter."
      },
      {
        id: "9-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 550,
        protein: 30,
        carbs: 70,
        fat: 15,
        ingredients: [
          "1 cup cooked lentil pasta",
          "1.5 cups vegetable marinara sauce",
          "1/4 cup ricotta cheese",
          "2 tbsp grated Parmesan",
          "2 cups mixed green salad",
          "1 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "Fresh basil"
        ],
        instructions: "Cook lentil pasta according to package instructions. Heat marinara sauce and combine with pasta. Top with dollops of ricotta and sprinkle with Parmesan. Serve with a side salad dressed with olive oil and balsamic vinegar."
      }
    ],
    createdBy: "Vegetarian Nutritionist Sophia"
  },
  {
    id: "10",
    title: "High-Volume Eating Plan",
    description: "A low-calorie, high-volume approach that focuses on nutrient-dense foods with high water and fiber content to maximize satiety while minimizing calories.",
    goal: "weightLoss",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 1600,
    macros: {
      protein: 130,
      carbs: 160,
      fat: 45
    },
    meals: [
      {
        id: "10-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 350,
        protein: 30,
        carbs: 40,
        fat: 10,
        ingredients: [
          "1 cup egg whites (about 6 egg whites)",
          "1 whole egg",
          "2 cups spinach",
          "1/2 cup mushrooms",
          "1/4 cup bell peppers",
          "1/2 cup oatmeal",
          "1 tsp olive oil",
          "Herbs and spices"
        ],
        instructions: "Sauté vegetables in olive oil. Add eggs and cook. Serve with oatmeal prepared with water."
      },
      {
        id: "10-2",
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 150,
        protein: 20,
        carbs: 15,
        fat: 2,
        ingredients: [
          "1 cup Greek yogurt (0% fat)",
          "1/2 cup berries",
          "Stevia or monk fruit sweetener (optional)"
        ],
        instructions: "Mix Greek yogurt with berries and sweetener if desired."
      },
      {
        id: "10-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 450,
        protein: 40,
        carbs: 50,
        fat: 10,
        ingredients: [
          "5 oz grilled chicken breast",
          "4 cups mixed greens",
          "1 cup cherry tomatoes",
          "1 cucumber, sliced",
          "1/2 bell pepper, sliced",
          "1/4 cup shredded carrots",
          "2 tbsp low-fat dressing",
          "1/2 cup cooked quinoa"
        ],
        instructions: "Combine all salad ingredients with grilled chicken. Toss with dressing and serve with quinoa on the side."
      },
      {
        id: "10-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 10,
        carbs: 25,
        fat: 8,
        ingredients: [
          "1 medium apple",
          "2 rice cakes",
          "1 tbsp almond butter"
        ],
        instructions: "Spread almond butter on rice cakes and enjoy with sliced apple."
      },
      {
        id: "10-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 450,
        protein: 40,
        carbs: 30,
        fat: 15,
        ingredients: [
          "5 oz white fish (cod, halibut, etc.)",
          "3 cups zucchini noodles",
          "1 cup cherry tomatoes",
          "2 cloves garlic",
          "1 tbsp olive oil",
          "Fresh herbs (basil, parsley)",
          "1 cup cauliflower rice",
          "Lemon wedges",
          "Salt and pepper"
        ],
        instructions: "Season fish with salt, pepper, and herbs, and bake until flaky. Sauté garlic in olive oil, add zucchini noodles and tomatoes, and cook briefly. Steam cauliflower rice. Serve fish over vegetable mixture with cauliflower rice on the side and lemon wedges."
      }
    ],
    createdBy: "Weight Loss Coach Michael"
  },
  {
    id: "11",
    title: "Balanced Macros for Athletes",
    description: "A higher-calorie meal plan with precise macronutrient timing designed to fuel athletic performance, support recovery, and maintain body composition.",
    goal: "performance",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1565299715199-866c917206bb?q=80&w=1481&auto=format&fit=crop",
    totalCalories: 2800,
    macros: {
      protein: 175,
      carbs: 350,
      fat: 75
    },
    meals: [
      {
        id: "11-1",
        name: "Pre-Morning Workout",
        time: "5:30 AM",
        calories: 200,
        protein: 10,
        carbs: 35,
        fat: 2,
        ingredients: [
          "1 banana",
          "1 slice whole grain toast",
          "1 tbsp honey",
          "1 cup black coffee"
        ],
        instructions: "Toast bread, spread with honey, and enjoy with banana and coffee for quick pre-workout energy."
      },
      {
        id: "11-2",
        name: "Post-Workout Breakfast",
        time: "7:30 AM",
        calories: 650,
        protein: 45,
        carbs: 75,
        fat: 15,
        ingredients: [
          "2 whole eggs",
          "4 egg whites",
          "1/2 cup oats",
          "1 cup berries",
          "1 tbsp maple syrup",
          "2 tbsp low-fat Greek yogurt",
          "1 tbsp almond butter",
          "1 cup almond milk",
          "Cinnamon"
        ],
        instructions: "Scramble eggs and egg whites. Cook oats with almond milk and top with berries, Greek yogurt, almond butter, maple syrup, and cinnamon."
      },
      {
        id: "11-3",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 350,
        protein: 25,
        carbs: 45,
        fat: 7,
        ingredients: [
          "1 cup Greek yogurt",
          "1 apple",
          "2 tbsp honey",
          "1/4 cup granola",
          "1 scoop protein powder"
        ],
        instructions: "Mix protein powder with Greek yogurt. Top with diced apple, granola, and honey."
      },
      {
        id: "11-4",
        name: "Lunch",
        time: "1:00 PM",
        calories: 700,
        protein: 45,
        carbs: 80,
        fat: 20,
        ingredients: [
          "6 oz grilled chicken breast",
          "1.5 cups brown rice",
          "1 cup black beans",
          "1 cup roasted vegetables",
          "1/3 avocado",
          "2 tbsp olive oil",
          "1 tbsp lime juice",
          "Fresh cilantro",
          "Salt and pepper"
        ],
        instructions: "Combine rice, beans, and vegetables in a bowl. Top with sliced grilled chicken and avocado. Drizzle with olive oil and lime juice, garnish with cilantro."
      },
      {
        id: "11-5",
        name: "Pre-Evening Workout Snack",
        time: "4:00 PM",
        calories: 300,
        protein: 15,
        carbs: 45,
        fat: 7,
        ingredients: [
          "1 medium banana",
          "2 tbsp peanut butter",
          "1 slice whole grain bread",
          "1 tsp honey"
        ],
        instructions: "Toast bread and spread with peanut butter and honey. Enjoy with banana."
      },
      {
        id: "11-6",
        name: "Post-Workout Dinner",
        time: "7:30 PM",
        calories: 600,
        protein: 45,
        carbs: 70,
        fat: 15,
        ingredients: [
          "6 oz lean beef",
          "2 cups sweet potato",
          "2 cups broccoli",
          "1 tbsp olive oil",
          "2 cloves garlic",
          "Fresh rosemary",
          "Salt and pepper"
        ],
        instructions: "Grill steak to desired doneness. Roast sweet potatoes with olive oil, garlic, and rosemary. Steam broccoli. Serve together for a post-workout recovery meal."
      }
    ],
    createdBy: "Sports Nutritionist Carlos"
  },
  {
    id: "12",
    title: "Anti-Inflammatory Nutrition Plan",
    description: "A whole-foods approach focused on reducing inflammation, supporting immune function, and enhancing recovery through antioxidant-rich foods and healthy fats.",
    goal: "maintenance",
    dietType: "mediterranean",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 2100,
    macros: {
      protein: 110,
      carbs: 230,
      fat: 90
    },
    meals: [
      {
        id: "12-1",
        name: "Breakfast",
        time: "7:30 AM",
        calories: 450,
        protein: 20,
        carbs: 50,
        fat: 20,
        ingredients: [
          "1/2 cup steel-cut oats",
          "1 tbsp ground flaxseed",
          "1 tbsp chia seeds",
          "1/4 cup blueberries",
          "1/4 cup strawberries",
          "2 tbsp walnuts",
          "1 tbsp honey",
          "1 cup almond milk",
          "1/2 tsp cinnamon",
          "1/2 tsp turmeric"
        ],
        instructions: "Cook steel-cut oats with almond milk, flaxseed, chia seeds, cinnamon, and turmeric. Top with berries, walnuts, and honey."
      },
      {
        id: "12-2",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 250,
        protein: 15,
        carbs: 25,
        fat: 10,
        ingredients: [
          "1 cup Greek yogurt",
          "1/4 cup pomegranate seeds",
          "1 tbsp raw honey",
          "2 tbsp pumpkin seeds"
        ],
        instructions: "Mix Greek yogurt with pomegranate seeds and honey. Top with pumpkin seeds."
      },
      {
        id: "12-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 600,
        protein: 35,
        carbs: 60,
        fat: 25,
        ingredients: [
          "4 oz wild-caught salmon",
          "1 cup quinoa",
          "2 cups mixed greens",
          "1/2 avocado",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "2 tbsp extra virgin olive oil",
          "1 tbsp lemon juice",
          "Fresh dill",
          "Salt and pepper"
        ],
        instructions: "Grill or bake salmon with lemon and herbs. Cook quinoa according to package instructions. Prepare salad with mixed greens, avocado, tomatoes, and cucumber. Dress with olive oil and lemon juice. Serve salmon over quinoa and salad."
      },
      {
        id: "12-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 5,
        carbs: 25,
        fat: 10,
        ingredients: [
          "1 medium apple",
          "2 tbsp almond butter",
          "1 tbsp hemp seeds"
        ],
        instructions: "Slice apple and enjoy with almond butter sprinkled with hemp seeds."
      },
      {
        id: "12-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 600,
        protein: 35,
        carbs: 70,
        fat: 25,
        ingredients: [
          "4 oz chicken breast",
          "1 cup sweet potato, cubed",
          "2 cups roasted vegetables (brussels sprouts, carrots, red onion)",
          "2 tbsp olive oil",
          "2 cloves garlic",
          "1 tsp ginger, minced",
          "1 tbsp balsamic vinegar",
          "1 tsp turmeric",
          "Fresh thyme",
          "Salt and pepper"
        ],
        instructions: "Season chicken with turmeric, salt, and pepper, and bake until cooked through. Roast sweet potato cubes and vegetables with olive oil, garlic, ginger, and thyme. Drizzle with balsamic vinegar before serving."
      },
      {
        id: "12-6",
        name: "Evening Treat",
        time: "8:30 PM",
        calories: 100,
        protein: 0,
        carbs: 10,
        fat: 5,
        ingredients: [
          "1 oz dark chocolate (85% cocoa)",
          "1 cup chamomile tea"
        ],
        instructions: "Enjoy dark chocolate with a cup of chamomile tea."
      }
    ],
    createdBy: "Wellness Nutritionist Amelia"
  },
  {
    id: "13",
    title: "Clean Bulking Plan",
    description: "A high-calorie meal plan focused on quality nutrition to support muscle growth while minimizing fat gain, ideal for those looking to increase lean mass.",
    goal: "muscleGain",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1588710920403-89bb8d5aac0d?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 3500,
    macros: {
      protein: 220,
      carbs: 400,
      fat: 100
    },
    meals: [
      {
        id: "13-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 800,
        protein: 50,
        carbs: 80,
        fat: 30,
        ingredients: [
          "4 whole eggs",
          "4 egg whites",
          "1.5 cups oatmeal",
          "1 banana",
          "2 tbsp peanut butter",
          "1 cup milk",
          "1 tbsp honey",
          "Cinnamon"
        ],
        instructions: "Scramble eggs and egg whites. Cook oatmeal with milk, banana slices, and cinnamon. Top oatmeal with peanut butter and honey."
      },
      {
        id: "13-2",
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 500,
        protein: 40,
        carbs: 60,
        fat: 10,
        ingredients: [
          "2 scoops whey protein",
          "1 cup Greek yogurt",
          "1 cup berries",
          "1 cup oats",
          "1 tbsp honey",
          "1 cup almond milk"
        ],
        instructions: "Mix protein powder with Greek yogurt and almond milk. Add oats, berries, and honey."
      },
      {
        id: "13-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 900,
        protein: 60,
        carbs: 100,
        fat: 25,
        ingredients: [
          "8 oz grilled chicken breast",
          "2 cups brown rice",
          "1 cup black beans",
          "1 cup mixed vegetables",
          "1/2 avocado",
          "2 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "Salt, pepper, and herbs"
        ],
        instructions: "Grill chicken with herbs and spices. Serve with brown rice, black beans, mixed vegetables, and sliced avocado. Drizzle with olive oil and balsamic vinegar."
      },
      {
        id: "13-4",
        name: "Pre-Workout Snack",
        time: "4:00 PM",
        calories: 350,
        protein: 20,
        carbs: 50,
        fat: 5,
        ingredients: [
          "1 banana",
          "1 cup rice cakes",
          "1 scoop whey protein",
          "1 cup water",
          "1 tbsp honey"
        ],
        instructions: "Mix protein powder with water. Enjoy with banana, rice cakes, and honey."
      },
      {
        id: "13-5",
        name: "Post-Workout",
        time: "6:30 PM",
        calories: 350,
        protein: 30,
        carbs: 50,
        fat: 0,
        ingredients: [
          "2 scoops whey protein",
          "1 cup water",
          "1 cup pineapple",
          "1 cup watermelon"
        ],
        instructions: "Blend protein powder with water and fruits for a post-workout shake."
      },
      {
        id: "13-6",
        name: "Dinner",
        time: "8:00 PM",
        calories: 600,
        protein: 50,
        carbs: 60,
        fat: 20,
        ingredients: [
          "8 oz lean beef steak",
          "2 medium sweet potatoes",
          "2 cups Brussels sprouts",
          "2 tbsp butter",
          "2 cloves garlic",
          "Fresh rosemary",
          "Salt and pepper"
        ],
        instructions: "Grill steak to desired doneness. Bake sweet potatoes until tender. Roast Brussels sprouts with garlic and butter. Serve together with herbs and seasonings."
      }
    ],
    createdBy: "Strength Coach Brandon"
  },
  {
    id: "14",
    title: "Endurance Athlete Fueling Plan",
    description: "A carbohydrate-focused nutrition plan designed to maximize glycogen stores, maintain energy levels, and support recovery for long-duration endurance activities.",
    goal: "performance",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 3000,
    macros: {
      protein: 150,
      carbs: 450,
      fat: 65
    },
    meals: [
      {
        id: "14-1",
        name: "Early Morning (Pre-Run)",
        time: "5:30 AM",
        calories: 250,
        protein: 5,
        carbs: 50,
        fat: 3,
        ingredients: [
          "1 banana",
          "1 slice white toast",
          "1 tbsp honey",
          "1 cup black coffee"
        ],
        instructions: "Toast bread and spread with honey. Eat with banana and coffee 30-45 minutes before morning run."
      },
      {
        id: "14-2",
        name: "Breakfast (Post-Run)",
        time: "7:30 AM",
        calories: 650,
        protein: 35,
        carbs: 90,
        fat: 15,
        ingredients: [
          "2 cups oatmeal",
          "1 scoop protein powder",
          "1 banana",
          "2 tbsp maple syrup",
          "1/4 cup raisins",
          "2 tbsp almond butter",
          "1 cup almond milk",
          "Cinnamon"
        ],
        instructions: "Cook oatmeal with almond milk. Stir in protein powder once cooled slightly. Top with banana slices, raisins, almond butter, maple syrup, and cinnamon."
      },
      {
        id: "14-3",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 350,
        protein: 10,
        carbs: 60,
        fat: 8,
        ingredients: [
          "1 cup Greek yogurt",
          "1 cup mixed berries",
          "1/4 cup granola",
          "1 tbsp honey",
          "2 tbsp mixed nuts"
        ],
        instructions: "Mix Greek yogurt with berries and honey. Top with granola and mixed nuts."
      },
      {
        id: "14-4",
        name: "Lunch",
        time: "1:00 PM",
        calories: 700,
        protein: 40,
        carbs: 90,
        fat: 20,
        ingredients: [
          "6 oz grilled chicken",
          "2 cups pasta",
          "2 cups mixed vegetables",
          "1 tbsp olive oil",
          "2 tbsp pesto",
          "2 tbsp Parmesan cheese",
          "Fresh basil"
        ],
        instructions: "Cook pasta according to package instructions. Sauté vegetables in olive oil. Combine pasta, vegetables, and grilled chicken. Stir in pesto and top with Parmesan and fresh basil."
      },
      {
        id: "14-5",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 450,
        protein: 20,
        carbs: 70,
        fat: 10,
        ingredients: [
          "1 bagel",
          "2 tbsp jam",
          "1 scoop protein powder",
          "1 cup milk",
          "1 medium apple"
        ],
        instructions: "Toast bagel and spread with jam. Mix protein powder with milk for a shake. Enjoy with apple."
      },
      {
        id: "14-6",
        name: "Dinner",
        time: "7:00 PM",
        calories: 600,
        protein: 40,
        carbs: 80,
        fat: 15,
        ingredients: [
          "6 oz salmon fillet",
          "1.5 cups brown rice",
          "2 cups roasted vegetables",
          "2 tsp olive oil",
          "Lemon juice",
          "Fresh dill",
          "Salt and pepper"
        ],
        instructions: "Season salmon with salt, pepper, and dill, and bake until flaky. Serve with brown rice and roasted vegetables. Drizzle with olive oil and lemon juice."
      },
      {
        id: "14-7",
        name: "Evening Recovery Snack",
        time: "9:00 PM",
        calories: 200,
        protein: 10,
        carbs: 30,
        fat: 3,
        ingredients: [
          "1 cup tart cherry juice",
          "1 scoop collagen protein",
          "1 tbsp honey",
          "Ice"
        ],
        instructions: "Mix tart cherry juice with collagen protein and honey. Pour over ice to aid recovery and sleep."
      }
    ],
    createdBy: "Endurance Coach Emma"
  },
  {
    id: "15",
    title: "High-Protein Vegan Plan",
    description: "A plant-based meal plan strategically designed to provide adequate protein, essential amino acids, and nutrients without animal products, ideal for vegan athletes.",
    goal: "muscleGain",
    dietType: "vegan",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1665&auto=format&fit=crop",
    totalCalories: 2800,
    macros: {
      protein: 160,
      carbs: 350,
      fat: 80
    },
    meals: [
      {
        id: "15-1",
        name: "Breakfast",
        time: "7:00 AM",
        calories: 650,
        protein: 35,
        carbs: 80,
        fat: 20,
        ingredients: [
          "1 block (14 oz) firm tofu",
          "2 tbsp nutritional yeast",
          "1/2 cup spinach",
          "1/4 cup bell peppers",
          "1/4 cup mushrooms",
          "2 tbsp olive oil",
          "1 cup black beans",
          "1 avocado",
          "2 corn tortillas",
          "Spices (turmeric, black salt, pepper, garlic powder)"
        ],
        instructions: "Crumble tofu and sauté with nutritional yeast, vegetables, and spices to create a scramble. Warm beans and tortillas. Serve scramble with beans, sliced avocado, and warm tortillas."
      },
      {
        id: "15-2",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 400,
        protein: 25,
        carbs: 50,
        fat: 10,
        ingredients: [
          "2 scoops vegan protein powder",
          "1 banana",
          "1 cup almond milk",
          "1/4 cup oats",
          "1 tbsp almond butter",
          "1 tbsp ground flaxseed",
          "1 tsp cinnamon",
          "Ice cubes"
        ],
        instructions: "Blend all ingredients into a smoothie."
      },
      {
        id: "15-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 700,
        protein: 40,
        carbs: 80,
        fat: 25,
        ingredients: [
          "1.5 cups lentils, cooked",
          "1 cup quinoa",
          "2 cups mixed vegetables (broccoli, carrots, zucchini)",
          "1/2 avocado",
          "2 tbsp tahini",
          "1 tbsp olive oil",
          "1 tbsp lemon juice",
          "1 clove garlic, minced",
          "Fresh herbs (parsley, cilantro)",
          "Salt and pepper"
        ],
        instructions: "Cook quinoa according to package instructions. Roast vegetables with olive oil, garlic, and herbs. Mix tahini with lemon juice and water to create a sauce. Combine lentils, quinoa, and vegetables in a bowl. Top with sliced avocado and tahini sauce."
      },
      {
        id: "15-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 350,
        protein: 15,
        carbs: 40,
        fat: 15,
        ingredients: [
          "1/4 cup hummus",
          "2 cups raw vegetables (carrots, celery, cucumber)",
          "1 whole grain pita, cut into triangles",
          "1/4 cup mixed nuts and seeds"
        ],
        instructions: "Serve hummus with vegetables and pita triangles. Enjoy nuts and seeds on the side."
      },
      {
        id: "15-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        protein: 45,
        carbs: 80,
        fat: 20,
        ingredients: [
          "1 cup tempeh, cubed",
          "1.5 cups brown rice",
          "2 cups stir-fried vegetables",
          "2 tbsp tamari or soy sauce",
          "1 tbsp sesame oil",
          "1 tbsp rice vinegar",
          "1 tbsp maple syrup",
          "2 cloves garlic, minced",
          "1 tbsp ginger, minced",
          "2 tbsp cashews, chopped",
          "Green onions for garnish"
        ],
        instructions: "Marinate tempeh in a mixture of tamari, sesame oil, rice vinegar, maple syrup, garlic, and ginger. Bake or pan-fry until golden. Cook rice according to package instructions. Stir-fry vegetables with remaining marinade. Serve tempeh over rice and vegetables, topped with cashews and green onions."
      },
      {
        id: "15-6",
        name: "Evening Snack",
        time: "9:00 PM",
        calories: 200,
        protein: 10,
        carbs: 20,
        fat: 10,
        ingredients: [
          "1 cup almond milk",
          "2 tbsp chia seeds",
          "1 tbsp maple syrup",
          "1/4 tsp vanilla extract",
          "1/4 cup berries",
          "1 tbsp chopped walnuts"
        ],
        instructions: "Mix almond milk, chia seeds, maple syrup, and vanilla extract. Refrigerate for at least 15 minutes until thickened. Top with berries and walnuts."
      }
    ],
    createdBy: "Vegan Nutritionist Olivia"
  },
  {
    id: "16",
    title: "Gluten-Free Wellness Plan",
    description: "A nutrient-dense meal plan that eliminates gluten while focusing on whole foods to support digestive health, reduce inflammation, and maintain stable energy.",
    goal: "maintenance",
    dietType: "paleo",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1378&auto=format&fit=crop",
    totalCalories: 2200,
    macros: {
      protein: 120,
      carbs: 230,
      fat: 90
    },
    meals: [
      {
        id: "16-1",
        name: "Breakfast",
        time: "7:30 AM",
        calories: 450,
        protein: 25,
        carbs: 40,
        fat: 20,
        ingredients: [
          "3 eggs",
          "1/4 cup diced bell peppers",
          "1/4 cup diced onions",
          "1/4 cup diced mushrooms",
          "1 cup baby spinach",
          "1 tbsp olive oil",
          "1/2 avocado",
          "1 cup berries",
          "Salt, pepper, and herbs"
        ],
        instructions: "Sauté vegetables in olive oil. Add eggs and cook into an omelet. Serve with sliced avocado and fresh berries on the side."
      },
      {
        id: "16-2",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 250,
        protein: 15,
        carbs: 25,
        fat: 12,
        ingredients: [
          "1 cup Greek yogurt",
          "1/4 cup berries",
          "2 tbsp gluten-free granola",
          "1 tbsp honey",
          "1 tbsp chia seeds"
        ],
        instructions: "Mix Greek yogurt with berries, granola, honey, and chia seeds."
      },
      {
        id: "16-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 600,
        protein: 35,
        carbs: 60,
        fat: 25,
        ingredients: [
          "5 oz grilled chicken breast",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "1/4 cup carrots",
          "1/4 cup radishes",
          "1/2 avocado",
          "2 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "1 cup quinoa",
          "Fresh herbs",
          "Salt and pepper"
        ],
        instructions: "Prepare salad with mixed greens, vegetables, and grilled chicken. Dress with olive oil and balsamic vinegar. Serve with quinoa on the side."
      },
      {
        id: "16-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 10,
        carbs: 20,
        fat: 10,
        ingredients: [
          "1 medium apple",
          "2 tbsp almond butter",
          "1 oz mixed nuts"
        ],
        instructions: "Slice apple and enjoy with almond butter. Have mixed nuts on the side."
      },
      {
        id: "16-5",
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        protein: 35,
        carbs: 75,
        fat: 30,
        ingredients: [
          "5 oz salmon fillet",
          "1.5 cups sweet potato, diced",
          "2 cups roasted vegetables (Brussels sprouts, carrots, parsnips)",
          "2 tbsp olive oil",
          "2 cloves garlic, minced",
          "Fresh rosemary and thyme",
          "1 lemon",
          "Salt and pepper"
        ],
        instructions: "Season salmon with herbs, salt, and pepper, and bake with lemon slices. Roast sweet potato and vegetables with olive oil, garlic, and herbs. Serve salmon with roasted vegetables."
      },
      {
        id: "16-6",
        name: "Evening Treat",
        time: "8:30 PM",
        calories: 150,
        protein: 5,
        carbs: 15,
        fat: 8,
        ingredients: [
          "1/4 cup gluten-free dark chocolate chips",
          "1/4 cup mixed berries",
          "1 cup herbal tea"
        ],
        instructions: "Enjoy dark chocolate chips and berries with a cup of herbal tea."
      }
    ],
    createdBy: "Nutritionist Rebecca"
  },
  {
    id: "17",
    title: "Senior Wellness Nutrition Plan",
    description: "A balanced meal plan designed for adults over 60, focusing on nutrient density, protein adequacy, bone health, and anti-inflammatory foods to support healthy aging.",
    goal: "maintenance",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1571050045051-0c96ac3c5a32?q=80&w=1472&auto=format&fit=crop",
    totalCalories: 1900,
    macros: {
      protein: 100,
      carbs: 215,
      fat: 70
    },
    meals: [
      {
        id: "17-1",
        name: "Breakfast",
        time: "8:00 AM",
        calories: 400,
        protein: 20,
        carbs: 45,
        fat: 15,
        ingredients: [
          "2 eggs",
          "1 slice whole grain toast",
          "1/4 avocado",
          "1/2 cup spinach",
          "1/4 cup mushrooms",
          "1 tsp olive oil",
          "1/2 cup berries",
          "1 tbsp walnuts",
          "Salt and pepper"
        ],
        instructions: "Sauté spinach and mushrooms in olive oil. Scramble eggs and serve with toast, sliced avocado, and berries topped with walnuts."
      },
      {
        id: "17-2",
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 200,
        protein: 10,
        carbs: 25,
        fat: 7,
        ingredients: [
          "1 cup Greek yogurt",
          "1/4 cup berries",
          "1 tbsp honey",
          "1 tbsp ground flaxseed"
        ],
        instructions: "Mix Greek yogurt with berries, honey, and flaxseed."
      },
      {
        id: "17-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 500,
        protein: 30,
        carbs: 55,
        fat: 20,
        ingredients: [
          "4 oz grilled salmon",
          "1 cup quinoa",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "1 tbsp fresh herbs (dill, parsley)",
          "Salt and pepper"
        ],
        instructions: "Grill salmon with lemon and herbs. Prepare salad with mixed greens, tomatoes, and cucumber. Dress with olive oil and lemon juice. Serve salmon over quinoa with salad on the side."
      },
      {
        id: "17-4",
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        protein: 5,
        carbs: 30,
        fat: 8,
        ingredients: [
          "1 medium apple",
          "1 tbsp almond butter",
          "10 almonds"
        ],
        instructions: "Slice apple and enjoy with almond butter. Have almonds on the side."
      },
      {
        id: "17-5",
        name: "Dinner",
        time: "6:30 PM",
        calories: 450,
        protein: 30,
        carbs: 50,
        fat: 15,
        ingredients: [
          "4 oz chicken breast",
          "1 cup sweet potato, cubed",
          "2 cups roasted vegetables (carrots, broccoli, bell peppers)",
          "2 tsp olive oil",
          "1 clove garlic, minced",
          "Fresh thyme and rosemary",
          "Salt and pepper"
        ],
        instructions: "Season chicken with herbs, salt, and pepper, and bake until cooked through. Roast sweet potato cubes and vegetables with olive oil, garlic, and herbs."
      },
      {
        id: "17-6",
        name: "Evening Snack",
        time: "8:00 PM",
        calories: 150,
        protein: 5,
        carbs: 10,
        fat: 10,
        ingredients: [
          "1 cup chamomile tea",
          "1 oz dark chocolate",
          "5 walnuts"
        ],
        instructions: "Enjoy dark chocolate and walnuts with a cup of chamomile tea."
      }
    ],
    createdBy: "Geriatric Nutritionist Dr. Stevens"
  },
  {
    id: "18",
    title: "Performance Recovery Plan",
    description: "A strategic nutrition plan focused on maximizing recovery between intense training sessions, reducing inflammation, and replenishing glycogen while supporting tissue repair.",
    goal: "performance",
    dietType: "standard",
    image: "https://images.unsplash.com/photo-1616279969096-54a228839d9b?q=80&w=1470&auto=format&fit=crop",
    totalCalories: 2700,
    macros: {
      protein: 160,
      carbs: 325,
      fat: 75
    },
    meals: [
      {
        id: "18-1",
        name: "Post-Morning Workout Breakfast",
        time: "7:30 AM",
        calories: 650,
        protein: 40,
        carbs: 80,
        fat: 15,
        ingredients: [
          "2 eggs",
          "4 egg whites",
          "1 cup oatmeal",
          "1 banana",
          "1 tbsp honey",
          "2 tbsp chopped walnuts",
          "1 cup berries",
          "1 cup almond milk",
          "1 tsp cinnamon"
        ],
        instructions: "Scramble eggs and egg whites. Cook oatmeal with almond milk and cinnamon. Top oatmeal with banana slices, berries, walnuts, and honey."
      },
      {
        id: "18-2",
        name: "Mid-Morning Recovery Snack",
        time: "10:30 AM",
        calories: 300,
        protein: 20,
        carbs: 40,
        fat: 5,
        ingredients: [
          "1 scoop whey protein",
          "1 cup tart cherry juice",
          "1 cup spinach",
          "1 cup pineapple",
          "Ice cubes"
        ],
        instructions: "Blend all ingredients into a smoothie to aid recovery and reduce inflammation."
      },
      {
        id: "18-3",
        name: "Lunch",
        time: "1:00 PM",
        calories: 650,
        protein: 40,
        carbs: 70,
        fat: 20,
        ingredients: [
          "5 oz grilled chicken breast",
          "1.5 cups brown rice",
          "1 cup black beans",
          "1/2 avocado",
          "1/4 cup salsa",
          "2 tbsp Greek yogurt",
          "1 cup sautéed vegetables (bell peppers, onions)",
          "Fresh cilantro",
          "Lime wedges",
          "Salt and pepper"
        ],
        instructions: "Grill chicken with lime and seasonings. Serve over brown rice and black beans. Top with sautéed vegetables, sliced avocado, salsa, Greek yogurt, and fresh cilantro."
      },
      {
        id: "18-4",
        name: "Pre-Evening Workout Snack",
        time: "3:30 PM",
        calories: 300,
        protein: 10,
        carbs: 50,
        fat: 5,
        ingredients: [
          "1 banana",
          "2 rice cakes",
          "1 tbsp honey",
          "1 cup green tea with lemon"
        ],
        instructions: "Spread honey on rice cakes. Enjoy with banana and green tea for pre-workout energy."
      },
      {
        id: "18-5",
        name: "Post-Evening Workout Shake",
        time: "6:30 PM",
        calories: 250,
        protein: 25,
        carbs: 35,
        fat: 0,
        ingredients: [
          "1 scoop whey protein isolate",
          "1 cup coconut water",
          "1 cup watermelon",
          "1 tbsp honey",
          "Ice cubes"
        ],
        instructions: "Blend all ingredients for immediate post-workout recovery and hydration."
      },
      {
        id: "18-6",
        name: "Dinner",
        time: "7:30 PM",
        calories: 550,
        protein: 35,
        carbs: 60,
        fat: 20,
        ingredients: [
          "5 oz wild-caught salmon",
          "1.5 cups sweet potato",
          "2 cups steamed broccoli",
          "1 tbsp olive oil",
          "1 tsp turmeric",
          "Fresh dill",
          "Lemon wedges",
          "Salt and pepper"
        ],
        instructions: "Season salmon with dill, salt, and pepper, and bake until flaky. Bake sweet potatoes until tender. Steam broccoli and toss with olive oil and turmeric. Serve with lemon wedges."
      }
    ],
    createdBy: "Sports Recovery Specialist Jason"
  }
];

