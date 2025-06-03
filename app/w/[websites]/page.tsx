"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  // --- have to check if a user is present fron next auth hook

  const { websites } = useParams();
  console.log(websites);

  useEffect(() => {}, []);

  return <div></div>;
};

export default Page;
