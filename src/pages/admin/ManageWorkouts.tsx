
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
import { Search, Plus, Edit, Trash2, Image, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock workouts data
const mockWorkouts = [
  {
    id: '1',
    title: 'Full Body HIIT',
    type: 'HIIT',
    difficulty: 'Advanced',
    duration: 45,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop',
    description: 'A high-intensity interval training workout that targets the entire body.',
  },
  {
    id: '2',
    title: 'Upper Body Strength',
    type: 'Strength',
    difficulty: 'Intermediate',
    duration: 40,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    description: 'Focus on building strength in chest, shoulders, back, and arms.',
  },
  {
    id: '3',
    title: 'Yoga Flow',
    type: 'Yoga',
    difficulty: 'Beginner',
    duration: 30,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2160&auto=format&fit=crop',
    description: 'A gentle yoga flow to improve flexibility and mindfulness.',
  },
  {
    id: '4',
    title: 'Core Crusher',
    type: 'Core',
    difficulty: 'Intermediate',
    duration: 20,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    description: 'Target your abs and obliques with this intense core workout.',
  },
  {
    id: '5',
    title: 'Leg Day Challenge',
    type: 'Strength',
    difficulty: 'Advanced',
    duration: 50,
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=2070&auto=format&fit=crop',
    description: 'Build lower body strength and endurance with this challenging workout.',
  }
];

interface WorkoutData {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  duration: number;
  image: string;
  description: string;
}

const ManageWorkouts = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<WorkoutData[]>(mockWorkouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWorkout, setNewWorkout] = useState<Partial<WorkoutData>>({
    title: '',
    type: 'Strength',
    difficulty: 'Intermediate',
    duration: 30,
    image: '',
    description: ''
  });
  const [editWorkout, setEditWorkout] = useState<WorkoutData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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

  // Filter workouts based on search term
  const filteredWorkouts = workouts.filter(workout => 
    workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
    
    toast({
      title: "Workout Deleted",
      description: "The workout has been successfully removed.",
      variant: "default"
    });
  };

  const handleEditWorkout = (workout: WorkoutData) => {
    setEditWorkout(workout);
    setNewWorkout(workout);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveWorkout = () => {
    if (!newWorkout.title || !newWorkout.type || !newWorkout.difficulty || !newWorkout.duration) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (editWorkout) {
      // Update existing workout
      setWorkouts(workouts.map(workout => 
        workout.id === editWorkout.id ? { ...workout, ...newWorkout as WorkoutData } : workout
      ));
      
      toast({
        title: "Workout Updated",
        description: "The workout has been successfully updated.",
        variant: "default"
      });
    } else {
      // Add new workout
      const workout: WorkoutData = {
        id: `${Date.now()}`,
        title: newWorkout.title!,
        type: newWorkout.type!,
        difficulty: newWorkout.difficulty!,
        duration: newWorkout.duration!,
        image: newWorkout.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        description: newWorkout.description || ''
      };
      
      setWorkouts([...workouts, workout]);
      
      toast({
        title: "Workout Added",
        description: "The new workout has been successfully added.",
        variant: "default"
      });
    }
    
    // Reset form and close dialog
    setNewWorkout({
      title: '',
      type: 'Strength',
      difficulty: 'Intermediate',
      duration: 30,
      image: '',
      description: ''
    });
    setEditWorkout(null);
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
            <h1 className="text-3xl font-bold tracking-tight">Manage Workouts</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage workout plans on the platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search workouts..." 
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
              Add New Workout
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkouts.map((workout) => (
              <Card key={workout.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop";
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
                        <DropdownMenuItem onClick={() => handleEditWorkout(workout)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteWorkout(workout.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{workout.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{workout.type}</Badge>
                    <Badge variant="outline">{workout.difficulty}</Badge>
                    <Badge variant="outline">{workout.duration} min</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {workout.description}
                  </p>
                </CardContent>
              </Card>
            ))}
            
            {filteredWorkouts.length === 0 && (
              <div className="col-span-full flex items-center justify-center h-64">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">No workouts found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try a different search term or create a new workout.
                  </p>
                  <Button 
                    className="bg-fitness-primary hover:bg-fitness-secondary"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Workout
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
            <DialogTitle>{editWorkout ? 'Edit Workout' : 'Create New Workout'}</DialogTitle>
            <DialogDescription>
              {editWorkout 
                ? 'Update the details for this workout plan.' 
                : 'Fill in the details to create a new workout plan.'}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Workout Title *</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={newWorkout.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Full Body HIIT" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input 
                    id="duration" 
                    name="duration"
                    type="number"
                    value={newWorkout.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select 
                    value={newWorkout.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strength">Strength</SelectItem>
                      <SelectItem value="HIIT">HIIT</SelectItem>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Yoga">Yoga</SelectItem>
                      <SelectItem value="Pilates">Pilates</SelectItem>
                      <SelectItem value="Core">Core</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select 
                    value={newWorkout.difficulty}
                    onValueChange={(value) => handleSelectChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  name="image"
                  value={newWorkout.image}
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
                  value={newWorkout.description}
                  onChange={handleInputChange}
                  placeholder="Describe the workout" 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-fitness-primary hover:bg-fitness-secondary"
              onClick={handleSaveWorkout}
            >
              {editWorkout ? 'Update Workout' : 'Create Workout'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageWorkouts;
