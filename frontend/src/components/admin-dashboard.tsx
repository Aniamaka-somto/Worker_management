"use client";

import { useState } from "react";
import { useAuth, type User } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Users, Search, LogOut, Eye } from "lucide-react";
import { EmployeeProfileView } from "@/components/employee-profile-view";

// Mock employee data - in production this would come from your database
const mockEmployees: User[] = [
  {
    id: "2",
    email: "john.doe@company.com",
    name: "John Doe",
    role: "employee",
    employeeId: "EMP001",
    phone: "+1234567891",
    picture: "/professional-employee-avatar-male.jpg",
    branch: "Main Office",
    isActive: true,
  },
  {
    id: "3",
    email: "jane.smith@company.com",
    name: "Jane Smith",
    role: "employee",
    employeeId: "EMP002",
    phone: "+1234567892",
    picture: "/professional-employee-avatar-female.jpg",
    branch: "Branch A",
    isActive: true,
  },
  {
    id: "4",
    email: "mike.johnson@company.com",
    name: "Mike Johnson",
    role: "employee",
    employeeId: "EMP003",
    phone: "+1234567893",
    picture: "/professional-employee-avatar-male.jpg",
    branch: "Branch B",
    isActive: false,
  },
  {
    id: "5",
    email: "sarah.wilson@company.com",
    name: "Sarah Wilson",
    role: "employee",
    employeeId: "EMP004",
    phone: "+1234567894",
    picture: "/professional-employee-avatar-female.jpg",
    branch: "Main Office",
    isActive: true,
  },
  {
    id: "6",
    email: "david.brown@company.com",
    name: "David Brown",
    role: "employee",
    employeeId: "EMP005",
    phone: "+1234567895",
    picture: "/professional-employee-avatar-male.jpg",
    branch: "Branch A",
    isActive: true,
  },
];

const branches = ["All Branches", "Main Office", "Branch A", "Branch B"];

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState<User[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch =
      selectedBranch === "All Branches" || employee.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const activeEmployees = employees.filter((emp) => emp.isActive).length;
  const suspendedEmployees = employees.filter((emp) => !emp.isActive).length;

  const handleSuspendEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  };

  if (selectedEmployee) {
    return (
      <EmployeeProfileView
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
        onSuspend={handleSuspendEmployee}
        isAdmin={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Employee Management
                </h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.picture || "/placeholder.svg"} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Employees
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeEmployees}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
              <Users className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {suspendedEmployees}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              Manage and view all employees across different branches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={employee.picture || "/placeholder.svg"}
                      />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {employee.employeeId}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={employee.isActive ? "default" : "destructive"}
                  >
                    {employee.isActive ? "Active" : "Suspended"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {employee.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {employee.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Branch:</span>{" "}
                    {employee.branch}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No employees found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
