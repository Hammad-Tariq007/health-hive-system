
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mealPlans } from "@/data/nutrition";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Convert meal plans to the format expected by the component
const nutritionPlans = mealPlans.map(plan => ({
  id: plan.id,
  title: plan.title,
  description: plan.description,
  type: plan.dietType,
  image: plan.image,
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

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredPlans, setFilteredPlans] = useState(nutritionPlans);
  
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredPlans(nutritionPlans);
    } else {
      setFilteredPlans(nutritionPlans.filter(plan => plan.type.toLowerCase() === activeTab));
    }
  }, [activeTab]);

  // Function to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
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
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={index}
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
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
