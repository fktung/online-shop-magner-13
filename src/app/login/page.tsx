"use client";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import React from "react";

function LoginPage() {
  const router = useRouter();
  const params = useParams();
  console.log(router);
  console.log(params);

  return <div>LoginPage</div>;
}

export default LoginPage;
