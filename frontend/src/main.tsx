import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { NotificationProvider } from "@/contexts/notification-context.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import AuctionPage from "@/pages/auction-page.tsx";
import Home from "@/pages/home.tsx";
import { Layout } from "@/components/layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <Toaster position="top-right" duration={3000} closeButton={true} />
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auction/:id" element={<AuctionPage />} />
          </Routes>
        </Layout>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
