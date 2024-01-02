"use client";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import React from "react";

function LoginPage({ params, searchParams }: any) {
  const {} = searchParams;
  const router = useRouter();
  console.log(router);
  console.log(params);
  console.log("searchParams", searchParams);

  return <div>LoginPage</div>;
}

export default LoginPage;
