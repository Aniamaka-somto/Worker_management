"use client";

import type { User } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  UserIcon,
  Shield,
  ShieldOff,
  QrCode,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface EmployeeProfileViewProps {
  employee: User;
  onBack: () => void;
  onSuspend: (employeeId: string) => void;
  isAdmin?: boolean;
}

export function EmployeeProfileView({
  employee,
  onBack,
  onSuspend,
  isAdmin = false,
}: EmployeeProfileViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {isAdmin ? "Dashboard" : "Profile"}
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePrint}>
                Print ID Card
              </Button>
              {isAdmin && (
                <Button
                  variant={employee.isActive ? "destructive" : "default"}
                  onClick={() => onSuspend(employee.id)}
                >
                  {employee.isActive ? (
                    <>
                      <ShieldOff className="h-4 w-4 mr-2" />
                      Suspend Employee
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Activate Employee
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ID Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <AvatarImage src={employee.picture || "/placeholder.svg"} />
                <AvatarFallback className="text-4xl text-blue-600">
                  {employee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{employee.name}</h2>
                  <Badge variant="secondary" className="bg-white text-blue-800">
                    {employee.isActive ? "Active Employee" : "Suspended"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4" />
                    <span className="font-medium">ID:</span>
                    <span>{employee.employeeId}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email:</span>
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Phone:</span>
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Branch:</span>
                    <span>{employee.branch}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white p-3 rounded-lg mb-2">
                  <QRCodeSVG
                    value={`EMP:${employee.employeeId}:${employee.id}`}
                    size={100}
                    level="M"
                  />
                </div>
                <div className="flex items-center justify-center space-x-1 text-xs">
                  <QrCode className="h-3 w-3" />
                  <span>Employee QR</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-blue-400 pt-4 text-center text-sm text-blue-100">
              <p>
                This card is property of Company Name. If found, please return
                to HR Department.
              </p>
              <p className="mt-1">
                Valid from: {new Date().getFullYear()} | Emergency:
                +1-800-COMPANY
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info (Print Hidden) */}
        <div className="mt-8 print:hidden">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Employee Status</p>
                  <Badge
                    variant={employee.isActive ? "default" : "destructive"}
                  >
                    {employee.isActive ? "Active" : "Suspended"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">QR Code Data</p>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    EMP:{employee.employeeId}:{employee.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
        }
      `}</style>
    </div>
  );
}
