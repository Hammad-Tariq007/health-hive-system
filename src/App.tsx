
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/utils/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import BmiCalculator from "./pages/BmiCalculator";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageWorkouts from "./pages/admin/ManageWorkouts";
import ManageNutrition from "./pages/admin/ManageNutrition";
import ManageBlog from "./pages/admin/ManageBlog";
import Subscribe from "./pages/Subscribe";

// Import all the new pages
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Partners from "./pages/Partners";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Accessibility from "./pages/Accessibility";
import GDPR from "./pages/GDPR";

// Import user context
import { UserProvider } from "./contexts/UserContext";

// Import protected route component
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AdminRoute from "./components/utils/AdminRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/workouts/:id" element={<WorkoutDetail />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<Community />} />
              
              {/* Protected routes for logged in users only */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/edit-profile" element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />
              <Route path="/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/subscribe" element={
                <ProtectedRoute>
                  <Subscribe />
                </ProtectedRoute>
              } />
              
              {/* Company Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/partners" element={<Partners />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/gdpr" element={<GDPR />} />
            </Route>
            
            {/* Admin Routes with special Admin protection */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            } />
            <Route path="/admin/workouts" element={
              <AdminRoute>
                <ManageWorkouts />
              </AdminRoute>
            } />
            <Route path="/admin/nutrition" element={
              <AdminRoute>
                <ManageNutrition />
              </AdminRoute>
            } />
            <Route path="/admin/blog" element={
              <AdminRoute>
                <ManageBlog />
              </AdminRoute>
            } />
            
            {/* Auth pages outside of main layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
