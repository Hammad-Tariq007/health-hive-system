
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { SubscriptionPlan } from "@/contexts/UserContext";
import { CreditCard, Star, Award } from "lucide-react";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  subscriptionDate?: Date;
}

const SubscriptionCard = ({ plan, subscriptionDate }: SubscriptionCardProps) => {
  const navigate = useNavigate();
  
  // Define plan details based on the plan type
  const getPlanDetails = () => {
    switch (plan) {
      case 'free':
        return {
          name: 'Free Plan',
          description: 'Basic access to workouts and nutrition',
          color: 'bg-gray-100 dark:bg-gray-800',
          icon: null,
          features: [
            '5 Basic Workouts',
            '3 Nutrition Recipes',
            'Basic Progress Tracking'
          ]
        };
      case 'pro':
        return {
          name: 'Pro Plan',
          description: 'Full access to premium content',
          color: 'bg-blue-50 dark:bg-blue-900/30',
          icon: <Star className="h-5 w-5 text-yellow-500" />,
          features: [
            'Unlimited Workouts',
            'Full Nutrition Library',
            'Detailed Progress Analytics',
            'Community Participation'
          ]
        };
      case 'elite':
        return {
          name: 'Elite Plan',
          description: 'Premium content plus coaching',
          color: 'bg-purple-50 dark:bg-purple-900/30',
          icon: <Award className="h-5 w-5 text-purple-500" />,
          features: [
            'Everything in Pro',
            '1-on-1 Virtual Coaching',
            'Custom Meal Plans',
            'Priority Support'
          ]
        };
      default:
        return {
          name: 'Free Plan',
          description: 'Basic access to workouts and nutrition',
          color: 'bg-gray-100 dark:bg-gray-800',
          icon: null,
          features: [
            '5 Basic Workouts',
            '3 Nutrition Recipes',
            'Basic Progress Tracking'
          ]
        };
    }
  };

  const planDetails = getPlanDetails();
  
  return (
    <Card className={`${planDetails.color} border-t-4 ${
      plan === 'pro' ? 'border-t-yellow-400' : 
      plan === 'elite' ? 'border-t-purple-500' : 
      'border-t-gray-400'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{planDetails.name}</CardTitle>
            <CardDescription>{planDetails.description}</CardDescription>
          </div>
          {planDetails.icon}
        </div>
        
        {subscriptionDate && plan !== 'free' && (
          <Badge variant="outline" className="mt-2">
            Subscribed on {subscriptionDate.toLocaleDateString()}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2 text-sm">Your Benefits:</h4>
        <ul className="space-y-1 text-sm">
          {planDetails.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-fitness-primary mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {plan === 'free' ? (
          <Button
            className="w-full bg-fitness-primary hover:bg-fitness-secondary"
            onClick={() => navigate('/subscribe')}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Upgrade Now
          </Button>
        ) : (
          <Button
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/subscribe')}
          >
            Manage Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
