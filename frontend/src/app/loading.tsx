import { Loader2 } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 size={19} className="animate-spin" />
    </div>
  );
}

export default loading;
