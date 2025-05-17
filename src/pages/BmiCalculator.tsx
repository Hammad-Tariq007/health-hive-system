
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator,
  Scale,
  Ruler,
  HeartPulse,
  ArrowRight,
  ChevronRight,
  Activity,
  Apple
} from "lucide-react";
import { workoutPlans } from "@/data/workouts";
import { mealPlans } from "@/data/nutrition";

type BMICategory = "underweight" | "normal" | "overweight" | "obese" | "severely-obese";

interface BMIResult {
  bmi: number;
  category: BMICategory;
  interpretation: string;
  color: string;
  recommendedWorkouts: typeof workoutPlans;
  recommendedMeals: typeof mealPlans;
}

const getBmiCategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "obese";
  return "severely-obese";
};

const getBmiInterpretation = (category: BMICategory): string => {
  switch (category) {
    case "underweight":
      return "You are underweight. Focus on gaining healthy weight through proper nutrition and strength training.";
    case "normal":
      return "You have a healthy weight. Maintain it with regular exercise and balanced nutrition.";
    case "overweight":
      return "You are overweight. Focus on moderate weight loss through diet and increased physical activity.";
    case "obese":
      return "You are in the obese category. Consider a structured weight management program with professional guidance.";
    case "severely-obese":
      return "You are in the severely obese category. Please consult with healthcare professionals for a comprehensive weight management plan.";
  }
};

const getBmiColor = (category: BMICategory): string => {
  switch (category) {
    case "underweight":
      return "text-blue-500";
    case "normal":
      return "text-green-500";
    case "overweight":
      return "text-yellow-500";
    case "obese":
      return "text-orange-500";
    case "severely-obese":
      return "text-red-500";
  }
};

const getRecommendedWorkouts = (category: BMICategory) => {
  // Filter workouts based on BMI category
  let recommendedWorkouts = [];
  switch (category) {
    case "underweight":
      recommendedWorkouts = workoutPlans.filter(plan => 
        plan.goal === "muscleGain" || plan.level === "beginner"
      );
      break;
    case "normal":
      recommendedWorkouts = workoutPlans.filter(plan => 
        plan.goal === "toning" || plan.goal === "general"
      );
      break;
    case "overweight":
      recommendedWorkouts = workoutPlans.filter(plan => 
        plan.goal === "weightLoss" || plan.goal === "endurance"
      );
      break;
    case "obese":
    case "severely-obese":
      recommendedWorkouts = workoutPlans.filter(plan => 
        plan.goal === "weightLoss" && plan.level !== "advanced"
      );
      break;
  }
  
  // Return max 3 workouts, or all if less than 3
  return recommendedWorkouts.slice(0, 3);
};

const getRecommendedMeals = (category: BMICategory) => {
  // Filter meal plans based on BMI category
  let recommendedMeals = [];
  switch (category) {
    case "underweight":
      recommendedMeals = mealPlans.filter(plan => 
        plan.goal === "muscleGain" || plan.goal === "performance"
      );
      break;
    case "normal":
      recommendedMeals = mealPlans.filter(plan => 
        plan.goal === "maintenance" || plan.goal === "performance"
      );
      break;
    case "overweight":
      recommendedMeals = mealPlans.filter(plan => 
        plan.goal === "weightLoss" || plan.dietType === "mediterranean"
      );
      break;
    case "obese":
    case "severely-obese":
      recommendedMeals = mealPlans.filter(plan => 
        plan.goal === "weightLoss" && plan.dietType !== "standard"
      );
      break;
  }
  
  // Return max 3 meal plans, or all if less than 3
  return recommendedMeals.slice(0, 3);
};

