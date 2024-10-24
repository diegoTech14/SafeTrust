"use client";

import React, { useState } from "react";
import { fundEscrow } from "@/services/escrow/fundEscrow";
import { kit } from "@/wallet/walletKit";
import EscrowForm from "@/components/escrow/fundEscrow/EscrowForm";
import Header from "@/layouts/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FundEscrowForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    contractId: "",
    engagementId: "",
  });

  const [statusMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { address } = await kit.getAddress();

      const payload = {
        contractId: formValues.contractId,
        engagementId: formValues.engagementId,
        signer: address,
      };

      console.log("Payload enviado:", payload);

      await fundEscrow(payload);

      toast.success("Escrow funded successfully!");
    } catch (error) {
      console.error("Error funding escrow:", error);
      toast.error("Error funding escrow. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <h2 className="text-2xl text-black font-semibold mb-4">Fund Escrow</h2>
        <EscrowForm
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          statusMessage={statusMessage}
        />
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default FundEscrowForm;
