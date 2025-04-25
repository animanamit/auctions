import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { NotificationProvider } from "@/contexts/notification-context.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import AuctionPage from "@/pages/auction-page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auction/:id" element={<AuctionPage />} />
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
