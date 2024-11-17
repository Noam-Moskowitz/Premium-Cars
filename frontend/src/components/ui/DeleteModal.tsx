import React from "react";
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

interface DeleteModalProps {
  variant?: `delete` | `cancel`;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  handleConfirm,
  handleOpenChange,
  open,
  variant = `delete`,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
            {variant == `delete`
              ? `This will permanently delete this item and remove it from our servers.`
              : `This will permanently cancel your order.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
