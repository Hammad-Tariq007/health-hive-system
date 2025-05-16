
import React, { useState } from 'react';
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

// Mock data for the charts
const weightData = [
  { name: 'Jan', weight: 185 },
  { name: 'Feb', weight: 182 },
  { name: 'Mar', weight: 178 },
  { name: 'Apr', weight: 175 },
  { name: 'May', weight: 172 },
  { name: 'Jun', weight: 170 },
  { name: 'Jul', weight: 168 },
];

const caloriesData = [
  { name: 'Mon', calories: 450 },
  { name: 'Tue', calories: 300 },
  { name: 'Wed', calories: 520 },
  { name: 'Thu', calories: 400 },
  { name: 'Fri', calories: 380 },
  { name: 'Sat', calories: 600 },
  { name: 'Sun', calories: 250 },
];

const ProgressPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [trackingType, setTrackingType] = useState("weight");
  const [weight, setWeight] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [water, setWater] = useState<string>("");
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log({
      date,
      trackingType,
      weight: trackingType === "weight" ? weight : null,
      calories: trackingType === "calories" ? calories : null,
      water: trackingType === "water" ? water : null,
    });
    
    // Reset form and close dialog
    setOpen(false);
    setWeight("");
    setCalories("");
    setWater("");
  };

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
                <div className="grid grid-cols-3 gap-2">
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
            <div className="text-2xl font-bold">168 lbs</div>
            <p className="text-xs text-muted-foreground">-2 lbs from last month</p>
            <Progress value={80} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned (Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,900 kcal</div>
            <p className="text-xs text-muted-foreground">+300 kcal from last week</p>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Workout Consistency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Water Intake (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64 oz</div>
            <p className="text-xs text-muted-foreground">80% of daily goal</p>
            <Progress value={80} className="mt-2" />
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
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#7E69AB" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <Droplets className="h-24 w-24 text-blue-400 mx-auto" />
                <div>
                  <h3 className="text-2xl font-bold">64 oz / 80 oz</h3>
                  <p className="text-muted-foreground">80% of daily goal</p>
                </div>
                <Progress value={80} className="h-4 w-full max-w-md" />
              </div>
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
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-sm text-muted-foreground">{day}</div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i < 5 ? 'bg-primary text-white' : 'bg-muted'}`}>
                    {i < 5 ? <Dumbbell className="h-5 w-5" /> : ''}
                  </div>
                </div>
              ))}
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
