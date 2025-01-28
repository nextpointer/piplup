"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import React, { useState } from "react";
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

function Nav() {
  const { user } = useUser();
  console.log(user);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="h-12 w-full flex justify-between items-center  pl-6 pr-6 md:pl-12 md:pr-12 pt-4 pb-2 absolute top-0 left-0 z-50">
        <Link href={"/"} className="flex-center gap-2">
          <Image src={"/logo.png"} width={25} height={25} alt="Piplup Logo" />
          <h2 className="text-xl font-[600] tracking-wider">PiPluP</h2>
        </Link>
        <Menubar className=" border-none outline-none flex-center">
          {NavElement.map((element, key) => (
            <MenubarMenu key={key}>
              <MenubarTrigger
                className={`font-[Inter] hidden font-normal tracking-wide xl:block ${
                  activeTab === key
                    ? "bg-gradient-to-r from-primary to-accent text-white "
                    : ""
                }`}
              >
                <Link href={element.href}>{element.name}</Link>
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
                <Link href={"/api/auth/logout"}>
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
