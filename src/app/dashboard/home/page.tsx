"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 sm:px-8">
      <div className="flex flex-col flex-auto items-center min-w-0 my-8 sm:my-12">
        <div className="flex flex-auto items-center min-w-0">
          <div className="flex flex-auto items-center min-w-0">
            <div className="flex-0 w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col min-w-0 ml-4">
              <div className="text-2xl lg:text-5xl font-semibold tracking-tight truncate">
                Welcome Back, {session?.user?.name}
              </div>
            </div>
          </div>
        </div>
        <Button className="mt-8 max-w-fit" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
