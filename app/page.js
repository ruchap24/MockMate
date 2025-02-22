import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Button>Click me</Button>
    </div>
  );
}