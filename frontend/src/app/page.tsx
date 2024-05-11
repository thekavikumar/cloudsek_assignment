"use client";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  return (
    <main className="flex gap-4 font-semibold items-center justify-center h-screen flex-col">
      <h1 className="text-3xl">
        Welcome to CloudSek Backend Intern Assignment
      </h1>
      <h1 className="text-2xl">A Simple Post Comment Service</h1>
      <div className="text-xl flex items-center gap-4">
        <LoginLink>
          <Button className="font-bold">Login</Button>
        </LoginLink>
        <RegisterLink>
          <Button variant={"secondary"} className="font-bold">
            Register
          </Button>
        </RegisterLink>
      </div>
    </main>
  );
}
