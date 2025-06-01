"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [websiteName, setWebsiteName] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website_name: websiteName }),
    });

    const data = await res.json();
    setResponse(data);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-10 w-full z-40 border border-black rounded-lg"></div>
    </div>
  );
};

export default Page;
