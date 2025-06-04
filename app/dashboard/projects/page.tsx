"use client";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-10 w-full z-40 border border-black rounded-lg">
        {websites &&
          websites?.map((website) => (
            <Link
              key={website.id}
              href={{
                pathname: `/w/${website.website_name}`,
              }}
            >
              <div
                className="border border-white/5 rounded-md py-12 px-6
             text-white bg-black w-full cursor-pointer smooth
              hover:border-white/20 hover:bg-[#050505]"
              >
                <h2> {website?.website_name}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Page;
