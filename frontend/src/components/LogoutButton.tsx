"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const LogoutButton = () => {
  return (
    <LogoutLink>
      <Button>Logout</Button>
    </LogoutLink>
  );
};

export default LogoutButton;
