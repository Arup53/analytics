"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  // --- have to check if a user is present fron next auth hook

  const { websites } = useParams();
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  console.log(websites);

  useEffect(() => {
    fetchAnalytics();
  }, [websites]);

  const fetchAnalytics = async () => {
    const res = await fetch(
      `/api/getSingleWebsiteAnalytics?website_name=${websites}`
    );
    const data = await res.json();
    console.log(data);
  };

  return <div></div>;
};

export default Page;
