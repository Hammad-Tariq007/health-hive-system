
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { LineChart, BarChart, Dumbbell, Calendar, Camera } from "lucide-react";
import { progressAPI } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface ProgressEntry {
  _id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  measurement?: {
    chest?: number;
    waist?: number;
    hips?: number;
    thighs?: number;
    arms?: number;
  };
  notes?: string;
  photos?: string[];
}

const Progress = () => {
  const [activeTab, setActiveTab] = useState("weight");
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [notes, setNotes] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [thighs, setThighs] = useState("");
  const [arms, setArms] = useState("");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { user } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Access denied",
        description: "Please log in to view your progress",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    fetchProgressData();
  }, [user, navigate, toast]);
  
  const fetchProgressData = async () => {
    try {
      setIsLoading(true);
      const response = await progressAPI.getUserProgress();
      
      if (response.data.success) {
        // Sort by date, newest first
        const sortedData = response.data.progress.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setProgressData(sortedData);
      } else {
        toast({
          title: "Error loading progress data",
          description: response.data.message || "Failed to load your progress data",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error("Failed to fetch progress data:", error);
      toast({
        title: "Error loading progress data",
        description: "Failed to load your progress data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight && !bodyFat && !chest && !waist && !hips && !thighs && !arms) {
      toast({
        title: "Missing information",
        description: "Please enter at least one measurement",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      if (weight) formData.append("weight", weight);
      if (bodyFat) formData.append("bodyFat", bodyFat);
      if (notes) formData.append("notes", notes);
      
      const measurement: any = {};
      if (chest) measurement.chest = parseFloat(chest);
      if (waist) measurement.waist = parseFloat(waist);
      if (hips) measurement.hips = parseFloat(hips);
      if (thighs) measurement.thighs = parseFloat(thighs);
      if (arms) measurement.arms = parseFloat(arms);
      
      if (Object.keys(measurement).length > 0) {
        formData.append("measurement", JSON.stringify(measurement));
      }
      
      // Add photos if selected
      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          formData.append('photos', photos[i]);
        }
      }
      
      const response = await progressAPI.createProgress(formData);
      
      if (response.data.success) {
        toast({
          title: "Progress recorded",
          description: "Your progress has been successfully recorded",
        });
        
        // Reset form
        setWeight("");
        setBodyFat("");
        setNotes("");
        setChest("");
        setWaist("");
        setHips("");
        setThighs("");
        setArms("");
        setPhotos(null);
        
        // Refresh data
        fetchProgressData();
      } else {
        throw new Error(response.data.message || "Failed to record progress");
      }
    } catch (error: any) {
      console.error("Failed to submit progress:", error);
      toast({
        title: "Error recording progress",
        description: error.message || "Failed to record your progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Transform data for charts
  const getChartData = () => {
    // Reverse to show oldest to newest
    return [...progressData].reverse().map(entry => {
      const date = new Date(entry.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      
      return {
        date,
        weight: entry.weight,
        bodyFat: entry.bodyFat,
        chest: entry.measurement?.chest,
        waist: entry.measurement?.waist,
        hips: entry.measurement?.hips,
        thighs: entry.measurement?.thighs,
        arms: entry.measurement?.arms
      };
    });
  };
  
  const chartData = getChartData();
  
  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground">No data available. Start tracking your progress!</p>
        </div>
      );
    }
    
    switch (activeTab) {
      case "weight":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#9b87f5" activeDot={{ r: 8 }} />
              {chartData.some(item => item.bodyFat !== undefined) && (
                <Line type="monotone" dataKey="bodyFat" stroke="#FF7A72" />
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "measurements":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartData.some(item => item.chest !== undefined) && (
                <Line type="monotone" dataKey="chest" stroke="#4FC4F4" />
              )}
              {chartData.some(item => item.waist !== undefined) && (
                <Line type="monotone" dataKey="waist" stroke="#9b87f5" />
              )}
              {chartData.some(item => item.hips !== undefined) && (
                <Line type="monotone" dataKey="hips" stroke="#FF7A72" />
              )}
              {chartData.some(item => item.thighs !== undefined) && (
                <Line type="monotone" dataKey="thighs" stroke="#82ca9d" />
              )}
              {chartData.some(item => item.arms !== undefined) && (
                <Line type="monotone" dataKey="arms" stroke="#ffc658" />
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="container py-12 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Track Your Progress</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Monitor your fitness journey and see how far you've come. Record measurements, upload photos, and track changes over time.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Progress Charts</CardTitle>
              <CardDescription>
                Visualize your progress over time. Switch between different metrics to see your improvements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weight" value={activeTab} onValueChange={setActiveTab}>
                <div className="mb-6">
                  <TabsList className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <TabsTrigger value="weight" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                      <LineChart className="h-4 w-4 mr-2" />
                      Weight & Body Fat
                    </TabsTrigger>
                    <TabsTrigger value="measurements" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                      <Dumbbell className="h-4 w-4 mr-2" />
                      Body Measurements
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-[400px] w-full" />
                  </div>
                ) : (
                  <div className="h-[400px]">
                    {renderChart()}
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
          
          {/* History */}
          <Card className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Progress History</CardTitle>
              <CardDescription>
                Review your past entries and see how far you've come.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[300px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : progressData.length > 0 ? (
                <div className="space-y-6">
                  {progressData.slice(0, 5).map((entry) => (
                    <div key={entry._id} className="flex items-start border-b pb-4">
                      <div className="bg-fitness-primary/10 rounded-xl p-3 mr-4">
                        <Calendar className="h-6 w-6 text-fitness-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4">
                          {entry.weight && <span>Weight: {entry.weight} kg</span>}
                          {entry.bodyFat && <span>Body Fat: {entry.bodyFat}%</span>}
                          {entry.measurement?.waist && <span>Waist: {entry.measurement.waist} cm</span>}
                        </div>
                        {entry.notes && (
                          <div className="text-sm mt-2 text-muted-foreground italic">
                            "{entry.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">
                  No progress entries found. Start tracking your progress by adding new entries.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl">Record New Progress</CardTitle>
              <CardDescription>
                Add your latest measurements and track your improvement over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 70.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyFat">Body Fat %</Label>
                    <Input
                      id="bodyFat"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 20.5"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Body Measurements (cm)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chest">Chest</Label>
                      <Input
                        id="chest"
                        type="number"
                        step="0.1"
                        placeholder="Chest"
                        value={chest}
                        onChange={(e) => setChest(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist">Waist</Label>
                      <Input
                        id="waist"
                        type="number"
                        step="0.1"
                        placeholder="Waist"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hips">Hips</Label>
                      <Input
                        id="hips"
                        type="number"
                        step="0.1"
                        placeholder="Hips"
                        value={hips}
                        onChange={(e) => setHips(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thighs">Thighs</Label>
                      <Input
                        id="thighs"
                        type="number"
                        step="0.1"
                        placeholder="Thighs"
                        value={thighs}
                        onChange={(e) => setThighs(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arms">Arms</Label>
                      <Input
                        id="arms"
                        type="number"
                        step="0.1"
                        placeholder="Arms"
                        value={arms}
                        onChange={(e) => setArms(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Optional notes about your progress"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="photos" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Progress Photos (Optional)
                  </Label>
                  <Input
                    id="photos"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setPhotos(e.target.files)}
                    className="h-12 rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload up to 5 photos to document your progress
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-xl bg-fitness-primary hover:bg-fitness-secondary mt-4" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Progress"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
