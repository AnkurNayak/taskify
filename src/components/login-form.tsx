"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Please log in first to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Button
              // variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => signIn("google")}
            >
              <span>
                <FcGoogle size={24} />
              </span>
              <span>Login with Google</span>
            </Button>
            <Button
              // variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => signIn("github")}
            >
              <span>
                <FaGithub size={24} />
              </span>
              <span>Login with Github</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
