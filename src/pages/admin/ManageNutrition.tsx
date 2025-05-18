
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Apple, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

// Mock nutrition plans data
const mockNutritionPlans = [
  {
    id: '1',
    title: 'High Protein Diet',
    type: 'Muscle Gain',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'High protein diet for muscle gain and recovery.',
    macros: {
      protein: 40,
      carbs: 30,
      fats: 30
    },
    keyFeatures: [
      'Lean protein sources',
      'Complex carbohydrates',
      'Healthy fats',
      '5-6 small meals per day'
    ]
  },
  {
    id: '2',
    title: 'Keto Diet Plan',
    type: 'Weight Loss',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=2187&auto=format&fit=crop',
    description: 'Low-carb, high-fat diet for rapid weight loss.',
    macros: {
      protein: 25,
      carbs: 5,
      fats: 70
    },
    keyFeatures: [
      'Very low carbohydrate intake',
      'High fat consumption',
      'Moderate protein intake',
      'Intermittent fasting optional'
    ]
  },
  {
    id: '3',
    title: 'Mediterranean Diet',
    type: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2187&auto=format&fit=crop',
    description: 'Heart-healthy diet based on traditional Mediterranean cuisine.',
    macros: {
      protein: 20,
      carbs: 50,
      fats: 30
    },
    keyFeatures: [
      'Rich in fruits and vegetables',
      'Whole grains and legumes',
      'Olive oil as primary fat',
      'Fish and seafood twice a week'
    ]
  },
  {
    id: '4',
    title: 'Vegan Meal Plan',
    type: 'Specialized',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    description: 'Plant-based diet with no animal products.',
    macros: {
      protein: 20,
      carbs: 60,
      fats: 20
    },
    keyFeatures: [
      'Plant-based proteins',
      'High fiber intake',
      'Variety of fruits and vegetables',
      'Supplementation may be required'
    ]
  }
];

interface NutritionPlanData {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  keyFeatures: string[];
}

