"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "employee";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  employeeId?: string;
  phone?: string;
  picture?: string;
  branch?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - in production this would come from your database
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@company.com",
    name: "Admin User",
    role: "admin",
    phone: "+1234567890",
    picture: "/professional-admin-avatar.png",
    isActive: true,
  },
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
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Mock authentication - in production, this would be a real API call
    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser && password === "password") {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
