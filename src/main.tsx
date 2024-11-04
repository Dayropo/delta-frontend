import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/ScrollToTop.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import TanstackProvider from "@/providers/TanstackProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackProvider>
        <SidebarProvider>
          <ScrollToTop />
          <App />
          <ToastContainer />
        </SidebarProvider>
      </TanstackProvider>
    </BrowserRouter>
  </StrictMode>,
);
