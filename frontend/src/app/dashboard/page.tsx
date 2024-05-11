import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  return (await isAuthenticated()) ? <Dashboard /> : <h1>Unauthorized</h1>;
};

export default Page;
