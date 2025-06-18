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
              className="border border-white/5 rounded-md py-12 px-6
             text-white bg-neutral-700 w-full cursor-pointer smooth
              hover:border-white/20 hover:bg-[#050505]"
            >
              <h2> {website?.website_name}</h2>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Projects;
