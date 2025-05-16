
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workoutPlans } from "@/data/workouts";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [goalFilter, setGoalFilter] = useState("");

  // Filter workouts based on search and filters
  const filteredWorkouts = workoutPlans.filter((workout) => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "all" || workout.category === categoryFilter;
    const matchesLevel = !levelFilter || levelFilter === "all" || workout.level === levelFilter;
    const matchesGoal = !goalFilter || goalFilter === "all" || workout.goal === goalFilter;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesGoal;
  });

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Workout Plans</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of professional workout plans for all fitness levels.
          </p>
        </div>
        <Link to="/workouts/create">
          <Button className="bg-fitness-primary hover:bg-fitness-secondary">
            Create Custom Workout
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="my-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
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
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">No workouts found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
              setLevelFilter("");
              setGoalFilter("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <Card key={workout.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-fitness-primary text-white rounded">
                  {workout.level}
                </div>
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold">{workout.title}</h3>
                <p className="text-sm text-gray-500">{workout.duration} min • {workout.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">{workout.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {workout.goal.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    {workout.exercises.length} exercises
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{workout.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({workout.reviews})</span>
                </div>
                <Link to={`/workouts/${workout.id}`}>
                  <Button variant="ghost" size="sm">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
