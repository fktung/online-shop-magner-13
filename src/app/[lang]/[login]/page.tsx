"use client";
import { AppProps } from "next/app";
import { useRouter, useParams } from "next/navigation";
import React from "react";

function LoginPage() {
  const router = useRouter();
  console.log(useParams());

  return <div>LoginPage</div>;
}

export default LoginPage;
