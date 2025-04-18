"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { NavElement } from "@/lib/content";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Switch } from "../ui/switch";
import { Sun, Moon, Menu, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { useAtom } from "jotai";
import { darkMode } from "@/app/store/atom";

function Nav() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [isdarkMode, setDarkMode] = useAtom(darkMode);
  const handleDarkMode = () => {
    setDarkMode(!isdarkMode);
  };

  useEffect(() => {
    if (isdarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isdarkMode]);

  useEffect(() => {
    if (user) {
      toast.success("Login successfully");
    }
  }, [user]);

  const handleLogout = () => {
    setLogout(true);
    setIsOpen(false);
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

        {/* Desktop Navigation */}
        <Menubar className="border-none outline-none hidden xl:flex rounded-[24px]">
          {NavElement.map((element, key) => (
            <MenubarMenu key={key}>
              <MenubarTrigger
                className={`font-[Inter] font-normal tracking-wide ${
                  pathname === element.href
                    ? "bg-gradient-to-r from-primary to-accent text-white "
                    : ""
                }`}
              >
                {element.name === "About" ? (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Link href={"#"} className="p-2">
                        {element.name}
                      </Link>
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
                          className="w-full h-auto p-4"
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
                  <Link href={element.href} className="p-2">
                    {element.name}
                  </Link>
                )}
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="xl:hidden p-2">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left">PiPluP Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 mt-6">
                {NavElement.map((element, key) => (
                  <div key={key} onClick={() => setIsOpen(false)}>
                    {element.name === "About" ? (
                      <Drawer
                        onOpenChange={(open) => !open && setIsOpen(false)}
                      >
                        <DrawerTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                          >
                            {element.name}
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="flex-center max-h-[90vh] overflow-y-auto">
                          <DrawerHeader className="flex-center flex-col">
                            <DrawerTitle className="text-2xl md:text-3xl">
                              About
                            </DrawerTitle>
                            <DrawerDescription className="text-center">
                              The purpose of making that platform to gain your
                              knowledge and create quiz for others playing well
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="flex-center p-4">
                            <Image
                              alt="diagram"
                              height={600}
                              width={600}
                              src={"/piplup_diagram.png"}
                              className="w-full h-auto"
                            />
                          </div>
                          <DrawerFooter>
                            <h2 className="text-base font-bold md:text-xl text-center">
                              Made by @nextpointer❤️
                            </h2>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    ) : (
                      <Link href={element.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start ${
                            pathname === element.href
                              ? "bg-accent/20 text-accent"
                              : ""
                          }`}
                        >
                          {element.name}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Auth Section */}
          {user ? (
            <Popover>
              <PopoverTrigger className="h-8 w-8 rounded-full flex-center border-2 border-accent">
                <p className="">{user.name?.at(0)?.toUpperCase()}</p>
              </PopoverTrigger>
              <PopoverContent className="shadow-lg p-4 rounded-[24px] flex flex-center gap-2 flex-col border mt-1 z-50 mr-4">
                <div className="flex flex-row gap-1 flex-center rounded-[24px] border shadow p-1 ">
                  <Sun size={18} />
                  <Switch
                    onCheckedChange={handleDarkMode}
                    checked={isdarkMode}
                  />
                  <Moon size={18} />
                </div>
                <Link href={"/api/auth/logout"} onClick={handleLogout}>
                  <Button className="rounded-[24px]">Logout</Button>
                </Link>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href={"/api/auth/login"}>
              <Button className="rounded-[24px]">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
