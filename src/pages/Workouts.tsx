
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  ArrowUp,
  ArrowDown,
  Clock,
  Star,
  Dumbbell,
  Tag,
  Users
} from "lucide-react";
import { workoutPlans } from "@/data/workouts";
import { motion } from "framer-motion";

// Placeholder image to use if an image URL is invalid
const placeholderImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});
  
  // Initialize all images as potentially loadable
  useEffect(() => {
    const initialLoadState: {[key: string]: boolean} = {};
    workoutPlans.forEach(plan => {
      initialLoadState[plan.id] = true;
    });
    setLoadedImages(initialLoadState);
  }, []);
  
  // Handle image error by setting its loaded state to false
  const handleImageError = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: false
    }));
  };
  
  // Filter workouts based on search and filters
  const filteredAndSortedWorkouts = [...workoutPlans]
    .filter((workout) => {
      const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workout.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !categoryFilter || categoryFilter === "all" || workout.category === categoryFilter;
      const matchesLevel = !levelFilter || levelFilter === "all" || workout.level === levelFilter;
      const matchesGoal = !goalFilter || goalFilter === "all" || workout.goal === goalFilter;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesGoal;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === "popularity") {
        comparison = b.reviews - a.reviews;
      } else if (sortBy === "rating") {
        comparison = b.rating - a.rating;
      } else if (sortBy === "duration") {
        comparison = a.duration - b.duration;
      }
      
      return sortDirection === "asc" ? comparison * -1 : comparison;
    });

  // Mobile filter panel toggle
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setLevelFilter("all");
    setGoalFilter("all");
    setSortBy("popularity");
    setSortDirection("desc");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Workout Plans</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of professional workout plans for all fitness levels.
          </p>
        </div>
        <Link to="/workouts/create">
          <Button className="bg-fitness-primary hover:bg-fitness-secondary">
            <Dumbbell className="mr-2 h-4 w-4" />
            Create Custom Workout
          </Button>
        </Link>
      </motion.div>

      {/* Search and Filters - Desktop */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="my-8 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Find Your Perfect Workout</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleFilter} 
              className="flex items-center md:hidden"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden flex-col gap-4 md:flex md:flex-row">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:flex-1">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
                <SelectItem value="fullBody">Full Body</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={goalFilter} onValueChange={setGoalFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Goals</SelectItem>
                <SelectItem value="weightLoss">Weight Loss</SelectItem>
                <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="toning">Toning</SelectItem>
                <SelectItem value="general">General Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isFilterVisible && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 rounded-lg border bg-card p-4 shadow-sm md:hidden"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="fullBody">Full Body</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal</label>
              <Select value={goalFilter} onValueChange={setGoalFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Goals</SelectItem>
                  <SelectItem value="weightLoss">Weight Loss</SelectItem>
                  <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="toning">Toning</SelectItem>
                  <SelectItem value="general">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}

        {/* Sorting Controls */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Sort by:</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              aria-label={`Sort ${sortDirection === "asc" ? "descending" : "ascending"}`}
            >
              {sortDirection === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{filteredAndSortedWorkouts.length} workouts found</p>
        </div>
      </motion.div>

      {filteredAndSortedWorkouts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
        >
          <h2 className="text-xl font-semibold">No workouts found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAndSortedWorkouts.map((workout) => (
            <motion.div key={workout.id} variants={itemVariants}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={loadedImages[workout.id] !== false ? workout.image : placeholderImage}
                    alt={workout.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImageError(workout.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-fitness-primary text-white rounded">
                    {workout.level}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{workout.title}</h3>
                    <Badge variant="outline" className="bg-primary/10">
                      {workout.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-fitness-primary" />
                    <span>{workout.duration} min</span>
                    <span className="text-muted-foreground">•</span>
                    <Users className="h-4 w-4 text-fitness-primary" />
                    <span>{workout.reviews} reviews</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">{workout.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="bg-fitness-secondary hover:bg-fitness-secondary/90">
                      <Tag className="mr-1 h-3 w-3" />
                      {workout.goal.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                    <Badge variant="outline">
                      <Dumbbell className="mr-1 h-3 w-3" />
                      {workout.exercises.length} exercises
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 border-t">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(workout.rating) 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{workout.rating.toFixed(1)}</span>
                  </div>
                  <Link to={`/workouts/${workout.id}`}>
                    <Button variant="ghost" size="sm" className="hover:bg-fitness-primary/20">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Workouts;
