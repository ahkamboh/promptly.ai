import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen relative ">
      <SignUp />
    </main>
  );
};

export default SignUpPage;