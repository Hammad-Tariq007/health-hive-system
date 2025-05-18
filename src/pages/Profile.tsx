
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  Clock, 
  Trophy, 
  Dumbbell, 
  Apple, 
  HeartPulse, 
  Settings,
  Edit,
  Calculator,
  Trash2,
  PieChart,
  Bell,
  LogOut,
  Lock,
  Eye,
  AlertCircle,
  Check,
  User
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define workout history type
interface WorkoutHistoryItem {
  id: string;
  title: string;
  date: Date;
  duration: number;
  type: string;
  caloriesBurned: number;
}

// Define nutrition plan type
interface NutritionPlanItem {
  id: string;
  name: string;
  type: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for workout history
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistoryItem[]>([
    {
      id: "w1",
      title: "Upper Body Strength",
      date: new Date(Date.now() - 86400000), // yesterday
      duration: 45,
      type: "Strength",
      caloriesBurned: 320
    },
    {
      id: "w2",
      title: "HIIT Cardio",
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      duration: 30,
      type: "Cardio",
      caloriesBurned: 450
    },
    {
      id: "w3",
      title: "Lower Body Focus",
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      duration: 50,
      type: "Strength",
      caloriesBurned: 380
    },
    {
      id: "w4",
      title: "Full Body Workout",
      date: new Date(Date.now() - 86400000 * 7), // 7 days ago
      duration: 60,
      type: "Mixed",
      caloriesBurned: 520
    }
  ]);
  
  // State for nutrition plans
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlanItem[]>([
    {
      id: "n1",
      name: "High Protein Plan",
      type: "Muscle Gain",
      macros: {
        protein: 40,
        carbs: 40,
        fats: 20
      },
      startDate: new Date(Date.now() - 86400000 * 14), // 2 weeks ago
      isActive: true
    },
    {
      id: "n2",
      name: "Keto Diet",
      type: "Weight Loss",
      macros: {
        protein: 30,
        carbs: 10,
        fats: 60
      },
      startDate: new Date(Date.now() - 86400000 * 60), // 60 days ago
      endDate: new Date(Date.now() - 86400000 * 30), // 30 days ago
      isActive: false
    }
  ]);
  
