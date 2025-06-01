"use client";

import { useEffect, useState } from "react";

const AddWebForm = () => {
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const addwebsite = async () => {};

  const checkDuplicateDomains = async () => {
    let fetchedWebsites: any = [];
    // fetch all websites from db
    const websites = "use prisma for fetching";
    if (
      fetchedWebsites.filter((item) => item.website_name === website).length > 0
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
              <button className="button" onClick={addwebsite}>
                {loading ? "adding..." : "add website"}
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      ;
    </div>
  );
};

export default AddWebForm;
