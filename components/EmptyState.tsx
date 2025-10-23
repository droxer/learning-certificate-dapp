// Consistent Empty State Component
"use client";

import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  type?: "default" | "success" | "warning" | "error";
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  type = "default",
}: EmptyStateProps) {
  const { t } = useTranslation();

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 text-green-800";
      case "warning":
        return "bg-amber-50 text-amber-800";
      case "error":
        return "bg-red-50 text-red-800";
      default:
        return "bg-blue-50 text-blue-800";
    }
  };

  const getIconBgStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-amber-100 text-amber-600";
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className={`w-16 h-16 ${getIconBgStyles()} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {icon || (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
