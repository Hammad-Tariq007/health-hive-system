
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Heart, Mail, Info, Save, ArrowLeft, Upload, UserRound } from "lucide-react";

const EditProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  
  // User data state
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    gender: "female",
    age: "28",
    height: "165",
    weight: "58",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved."
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed."
      });
      setIsLoading(false);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    }, 1500);
  };
  
  return (
    <div className="container py-10 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <Card className="border-2 border-fitness-primary/10">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="relative mt-6">
                  <Avatar className="h-32 w-32 border-4 border-fitness-primary">
                    <AvatarImage src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full bg-background shadow-md"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="mt-4 text-2xl font-bold">Jane Doe</h2>
                <p className="text-muted-foreground">@janefitness</p>
                
                <div className="mt-6 w-full space-y-4">
                  <div className="flex items-center text-left text-sm">
                    <Mail className="mr-2 h-4 w-4 text-fitness-primary" />
                    <span>{formData.email}</span>
                  </div>
                  
                  <div className="flex items-center text-left text-sm">
                    <UserRound className="mr-2 h-4 w-4 text-fitness-primary" />
                    <span>Member since May 2023</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <Button 
                  variant="default" 
                  className="w-full bg-fitness-primary hover:bg-fitness-secondary"
                  onClick={() => navigate('/profile')}
                >
                  View Public Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-xl">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="personal" 
                  value={activeTab} 
                  onValueChange={setActiveTab} 
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Personal Info</span>
                    </TabsTrigger>
                    <TabsTrigger value="physical" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span className="hidden sm:inline">Physical Info</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="space-y-4 pt-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name" 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address" 
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup 
                          defaultValue={formData.gender} 
                          value={formData.gender}
                          onValueChange={(value) => handleSelectChange("gender", value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-fitness-primary hover:bg-fitness-secondary"
                        disabled={isLoading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Saving Changes..." : "Save Changes"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="physical" className="space-y-4 pt-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input 
                            id="age" 
                            name="age" 
                            type="number"
                            min="1"
                            max="120"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter your age" 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input 
                            id="height" 
                            name="height" 
                            type="number"
                            min="50"
                            max="300"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="Enter your height" 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input 
                            id="weight" 
                            name="weight" 
                            type="number"
                            min="20"
                            max="500"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Enter your weight" 
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fitness-goal">Primary Fitness Goal</Label>
                        <Select 
                          defaultValue="weight-loss"
                          onValueChange={(value) => handleSelectChange("fitnessGoal", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weight-loss">Weight Loss</SelectItem>
                            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                            <SelectItem value="strength">Strength</SelectItem>
                            <SelectItem value="endurance">Endurance</SelectItem>
                            <SelectItem value="flexibility">Flexibility</SelectItem>
                            <SelectItem value="general">General Fitness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-fitness-primary hover:bg-fitness-secondary"
                        disabled={isLoading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Saving Changes..." : "Save Changes"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-4 pt-4">
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          name="currentPassword" 
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          placeholder="Enter your current password" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          name="newPassword" 
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Choose a new password" 
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 8 characters with a number and special character
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          name="confirmPassword" 
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your new password" 
                          required
                        />
                      </div>
                      
                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start">
                          <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div className="ml-3">
                            <p className="text-sm text-muted-foreground">
                              For security reasons, please use a strong password that you don't use elsewhere.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-fitness-primary hover:bg-fitness-secondary"
                        disabled={isLoading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Updating Password..." : "Update Password"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
