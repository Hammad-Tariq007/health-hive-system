
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useUser, SubscriptionPlan } from "@/contexts/UserContext";
import { Check, Star, Award, CreditCard, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { subscriptionAPI } from "@/api";

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

type PaymentMethod = 'stripe' | 'paypal' | 'jazzcash' | 'easypaisa';

const Subscribe = () => {
  const { user, isLoading, updateSubscription } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
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
    
    // Check URL for success parameter
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
      setPaymentSuccess(true);
      // Clean URL
      window.history.pushState({}, document.title, '/subscribe');
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
        yearly: 7.99 * 12
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
        yearly: 15.99 * 12
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
    if (plan === 'free') {
      toast({
        title: "Free Plan",
        description: "You are already on the free plan.",
        variant: "default"
      });
      return;
    }
    
    setSelectedPlan(plan);
    setProcessing(true);
    setPaymentError(null);

    try {
      // Create a checkout session with the selected payment method
      const response = await subscriptionAPI.createCheckoutSession({ 
        plan, 
        paymentMethod 
      });
      
      if (response.data && response.data.url) {
        // For Stripe, redirect to checkout
        if (paymentMethod === 'stripe') {
          window.location.href = response.data.url;
        } 
        // For PayPal, also redirect
        else if (paymentMethod === 'paypal') {
          window.location.href = response.data.url || '/subscribe/paypal-process';
        } 
        // For mobile payment methods, show instructions
        else {
          toast({
            title: "Payment Instructions",
            description: response.data.instructions || "Please follow the payment instructions.",
            variant: "default",
            duration: 10000 // Show for longer
          });
          
          // Mock successful payment (for demo purposes)
          setTimeout(async () => {
            try {
              await subscriptionAPI.completePayment({ 
                paymentId: response.data.paymentId,
                transactionId: `MOCK-${Date.now()}`
              });
              
              // Update user subscription locally
              await updateSubscription(plan);
              
              setPaymentSuccess(true);
            } catch (error) {
              console.error('Error completing payment:', error);
              setPaymentError('Failed to complete payment. Please try again.');
            } finally {
              setProcessing(false);
            }
          }, 3000);
        }
      } else {
        throw new Error('Invalid checkout session response');
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setPaymentError('There was an error processing your payment. Please try again.');
      setProcessing(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (paymentSuccess) {
    return (
      <div className="container py-16 px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Subscription Successful!</h1>
          <p className="text-xl mb-8">
            Thank you for upgrading to our {selectedPlan ? selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) : 'premium'} plan. 
            You now have access to all premium features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/profile')}
              className="bg-fitness-primary hover:bg-fitness-secondary"
            >
              View Your Profile
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/workouts')}
            >
              Explore Workouts
            </Button>
          </div>
        </motion.div>
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

        {paymentError && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Payment Error</AlertTitle>
            <AlertDescription>{paymentError}</AlertDescription>
          </Alert>
        )}

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

        {/* Payment Methods */}
        {user && user.subscriptionPlan !== 'pro' && user.subscriptionPlan !== 'elite' && (
          <div className="mt-12 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)} className="mb-6">
              <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                <RadioGroupItem value="stripe" id="option-stripe" />
                <Label htmlFor="option-stripe" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>Credit/Debit Card</span>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-blue-500 rounded"></div>
                      <div className="w-8 h-5 bg-red-500 rounded"></div>
                    </div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                <RadioGroupItem value="paypal" id="option-paypal" />
                <Label htmlFor="option-paypal" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>PayPal</span>
                    <div className="h-5 font-bold text-blue-600">PayPal</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                <RadioGroupItem value="jazzcash" id="option-jazzcash" />
                <Label htmlFor="option-jazzcash" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>JazzCash</span>
                    <div className="h-5 font-bold text-red-600">JazzCash</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="easypaisa" id="option-easypaisa" />
                <Label htmlFor="option-easypaisa" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>EasyPaisa</span>
                    <div className="h-5 font-bold text-green-600">EasyPaisa</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Trusted by Fitness Enthusiasts Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="h-8" />
              </div>
            </a>
            <a href="https://www.adidas.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Adidas" className="h-8" />
              </div>
            </a>
            <a href="https://www.underarmour.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg" alt="Under Armour" className="h-6" />
              </div>
            </a>
            <a href="https://www.puma.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg" alt="Puma" className="h-8" />
              </div>
            </a>
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
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="p-3 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="p-3 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscribe;
