import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";

export default function Home() {
  const isLoggedIn = useAuthStore((store) => store.isLoggedIn);

  return (
    <div className="font-poppins relative min-h-screen w-full">
      <Header />

      <main className="mx-auto w-full max-w-screen-xl px-16 py-8">
        <section className="flex h-[50vh] flex-col items-center justify-center gap-2.5">
          <h1 className="text-4xl font-semibold">Maximize Your Productivity</h1>
          <p className="text-lg">
            Effortlessly manage your tasks, projects, and goals with our
            intuitive task management system.
          </p>
          <Button>
            {isLoggedIn ? (
              <Link to="/dashboard">Get Started</Link>
            ) : (
              <Link to="/login">Get Started</Link>
            )}
          </Button>
        </section>
      </main>
    </div>
  );
}