  // State for notifications settings
  const [notificationSettings, setNotificationSettings] = useState({
    workoutReminders: true,
    achievementAlerts: true,
    newsletterEmails: false,
    appUpdates: true
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access your profile",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

  const handleDeleteWorkout = (id: string) => {
    setWorkoutHistory(prev => prev.filter(workout => workout.id !== id));
    
    toast({
      title: "Workout Deleted",
      description: "The workout has been removed from your history.",
      variant: "default"
    });
  };
  
  const handleToggleNutritionPlan = (id: string) => {
    setNutritionPlans(prev => prev.map(plan => {
      if (plan.id === id) {
        return {
          ...plan,
          isActive: !plan.isActive
        };
      }
      return plan;
    }));
    
    const plan = nutritionPlans.find(p => p.id === id);
    
    toast({
      title: plan?.isActive ? "Plan Deactivated" : "Plan Activated",
      description: `${plan?.name} has been ${plan?.isActive ? 'deactivated' : 'activated'}.`,
      variant: "default"
    });
  };
  
  const handleDeleteNutritionPlan = (id: string) => {
    setNutritionPlans(prev => prev.filter(plan => plan.id !== id));
    
    toast({
      title: "Nutrition Plan Deleted",
      description: "The plan has been removed from your list.",
      variant: "default"
    });
  };
  
  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Settings Updated",
      description: `Notification preference updated.`,
      variant: "default"
    });
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default"
    });
    navigate('/');
  };
  
  const handleDeleteAccount = () => {
    logout();
    toast({
      title: "Account Deleted",
      description: "Your account has been successfully deleted.",
      variant: "default"
    });
    navigate('/');
  };
  
  // If no user, show loading or placeholder
  if (!user) {
    return (
      <div className="container py-10 mx-auto">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-fitness-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="glass">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-fitness-primary">
                    <AvatarImage src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop" />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Link to="/edit-profile">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="absolute bottom-0 right-0 rounded-full bg-background"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                
                <Badge className="mt-3 bg-fitness-primary">
                  {isAdmin() ? "Admin" : "Premium Member"}
                </Badge>
                
                <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl">{workoutHistory.length}</p>
                    <p className="text-xs text-muted-foreground">Workouts</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl">12</p>
                    <p className="text-xs text-muted-foreground">Weeks</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl">5</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                </div>
                
                <Link to="/edit-profile" className="mt-6 w-full">
                  <Button variant="default" className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                    Edit Profile
                  </Button>
                </Link>
                
                <div className="mt-4 w-full">
                  <Link to="/bmi-calculator" className="w-full">
                    <Button variant="outline" className="w-full border-fitness-primary text-fitness-primary hover:bg-fitness-primary/10">
                      <Calculator className="mr-2 h-4 w-4" />
                      BMI Calculator
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Current Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weight Loss</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[70%] rounded-full bg-fitness-primary"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Muscle Gain</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[45%] rounded-full bg-fitness-secondary"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cardio Endurance</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs 
              defaultValue="overview" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workouts">Workouts</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Weekly Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="flex flex-col items-center justify-center rounded-lg bg-accent p-4">
                        <Dumbbell className="h-8 w-8 text-fitness-primary mb-2" />
                        <p className="text-2xl font-bold">4</p>
                        <p className="text-xs text-muted-foreground">Workouts</p>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg bg-accent p-4">
                        <Clock className="h-8 w-8 text-fitness-secondary mb-2" />
                        <p className="text-2xl font-bold">3.5</p>
                        <p className="text-xs text-muted-foreground">Hours</p>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg bg-accent p-4">
                        <HeartPulse className="h-8 w-8 text-red-500 mb-2" />
                        <p className="text-2xl font-bold">2.4k</p>
                        <p className="text-xs text-muted-foreground">Calories</p>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg bg-accent p-4">
                        <Apple className="h-8 w-8 text-green-500 mb-2" />
                        <p className="text-2xl font-bold">85%</p>
                        <p className="text-xs text-muted-foreground">Nutrition</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Recent Activity</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-fitness-primary/10 p-2">
                            <Dumbbell className="h-4 w-4 text-fitness-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Completed Upper Body Workout</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarDays className="mr-1 h-3 w-3" />
                              <span>Yesterday at 7:30 AM</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-green-500/10 p-2">
                            <Apple className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Logged Nutrition Plan</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarDays className="mr-1 h-3 w-3" />
                              <span>2 days ago at 8:15 PM</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-yellow-500/10 p-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <p className="font-medium">Earned 7-Day Streak Badge</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarDays className="mr-1 h-3 w-3" />
                              <span>3 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Upcoming Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-fitness-primary p-2">
                            <Dumbbell className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Full Body HIIT</p>
                            <p className="text-sm text-muted-foreground">45 minutes • Advanced</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Tomorrow</p>
                          <p className="text-sm text-muted-foreground">6:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-green-500 p-2">
                            <Apple className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Nutrition Check-in</p>
                            <p className="text-sm text-muted-foreground">Weekly progress review</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Friday</p>
                          <p className="text-sm text-muted-foreground">12:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-500 p-2">
                            <Calculator className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">BMI Assessment</p>
                            <p className="text-sm text-muted-foreground">Monthly health check</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Sunday</p>
                          <p className="text-sm text-muted-foreground">9:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="workouts" className="mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass mb-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl">Your Workout History</CardTitle>
                      <Button variant="outline" size="sm">
                        <PieChart className="h-4 w-4 mr-2" />
                        View Stats
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {workoutHistory.length > 0 ? (
                        <div className="space-y-4">
                          {workoutHistory.map((workout) => (
                            <motion.div
                              key={workout.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center justify-between rounded-lg border p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`rounded-full p-2 ${
                                  workout.type === 'Strength' ? 'bg-fitness-primary/10' :
                                  workout.type === 'Cardio' ? 'bg-red-500/10' : 'bg-purple-500/10'
                                }`}>
                                  <Dumbbell className={`h-5 w-5 ${
                                    workout.type === 'Strength' ? 'text-fitness-primary' :
                                    workout.type === 'Cardio' ? 'text-red-500' : 'text-purple-500'
                                  }`} />
                                </div>
                                <div>
                                  <p className="font-medium">{workout.title}</p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <CalendarDays className="mr-1 h-3 w-3" />
                                    <span>{workout.date.toLocaleDateString()}</span>
                                    <Clock className="ml-2 mr-1 h-3 w-3" />
                                    <span>{workout.duration} min</span>
                                    <HeartPulse className="ml-2 mr-1 h-3 w-3" />
                                    <span>{workout.caloriesBurned} cal</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleDeleteWorkout(workout.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10">
                          <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium mb-2">No Workout History</p>
                          <p className="text-muted-foreground text-center mb-6">
                            You haven't recorded any workouts yet. Start tracking your fitness journey!
                          </p>
                          <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                            Record a Workout
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="glass">
                      <CardHeader>
                        <CardTitle className="text-lg">Workout Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-fitness-primary/10 p-2">
                              <Clock className="h-4 w-4 text-fitness-primary" />
                            </div>
                            <span>Total Time</span>
                          </div>
                          <p className="font-bold">
                            {workoutHistory.reduce((acc, workout) => acc + workout.duration, 0)} min
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-red-500/10 p-2">
                              <HeartPulse className="h-4 w-4 text-red-500" />
                            </div>
                            <span>Total Calories</span>
                          </div>
                          <p className="font-bold">
                            {workoutHistory.reduce((acc, workout) => acc + workout.caloriesBurned, 0)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-green-500/10 p-2">
                              <Dumbbell className="h-4 w-4 text-green-500" />
                            </div>
                            <span>Most Common</span>
                          </div>
                          <p className="font-bold">Strength</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="glass">
                      <CardHeader>
                        <CardTitle className="text-lg">Suggested Workouts</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border p-3 hover:bg-accent/50 cursor-pointer transition-colors">
                          <p className="font-medium">30-Min HIIT Circuit</p>
                          <p className="text-sm text-muted-foreground">Based on your recent activity</p>
                        </div>
                        <div className="rounded-lg border p-3 hover:bg-accent/50 cursor-pointer transition-colors">
                          <p className="font-medium">Full Body Strength</p>
                          <p className="text-sm text-muted-foreground">Recommended for your goals</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass mb-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl">Your Nutrition Plans</CardTitle>
                      <Button variant="outline" size="sm">
                        <Apple className="h-4 w-4 mr-2" />
                        Add New Plan
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {nutritionPlans.length > 0 ? (
                        <div className="space-y-4">
                          {nutritionPlans.map((plan) => (
                            <motion.div
                              key={plan.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className={`rounded-lg border p-4 ${plan.isActive ? 'border-green-500/30 bg-green-500/5' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`rounded-full p-2 ${
                                    plan.type === 'Muscle Gain' ? 'bg-fitness-primary/10' :
                                    plan.type === 'Weight Loss' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                                  }`}>
                                    <Apple className={`h-5 w-5 ${
                                      plan.type === 'Muscle Gain' ? 'text-fitness-primary' :
                                      plan.type === 'Weight Loss' ? 'text-blue-500' : 'text-purple-500'
                                    }`} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{plan.name}</p>
                                      {plan.isActive && (
                                        <Badge variant="outline" className="border-green-500 text-green-500">Active</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{plan.type}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => handleDeleteNutritionPlan(plan.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant={plan.isActive ? "default" : "outline"} 
                                    size="sm"
                                    className={plan.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                                    onClick={() => handleToggleNutritionPlan(plan.id)}
                                  >
                                    {plan.isActive ? (
                                      <>
                                        <Check className="h-4 w-4 mr-1" />
                                        Active
                                      </>
                                    ) : "Activate"}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="text-center p-2 bg-accent rounded-md">
                                  <p className="text-xs text-muted-foreground">Protein</p>
                                  <p className="font-bold">{plan.macros.protein}%</p>
                                </div>
                                <div className="text-center p-2 bg-accent rounded-md">
                                  <p className="text-xs text-muted-foreground">Carbs</p>
                                  <p className="font-bold">{plan.macros.carbs}%</p>
                                </div>
                                <div className="text-center p-2 bg-accent rounded-md">
                                  <p className="text-xs text-muted-foreground">Fats</p>
                                  <p className="font-bold">{plan.macros.fats}%</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground mt-4">
                                <CalendarDays className="mr-1 h-3 w-3" />
                                <span>Started {plan.startDate.toLocaleDateString()}</span>
                                {plan.endDate && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <span>Ended {plan.endDate.toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10">
                          <Apple className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium mb-2">No Nutrition Plans</p>
                          <p className="text-muted-foreground text-center mb-6">
                            You haven't added any nutrition plans yet. Start optimizing your diet!
                          </p>
                          <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                            Browse Nutrition Plans
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="glass">
                      <CardHeader>
                        <CardTitle className="text-lg">Daily Nutrition Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Calories</span>
                              <span className="font-medium">1845 / 2200</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[84%] rounded-full bg-green-500"></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Protein</span>
                              <span className="font-medium">110g / 140g</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[78%] rounded-full bg-fitness-primary"></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Water</span>
                              <span className="font-medium">1.8L / 3.0L</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-full w-[60%] rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="glass">
                      <CardHeader>
                        <CardTitle className="text-lg">Meal Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="rounded-lg border p-3 hover:bg-accent/50 cursor-pointer transition-colors">
                            <p className="font-medium">Protein-rich breakfast</p>
                            <p className="text-sm text-muted-foreground">Based on your current plan</p>
                          </div>
                          <div className="rounded-lg border p-3 hover:bg-accent/50 cursor-pointer transition-colors">
                            <p className="font-medium">Post-workout smoothie</p>
                            <p className="text-sm text-muted-foreground">Optimized for recovery</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass mb-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="workout-reminders">Workout Reminders</Label>
                            </div>
                            <Switch 
                              id="workout-reminders" 
                              checked={notificationSettings.workoutReminders}
                              onCheckedChange={() => handleToggleNotification('workoutReminders')}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                            </div>
                            <Switch 
                              id="achievement-alerts" 
                              checked={notificationSettings.achievementAlerts}
                              onCheckedChange={() => handleToggleNotification('achievementAlerts')}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="newsletter-emails">Newsletter Emails</Label>
                            </div>
                            <Switch 
                              id="newsletter-emails" 
                              checked={notificationSettings.newsletterEmails}
                              onCheckedChange={() => handleToggleNotification('newsletterEmails')}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="app-updates">App Updates</Label>
                            </div>
                            <Switch 
                              id="app-updates" 
                              checked={notificationSettings.appUpdates}
                              onCheckedChange={() => handleToggleNotification('appUpdates')}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Privacy</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="public-profile">Public Profile</Label>
                            </div>
                            <Switch id="public-profile" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                            </div>
                            <Switch id="two-factor" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Account Actions</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Button 
                            variant="outline" 
                            className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                            onClick={handleLogout}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="border-destructive text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Account
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your
                                  account and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={handleDeleteAccount}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete Account
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        
                        <div className="rounded-md bg-muted p-4 mt-2">
                          <div className="flex items-start">
                            <AlertCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div className="ml-3">
                              <p className="text-sm text-muted-foreground">
                                Deleting your account will remove all of your data and cannot be undone.
                                Make sure to download any data you want to keep before proceeding.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
