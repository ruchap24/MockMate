import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}