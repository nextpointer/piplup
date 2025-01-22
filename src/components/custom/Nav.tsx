"use client"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { NavElement } from "@/lib/content";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

function Nav() {

  const {user} = useUser();
  console.log(user);
  
  

  return (
    <>
      <div className="h-12 w-full flex justify-between items-center  pl-6 pr-6 md:pl-12 md:pr-12 pt-4 pb-2 absolute top-0 left-0">
        <div className="flex-center gap-2">
          <Image src={"/logo.png"} width={25} height={25} alt="Piplup Logo" />
          <h2 className="text-xl font-[600] tracking-wider">PiPluP</h2>
        </div>
        <Menubar className=" border-none outline-none flex-center">
          {NavElement.map((element, key) => (
            <MenubarMenu key={key}>
              <MenubarTrigger className={`font-[Inter] hidden font-normal tracking-wide xl:block ${key===3?'bg-gradient-to-r from-primary to-accent text-white ':''}`}>{element}</MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
        {user?(<div>
          <Link href={'/api/auth/logout'}><Button className="rounded-[24px]">Logout</Button></Link>
        </div>):(<div>
          <Link href={'/api/auth/login'}><Button className="rounded-[24px]">Login</Button></Link>
        </div>)}
        
      </div>
    </>
  );
}

export default Nav;
