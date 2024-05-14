"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextEditor from "./TextEditor/TextEditor";
import React from "react";

export function EditDialog({
  children,
  postId,
  onPostCreated,
}: {
  children: React.ReactNode;
  postId: string;
  onPostCreated: any;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[34rem]">
        <TextEditor
          update
          postId={postId}
          setOpen={setOpen}
          onPostCreated={onPostCreated}
        />
      </DialogContent>
    </Dialog>
  );
}
