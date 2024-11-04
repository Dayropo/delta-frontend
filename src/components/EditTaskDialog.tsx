import axios from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { FormikProps, useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
});

type EditTaskFormValues = yup.InferType<typeof validationSchema>;

const EditTaskDialog = ({
  open,
  setOpen,
  task,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}) => {
  const queryClient = useQueryClient();

  const formik: FormikProps<EditTaskFormValues> = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate),
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      await axios.put(`task/${task._id}`, values).then((response) => {
        toast.success(response.data.message);
        resetForm();
        queryClient.refetchQueries({
          queryKey: ["tasks"],
        });
        setOpen(false);
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Edit a task. Click update when you&apos;
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              {...formik.getFieldProps("title")}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              {...formik.getFieldProps("description")}
              rows={4}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formik.values.dueDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {formik.values.dueDate ? (
                    format(formik.values.dueDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formik.values.dueDate}
                  onSelect={(date) => {
                    formik.setFieldValue("dueDate", date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => formik.handleSubmit()}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
