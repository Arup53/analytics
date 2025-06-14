"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAreaChart from "@/components/chart/AnalyticsGraph";

const Page = () => {
  // --- have to check if a user is present fron next auth hook

  const { websites } = useParams();
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [pageviews, setPageviews] = useState([]);
  const [totalVisits, setTotalVisits] = useState([]);
  const [visits, setVisits] = useState([]);

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
    setTotalVisits(visits.length);
    setVisits(visits);
  };

  function getPath(urlString) {
    try {
      const url = new URL(urlString);
      return url.pathname;
    } catch (error) {
      console.error("Invalid URL", error);
      return null;
    }
  }

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
    <div className="bg-[#0D0D0D] text-white min-h-screen w-full items-center justify-center flex flex-col">
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
                <MyAreaChart visits={visits} />
                <div className="w-full grid grid-cols-1 md:grid-cols-2 px-4 gap-6">
                  <div className="bg-black border-white/5 border text-white text-center">
                    <p className="text-white/70 font-medium py-8 w-full text-center border-b border-white/5">
                      Total Visits
                    </p>
                    <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                      {totalVisits}
                    </p>
                  </div>

                  <div className="bg-black border-white/5 border text-white text-center">
                    <p className="text-white/70 font-medium py-8 w-full text-center border-b border-white/5">
                      Page Views
                    </p>
                    <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                      {pageviews?.length}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4 mx-4">
                  {/* 1st column */}
                  <div>
                    <div>
                      <div className=" rounded-lg border border-gray-700 overflow-hidden">
                        {/* Header */}
                        <div className=" flex items-center justify-between p-4 border-b border-gray-700">
                          <div className="flex space-x-1">Page</div>
                          <div className="text-gray-400 text-sm font-medium">
                            VISITORS
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 ">
                          <div className="bg-gray-900 flex items-center justify-between mb-6 p-2 rounded-md">
                            <div className="text-gray-400 text-sm">
                              {pageviews &&
                                Array.from(
                                  new Map(
                                    pageviews.map((page) => {
                                      const pathname = getPath(page.page); // e.g. "/" or "/home"
                                      return [
                                        pathname,
                                        { id: page.id, pathname },
                                      ];
                                    })
                                  ).values()
                                ).map(({ id, pathname }) => (
                                  <p key={id}>{pathname}</p>
                                ))}
                            </div>
                            <div className="text-white text-xl font-semibold">
                              {pageviews &&
                                (() => {
                                  // Step 1: Count occurrences of each pathname
                                  const pathCounts = pageviews.reduce(
                                    (acc, page) => {
                                      const pathname = getPath(page.page);
                                      acc[pathname] = (acc[pathname] || 0) + 1;
                                      return acc;
                                    },
                                    {}
                                  );

                                  // Step 2: Convert to array and render
                                  return Object.entries(pathCounts).map(
                                    ([pathname, count]) => (
                                      <p key={pathname}>{count}</p>
                                    )
                                  );
                                })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 2nd column */}
                  <div>
                    <div>
                      <div className=" rounded-lg border border-gray-700 overflow-hidden">
                        {/* Header */}
                        <div className=" flex items-center justify-between p-4 border-b border-gray-700">
                          <div className="flex space-x-1">Devices</div>
                          <div className="text-gray-400 text-sm font-medium">
                            VISITORS
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 ">
                          <div className="bg-gray-900 flex items-center justify-between mb-6 p-2 rounded-md">
                            <div className="text-gray-400 text-sm">/</div>
                            <div className="text-white text-xl font-semibold">
                              1
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
