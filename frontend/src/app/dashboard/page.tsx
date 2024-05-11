import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <h1>Welcome {user?.given_name}</h1>
    </div>
  );
};

export default Page;
