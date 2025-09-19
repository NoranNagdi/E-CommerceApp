"use client";

import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function ConfirmationModal({
  clearAllCart,
}: {
  clearAllCart: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end mb-4">
          <Button className="btn">
            Clear Cart <Trash2 />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Clear Cart?</DialogTitle>
          <DialogDescription>
            Do you want to delete all items in your cart?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={clearAllCart}
          >
            Delete <Trash2 />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
