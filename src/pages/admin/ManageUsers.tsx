
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser, UserRole } from "@/contexts/UserContext";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { ArrowUpDown, Search, Trash2, Shield, User as UserIcon, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { userAPI } from "@/api"; // Import the API

type UserStatus = 'active' | 'inactive';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscriptionPlan: string;
  createdAt: Date;
  status: UserStatus;
}

const ManageUsers = () => {
  const { user: currentUser, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load users from API
  useEffect(() => {
    // Check if user is admin, if not redirect
    if (!currentUser) {
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
      return;
    }

    // Fetch users from API
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await userAPI.getAllUsers();
        
        // Transform API response to match component's expected format
        const formattedUsers: UserData[] = response.data.users.map((u: any) => ({
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role as UserRole,
          subscriptionPlan: u.subscriptionPlan,
          createdAt: new Date(u.createdAt),
          status: 'active' as UserStatus
        }));
        
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, isAdmin, navigate, toast]);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (id: string) => {
    // Don't allow deletion of the current user
    if (currentUser?.id === id) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your own account while logged in.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Delete user through API
      await userAPI.deleteUser(id);
      
      // Update the local state after successful deletion
      setUsers(users.filter(user => user.id !== id));
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully removed.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleToggleRole = async (id: string) => {
    try {
      const user = users.find(u => u.id === id);
      if (!user) return;
      
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      
      // Update role through API
      await userAPI.updateUserRole(id, newRole as UserRole);
      
      // Update local state after successful update
      const updatedUsers = users.map(user => {
        if (user.id === id) {
          return {
            ...user,
            role: newRole as UserRole
          };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      toast({
        title: "Role Updated",
        description: `User is now a ${newRole}.`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return {
          ...user,
          status: newStatus as UserStatus
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const user = users.find(u => u.id === id);
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Status Updated",
      description: `User is now ${newStatus}.`,
      variant: "default"
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">
              View, edit, and manage all users on the platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            
            <Button className="bg-fitness-primary hover:bg-fitness-secondary sm:w-auto w-full">
              <UserIcon className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Showing {filteredUsers.length} out of {users.length} users
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((userData) => (
                    <TableRow key={userData.id}>
                      <TableCell className="font-medium">{userData.name}</TableCell>
                      <TableCell>{userData.email}</TableCell>
                      <TableCell>
                        <Badge variant={userData.role === 'admin' ? "default" : "outline"}>
                          {userData.role === 'admin' ? 'Admin' : 'User'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={userData.status === 'active' ? "default" : "outline"}
                          className={userData.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                          {userData.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{userData.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          userData.subscriptionPlan === 'pro' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                          userData.subscriptionPlan === 'elite' ? 'bg-purple-500 text-white hover:bg-purple-600' : ''
                        }>
                          {userData.subscriptionPlan ? 
                            userData.subscriptionPlan.charAt(0).toUpperCase() + userData.subscriptionPlan.slice(1) : 
                            'Free'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleRole(userData.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              {userData.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(userData.id)}>
                              <UserIcon className="mr-2 h-4 w-4" />
                              {userData.status === 'active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setSelectedUser(userData)}
                              disabled={currentUser?.email === userData.email} // Prevent deleting the current user
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      <AlertDialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user "{selectedUser?.name}" and remove all of their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUser) {
                  handleDeleteUser(selectedUser.id);
                  setSelectedUser(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ManageUsers;
