"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/user";
import { useRouter } from "next/navigation";
import ButtonLogout from "@/components/ui/button-logout";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    const authToken = localStorage.getItem("authToken");

    try {
      if (!authToken || authToken.trim() === "") {
        router.push("/auth/login");
        return;
      }
      const response = await getUser();
      if (response.data && response.data.username) {
        setUser(response.data);
      }
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

  const logout = () => {
    localStorage.clear();
    router.push("/auth/login");
    return;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <BackgroundGradient />
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="absolute top-0 right-0 m-4 text-white font-bold py-2 px-4 rounded">
        <ButtonLogout onClick={logout} />
      </div>

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
