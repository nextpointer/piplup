import { Button } from "@/components/ui/button";
import { heroline,subHeroLine } from "@/lib/content";


export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-[5rem] text-center" >{heroline}</h1>
        <p>{subHeroLine}</p>
        <Button>Get Started</Button>
        
      </main>
    </>
  );
}
