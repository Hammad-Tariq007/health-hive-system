
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useUser, SubscriptionPlan } from "@/contexts/UserContext";
import { Check, Star, Award, CreditCard } from "lucide-react";

interface PricingTier {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  planType: SubscriptionPlan;
}

const Subscribe = () => {
  const { user, isLoading, updateSubscription } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  
  useEffect(() => {
    // If no user is logged in, redirect to login page
    if (!user && !isLoading) {
      toast({
        title: "Login Required",
        description: "Please log in to access subscription options",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, isLoading, navigate, toast]);

  // Pricing tiers
  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: {
        monthly: 0,
        yearly: 0
      },
      description: "Basic access to workouts and nutrition",
      features: [
        "5 Basic Workouts",
        "3 Nutrition Recipes",
        "Basic Progress Tracking",
        "Community Access (Read Only)"
      ],
      buttonText: "Current Plan",
      planType: "free"
    },
    {
      name: "Pro",
      price: {
        monthly: 9.99,
        yearly: 7.99
      },
      description: "Full access to premium content",
      features: [
        "Unlimited Workouts",
        "Full Nutrition Library",
        "Detailed Progress Analytics",
        "Community Participation",
        "Personalized Workout Plans"
      ],
      highlighted: true,
      buttonText: "Get Pro",
      planType: "pro"
    },
    {
      name: "Elite",
      price: {
        monthly: 19.99,
        yearly: 15.99
      },
      description: "Premium content plus coaching",
      features: [
        "Everything in Pro",
        "1-on-1 Virtual Coaching",
        "Custom Meal Plans",
        "Priority Support",
        "Early Access to New Features",
        "Exclusive Content"
      ],
      buttonText: "Go Elite",
      planType: "elite"
    }
  ];

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setProcessing(true);

    try {
      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user subscription
      await updateSubscription(plan);
      
      toast({
        title: "Subscription Successful!",
        description: `You are now a ${plan.charAt(0).toUpperCase() + plan.slice(1)} member!`,
        variant: "default"
      });
      
      // Redirect to profile or dashboard
      navigate('/profile');
      
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
      setSelectedPlan(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Upgrade Your <span className="text-fitness-primary">Fitness Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your fitness goals and unlock premium features to accelerate your progress.
          </p>
        </div>

        <div className="flex items-center justify-center mb-10">
          <span className={`text-sm mr-2 ${!isYearly ? "font-bold" : "text-muted-foreground"}`}>Monthly</span>
          <Switch 
            checked={isYearly} 
            onCheckedChange={setIsYearly}
            id="billing-toggle" 
          />
          <span className={`text-sm ml-2 ${isYearly ? "font-bold" : "text-muted-foreground"}`}>Yearly</span>
          {isYearly && (
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Save 20%
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <Card 
                className={`h-full flex flex-col ${tier.highlighted ? 
                  "border-fitness-primary shadow-lg dark:shadow-fitness-primary/20" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </div>
                    {tier.name === "Pro" && <Star className="h-6 w-6 text-yellow-500" />}
                    {tier.name === "Elite" && <Award className="h-6 w-6 text-fitness-primary" />}
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${isYearly ? tier.price.yearly : tier.price.monthly}
                    </span>
                    {' '}
                    <span className="text-muted-foreground">
                      {tier.price.monthly > 0 ? `/ ${isYearly ? 'year' : 'month'}` : ''}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${tier.highlighted ? 
                      "bg-fitness-primary hover:bg-fitness-secondary" : 
                      tier.name === "Free" ? "bg-gray-500" : ""}`}
                    onClick={() => handleSubscribe(tier.planType)}
                    disabled={processing || (user?.subscriptionPlan === tier.planType)}
                  >
                    {processing && selectedPlan === tier.planType ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                        Processing...
                      </>
                    ) : user?.subscriptionPlan === tier.planType ? (
                      "Current Plan"
                    ) : (
                      <>
                        {tier.price.monthly > 0 && <CreditCard className="mr-2 h-4 w-4" />}
                        {tier.buttonText}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Trusted by Fitness Enthusiasts Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-bold">NIKE</span>
            </div>
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-bold">ADIDAS</span>
            </div>
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-bold">UNDER ARMOUR</span>
            </div>
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-bold">PUMA</span>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-muted p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Can I cancel anytime?</h4>
                  <p className="text-muted-foreground">Yes, you can cancel your subscription at any time from your account settings.</p>
                </div>
                <div>
                  <h4 className="font-semibold">How do I change my plan?</h4>
                  <p className="text-muted-foreground">You can upgrade or downgrade your plan at any time from the subscription page.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Is there a free trial?</h4>
                  <p className="text-muted-foreground">We offer a 7-day free trial for all new Pro and Elite subscribers.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-2 border rounded-md flex items-center justify-center">Visa</div>
                <div className="p-2 border rounded-md flex items-center justify-center">Mastercard</div>
                <div className="p-2 border rounded-md flex items-center justify-center">PayPal</div>
                <div className="p-2 border rounded-md flex items-center justify-center">JazzCash</div>
                <div className="p-2 border rounded-md flex items-center justify-center">EasyPaisa</div>
                <div className="p-2 border rounded-md flex items-center justify-center">Stripe</div>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground text-sm">Your payment information is processed securely. We do not store your credit card details.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscribe;
