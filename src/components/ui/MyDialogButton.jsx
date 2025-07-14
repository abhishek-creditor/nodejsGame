// src/components/MyDialogButton.jsx

// 1. Import React and the dialog components you need
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // <-- Import from the blueprint file

// 2. Create a component that returns your JSX
export function MyDialogButton() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          {/* This fixes the accessibility warning from your previous question! */}
          <DialogDescription>
            This action cannot be undone. This will do something permanent.
          </DialogDescription>
        </DialogHeader>
        {/* You can add more content like forms or buttons here */}
      </DialogContent>
    </Dialog>
  );
}