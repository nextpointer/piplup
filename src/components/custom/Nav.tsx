import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { NavElement } from "@/lib/content";

function Nav() {
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
              <MenubarTrigger className="font-[Inter] hidden font-normal tracking-wide xl:block">{element}</MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
        <div>
          <Button className="rounded-[24px]">Login</Button>
        </div>
      </div>
    </>
  );
}

export default Nav;
