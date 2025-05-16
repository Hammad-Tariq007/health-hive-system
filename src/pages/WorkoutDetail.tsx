
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { workoutPlans } from "@/data/workouts";
import { useToast } from "@/hooks/use-toast";

const WorkoutDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const workout = workoutPlans.find(w => w.id === id);
  const [isSaved, setIsSaved] = useState(false);

  if (!workout) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">Workout not found</h2>
          <p className="mt-2 text-muted-foreground">
            The workout you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/workouts" className="mt-4">
            <Button variant="outline">Back to Workouts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveWorkout = () => {
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Workout removed from saved" : "Workout saved!",
      description: isSaved 
        ? "The workout has been removed from your saved workouts." 
        : "You can access this workout in your profile.",
    });
  };

  const handleStartWorkout = () => {
    toast({
      title: "Workout started!",
      description: "Track your progress as you complete each exercise.",
    });
  };

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Link to="/workouts" className="text-fitness-primary hover:text-fitness-secondary flex items-center gap-1">
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
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Workouts
            </Link>
          </div>

          <div className="relative rounded-lg overflow-hidden mb-6">
            <img
              src={workout.image}
              alt={workout.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-fitness-primary">{workout.level}</Badge>
              <Badge variant="outline" className="bg-white text-fitness-dark">
                {workout.duration} min
              </Badge>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">{workout.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{workout.description}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary">
                {workout.category.charAt(0).toUpperCase() + workout.category.slice(1)}
              </Badge>
              <Badge variant="secondary">
                {workout.goal.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + workout.goal.replace(/([A-Z])/g, ' $1').trim().slice(1)}
              </Badge>
              <Badge variant="outline">
                {workout.exercises.length} exercises
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
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
                  className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="font-medium">{workout.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">({workout.reviews} reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="text-muted-foreground">
                Created by <span className="font-medium text-foreground">{workout.createdBy}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="exercises">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exercises" className="space-y-6">
              {workout.exercises.map((exercise, index) => (
                <Card key={exercise.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{index + 1}. {exercise.name}</CardTitle>
                        <CardDescription>{exercise.sets} sets • {exercise.reps} • {exercise.restTime}s rest</CardDescription>
                      </div>
                      {exercise.videoUrl && (
                        <Button variant="outline" size="sm" className="text-fitness-primary" asChild>
                          <a href={exercise.videoUrl} target="_blank" rel="noopener noreferrer">
                            Watch Video
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{exercise.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="instructions">
              <Card>
                <CardHeader>
                  <CardTitle>How to do this workout</CardTitle>
                  <CardDescription>Follow these instructions for the best results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Before you start:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Make sure you have all necessary equipment ready</li>
                      <li>Warm up for 5-10 minutes with light cardio and dynamic stretching</li>
                      <li>Have water handy to stay hydrated throughout the workout</li>
                      <li>Adjust weights as needed based on your fitness level</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">During the workout:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Complete all exercises in the order listed</li>
                      <li>Rest as indicated between sets</li>
                      <li>Focus on proper form rather than rushing through reps</li>
                      <li>Breathe out during exertion and in during relaxation</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">After completing:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cool down with 5 minutes of light activity</li>
                      <li>Stretch the major muscle groups worked</li>
                      <li>Track your progress in the app to see improvements over time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>User Reviews</CardTitle>
                  <CardDescription>See what others are saying about this workout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">JD</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">John Doe</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill={i < 5 ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4 text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">2 weeks ago</p>
                        <p className="mt-2">
                          This workout is exactly what I needed! I've been doing it consistently for two weeks and already feel stronger.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">SM</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Sarah Miller</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill={i < 4 ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4 text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">1 month ago</p>
                        <p className="mt-2">
                          Great workout structure! I appreciate that there's a video demo for most exercises. Would give 5 stars if videos were available for all exercises.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">MT</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Mike Thompson</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill={i < 5 ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4 text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">3 months ago</p>
                        <p className="mt-2">
                          Absolutely fantastic program! I've completed it three times now and continue to see improvements. Highly recommend for anyone serious about their fitness goals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">Load More Reviews</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="glass sticky top-24 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Workout Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{workout.duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-medium capitalize">{workout.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium capitalize">{workout.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Goal:</span>
                <span className="font-medium capitalize">
                  {workout.goal.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exercises:</span>
                <span className="font-medium">{workout.exercises.length}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <h4 className="font-medium mb-2">Equipment Needed:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Dumbbells</li>
                <li>Exercise mat</li>
                <li>Resistance bands (optional)</li>
              </ul>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <Button onClick={handleStartWorkout} className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                Start Workout
              </Button>
              <Button onClick={handleSaveWorkout} variant="outline" className="w-full">
                {isSaved ? "Remove from Saved" : "Save Workout"}
              </Button>
              <Button variant="outline" className="w-full">
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
