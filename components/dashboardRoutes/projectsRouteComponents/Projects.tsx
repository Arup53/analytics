"use client";

import Link from "next/link";
import { useEffect } from "react";

const Projects = ({ websites }) => {
  useEffect(() => {
    console.log(websites);
  }, [websites]);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10 w-full z-40 border-none rounded-lg">
      {websites &&
        websites?.map((website) => (
          <Link
            key={website.id}
            href={{
              pathname: `/dashboard/w/${website.website_name}`,
            }}
          >
            <div
              className="border border-white/5 rounded-md py-6 px-2 
             text-white bg-neutral-700 w-full cursor-pointer smooth
              hover:border-white/20 hover:bg-[#050505] max-w-96 max-h-96"
            >
              <div className="flex gap-2 items-center">
                <h3 className="text-sm ">{website.project_name}</h3>
                <span className="relative flex justify-center items-center h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                </span>
              </div>
              <p className="text-cyan-500 underline text-xs">
                {website?.website_name}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Projects;
