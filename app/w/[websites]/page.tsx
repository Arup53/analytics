"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  // --- have to check if a user is present fron next auth hook

  const { websites } = useParams();
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [pageviews, setPageviews] = useState([]);
  const [totalVisits, setTotalVisits] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, [websites]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/getSingleWebsiteAnalytics?website_name=${websites}`
    );

    const data = await res.json();
    setLoading(false);
    const { page_views, visits } = data || [];
    setPageviews(page_views);
    setTotalVisits(visits);
  };

  console.log(pageviews, totalVisits);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen w-full items-start justify-start flex flex-col">
        <div
          className="min-h-screen w-full items-center justify-center
         flex text-white relative"
        >
          loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen w-full items-center justify-center flex flex-col">
      {pageviews?.length == 0 && !loading ? (
        <div className="w-full items-center justify-center flex flex-col space-y-6 z-40 relative min-h-screen px-4">
          <div className="z-40 w-full lg:w-2/3 bg-black border border-white/5 py-12 px-8 items-center justify-center flex flex-col text-white space-y-4 relative">
            <p className="bg-green-600 rounded-full p-4 animate-pulse " />
            <p className="animate-pulse"> waiting for the first page view</p>
            <button className="button" onClick={() => window.location.reload()}>
              Refresh
            </button>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="z-40 w-[95%] md:w-3/4 lg:w-2/3 min-h-screen py-6 border-x border-white/5 items-center justify-start flex flex-col">
          <div className="w-full justify-center flex items-center">
            <Tabs
              defaultValue="general"
              className="w-full items-center justify-center flex flex-col"
            >
              <TabsList className="w-full bg-transparent mb-4 items-start justify-start flex">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="custom Event">Custom Events</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="w-full">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 px-4 gap-6">
                  <div className="bg-black border-white/5 border text-white text-center">
                    <p className="text-white/70 font-medium py-8 w-full text-center border-b border-white/5">
                      Total Visits
                    </p>
                    <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                      {1}
                    </p>
                  </div>

                  <div className="bg-black border-white/5 border text-white text-center">
                    <p className="text-white/70 font-medium py-8 w-full text-center border-b border-white/5">
                      Page Views
                    </p>
                    <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                      {1}
                    </p>
                  </div>
                </div>
                <div className="items-center justify-center grid grid-cols-1 bg-black lg:grid-cols-2 mt-12 w-full border-y border-white/5">
                  {/* top pages */}
                  <div className="flex flex-col bg-black z-40 h-full w-full">
                    <h1 className="label">Top pages</h1>
                    <p>Use map method to show all pages visits</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="custom Event">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
