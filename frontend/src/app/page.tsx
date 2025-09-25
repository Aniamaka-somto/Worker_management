"use client";

import { useAuth } from "@/lib/auth-context";
import { LoginForm } from "@/components/login-form";
import { AdminDashboard } from "@/components/admin-dashboard";
import { EmployeeProfile } from "@/components/employee-profile";

export default function HomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <EmployeeProfile />;
}
