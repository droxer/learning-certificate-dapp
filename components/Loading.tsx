// Loading Component with Skeleton Screens
"use client";

import { useTranslation } from "react-i18next";

interface LoadingProps {
  type?: "page" | "section" | "component";
  message?: string;
}

export default function Loading({ type = "page", message }: LoadingProps) {
  const { t } = useTranslation();

  const getMessage = () => {
    if (message) return message;
    switch (type) {
      case "section":
        return t("common.loadingSection");
      case "component":
        return t("common.loadingComponent");
      default:
        return t("common.loading");
    }
  };

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white animate-pulse">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mt-1"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-200 rounded-lg mt-6 w-full"></div>
    </div>
  );

  if (type === "component") {
    return <SkeletonCard />;
  }

  if (type === "section") {
    return (
      <div className="space-y-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">{getMessage()}</p>
    </div>
  );
}