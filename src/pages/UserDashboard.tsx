
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Trophy, Dumbbell, Apple, LineChart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's your fitness journey overview.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            May 16, 2025
          </Button>
          <Button>
            <Trophy className="mr-2 h-4 w-4" />
            View Goals
          </Button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-primary/50 to-secondary/50 p-6 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M37.5,-48.1C52.1,-39.2,69.5,-31,74.8,-17.9C80.1,-4.8,73.3,13.3,63.1,27.8C52.9,42.4,39.2,53.5,23.4,60.6C7.6,67.7,-10.3,70.8,-25.3,65.1C-40.3,59.4,-52.3,45,-60.9,28.7C-69.5,12.4,-74.6,-5.7,-70.7,-21.9C-66.9,-38.1,-54,-52.3,-39.3,-61.1C-24.6,-69.9,-8.2,-73.2,4.8,-69C17.9,-64.8,22.9,-57,37.5,-48.1Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white">
            <AvatarImage src="https://i.pravatar.cc/150?img=8" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <Badge className="w-fit mx-auto sm:mx-0">Premium Member</Badge>
            </div>
            
            <p className="text-muted-foreground mb-4">Goal: Lose weight and build muscle</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Workouts</p>
                <p className="text-xl font-bold">42</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="text-xl font-bold">7 days</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Weight Loss</p>
                <p className="text-xl font-bold">5.2 lbs</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Points</p>
                <p className="text-xl font-bold">1,240</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <Button variant="outline" className="bg-white/20 border-white/30">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Goal</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500 / 3,000</div>
            <p className="text-xs text-muted-foreground mb-2">Calories burned</p>
            <Progress value={83} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Workout</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium mb-1">Upper Body Strength</div>
            <div className="flex items-center text-xs text-muted-foreground mb-4">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Today, 5:30 PM • 45 min
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Workout Details
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Diet Plan</CardTitle>
            <Apple className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium mb-1">High Protein Cutting</div>
            <div className="text-xs text-muted-foreground mb-2">1,850 calories • 170g protein</div>
            <div className="grid grid-cols-3 gap-1 mb-4">
              <Badge variant="outline" className="w-full flex justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>
                40%
              </Badge>
              <Badge variant="outline" className="w-full flex justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                35%
              </Badge>
              <Badge variant="outline" className="w-full flex justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2l3 6.3 7 1-5 4.8 1.2 6.9-6.2-3.2Z"/></svg>
                25%
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Today's Meals
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Your fitness journey at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="workouts">Workouts</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>
              <TabsContent value="weight" className="h-[220px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center bg-muted/50 rounded-md">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Weight Progress Chart</span>
                </div>
              </TabsContent>
              <TabsContent value="workouts" className="h-[220px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center bg-muted/50 rounded-md">
                  <Dumbbell className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Workout Progress Chart</span>
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="h-[220px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center bg-muted/50 rounded-md">
                  <Apple className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Nutrition Progress Chart</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">
              View Detailed Reports
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent fitness actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded">
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Completed Workout</p>
                <p className="text-xs text-muted-foreground">Full Body HIIT</p>
                <p className="text-xs text-muted-foreground">Today, 9:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l18-5v12L3 14v-3z"/>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Logged Weight</p>
                <p className="text-xs text-muted-foreground">168 lbs (-0.5 lbs)</p>
                <p className="text-xs text-muted-foreground">Yesterday, 8:15 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded">
                <Apple className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Tracked Meal</p>
                <p className="text-xs text-muted-foreground">Lunch - Chicken Salad</p>
                <p className="text-xs text-muted-foreground">Yesterday, 1:20 PM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Achieved Goal</p>
                <p className="text-xs text-muted-foreground">7-Day Workout Streak</p>
                <p className="text-xs text-muted-foreground">Yesterday, 10:00 PM</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">
              View All Activity
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Quick Access */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Link to="/workouts">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <Dumbbell className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium text-center">My Workouts</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/nutrition">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <Apple className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium text-center">Nutrition Plans</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/progress">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <LineChart className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium text-center">Track Progress</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/community">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2">
                <path d="M17 7.5a4 4 0 0 0-4-4.5 3 3 0 0 0-3 3.5 4 4 0 0 0 4 4.5 3 3 0 0 0 3-3.5Z"/>
                <path d="M18.004 16.5a4 4 0 0 0-4-4.5H9.92c-2.264 0-4.096 1.732-4.333 3.983L5 21"/>
                <path d="M17 21H2V15a6 6 0 0 1 6-6"/>
              </svg>
              <p className="text-sm font-medium text-center">Community</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/blog">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2">
                <path d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"/>
                <path d="M13.5 7h-3a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5h-3"/>
                <path d="M12 12v3"/>
                <path d="M12 6v3"/>
              </svg>
              <p className="text-sm font-medium text-center">Blog & Tips</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/profile">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p className="text-sm font-medium text-center">My Profile</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
