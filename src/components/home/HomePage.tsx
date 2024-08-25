import { GetServerSideProps } from "next";
import axios from "axios";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/user";

interface HomeProps {
  user: any;
  error: string | null;
}

const HomePage: React.FC<HomeProps> = ({ user, error }) => {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <BackgroundGradient />
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        {error ? `Error: ${error}` : `Hi, ${user?.username}`}
      </h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await getUser();
    return {
      props: {
        user: response.data,
        error: null,
      },
    };
  } catch (err) {
    const error = axios.isAxiosError(err)
      ? err.response?.data?.message || "An error occurred"
      : "An error occurred";
    return {
      props: {
        user: null,
        error,
      },
    };
  }
};

export default HomePage;
