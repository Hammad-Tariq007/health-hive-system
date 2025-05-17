
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
  category: "strength" | "cardio" | "hiit" | "flexibility" | "fullBody" | "yoga" | "pilates" | "calisthenics";
  goal: "weightLoss" | "muscleGain" | "endurance" | "toning" | "general" | "mobility" | "recovery";
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
    category: "yoga",
    goal: "mobility",
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
  },
  {
    id: "9",
    title: "HIIT Metabolic Booster",
    description: "A fast-paced, high-intensity interval training workout designed to maximize calorie burn and boost metabolism for hours after training.",
    level: "intermediate",
    duration: 25,
    category: "hiit",
    goal: "weightLoss",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1474&auto=format&fit=crop",
    exercises: [
      {
        id: "9-1",
        name: "Jumping Jacks",
        description: "Full body cardio movement that elevates heart rate and warms up the entire body.",
        sets: 4,
        reps: "40 seconds work, 20 seconds rest",
        restTime: 0
      },
      {
        id: "9-2",
        name: "Speed Squats",
        description: "Fast-paced bodyweight squats to build leg endurance and burn calories.",
        sets: 4,
        reps: "40 seconds work, 20 seconds rest",
        restTime: 0
      },
      {
        id: "9-3",
        name: "Mountain Climbers",
        description: "Dynamic core exercise that also elevates heart rate and engages multiple muscle groups.",
        sets: 4,
        reps: "40 seconds work, 20 seconds rest",
        restTime: 0
      },
      {
        id: "9-4",
        name: "Push-up to Side Plank",
        description: "Combination move that works chest, triceps, shoulders, and obliques.",
        sets: 4,
        reps: "40 seconds work, 20 seconds rest",
        restTime: 0
      },
      {
        id: "9-5",
        name: "Burpees",
        description: "Full-body exercise that combines a squat, push-up, and jump for maximum calorie burn.",
        sets: 4,
        reps: "40 seconds work, 20 seconds rest",
        restTime: 60
      }
    ],
    createdBy: "HIIT Specialist Jennifer",
    rating: 4.8,
    reviews: 312
  },
  {
    id: "10",
    title: "Bodyweight Mastery",
    description: "A comprehensive calisthenics program focusing on building strength and control using only your bodyweight.",
    level: "intermediate",
    duration: 45,
    category: "calisthenics",
    goal: "toning",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "10-1",
        name: "Pike Push-ups",
        description: "A vertical pushing movement that targets the shoulders and upper chest.",
        sets: 3,
        reps: "10-15",
        restTime: 60
      },
      {
        id: "10-2",
        name: "Pull-up Progressions",
        description: "Various pull-up variations based on your current strength level.",
        sets: 3,
        reps: "5-10",
        restTime: 60
      },
      {
        id: "10-3",
        name: "Pistol Squat Progressions",
        description: "Single-leg squat variations to build lower body strength and balance.",
        sets: 3,
        reps: "5-8 per leg",
        restTime: 60
      },
      {
        id: "10-4",
        name: "L-Sit Progressions",
        description: "Core and hip flexor exercise that builds strength for advanced calisthenics movements.",
        sets: 3,
        reps: "10-30 seconds",
        restTime: 60
      },
      {
        id: "10-5",
        name: "Handstand Practice",
        description: "Drills to develop balance, strength, and comfort being inverted.",
        sets: 3,
        reps: "30-60 seconds",
        restTime: 60
      }
    ],
    createdBy: "Calisthenics Expert David",
    rating: 4.7,
    reviews: 189
  },
  {
    id: "11",
    title: "Pilates Core & Posture",
    description: "A focused Pilates routine designed to strengthen the core, improve posture, and increase body awareness and control.",
    level: "beginner",
    duration: 35,
    category: "pilates",
    goal: "toning",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "11-1",
        name: "The Hundred",
        description: "Classic Pilates warm-up that engages the core and increases circulation.",
        sets: 1,
        reps: "100 pumps (10 sets of 10)",
        restTime: 30
      },
      {
        id: "11-2",
        name: "Roll-ups",
        description: "Controlled movement that strengthens the abdominals and improves spinal articulation.",
        sets: 1,
        reps: "10",
        restTime: 30
      },
      {
        id: "11-3",
        name: "Single Leg Circles",
        description: "Hip mobility exercise that also engages the core and improves stability.",
        sets: 1,
        reps: "10 in each direction, each leg",
        restTime: 30
      },
      {
        id: "11-4",
        name: "Spine Stretch Forward",
        description: "Flexibility movement that stretches the back muscles and hamstrings.",
        sets: 1,
        reps: "8",
        restTime: 30
      },
      {
        id: "11-5",
        name: "The Saw",
        description: "Rotation exercise that improves spine mobility and stretches the hamstrings.",
        sets: 1,
        reps: "6 each side",
        restTime: 30
      },
      {
        id: "11-6",
        name: "The Swan",
        description: "Back extension to strengthen posterior chain and counteract forward-leaning posture.",
        sets: 1,
        reps: "8",
        restTime: 30
      }
    ],
    createdBy: "Pilates Instructor Rebecca",
    rating: 4.9,
    reviews: 245
  },
  {
    id: "12",
    title: "Active Recovery Day",
    description: "A gentle workout designed to promote blood flow, reduce muscle soreness, and aid recovery between intense training sessions.",
    level: "beginner",
    duration: 30,
    category: "flexibility",
    goal: "recovery",
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?q=80&w=1374&auto=format&fit=crop",
    exercises: [
      {
        id: "12-1",
        name: "Foam Rolling Sequence",
        description: "Self-myofascial release for major muscle groups to reduce tension and improve mobility.",
        sets: 1,
        reps: "1-2 minutes per area",
        restTime: 0
      },
      {
        id: "12-2",
        name: "Dynamic Joint Mobility",
        description: "Gentle movements through full range of motion for major joints.",
        sets: 1,
        reps: "10 repetitions per joint",
        restTime: 0
      },
      {
        id: "12-3",
        name: "Light Cardio",
        description: "Easy walking or cycling to increase blood flow without creating additional fatigue.",
        sets: 1,
        reps: "10 minutes",
        restTime: 0
      },
      {
        id: "12-4",
        name: "Static Stretching",
        description: "Gentle, prolonged stretches for major muscle groups.",
        sets: 1,
        reps: "30 seconds per stretch",
        restTime: 0
      },
      {
        id: "12-5",
        name: "Deep Breathing",
        description: "Focused breathing exercises to promote relaxation and recovery.",
        sets: 1,
        reps: "5 minutes",
        restTime: 0
      }
    ],
    createdBy: "Recovery Specialist Mark",
    rating: 4.6,
    reviews: 172
  },
  {
    id: "13",
    title: "Functional Fitness Circuit",
    description: "A circuit-style workout focusing on movement patterns used in everyday life to improve overall functional fitness and movement quality.",
    level: "intermediate",
    duration: 45,
    category: "fullBody",
    goal: "general",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop",
    exercises: [
      {
        id: "13-1",
        name: "Goblet Squats",
        description: "Squat variation that improves hip mobility, core stability, and lower body strength.",
        sets: 3,
        reps: "12-15",
        restTime: 30
      },
      {
        id: "13-2",
        name: "Renegade Rows",
        description: "Combination plank and rowing movement that builds core stability and upper body pulling strength.",
        sets: 3,
        reps: "10 each arm",
        restTime: 30
      },
      {
        id: "13-3",
        name: "Kettlebell Swings",
        description: "Dynamic hip hinge pattern that develops posterior chain power and cardiovascular fitness.",
        sets: 3,
        reps: "20",
        restTime: 30
      },
      {
        id: "13-4",
        name: "Turkish Get-ups",
        description: "Multi-joint movement that improves total body coordination, stability, and mobility.",
        sets: 3,
        reps: "5 each side",
        restTime: 30
      },
      {
        id: "13-5",
        name: "Farmer's Carries",
        description: "Loaded walking exercise that builds grip strength, core stability, and overall work capacity.",
        sets: 3,
        reps: "40 yards",
        restTime: 45
      }
    ],
    createdBy: "Functional Training Coach Sam",
    rating: 4.7,
    reviews: 208
  },
  {
    id: "14",
    title: "Strength-Cardio Fusion",
    description: "A hybrid workout that combines strength training and cardiovascular conditioning for a time-efficient, full-body training session.",
    level: "intermediate",
    duration: 50,
    category: "fullBody",
    goal: "weightLoss",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "14-1",
        name: "Dumbbell Thrusters",
        description: "Combination squat and overhead press that elevates heart rate while building strength.",
        sets: 3,
        reps: "15",
        restTime: 30
      },
      {
        id: "14-2",
        name: "Kettlebell Swings",
        description: "Explosive hip hinge movement that builds power and endurance simultaneously.",
        sets: 3,
        reps: "20",
        restTime: 30
      },
      {
        id: "14-3",
        name: "Dumbbell Renegade Rows",
        description: "Plank position row that combines core stability with upper body pulling strength.",
        sets: 3,
        reps: "12 each arm",
        restTime: 30
      },
      {
        id: "14-4",
        name: "Battle Rope Slams",
        description: "High-intensity rope exercise that builds upper body power and cardiovascular fitness.",
        sets: 3,
        reps: "30 seconds",
        restTime: 30
      },
      {
        id: "14-5",
        name: "Box Jumps",
        description: "Plyometric lower body exercise that builds explosive power and cardiovascular fitness.",
        sets: 3,
        reps: "12",
        restTime: 30
      },
      {
        id: "14-6",
        name: "Medicine Ball Slams",
        description: "Full-body exercise that builds power and conditions the cardiovascular system.",
        sets: 3,
        reps: "15",
        restTime: 30
      }
    ],
    createdBy: "Conditioning Coach Nathan",
    rating: 4.8,
    reviews: 235
  },
  {
    id: "15",
    title: "Mobility Flow Sequence",
    description: "A movement-based routine focused on improving joint mobility, tissue quality, and movement efficiency for better performance and reduced injury risk.",
    level: "beginner",
    duration: 25,
    category: "flexibility",
    goal: "mobility",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1526&auto=format&fit=crop",
    exercises: [
      {
        id: "15-1",
        name: "Cat-Cow Flow",
        description: "Spinal mobility exercise that moves between flexion and extension to improve back health.",
        sets: 1,
        reps: "10 cycles",
        restTime: 0
      },
      {
        id: "15-2",
        name: "World's Greatest Stretch",
        description: "Multi-joint mobility sequence that addresses hips, thoracic spine, and shoulders.",
        sets: 1,
        reps: "5 per side",
        restTime: 0
      },
      {
        id: "15-3",
        name: "Hip 90/90 Switches",
        description: "Dynamic hip mobility exercise that addresses internal and external rotation.",
        sets: 1,
        reps: "10 each side",
        restTime: 0
      },
      {
        id: "15-4",
        name: "Thoracic Bridges",
        description: "Upper back mobility exercise that improves thoracic extension and shoulder function.",
        sets: 1,
        reps: "8 each side",
        restTime: 0
      },
      {
        id: "15-5",
        name: "Shoulder CARs",
        description: "Controlled Articular Rotations for the shoulder joint to improve mobility and motor control.",
        sets: 1,
        reps: "5 each direction",
        restTime: 0
      },
      {
        id: "15-6",
        name: "Deep Squat to Stand",
        description: "Movement sequence that addresses ankle, knee, hip, and spinal mobility.",
        sets: 1,
        reps: "10",
        restTime: 0
      }
    ],
    createdBy: "Mobility Specialist Grace",
    rating: 4.9,
    reviews: 185
  },
  {
    id: "16",
    title: "Advanced Yoga Challenge",
    description: "A dynamic yoga sequence designed for experienced practitioners looking to deepen their practice with more challenging poses and transitions.",
    level: "advanced",
    duration: 60,
    category: "yoga",
    goal: "mobility",
    image: "https://images.unsplash.com/photo-1588286840104-8457e3263156?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "16-1",
        name: "Advanced Sun Salutations",
        description: "Dynamic flowing sequence with added challenging variations to build heat and prepare the body.",
        sets: 1,
        reps: "5 full cycles",
        restTime: 0
      },
      {
        id: "16-2",
        name: "Arm Balances Sequence",
        description: "Series of challenging arm balances including crow, side crow, and eight-angle pose.",
        sets: 1,
        reps: "30-60 seconds each",
        restTime: 30
      },
      {
        id: "16-3",
        name: "Inversions Practice",
        description: "Headstand, forearm stand, and handstand variations with transitions.",
        sets: 1,
        reps: "1-3 minutes each",
        restTime: 30
      },
      {
        id: "16-4",
        name: "Advanced Backbends",
        description: "Wheel pose variations, one-legged wheel, and scorpion pose progressions.",
        sets: 1,
        reps: "30-60 seconds each",
        restTime: 30
      },
      {
        id: "16-5",
        name: "Deep Hip Openers",
        description: "Advanced hip opening postures including lotus variations and splits.",
        sets: 1,
        reps: "1-2 minutes each",
        restTime: 30
      },
      {
        id: "16-6",
        name: "Meditation and Pranayama",
        description: "Advanced breathing techniques and seated meditation to conclude the practice.",
        sets: 1,
        reps: "10 minutes",
        restTime: 0
      }
    ],
    createdBy: "Advanced Yoga Teacher Amelia",
    rating: 4.8,
    reviews: 156
  },
  {
    id: "17",
    title: "High-Volume Chest Specialization",
    description: "An intensive chest-focused workout designed to maximize muscle growth and strength through multiple angles and rep ranges.",
    level: "advanced",
    duration: 65,
    category: "strength",
    goal: "muscleGain",
    image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "17-1",
        name: "Incline Bench Press",
        description: "Upper chest-focused pressing movement with barbells for strength development.",
        sets: 4,
        reps: "8-10",
        restTime: 90
      },
      {
        id: "17-2",
        name: "Flat Dumbbell Press",
        description: "Mid-chest development with dumbbells for better range of motion and symmetry.",
        sets: 4,
        reps: "10-12",
        restTime: 75
      },
      {
        id: "17-3",
        name: "Weighted Dips",
        description: "Lower chest and tricep compound movement with added resistance for strength.",
        sets: 3,
        reps: "8-12",
        restTime: 75
      },
      {
        id: "17-4",
        name: "Cable Flyes (High to Low)",
        description: "Isolation movement targeting the upper chest with constant tension.",
        sets: 3,
        reps: "12-15",
        restTime: 60
      },
      {
        id: "17-5",
        name: "Cable Flyes (Low to High)",
        description: "Isolation movement targeting the lower chest fibers with constant tension.",
        sets: 3,
        reps: "12-15",
        restTime: 60
      },
      {
        id: "17-6",
        name: "Push-Up Variations",
        description: "Bodyweight finisher with multiple variations to completely fatigue the chest muscles.",
        sets: 2,
        reps: "To failure",
        restTime: 60
      }
    ],
    createdBy: "Hypertrophy Specialist Jake",
    rating: 4.7,
    reviews: 198
  },
  {
    id: "18",
    title: "Outdoor Bootcamp Challenge",
    description: "A high-energy outdoor workout combining bodyweight exercises, running, and natural obstacle challenges for a fun and effective full-body workout.",
    level: "intermediate",
    duration: 50,
    category: "hiit",
    goal: "endurance",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1470&auto=format&fit=crop",
    exercises: [
      {
        id: "18-1",
        name: "Sprint Intervals",
        description: "Short distance sprinting with recovery walks to build explosive power and cardiovascular fitness.",
        sets: 6,
        reps: "30 seconds sprint, 60 seconds walk",
        restTime: 0
      },
      {
        id: "18-2",
        name: "Park Bench Step-ups",
        description: "Using a park bench for step-ups to build lower body strength and endurance.",
        sets: 3,
        reps: "15 each leg",
        restTime: 30
      },
      {
        id: "18-3",
        name: "Pull-ups on Tree Branch/Park Bar",
        description: "Upper body pulling movement using available outdoor structures.",
        sets: 3,
        reps: "Max effort",
        restTime: 60
      },
      {
        id: "18-4",
        name: "Hill Sprints",
        description: "Explosive uphill running to build power in the lower body and cardiovascular system.",
        sets: 5,
        reps: "20-30 seconds",
        restTime: 90
      },
      {
        id: "18-5",
        name: "Bodyweight Circuit",
        description: "Sequence of push-ups, squats, lunges, and core exercises with minimal rest.",
        sets: 3,
        reps: "45 seconds each exercise",
        restTime: 15
      },
      {
        id: "18-6",
        name: "Agility Drills",
        description: "Cone drills, lateral movements, and direction changes to improve coordination and agility.",
        sets: 2,
        reps: "60 seconds each drill",
        restTime: 30
      }
    ],
    createdBy: "Outdoor Fitness Coach Zack",
    rating: 4.8,
    reviews: 267
  }
];

