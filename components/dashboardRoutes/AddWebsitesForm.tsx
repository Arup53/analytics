"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddWebForm = () => {
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const addwebsite = async () => {
    if (website.trim() == "" || loading) return;
    setLoading(true);
    const res = await fetch("/api/postWebsites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website_name: website, userId: session?.user.id }),
    });
    if (!res.ok) throw new Error("Failed to post");
    const data = await res.json();
    console.log(data);
    setLoading(false);
    setStep(2);
  };

  const checkDuplicateDomains = async () => {
    let fetchedWebsites: any = [];
    // fetch all websites from db
    const res = await fetch("/api/getAllWebsites");
    const websites = await res.json();
    fetchedWebsites = websites;
    if (
      fetchedWebsites.filter((item: any) => item.website_name === website)
        .length > 0
    ) {
      setError("this domain is added before");
    } else {
      setError("");
      addwebsite();
    }
  };

  useEffect(() => {
    if (
      website.trim().includes("http") ||
      website.trim().includes("http://") ||
      website.trim().includes("https://") ||
      website.trim().includes("://") ||
      website.trim().includes(":") ||
      website.trim().includes("/")
    ) {
      setError("please enter the domain only. ie:(google.com)");
    } else {
      setError("");
    }
  }, [website]);

  console.log(session?.user.id);

  return (
    <div className="w-full min-h-screen bg-black items-center justify-center flex flex-col">
      <div className="text-4xl">LOGO</div>
      <div className="items-center justify-center p-12 mt-10 flex flex-col w-full z-0 border-y border-white/5 bg-black text-white">
        {step === 1 ? (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%] group">
              <p className="text-white/40 pb-4 group hober:text-white scroll-smooth">
                Domain
              </p>
              <input
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value.trim().toLowerCase())
                }
                className="input"
              />
              {error ? (
                <p className="text-xs pt-2 font-light text-red-400">{error}</p>
              ) : (
                <p className="text-xs pt-2 font-light text-white/20">
                  enter the domain or subdomian without {"www"}
                </p>
              )}
            </span>
            {error === "" && (
              <button className="button" onClick={checkDuplicateDomains}>
                {loading ? "adding..." : "add website"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%]">
              <textarea
                className="input text-white/20 cursor-pointer"
                disabled
                value={`<script defer data-domain="${website}"
                src="https://analytics-sandy-five.vercel.app/tracking-script.js"></script>`}
              />
              <p className="text-xs text-white/20 pt-2 font-light">
                paste this snippet in the{" "}
                <b className="text-red-600">{"<head>"}</b> of your website
              </p>
            </span>
            <button
              className="button"
              onClick={() => router.push(`/w/${website.trim()}`)}
            >
              added
            </button>
          </div>
        )}
      </div>
      ;
    </div>
  );
};

export default AddWebForm;
