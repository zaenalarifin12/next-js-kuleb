"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/user";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    console.log('Fetching user...');

    setLoading(true);
    setError(null);

    try {
      const response = await getUser();
      setUser(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <BackgroundGradient />
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        {loading
          ? "Loading..."
          : error
          ? `Error: ${error}`
          : `Hi, ${user?.username}`}
      </h1>
    </div>
  );
}
