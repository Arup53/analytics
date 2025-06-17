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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/postWebsites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website_name: websiteName }),
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();

    setResponse(data);
  };

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
    <div className="w-[80%] h-[100vh]">
      <div className="flex justify-end my-6">
        <Link href={"/dashboard/addWebsites"}>
          <Button className="">+ add website</Button>
        </Link>
      </div>
      <div className="flex justify-end my-6">
        <CreateProject />
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter website name"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
          {response && (
            <div className="mt-4">
              <p>Created Website:</p>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
      <div className="0 w-full z-40 border border-black rounded-lg">
        <Projects websites={websites} />
      </div>
      {/* test */}
    </div>
  );
};

export default Page;
