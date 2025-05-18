
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { nutritionAPI } from "@/api"; // Import the API
import { useToast } from "@/hooks/use-toast";

interface NutritionPlan {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  keyFeatures: string[];
}

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [allPlans, setAllPlans] = useState<NutritionPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<NutritionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchNutritionPlans = async () => {
      try {
        setIsLoading(true);
        const response = await nutritionAPI.getAllNutritionPlans();
        
        // Transform API response to match component's expected format
        const plans: NutritionPlan[] = response.data.nutritionPlans.map((plan: any) => ({
          id: plan._id,
          title: plan.title,
          description: plan.description,
          type: plan.dietType,
          image: plan.image.startsWith('http') ? plan.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/images/${plan.image}`,
          macros: {
            protein: Math.round((plan.macros.protein * 4 / plan.totalCalories) * 100),
            carbs: Math.round((plan.macros.carbs * 4 / plan.totalCalories) * 100),
            fats: Math.round((plan.macros.fat * 9 / plan.totalCalories) * 100)
          },
          keyFeatures: [
            `${plan.totalCalories} calories per day`,
            `${plan.meals.length} meals per day`,
            `${plan.goal} focused`
          ]
        }));
        
        setAllPlans(plans);
        setFilteredPlans(plans);
      } catch (err) {
        console.error("Failed to fetch nutrition plans:", err);
        setError("Failed to load nutrition plans. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load nutrition plans. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNutritionPlans();
  }, [toast]);
  
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredPlans(allPlans);
    } else {
      setFilteredPlans(allPlans.filter(plan => plan.type.toLowerCase() === activeTab));
    }
  }, [activeTab, allPlans]);

  // Function to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
  };

  if (isLoading) {
    return (
      <div className="container py-12 mx-auto flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-12 w-12 border-4 border-fitness-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="mt-2">{error}</p>
        <Button 
          className="mt-4" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Nutrition Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover nutrition plans tailored to your goals and preferences. Fuel your body right.
        </p>
      </motion.div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
          <TabsTrigger value="muscle-gain">Muscle Gain</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan, index) => (
                <motion.div
                  key={plan.id || index}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.3 }
                    }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-fitness-primary/50 transition-all duration-300">
                    <div className="aspect-video w-full overflow-hidden relative">
                      <LazyLoadImage
                        src={plan.image}
                        alt={plan.title}
                        effect="blur"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={handleImageError}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-fitness-primary">{plan.type}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-accent rounded-md">
                          <p className="text-xs text-muted-foreground">Protein</p>
                          <p className="font-bold">{plan.macros.protein}%</p>
                        </div>
                        <div className="text-center p-2 bg-accent rounded-md">
                          <p className="text-xs text-muted-foreground">Carbs</p>
                          <p className="font-bold">{plan.macros.carbs}%</p>
                        </div>
                        <div className="text-center p-2 bg-accent rounded-md">
                          <p className="text-xs text-muted-foreground">Fats</p>
                          <p className="font-bold">{plan.macros.fats}%</p>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm">
                        {plan.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-fitness-primary mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/nutrition/${plan.id}`} className="w-full">
                        <Button variant="default" className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                          View Plan
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">
                  {activeTab === "all" 
                    ? "No nutrition plans available. Please check back later." 
                    : `No ${activeTab} nutrition plans available yet.`}
                </p>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
