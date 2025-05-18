
import { useState, useEffect } from "react";
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
import { useUser } from "@/contexts/UserContext";
import { FormInput } from "@/components/ui/custom/FormInput";
import { User, Lock, Heart, Mail, Info, Save, ArrowLeft, Upload, UserRound, Loader2 } from "lucide-react";

const EditProfile = () => {
  const { toast } = useToast();
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Initialize form with user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "other",
        age: user.age ? String(user.age) : "",
        height: user.height ? String(user.height) : "",
        weight: user.weight ? String(user.weight) : "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, navigate, toast, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user selects a new value
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validatePersonalInfo = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePhysicalInfo = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (formData.age && (parseInt(formData.age) < 1 || parseInt(formData.age) > 120)) {
      newErrors.age = "Age must be between 1 and 120";
    }
    
    if (formData.height && (parseInt(formData.height) < 50 || parseInt(formData.height) > 300)) {
      newErrors.height = "Height must be between 50cm and 300cm";
    }
    
    if (formData.weight && (parseInt(formData.weight) < 20 || parseInt(formData.weight) > 500)) {
      newErrors.weight = "Weight must be between 20kg and 500kg";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePassword = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (formData.newPassword) {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(formData.newPassword)) {
        newErrors.newPassword = "Password must be at least 8 characters with a number and special character";
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePersonalInfo()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await updateUser({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your personal information has been successfully saved."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePhysicalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhysicalInfo()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await updateUser({
        age: formData.age ? parseInt(formData.age) : undefined,
        height: formData.height ? parseInt(formData.height) : undefined,
        weight: formData.weight ? parseInt(formData.weight) : undefined
      });
      
      toast({
        title: "Physical Info Updated",
        description: "Your physical information has been successfully saved."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);
    
    // This is where you'd handle password changes in a real app
    // For this demo, we'll just simulate a successful update
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed."
    });
    
    // Clear password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
    
    setIsLoading(false);
  };
  
  // If no user and still loading, show loading state
  if (!user && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-fitness-primary" />
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
                    <AvatarFallback>{formData.name?.substring(0, 2) || 'U'}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full bg-background shadow-md"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="mt-4 text-2xl font-bold">{formData.name || 'Your Name'}</h2>
                <p className="text-muted-foreground">@{formData.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
                
                <div className="mt-6 w-full space-y-4">
                  <div className="flex items-center text-left text-sm">
                    <Mail className="mr-2 h-4 w-4 text-fitness-primary" />
                    <span>{formData.email || 'email@example.com'}</span>
                  </div>
                  
                  <div className="flex items-center text-left text-sm">
                    <UserRound className="mr-2 h-4 w-4 text-fitness-primary" />
                    <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'May 2023'}</span>
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
                        <FormInput 
                          label="Full Name"
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                          placeholder="Enter your full name" 
                          required
                        />
                        
                        <FormInput 
                          label="Email"
                          id="email" 
                          name="email" 
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          placeholder="Enter your email address" 
                          required
                        />
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
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving Changes...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="physical" className="space-y-4 pt-4">
                    <form onSubmit={handlePhysicalInfoSubmit} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <FormInput 
                          label="Age"
                          id="age" 
                          name="age" 
                          type="number"
                          min="1"
                          max="120"
                          value={formData.age}
                          onChange={handleChange}
                          error={errors.age}
                          placeholder="Enter your age" 
                        />
                        
                        <FormInput 
                          label="Height (cm)"
                          id="height" 
                          name="height" 
                          type="number"
                          min="50"
                          max="300"
                          value={formData.height}
                          onChange={handleChange}
                          error={errors.height}
                          placeholder="Enter your height"
                        />
                        
                        <FormInput 
                          label="Weight (kg)"
                          id="weight" 
                          name="weight" 
                          type="number"
                          min="20"
                          max="500"
                          value={formData.weight}
                          onChange={handleChange}
                          error={errors.weight}
                          placeholder="Enter your weight"
                        />
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
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving Changes...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-4 pt-4">
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <FormInput 
                        label="Current Password"
                        id="current-password" 
                        name="currentPassword" 
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        error={errors.currentPassword}
                        placeholder="Enter your current password" 
                        required
                      />
                      
                      <FormInput 
                        label="New Password"
                        id="new-password" 
                        name="newPassword" 
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        error={errors.newPassword}
                        placeholder="Choose a new password"
                        description="Password must be at least 8 characters with a number and special character"
                        required
                      />
                      
                      <FormInput 
                        label="Confirm New Password"
                        id="confirm-password" 
                        name="confirmPassword" 
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        placeholder="Confirm your new password" 
                        required
                      />
                      
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
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating Password...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Update Password
                          </>
                        )}
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
