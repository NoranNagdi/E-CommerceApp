import { Skeleton } from "@/Components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center min-h-screen">
      <Skeleton className="h-[250px] w-[500px] rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
        <Skeleton className="h-4 w-[200px] bg-gray-200  " />
      </div>
    </div>
  );
}
