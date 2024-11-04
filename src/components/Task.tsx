import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { FilePenLine, Trash } from "lucide-react";
import EditTaskDialog from "./EditTaskDialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import Swal from "sweetalert2";

const Task = ({ item }: { item: ITask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation({
    mutationFn: async (task: ITask) => {
      return await axios.put(`task/status/${task._id}`, {
        isCompleted: !task.isCompleted,
      });
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.refetchQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (task: ITask) => {
      return await axios.delete(`task/${task._id}`);
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.refetchQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
  });

  return (
    <Card className="min-h-[200px]">
      <CardHeader className="p-4">
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid w-full gap-4">
          <p>{item.description}</p>
          <p>{moment(item.dueDate).format("DD/MM/YYYY")}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex w-full items-center justify-between">
          <Button
            onClick={() => {
              changeStatusMutation.mutate(item);
            }}
          >
            {item.isCompleted ? "Completed" : "Ongoing"}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setOpen(true)}
            >
              <FilePenLine className="h-4 w-4" />
            </Button>
            <EditTaskDialog open={open} setOpen={setOpen} task={item} />
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => deleteTaskMutation.mutate(item)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Task;
