"use client";
import { Button } from "@/components/ui/button";
import { heroline, subHeroLine } from "@/lib/content";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
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
import { MoveUpRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
      <main className="before:bg-transparent sm:before:bg-accent">
        <div className="xl:p-36 flex-center flex-col backdrop-blur-3xl h-full w-full">
          <h1 className="text-7xl xl:text-9xl sm:text-7xl  text-center font-bold tracking-tighter m-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {heroline.split(",").map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-base xl:ml-44 xl:mr-44 xl:text-2xl md:text-2xl text-center m-2">
            {subHeroLine}
          </p>
          {user ? (
            <Button
              variant={"outline"}
              onClick={() => router.push("/dashboard")}
              className="mt-4 group"
            >
              Go to dashboard
              <span className="rounded-full p-1 bg-accent text-background group-hover:bg-background group-hover:text-foreground">
                <MoveUpRight />
              </span>
            </Button>
          ) : (
            <div className="mt-4">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="bg-background text-primary-foregroun hover:bg-popover">
                    Know More
                    <span className="rounded-full bg-foreground text-background flex-center h-6 w-6">
                      ?
                    </span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="flex-center">
                  <DrawerHeader className="flex-center flex-col">
                    <DrawerTitle className="text-2xl md:text-3xl ">
                      About
                    </DrawerTitle>
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
                    <h2 className="text-base font-bold md:text-2xl">
                      Made by @nextpointer❤️
                    </h2>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button
                className="m-2 relative "
                onClick={() => {
                  router.push("/api/auth/signup");
                  toast.info("Redirecting to the signup page");
                }}
              >
                Get Started
                <span className="rounded-full p-1 bg-background text-foreground">
                  <MoveUpRight />
                </span>
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
