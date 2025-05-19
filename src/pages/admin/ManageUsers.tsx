
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { userAPI } from "@/api";
import { useUser, UserRole } from "@/contexts/UserContext";
import { Search, UserCog, Trash2, CheckCircle, XCircle, MoreHorizontal, Shield, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin } = useUser();
  
  // If not admin, redirect to homepage
  useEffect(() => {
    if (!isLoading && !isAdmin()) {
      navigate('/');
    }
  }, [isLoading, isAdmin, navigate]);

  // Get all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await userAPI.getAllUsers();
        
        if (response.data && response.data.users) {
          const formattedUsers: UserData[] = response.data.users.map((user: any) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            createdAt: new Date(user.createdAt)
          }));
          
          setUsers(formattedUsers);
          setFilteredUsers(formattedUsers);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast({
          title: "Error",
          description: "Failed to load users. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  // Filter users based on search query and active tab
  useEffect(() => {
    let results = users;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }
    
    // Filter by role
    if (activeTab !== "all") {
      results = results.filter((user) => user.role === activeTab);
    }
    
    setFilteredUsers(results);
  }, [users, searchQuery, activeTab]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await userAPI.updateUserRole(userId, newRole);
      
      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      
      toast({
        title: "Role updated",
        description: "User role has been successfully updated",
      });
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await userAPI.deleteUser(userId);
      
      // Update local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      toast({
        title: "User deleted",
        description: "User has been successfully deleted",
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteUserId(null);
    }
  };

  const confirmDelete = (userId: string) => {
    setDeleteUserId(userId);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">
              Review and manage user accounts and permissions
            </p>
          </div>
          {/* Search Box */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search" 
                placeholder="Search users..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
            <TabsTrigger value="user">Standard Users</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                {filteredUsers.length} users found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {isLoading ? (
                  // Skeleton loaders when loading
                  Array(5).fill(null).map((_, i) => (
                    <div key={i} className="flex items-center py-4 gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="flex flex-col sm:flex-row sm:items-center py-4 gap-4">
                      <Avatar className="h-12 w-12">
                        {user.profileImage ? (
                          <AvatarImage src={user.profileImage} />
                        ) : (
                          <AvatarFallback>
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={user.role === "admin" ? "destructive" : "outline"}
                          className="capitalize"
                        >
                          {user.role}
                        </Badge>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {user.role === "user" ? (
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user.id, "admin")}
                                className="cursor-pointer"
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Make Admin
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleRoleChange(user.id, "user")}
                                className="cursor-pointer"
                              >
                                <User className="mr-2 h-4 w-4" />
                                Remove Admin
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => confirmDelete(user.id)}
                              className="text-destructive focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <UserCog className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No users found</h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user account and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ManageUsers;
