
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/custom/FormInput";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { toast } = useToast();
  const { signup, loginWithGoogle, loginWithFacebook, user } = useUser();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      await signup(name, email, password);
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created. Welcome to FitnessFreaks!"
      });
      
      navigate('/');
      
    } catch (error: any) {
      // If the error is about email already in use
      const errorMessage = error.response?.data?.message || "Sign up failed. Please try again.";
      
      if (errorMessage.includes('User already exists') || errorMessage.includes('duplicate key')) {
        setErrors({
          ...errors,
          email: "This email is already registered"
        });
      }
      
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    loginWithGoogle();
  };

  const handleFacebookSignup = () => {
    loginWithFacebook();
  };
  
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 items-center justify-center">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-fitness-primary">
              <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-white">FF</span>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              FitnessFreaks
            </span>
          </Link>
        </div>
        
        <Card className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900 overflow-hidden">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center text-lg">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <FormInput
                label="Full Name"
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name}
                required
                className="rounded-xl border-gray-300 h-12 text-base"
              />
              
              <FormInput
                label="Email"
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
                required
                className="rounded-xl border-gray-300 h-12 text-base"
              />
              
              <FormInput
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
                description="Password must be at least 6 characters."
                required
                className="rounded-xl border-gray-300 h-12 text-base"
              />
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor="terms" 
                    className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.terms ? 'text-destructive' : ''}`}
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-fitness-primary hover:text-fitness-secondary">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-fitness-primary hover:text-fitness-secondary">
                      Privacy Policy
                    </Link>
                  </Label>
                  {errors.terms && (
                    <p className="text-xs text-destructive">{errors.terms}</p>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base rounded-xl bg-fitness-primary hover:bg-fitness-secondary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-12 rounded-xl border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleGoogleSignup}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M15.5 8.5c1 0 1.5-.5 2.5-1 .5 1 1 2.5 1 4 0 3.5-2 6-5.5 6S8 15 8 11.5c0-2 1-4 2-5"></path>
                  <path d="M12 8.5V3"></path>
                  <circle cx="12" cy="11.5" r="2.5"></circle>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="h-12 rounded-xl border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleFacebookSignup}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-facebook mr-2" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col pt-0">
            <p className="text-center text-base mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-fitness-primary hover:text-fitness-secondary">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
