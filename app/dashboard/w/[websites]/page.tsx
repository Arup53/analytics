"use client";

import {
  NextJsScript,
  nextJsScript,
  reactJsScript,
  ReactJsScript,
} from "@/config/code";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAreaChart from "@/components/chart/AnalyticsGraph";
import { CloudAlert } from "lucide-react";
import { ScriptDisplay } from "@/components/dashboardRoutes/website/Script";

const Page = () => {
  // --- have to check if a user is present fron next auth hook

  const { websites } = useParams();
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [pageviews, setPageviews] = useState([]);
  const [totalVisits, setTotalVisits] = useState([]);
  const [visits, setVisits] = useState([]);

  const [scriptHtml, setScriptHtml] = useState<string | null>(null);
  const [reactScriptHtml, setReactScriptHtml] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchScripts = async () => {
      if (pageviews.length === 0) {
        try {
          const nextHtml = await NextJsScript();
          const reactHtml = await ReactJsScript();
          setScriptHtml(nextHtml);
          setReactScriptHtml(reactHtml);
        } catch (error) {
          console.error("Failed to fetch script HTML:", error);
        }
      }
    };

    fetchScripts();
  }, [pageviews]);

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

  const copyToClipboard = async (script: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(script);
      alert(successMessage);
    } catch (error) {
      console.error(error);
      alert("Failed to copy to clipboard");
    }
  };

  const handleNextScriptCopy = () =>
    copyToClipboard(nextJsScript, "Next.js script copied");
  const handleReactScriptCopy = () =>
    copyToClipboard(reactJsScript, "React script copied");

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
        <div className="flex flex-col justify-cente items-center border border-[#383b4183] gap-2 md:gap-4 p-5 md:p-8 text-white rounded-lg">
          <CloudAlert size={48} className="text-neutral-400" />
          <h2 className="font-semibold text-xl">No Analytics Data</h2>
          <p className="text-neutral-400 text-center">
            Analytics tracking is not configured for your website. Use the
            scripts below to get started.
          </p>

          <div className="bg-[#24292E] w-full">
            {scriptHtml && (
              <ScriptDisplay html={scriptHtml} onCopy={handleNextScriptCopy} />
            )}
          </div>

          {reactScriptHtml && (
            <ScriptDisplay
              html={reactScriptHtml}
              onCopy={handleReactScriptCopy}
            />
          )}
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
