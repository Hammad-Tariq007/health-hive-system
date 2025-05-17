
import { useState } from "react";
import { Link } from "react-router-dom";
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
  Calculator
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
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
                    <AvatarFallback>JD</AvatarFallback>
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
                
                <h2 className="mt-4 text-2xl font-bold">Jane Doe</h2>
                <p className="text-muted-foreground">@janefitness</p>
                
                <Badge className="mt-3 bg-fitness-primary">Premium Member</Badge>
                
                <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl">42</p>
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
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Your Workout History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">View your recent workouts and performance history.</p>
                    <div className="mt-4 space-y-4">
                      {/* Workout history items would go here */}
                      <p>Workout history content to be implemented</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Nutrition Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Track your meals and nutrition goals.</p>
                    <div className="mt-4 space-y-4">
                      {/* Nutrition content would go here */}
                      <p>Nutrition tracking content to be implemented</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Manage your account preferences and settings.</p>
                    <div className="mt-4 space-y-4">
                      {/* Settings controls would go here */}
                      <p>Settings content to be implemented</p>
                    </div>
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
