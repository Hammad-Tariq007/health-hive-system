
export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: number; // in seconds
  videoUrl?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  category: "strength" | "cardio" | "hiit" | "flexibility" | "fullBody";
  goal: "weightLoss" | "muscleGain" | "endurance" | "toning" | "general";
  image: string;
  exercises: Exercise[];
  createdBy: string;
  rating: number;
  reviews: number;
}

export const workoutPlans: WorkoutPlan[] = [
  {
    id: "1",
    title: "30-Day Fat Burn Challenge",
    description: "An intensive program designed to maximize calorie burn and help you shed unwanted fat in just 30 days.",
    level: "intermediate",
    duration: 45,
    category: "hiit",
    goal: "weightLoss",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "1-1",
        name: "Burpees",
        description: "A full-body exercise that works your arms, chest, quads, glutes, hamstrings, and abs.",
        sets: 3,
        reps: "15",
        restTime: 30,
        videoUrl: "https://www.youtube.com/embed/TU8QYVW0gDU"
      },
      {
        id: "1-2",
        name: "Mountain Climbers",
        description: "A compound exercise that works multiple muscle groups while raising your heart rate.",
        sets: 3,
        reps: "30 seconds",
        restTime: 30
      },
      {
        id: "1-3",
        name: "Jump Squats",
        description: "An explosive exercise that targets your quads, hamstrings, and glutes.",
        sets: 3,
        reps: "20",
        restTime: 30
      },
      {
        id: "1-4",
        name: "Plank to Push-Up",
        description: "A challenging move that works your core, shoulders, and triceps.",
        sets: 3,
        reps: "12",
        restTime: 45
      }
    ],
    createdBy: "Coach Alex",
    rating: 4.8,
    reviews: 345
  },
  {
    id: "2",
    title: "Build & Bulk Upper Body",
    description: "Focus on developing size and strength in your chest, shoulders, back, and arms with this intense routine.",
    level: "advanced",
    duration: 60,
    category: "strength",
    goal: "muscleGain",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "2-1",
        name: "Bench Press",
        description: "The classic chest-building exercise that also works your shoulders and triceps.",
        sets: 5,
        reps: "5-8",
        restTime: 90
      },
      {
        id: "2-2",
        name: "Pull-Ups",
        description: "A compound exercise that targets your back, biceps, and forearms.",
        sets: 4,
        reps: "8-12",
        restTime: 60
      },
      {
        id: "2-3",
        name: "Military Press",
        description: "An overhead press that builds shoulder strength and stability.",
        sets: 4,
        reps: "8-10",
        restTime: 60
      },
      {
        id: "2-4",
        name: "Barbell Rows",
        description: "A pulling exercise that develops back thickness and bicep strength.",
        sets: 4,
        reps: "8-12",
        restTime: 60
      }
    ],
    createdBy: "Coach Mike",
    rating: 4.9,
    reviews: 287
  },
  {
    id: "3",
    title: "Total Body Toning",
    description: "A balanced full-body workout that tones muscles and improves overall fitness with minimal equipment.",
    level: "beginner",
    duration: 30,
    category: "fullBody",
    goal: "toning",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "3-1",
        name: "Bodyweight Squats",
        description: "A fundamental lower body exercise that targets your quads, hamstrings, and glutes.",
        sets: 3,
        reps: "15-20",
        restTime: 30
      },
      {
        id: "3-2",
        name: "Push-Ups",
        description: "A classic exercise that strengthens your chest, shoulders, triceps, and core.",
        sets: 3,
        reps: "10-15",
        restTime: 30
      },
      {
        id: "3-3",
        name: "Glute Bridges",
        description: "An exercise that targets your glutes, lower back, and hamstrings.",
        sets: 3,
        reps: "15-20",
        restTime: 30
      },
      {
        id: "3-4",
        name: "Plank",
        description: "A core-strengthening isometric exercise that also engages your shoulders and lower body.",
        sets: 3,
        reps: "30-60 seconds",
        restTime: 30
      }
    ],
    createdBy: "Coach Sarah",
    rating: 4.7,
    reviews: 412
  },
  {
    id: "4",
    title: "Marathon Prep Program",
    description: "Build your endurance and strengthen your lower body to prepare for long-distance running events.",
    level: "intermediate",
    duration: 75,
    category: "cardio",
    goal: "endurance",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "4-1",
        name: "Interval Running",
        description: "Alternating between high and low-intensity running to build cardio capacity.",
        sets: 5,
        reps: "1 minute sprint, 2 minutes jog",
        restTime: 60
      },
      {
        id: "4-2",
        name: "Lunges",
        description: "A unilateral exercise that builds leg strength and stability.",
        sets: 3,
        reps: "12 each leg",
        restTime: 45
      },
      {
        id: "4-3",
        name: "Calf Raises",
        description: "An exercise that strengthens your calf muscles for better running power.",
        sets: 3,
        reps: "20",
        restTime: 30
      },
      {
        id: "4-4",
        name: "Leg Swings",
        description: "A dynamic stretch that improves hip mobility and flexibility.",
        sets: 2,
        reps: "15 each leg",
        restTime: 30
      }
    ],
    createdBy: "Coach Emma",
    rating: 4.6,
    reviews: 198
  }
];
