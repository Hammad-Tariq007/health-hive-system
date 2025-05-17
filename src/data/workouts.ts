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
  },
  {
    id: "5",
    title: "Mind-Body Yoga Flow",
    description: "A holistic yoga routine focused on improving flexibility, balance, and mental clarity through mindful movement.",
    level: "beginner",
    duration: 40,
    category: "flexibility",
    goal: "general",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "5-1",
        name: "Sun Salutations",
        description: "A flowing sequence that warms up the entire body and creates awareness of breath and movement.",
        sets: 3,
        reps: "5 cycles",
        restTime: 20
      },
      {
        id: "5-2",
        name: "Warrior Sequence",
        description: "A series of standing poses that build strength in the legs and core while opening the hips and chest.",
        sets: 2,
        reps: "30 seconds each side",
        restTime: 15
      },
      {
        id: "5-3",
        name: "Balance Postures",
        description: "Tree pose and eagle pose to improve focus, balance, and stability.",
        sets: 2,
        reps: "45 seconds each side",
        restTime: 30
      },
      {
        id: "5-4",
        name: "Seated Forward Folds",
        description: "Deep stretches for the hamstrings, lower back, and shoulders to release tension.",
        sets: 1,
        reps: "2 minutes",
        restTime: 0
      },
      {
        id: "5-5",
        name: "Savasana",
        description: "Final relaxation pose to integrate the practice and promote relaxation.",
        sets: 1,
        reps: "5 minutes",
        restTime: 0
      }
    ],
    createdBy: "Yoga Instructor Maya",
    rating: 4.9,
    reviews: 276
  },
  {
    id: "6",
    title: "Core Crusher Challenge",
    description: "An intense core workout designed to strengthen and define your abdominal muscles and improve overall core stability.",
    level: "intermediate",
    duration: 30,
    category: "strength",
    goal: "toning",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "6-1",
        name: "Plank Variations",
        description: "Standard plank, side planks, and plank with shoulder taps to engage the entire core.",
        sets: 3,
        reps: "45 seconds each",
        restTime: 30
      },
      {
        id: "6-2",
        name: "Russian Twists",
        description: "Seated twisting exercise that targets the obliques and transverse abdominis.",
        sets: 3,
        reps: "20 each side",
        restTime: 45
      },
      {
        id: "6-3",
        name: "Bicycle Crunches",
        description: "Dynamic exercise that works the upper and lower abs as well as the obliques.",
        sets: 3,
        reps: "30 total",
        restTime: 30
      },
      {
        id: "6-4",
        name: "Leg Raises",
        description: "Lying exercise that targets the lower abdominals and hip flexors.",
        sets: 3,
        reps: "15",
        restTime: 45
      },
      {
        id: "6-5",
        name: "Hollow Hold",
        description: "Isometric exercise that builds core stability and strength.",
        sets: 3,
        reps: "30 seconds",
        restTime: 45
      }
    ],
    createdBy: "Coach Sophia",
    rating: 4.7,
    reviews: 218
  },
  {
    id: "7",
    title: "5K Runner's Program",
    description: "Progressive running plan designed to build endurance and prepare beginners for completing a 5K race.",
    level: "beginner",
    duration: 35,
    category: "cardio",
    goal: "endurance",
    image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1469&auto=format&fit=crop",
    exercises: [
      {
        id: "7-1",
        name: "Warm-Up Walk",
        description: "Brisk walking to prepare the body for running.",
        sets: 1,
        reps: "5 minutes",
        restTime: 0
      },
      {
        id: "7-2",
        name: "Run/Walk Intervals",
        description: "Alternating between running and walking to build stamina gradually.",
        sets: 5,
        reps: "3 min run, 2 min walk",
        restTime: 0
      },
      {
        id: "7-3",
        name: "Steady Run",
        description: "Continuous running at a comfortable pace to build base endurance.",
        sets: 1,
        reps: "10 minutes",
        restTime: 0
      },
      {
        id: "7-4",
        name: "Cool-Down Walk",
        description: "Slow walking to gradually bring heart rate down and begin recovery.",
        sets: 1,
        reps: "5 minutes",
        restTime: 0
      }
    ],
    createdBy: "Running Coach Thomas",
    rating: 4.6,
    reviews: 193
  },
  {
    id: "8",
    title: "Power Lifter's Blueprint",
    description: "Strength-focused routine centered around the main powerlifting movements: squat, bench press, and deadlift.",
    level: "advanced",
    duration: 75,
    category: "strength",
    goal: "muscleGain",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=1469&auto=format&fit=crop",
    exercises: [
      {
        id: "8-1",
        name: "Barbell Back Squats",
        description: "Compound lower body exercise that builds quad, hamstring, and glute strength.",
        sets: 5,
        reps: "5",
        restTime: 180
      },
      {
        id: "8-2",
        name: "Bench Press",
        description: "Primary upper body pressing movement for chest, shoulder, and tricep development.",
        sets: 5,
        reps: "5",
        restTime: 180
      },
      {
        id: "8-3",
        name: "Deadlifts",
        description: "Full body pulling exercise that builds posterior chain strength and overall power.",
        sets: 3,
        reps: "5",
        restTime: 240
      },
      {
        id: "8-4",
        name: "Accessory Work",
        description: "Supplementary exercises like rows, dips, and core work to address weaknesses.",
        sets: 3,
        reps: "8-12 each",
        restTime: 90
      }
    ],
    createdBy: "Strength Coach Marcus",
    rating: 4.9,
    reviews: 152
  }
];
