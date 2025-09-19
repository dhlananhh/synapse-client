"use client";


import React, { useState } from "react";
import RequestPasswordResetForm from "@/components/features/auth/RequestPasswordResetForm";
import VerifyResetCodeForm from "@/components/features/auth/VerifyResetCodeForm";
import SetNewPasswordForm from "@/components/features/auth/SetNewPasswordForm";


type Step = "request" | "verify" | "set-new";


export default function ResetPasswordPage() {
  const [ step, setStep ] = useState<Step>("request");
  const [ email, setEmail ] = useState("");
  const [ resetToken, setResetToken ] = useState("");

  const handleRequestSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("verify");
  };

  const handleVerifySuccess = (token: string) => {
    setResetToken(token);
    setStep("set-new");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      {
        step === "request" && (
          <RequestPasswordResetForm onSuccess={ handleRequestSuccess } />
        )
      }
      {
        step === "verify" && (
          <VerifyResetCodeForm
            email={ email }
            onSuccess={ handleVerifySuccess }
          />
        )
      }
      {
        step === "set-new" && (
          <SetNewPasswordForm reset_token={ resetToken } />
        )
      }
    </div>
  );
}
