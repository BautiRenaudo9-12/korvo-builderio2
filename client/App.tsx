import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BusinessLayout } from "@/components/BusinessLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import StoreDetail from "./pages/StoreDetail";
import AllBusinesses from "./pages/AllBusinesses";
import NotFound from "./pages/NotFound";
import BusinessDashboard from "./pages/business/Dashboard";
import BusinessPoints from "./pages/business/Points";
import BusinessRewards from "./pages/business/Rewards";
import BusinessCustomers from "./pages/business/Customers";
import BusinessPromotions from "./pages/business/Promotions";
import BusinessSettings from "./pages/business/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* User Routes */}
          <Route element={<Layout><Home /></Layout>} path="/" />
          <Route element={<Layout><Wallet /></Layout>} path="/wallet" />
          <Route element={<Layout><Activity /></Layout>} path="/activity" />
          <Route element={<Layout><Profile /></Layout>} path="/profile" />
          <Route element={<Layout><Explore /></Layout>} path="/explore" />
          <Route element={<Layout><StoreDetail /></Layout>} path="/store/:id" />
          <Route element={<Layout><AllBusinesses /></Layout>} path="/businesses" />

          {/* Business Routes */}
          <Route element={<BusinessLayout><BusinessDashboard /></BusinessLayout>} path="/business/dashboard" />
          <Route element={<BusinessLayout><BusinessPoints /></BusinessLayout>} path="/business/points" />
          <Route element={<BusinessLayout><BusinessRewards /></BusinessLayout>} path="/business/rewards" />
          <Route element={<BusinessLayout><BusinessCustomers /></BusinessLayout>} path="/business/customers" />
          <Route element={<BusinessLayout><BusinessPromotions /></BusinessLayout>} path="/business/promotions" />
          <Route element={<BusinessLayout><BusinessSettings /></BusinessLayout>} path="/business/settings" />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
