
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon, TrendingUp, Droplets, Dumbbell } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { progressAPI } from '@/api';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';

interface ProgressData {
  _id: string;
  date: string;
  weight?: number;
  calories?: number;
  workoutsCompleted?: number;
  waterIntake?: number;
  notes?: string;
  photos?: string[];
}

const ProgressPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [trackingType, setTrackingType] = useState("weight");
  const [weight, setWeight] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [water, setWater] = useState<string>("");
  const [workoutsCompleted, setWorkoutsCompleted] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useUser();
  
  useEffect(() => {
    const fetchProgressData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const response = await progressAPI.getProgress();
        setProgressData(response.data.progress);
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
        toast({
          title: "Error",
          description: "Failed to load progress data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProgressData();
  }, [user, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !date) return;
    
    try {
      const formData = new FormData();
      
      if (trackingType === "weight" && weight) {
        formData.append('weight', weight);
      }
      
      if (trackingType === "calories" && calories) {
        formData.append('calories', calories);
      }
      
      if (trackingType === "water" && water) {
        formData.append('waterIntake', water);
      }
      
      if (trackingType === "workouts" && workoutsCompleted) {
        formData.append('workoutsCompleted', workoutsCompleted);
      }
      
      // Format date to ISO string for backend
      formData.append('date', date.toISOString());
      
      const response = await progressAPI.createProgress(formData);
      
      // Add new entry to state
      setProgressData([response.data.progress, ...progressData]);
      
      // Reset form and close dialog
      setOpen(false);
      setWeight("");
      setCalories("");
      setWater("");
      setWorkoutsCompleted("");
      
      toast({
        title: "Progress Updated",
        description: "Your progress has been successfully recorded.",
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Process data for charts
  const weightData = progressData
    .filter(entry => entry.weight)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      weight: entry.weight
    }));

  const caloriesData = progressData
    .filter(entry => entry.calories)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      calories: entry.calories
    }));
    
  const waterData = progressData
    .filter(entry => entry.waterIntake)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      water: entry.waterIntake
    }));

  // Calculate current stats
  const currentWeight = weightData.length > 0 ? weightData[weightData.length - 1].weight : 0;
  const previousWeight = weightData.length > 1 ? weightData[weightData.length - 2].weight : currentWeight;
  const weightChange = currentWeight - previousWeight;
  
  const weeklyCalories = caloriesData
    .slice(-7)
    .reduce((sum, entry) => sum + (entry.calories || 0), 0);
    
  const workoutConsistency = progressData
    .filter(entry => entry.workoutsCompleted && entry.workoutsCompleted > 0)
    .length / (progressData.length || 1) * 100;
    
  const latestWaterIntake = waterData.length > 0 ? waterData[waterData.length - 1].water : 0;
  const waterGoal = 80; // 80oz daily goal
  const waterPercentage = Math.min((latestWaterIntake / waterGoal) * 100, 100);

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your fitness journey with detailed metrics</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <TrendingUp className="h-4 w-4" /> Log Progress
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Your Progress</DialogTitle>
              <DialogDescription>
                Keep track of your fitness journey by logging your stats regularly.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="track-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>What are you tracking?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button"
                    variant={trackingType === "weight" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setTrackingType("weight")}
                  >
                    Weight
                  </Button>
                  <Button 
                    type="button"
                    variant={trackingType === "calories" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setTrackingType("calories")}
                  >
                    Calories
                  </Button>
                  <Button 
                    type="button"
                    variant={trackingType === "water" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setTrackingType("water")}
                  >
                    Water
                  </Button>
                  <Button 
                    type="button"
                    variant={trackingType === "workouts" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setTrackingType("workouts")}
                  >
                    Workouts
                  </Button>
                </div>
              </div>
              
              {trackingType === "weight" && (
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input 
                    id="weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              )}
              
              {trackingType === "calories" && (
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories Burned</Label>
                  <Input 
                    id="calories"
                    type="number"
                    placeholder="Enter calories burned"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>
              )}
              
              {trackingType === "water" && (
                <div className="space-y-2">
                  <Label htmlFor="water">Water Intake (oz)</Label>
                  <Input 
                    id="water"
                    type="number"
                    placeholder="Enter water intake"
                    value={water}
                    onChange={(e) => setWater(e.target.value)}
                  />
                </div>
              )}
              
              {trackingType === "workouts" && (
                <div className="space-y-2">
                  <Label htmlFor="workouts">Workouts Completed</Label>
                  <Input 
                    id="workouts"
                    type="number"
                    placeholder="Enter number of workouts"
                    value={workoutsCompleted}
                    onChange={(e) => setWorkoutsCompleted(e.target.value)}
                  />
                </div>
              )}
              
              <DialogFooter>
                <Button type="submit">Save Progress</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeight || 0} lbs</div>
            <p className="text-xs text-muted-foreground">
              {weightChange !== 0 ? 
                `${weightChange > 0 ? '+' : ''}${weightChange} lbs from last entry` : 
                'No previous entries to compare'
              }
            </p>
            <Progress 
              value={currentWeight ? 80 : 0} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned (Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyCalories || 0} kcal</div>
            <p className="text-xs text-muted-foreground">
              {caloriesData.length > 0 ? 'From the last 7 days' : 'No data recorded yet'}
            </p>
            <Progress 
              value={weeklyCalories ? Math.min(weeklyCalories / 30, 100) : 0} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Workout Consistency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workoutConsistency ? Math.round(workoutConsistency) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {progressData.length > 0 ? 'Based on your tracking history' : 'No workouts logged yet'}
            </p>
            <Progress value={workoutConsistency || 0} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Water Intake (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestWaterIntake || 0} oz</div>
            <p className="text-xs text-muted-foreground">
              {waterPercentage ? `${Math.round(waterPercentage)}% of daily goal` : 'No intake tracked yet'}
            </p>
            <Progress value={waterPercentage || 0} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="calories">Calories</TabsTrigger>
          <TabsTrigger value="water">Water</TabsTrigger>
        </TabsList>
        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight Tracking</CardTitle>
              <CardDescription>
                Your weight progress over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {weightData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      name="Weight (lbs)"
                      stroke="#9b87f5" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">
                    No weight data recorded yet. Log your weight to see progress.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calories Burned</CardTitle>
              <CardDescription>
                Track your calorie expenditure
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {caloriesData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={caloriesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="calories"
                      name="Calories (kcal)" 
                      stroke="#7E69AB" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">
                    No calorie data recorded yet. Log your calories to see progress.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="water" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Intake</CardTitle>
              <CardDescription>
                Track your daily hydration
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {waterData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={waterData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="water"
                      name="Water (oz)" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center flex-col">
                  <Droplets className="h-24 w-24 text-blue-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No water intake recorded yet. Log your hydration to see progress.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workout Consistency</CardTitle>
            <CardDescription>Your weekly workout streak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                // Example logic to check if workout was done on this day
                // This would need to be replaced with actual data
                const hasWorkout = i < 5; // Sample static data
                
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-sm text-muted-foreground">{day}</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasWorkout ? 'bg-primary text-white' : 'bg-muted'}`}>
                      {hasWorkout ? <Dumbbell className="h-5 w-5" /> : ''}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              You've completed 5/7 workouts this week
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Body Stats</CardTitle>
            <CardDescription>Track your body measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Body Fat</p>
                <p className="text-lg font-semibold">18%</p>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Muscle Mass</p>
                <p className="text-lg font-semibold">42%</p>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">BMI</p>
                <p className="text-lg font-semibold">23.5</p>
                <Progress value={70} className="h-2" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Waist</p>
                <p className="text-lg font-semibold">32"</p>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
