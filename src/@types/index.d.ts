type TUser = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ITask = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
