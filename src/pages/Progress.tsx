
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Progress = () => {
  const [date, setDate] = useState<Date>(new Date());

  // Mock data for charts
  const weightData = [
    { date: "Week 1", weight: 185 },
    { date: "Week 2", weight: 183 },
    { date: "Week 3", weight: 181 },
    { date: "Week 4", weight: 182 },
    { date: "Week 5", weight: 180 },
    { date: "Week 6", weight: 178 },
    { date: "Week 7", weight: 176 },
    { date: "Week 8", weight: 175 },
  ];

  const workoutData = [
    { date: "Mon", minutes: 45, calories: 320 },
    { date: "Tue", minutes: 0, calories: 0 },
    { date: "Wed", minutes: 60, calories: 450 },
    { date: "Thu", minutes: 30, calories: 200 },
    { date: "Fri", minutes: 0, calories: 0 },
    { date: "Sat", minutes: 90, calories: 650 },
    { date: "Sun", minutes: 45, calories: 350 },
  ];

  const measurementData = [
    { date: "Jan", chest: 42, waist: 36, arms: 15 },
    { date: "Feb", chest: 43, waist: 35, arms: 15.5 },
    { date: "Mar", chest: 43.5, waist: 34, arms: 16 },
    { date: "Apr", chest: 44, waist: 33, arms: 16.5 },
    { date: "May", chest: 44.5, waist: 32, arms: 17 },
  ];

  const streakData = [
    { date: "Mon", completed: true },
    { date: "Tue", completed: true },
    { date: "Wed", completed: true },
    { date: "Thu", completed: false },
    { date: "Fri", completed: true },
    { date: "Sat", completed: true },
    { date: "Sun", completed: false },
  ];

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground">
          Monitor your fitness journey and track your improvements over time.
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="flex-1">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Current Weight</CardTitle>
                    <CardDescription>Last 8 weeks</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weightData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                          <Tooltip />
                          <Line type="monotone" dataKey="weight" stroke="#9b87f5" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Activity</CardTitle>
                    <CardDescription>This week's workout minutes</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workoutData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="minutes" fill="#9b87f5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Streak</CardTitle>
                    <CardDescription>Keep your workout streak going!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-center py-4">
                      <div className="flex space-x-2">
                        {streakData.map((day, index) => (
                          <div key={index} className="flex flex-col items-center gap-2">
                            <div
                              className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center",
                                day.completed
                                  ? "bg-fitness-primary text-white"
                                  : "bg-gray-100 text-gray-400"
                              )}
                            >
                              {day.completed ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-6 w-6"
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              ) : null}
                            </div>
                            <span className="text-xs font-medium">{day.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-bold">5 Day Streak</p>
                      <p className="text-muted-foreground">You're on fire! Keep it up!</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Calories Burned</CardTitle>
                    <CardDescription>This week's estimated burn</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-center h-[180px] space-x-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-fitness-primary mb-2">1,970</div>
                        <p className="text-sm text-muted-foreground">Weekly Total</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">281</div>
                        <p className="text-sm text-muted-foreground">Daily Average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Workout Summary</CardTitle>
                    <CardDescription>Your activity this month</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-center h-[180px] space-x-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-fitness-primary mb-2">15</div>
                        <p className="text-sm text-muted-foreground">Workouts Completed</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">12h 30m</div>
                        <p className="text-sm text-muted-foreground">Total Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="weight">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Tracking</CardTitle>
                  <CardDescription>Monitor your weight changes over time</CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <Select defaultValue="8weeks">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4weeks">Last 4 weeks</SelectItem>
                        <SelectItem value="8weeks">Last 8 weeks</SelectItem>
                        <SelectItem value="6months">Last 6 months</SelectItem>
                        <SelectItem value="1year">Last year</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      Add Weight Entry
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="weight" name="Weight (lbs)" stroke="#9b87f5" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Weight History</h4>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-3 bg-muted p-3 rounded-t-md">
                        <div className="font-medium">Date</div>
                        <div className="font-medium">Weight</div>
                        <div className="font-medium">Change</div>
                      </div>
                      <div className="divide-y">
                        {weightData.map((entry, index) => {
                          const prevWeight = index < weightData.length - 1 ? weightData[index + 1].weight : entry.weight;
                          const change = entry.weight - prevWeight;
                          
                          return (
                            <div key={index} className="grid grid-cols-3 p-3">
                              <div>{entry.date}</div>
                              <div>{entry.weight} lbs</div>
                              <div className={cn(
                                change === 0 ? "text-gray-500" : change < 0 ? "text-green-600" : "text-red-600"
                              )}>
                                {change === 0 ? "-" : change < 0 ? change : `+${change}`} lbs
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="workouts">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Activity</CardTitle>
                  <CardDescription>Track your workout frequency and intensity</CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <Select defaultValue="thisweek">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thisweek">This Week</SelectItem>
                        <SelectItem value="lastweek">Last Week</SelectItem>
                        <SelectItem value="thismonth">This Month</SelectItem>
                        <SelectItem value="lastmonth">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      Log Workout
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="h-[250px]">
                      <h4 className="font-medium mb-3">Minutes per Day</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workoutData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="minutes" name="Minutes" fill="#9b87f5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="h-[250px]">
                      <h4 className="font-medium mb-3">Calories Burned</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workoutData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="calories" name="Calories" fill="#7E69AB" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Recent Workouts</h4>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-4 bg-muted p-3 rounded-t-md">
                        <div className="font-medium">Date</div>
                        <div className="font-medium">Workout</div>
                        <div className="font-medium">Duration</div>
                        <div className="font-medium">Calories</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-3">
                          <div>Today</div>
                          <div>Upper Body Strength</div>
                          <div>45 min</div>
                          <div>350 cal</div>
                        </div>
                        <div className="grid grid-cols-4 p-3">
                          <div>May 15</div>
                          <div>HIIT Cardio</div>
                          <div>30 min</div>
                          <div>400 cal</div>
                        </div>
                        <div className="grid grid-cols-4 p-3">
                          <div>May 13</div>
                          <div>Lower Body Strength</div>
                          <div>60 min</div>
                          <div>450 cal</div>
                        </div>
                        <div className="grid grid-cols-4 p-3">
                          <div>May 12</div>
                          <div>Full Body HIIT</div>
                          <div>45 min</div>
                          <div>380 cal</div>
                        </div>
                        <div className="grid grid-cols-4 p-3">
                          <div>May 10</div>
                          <div>Core & Mobility</div>
                          <div>30 min</div>
                          <div>200 cal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="measurements">
              <Card>
                <CardHeader>
                  <CardTitle>Body Measurements</CardTitle>
                  <CardDescription>Track changes in your body composition</CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <Select defaultValue="6months">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">Last 3 months</SelectItem>
                        <SelectItem value="6months">Last 6 months</SelectItem>
                        <SelectItem value="1year">Last year</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      Add Measurement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={measurementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="chest" name="Chest (in)" stroke="#9b87f5" strokeWidth={2} />
                        <Line type="monotone" dataKey="waist" name="Waist (in)" stroke="#7E69AB" strokeWidth={2} />
                        <Line type="monotone" dataKey="arms" name="Arms (in)" stroke="#6E59A5" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Latest Measurements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Current</CardTitle>
                          <CardDescription>May 2025</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Chest:</span>
                              <span className="font-medium">44.5 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Waist:</span>
                              <span className="font-medium">32 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Hips:</span>
                              <span className="font-medium">40 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Arms:</span>
                              <span className="font-medium">17 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Thighs:</span>
                              <span className="font-medium">24 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Calves:</span>
                              <span className="font-medium">16 in</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Progress</CardTitle>
                          <CardDescription>Changes since starting</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Chest:</span>
                              <span className="font-medium text-green-600">+2.5 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Waist:</span>
                              <span className="font-medium text-green-600">-4 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Hips:</span>
                              <span className="font-medium text-green-600">-2 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Arms:</span>
                              <span className="font-medium text-green-600">+2 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Thighs:</span>
                              <span className="font-medium text-green-600">-1 in</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Calves:</span>
                              <span className="font-medium text-green-600">+0.5 in</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-[300px]">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Log Today's Activity</CardTitle>
              <div className="flex items-center mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Weight</h4>
                <div className="flex gap-2">
                  <Input type="number" placeholder="175" className="flex-1" />
                  <Select defaultValue="lbs">
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Workout</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upper">Upper Body</SelectItem>
                    <SelectItem value="lower">Lower Body</SelectItem>
                    <SelectItem value="fullbody">Full Body</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="custom">Custom Workout</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Duration</label>
                    <div className="flex">
                      <Input type="number" placeholder="45" className="flex-1" />
                      <div className="bg-muted px-3 flex items-center rounded-r-md border-y border-r">
                        min
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Calories</label>
                    <div className="flex">
                      <Input type="number" placeholder="320" className="flex-1" />
                      <div className="bg-muted px-3 flex items-center rounded-r-md border-y border-r">
                        cal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Notes</h4>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How did your workout feel today?"
                  rows={3}
                />
              </div>
              
              <Button className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                Save Entry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
