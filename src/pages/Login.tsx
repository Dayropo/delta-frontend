import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/authStore";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormValues = yup.InferType<typeof validationSchema>;

export default function Login() {
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const formik = useFormik<FormValues>({
    initialValues: { email: "", password: "" },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      await axios
        .post(`user/login`, values)
        .then((response) => {
          toast.success(response.data.message);
          resetForm();
          setIsLoggedIn(true);
          navigate("/dashboard");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    },
  });

  return (
    <main className="font-poppins relative flex h-screen w-full">
      <div className="flex w-full items-center justify-center sm:w-1/2">
        <div className="grid w-full gap-8 px-4 sm:max-w-lg">
          <h2 className="text-2xl font-semibold capitalize">Welcome back!</h2>

          <form className="grid gap-4" onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-500">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="bg-nature hidden w-1/2 items-center justify-center rounded-bl-[32px] rounded-tl-[32px] bg-cover bg-center sm:flex"></div>
    </main>
  );
}
