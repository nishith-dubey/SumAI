'use client'
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function deleteSummary({summaryId} : {
  summaryId : string
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();


  const handleDelete = async () => {
    startTransition(async() => {
      const result = await deleteSummaryAction({summaryId});
      if(!result.success){
        toast("Error deleting summary" )
      }
      setOpen(false);
      })
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="text-gray-600 bg-gray-200 rounded-full"
        >
          <Trash2 className="p-1" size={24} />
        </DialogTrigger>
        <DialogContent className="bg-white border-none flex justify-center items-center">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
              <div className="flex gap-4 pt-4 text-center">
                <Button
                  className="bg-gray-200 text-black hover:bg-gray-300"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                  disabled = {isPending && true}
                >
                  {isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
