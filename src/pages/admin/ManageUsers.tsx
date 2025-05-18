import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { ArrowUpDown, Search, Trash2, Shield, User, MoreHorizontal } from "lucide-react";
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

// Mock users data with admin@gmail.com account
const mockUsers = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'admin@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: new Date('2023-05-01')
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'user@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: new Date('2023-06-15')
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user' as const,
    status: 'inactive' as const,
    createdAt: new Date('2023-07-20')
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: new Date('2023-08-05')
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: new Date('2023-09-10')
  },
  {
    id: '6',
    name: 'Admin User',
    email: 'admin@gmail.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: new Date('2023-01-01')
  }
];

type UserRole = 'admin' | 'user';
type UserStatus = 'active' | 'inactive';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}

const ManageUsers = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  
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

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: string) => {
    // Don't allow deletion of the current user
    if (user?.id === id) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your own account while logged in.",
        variant: "destructive"
      });
      return;
    }
    
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed.",
      variant: "default"
    });
  };

  const handleToggleRole = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        return {
          ...user,
          role: newRole
        };
      }
      return user;
    }));
    
    const user = users.find(u => u.id === id);
    const newRole = user?.role === 'admin' ? 'user' : 'admin';
    
    toast({
      title: "Role Updated",
      description: `User is now a ${newRole}.`,
      variant: "default"
    });
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return {
          ...user,
          status: newStatus
        };
      }
      return user;
    }));
    
    const user = users.find(u => u.id === id);
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Status Updated",
      description: `User is now ${newStatus}.`,
      variant: "default"
    });
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
              <User className="mr-2 h-4 w-4" />
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
                              <User className="mr-2 h-4 w-4" />
                              {userData.status === 'active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setSelectedUser(userData)}
                              disabled={user?.email === userData.email} // Prevent deleting the current user
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
                      <TableCell colSpan={6} className="h-24 text-center">
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
