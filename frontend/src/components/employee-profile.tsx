"use client";

import { useState, useEffect } from "react";
import { useAuth, type User } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  LogOut,
  Save,
  UserIcon,
  Award as IdCard,
  Edit3,
  Camera,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function EmployeeProfile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const handleSave = () => {
    if (editedUser) {
      // In a real app, this would save to the database
      localStorage.setItem("currentUser", JSON.stringify(editedUser));
      setSaveMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setEditedUser(user ? { ...user } : null);
    setIsEditing(false);
  };

  const handlePrintProfile = () => {
    window.print();
  };

  if (!user || !editedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Employee Portal
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {user.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={user.isActive ? "default" : "destructive"}>
                {user.isActive ? "Active" : "Suspended"}
              </Badge>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveMessage && (
          <Alert className="mb-6 bg-green-50 border-green-200 print:hidden">
            <AlertDescription className="text-green-800">
              {saveMessage}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="print:hidden">
            <TabsTrigger value="profile">
              <UserIcon className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="id-card">
              <IdCard className="h-4 w-4 mr-2" />
              ID Card
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={editedUser.picture || "/placeholder.svg"}
                    />
                    <AvatarFallback className="text-2xl">
                      {editedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG up to 2MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={editedUser.employeeId || ""}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, email: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editedUser.phone || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, phone: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      value={editedUser.branch || ""}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <div className="pt-2">
                      <Badge
                        variant={
                          editedUser.isActive ? "default" : "destructive"
                        }
                      >
                        {editedUser.isActive ? "Active Employee" : "Suspended"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ID Card Tab */}
          <TabsContent value="id-card" className="space-y-6">
            <div className="flex justify-between items-center print:hidden">
              <div>
                <h2 className="text-2xl font-bold">Employee ID Card</h2>
                <p className="text-gray-600">
                  Your official employee identification card
                </p>
              </div>
              <Button onClick={handlePrintProfile}>Print ID Card</Button>
            </div>

            {/* ID Card */}
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white print:shadow-none print:border-2 print:border-gray-300">
              <CardContent className="p-8">
                {/* Company Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Building2 className="h-8 w-8 mr-2" />
                    <h1 className="text-2xl font-bold">COMPANY NAME</h1>
                  </div>
                  <p className="text-blue-100">Employee Identification Card</p>
                </div>

                {/* Employee Info */}
                <div className="flex items-start space-x-6 mb-6">
                  <Avatar className="h-32 w-32 border-4 border-white">
                    <AvatarImage
                      src={editedUser.picture || "/placeholder.svg"}
                    />
                    <AvatarFallback className="text-4xl text-blue-600">
                      {editedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {editedUser.name}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="bg-white text-blue-800"
                      >
                        {editedUser.isActive ? "Active Employee" : "Suspended"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium">ID:</span>
                        <span>{editedUser.employeeId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Email:</span>
                        <span className="text-sm">{editedUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Phone:</span>
                        <span>{editedUser.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">Branch:</span>
                        <span>{editedUser.branch}</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg mb-2">
                      <QRCodeSVG
                        value={`EMP:${editedUser.employeeId}:${editedUser.id}`}
                        size={100}
                        level="M"
                      />
                    </div>
                    <div className="text-xs">Employee QR</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-blue-400 pt-4 text-center text-sm text-blue-100">
                  <p>
                    This card is property of Company Name. If found, please
                    return to HR Department.
                  </p>
                  <p className="mt-1">
                    Valid from: {new Date().getFullYear()} | Emergency:
                    +1-800-COMPANY
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-2 {
            border-width: 2px !important;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          [data-state="active"] {
            visibility: visible !important;
          }
          [data-state="active"] * {
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
