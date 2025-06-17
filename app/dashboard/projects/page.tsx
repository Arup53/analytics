"use client";

import CreateProject from "@/components/dashboardRoutes/projectsRouteComponents/CreateProject";
import Projects from "@/components/dashboardRoutes/projectsRouteComponents/Projects";
import AddTest from "@/components/test/test";
import TestArr from "@/components/test/testArr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

type Website = {
  id: number;
  website_name: string;
};

const Page = () => {
  const [websiteName, setWebsiteName] = useState("");
  const [response, setResponse] = useState(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [testArr, setTestArr] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const res = await fetch("/api/getAllWebsites");
      const data = await res.json();
      setWebsites(data);

      // const res2 = await fetch(
      //   `/api/getSingleWebsiteAnalytics?website_name=${name}`
      // );
      // const data2 = await res2.json();
      // console.log(data2);
    }
    fetchAll();
  }, []);

  return (
    <div className="w-full h-[100vh]">
      {/* <div className="flex justify-end my-6">
        <Link href={"/dashboard/addWebsites"}>
          <Button className="">+ add website</Button>
        </Link>
      </div> */}
      <div className="flex justify-end px-6 py-3 border-b mb-12 border-neutral-600 rounded-sm">
        <CreateProject handleAddWebsite={(value) => setWebsites(value)} />
      </div>

      <div className=" w-full z-40 px-10 border-none rounded-lg">
        <Projects websites={websites} />
      </div>
      {/* test */}
    </div>
  );
};

export default Page;
