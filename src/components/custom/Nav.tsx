"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { NavElement } from "@/lib/content";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Switch } from "../ui/switch";
import { Sun, Moon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
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

function Nav() {
  const { user } = useUser();
  const pathname = usePathname();
  console.log(pathname);

  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (user) {
      toast.success("Login successfully");
    }
  }, [user]);

  const handleLogout = () => {
    setLogout(true);
  };

  useEffect(() => {
    if (logout) {
      toast.success("Logout successfully");
    }
  }, [logout]);

  return (
    <>
      <div className="h-12 w-full flex justify-between items-center pl-6 pr-6 md:pl-12 md:pr-12 pt-4 pb-4 absolute top-0 left-0 z-50">
        <Link href={"/"} className="flex-center gap-2">
          <Image src={"/logo.png"} width={25} height={25} alt="Piplup Logo" />
          <h2 className="text-xl font-[600] tracking-wider">PiPluP</h2>
        </Link>
        <Menubar className="border-none outline-none flex-center rounded-[24px] ">
          {NavElement.map((element, key) => (
            <MenubarMenu key={key}>
              <MenubarTrigger
                className={`font-[Inter] hidden font-normal tracking-wide xl:block ${
                  pathname === element.href
                    ? "bg-gradient-to-r from-primary to-accent text-white "
                    : ""
                }`}
              >
                {element.name === "About" ? (
                  <Drawer>
                    <DrawerTrigger asChild>
                    <Link href={"#"} className="p-2">{element.name}</Link>
                    </DrawerTrigger>
                    <DrawerContent className="flex-center">
                      <DrawerHeader className="flex-center flex-col">
                        <DrawerTitle className="text-2xl md:text-3xl ">
                          About
                        </DrawerTitle>
                        <DrawerDescription>
                          The purpose of making that platform to gain your
                          knowledge and create quiz for others playing well
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
                ) : (
                  <Link href={element.href} className="p-2">{element.name}</Link>
                )}
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
        {user ? (
          <div className="flex flex-row gap-2 flex-center">
            <Popover>
              <PopoverTrigger className="h-8 w-8 rounded-full flex-center border-2 border-accent">
                <p className="">{user.name?.at(0)?.toUpperCase()}</p>
              </PopoverTrigger>
              <PopoverContent className="shadow-lg p-4 rounded-[24px] flex flex-center gap-2 flex-col border mt-1 z-50">
                <div className="flex flex-row gap-1 flex-center rounded-[24px] border shadow p-1 ">
                  <Sun size={18} />
                  <Switch
                    onClick={() => {
                      document.body.classList.toggle("dark");
                    }}
                  />
                  <Moon size={18} />
                </div>
                <Link href={`/api/auth/logout?returnTo=${window.location.origin}`} onClick={handleLogout}>
                  <Button className="rounded-[24px]">Logout</Button>
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex flex-row gap-4 flex-center">
            <Link href={"/api/auth/login"}>
              <Button className="rounded-[24px]">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;
