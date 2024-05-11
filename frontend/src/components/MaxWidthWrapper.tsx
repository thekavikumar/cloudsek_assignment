import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("h-screen max-w-5xl mx-auto", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
