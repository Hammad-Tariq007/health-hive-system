
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Skeleton } from "@/components/ui/skeleton";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { nutritionAPI } from "@/api";
import { useToast } from "@/hooks/use-toast";

interface NutritionPlanMacros {
  protein: number;
  carbs: number;
  fats: number;
}

interface NutritionPlan {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  macros: NutritionPlanMacros;
  keyFeatures: string[];
}

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [allPlans, setAllPlans] = useState<NutritionPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<NutritionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchNutritionPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Fetching nutrition plans...");
        
        const response = await nutritionAPI.getAllNutritionPlans();
        console.log("Nutrition API response:", response.data);
        
        if (response.data.success) {
          // Transform API response to match component's expected format
          const plans: NutritionPlan[] = response.data.nutritionPlans.map((plan: any) => ({
            id: plan._id,
            title: plan.title,
            description: plan.description,
            type: plan.dietType,
            image: plan.image.startsWith('http') 
              ? plan.image 
              : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${plan.image}`,
            macros: {
              protein: plan.macros?.protein
                ? Math.round((plan.macros.protein * 4 / (plan.totalCalories || 2000)) * 100)
                : 30,
              carbs: plan.macros?.carbs
                ? Math.round((plan.macros.carbs * 4 / (plan.totalCalories || 2000)) * 100)
                : 40,
              fats: plan.macros?.fat
                ? Math.round((plan.macros.fat * 9 / (plan.totalCalories || 2000)) * 100)
                : 30
            },
            keyFeatures: [
              `${plan.totalCalories || 2000} calories per day`,
              `${plan.meals?.length || 3} meals per day`,
              `${plan.goal || 'Health'} focused`
            ]
          }));
          
          setAllPlans(plans);
          setFilteredPlans(plans);
        } else {
          throw new Error(response.data.message || "Failed to load nutrition plans");
        }
      } catch (err: any) {
        console.error("Failed to fetch nutrition plans:", err);
        
        setError("Failed to load nutrition plans. Please try again later.");
        
        // Show toast error
        toast({
          title: "Error loading nutrition plans",
          description: "We couldn't load the nutrition plans. Please try again.",
          variant: "destructive",
        });
        
        // Use fallback data if no plans are returned
        const dummyData = generateFallbackData();
        setAllPlans(dummyData);
        setFilteredPlans(dummyData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNutritionPlans();
  }, [toast, retryCount]);
  
  const generateFallbackData = (): NutritionPlan[] => {
    return [
      {
        id: "1",
        title: "Weight Loss Meal Plan",
        description: "A caloric deficit plan designed for sustainable weight loss",
        type: "weight-loss",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        macros: {
          protein: 40,
          carbs: 30,
          fats: 30
        },
        keyFeatures: [
          "1500 calories per day",
          "5 meals per day",
          "Weight loss focused"
        ]
      },
      {
        id: "2",
        title: "Muscle Building Plan",
        description: "High protein plan designed for muscle growth and recovery",
        type: "muscle-gain",
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        macros: {
          protein: 35,
          carbs: 50,
          fats: 15
        },
        keyFeatures: [
          "3000 calories per day",
          "6 meals per day",
          "Muscle gain focused"
        ]
      },
      {
        id: "3",
        title: "Keto Diet Plan",
        description: "Low-carb, high-fat plan for ketogenic lifestyle",
        type: "specialized",
        image: "https://images.unsplash.com/photo-1604497181015-76590d828449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        macros: {
          protein: 25,
          carbs: 5,
          fats: 70
        },
        keyFeatures: [
          "2000 calories per day",
          "4 meals per day",
          "Fat loss focused"
        ]
      }
    ];
  };
  
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

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
                  <div className="aspect-video w-full bg-muted">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16" />
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Nutrition Plans</h2>
              <p className="mb-6 text-muted-foreground">{error}</p>
              <Button 
                onClick={handleRetry}
                className="bg-fitness-primary hover:bg-fitness-secondary"
              >
                Try Again
              </Button>
            </div>
          ) : (
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
                    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
