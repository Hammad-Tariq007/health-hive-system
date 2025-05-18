
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, Dumbbell, FileText, Apple } from "lucide-react";

const AdminDashboard = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is admin, if not redirect
  useEffect(() => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!isAdmin()) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, isAdmin, navigate, toast]);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}. Here's an overview of the platform.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,850</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-xs text-muted-foreground">
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workout Plans</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nutrition Plans</CardTitle>
                <Apple className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  +3 new this month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[240px] bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Active users over time
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sign Ups</CardTitle>
                <CardDescription>Showing latest 5 users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">User {i + 1}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="rounded-full px-2.5 py-0.5 text-xs bg-muted">
                        New
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/admin/users" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Users
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Manage your platform content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Link to="/admin/users">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link to="/admin/workouts">
                    <Button variant="outline" className="w-full justify-start">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Manage Workouts
                    </Button>
                  </Link>
                  <Link to="/admin/nutrition">
                    <Button variant="outline" className="w-full justify-start">
                      <Apple className="mr-2 h-4 w-4" />
                      Manage Nutrition Plans
                    </Button>
                  </Link>
                  <Link to="/admin/blog">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Manage Blog Posts
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Services</span>
                    <span className="text-sm font-medium flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <span className="text-sm font-medium flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Authentication</span>
                    <span className="text-sm font-medium flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage</span>
                    <span className="text-sm font-medium flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Operational
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
