"use client"
import { Button } from "@/components/ui/button";
import { heroline,subHeroLine } from "@/lib/content";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";


export default function Home() {
  const { user } = useUser();
  if(!user){
    redirect("/dashboard");
  }
  return (
    <>
      <main>
        <div className="xl:p-36 flex-center flex-col">
        <h1 className="text-3xl xl:text-7xl sm:text-5xl  text-center font-bold tracking-tighter m-2 " >{heroline}</h1>
        <p className="text-base xl:ml-44 xl:mr-44 xl:text-2xl md:text-2xl text-center m-2">{subHeroLine}</p>
        <div>
        <Button className="bg-secondary text-black">Know More</Button>
        <Button className="m-2">Get Started</Button>
        </div>
        </div>
      </main>
    </>
  );
}
