import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-[80%] h-[100vh]">
      <div className="flex justify-end my-6">
        <Link href={"/add"}>
          <Button className="">+ add website</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-10 w-full z-40 border border-black rounded-lg"></div>
    </div>
  );
};

export default Page;
