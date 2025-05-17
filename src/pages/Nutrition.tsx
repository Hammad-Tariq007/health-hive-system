
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileDown, Info, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mealPlans } from "@/data/nutrition";
import { useNavigate } from "react-router-dom";

// Placeholder image to use if an image URL is invalid
const placeholderImage = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const NutritionPage = () => {
  const [selectedDiet, setSelectedDiet] = useState(mealPlans[0]);
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});
  
  // Handle image error by setting its loaded state to false
  const handleImageError = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // Initialize all images as potentially loadable
  useEffect(() => {
    const initialLoadState: {[key: string]: boolean} = {};
    mealPlans.forEach(plan => {
      initialLoadState[plan.id] = true;
    });
    setLoadedImages(initialLoadState);
  }, []);

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Nutrition Plans</h1>
        <p className="text-muted-foreground">Discover diet plans tailored to your fitness goals</p>
      </div>

      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="bulking">Bulking</TabsTrigger>
          <TabsTrigger value="cutting">Cutting</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={loadedImages[plan.id] !== false ? plan.image : placeholderImage} 
                    alt={plan.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    loading="lazy"
                    onError={() => handleImageError(plan.id)}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                      {plan.dietType}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-primary/10">
                      {plan.totalCalories} calories
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      Protein: {plan.macros.protein}g
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      Carbs: {plan.macros.carbs}g
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      Fat: {plan.macros.fat}g
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedDiet(plan)}
                      >
                        <Info className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{selectedDiet.title}</DialogTitle>
                        <DialogDescription>
                          {selectedDiet.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">Daily Meal Structure</h3>
                          <div className="space-y-4">
                            {selectedDiet.meals?.map((meal, index) => (
                              <div key={index} className="border p-3 rounded-md">
                                <h4 className="font-medium mb-2">{meal.name}</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                  {meal.ingredients.map((food, idx) => (
                                    <li key={idx}>{food}</li>
                                  ))}
                                </ul>
                                <div className="mt-2 text-sm text-muted-foreground">
                                  {meal.calories} calories
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Nutritional Information</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-muted p-3 rounded-md text-center">
                              <div className="text-sm text-muted-foreground">Calories</div>
                              <div className="font-bold">{selectedDiet.totalCalories}</div>
                            </div>
                            <div className="bg-muted p-3 rounded-md text-center">
                              <div className="text-sm text-muted-foreground">Protein</div>
                              <div className="font-bold">{selectedDiet.macros.protein}g</div>
                            </div>
                            <div className="bg-muted p-3 rounded-md text-center">
                              <div className="text-sm text-muted-foreground">Carbs</div>
                              <div className="font-bold">{selectedDiet.macros.carbs}g</div>
                            </div>
                            <div className="bg-muted p-3 rounded-md text-center">
                              <div className="text-sm text-muted-foreground">Fat</div>
                              <div className="font-bold">{selectedDiet.macros.fat}g</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          className="bg-fitness-primary hover:bg-fitness-secondary"
                          onClick={() => {
                            document.querySelector('[role="dialog"] button[data-state="open"]')?.click();
                            navigate('/dashboard');
                          }}
                        >
                          Start This Plan <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button>
                    <FileDown className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bulking tab */}
        <TabsContent value="bulking">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans
              .filter(plan => plan.goal === "muscleGain")
              .map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img 
                      src={loadedImages[plan.id] !== false ? plan.image : placeholderImage} 
                      alt={plan.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      loading="lazy"
                      onError={() => handleImageError(plan.id)}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                        {plan.dietType}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary/10">
                        {plan.totalCalories} calories
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Protein: {plan.macros.protein}g
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Carbs: {plan.macros.carbs}g
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Fat: {plan.macros.fat}g
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedDiet(plan)}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Start Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Cutting tab */}
        <TabsContent value="cutting">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans
              .filter(plan => plan.goal === "weightLoss")
              .map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img 
                      src={loadedImages[plan.id] !== false ? plan.image : placeholderImage} 
                      alt={plan.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      loading="lazy"
                      onError={() => handleImageError(plan.id)}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                        {plan.dietType}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary/10">
                        {plan.totalCalories} calories
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Protein: {plan.macros.protein}g
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Carbs: {plan.macros.carbs}g
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Fat: {plan.macros.fat}g
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedDiet(plan)}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Start Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Maintenance tab */}
        <TabsContent value="maintenance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans
              .filter(plan => plan.goal === "maintenance")
              .map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img 
                      src={loadedImages[plan.id] !== false ? plan.image : placeholderImage} 
                      alt={plan.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      loading="lazy"
                      onError={() => handleImageError(plan.id)}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                        {plan.dietType}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary/10">
                        {plan.totalCalories} calories
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Protein: {plan.macros.protein}g
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Carbs: {plan.macros.carbs}g
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Fat: {plan.macros.fat}g
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedDiet(plan)}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Start Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Macro Calculator Section */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg backdrop-blur-sm glass border border-white/20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Macro Calculator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate your daily macronutrient needs based on your goals, activity level, and body metrics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-md text-center">
                <h4 className="text-sm font-medium mb-1">Maintenance</h4>
                <p className="text-lg font-bold">2,150 kcal</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-md text-center">
                <h4 className="text-sm font-medium mb-1">Fat Loss</h4>
                <p className="text-lg font-bold">1,850 kcal</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-md text-center">
                <h4 className="text-sm font-medium mb-1">Muscle Gain</h4>
                <p className="text-lg font-bold">2,450 kcal</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-md text-center">
                <h4 className="text-sm font-medium mb-1">Protein Need</h4>
                <p className="text-lg font-bold">150g</p>
              </div>
            </div>
          </div>
          <div>
            <Button 
              className="w-full mb-4" 
              size="lg"
              onClick={() => navigate("/bmi-calculator")}
            >
              Calculate Your Macros
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Get personalized nutrition recommendations based on your body composition and fitness goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
