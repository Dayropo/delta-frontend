import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import Swal from "sweetalert2";

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate();

  const signoutMutation = useMutation({
    mutationFn: async () => {
      return axios.post(`user/logout`);
    },
    onSuccess: () => {
      setIsLoggedIn(false);
      navigate("/");
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
    <header className="flex h-16 w-full items-center px-8">
      <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
        <Link to="/">TA</Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                signoutMutation.mutate();
              }}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link to="/login">Log In</Link>
            </Button>

            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
