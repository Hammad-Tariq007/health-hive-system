import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { Edit, User, LineChart, Apple, Dumbbell } from "lucide-react";
import SubscriptionCard from "@/components/profile/SubscriptionCard";

// Import necessary components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Import data for mock workout history from data/workouts.ts
import { workoutPlans } from "@/data/workouts";

// Mock data for user progress
const progressData = {
  weight: {
    current: 75,
    goal: 70,
    progress: (75 / 70) * 100
  },
  workoutsCompleted: 12,
  calories: {
    goal: 2000,
    consumed: 1650
  }
};

// Mock workout history
const workoutHistory = [
  { id: '1', name: 'Full Body HIIT', date: '2023-05-15', duration: 45 },
  { id: '2', name: 'Upper Body Strength', date: '2023-05-12', duration: 40 },
  { id: '3', name: 'Yoga Flow', date: '2023-05-10', duration: 30 },
  { id: '4', name: 'Core Crusher', date: '2023-05-08', duration: 20 },
  { id: '5', name: 'Leg Day Challenge', date: '2023-05-05', duration: 50 }
];

// Mock nutrition plans
const nutritionPlans = [
  { id: '1', name: 'Balanced Diet', startDate: '2023-05-01', endDate: '2023-06-01', calories: 2000 },
  { id: '2', name: 'High Protein', startDate: '2023-04-01', endDate: '2023-05-01', calories: 2200 },
  { id: '3', name: 'Low Carb', startDate: '2023-03-01', endDate: '2023-04-01', calories: 1800 }
];

const Profile = () => {
  const { user, isLoading } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is logged in, if not redirect to login
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Access Denied",
        description: "Please log in to view your profile",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, isLoading, navigate, toast]);

  // Mock data for user progress
  const progressData = {
    weight: {
      current: user?.weight || 0,
      goal: 70,
      progress: ((user?.weight || 0) / 70) * 100
    },
    workoutsCompleted: 12,
    calories: {
      goal: 2000,
      consumed: 1650
    }
  };

  // Mock workout history
  const workoutHistory = [
    { id: '1', name: 'Full Body HIIT', date: '2023-05-15', duration: 45 },
    { id: '2', name: 'Upper Body Strength', date: '2023-05-12', duration: 40 },
    { id: '3', name: 'Yoga Flow', date: '2023-05-10', duration: 30 },
    { id: '4', name: 'Core Crusher', date: '2023-05-08', duration: 20 },
    { id: '5', name: 'Leg Day Challenge', date: '2023-05-05', duration: 50 }
  ];

  // Mock nutrition plans
  const nutritionPlans = [
    { id: '1', name: 'Balanced Diet', startDate: '2023-05-01', endDate: '2023-06-01', calories: 2000 },
    { id: '2', name: 'High Protein', startDate: '2023-04-01', endDate: '2023-05-01', calories: 2200 },
    { id: '3', name: 'Low Carb', startDate: '2023-03-01', endDate: '2023-04-01', calories: 1800 }
  ];

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container py-10 px-4 md:px-6">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column: User Info */}
          <div className="flex flex-col gap-6 w-full md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-fitness-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Link to="/edit-profile">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <CardTitle className="text-2xl mt-2">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{user.gender || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{user.age || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Height:</span>
                    <span>{user.height ? `${user.height} cm` : 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weight:</span>
                    <span>{user.weight ? `${user.weight} kg` : 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span>{user.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/edit-profile" className="w-full">
                  <Button variant="default" className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                    Edit Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Subscription Card */}
            <SubscriptionCard 
              plan={user.subscriptionPlan || 'free'} 
              subscriptionDate={user.subscriptionDate}
            />
          </div>

          {/* Right Column: Tabs Content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="progress">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="progress" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  <LineChart className="h-4 w-4 mr-2" />
                  Progress
                </TabsTrigger>
                <TabsTrigger value="workouts" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Workout History
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  <Apple className="h-4 w-4 mr-2" />
                  Nutrition
                </TabsTrigger>
              </TabsList>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Progress</CardTitle>
                    <CardDescription>Track your weight journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Current: {progressData.weight.current} kg</span>
                        <span>Goal: {progressData.weight.goal} kg</span>
                      </div>
                      <Progress value={progressData.weight.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Summary</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold">{progressData.workoutsCompleted}</div>
                        <div className="text-sm text-muted-foreground">Workouts Completed</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold">{progressData.calories.consumed}</div>
                        <div className="text-sm text-muted-foreground">Avg. Daily Calories</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fitness Goals</CardTitle>
                    <CardDescription>Your current targets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <div>Daily Steps</div>
                      <div>8,000 / 10,000</div>
                    </div>
                    <Progress value={80} className="h-2" />
                    
                    <div className="flex justify-between mt-4">
                      <div>Weekly Workouts</div>
                      <div>3 / 5</div>
                    </div>
                    <Progress value={60} className="h-2" />
                    
                    <div className="flex justify-between mt-4">
                      <div>Daily Water (Liters)</div>
                      <div>1.5 / 2.5</div>
                    </div>
                    <Progress value={60} className="h-2" />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Workouts Tab */}
              <TabsContent value="workouts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Workouts</CardTitle>
                    <CardDescription>Your last 5 completed workouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workoutHistory.map((workout) => (
                        <div key={workout.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <div className="font-medium">{workout.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(workout.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-sm">{workout.duration} min</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All History</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Workout Achievements</CardTitle>
                    <CardDescription>Milestones you've reached</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold">7</div>
                        <div className="text-sm">Days Streak</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold">35</div>
                        <div className="text-sm">Total Workouts</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold">1,050</div>
                        <div className="text-sm">Minutes Active</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold">3</div>
                        <div className="text-sm">Badges Earned</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Nutrition Tab */}
              <TabsContent value="nutrition" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Nutrition Plans</CardTitle>
                    <CardDescription>Your current meal plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nutritionPlans.map((plan) => (
                        <div key={plan.id} className="border p-4 rounded-lg">
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Daily Target: </span> 
                            {plan.calories} calories
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Today's Nutrition</CardTitle>
                    <CardDescription>Calories and macronutrients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Calories</span>
                          <span>{progressData.calories.consumed} / {progressData.calories.goal}</span>
                        </div>
                        <Progress value={(progressData.calories.consumed / progressData.calories.goal) * 100} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Protein</div>
                          <div className="font-medium">120g</div>
                          <Progress value={75} className="h-1.5" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Carbs</div>
                          <div className="font-medium">180g</div>
                          <Progress value={60} className="h-1.5" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Fat</div>
                          <div className="font-medium">55g</div>
                          <Progress value={80} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Meal Planner</CardTitle>
                    <CardDescription>Your personalized meal suggestions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/nutrition" className="w-full">
                      <Button className="w-full">View Meal Plans</Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
