import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function ResizableScreen({
  firstScreen,
  secondScreen,
}: {
  firstScreen: React.ReactNode;
  secondScreen: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full mt-3">
      <ResizablePanel defaultSize={50}>{firstScreen}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>{secondScreen}</ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}
