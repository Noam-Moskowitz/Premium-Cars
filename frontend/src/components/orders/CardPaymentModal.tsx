import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardPaymentForm from "../forms/CardPaymentForm";
import { number } from "zod";

interface CardPaymentModalProps {
  open: boolean;
  closeModal: () => void;
  price: number;
}

const CardPaymentModal: React.FC<CardPaymentModalProps> = ({ open, closeModal, price }) => {
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>This is a simulation!</DialogTitle>
          <DialogDescription>
            Please be aware that this form is for simulation purposes only and will not process any
            payments. We advise against entering your actual credit card information.
          </DialogDescription>
        </DialogHeader>
        <CardPaymentForm amountToPay={price} />
      </DialogContent>
    </Dialog>
  );
};

export default CardPaymentModal;
