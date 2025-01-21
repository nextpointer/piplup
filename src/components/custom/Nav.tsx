import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarRadioGroup, MenubarRadioItem, MenubarCheckboxItem, MenubarSub, MenubarSubTrigger, MenubarSubContent } from "@/components/ui/menubar";
import React from "react";
import { MenubarShortcut } from "../ui/menubar";
import { Button } from "../ui/button";

function Nav() {
  return (
    <>
      <div className="h-12 w-full flex justify-between items-center pl-12 pr-12 pt-2 pb-2">
        <div className="flex-center gap-2">
          <img src="logo.png" alt="" className="h-8 w-8" />
          <h2 className="text-2xl">piplup</h2>
        </div>
        <Menubar className="border-none outline-none flex-center ">
      <MenubarMenu >
        <MenubarTrigger className="border-none bg-transparent">File</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
          <div>
            <Button className="rounded-[24px]">Login</Button>
          </div>
      </div>
    </>
  );
}

export default Nav;
