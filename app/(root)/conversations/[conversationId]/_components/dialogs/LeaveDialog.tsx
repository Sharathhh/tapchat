import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutation";

import { ConvexError } from "convex/values";
import React, { Dispatch, SetStateAction} from "react";
import { toast } from "sonner";

type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function LeaveGroupDialog({ conversationId, open, setOpen }: Props) {
  

  const { mutate: leaveGroup, pending } = useMutationState(
    api.conversation.leaveGroup
  );

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ conversationId });

      toast.success("Group Left");

      setOpen(false); //  Close dialog on success
      console.log("Dialog open state:", open);
    } catch (error) {
      toast.error(
        error instanceof ConvexError ? error.data : "Unexpected error occurred"
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className="block"
        style={{
          backgroundColor: "var(--dialog-bg)",
          color: "var(--dialog-text)",
          borderColor: "var(--dialog-border)",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.You will no longer be able to see
            messages from this group and you will not be able to message this
            group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleLeaveGroup}
            disabled={pending}
            className="bg-blue-600 text-amber-50"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LeaveGroupDialog;