const BmiCalculator = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [unit, setUnit] = useState<string>("metric");
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Convert height and weight based on selected units
  const getMetricValues = () => {
    if (unit === "metric") {
      return {
        heightCm: parseFloat(height),
        weightKg: parseFloat(weight)
      };
    } else {
      // Convert from imperial to metric
      const feet = parseInt(height.split("'")[0] || "0");
      const inches = parseInt(height.split("'")[1]?.replace('"', '') || "0");
      const totalInches = feet * 12 + inches;
      const heightCm = totalInches * 2.54;
      const weightKg = parseFloat(weight) * 0.453592;
      
      return { heightCm, weightKg };
    }
  };
  
  const calculateBMI = () => {
    if (!height || !weight || !age) return;
    
    setIsCalculating(true);
    
    // Simulate calculation process
    setTimeout(() => {
      const { heightCm, weightKg } = getMetricValues();
      
      // BMI formula: weight (kg) / (height (m))^2
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      const bmiRounded = parseFloat(bmi.toFixed(1));
      
      const category = getBmiCategory(bmiRounded);
      const interpretation = getBmiInterpretation(category);
      const color = getBmiColor(category);
      const recommendedWorkouts = getRecommendedWorkouts(category);
      const recommendedMeals = getRecommendedMeals(category);
      
      setBmiResult({
        bmi: bmiRounded,
        category,
        interpretation,
        color,
        recommendedWorkouts,
        recommendedMeals
      });
      
      setIsCalculating(false);
    }, 1000);
  };
  
  // Reset the form
  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("male");
    setBmiResult(null);
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateBMI();
    }
  };
  
  // Helper for input display based on unit system
  const renderHeightInput = () => {
    if (unit === "metric") {
      return (
        <Input
          id="height"
          type="number"
          placeholder="Height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          onKeyDown={handleKeyPress}
          min="50"
          max="300"
          className="transition-all"
          required
        />
      );
    } else {
      return (
        <div className="relative">
          <Input
            id="height"
            placeholder='Height (e.g. 5\'10")'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onKeyDown={handleKeyPress}
            className="transition-all"
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Format: feet'inches" (e.g. 5'10")
          </p>
        </div>
      );
    }
  };
  
  const renderWeightInput = () => {
    if (unit === "metric") {
      return (
        <Input
          id="weight"
          type="number"
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onKeyDown={handleKeyPress}
          min="20"
          max="500"
          className="transition-all"
          required
        />
      );
    } else {
      return (
        <Input
          id="weight"
          type="number"
          placeholder="Weight in lbs"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onKeyDown={handleKeyPress}
          min="45"
          max="1100"
          className="transition-all"
          required
        />
      );
    }
  };

  return (
    <div className="container py-10 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">BMI Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) and get personalized workout and nutrition 
            recommendations based on your results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Input Card */}
          <div className="md:col-span-1">
            <Card className="border-2 border-fitness-primary/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-fitness-primary" />
                  <CardTitle>Enter Your Details</CardTitle>
                </div>
                <CardDescription>
                  Fill in your information to calculate your BMI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs
                  defaultValue="metric"
                  value={unit}
                  onValueChange={setUnit}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric">Metric</TabsTrigger>
                    <TabsTrigger value="imperial">Imperial</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="height">Height</Label>
                    </div>
                    {renderHeightInput()}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="weight">Weight</Label>
                    </div>
                    {renderWeightInput()}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="age">Age</Label>
                    </div>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onKeyDown={handleKeyPress}
                      min="1"
                      max="120"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      defaultValue="male"
                      value={gender}
                      onValueChange={setGender}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <Button
                    className="w-full bg-fitness-primary hover:bg-fitness-secondary"
                    onClick={calculateBMI}
                    disabled={!height || !weight || !age || isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate BMI"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={isCalculating}
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Card */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {bmiResult ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-accent/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-fitness-primary" />
                          <CardTitle>Your BMI Results</CardTitle>
                        </div>
                        <div className={`text-4xl font-bold ${bmiResult.color}`}>
                          {bmiResult.bmi}
                        </div>
                      </div>
                      <CardDescription>
                        Based on your height, weight, age and gender
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg bg-muted p-4">
                        <h3 className={`text-lg font-semibold mb-2 capitalize ${bmiResult.color}`}>
                          {bmiResult.category}
                        </h3>
                        <p className="text-muted-foreground">{bmiResult.interpretation}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-fitness-primary" />
                          Recommended Workout Plans
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {bmiResult.recommendedWorkouts.map((workout) => (
                            <Card key={workout.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                              <div className="h-32 overflow-hidden">
                                <img 
                                  src={workout.image} 
                                  alt={workout.title} 
                                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                />
                              </div>
                              <CardContent className="p-3">
                                <h4 className="font-semibold truncate">{workout.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {workout.level} • {workout.duration} min
                                </p>
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto text-fitness-primary"
                                  onClick={() => navigate(`/workouts/${workout.id}`)}
                                >
                                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Apple className="h-5 w-5 text-fitness-primary" />
                          Recommended Meal Plans
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {bmiResult.recommendedMeals.map((meal) => (
                            <Card key={meal.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                              <div className="h-32 overflow-hidden">
                                <img 
                                  src={meal.image} 
                                  alt={meal.title} 
                                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                />
                              </div>
                              <CardContent className="p-3">
                                <h4 className="font-semibold truncate">{meal.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {meal.dietType} • {meal.goal}
                                </p>
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto text-fitness-primary"
                                  onClick={() => navigate(`/nutrition`)}
                                >
                                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-fitness-primary text-fitness-primary hover:bg-fitness-primary hover:text-white"
                          onClick={() => navigate("/dashboard")}
                        >
                          Save to My Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-dashed border-muted h-full flex flex-col justify-center items-center p-10 text-center">
                    <div className="py-10">
                      <div className="bg-muted rounded-full p-6 mx-auto mb-6">
                        <Activity className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Your BMI Results Will Appear Here</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Fill out your details in the form and click "Calculate BMI" to see your results
                        and get personalized recommendations.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* BMI Information */}
        <Card className="mt-8 border-2 border-muted/50">
          <CardHeader>
            <CardTitle className="text-xl">Understanding BMI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Body Mass Index (BMI) is a simple calculation that uses your height and weight to estimate 
              whether you're at a healthy weight. While BMI is a useful screening tool, it does have limitations 
              and doesn't directly measure body fat or account for muscle mass, bone density, or overall body composition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">BMI Categories:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span>Underweight: BMI below 18.5</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span>Normal weight: BMI between 18.5 and 24.9</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span>Overweight: BMI between 25 and 29.9</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span>Obese: BMI between 30 and 34.9</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span>Severely obese: BMI 35 or above</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">BMI Limitations:</h4>
                <ul className="space-y-1">
                  <li>• Doesn't distinguish between muscle and fat</li>
                  <li>• May overestimate body fat in athletes</li>
                  <li>• May underestimate body fat in older adults</li>
                  <li>• Doesn't account for differences in body composition</li>
                  <li>• Not always applicable across all ethnic groups</li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted/50 p-4 border border-border">
              <p className="text-sm text-center">
                While BMI can be a helpful starting point, consider consulting with a healthcare professional
                for a more comprehensive assessment of your health and fitness needs.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BmiCalculator;
