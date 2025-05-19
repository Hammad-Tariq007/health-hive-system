
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/custom/FormInput";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { toast } = useToast();
  const { login, loginWithGoogle, loginWithFacebook, isAdmin } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle social authentication redirect and token
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');
    
    if (token) {
      // Store token and redirect
      localStorage.setItem('fitnessToken', token);
      
      toast({
        title: "Login successful",
        description: "Welcome to FitnessFreaks!"
      });
      
      // Redirect will happen automatically after getting user data in the UserContext
      window.location.href = '/';
    } else if (error) {
      toast({
        title: "Login failed",
        description: decodeURIComponent(error),
        variant: "destructive"
      });
    }
    
    // Check for successful registration from signup page
    const fromSignup = location.state?.fromSignup;
    if (fromSignup) {
      toast({
        title: "Account created",
        description: "Your account has been successfully created. Please login.",
      });
    }
  }, [location, navigate, toast]);
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
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
      await login(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome to FitnessFreaks!"
      });
      
      // Redirect based on user role
      if (isAdmin()) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      // Error is handled in the login function
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleFacebookLogin = () => {
    loginWithFacebook();
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
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
        
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Email"
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
                required
              />
              
              <FormInput
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
                required
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-fitness-primary hover:text-fitness-secondary"
                >
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-fitness-primary hover:bg-fitness-secondary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mr-2" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleFacebookLogin}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook mr-2" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-fitness-primary hover:text-fitness-secondary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
