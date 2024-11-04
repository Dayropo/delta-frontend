import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Task from "@/components/Task";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/stores/userStore";

export default function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const user = useUserStore((store) => store.user);

  console.log({ user });

  const { data, status, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`task`);

      return data.data;
    },
  });

  if (status === "error") {
    console.error(error);
  }

  return (
    <div className="font-poppins relative min-h-screen w-full">
      <Header />

      <main className="mx-auto w-full max-w-screen-xl">
        <section className="w-full p-8">
          <header className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">All Tasks</h1>

            <Button onClick={() => setOpen(true)}>
              <Plus />
            </Button>
            <CreateTaskDialog open={open} setOpen={setOpen} />
          </header>

          {status === "pending" ? (
            <div className="mt-8 grid auto-rows-min grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </div>
          ) : (
            <div className="mt-8 grid auto-rows-min grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              {data?.map((task: ITask, index: number) => (
                <Task key={index} item={task} />
              ))}

              <Button
                variant="ghost"
                className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed"
                onClick={() => setOpen(true)}
              >
                <p className="flex items-center gap-2.5">
                  <Plus /> Add New Task
                </p>
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
