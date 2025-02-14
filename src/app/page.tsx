"use client";
import { Button } from "@/components/ui/button";
import { heroline, subHeroLine } from "@/lib/content";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  // const user = useUser()
  // useEffect(()=>{
  //   if(user){
  //     router.push("/dashboard");
  //   }
  // },[user])

  return (
    <>
      <main className="before:bg-transparent sm:before:bg-accent">
        <div className="xl:p-36 flex-center flex-col backdrop-blur-3xl h-full">
          <h1 className="text-3xl xl:text-7xl sm:text-5xl  text-center font-bold tracking-tighter m-2">
            {heroline}
          </h1>
          <p className="text-base xl:ml-44 xl:mr-44 xl:text-2xl md:text-2xl text-center m-2">
            {subHeroLine}
          </p>
          <div>
            <Button
              className="m-2 relative "
              onClick={() => {
                router.push("/api/auth/signup");
                toast.info("Redirecting to the signup page");
              }}
            >
              Get Started
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="bg-background text-primary-foregroun hover:bg-popover">
                  Know More
                </Button>
              </DrawerTrigger>
              <DrawerContent className="flex-center">
                <DrawerHeader className="flex-center flex-col">
                  <DrawerTitle className="text-2xl md:text-3xl ">About</DrawerTitle>
                  <DrawerDescription>
                    The purpose of making that platform to gain your knowledge
                    and create quiz for others playing well
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex-center">
                  <Image
                    alt="diagram"
                    height={1000}
                    width={1000}
                    src={"/piplup_diagram.png"}
                  />
                </div>
                <DrawerFooter>
                  <h2 className="text-base font-bold md:text-2xl">Made by @nextpointer❤️</h2>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </main>
    </>
  );
}
