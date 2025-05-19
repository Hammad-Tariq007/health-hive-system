
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/custom/FormInput";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Facebook } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { toast } = useToast();
  const { signup, loginWithGoogle, loginWithFacebook } = useUser();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Make password validation less strict for better user experience
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
      
      // Redirect to login page with a state flag to show success message
      navigate('/login', { state: { fromSignup: true } });
      
    } catch (error: any) {
      // If the error is about email already in use
      if (error.message && error.message.includes('Email already in use')) {
        setErrors({
          ...errors,
          email: "This email is already registered"
        });
      } else {
        toast({
          title: "Sign up failed",
          description: "There was a problem creating your account.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Google signup error:", error);
      toast({
        title: "Google signup failed",
        description: "There was a problem signing up with Google.",
        variant: "destructive"
      });
    }
  };

  const handleFacebookSignup = async () => {
    try {
      await loginWithFacebook();
      navigate('/');
    } catch (error) {
      console.error("Facebook signup error:", error);
      toast({
        title: "Facebook signup failed",
        description: "There was a problem signing up with Facebook.",
        variant: "destructive"
      });
    }
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
        
        <Card className="border-2 overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Full Name"
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name}
                required
              />
              
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
                description="Password must be at least 6 characters."
                required
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
                className="w-full bg-fitness-primary hover:bg-fitness-secondary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
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
                onClick={handleGoogleSignup}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mr-2" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleFacebookSignup}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-gray-500">
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