const ManageNutrition = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlanData[]>(mockNutritionPlans);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<NutritionPlanData | null>(null);
  const [newPlan, setNewPlan] = useState<Partial<NutritionPlanData>>({
    title: '',
    type: 'Weight Loss',
    image: '',
    description: '',
    macros: {
      protein: 30,
      carbs: 40,
      fats: 30
    },
    keyFeatures: ['', '', '', '']
  });
  
  // Check if user is admin, if not redirect
  useEffect(() => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!isAdmin()) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, isAdmin, navigate, toast]);

  // Filter nutrition plans based on search term
  const filteredPlans = nutritionPlans.filter(plan => 
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePlan = (id: string) => {
    setNutritionPlans(nutritionPlans.filter(plan => plan.id !== id));
    
    toast({
      title: "Plan Deleted",
      description: "The nutrition plan has been successfully removed.",
      variant: "default"
    });
  };

  const handleEditPlan = (plan: NutritionPlanData) => {
    setEditPlan(plan);
    setNewPlan(plan);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPlan(prev => ({ ...prev, [name]: value }));
  };

  const handleMacroChange = (type: 'protein' | 'carbs' | 'fats', value: number[]) => {
    setNewPlan(prev => ({
      ...prev,
      macros: {
        ...prev.macros!,
        [type]: value[0]
      }
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...(newPlan.keyFeatures || [])];
    updatedFeatures[index] = value;
    
    setNewPlan(prev => ({ ...prev, keyFeatures: updatedFeatures }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewPlan(prev => ({ ...prev, [name]: value }));
  };

  const validateMacros = () => {
    const { protein, carbs, fats } = newPlan.macros!;
    return protein + carbs + fats === 100;
  };

  const handleSavePlan = () => {
    if (!newPlan.title || !newPlan.type) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateMacros()) {
      toast({
        title: "Invalid Macros",
        description: "Macronutrient percentages must add up to 100%.",
        variant: "destructive"
      });
      return;
    }
    
    // Filter out empty key features
    const keyFeatures = newPlan.keyFeatures?.filter(feature => feature.trim() !== '') || [];
    
    if (editPlan) {
      // Update existing plan
      setNutritionPlans(nutritionPlans.map(plan => 
        plan.id === editPlan.id ? { 
          ...plan, 
          ...newPlan as NutritionPlanData,
          keyFeatures
        } : plan
      ));
      
      toast({
        title: "Plan Updated",
        description: "The nutrition plan has been successfully updated.",
        variant: "default"
      });
    } else {
      // Add new plan
      const plan: NutritionPlanData = {
        id: `${Date.now()}`,
        title: newPlan.title!,
        type: newPlan.type!,
        image: newPlan.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        description: newPlan.description || '',
        macros: newPlan.macros!,
        keyFeatures
      };
      
      setNutritionPlans([...nutritionPlans, plan]);
      
      toast({
        title: "Plan Added",
        description: "The new nutrition plan has been successfully added.",
        variant: "default"
      });
    }
    
    // Reset form and close dialog
    setNewPlan({
      title: '',
      type: 'Weight Loss',
      image: '',
      description: '',
      macros: {
        protein: 30,
        carbs: 40,
        fats: 30
      },
      keyFeatures: ['', '', '', '']
    });
    setEditPlan(null);
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Nutrition Plans</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage nutrition plans on the platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search nutrition plans..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            
            <Button 
              className="bg-fitness-primary hover:bg-fitness-secondary sm:w-auto w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Plan
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
                      {plan.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{plan.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {plan.description}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
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
                    {plan.keyFeatures.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-fitness-primary mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.keyFeatures.length > 2 && (
                      <li className="text-sm text-muted-foreground">
                        + {plan.keyFeatures.length - 2} more...
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
            
            {filteredPlans.length === 0 && (
              <div className="col-span-full flex items-center justify-center h-64">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">No nutrition plans found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try a different search term or create a new plan.
                  </p>
                  <Button 
                    className="bg-fitness-primary hover:bg-fitness-secondary"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Plan
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editPlan ? 'Edit Nutrition Plan' : 'Create New Nutrition Plan'}</DialogTitle>
            <DialogDescription>
              {editPlan 
                ? 'Update the details for this nutrition plan.' 
                : 'Fill in the details to create a new nutrition plan.'}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Plan Title *</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={newPlan.title}
                    onChange={handleInputChange}
                    placeholder="e.g., High Protein Diet" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select 
                    value={newPlan.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                      <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Specialized">Specialized</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  name="image"
                  value={newPlan.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg" 
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL or leave blank for a default image
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={newPlan.description}
                  onChange={handleInputChange}
                  placeholder="Describe the nutrition plan" 
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-4">
                <Label>Macronutrient Distribution (100% Total)</Label>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Protein</span>
                      <span className="font-medium">{newPlan.macros?.protein}%</span>
                    </div>
                    <Slider
                      value={[newPlan.macros?.protein || 30]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleMacroChange('protein', value)}
                      className="bg-accent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carbs</span>
                      <span className="font-medium">{newPlan.macros?.carbs}%</span>
                    </div>
                    <Slider
                      value={[newPlan.macros?.carbs || 40]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleMacroChange('carbs', value)}
                      className="bg-accent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fats</span>
                      <span className="font-medium">{newPlan.macros?.fats}%</span>
                    </div>
                    <Slider
                      value={[newPlan.macros?.fats || 30]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleMacroChange('fats', value)}
                      className="bg-accent"
                    />
                  </div>
                  
                  <div className={`text-sm font-medium ${validateMacros() ? 'text-green-500' : 'text-destructive'}`}>
                    Total: {(newPlan.macros?.protein || 0) + (newPlan.macros?.carbs || 0) + (newPlan.macros?.fats || 0)}%
                    {validateMacros() ? ' ✓' : ' (Must equal 100%)'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Key Features</Label>
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((index) => (
                    <Input
                      key={index}
                      value={newPlan.keyFeatures?.[index] || ''}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-fitness-primary hover:bg-fitness-secondary"
              onClick={handleSavePlan}
            >
              {editPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageNutrition;
